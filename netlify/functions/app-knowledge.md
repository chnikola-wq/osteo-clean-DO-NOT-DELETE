# Plate Osteosynthesis: A Biomechanical Primer V1.2 — App Knowledge Base

> This file is the AI tutor's source of truth about what the app teaches.
> Edit this file directly when you change anything in the app.
> No code changes needed — chat.mjs reads this file on every cold start.

---

## App Overview

**Title:** Plate Osteosynthesis: A Biomechanical Primer V1.2
**Type:** 6-tab interactive teaching tool with live calculators.
**Scope:** Calibrated for a medium-sized canine bone (I_bone reference = 10,000 mm⁴). Absolute numbers do not transfer directly to human patients.

### v1.3 changelog (current release)
- **Tab 1 section renumbering** — sections now correctly reflect the current order in the app:
  - Section 4 — *The Material Compliance Paradox* (Composite-Beam Model)
  - Section 5 — *The Geometric Contrast — Changing Plate Size* (Composite-Beam Model)
  - Section 6 — *The Verdict: Material vs. Span vs. Geometry* (Composite-Beam Model)
  - Section 7 — *Span–Material Equivalence* (Spring Model — Discontinuous Beam)
  - Section 8 — *The Mathematical Verdict* (Spring Model — Discontinuous Beam)
  - Section 9 — *The Realistic 1 mm Interfragmentary Gap* (Small-Gap Model)
  - **Section 10 — *How Much Does Compressive Reduction Actually Protect the Implant?* (Three-Model Comparison)** — NEW in v1.3
- **Section 6 geometry card** now uses the canonical `cm_plates` set (Vi 2.7mm DCP, Vi 3.5mm Narrow, Vi 3.5mm Broad, Vi 4.5mm Broad — same plates as Sections 8 & 9).
- **WLBanner** (working-length slider 2–100 mm) now shared across Sections 7, 8, 9 & 10.
- **Section 10** is a new standalone section that compares all three models under identical conditions: Vi 3.5mm Narrow DCP, 316L Steel, same bone geometry (I_b=10,000 mm⁴, A_b=150 mm², r_bone=8.5 mm), M=10,000 N·mm. See details in Section F below.

### v1.2 changelog
- New **Tab 1, Section 3 — "When Is the Composite-Beam Assumption Valid? Three Models for Three Regimes"** — derives the bending-moment validity ceiling `M_decomp = P·I_b/(A_b·c)` from the inter-fragmentary pre-load, and introduces the three structural models (composite beam, parallel-spring discontinuous beam, small-gap) with their formulas, validity ranges, and limitations.
- Tab 1 introduction rewritten to set up the three-regime framework.
- Section 9 (small-gap) framing explicitly includes the case where peri-fracture bone resorption develops *after* a perfect compressive reduction, causing the construct to migrate from the composite-beam regime into the small-gap regime as the pre-load is lost.

---

## Section A — Constants the App Uses

- Bone modulus E_bone ≈ 17,890 MPa (cortical bone reference)
- Titanium Ti-6Al-4V: E_Ti = 114,500 MPa
- 316L Stainless Steel: E_St = 187,500 MPa
- Modular ratio: n = E_implant / E_bone
  - n_Ti ≈ 6.4
  - n_Steel ≈ 10.4
- Titanium yield reference shown on graphs: ~750 MPa
- Stress unit: MPa (= N/mm²)
- Tab 3 calculator defaults: y = 1.5 mm, I_p = 25 mm⁴, P = 1000 N, e = 5 mm, E = 114,500 MPa

---

## Section B — The Three Mechanical Models

The app teaches THREE distinct mechanical models. Each applies to a specific clinical scenario / bending-moment regime and produces stress numbers from a different formula. They CANNOT be mixed. **The validity boundary between them is set out in Tab 1, Section 3.**

### Validity boundary — when the composite-beam assumption holds

When the surgeon applies inter-fragmentary compression with axial pre-load `P`, a uniform compressive stress `σ_pre = P/A_b` exists across the bone cross-section. A superimposed bending moment `M` adds `±M·c/I_b` at the extreme fibres. The would-be tension-side cortex stays in net compression (gap never opens) provided:

