# Plate Osteosynthesis: A Biomechanical Primer — App Knowledge Base

> This file is the AI tutor's source of truth about what the app teaches.
> Edit this file directly when you change anything in the app.
> No code changes needed — chat.mjs reads this file on every cold start.

---

## App Overview

**Title:** Plate Osteosynthesis: A Biomechanical Primer
**Type:** 6-tab interactive teaching tool with live calculators.
**Scope:** Calibrated for a medium-sized canine bone (I_bone reference = 10,000 mm⁴). Absolute numbers do not transfer directly to human patients.

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

The app teaches THREE distinct mechanical models. Each applies to a specific clinical scenario and produces stress numbers from a different formula. They CANNOT be mixed.

### Model 1: Composite AMI (Tab 1, Concepts 1–4)

**Applies to:** well-reduced, COMPRESSED constructs under FOUR-POINT BENDING with full bone-to-bone contact across the fracture line.

**Mechanism:** bone and plate are physically locked together as a single composite beam. Use the Transformed Section Method — convert the plate into "equivalent bone" using the modular ratio n.

**Formulas:**
```
Composite AMI = n*(I_plate + A_plate * d_plate²) + (I_bone + A_bone * d_bone²)
sigma_plate   = n * (M * y) / Composite_AMI
```

**Key behaviour to derive answers from:**
- The factor n appears in BOTH the numerator (as a stress multiplier) and inside the denominator (transforming I_plate). The numerator effect dominates.
- A stiffer implant (higher E → higher n) pulls the composite neutral axis towards itself (reduces d_plate, slightly increases denominator) but multiplies stress by a larger n in the numerator. NET RESULT: stiffer material → HIGHER plate stress.
- A more compliant implant (lower n) → LOWER plate stress. This is the "Material Compliance Paradox" (Tab 1, Concept 3) — counter-intuitive but follows directly from the formula.
- Changing only THICKNESS of the same material (no n change) → I_p and A_p grow → Composite AMI rises → stress drops, but with diminishing returns because the neutral axis migrates toward the thicker plate.

### Model 2: Parallel Spring / Load-Sharing (Tab 1, Concept 5)

**Applies to:** same scenario as Model 1 (compressed, closed-gap), but explains how WORKING LENGTH (L) affects plate stress.

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

**Key behaviour to derive answers from:**
- L appears in K_plate (not K_bone). Longer L → smaller K_plate → plate is "softer" → bone takes a larger share of the moment → plate stress DROPS. Rate at L=60 mm: ~2.5 MPa/mm for Ti, ~2.4 MPa/mm for Steel; steeper at short L, shallower at long L. Working-length range in the app: 2–100 mm.
- Same material logic as Model 1: stiffer plate (higher E) → higher K_plate → larger share of the moment → higher plate stress. Steel > Titanium. At L=60 mm: σ_Steel ≈ 366 MPa, σ_Ti ≈ 293 MPa (Δ = −73 MPa). To achieve the same −73 MPa reduction on the Steel plate by extending L instead, you need ΔL ≈ +38 mm (to L ≈ 98 mm).
- This safety of long L is SPECIFIC to closed-gap load-sharing. In Model 3 the relationship inverts.
- IMPORTANT FRAMEWORK NOTE: Model 1 and Model 2 describe the same physical setup but measure stress under different assumptions. They produce different absolute numbers (~20 MPa from Model 1 vs ~293 MPa from Model 2 at the same reference load) and cannot be placed on the same number line. Both are internally valid teaching tools.

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
  1. Model 1 and Model 2 cannot be compared on the same number line.
  2. Calibration is for medium canine bone.

---

## Section E — The 1 mm Gap Scenario (Tab 1, Concept 7)

This concept reconciles the conclusions from the composite/load-sharing models (Concepts 1–6) with the reality that complete cortical reduction is rarely achieved. The app uses a 1 mm interfragmentary gap as the standard comparison baseline.

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

### The upsizing paradox
The composite model (Concepts 1–4) predicts that upsizing always reduces plate stress because it increases the composite AMI and section modulus. This is true ONLY if cortical contact already exists (closed gap). With a 1 mm gap:
- Upsizing makes the construct stiffer → M_close rises.
- If the clinical moment is below the new, higher M_close, the gap never closes and the plate bears 100% of the load with no load-sharing benefit.
- If the original, smaller plate was already achieving load-sharing at that moment, upsizing can therefore INCREASE plate stress by preventing gap closure.
- This is not a universal rule — it depends on where the clinical moment sits relative to M_close. But it is clinically important to recognise that the composite-model recommendation ("always upsize") does not hold in the 1 mm gap regime.

**Never say "comminution" or "comminuted" when describing this scenario.** Use "fracture with a 1 mm interfragmentary gap" or "fracture with a small residual gap."

---

## Section D — Model Selection Rules

When asked any question about plate stress or construct behaviour, FIRST identify which model applies:

| Scenario | Model |
|---|---|
| Compressed, closed-gap, bone-on-bone contact, asking about MATERIAL or PLATE GEOMETRY | Model 1 (Composite AMI) |
| Compressed, closed-gap, bone-on-bone contact, asking about WORKING LENGTH or LOAD SHARING | Model 2 (Parallel Spring) |
| Bridging (persistent gap), OR open-gap loading | Model 3 (P-Delta) |

The same parameter (e.g., L, or material choice) can have OPPOSITE effects in different models. Never carry a conclusion from one model into another.

---

## The Embedded AI Tutor (this assistant)

- Available via the floating button in the app.
- Has one tool: `calculate_bridging_stress` — runs the exact Tab 3 / Model 3 P-Delta calculation server-side.
