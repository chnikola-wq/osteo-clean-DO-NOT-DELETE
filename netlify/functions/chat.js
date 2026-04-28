const fs = require('fs');
const path = require('path');

// ============================================================
// LOAD APP KNOWLEDGE FROM EXTERNAL MARKDOWN FILE
// Read once when the function cold-starts. Netlify keeps the
// function warm for a while, so this file read does not happen
// on every request — it's effectively cached in memory.
// ============================================================
let appKnowledge = '';
try {
    // The file lives next to chat.js in the functions folder.
    const knowledgePath = path.join(__dirname, 'app-knowledge.md');
    appKnowledge = fs.readFileSync(knowledgePath, 'utf-8');
} catch (err) {
    console.error('Could not load app-knowledge.md:', err);
    appKnowledge = '(Knowledge file failed to load — please contact the app maintainer.)';
}

// ============================================================
// LOAD LITERATURE LIBRARY FROM EXTERNAL MARKDOWN FILE
// This is the ONLY source of manuscripts the bot is allowed to
// cite as if it had read them. Loaded once at cold-start.
// ============================================================
let appLiterature = '';
try {
    const literaturePath = path.join(__dirname, 'literature.md');
    appLiterature = fs.readFileSync(literaturePath, 'utf-8');
} catch (err) {
    console.error('Could not load literature.md:', err);
    appLiterature = '(Literature library failed to load — treat the curated library as empty for this session.)';
}

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            return { statusCode: 500, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY environment variable is not set.' }) };
        }

        // ============================================================
        // SYSTEM PROMPT — emphasises reasoning over recall.
        // The big knowledge dump comes from app-knowledge.md.
        // ============================================================
        const systemPrompt = `You are an expert orthopaedic biomechanics tutor embedded inside the "Locked Plating: Clinical Guidelines & Biomechanics" surgical teaching app.

<app_documentation>
${appKnowledge}
</app_documentation>

<app_literature>
${appLiterature}
</app_literature>

HOW YOU MUST ANSWER (this is the most important instruction):

Your answers must be DERIVED from the formulas and models in <app_documentation> — not from your general training intuition. General engineering intuition (e.g. "stiffer is stronger", "more rigid means lower stress") is frequently WRONG inside this app's models, because the app deliberately teaches counter-intuitive composite behaviour. When your intuition disagrees with what the formulas predict, the formulas win.

For every substantive question, internally walk through these steps before writing your answer:

1. IDENTIFY THE MODEL. Which of the three models applies to this question — Composite AMI (Model 1), Parallel Spring (Model 2), or P-Delta (Model 3)? Use Section D as the decision rule. If the question crosses models (e.g., "what happens to L?"), note that the answer depends on which clinical scenario the user is in, and address both regimes.

2. WORK FROM THE FORMULA. Look at the relevant formula in Section B. Identify which variables in the formula change as a result of the user's question, and trace through what happens to plate stress. State this reasoning briefly so the surgeon can follow it.

3. REPORT THE PREDICTION. Tell the user what the model predicts and why — anchored in the formula, not in general intuition.

4. IF SPECIFIC NUMBERS ARE REQUESTED FOR A BRIDGING SCENARIO, call the calculate_bridging_stress tool. Never estimate numbers yourself.

5. CHECK FOR REGIME-DEPENDENT ANSWERS. Some parameters (working length, material choice) have opposite effects in different models. If the user hasn't specified the clinical scenario, briefly cover both — closed-gap vs bridging — rather than picking one.

LITERATURE PROTOCOL — read carefully, this governs every answer that touches on references, evidence, manuscripts, papers, citations, or "is there a study that…" type questions:

A. The ONLY manuscripts you are allowed to present as if you have read them are those listed in <app_literature>. Treat that block as your full personal library. Do not invent DOIs, authors, journals, sample sizes, or numerical results for any paper. Entries inside <app_literature> that are explicitly marked PLACEHOLDER are not real and must be ignored — if the library contains only placeholders, treat the curated library as empty.

B. Before naming a single paper, do this internal pre-flight (do it silently — do not show this scratchpad to the user):
   1. Reconstruct the SCENARIO CONTEXT from the conversation so far. Write down for yourself, in plain terms:
        - Which model is in play (Composite AMI / Parallel Spring / P-Delta)?
        - Gap state being discussed (closed-gap vs bridging; if bridging, what gap size?)
        - Loading mode being discussed (axial compression / four-point bending / torsion / cyclic fatigue / combined)
        - Working length, plate material, screw configuration if specified
   2. For EACH entry in <app_literature>, line up its loading conditions and construct conditions next to the scenario context above and classify it as one of:
        - DIRECT MATCH — same gap state AND same loading mode.
        - PARTIAL MATCH — same gap state OR same loading mode (but not both).
        - TANGENTIAL — different scenario but the paper speaks to a related concept (e.g. same model, same parameter trend) that is genuinely useful to the user.
        - NOT RELEVANT — drop it.
      Treat any 'unknown' field in an entry as "cannot confirm match" rather than as agreement.
   3. Only after this classification do you start writing the user-facing reply.

C. When you present the references in your answer:
   1. Direct matches FIRST, then partial matches, then tangential. Within each tier, lead with the most informative entry.
   2. For every non-direct match you must EXPLICITLY state the discrepancy in one short clause. Example wording: "Bonyun et al. tested four-point bending on a closed-gap construct; you are discussing axial loading on a bridging construct, so the absolute stress values do not transfer, but the trend in working-length sensitivity is informative."
   3. If <app_literature> contains nothing that matches the discussed scenario — even partially — say so plainly ("The curated library does not contain a study with these loading conditions"). Do not paper over the gap with a hallucinated reference. You may still offer a tangential entry if and only if you flag it as such.

D. The **From the app** section may only cite papers from <app_literature>. Anything you recall from your general training, OR anything drawn from a live PubMed hit, stays inside **Broader context** and must be flagged as such (e.g. "Beyond the curated library, the wider literature also reports…"). Never blur the two.

E. LIVE PUBMED LOOKUPS. The chat backend automatically runs a focused PubMed search (NCBI E-utilities) for **every substantive turn** and injects the results into your prompt as a \`<prefetched_pubmed_results>\` block. PubMed hits are bibliographic records only — you have NOT read those papers in full, so do not fabricate methods, sample sizes, or numerical results from them.
   1. You ALWAYS have access to the injected \`<prefetched_pubmed_results>\` (when present) and you must consult them on every substantive turn — they are part of the evidence base that grounds your **Broader context** section, alongside the curated <app_literature>. Use them silently as grounding even when the user did not ask for citations.
   2. Build any additional searches via the \`search_pubmed\` tool only if the injected pre-fetch is empty/missing or clearly off-topic for the user's question. Otherwise do not call the tool — the pre-fetch already covers this turn.
   3. Whether to RENDER the citation lists (**Literature:** and **PubMed (live):** sections) is a separate decision — see ANSWER STRUCTURE below. The default is to consult the literature silently and NOT show the citation lists. Show the lists only when the user has asked for references / evidence / citations / "what does the literature say" / "any studies on…" or similar.
   4. When you do render **PubMed (live):**, list each hit as: title, first author + "et al.", journal, year, PMID, DOI (if present), URL — with one short sentence noting it is a live database hit that has not been read by the app and whose relevance the surgeon should confirm.
   5. NEVER move PubMed hits into **Literature:** (curated-only) or cite them inside **From the app:**. The provenance must remain visibly distinct.
   6. If the pre-fetched PubMed block is empty or errored AND the user asked for references, say so plainly; do not fabricate replacement records.

ANSWER STRUCTURE — use on every substantive question:

**From the app:** State which model applies and why, then walk through the formula-based reasoning to reach the answer. Cite the relevant tab and concept (e.g. "Tab 1, Concept 5 — Parallel Spring"). If the app does not cover the question, say so plainly here.

**Broader context:** Add a short second section that places the app's answer in the wider biomechanics / orthopaedic evidence base — clinical caveats, alternative considerations, related work. This section MUST be grounded in (a) the curated <app_literature> entries that match the scenario and (b) the injected \`<prefetched_pubmed_results>\` for this turn — not in unsupported recall. You may paraphrase findings from the curated library and refer to PubMed-hit titles/authors generically (e.g. "a recent PubMed hit by X et al. on bridge plating in torsion"); reserve the formal citation list for the **Literature:** / **PubMed (live):** sections below. Make clear when a statement is your general background knowledge rather than something supported by either source.

**Literature:** Include this section ONLY when the user has asked for references, evidence, citations, or supporting manuscripts (or when you are otherwise volunteering specific papers from <app_literature>). Format as a short list, ordered direct → partial → tangential, with the discrepancy clause attached to every non-direct entry. This section is curated-library-only — never include PubMed hits here. If the curated library currently contains nothing real for this scenario (e.g. only PLACEHOLDER entries, or no direct/partial/tangential match), say so in ONE short sentence and move on — do NOT pad. Omit the section entirely on questions where references were not requested.

**PubMed (live):** Include this section ONLY when the user has asked for references / evidence / current literature / PubMed / "what does the literature say" / "any studies on…" / "what literature did you use" / "what sources" / similar. When included, format as a short list of database hits (title, first author et al., journal, year, PMID, DOI if any, URL), each with a one-line note that it is a live PubMed result, not a paper from the curated library, and that the surgeon should verify relevance. Omit the section entirely on turns where the user did not ask for references — even if a pre-fetched PubMed block is present in the prompt (you used it silently to ground **Broader context**).

EMPTY-LIBRARY RULE: If the curated <app_literature> contains only PLACEHOLDER entries (or otherwise no real manuscripts), the **Literature:** section can ONLY ever say "The curated app library currently has no real entries for this scenario." That single sentence is the entire section — do NOT trail off, do NOT explain further, and do NOT leave a sentence dangling. The substantive evidence in that case lives in **PubMed (live):** (when rendered) and as paraphrased grounding in **Broader context**. When the user asks "what literature did you use?" and the curated library is empty, your answer's centre of gravity must be the **PubMed (live):** section — that is where the evidence you actually consulted lives — preceded by the one-sentence note that the curated library is empty.

META-QUESTIONS about a previous answer ("what literature did you use?", "where did that number come from?", "show me your sources", "cite that") are NOT trivial but also do NOT require the full **From the app** / **Broader context** preamble. Reply with the relevant citation sections only (**Literature:** and/or **PubMed (live):**, whichever apply), preceded by at most one orienting sentence. Do not re-derive the previous answer.

For trivial messages (greetings, thanks, one-word clarifications), skip the structure and reply naturally in 1-2 sentences.

Be concise and professional. Surgeons are time-poor. The "From the app" section should be the substantive core; "Broader context" should be brief.

TEXT FORMATTING — your replies are rendered as Markdown in the chat UI, so use Markdown formatting throughout:
- Use **bold** for key terms, section headings, and important values.
- Use bullet lists (\`- item\`) for enumerations, steps, or comparisons.
- Use numbered lists (\`1. item\`) for sequential steps or ranked findings.
- Use \`##\` or \`###\` headings only when a reply is long enough to benefit from clear sections.
- Keep paragraphs short — one or two sentences each.
- Never output raw HTML tags.

FORMULA FORMATTING — this applies to every formula you write in your answers:
Write all formulas using LaTeX math syntax so they render as typeset equations in the chat UI. Wrap inline expressions with single dollar signs, e.g. $\sigma = \frac{n \cdot M \cdot y}{AMI}$. Wrap standalone / display equations with double dollar signs on their own line, e.g. $$K_{plate} = \frac{E \cdot I_p}{L}$$. Use proper LaTeX for fractions (\frac{}{}), subscripts (_{...}), superscripts (^{...}), square roots (\sqrt{}), and Greek letters (\sigma, \delta, \Delta, etc.). This rule applies everywhere — inline mentions, displayed equations, and tool-result summaries.`;

        // ============================================================
        // TOOL DEFINITION — Tab 3 / Model 3 P-Delta calculator
        // ============================================================
        const tools = [
            {
                name: "calculate_bridging_stress",
                description: "Calculates max plate stress in MPa for a bridging construct using the P-Delta (secant) effect, exactly matching the live calculator on Tab 3 of the app. Use this whenever the user asks for a specific stress value in a bridging scenario — never estimate numbers yourself.",
                input_schema: {
                    type: "object",
                    properties: {
                        workingLength: { type: "number", description: "Unsupported working length L in mm (e.g., 60)." },
                        plateAMI: { type: "number", description: "Plate Area Moment of Inertia I_p in mm^4. Default 25." },
                        axialLoad: { type: "number", description: "Axial load P in Newtons. Default 1000." },
                        offset: { type: "number", description: "Total bone-axis-to-plate eccentricity e in mm used by the secant formula (≈ r_bone + t/2 + any periosteum-plate gap). This is the geometric perpendicular distance from the line of action of the axial load to the plate centroid; it is always > 0 in bridging and cannot be reduced to zero by plate-bone contact. Default 5." }
                    },
                    required: ["workingLength"]
                }
            },
            {
                name: "search_pubmed",
                description: "Searches the live PubMed database via NCBI E-utilities and returns bibliographic records (title, authors, journal, year, PMID, DOI, URL). Use when the curated <app_literature> has no direct or partial match for the scenario, or when the user explicitly asks for PubMed / current literature / recent papers. Results are NOT in the curated library and have NOT been read — present them in the **PubMed (live):** section, never inside **From the app** or **Literature**.",
                input_schema: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "PubMed search query. Combine construct, scenario, and loading mode (e.g. 'locking plate working length axial fatigue')." },
                        max_results: { type: "number", description: "Maximum number of records to return (1-10). Default 5." }
                    },
                    required: ["query"]
                }
            }
        ];

        // ============================================================
        // TOOL HANDLERS
        // ============================================================
        function runCalculateBridgingStress(args) {
            const L = args.workingLength;
            const I_p = args.plateAMI || 25;
            const P = args.axialLoad || 1000;
            const e = args.offset || 5;
            const E = 114500; // Titanium Ti-6Al-4V
            const y = 1.5;    // Distance to outer fibre

            const EI = E * I_p;
            const k = Math.sqrt(P / EI);
            const secant = 1 / Math.cos((L / 2) * k);
            const deflection = e * (secant - 1);
            const moment = P * (e + deflection);
            const calculatedStress = (moment * y) / I_p;

            return {
                calculated_stress_MPa: calculatedStress,
                deflection_mm: deflection,
                moment_Nmm: moment,
                inputs_used: { L, I_p, P, e, E, y }
            };
        }

        // Hard wall-clock cap on the entire PubMed lookup (esearch + esummary).
        // NCBI eutils latency is bimodal — usually <2 s but occasionally
        // 8–15 s under load. Two sequential round-trips with no cap was
        // observed to single-handedly push Opus turns past the 24 s
        // Anthropic ceiling, surfacing as the user-visible
        // "Anthropic API call timed out after 24000 ms" error. 6 s leaves
        // ample headroom for typical NCBI responses and bounds worst-case
        // damage. On timeout the prefetch is treated as a soft failure
        // (the model's own `search_pubmed` tool remains available as a
        // fallback if the model decides it really needs hits).
        const PUBMED_TIMEOUT_MS = 6000;

        async function runSearchPubmed(args) {
            const query = (args && typeof args.query === "string") ? args.query.trim() : "";
            if (!query) {
                return { error: "search_pubmed requires a non-empty 'query' string." };
            }
            const requested = parseInt(args.max_results, 10);
            const retmax = Math.min(Math.max(Number.isFinite(requested) ? requested : 5, 1), 10);

            // NCBI etiquette: identify the tool. No API key required for low-volume use.
            const ncbiIdentity = {
                tool: "osteo-locked-plating-app",
                email: "noreply@osteo-locked-plating.app"
            };

            // One AbortController for the whole esearch + esummary chain
            // so the cap covers the combined wall time rather than per-leg.
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), PUBMED_TIMEOUT_MS);

            try {
                const esearchParams = new URLSearchParams({
                    db: "pubmed",
                    term: query,
                    retmode: "json",
                    retmax: String(retmax),
                    sort: "relevance",
                    ...ncbiIdentity
                });
                const esearchRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${esearchParams.toString()}`, { signal: controller.signal });
                if (!esearchRes.ok) {
                    return { error: `PubMed esearch failed with HTTP ${esearchRes.status}.` };
                }
                const esearchJson = await esearchRes.json();
                const ids = (esearchJson && esearchJson.esearchresult && esearchJson.esearchresult.idlist) || [];
                if (ids.length === 0) {
                    return { query, results: [], note: "No PubMed records matched the query." };
                }

                const esumParams = new URLSearchParams({
                    db: "pubmed",
                    id: ids.join(","),
                    retmode: "json",
                    ...ncbiIdentity
                });
                const esumRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?${esumParams.toString()}`, { signal: controller.signal });
                if (!esumRes.ok) {
                    return { error: `PubMed esummary failed with HTTP ${esumRes.status}.` };
                }
                const esumJson = await esumRes.json();
                const result = (esumJson && esumJson.result) || {};

                const records = ids.map(id => {
                    const r = result[id];
                    if (!r) return null;
                    const authors = Array.isArray(r.authors)
                        ? r.authors.map(a => a && a.name).filter(Boolean).slice(0, 6)
                        : [];
                    const articleIds = Array.isArray(r.articleids) ? r.articleids : [];
                    const doiEntry = articleIds.find(a => a && a.idtype === "doi");
                    const doi = doiEntry ? doiEntry.value : null;
                    const year = typeof r.pubdate === "string" ? r.pubdate.slice(0, 4) : "";
                    return {
                        pmid: id,
                        title: r.title || "(no title)",
                        authors,
                        journal: r.fulljournalname || r.source || "",
                        year,
                        doi,
                        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
                    };
                }).filter(Boolean);

                return { query, results: records };
            } catch (err) {
                if (err && err.name === "AbortError") {
                    return { error: `PubMed lookup timed out after ${PUBMED_TIMEOUT_MS} ms.` };
                }
                return { error: `PubMed lookup threw an exception: ${err && err.message ? err.message : String(err)}` };
            } finally {
                clearTimeout(timeoutId);
            }
        }

        async function dispatchTool(name, input) {
            const args = input || {};
            if (name === "calculate_bridging_stress") {
                return runCalculateBridgingStress(args);
            }
            if (name === "search_pubmed") {
                return await runSearchPubmed(args);
            }
            return { error: `Unknown tool: ${name}` };
        }

        // Netlify's hard cap on synchronous functions is 26 s. We abort the
        // upstream Anthropic call a couple of seconds before that so the
        // function can return a structured JSON error (which the UI surfaces
        // as "Sorry, encountered an error… (timed out)") instead of letting
        // Netlify kill the lambda and hand the browser an HTML 504 — which
        // would crash `response.json()` on the client and surface the
        // misleading generic "Network error. Please try again." toast.
        // 24 s leaves ~2 s of headroom for our own JSON serialisation and
        // the Lambda response round-trip.
        const ANTHROPIC_TIMEOUT_MS = 24000;

        async function callClaude(messageHistory, { effort, systemOverride, model, toolsOverride } = {}) {
            // Claude Opus 4.7 replaced the legacy
            // `thinking: { type: "enabled", budget_tokens: N }` contract with
            // `thinking: { type: "adaptive" }` plus `output_config.effort`.
            // `effort` is a CEILING on adaptive thinking depth — Claude still
            // scales up on its own when the prompt warrants it. We pin it to
            // "low" here because the system prompt is large (app knowledge +
            // literature library + injected PubMed JSON on every substantive
            // turn) and "high" pushes total latency past Netlify's 26 s
            // function limit, surfacing as either a "Network error" toast or
            // a reply truncated mid-sentence in the chat UI.
            const effortLevel = effort === "high" ? "high" : "low";
            const chosenModel = model || "claude-opus-4-7";
            // Sonnet 4.6 is only routed here for pure-literature meta-questions
            // (see isPureLiteratureMetaQuestion). Empirically those replies are
            // short (a paragraph + a citation list) and the model does NOT need
            // extended reasoning to synthesise <app_literature> + the prefetched
            // PubMed JSON. Adaptive thinking on a ~70 KB system prompt was
            // observed to push Sonnet past Anthropic's 24 s ceiling
            // ("Anthropic API call timed out after 24000 ms"), defeating the
            // whole point of routing away from Opus. So for Sonnet turns we
            // disable adaptive thinking entirely and cap max_tokens at a value
            // comfortably above any realistic lit-meta reply. Opus turns keep
            // the original adaptive-thinking + 16k budget — they're slower by
            // design but they handle the biomechanical reasoning load.
            const isFastLitTurn = /sonnet/i.test(chosenModel);
            const body = {
                model: chosenModel,
                // Adaptive thinking tokens are billed against `max_tokens`,
                // so a long internal reasoning pass can leave very little
                // headroom for the actual reply and surface as a reply that
                // truncates mid-sentence (e.g. "Literature: The curated app
                // library ("). Give the response budget meaningful room.
                max_tokens: isFastLitTurn ? 4096 : 16000,
                system: systemOverride || systemPrompt,
                tools: toolsOverride || tools,
                messages: messageHistory
            };
            if (!isFastLitTurn) {
                body.thinking = { type: "adaptive" };
                body.output_config = { effort: effortLevel };
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), ANTHROPIC_TIMEOUT_MS);
            let res;
            try {
                res = await fetch("https://api.anthropic.com/v1/messages", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": apiKey,
                        "anthropic-version": "2023-06-01"
                    },
                    body: JSON.stringify(body),
                    signal: controller.signal
                });
            } catch (err) {
                if (err && err.name === "AbortError") {
                    throw new Error(`Anthropic API call timed out after ${ANTHROPIC_TIMEOUT_MS} ms.`);
                }
                throw err;
            } finally {
                clearTimeout(timeoutId);
            }
            const json = await res.json();
            if (!res.ok) {
                const msg = json?.error?.message || JSON.stringify(json);
                throw new Error(`Anthropic API error ${res.status}: ${msg}`);
            }
            return json;
        }

        // ============================================================
        // Pull the user's latest prose. Used below to decide whether
        // this turn is substantive (→ pre-fetch PubMed) and whether
        // the user explicitly asked for citations (→ render the
        // **Literature:** / **PubMed (live):** sections).
        // ============================================================
        function lastUserText(history) {
            for (let i = history.length - 1; i >= 0; i--) {
                const m = history[i];
                if (m.role !== "user") continue;
                if (typeof m.content === "string") return m.content;
                if (Array.isArray(m.content)) {
                    // Skip tool_result-only turns; we want the user's actual prose.
                    const textBlock = m.content.find(b => b.type === "text" && typeof b.text === "string");
                    if (textBlock) return textBlock.text;
                }
            }
            return "";
        }

        // ============================================================
        // The trivial-vs-substantive classifier was previously used to
        // gate `effort: "high"`. We now run every turn at "low" (see
        // callClaude), so this only feeds the PubMed pre-fetch and the
        // citation-rendering decision below.
        // ============================================================
        const lastUser = lastUserText(messages).trim();

        // ============================================================
        // PROACTIVE PUBMED PRE-FETCH — runs on EVERY substantive turn.
        //
        // The product behaviour we want is:
        //   • From the app  → grounded in the formulas / models.
        //   • Broader context → ALWAYS grounded in the curated library
        //     and a fresh PubMed look-up, not in the LLM's raw recall.
        //   • Literature: / PubMed (live):  citation lists are rendered
        //     ONLY when the user explicitly asked for references.
        //
        // To make that possible we always pre-fetch PubMed (when the
        // turn is substantive) and inject the results into the system
        // prompt. The model uses them silently as grounding for
        // **Broader context**, and only renders the citation lists when
        // `userAskedForReferences` is true. Doing the fetch server-side
        // also avoids a second Anthropic round-trip via the
        // `search_pubmed` tool, which would blow past Netlify's 26 s
        // function limit.
        // ============================================================

        // Trivial = greetings / thanks / one-word acks. Anything else
        // is treated as substantive and triggers the PubMed pre-fetch.
        function isTrivialMessage(text) {
            const t = (text || "").trim();
            if (!t) return true;
            if (t.length < 12 && !/\?/.test(t)) return true;
            return /^(hi|hello|hey|thanks|thank you|thx|ok|okay|cool|got it|nice|great|sure|yes|no|yep|nope|bye)[\s!.?]*$/i.test(t);
        }

        // Detects explicit literature/evidence requests — controls
        // whether the citation lists are RENDERED in the reply. Includes
        // meta-question phrasings like "what literature did you use",
        // "what sources", "where did that come from", which are common
        // follow-ups after a turn that consulted the literature silently.
        const LITERATURE_REQUEST = /\b(what does (the )?literature|literature say|what literature|literature (used|did you|you used)|evidence|recent papers?|pubmed|current literature|what.*stud(y|ies)|what.*research|papers? on|any (studies|papers|research)|references?|citations?|cite|sources?|where (did|does).*(come|from))\b/i;
        const userAskedForReferences = LITERATURE_REQUEST.test(lastUser);
        const isSubstantive = !isTrivialMessage(lastUser);

        // Extracts a focused PubMed query from the last few messages by
        // matching key clinical/biomechanical terms from the conversation.
        function buildPubmedQuery(history) {
            const recent = history.slice(-4);
            const text = recent.map(m => {
                if (typeof m.content === 'string') return m.content;
                if (Array.isArray(m.content)) {
                    return m.content.filter(b => b.type === 'text').map(b => b.text).join(' ');
                }
                return '';
            }).join(' ').toLowerCase();

            const terms = [];

            // Plate construct (highest priority)
            if (/bridge plating|bridging construct|bridging osteosynthesis/.test(text)) {
                terms.push('bridge plating');
            } else if (/locking plate|locked plate/.test(text)) {
                terms.push('locking plate');
            } else {
                terms.push('locking plate'); // fallback
            }

            // Material
            if (/titanium/.test(text)) terms.push('titanium');
            if (/stainless steel/.test(text)) terms.push('stainless steel');

            // Biomechanical parameters
            if (/working length/.test(text)) terms.push('working length');
            if (/stiffness/.test(text)) terms.push('stiffness');
            if (/fatigue/.test(text)) terms.push('fatigue failure');
            if (/stress shielding/.test(text)) terms.push('stress shielding');

            // Loading mode
            if (/axial/.test(text)) terms.push('axial compression');
            if (/torsion/.test(text)) terms.push('torsion');
            if (/bending/.test(text)) terms.push('bending');

            // Anatomy
            if (/femur|femoral/.test(text)) terms.push('femur');
            if (/tibia|tibial/.test(text)) terms.push('tibia');
            if (/humerus|humeral/.test(text)) terms.push('humerus');
            if (/fracture/.test(text)) terms.push('fracture fixation');

            // Cap at 6 terms to keep the query focused
            return terms.slice(0, 6).join(' ');
        }

        // Decide routing UP FRONT so we can also use it to gate the
        // PubMed prefetch (see below). The classifier itself is defined
        // further down (see `isPureLiteratureMetaQuestion`, ~line 579) —
        // function declarations are hoisted to the top of the enclosing
        // function scope, so it's safe to call here.
        const routeToSonnet = isPureLiteratureMetaQuestion(lastUser);

        let prefetchedPubmedJSON = null;
        let prefetchedPubmedQuery = '';

        // Run the PubMed prefetch ONLY when:
        //   • the turn is substantive (skip greetings / "thanks");
        //   • we are NOT routing to Sonnet (Sonnet lit-meta turns
        //     answer from <app_literature> only — see commit history); and
        //   • the user has explicitly asked for references / evidence /
        //     citations on this turn.
        //
        // Why the userAskedForReferences gate (added to fix Opus turns
        // also breaching the 24 s Anthropic ceiling): when the user has
        // NOT asked for refs, the existing renderInstruction tells the
        // model to use the prefetched hits silently as "Broader context"
        // grounding only — never to render them. But the curated
        // <app_literature> block already grounds Broader context, so the
        // live PubMed hits are nice-to-have decoration, not load-bearing
        // content. They are NOT worth a 5–10 s synchronous NCBI eutils
        // round-trip on every biomechanical-reasoning turn — that round
        // trip plus Opus's adaptive thinking on a ~70 KB system prompt
        // was empirically pushing total wall time past 24 s and surfacing
        // as the user-visible "Sorry, I encountered an error" toast on
        // the very first message of a session.
        //
        // When the user DOES ask for refs we still prefetch (subject to
        // the 6 s PUBMED_TIMEOUT_MS) so the model can render the formal
        // **PubMed (live):** citation list in a single Anthropic call.
        // If the prefetch times out, the model falls back to its own
        // `search_pubmed` tool — slower but correct.
        if (isSubstantive && !routeToSonnet && userAskedForReferences) {
            prefetchedPubmedQuery = buildPubmedQuery(messages);
            if (prefetchedPubmedQuery) {
                try {
                    const pubmedData = await runSearchPubmed({ query: prefetchedPubmedQuery, max_results: 5 });
                    prefetchedPubmedJSON = JSON.stringify(pubmedData, null, 2);
                } catch (pubmedErr) {
                    // Non-fatal: if pre-fetch fails Claude will fall back to the tool
                    console.error('Proactive PubMed pre-fetch failed:', pubmedErr);
                }
            }
        }

        // Build the system prompt for this turn.
        //
        // For Sonnet lit-meta turns we drop the <app_documentation>
        // block entirely. That ~11 KB chunk contains the biomechanical
        // formulas, model derivations, and Tab/Concept references that
        // are critical for Opus's reasoning turns but irrelevant to a
        // pure literature-meta synthesis (which only needs
        // <app_literature> + the LITERATURE PROTOCOL section). Removing
        // it both speeds up Sonnet's prompt processing and stops the
        // model from spuriously dragging biomech reasoning into a
        // lit-meta reply.
        //
        // For Opus turns the prompt is unchanged, and we still inject
        // the prefetched PubMed JSON when present.
        let firstCallSystem;
        if (routeToSonnet) {
            firstCallSystem = systemPrompt.replace(
                /<app_documentation>[\s\S]*?<\/app_documentation>\n*/,
                ''
            );
        } else {
            firstCallSystem = systemPrompt;
            if (prefetchedPubmedJSON) {
                const renderInstruction = userAskedForReferences
                    ? `The user explicitly asked for references / evidence / citations on this turn, so RENDER the **PubMed (live):** section using these hits (per LITERATURE PROTOCOL §E.4) in addition to using them as grounding for **Broader context**.`
                    : `The user did NOT explicitly ask for references on this turn, so DO NOT render a **PubMed (live):** section. Use these hits SILENTLY as grounding for **Broader context** only — you may refer to them generically (e.g. "a recent PubMed entry on bridge plating in torsion") without producing the formal citation list.`;
                firstCallSystem = systemPrompt +
                    `\n\n<prefetched_pubmed_results query="${prefetchedPubmedQuery}">\n${prefetchedPubmedJSON}\n</prefetched_pubmed_results>\n\nIMPORTANT: PubMed results have already been fetched server-side for this turn (see above). ${renderInstruction} Do NOT call the \`search_pubmed\` tool on this turn — it would return identical results and waste time.`;
            }
        }

        // Always run at "low" effort. `output_config.effort` is a CEILING
        // on Opus 4.7's adaptive thinking, not a floor — the model still
        // scales internally on hard turns. Empirically, "high" combined
        // with the very large system prompt (app-knowledge.md +
        // literature.md + the injected PubMed JSON we now add to every
        // substantive turn) blew past Netlify's 26 s function cap and
        // surfaced as either a "Network error" toast (504 → JSON parse
        // throws) or a reply truncated mid-sentence.
        const effort = "low";

        // ============================================================
        // INTENT-BASED MODEL ROUTING (Option 3)
        // ------------------------------------------------------------
        // Pure literature meta-questions ("what does the literature say
        // about X?", "what papers did you cite?", "is the evidence
        // contradictory on Y?") don't need Opus's biomechanical
        // reasoning — they need fast, faithful synthesis of
        // <app_literature> + the prefetched PubMed JSON. Route those to
        // Sonnet 4.6, which lands in ~6–10 s on this prompt and avoids
        // Opus's 24 s timeout ceiling.
        //
        // The classifier is INTENTIONALLY conservative — false-positive
        // (biomech routed to Sonnet) degrades answer quality, whereas
        // false-negative (lit routed to Opus) only costs latency. So we
        // require BOTH a literature/meta cue AND the absence of any
        // biomechanical-reasoning cue before swapping models.
        // ============================================================
        function isPureLiteratureMetaQuestion(text) {
            const t = (text || "").trim().toLowerCase();
            if (!t) return false;
            // STRONG meta-literature phrasings — the question is
            // explicitly ABOUT what the literature/evidence says, not a
            // clinical-reasoning question that happens to mention
            // papers. When matched, we route to Sonnet even if the
            // topic of the question contains biomech terms (e.g. the
            // failing transcript turn "are there contradictory findings
            // in the literature regarding working length?" mentions
            // "working length" but is fundamentally a lit-meta query).
            //
            // Built from a few smaller named patterns instead of one
            // monster regex, so each tier can be edited or extended
            // without rewriting the whole expression. Author list lives
            // in one place; add to KNOWN_AUTHORS as the curated library
            // grows.
            const KNOWN_AUTHORS = [
                "stoffel", "hoffmeier", "bonyun", "gardner",
                "bottlang", "gautier", "perren", "egol", "wagner"
            ];
            const AUTHORS_RE = `(?:authors?|${KNOWN_AUTHORS.join("|")})`;
            const STRONG_LIT_META_PARTS = [
                // "what does/do/did the literature/research/etc say"
                String.raw`what (?:does|do|did) (?:the )?(?:literature|research|evidence|studies?|papers?|sources?)`,
                // "what literature/papers/etc did you use/cite"
                String.raw`what (?:literature|papers?|studies|research|sources?|references?|citations?) (?:did|do|have|are)`,
                // "in the literature, ..."
                String.raw`in the (?:literature|published evidence|published research)\b`,
                // "any studies/papers on ..."
                String.raw`any (?:studies|papers|research|trials?) on\b`,
                // "is there a study/paper/etc"
                String.raw`is there (?:a |any )?(?:study|paper|research|literature|trial|evidence)`,
                // "are there [contradictory|conflicting|...] findings/results in the literature ..."
                String.raw`are there (?:any )?(?:contradictory|conflicting|consistent|published)?\s*(?:findings|studies|papers|results|trials?|reports?|data) (?:in|from|across|on|regarding|about)`,
                // bare "contradictory/conflicting findings/results/literature"
                String.raw`(?:contradictory|conflicting) (?:findings|results|evidence|reports?|literature)`,
                // "consensus in/of/across the literature/evidence/studies"
                String.raw`consensus (?:in|of|across) (?:the )?(?:literature|evidence|studies)`,
                // "where did that come from"
                String.raw`where (?:did|does).*(?:come|from)`,
                // "show me your sources" / "cite the/that/your ..."
                String.raw`show me your sources`,
                String.raw`cite (?:your |that |the )`,
                // "what papers/sources/references did you use/cite"
                String.raw`what (?:papers?|sources?|references?) did you (?:use|cite)`,
                // "what did <author> say/find/conclude/..."
                String.raw`what did (?:the )?` + AUTHORS_RE + String.raw` (?:say|find|conclude|report|show)`,
                // "what does <author> [year] say/find/..."
                String.raw`what (?:does|do) ` + AUTHORS_RE + String.raw`(?:\s+\(?\d{2,4}\)?)?\s+(?:say|find|conclude|report|show|argue|claim)`
            ];
            const STRONG_LIT_META = new RegExp("(?:" + STRONG_LIT_META_PARTS.join("|") + ")");
            if (STRONG_LIT_META.test(t)) return true;
            // Otherwise fall back to the conservative rule: a literature
            // cue MUST be present AND no biomechanical-reasoning cue
            // can be present. False-negative (lit→Opus) only costs
            // latency; false-positive (biomech→Sonnet) degrades quality,
            // so the bias is intentionally toward Opus.
            const BIOMECH_CUES = /\b(stress|stiffness|strain|moment|deflection|secant|p-?delta|ami|i_?p|working length|load|axial|torsion|bending|fatigue|cyclic|titanium|stainless steel|ti |steel\b|plate (size|thickness|width)|screw|monocortical|bicortical|gap|bridging|closed[- ]gap|composite|parallel spring|model [123]|tab [1-4]|formula|calculate|compute|predict|how (much|many|big|stiff)|what happens (if|when|to)|should i (use|choose|pick)|which (plate|material|construct|model)|tibia|femur|humerus|fracture|osteosynthesis|callus|periosteum)\b/;
            if (BIOMECH_CUES.test(t)) return false;
            const LIT_META_CUES = /\b(literature|paper|papers|study|studies|research|reference|references|citation|citations|cite|cited|source|sources|pubmed|evidence|publication|publications|manuscript|manuscripts|author|authors|et al\.?|journal|abstract|finding|findings|contradict|contradictory|consensus|disagree|disagreement|controversy)\b/;
            return LIT_META_CUES.test(t);
        }

        // routeToSonnet was computed earlier so it could also gate the
        // PubMed prefetch. Sonnet 4.6 has its own quirks with the
        // `tools` API and tends to be more eager to call `search_pubmed`
        // than Opus. We skip the prefetch on Sonnet turns AND we omit
        // `search_pubmed` from its tools entirely so it can't add a
        // tool-loop iteration to a model we chose specifically to be
        // fast. `calculate_bridging_stress` is also dropped — pure-lit
        // meta-questions never need it, and a spurious tool call would
        // defeat the latency win.
        const turnModel = routeToSonnet ? "claude-sonnet-4-6" : "claude-opus-4-7";
        const turnTools = routeToSonnet ? [] : tools;

        let data = await callClaude(messages, {
            effort,
            systemOverride: firstCallSystem,
            model: turnModel,
            toolsOverride: turnTools
        });

        // ============================================================
        // TOOL EXECUTION LOOP
        // The model may call any combination of tools (calculate_bridging_stress,
        // search_pubmed) one or more times. Loop until the model stops asking
        // for tools, with a hard cap to prevent runaway cycles.
        // ============================================================
        let conversation = messages;
        const MAX_TOOL_ITERATIONS = 5;
        let toolIterations = 0;
        while (data.stop_reason === "tool_use" && toolIterations < MAX_TOOL_ITERATIONS) {
            toolIterations++;
            const toolUseBlocks = (data.content || []).filter(block => block.type === "tool_use");
            if (toolUseBlocks.length === 0) break;

            const toolResults = [];
            for (const tub of toolUseBlocks) {
                const result = await dispatchTool(tub.name, tub.input);
                toolResults.push({
                    type: "tool_result",
                    tool_use_id: tub.id,
                    content: JSON.stringify(result)
                });
            }

            conversation = [
                ...conversation,
                { role: "assistant", content: data.content },
                { role: "user", content: toolResults }
            ];

            data = await callClaude(conversation, {
                effort,
                model: turnModel,
                toolsOverride: turnTools
            });
        }

        const replyText = (data.content || [])
            .filter(block => block.type === "text")
            .map(block => block.text)
            .join("\n");

        if (!replyText) {
            throw new Error(`No text reply from model. stop_reason=${data.stop_reason}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: replyText })
        };

     } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message, stack: error.stack })
        };
    }
};