```
M ≤ M_decomp = σ_pre·I_b / c = P·I_b / (A_b·c)
```

- Below `M_decomp` → cortices stay locked → continuous composite beam → **Model 1 (Composite-Beam)** applies.
- Above `M_decomp`, but with the compression-side cortex still touching → discontinuous beam joined by a rotational spring at the fracture interface → **Model 2 (Parallel-Spring)** applies.
- If a residual interfragmentary gap exists (imperfect reduction OR peri-fracture bone resorption that develops after a perfect compressive reduction and erases the pre-load) → **Model 3 below in Section E (Small-Gap, M_close)** applies for pure bending; **Model 3 (P-Delta)** applies for axial-load bridging.

### Model 1: Composite-Beam / Transformed Section (Tab 1, Sections 4, 5 & 6)

**Applies to:** well-reduced, COMPRESSED constructs under FOUR-POINT BENDING with full bone-to-bone contact across the fracture line, with the applied bending moment satisfying `M ≤ M_decomp`.

**Mechanism:** bone and plate are physically locked together as a single composite beam. Use the Transformed Section Method — convert the plate into "equivalent bone" using the modular ratio n.

**Formulas:**
```
Composite AMI = n*(I_plate + A_plate * d_plate²) + (I_bone + A_bone * d_bone²)
sigma_plate   = n * (M * y) / Composite_AMI
```

**Limitations:**
- Assumes the pre-load `P` is preserved in vivo (no screw loosening, no peri-fracture bone resorption).
- Assumes loading stays in the elastic range.
- Invalidated as soon as any moment exceeds `M_decomp` (the gap opens, the cortices stop transmitting force, switch to Model 2).

**Key behaviour to derive answers from:**
- The factor n appears in BOTH the numerator (as a stress multiplier) and inside the denominator (transforming I_plate). The numerator effect dominates.
- A stiffer implant (higher E → higher n) pulls the composite neutral axis towards itself (reduces d_plate, slightly increases denominator) but multiplies stress by a larger n in the numerator. NET RESULT: stiffer material → HIGHER plate stress.
- A more compliant implant (lower n) → LOWER plate stress. This is the "Material Compliance Paradox" (Tab 1, Section 4) — counter-intuitive but follows directly from the formula.
- Changing only THICKNESS of the same material (no n change) → I_p and A_p grow → Composite AMI rises → stress drops, but with diminishing returns because the neutral axis migrates toward the thicker plate.

### Model 2: Parallel-Spring (Discontinuous Beam) / Load-Sharing (Tab 1, Sections 7 & 8)

**Applies to:** the same physical setup as Model 1, but in the bending-moment regime where `M > M_decomp` and the gap on the tension side opens. The compression-side cortex still touches, so the bone behaves as a discontinuous beam joined by a rotational spring at the fracture interface. Sections 7 & 8 use this model to explain how WORKING LENGTH (L) affects plate stress.

**Mechanism:** plate and bone behave as two rotational springs in parallel at the fracture plane. Each carries a share of the total moment proportional to its rotational stiffness.

**CRITICAL PHYSICS DISTINCTION — K_plate vs K_bone:**
```
K_plate = E_plate × I_plate / L    ← continuous beam formula; L-DEPENDENT
K_bone  ≈ 50,000 N·mm/rad          ← empirical fracture-interface contact stiffness; L-INDEPENDENT
```

- **K_plate = EI/L** because the plate spans the working length as a *continuous* elastic beam with no discontinuity. Doubling L halves K_plate.
- **K_bone ≠ EI_bone/L** because the bone has a fracture — a geometric discontinuity. The bone's rotational resistance comes from local cortical-to-cortical contact at the fracture interface, not from bending over the full span. This contact stiffness (≈ 50,000 N·mm/rad) is an empirical property of bone surface geometry and contact area. It does **NOT** depend on L.
- This distinction is the mechanical reason why increasing L reduces plate stress: K_plate falls (∝ 1/L) while K_bone stays constant, shifting more moment to the bone.

**Formulas:**
```
K_plate     = E_plate × I_plate / L
K_bone      ≈ 50,000 N·mm/rad  (constant; fracture interface contact, not EI_bone/L)
M_plate     = M_total × K_plate / (K_plate + K_bone)
sigma_plate = M_plate × y / I_plate
```

