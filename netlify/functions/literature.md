# Literature Library — Locked Plating Biomechanics

This file is the **single source of truth** for any manuscript the chatbot is
allowed to cite in its **From the app** section or in the dedicated
**Literature** section of an answer. The bot must NOT invent or recall papers
from its general training and present them as if they came from this library —
those belong only in **Broader context** and must be flagged as such.

---

## How to read each entry

Every entry follows the same fixed schema so the bot can compare a paper's
experimental conditions to whatever construct/loading scenario the user is
currently discussing.

```
### <Short tag>  (e.g. "Stoffel 2003")
- **Citation:** Authors. Title. Journal Year;Vol(Issue):Pages. DOI.
- **Finding (one line):** ...
- **Loading conditions:**
    - Load type: axial compression | four-point bending | torsion | cyclic fatigue | combined
    - Magnitude: e.g. 1000 N axial, or 10 Nm bending moment
    - Cycles: single ramp | N cycles to failure | runout at N cycles
    - Rate: e.g. 5 mm/min, 1 Hz
- **Construct conditions:**
    - Gap state: closed-gap | bridging (fracture-gap size in mm) | osteotomy width
    - Working length: mm (or "n/a" if not applicable)
    - Plate material: Titanium (Ti-6Al-4V) | Stainless Steel | other
    - Screw configuration: e.g. 3+3 locking, hybrid, leave-one-out near fracture
    - Bone model: synthetic (Sawbones grade) | cadaveric human | canine | ovine | other; bone diameter if reported
- **Model relevance:**
    - Composite AMI (Model 1) | Parallel Spring (Model 2) | P-Delta (Model 3)
    - One-line note on why this paper maps to that model.
```

If a field is unknown, write `unknown` — do **not** guess. The bot is
instructed to treat `unknown` fields as "cannot confirm match" rather than as
agreement.

---

## How the chatbot uses this file

When the user asks for literature/evidence/references, the bot:

1. Pulls the current **scenario context** from the dialogue (model, gap state,
   loading mode, working length, material).
2. Walks every entry below and classifies it as:
    - **Direct match** — same gap state AND same loading mode.
    - **Partial match** — one of the two matches; the other differs.
    - **Tangential** — different scenario but shares a relevant concept.
3. Presents direct matches first, then partials, then tangentials. For every
   non-direct match it must explicitly state the discrepancy.
4. If nothing in this file matches the discussed scenario, it must say so
   plainly rather than fabricate a reference.

---

# Manuscripts

<!--
    Add real entries below this line, one per manuscript, using the schema
    above. The placeholder entries that follow show the expected format and
    should be REPLACED (not extended) with curated references. They are
    deliberately marked as PLACEHOLDER so the bot can recognise and ignore
    them until they are filled in.
-->

### PLACEHOLDER-1  (replace with real entry)
- **Citation:** _PLACEHOLDER — replace with real authors/year/journal/DOI._
- **Finding (one line):** _PLACEHOLDER — one sentence summarising the headline result._
- **Loading conditions:**
    - Load type: _PLACEHOLDER (e.g. axial compression)_
    - Magnitude: _PLACEHOLDER (e.g. 1000 N)_
    - Cycles: _PLACEHOLDER (e.g. single ramp to failure)_
    - Rate: _PLACEHOLDER_
- **Construct conditions:**
    - Gap state: _PLACEHOLDER (closed-gap | bridging Xmm)_
    - Working length: _PLACEHOLDER (mm)_
    - Plate material: _PLACEHOLDER_
    - Screw configuration: _PLACEHOLDER_
    - Bone model: _PLACEHOLDER_
- **Model relevance:** _PLACEHOLDER — which of Model 1 / 2 / 3 and why._

### PLACEHOLDER-2  (replace with real entry)
- **Citation:** _PLACEHOLDER._
- **Finding (one line):** _PLACEHOLDER._
- **Loading conditions:**
    - Load type: _PLACEHOLDER_
    - Magnitude: _PLACEHOLDER_
    - Cycles: _PLACEHOLDER_
    - Rate: _PLACEHOLDER_
- **Construct conditions:**
    - Gap state: _PLACEHOLDER_
    - Working length: _PLACEHOLDER_
    - Plate material: _PLACEHOLDER_
    - Screw configuration: _PLACEHOLDER_
    - Bone model: _PLACEHOLDER_
- **Model relevance:** _PLACEHOLDER._
