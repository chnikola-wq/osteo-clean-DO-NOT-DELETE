exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.ANTHROPIC_API_KEY;

        // ============================================================
        // APP KNOWLEDGE BASE
        // Extracted directly from index.html. Everything below is what
        // the app actually teaches. Keep this in sync with the app.
        // ============================================================
        const appKnowledge = `
<app_documentation>
APP TITLE: Locked Plating: Clinical Guidelines & Biomechanics
APP TYPE: Interactive 6-tab teaching tool with live calculators for veterinary and human orthopaedic surgeons.
SCOPE NOTE: The app is calibrated for a medium-sized canine bone (I_bone = 10,000 mm^4 reference). Absolute stress numbers from different tabs use incompatible model assumptions and CANNOT be directly compared on the same number line.

============================================================
MATERIAL CONSTANTS USED THROUGHOUT THE APP
============================================================
- Bone modulus (E_bone): ~17,890 MPa (cortical bone reference)
- Titanium alloy Ti-6Al-4V (E_Ti): 114,500 MPa  →  modular ratio n ≈ 6.4
- 316L Stainless Steel (E_St): 187,500 MPa     →  modular ratio n ≈ 10.4
- Titanium yield strength reference shown on graphs: ~750 MPa
- Modular ratio definition: n = E_implant / E_bone
- Stress unit: MPa (equivalent to N/mm²)

============================================================
TAB 1 — CORE BIOMECHANICS (compressed, load-sharing constructs)
============================================================
SCOPE: Models a well-reduced, compressed construct under FOUR-POINT BENDING (the standard model for diaphyseal bone under physiological bending). Even compressed constructs can lose load-sharing if the external moment opens the gap rather than compressing it (open-gap loading) — in that case, see Tab 3.

CONCEPT 1 — Non-Uniform Stress & AMI:
- Bending generates a linear stress gradient across the cross-section.
- Stress is zero at the Neutral Axis (where compression transitions to tension) and grows linearly with distance y from it.
- Pure bending stress formula: sigma = M * y / AMI
- Area Moment of Inertia (AMI) is purely GEOMETRIC — it does not depend on material. It measures resistance to bending about the bending axis. Larger AMI means less bending under a given moment, hence less stress.

CONCEPT 2 — Modulus & The Composite AMI:
- In compression osteosynthesis the bone and plate act together.
- Engineers use the bone as the baseline material and transform the plate using the modular ratio n = E_implant / E_bone (Transformed Section Method).
- The neutral axis is pulled away from the geometric centre TOWARDS the stiffer material.
- Composite AMI = n*(I_plate + A_plate * d_plate^2) + (I_bone + A_bone * d_bone^2)
- Plate stress in the composite: sigma_plate = n * (M * y) / Composite_AMI
- The factor n in the numerator converts the transformed-bone stress back into actual plate-material stress.

CONCEPT 3 — The Material Compliance Paradox:
- Counter-intuitively, a STIFFER plate (Steel) experiences MORE stress than a MORE COMPLIANT plate (Titanium) of identical geometry.
- Reason: Steel's high n (~10.4) drastically pulls the neutral axis towards the plate (crushing d_plate), and the n multiplier in the numerator dominates.
- Titanium's lower n (~6.4) keeps the neutral axis better balanced and the multiplier smaller, so final plate stress is lower.
- Verified app claim: switching Steel → Titanium at 60 mm working length reduces plate stress by ~73 MPa in the parallel-spring (load-sharing) model. Steel produces ~4 MPa more plate stress than Titanium at identical geometry in the composite model.

CONCEPT 4 — The Geometric Contrast (changing plate SIZE, not material):
- Making the plate thicker increases I_p and A_p with NO new n multiplier penalising the equation.
- Total Composite AMI rises rapidly, naturally lowering stress.
- BUT: Diminishing Returns Illusion — as the plate gets thicker it pulls the neutral axis further towards itself, paradoxically reducing the plate's net contribution. Going from 2.7mm to 3.5mm Narrow drops stress by ~2.2 MPa; from 3.5 Narrow to 3.5 Broad only ~1.6 MPa; from 3.5 Broad to 4.5 Broad only ~0.7 MPa.

CONCEPT 5 — Span-Material Equivalence (Parallel Spring Model):
- L (working length) is NOT in the bending stress formula directly. So how does L affect plate stress in a closed-gap, compressed construct? Through LOAD SHARING.
- Plate and bone behave like two springs in parallel. The stiffer one carries more load.
- Plate rotational stiffness: K_plate = E * I_p / L
- Increasing L makes the plate "softer" (K_plate drops), so the bone shoulders a larger fraction of the moment.
- Moment-sharing: M_plate = M_total * (K_plate / (K_plate + K_bone))
- Verified app claim: in the load-sharing model, increasing L drops plate stress at an average rate of ~2.4 MPa per mm.
- IMPORTANT WARNING (carried throughout the app): increasing L is SAFE only in load-sharing scenarios. In load-bearing (bridging / open-gap) it is DANGEROUS — see Tab 3.

CONCEPT 6 — The Verdict (Material vs Span vs Geometry):
- Material change (Steel→Ti) gives the largest stress reduction without any added bulk.
- Span lengthening is effective in compression but hazardous in bridging.
- Geometry up-sizing yields rapidly diminishing returns (rate falls from -0.11 to -0.007 MPa per unit I_p).

============================================================
TAB 2 — CONSTRUCTS & PLANES
============================================================
- Anatomical position determines the bending axis and whether composite (load-sharing) or isolated (load-bearing) AMI applies.
- ORTHOGONAL bending across the plate gaps the far cortex; bone acts only as a hinge → drop to Isolated Implant AMI.
- COMMINUTED fracture with a gap → no bone support → Composite AMI no longer applies; use combined Isolated Implant AMI of all implants.
- 180° (parallel plate setups): symmetrical, highly compliant, promote callus formation, superior fatigue life. Risk: insufficient rigidity.
- 90° (orthogonal plate setups): ultra-stiff against buckling. Risk: significant fatigue penalty due to skew bending stress risers (confirmed by FEA).
- Clinical tip: 180° excels in biological healing; 90° trades fatigue resilience for rigid alignment against buckling.

============================================================
TAB 3 — WORKING LENGTH (BRIDGING / load-bearing)
============================================================
SCOPE: The bridging configuration. Same maths approximates a compressed construct loaded in open-gap mode.

FOUR-POINT BENDING vs AXIAL LOADING — THE KEY DISTINCTION:
- In pure (four-point) bending, the moment M is constant between the inner load points; lengthening L alone does NOT increase stress.
- Under an axial compressive load P, increasing L makes the plate deflect more, shifting the line of action away from the plate's axis. Eccentricity becomes (e + delta), so M = P * (e + delta) grows. THIS is why working length exponentially raises stress in bridging.

THE P-DELTA EFFECT (the maths the calculator implements):
- Bending stiffness: EI = E * I_p
- Buckling parameter: k = sqrt(P / EI)
- Secant amplification: sec(kL/2) = 1 / cos(kL/2)
- Total deflection: delta = e * (sec(kL/2) - 1)
- Peak moment: M = P * (e + delta)
- Peak stress: sigma = M * y / I_p
- Default constants in the live calculator: E = 114,500 MPa (Titanium), y = 1.5 mm, I_p default 25 mm^4, P default 1000 N, e default 5 mm.
- Visual states in the live model:
  • Large gap, L > 50 mm  → "HIGH STRESS"
  • Large gap, L ≤ 50 mm  → "MODERATE STRESS"
  • Small gap with bone contact re-established → "LOAD SHARING (SAFE)"
- Independently verified: at L = 120 mm, deflection delta ≈ 7.08 mm, stress sigma ≈ 724 MPa — close to the displayed ~750 MPa Ti yield reference line.

============================================================
TAB 4 — OFFSET & BENDING
============================================================
- Locking plates are often positioned off the periosteum to preserve blood supply, but this offset (e) creates a baseline bending moment.
- Combined lever effect: in a bridging construct the plate also deflects (delta) under axial load; e and delta both act in the same direction and are ADDITIVE.
- Therefore offset directly amplifies the P-Delta effect.
- Most dangerous combination: HIGH offset + LONG working length. e generates a high baseline moment, then L exponentially amplifies it via deflection. Stresses compound catastrophically.
- Periosteal contact (e = 0): zero baseline moment; any bending must come from delta alone. Mechanically optimal starting condition.

============================================================
TAB 5 — DCP vs LCP MECHANICS (screw mechanics)
============================================================
- Based on MacLeod, Simpson & Pankaj (2015).
- Question addressed: why do conventional DCPs fail more often than LCPs in osteoporotic bone?
- Answer: screw-tightening preload strain.
  • DCP (compression plate): tightening the screw drags the plate against the bone, generating peri-screw strain 360° around the hole, regardless of subsequent loading. In osteoporotic bone this preload strain is severe and persistent.
  • LCP (locking plate): no compression against bone; strain only arises with applied load and is one-sided rather than circumferential.
- Confirmed by finite element analysis.

============================================================
TAB 6 — ADVANCED CONCEPTS
============================================================
- Euler-Bernoulli beam theory: in a free-floating uniform material, plane sections remain plane and there must exist a fulcrum plane of zero strain — the neutral axis. For a uniform unconstrained material the kinematic bending axis and the axis of zero stress are identical and rest exactly at the geometric centroid.
- For composite (plate + bone) constructs: the stiffer material would generate massive unbalanced internal forces if the axis stayed at the geometric centre. To restore equilibrium (sum of internal forces = 0) the bending axis is pulled towards the stiffer material. This is calculated via the Transformed Section Method.
- App's own self-audit (also in this tab):
  • All formulas (Composite AMI, P-Delta secant, parallel spring) are implemented correctly and verified.
  • CAVEAT 1 — Tab 1 contains TWO different frameworks. Composite AMI gives ~20 MPa at the reference load; Parallel Spring gives ~293 MPa for the same inputs. Both are internally valid but measure stress under incompatible assumptions and cannot be placed on the same number line.
  • CAVEAT 2 — App is calibrated to medium canine bone (I_bone = 10,000). Absolute numbers are not directly applicable to human patients without recalibration.
  • Used as a CONCEPTUAL teaching tool, the app is excellent. It teaches: the material paradox, the P-Delta effect, the load-sharing inversion, and DCP-vs-LCP preload mechanics.

============================================================
THE EMBEDDED AI TUTOR (this assistant)
============================================================
- Available via the floating button in the app.
- Has access to one tool: calculate_bridging_stress, which runs the exact Tab 3 P-Delta calculation server-side using the same constants the app uses (E = 114,500 MPa Titanium, y = 1.5 mm).
</app_documentation>
        `.trim();

        // ============================================================
        // SYSTEM PROMPT
        // ============================================================
        const systemPrompt = `You are an expert orthopaedic biomechanics tutor embedded inside the "Locked Plating: Clinical Guidelines & Biomechanics" surgical teaching app. You assist surgeons (primarily veterinary, but the principles apply to human orthopaedics with the calibration caveat below).

${appKnowledge}

CRITICAL GROUNDING RULES:
- The <app_documentation> block above is your AUTHORITATIVE source for what THIS APP teaches. Treat it as the single source of truth for any question about the app's content, formulas, defaults, tabs, or claims.
- Quote specific tab numbers/names when referencing app content (e.g., "Tab 3 — Working Length covers this with the P-Delta secant formula").
- If a user asks about something the app does NOT cover, say so plainly under "From the app:" — do not invent app content.
- NEVER guess numbers. If the user asks about plate stress for specific parameters, ALWAYS call the calculate_bridging_stress tool — never compute by hand or estimate.
- The app is calibrated for medium canine bone. If the user asks about human application, mention this caveat.
- The two Tab-1 frameworks (Composite AMI vs Parallel Spring) give different absolute numbers for the same inputs. If a user is confused by mismatched numbers between tabs, explain the framework difference rather than treating one as wrong.

ANSWER STRUCTURE — use on every substantive question:

**From the app:** Answer using ONLY the <app_documentation> above and any tool results. Reference the specific tab(s). If the app doesn't cover the question, say so explicitly here.

**Broader context:** Then add a short second section drawing on your wider biomechanics and orthopaedic knowledge — related considerations, alternative approaches, recent literature, clinical caveats, or anything a surgeon should know that the app itself doesn't model. Make clear this is general knowledge, not from the app.

For trivial messages (greetings, "thanks", one-word clarifications), skip the structure and reply naturally in 1–2 sentences.

Be concise and professional. Surgeons are time-poor.`;

        // ============================================================
        // TOOL DEFINITION — Tab 3 P-Delta calculator
        // ============================================================
        const tools = [
            {
                name: "calculate_bridging_stress",
                description: "Calculates the maximum plate stress in MPa for a bridging construct using the P-Delta (secant) effect, exactly matching the live calculator on Tab 3 of the app. Always use this when the user asks for a specific stress value — never guess.",
                input_schema: {
                    type: "object",
                    properties: {
                        workingLength: { type: "number", description: "Unsupported working length L in mm (e.g., 60)." },
                        plateAMI: { type: "number", description: "Plate Area Moment of Inertia I_p in mm^4. Default 25." },
                        axialLoad: { type: "number", description: "Axial load P in Newtons. Default 1000." },
                        offset: { type: "number", description: "Initial bone-plate offset e in mm. Default 5." }
                    },
                    required: ["workingLength"]
                }
            }
        ];

        async function callClaude(messageHistory) {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({
                    model: "claude-opus-4-7",
                    max_tokens: 1024,
                    system: systemPrompt,
                    tools: tools,
                    messages: messageHistory
                })
            });
            return res.json();
        }

        let data = await callClaude(messages);

        // Tool execution loop
        if (data.stop_reason === "tool_use") {
            const toolUseBlock = data.content.find(block => block.type === "tool_use");
            const args = toolUseBlock.input;

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

            const followUpMessages = [
                ...messages,
                { role: "assistant", content: data.content },
                {
                    role: "user",
                    content: [
                        {
                            type: "tool_result",
                            tool_use_id: toolUseBlock.id,
                            content: JSON.stringify({
                                calculated_stress_MPa: calculatedStress,
                                deflection_mm: deflection,
                                moment_Nmm: moment,
                                inputs_used: { L, I_p, P, e, E, y }
                            })
                        }
                    ]
                }
            ];

            data = await callClaude(followUpMessages);
        }

        const replyText = data.content
            .filter(block => block.type === "text")
            .map(block => block.text)
            .join("\n");

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: replyText })
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