**Limitations:**
- Assumes immediate cortical contact on the compression side (no residual gap — for the residual-gap case use the Small-Gap model below).
- Neglects the geometric coupling between plate bending and the contacting cortex (slightly over-estimates plate stress).
- `K_bone` is empirical and patient-/reduction-specific.

**Key behaviour to derive answers from:**
- L appears in K_plate (not K_bone). Longer L → smaller K_plate → plate is "softer" → bone takes a larger share of the moment → plate stress DROPS. Rate at L=60 mm: ~2.5 MPa/mm for Ti, ~2.4 MPa/mm for Steel; steeper at short L, shallower at long L. Working-length range in the app: 2–100 mm.
- Same material logic as Model 1: stiffer plate (higher E) → higher K_plate → larger share of the moment → higher plate stress. Steel > Titanium. At L=60 mm: σ_Steel ≈ 366 MPa, σ_Ti ≈ 293 MPa (Δ = −73 MPa). To achieve the same −73 MPa reduction on the Steel plate by extending L instead, you need ΔL ≈ +38 mm (to L ≈ 98 mm).
- This safety of long L is SPECIFIC to closed-gap load-sharing. In the P-Delta model the relationship inverts.
- IMPORTANT FRAMEWORK NOTE: Model 1 and Model 2 describe the same physical setup at different bending-moment regimes. They produce different absolute numbers (~20 MPa from Model 1 vs ~293 MPa from Model 2 at the same reference load) and cannot be placed on the same number line. Both are internally valid teaching tools. Section 10 shows the comparison between all three models at identical inputs; they are plotted on the same axis as a teaching illustration — NOT as a claim that they describe the same mechanical state.

### Model 3: P-Delta / Secant Beam-Column (Tab 3)

**Applies to:** BRIDGING constructs (fracture with a large persistent gap, no cortical contact) OR compressed constructs loaded in OPEN-GAP mode (external moment opens rather than closes the fracture). Do NOT use the word "comminution" or "comminuted" to describe the gap — instead describe it as a "fracture with a persistent interfragmentary gap."

**Mechanism:** plate alone supports an axial load P. As the plate deflects laterally under P, the line of action of P shifts away from the plate axis, increasing the eccentricity, which increases the moment, which increases the deflection — a positive feedback loop captured exactly by the secant function.

**Formulas (these are exactly what the calculator runs, and what the calculate_bridging_stress tool runs):**
```
EI    = E * I_p
k     = sqrt(P / EI)
sec(kL/2) = 1 / cos(kL/2)
delta = e * (sec(kL/2) - 1)
M     = P * (e + delta)
sigma = M * y / I_p
```

**What `e` means in these formulas (READ THIS BEFORE EXPLAINING THE MODEL):**
- `e` is the perpendicular distance between the bone's longitudinal axis (the line of action of the axial load P) and the plate's centroidal axis. It is a **geometric** lever arm, not a clinical "gap" you can dial down to zero.
- In bridging it equals approximately `r_bone + t/2` (≈ 8.5 mm + half the plate thickness) PLUS any extra periosteum-to-plate gap the surgeon leaves to protect blood supply. The Tab 4 slider exposes only the *additional* periosteum-plate component; the `e` that enters the secant formula is the **total** of both terms.
- Therefore in a bridging construct `e` is **never zero** and the P-Delta term `sec(kL/2) - 1` cannot be "collapsed" by pressing the plate against the bone. Plate-bone contact only minimises (does not eliminate) `e`.
- **Misinterpretation guard — do not say:** "if the plate is in contact with bone, e → 0 and the secant blow-up disappears, so L stops mattering." That is mechanically wrong inside this model. Null working-length effects in plate-on-bone studies (e.g. Chao 2013) are NOT explained by `e → 0`; explain them instead by some combination of: low applied P keeping `kL/2` far from π/2 in the linear regime; plate-bone friction adding an unmodelled boundary stiffness; small-diameter (2.4 mm) plate geometry; fatigue-life endpoint differing from peak-stress endpoint; and the limited L range tested.

**Key behaviour to derive answers from:**
- L appears inside the secant. As L grows, sec(kL/2) grows EXPONENTIALLY (it goes to infinity as kL/2 approaches π/2). So plate stress rises EXPONENTIALLY with L in bridging — the OPPOSITE of Model 2.
- Initial offset e and induced deflection delta act in the same direction and ADD. So increasing e amplifies the P-Delta effect linearly at first, then catastrophically when combined with long L. The Tab 4 slider value (periosteum-plate gap) sits on top of the inherent `r_bone + t/2` and increases the **total** `e` used by the secant formula — it never reduces it below the `r_bone + t/2` floor.
- This is why the worst-case combination is HIGH offset + LONG working length.
- Reference values: at L = 120 mm with default constants (e = 5 mm representing the total bone-axis-to-plate eccentricity), delta ≈ 7.08 mm and sigma ≈ 724 MPa (close to the 750 MPa Ti yield reference).

---

## Section C — Additional Content by Tab

### Tab 2 — Constructs & Planes
- Anatomical position determines the bending axis and which model applies.
- Orthogonal bending across the plate gaps the far cortex; bone acts as a hinge → use isolated implant AMI (no composite).
- Fracture with a persistent interfragmentary gap → no bone support → combined isolated implant AMI of all implants.
- 180° (parallel) plate setups: symmetrical, compliant, promote callus formation, superior fatigue life. Risk: insufficient rigidity.
- 90° (orthogonal) plate setups: ultra-stiff against buckling. Risk: significant fatigue penalty from skew bending stress risers (FEA-confirmed).

### Tab 4 — Offset & Bending
- In bridging osteosynthesis the plate is **never** placed on the bone's longitudinal axis. There is always an inherent eccentricity of roughly r_bone + t/2 between the load path (bone axis) and the plate centroid. This baseline offset cannot be eliminated.
- On top of that baseline, locking plates often sit off the periosteum to preserve blood supply. The Tab 4 slider labels this **additional** periosteum-to-plate distance `e_periosteum`. So the slider value = the extra periosteum-plate gap, **not** the total plate-to-bone-axis distance.
- The `e` that appears in the Model 3 / P-Delta secant formula is the **total** eccentricity ≈ (r_bone + t/2) + e_periosteum. Sliding Tab 4's `e_periosteum` to 0 only minimises that total; it does not collapse it, and it does not collapse the P-Delta `sec(kL/2) - 1` term.
- In bridging (Model 3), the total `e` and the induced deflection delta are additive — every extra millimetre of periosteum-plate offset stacks on top of the inherent bone-axis offset and amplifies the P-Delta effect.
- Worst combination: high additional `e_periosteum` + long L.
- Optimal **achievable** starting condition: `e_periosteum = 0` (periosteal contact). This minimises — but does not zero — the total eccentricity and therefore does not eliminate the baseline P × (r_bone + t/2) moment.

### Tab 5 — DCP vs LCP Mechanics
*Based on MacLeod, Simpson & Pankaj (2015).*
- DCPs fail more often than LCPs in osteoporotic bone because of screw-tightening preload strain.
- DCP: tightening drags the plate against the bone, generating peri-screw strain 360° around the hole BEFORE any load is applied. Severe and persistent in osteoporotic bone.
- LCP: no compression against bone; strain is one-sided and load-dependent only.
- Confirmed by FEA.

### Tab 6 — Advanced Concepts
- Euler-Bernoulli beam theory: in a free-floating uniform material, the kinematic bending axis and the axis of zero stress coincide at the geometric centroid.
- In a composite, the bending axis is pulled towards the stiffer material to maintain force equilibrium (sum of internal forces = 0). Calculated via Transformed Section Method.
- App self-audit confirms all formulas are implemented correctly.
- Caveats acknowledged by the app:
  1. Model 1 (Composite-Beam) and Model 2 (Parallel-Spring) cannot be compared on the same number line.
  2. Calibration is for medium canine bone.

---

## Section E — The 1 mm Gap Scenario / Small-Gap Model (Tab 1, Section 9)

This concept reconciles the conclusions from the composite/load-sharing models (Sections 4–8) with the reality that a residual interfragmentary gap is common — **either** because cortical reduction is rarely perfect, **or** because peri-fracture bone resorption develops after a perfect compressive reduction, erasing the pre-load and migrating the construct from the composite-beam regime (Sections 4 & 5) into this small-gap regime. The app uses a 1 mm interfragmentary gap as the standard comparison baseline.

### Gap closure under pure bending
A small interfragmentary gap closes under a **bending moment alone** — axial loading is NOT required. As the construct flexes, the far cortex contacts first. The near cortex opens slightly. The app approximates this as immediate uniform bone-to-bone contact across the full cross-section once M reaches M_close. This is explicitly stated as an approximation: it slightly overestimates load-sharing at the moment of first contact, giving an optimistic (lower) bound for plate stress in the post-closure regime.

### M_close — the gap-closure moment

The gap closes when the plate bends enough for the far cortex to touch. The plate end-rotation under moment M is θ = M/K_plate. Gap closes when θ × D_bone = gap (1 mm). Therefore:
```
M_close = K_plate × gap / D_bone = (E_plate × I_plate × gap) / (L × D_bone)
```
Where: gap = 1 mm, D_bone = 17 mm (= 2 × r_bone = 2 × 8.5 mm), reference plate I_p = 25 mm⁴.

**Numerical values at L = 60 mm:**
- Ti standard (I_p=25): M_close = 114,500 × 25 × 1 / (60 × 17) ≈ **2,806 N·mm**
- Steel standard (I_p=25): M_close = 187,500 × 25 × 1 / (60 × 17) ≈ **4,596 N·mm**
- Ti large plate (I_p=74.09): M_close = 114,500 × 74.09 × 1 / (60 × 17) ≈ **8,300 N·mm**

**Critical L** (where M_close = clinical reference M = 10,000 N·mm):
- Ti standard: L_crit ≈ 16.8 mm — below this L, 10,000 N·mm cannot close the gap
- Steel standard: L_crit ≈ 27.6 mm
- Ti large plate: L_crit ≈ 49.9 mm

- M_close is the bending moment at which the gap closes and load-sharing begins.
- Stiffer construct (large I_p, high E, short L) → higher M_close → gap closes at a higher load → plate bears 100% of the moment for longer.
- More compliant construct → lower M_close → gap closes sooner → load-sharing starts at a lower applied moment.

### How the three levers change conclusions with a 1 mm gap

| Lever | Effect on K_plate | Effect on M_close | Net effect on plate stress (at fixed clinical M) |
|---|---|---|---|
| ↑ Working length (L) | ↓ K_plate | ↓ M_close | ↓ stress — load-sharing starts sooner ✓ |
| Steel → Titanium | ↓ K_plate (lower E) | ↓ M_close | ↓ stress — load-sharing starts sooner ✓ |
| ↑ Plate size (upsizing) | ↑ K_plate (larger I_p) | ↑ M_close | ↑ stress — load-sharing delayed; paradoxically worse ⚠ |

### Limitations of the small-gap model
- Assumes pure bending (no axial load — for axial-load bridging use Model 3 / P-Delta).
- Assumes the gap is small enough that contact CAN be regained at clinically realistic moments.
- Uses a step-change to load-sharing at M_close that real cortices reach more gradually (slightly optimistic on plate stress at the moment of first contact).

### The upsizing paradox
The composite model (Sections 4–5) predicts that upsizing always reduces plate stress because it increases the composite AMI and section modulus. This is true ONLY if cortical contact already exists (closed gap). With a 1 mm gap:
- Upsizing makes the construct stiffer → M_close rises.
- If the clinical moment is below the new, higher M_close, the gap never closes and the plate bears 100% of the load with no load-sharing benefit.
- If the original, smaller plate was already achieving load-sharing at that moment, upsizing can therefore INCREASE plate stress by preventing gap closure.
- This is not a universal rule — it depends on where the clinical moment sits relative to M_close. But it is clinically important to recognise that the composite-model recommendation ("always upsize") does not hold in the 1 mm gap regime.

**Never say "comminution" or "comminuted" when describing this scenario.** Use "fracture with a 1 mm interfragmentary gap" or "fracture with a small residual gap."

---

## Section D — Model Selection Rules

When asked any question about plate stress or construct behaviour, FIRST identify which regime applies (see Tab 1, Section 3 for the decision logic):

| Scenario | Model |
|---|---|
| Compressed, closed-gap, bone-on-bone contact, bending moment below `M_decomp = P·I_b/(A_b·c)`, asking about MATERIAL or PLATE GEOMETRY | Model 1 (Composite-Beam — Tab 1 Sections 4, 5 & 6) |
| Compressed, closed-gap, bone-on-bone contact, bending moment above `M_decomp` (gap on tension side opens, compression-side cortex still touches), asking about WORKING LENGTH or LOAD SHARING | Model 2 (Parallel-Spring / Discontinuous Beam — Tab 1 Sections 7 & 8) |
| Pure-bending construct with a small residual interfragmentary gap (imperfect reduction OR peri-fracture resorption after a perfect reduction) | Small-Gap Model (Tab 1 Section 9) |
| Bridging (persistent gap with axial load), OR open-gap loading with axial load | Model 3 (P-Delta — Tab 3) |
| Comparing all three models at identical inputs to see how much compressive reduction protects the implant | Tab 1 Section 10 (Three-Model Comparison) |

The same parameter (e.g., L, or material choice) can have OPPOSITE effects in different models. Never carry a conclusion from one model into another.

---

## Section F — Three-Model Comparison: How Much Does Compressive Reduction Protect the Implant? (Tab 1, Section 10)

**Purpose:** Section 10 places all three models on the same axis with identical inputs so the student can see, at a glance, the enormous protective effect of compressive cortical contact.

**Fixed inputs used in Section 10:**
- Plate: Vi 3.5mm Narrow DCP, 316L Steel — I_p = 28.67 mm⁴, y = 1.60 mm
- Bone: I_b = 10,000 mm⁴, A_b = 150 mm², r_bone = 8.5 mm
- Modular ratio: n = 187,500 / 18,000 ≈ 10.42 (steel / bone)
- Applied moment: M = 10,000 N·mm
- K_bone = 50,000 N·mm/rad

**Model 1 — Composite Beam (L-independent):**
- Transforms the plate using n; calculates composite AMI; computes σ = n·M·(d_p + y)/AMI_composite
- Typical result: ~23 MPa — constant regardless of working length
- This is the stress when compressive reduction holds and the bending moment stays below M_decomp

**Model 2 — Spring K at current L:**
- σ_spring = M · [E·I_p/L / (E·I_p/L + K_bone)] · y / I_p
- Decreases as L increases; at L=10 mm ≈ 340 MPa; at L=100 mm ≈ 84 MPa
- Even at very long L, it remains far above the composite-beam value (~23 MPa)

**Model 3 — Pre-closure (plate alone, L-independent):**
- σ = M · y / I_p = 10,000 × 1.60 / 28.67 ≈ 558 MPa — plate bears 100% of the moment
- This is the worst case: no bone contact at all

**Key teaching point:**
The composite beam stress (~23 MPa) is 15–20× lower than the spring model at clinically relevant L values, and ~24× lower than the pre-closure scenario. Extending working length in the spring model (Model 2) reduces stress, but the spring-model curve approaches the composite-beam line only at L values in the range of several metres — far outside clinical constructs. The conclusion is that compressive cortical contact (not span extension) is what produces the dramatic implant protection.

**The WLBanner is shared with Sections 7, 8, 9 & 10.** Moving the slider in Section 10 changes the Model 2 (spring) stress reading and updates the scorecard and cursor on the SVG chart.

**Caveat for the AI tutor:** Section 10 places Model 1 and Model 2 values on the same stress axis to illustrate their relative magnitudes. This is a teaching comparison, NOT a claim that the two formulas describe the same mechanical state. Model 1 applies when the fracture is compressed and M < M_decomp; Model 2 applies when M > M_decomp. At any real applied moment only ONE of these models is valid. The AI tutor must always clarify this if asked.

---

## The Embedded AI Tutor (this assistant)

- Available via the floating button in the app.
- Has one tool: `calculate_bridging_stress` — runs the exact Tab 3 / Model 3 P-Delta calculation server-side.
