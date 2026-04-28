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
    All entries below are PubMed-verified (PMID provided per entry).
    Source: chnikola-wq/literature-list, "Plate Osteosynthesis Biomechanics
    Verified" (Apr 2026 verification pass). Where the source text did not
    state a field explicitly, the field is marked `unknown` rather than
    guessed — the bot is instructed to treat `unknown` as "cannot confirm
    match" rather than as agreement.
-->

# Section I — Human medicine

### Mischler 2023
- **Citation:** Mischler D, Gueorguiev B, Windolf M, Varga P. On the importance of accurate elasto-plastic material properties in simulating plate osteosynthesis failure. Front Bioeng Biotechnol. 2023;11:1268787. PMID: 38107614.
- **Finding (one line):** Elasto-plastic FE models matched experimental stiffness/yield/max load (CCC 0.96–0.97) only when implant material properties were measured experimentally rather than taken from literature.
- **Loading conditions:**
    - Load type: quasi-static compression-bending to plate-bending failure; matched FE
    - Magnitude: unknown
    - Cycles: single ramp to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (osteotomy, gap size unknown)
    - Working length: unknown
    - Plate material: stainless steel and titanium locking plates
    - Screw configuration: various implant configurations
    - Bone model: 7 fresh-frozen sheep tibiae
- **Model relevance:** Tangential to all three app models — speaks to FE-model fidelity for plate failure prediction rather than to a specific composite-beam, parallel-spring, or P-Delta scenario.

### Huxman 2025
- **Citation:** Huxman C, Lewis G, Armstrong A, Updegrove G, Koroneos Z, Butler J. Mechanically compliant locking plates for diaphyseal fracture fixation: a biomechanical study. J Orthop Res. 2025;43(1):217-227. PMID: 39279031.
- **Finding (one line):** Flexure-based compliant plates produced ~6× more interfragmentary motion at 100 N and ~3× more at 350 N than rigid locking plates, with 2.5–3.4× greater motion symmetry.
- **Loading conditions:**
    - Load type: static axial compression
    - Magnitude: 100 N and 350 N
    - Cycles: single static load
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging 10 mm comminuted
    - Working length: short and long working lengths compared
    - Plate material: unknown (compliant flexure-based vs rigid locking)
    - Screw configuration: 5.0 mm self-tapping locking screws (DePuy Synthes) at 4 Nm; 1 mm plate-bone offset
    - Bone model: humeral diaphysis sawbones surrogate
- **Model relevance:** Model 3 (P-Delta) — bridging-gap construct under axial compression with explicit working-length comparison.

### Schöbel 2024
- **Citation:** Schöbel T, Gemkow M, Wendler T, Schleifenbaum S, Löffler S, Theopold J, Hepp P. Primary stability in locking plate fixation for proximal humeral fractures may be increased by using an additional nail osteosynthesis in combination with locking plate osteosynthesis—a biomechanical comparison. Clin Biomech (Bristol). 2024;114:106235. PMID: 38552372.
- **Finding (one line):** Combined intramedullary nail + locking plate had higher primary stability than either method alone in osteoporotic proximal humeral fractures.
- **Loading conditions:**
    - Load type: sinusoidal cyclic compression + quasi-static load-to-failure
    - Magnitude: 250 N cyclic; load-to-failure
    - Cycles: 5000 cycles + ramp to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: two-part proximal humeral fracture model
    - Working length: unknown
    - Plate material: PHILOS plate (titanium); IM nail; combined
    - Screw configuration: unknown
    - Bone model: 25 osteoporotic cadaveric humeri (20° abduction)
- **Model relevance:** Tangential — metaphyseal proximal-humerus construct, not a diaphyseal bridging beam scenario.

### Pastor 2023 (medial helical vs lateral)
- **Citation:** Pastor T, Zderic I, Souleiman F, Drenchev L, Skulev HK, Berk T, Gueorguiev B, Knobe M. Medial helical versus straight lateral plating of distal femoral fractures—a biomechanical comparative study. Clin Biomech (Bristol). 2023;110:106120. PMID: 37832469.
- **Finding (one line):** 180°-helical medial plate had ~3× higher initial axial stiffness (185.6 vs 56.0 N/mm) and lower varus/valgus deformation than straight lateral plate.
- **Loading conditions:**
    - Load type: quasi-static axial + torsion; progressively increasing combined cyclic axial-torsional to failure
    - Magnitude: 500 N axial + ±6 Nm torsion
    - Cycles: progressively increasing to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (AO/OTA 33-A3.3 unstable distal femoral fracture)
    - Working length: unknown
    - Plate material: 15-hole LCP-DF (titanium)
    - Screw configuration: unknown
    - Bone model: 12 left synthetic 4th-gen Sawbones femora
- **Model relevance:** Model 3 (P-Delta) — bridging distal-femoral construct under combined axial + torsional loading.

### Pastor 2024 (helical augmentation)
- **Citation:** Pastor T, Zderic I, Drenchev L, Skulev HK, Berk T, Beeres FJP, Link BC, Gueorguiev B, Stoffel K, Knobe M. Is augmented femoral lateral plating with helically shaped medial plates biomechanically advantageous over straight medial plates? J Orthop Res. 2024;42(4):886-893. PMID: 37975265.
- **Finding (one line):** Straight medial + lateral LCP-DF had smaller initial axial displacement (0.11 vs 0.31 mm) and flexion than 90°-helical medial + lateral; cycles-to-failure not significantly different.
- **Loading conditions:**
    - Load type: quasi-static + progressively increasing combined cyclic axial-torsional to failure
    - Magnitude: unknown
    - Cycles: to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (distal femoral)
    - Working length: unknown
    - Plate material: titanium LCP-DF
    - Screw configuration: dual-plate (lateral + medial)
    - Bone model: 10 paired human cadaveric femora
- **Model relevance:** Model 3 (P-Delta) — bridging dual-plate distal-femoral construct under combined loading.

### Pastor 2025 (45° helical humerus)
- **Citation:** Pastor T, Zderic I, Beeres FJP, Helmy N, Richards RG, Kriechling P, Drenchev L, Skulev HK, Gueorguiev B, Pastor T. 45° helical plates are a valid alternative to straight plates for treatment of proximal humeral shaft fractures. J Orthop Res. 2025;43(3):473-482. PMID: 39586674.
- **Finding (one line):** 45°-helical plates achieved comparable stability and cycles-to-failure to straight lateral plates while permitting more axial movement.
- **Loading conditions:**
    - Load type: quasi-static + progressively increasing combined cyclic axial-torsional to failure
    - Magnitude: unknown
    - Cycles: to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (proximal humeral shaft fracture)
    - Working length: unknown
    - Plate material: PHILOS (titanium), 45°-helical vs straight lateral
    - Screw configuration: unknown
    - Bone model: synthetic humeri
- **Model relevance:** Model 3 (P-Delta) — bridging diaphyseal-shaft humeral construct.

### Dehoust 2025
- **Citation:** Dehoust J, Hinz N, Münch M, Behnk F, Kowald B, Schulz AP, Frosch KH, Hartel M. Biomechanical comparison of different double plate constructs for distal supracondylar comminuted femur fractures (AO/OTA 33-A3). Injury. 2025;56(6):112324. PMID: 40203770.
- **Finding (one line):** Dual plating reduced fracture-gap motion vs single lateral plate; parallel double plates resisted AP tilt better than oblique anteromedial plate.
- **Loading conditions:**
    - Load type: quasi-static axial + torsion
    - Magnitude: unknown
    - Cycles: single load
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (AO/OTA 33-A3 metaphyseal comminution)
    - Working length: unknown
    - Plate material: LCP (titanium)
    - Screw configuration: lateral LCP ± medial parallel or anteromedial oblique LCP
    - Bone model: synthetic femora
- **Model relevance:** Model 3 (P-Delta) — bridging metaphyseal-comminution construct; dual-plate adds parallel-stiffness considerations (Model 2 also relevant).

### Kraus 2025 (helical review)
- **Citation:** Kraus M, Gueorguiev B, Pastor T, Zderic I, Lenz M, Knobe M, Beeres FJP, Richards RG, Pape HC, Pastor T. Evolving fracture management: the role of helical plating in orthopaedic trauma surgery — a narrative review. Eur J Trauma Emerg Surg. 2025;51(1):203. PMID: 40353854.
- **Finding (one line):** Across 23 studies (1992–2023), helical plates showed comparable stability to straight plates with superior torsional resistance in femoral fractures and improved neurovascular safety in humeral fractures.
- **Loading conditions:**
    - Load type: review (axial, bending, torsion, FE, clinical)
    - Magnitude: n/a
    - Cycles: n/a
    - Rate: n/a
- **Construct conditions:**
    - Gap state: review across constructs
    - Working length: review
    - Plate material: helical and straight plates
    - Screw configuration: review
    - Bone model: review (simulation, biomechanical, clinical)
- **Model relevance:** Tangential — narrative review across constructs and loading modes.

### Pastor 2022 (helical anatomy)
- **Citation:** Pastor T, Beeres FJP, Kastner P, Gehweiler D, Migliorini F, Nebelung S, Scaglioni MF, Souleiman F, Link BC, Babst R, Gueorguiev B, Knobe M. Anatomical analysis of different helical plate designs for distal femoral fracture fixation. Injury. 2022;53(7):2636-2641. PMID: 35346508.
- **Finding (one line):** Distances from medial 90°/180° helical plates to femoral artery (14.5–21.6 mm) were significantly larger than from straight medial plates (6.5 mm); helical reduces neurovascular risk.
- **Loading conditions:**
    - Load type: anatomical (MIPO procedural; CT angiography + cadaveric dissection)
    - Magnitude: n/a
    - Cycles: n/a
    - Rate: n/a
- **Construct conditions:**
    - Gap state: n/a (anatomical)
    - Working length: n/a
    - Plate material: titanium LCP / LCP-DF
    - Screw configuration: medial 90° / 180° helical vs straight
    - Bone model: 10 paired human cadaveric femora
- **Model relevance:** Not relevant to the three biomechanical models (anatomical-safety study).

### Bottlang 2010 (FCL ovine)
- **Citation:** Bottlang M, Doornink J, Lujan TJ, Fitzpatrick DC, Marsh JL, Augat P, von Rechenberg B, Lesser M, Madey SM. Effects of construct stiffness on healing of fractures stabilized with locking plates. J Bone Joint Surg Am. 2010;92 Suppl 2:12-22. PMID: 21123589.
- **Finding (one line):** Reduced construct stiffness with FCL screws produced increased callus volume and stronger healing in ovine osteotomy.
- **Loading conditions:**
    - Load type: in vivo gait + ex vivo torsion to failure at sacrifice
    - Magnitude: physiological gait
    - Cycles: in vivo loading over healing period
    - Rate: gait
- **Construct conditions:**
    - Gap state: bridging (ovine tibial osteotomy)
    - Working length: unknown
    - Plate material: locking plate (material unknown)
    - Screw configuration: standard vs far-cortical-locking (FCL) screws
    - Bone model: ovine tibial osteotomy (in vivo)
- **Model relevance:** Model 3 (P-Delta) — bridging osteotomy where reduced effective stiffness modulates interfragmentary motion.

### Bottlang 2011 (FCL review)
- **Citation:** Bottlang M, Feist F. Biomechanics of far cortical locking. J Orthop Trauma. 2011;25 Suppl 1:S21-S28. PMID: 21248556.
- **Finding (one line):** FCL constructs reduced axial stiffness ~84–88% vs standard locked plates while preserving construct strength; biphasic stiffness profile resembling external fixator.
- **Loading conditions:**
    - Load type: review (quasi-static and cyclic axial / bending / torsion)
    - Magnitude: review
    - Cycles: review
    - Rate: review
- **Construct conditions:**
    - Gap state: review (diaphyseal and metaphyseal)
    - Working length: review
    - Plate material: locked plates (titanium / stainless)
    - Screw configuration: standard locking vs FCL
    - Bone model: review (femur, tibia)
- **Model relevance:** Model 3 (P-Delta) — biomechanics review centred on bridging-construct stiffness and interfragmentary motion.

### Doornink 2011 (periarticular FCL)
- **Citation:** Doornink J, Fitzpatrick DC, Madey SM, Bottlang M. Far cortical locking enables flexible fixation with periarticular locking plates. J Orthop Trauma. 2011;25 Suppl 1:S29-S34. PMID: 21248557.
- **Finding (one line):** FCL screws used in the diaphyseal portion of periarticular plates enabled flexible fixation with parallel interfragmentary motion in distal femur fractures.
- **Loading conditions:**
    - Load type: quasi-static and cyclic axial loading
    - Magnitude: unknown
    - Cycles: unknown
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (AO/OTA 33-A3 distal femoral)
    - Working length: unknown
    - Plate material: periarticular locking plate
    - Screw configuration: FCL diaphyseal + standard metaphyseal locking
    - Bone model: cadaveric femora
- **Model relevance:** Model 3 (P-Delta) — bridging distal-femoral construct with reduced diaphyseal stiffness.

### Henschel 2017 (dynamization methods)
- **Citation:** Henschel J, Tsai S, Fitzpatrick DC, Marsh JL, Madey SM, Bottlang M. Comparison of 4 methods for dynamization of locking plates: differences in the amount and type of fracture motion. J Orthop Trauma. 2017;31(10):531-537. PMID: 28657927.
- **Finding (one line):** Active plating and FCL screws delivered axial dynamization without shear; non-locking screw substitution and bridge-span dynamization had different motion profiles.
- **Loading conditions:**
    - Load type: cyclic axial loading; 3D motion measurement
    - Magnitude: unknown
    - Cycles: unknown
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (metadiaphyseal)
    - Working length: varied across dynamization methods
    - Plate material: distal femur locking plates
    - Screw configuration: locked, non-locked, bridge-span dynamization, FCL, active plating
    - Bone model: femur surrogates
- **Model relevance:** Model 3 (P-Delta) — bridging-construct dynamization study.

### Bottlang 2017 (active plates JOT)
- **Citation:** Bottlang M, Tsai S, Bliven EK, von Rechenberg B, Kindt P, Augat P, Henschel J, Fitzpatrick DC, Madey SM. Dynamic stabilization of simple fractures with active plates delivers stronger healing than conventional compression plating. J Orthop Trauma. 2017;31(2):71-77. PMID: 27861456.
- **Finding (one line):** Active plates produced ~6× more callus area at 9 weeks and ~2× more torsional strength than compression plates in ovine osteotomy.
- **Loading conditions:**
    - Load type: in vivo gait + ex vivo torsion to failure at sacrifice
    - Magnitude: physiological gait
    - Cycles: in vivo over healing period
    - Rate: gait
- **Construct conditions:**
    - Gap state: bridging (transverse osteotomy)
    - Working length: unknown
    - Plate material: standard compression vs active locking plate
    - Screw configuration: unknown
    - Bone model: 12 sheep tibial transverse osteotomies
- **Model relevance:** Model 3 (P-Delta) — bridging-construct dynamization vs compression plating.

### Bottlang 2016 (active plate JBJS)
- **Citation:** Bottlang M, Tsai S, Bliven EK, von Rechenberg B, Klein K, Augat P, Henschel J, Fitzpatrick DC, Madey SM. Dynamic stabilization with active locking plates delivers faster, stronger, and more symmetric fracture-healing. J Bone Joint Surg Am. 2016;98(6):466-474. PMID: 26984914.
- **Finding (one line):** Active locking plates produced symmetric circumferential callus and faster, stronger healing vs standard locking plates in ovine osteotomy.
- **Loading conditions:**
    - Load type: in vivo gait + ex vivo torsion at sacrifice
    - Magnitude: physiological gait
    - Cycles: in vivo over healing period
    - Rate: gait
- **Construct conditions:**
    - Gap state: bridging (ovine tibial osteotomy)
    - Working length: unknown
    - Plate material: standard locking vs active locking plate (elastically suspended holes)
    - Screw configuration: unknown
    - Bone model: ovine tibial osteotomy
- **Model relevance:** Model 3 (P-Delta) — bridging-construct dynamization study.

### Tsai 2015 (dynamic locking plate bench)
- **Citation:** Tsai S, Fitzpatrick DC, Madey SM, Bottlang M. Dynamic locking plates provide symmetric axial dynamization to stimulate fracture healing. J Orthop Res. 2015;33(8):1218-1225. PMID: 25721801.
- **Finding (one line):** Active locking plates with elastically suspended locking holes provided symmetric axial dynamization while preserving torsional and bending stiffness.
- **Loading conditions:**
    - Load type: quasi-static axial, torsion, bending; load-to-failure
    - Magnitude: unknown
    - Cycles: load-to-failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (femoral diaphysis bridge-plating model)
    - Working length: unknown
    - Plate material: standard vs active locking plate
    - Screw configuration: unknown
    - Bone model: femoral diaphysis bridge-plating model
- **Model relevance:** Model 3 (P-Delta) — bridging diaphyseal-construct stiffness comparison.

### Madey 2017 (active humeral plates clinical)
- **Citation:** Madey SM, Tsai S, Fitzpatrick DC, Earley K, Lutsch M, Bottlang M. Dynamic fixation of humeral shaft fractures using active locking plates: a prospective observational study. Iowa Orthop J. 2017;37:1-10. PMID: 28852327.
- **Finding (one line):** Active locking plates achieved fracture union with early callus bridging in humeral shaft fractures without plate or locking-hole failures.
- **Loading conditions:**
    - Load type: clinical/radiographic (prospective observational)
    - Magnitude: physiological
    - Cycles: clinical
    - Rate: clinical
- **Construct conditions:**
    - Gap state: humeral shaft fracture
    - Working length: unknown
    - Plate material: 9-hole active locking plate
    - Screw configuration: unknown
    - Bone model: human (in vivo)
- **Model relevance:** Tangential — clinical outcome study; supports the dynamization hypothesis explored under Model 3.

### Bottlang 2024 (advanced active plate)
- **Citation:** Bottlang M, Shetty SS, Blankenau C, Wilk J, Tsai S, Fitzpatrick DC, Marsh LJ, Madey SM. Advances in dynamization of plate fixation to promote natural bone healing. J Clin Med. 2024;13(10):2905. PMID: 38792446.
- **Finding (one line):** Advanced active plate (mixing locking and non-locking screws) recovered ~54% native torsional strength at 9 weeks in ovine tibial osteotomy vs ~17% for standard locking plate.
- **Loading conditions:**
    - Load type: in vivo gait + ex vivo torsion to failure at sacrifice
    - Magnitude: physiological gait
    - Cycles: in vivo over healing period
    - Rate: gait
- **Construct conditions:**
    - Gap state: bridging (ovine tibial osteotomy)
    - Working length: unknown
    - Plate material: advanced active plate (PEEK anvils in silicone) vs standard locking plate
    - Screw configuration: mixed locking + non-locking
    - Bone model: ovine tibial osteotomy
- **Model relevance:** Model 3 (P-Delta) — bridging-construct dynamization study.

### Denard 2011 (biplanar fixation)
- **Citation:** Denard PJ, Doornink J, Phelan D, Madey SM, Fitzpatrick DC, Bottlang M. Biplanar fixation of a locking plate in the diaphysis improves construct strength. Clin Biomech (Bristol). 2011;26(2):164-167. PMID: 21216509.
- **Finding (one line):** Staggered (biplanar) screw configuration improved torsional strength of diaphyseal plate fixation vs linear configuration; with biplanar fixation, unicortical screws matched bicortical in non-osteoporotic bone.
- **Loading conditions:**
    - Load type: quasi-static torsion to failure
    - Magnitude: torsion to failure
    - Cycles: single ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: unknown (diaphyseal plate fixation)
    - Working length: unknown
    - Plate material: custom titanium plates
    - Screw configuration: linear vs staggered hole patterns; unicortical / bicortical
    - Bone model: femoral diaphyseal surrogates (osteoporotic and non-osteoporotic)
- **Model relevance:** Tangential — torsional screw-configuration effect; relates to Model 1/2 closed-gap behaviour rather than P-Delta.

### Stoffel 2003
- **Citation:** Stoffel K, Dieter U, Stachowiak G, Gächter A, Kuster MS. Biomechanical testing of the LCP—how can stability in locked internal fixators be controlled? Injury. 2003;34 Suppl 2:B11-B19. PMID: 14580982.
- **Finding (one line):** Greater working length reduced construct stability under static and dynamic loading; recommendations for screw spacing, screw number, and plate-bone offset for optimal LCP stability.
- **Loading conditions:**
    - Load type: cyclic axial compression and torque + load-to-failure; FE
    - Magnitude: unknown
    - Cycles: cyclic + ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (diaphyseal fractures)
    - Working length: varied (explicit variable)
    - Plate material: LCP
    - Screw configuration: varied screw number and position
    - Bone model: composite bone cylinders
- **Model relevance:** Model 3 (P-Delta) — canonical working-length / plate-bone-offset bridging study; the central reference for working-length effects in the app.

### Plecko 2013 (DLS sheep)
- **Citation:** Plecko M, Lagerpusch N, Andermatt D, Frigg R, Koch R, Sidler M, Kronen P, Klein K, Nuss K, Bürki A, Ferguson SJ, Stoeckle U, von Rechenberg B. The dynamisation of locking plate osteosynthesis by means of dynamic locking screws (DLS)—an experimental study in sheep. Injury. 2013;44(10):1346-1357. PMID: 23398900.
- **Finding (one line):** DLS plating produced ~2.5× more callus volume than standard locking plates in ovine tibial osteotomies, with comparable healing strength.
- **Loading conditions:**
    - Load type: in vivo gait + ex vivo torsion to failure
    - Magnitude: physiological gait
    - Cycles: in vivo over healing period
    - Rate: gait
- **Construct conditions:**
    - Gap state: bridging (ovine tibial osteotomy)
    - Working length: unknown
    - Plate material: locking plate
    - Screw configuration: standard locking vs dynamic locking screws (DLS)
    - Bone model: ovine tibial osteotomy
- **Model relevance:** Model 3 (P-Delta) — bridging-construct dynamization study.

### MacLeod 2018 (planning review)
- **Citation:** MacLeod AR, Pankaj P. Pre-operative planning for fracture fixation using locking plates: device configuration and other considerations. Injury. 2018;49 Suppl 1:S12-S18. PMID: 29929685.
- **Finding (one line):** Working length, plate-bone offset, screw type, plate length, and material interact to determine construct stiffness; FE-validated planning guidance.
- **Loading conditions:**
    - Load type: review (axial, bending, torsion + FE)
    - Magnitude: review
    - Cycles: review
    - Rate: review
- **Construct conditions:**
    - Gap state: bridging (review)
    - Working length: review (varied)
    - Plate material: locking plates (mixed)
    - Screw configuration: varied screw types
    - Bone model: review
- **Model relevance:** Model 3 (P-Delta) — review of bridging-construct stiffness drivers (working length, offset).

### MacLeod 2018 (loading boundary FE)
- **Citation:** MacLeod A, Simpson AHRW, Pankaj P. Experimental and numerical investigation into the influence of loading conditions in biomechanical testing of locking plate fracture fixation devices. Bone Joint Res. 2018;7(1):111-120. PMID: 29363522.
- **Finding (one line):** Loading boundary conditions strongly modulate measured stiffness and strain across plate biomechanical studies — methodologic warning.
- **Loading conditions:**
    - Load type: variable axial / bending / torsion + matched FE
    - Magnitude: variable
    - Cycles: variable
    - Rate: variable
- **Construct conditions:**
    - Gap state: unknown
    - Working length: unknown
    - Plate material: locking plate constructs
    - Screw configuration: unknown
    - Bone model: cadaveric and synthetic femora
- **Model relevance:** Tangential — methodologic study warning that boundary conditions affect any of Models 1/2/3 measurements.

### Hoffmeier 2011
- **Citation:** Hoffmeier KL, Hofmann GO, Mückley T. Choosing a proper working length can improve the lifespan of locked plates: a biomechanical study. Clin Biomech (Bristol). 2011;26(4):405-409. PMID: 21185118.
- **Finding (one line):** Titanium locking plates: longer working length tended to improve fatigue endurance; stainless-steel: no working-length effect on fatigue strength.
- **Loading conditions:**
    - Load type: cyclic 4-point bending fatigue
    - Magnitude: unknown
    - Cycles: fatigue
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (composite bone model)
    - Working length: varied (explicit variable)
    - Plate material: titanium and stainless-steel LCP
    - Screw configuration: unknown
    - Bone model: composite bone model
- **Model relevance:** Model 3 (P-Delta) — explicit working-length × material interaction in a bridging fatigue test.

### Chao 2013
- **Citation:** Chao P, Conrad BP, Lewis DD, Horodyski M, Pozzi A. Effect of plate working length on plate stiffness and cyclic fatigue life in a cadaveric femoral fracture gap model stabilized with a 12-hole 2.4 mm locking compression plate. BMC Vet Res. 2013;9:125. PMID: 23800317.
- **Finding (one line):** In a 2.4 mm LCP applied in contact with bone, plate working length had no effect on stiffness, gap motion, or fatigue resistance.
- **Loading conditions:**
    - Load type: cyclic axial loading + load-to-failure
    - Magnitude: unknown
    - Cycles: fatigue + ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (mid-diaphyseal gap)
    - Working length: varied (explicit variable)
    - Plate material: 2.4 mm LCP (titanium)
    - Screw configuration: 2 vs 5 screws per fragment
    - Bone model: canine cadaveric femora
- **Model relevance:** Model 3 (P-Delta) — bridging working-length study; counterpoint to Stoffel/Hoffmeier. Note: the null result is NOT explained by `e → 0` collapsing the P-Delta secant term. The geometric eccentricity between the bone's longitudinal axis and the plate centroid (~r_bone + t/2) persists even with the plate in contact with bone, so `e > 0` always. Plausible reasons for Chao's null result lie elsewhere — small 2.4 mm plate, modest applied load keeping `kL/2` in the linear regime of the secant, plate-bone friction adding an unmodelled boundary stiffness, and a fatigue-life endpoint that can diverge from peak plate stress.

### Wall 2012
- **Citation:** Wall LB, Brodt MD, Silva MJ, Boyer MI, Calfee RP. The effects of screw length on stability of simulated osteoporotic distal radius fractures fixed with volar locking plates. J Hand Surg Am. 2012;37(3):446-453. PMID: 22305729.
- **Finding (one line):** 75%-length unicortical distal screws gave stiffness equivalent to bicortical screws; 50% length lost compression stiffness.
- **Loading conditions:**
    - Load type: quasi-static axial / dorsal-bending / volar-bending; cyclic axial conditioning; load-to-failure at 2 mm displacement
    - Magnitude: 250 N axial conditioning
    - Cycles: 1000 cycles axial conditioning + ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: distal radius fracture (osteoporotic synthetic)
    - Working length: unknown
    - Plate material: volar locking plate
    - Screw configuration: bicortical, unicortical (100/75/50%), or pegs
    - Bone model: 30 osteoporotic distal radius synthetic models
- **Model relevance:** Tangential — distal-radius metaphyseal screw-length study, not a diaphyseal bridging beam.

### Liu 2014
- **Citation:** Liu X, Wu WD, Fang YF, Zhang MC, Huang WH. Biomechanical comparison of osteoporotic distal radius fractures fixed by distal locking screws with different length. PLOS One. 2014;9(7):e103371. PMID: 25080094.
- **Finding (one line):** 75% unicortical distal locking screws maintained axial stiffness equivalent to bicortical screws in osteoporotic cadaveric distal radius; 50% length lost stiffness.
- **Loading conditions:**
    - Load type: cyclic axial + bending; cyclic + load-to-failure
    - Magnitude: 150 N axial, 50 N bending
    - Cycles: cyclic + ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: extra-articular dorsally unstable distal radius fracture
    - Working length: unknown
    - Plate material: volar locking plate
    - Screw configuration: bicortical vs unicortical (75% / 50%)
    - Bone model: 18 osteoporotic embalmed cadaveric radii
- **Model relevance:** Tangential — distal-radius metaphyseal screw-length study.

### Walter De Bruyn 2024
- **Citation:** Walter De Bruyn B, Glyde MR, Day RE, Hosgood G. Effect of an orthogonal locking plate and primary plate working length on construct stiffness and plate strain in an in vitro fracture-gap model. Vet Comp Orthop Traumatol. 2024;37(4):173-180. PMID: 38331034.
- **Finding (one line):** Adding an orthogonal locking plate decreased plate strain at long primary working length; effect minimal at short working length; working length had inverse relationship with construct stiffness in bending.
- **Loading conditions:**
    - Load type: cyclic axial + 4-point bending; strain-gauge measurement
    - Magnitude: unknown
    - Cycles: cyclic
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (mid-diaphyseal fracture gap)
    - Working length: varied (explicit variable)
    - Plate material: primary LCP + perpendicular orthogonal locking plate
    - Screw configuration: orthogonal dual-plate
    - Bone model: POM rods
- **Model relevance:** Model 3 (P-Delta) — bridging working-length × dual-plate interaction. Also Model 2 (parallel-spring) for the orthogonal-plate component.

### Lenz 2012
- **Citation:** Lenz M, Gueorguiev B, Joseph S, van der Pol B, Richards RG, Wilke H-J, Schwieger K. Angulated locking plate in periprosthetic proximal femur fractures: biomechanical testing of a new prototype plate. Arch Orthop Trauma Surg. 2012;132(11):1473-1479. PMID: 22707211.
- **Finding (one line):** Angulated bicortical locking screws gave higher axial-bending and torsional stiffness than monocortical locking before and after 10,000 cycles in periprosthetic proximal femur model.
- **Loading conditions:**
    - Load type: quasi-static axial bending + torsion + cyclic axial
    - Magnitude: unknown
    - Cycles: 10,000 cycles axial
    - Rate: unknown
- **Construct conditions:**
    - Gap state: periprosthetic Vancouver B1 fracture
    - Working length: unknown
    - Plate material: LCP (mono vs angulated bicortical, A-LCP)
    - Screw configuration: monocortical vs angulated bicortical
    - Bone model: 12 BMD-matched cadaveric femora with cemented endoprosthesis
- **Model relevance:** Tangential — periprosthetic construct around a cemented stem; not a clean Model 1/2/3 case.

### Talbot 2008
- **Citation:** Talbot M, Zdero R, Schemitsch EH. Cyclic loading of periprosthetic fracture fixation constructs. J Trauma. 2008;64(5):1308-1312. PMID: 18469655.
- **Finding (one line):** Locking plate + cortical onlay allograft strut had higher bending stiffness and load-to-failure than standalone locking plate in Vancouver B1 fractures; locking screws conferred no advantage when allograft was present.
- **Loading conditions:**
    - Load type: cyclic loading; bending, torsion, axial pre/post-cycling
    - Magnitude: unknown
    - Cycles: cyclic
    - Rate: unknown
- **Construct conditions:**
    - Gap state: Vancouver B1 periprosthetic
    - Working length: unknown
    - Plate material: locking and nonlocking; ± cortical allograft strut
    - Screw configuration: unknown
    - Bone model: 15 third-generation composite femora
- **Model relevance:** Model 2 (parallel-spring) — bone+plate+strut act as parallel stiffness elements.

### Lever 2010
- **Citation:** Lever JP, Zdero R, Nousiainen MT, Waddell JP, Schemitsch EH. The biomechanical analysis of three plating fixation systems for periprosthetic femoral fracture near the tip of a total hip arthroplasty. J Orthop Surg Res. 2010;5:45. PMID: 20602797.
- **Finding (one line):** Three different cable-plate systems performed comparably for stability of periprosthetic fractures near the tip of a total hip arthroplasty stem.
- **Loading conditions:**
    - Load type: axial compression, lateral bending, torsion
    - Magnitude: unknown
    - Cycles: single load
    - Rate: unknown
- **Construct conditions:**
    - Gap state: periprosthetic (fracture near stem tip)
    - Working length: unknown
    - Plate material: Zimmer Cable Ready, AO Cable-Plate, Dall-Miles Cable Grip
    - Screw configuration: cable-plate
    - Bone model: 12 paired cadaveric femora with cemented hip stem
- **Model relevance:** Tangential — periprosthetic cable-plate comparison.

### Zdero 2008
- **Citation:** Zdero R, Walker R, Waddell JP, Schemitsch EH. Biomechanical evaluation of periprosthetic femoral fracture fixation. J Bone Joint Surg Am. 2008;90(5):1068-1077. PMID: 18451400.
- **Finding (one line):** Nonlocking plate + cortical allograft strut produced the highest stiffness across constructs evaluated for periprosthetic femoral midshaft fracture.
- **Loading conditions:**
    - Load type: axial compression, lateral bending, torsion
    - Magnitude: unknown
    - Cycles: single load
    - Rate: unknown
- **Construct conditions:**
    - Gap state: periprosthetic midshaft (with and without bone gap)
    - Working length: unknown
    - Plate material: 4 plate-based constructs (locking / nonlocking, ± allograft)
    - Screw configuration: unknown
    - Bone model: 20 synthetic femora with hip implant
- **Model relevance:** Model 2 (parallel-spring) — plate + allograft strut as parallel stiffness elements.

### Fulkerson 2006
- **Citation:** Fulkerson E, Koval K, Preston CF, Iesaka K, Kummer FJ, Egol KA. Fixation of periprosthetic femoral shaft fractures associated with cemented femoral stems: a biomechanical comparison of locked plating and conventional cable plates. J Orthop Trauma. 2006;20(2):89-93. PMID: 16462560.
- **Finding (one line):** Locked plating and cable plates had comparable initial fixation stiffness; both withstood cyclic loading without cement-mantle cracking.
- **Loading conditions:**
    - Load type: cyclic loading + torsional load-to-failure
    - Magnitude: unknown
    - Cycles: cyclic + ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: periprosthetic shaft fracture
    - Working length: unknown
    - Plate material: locked plate vs Ogden cable plate
    - Screw configuration: unknown
    - Bone model: 8 paired cadaveric femora with cemented hip prosthesis
- **Model relevance:** Tangential — periprosthetic construct comparison.

### Konstantinidis 2010
- **Citation:** Konstantinidis L, Hauschild O, Beckmann NA, Hirschmüller A, Südkamp NP, Helwig P. Treatment of periprosthetic femoral fractures with two different minimal invasive angle-stable plates: biomechanical comparison studies on cadaveric bones. Injury. 2010;41(12):1256-1261. PMID: 20950804.
- **Finding (one line):** Both LISS and NCB-DF angle-stable plates provided comparable stability in cadaveric Vancouver B1 fractures.
- **Loading conditions:**
    - Load type: cyclic axial loading
    - Magnitude: unknown
    - Cycles: cyclic
    - Rate: unknown
- **Construct conditions:**
    - Gap state: Vancouver B1 periprosthetic
    - Working length: unknown
    - Plate material: LISS vs NCB-DF (angle-stable)
    - Screw configuration: unknown
    - Bone model: paired cadaveric femora with cemented hip stem
- **Model relevance:** Tangential — periprosthetic construct comparison.

### Sanders 2002
- **Citation:** Sanders R, Haidukewych GJ, Milne T, Dennis J, Latta LL. Minimal versus maximal plate fixation techniques of the ulna: the biomechanical effect of number of screws and plate length. J Orthop Trauma. 2002;16(3):166-171. PMID: 11880779.
- **Finding (one line):** Plate length had greater effect on fatigue endurance than screw density; longer plates with fewer screws preferable.
- **Loading conditions:**
    - Load type: cyclic 4-point bending fatigue
    - Magnitude: unknown
    - Cycles: fatigue
    - Rate: unknown
- **Construct conditions:**
    - Gap state: ulnar fracture (cadaveric)
    - Working length: varied (via plate length and screw number)
    - Plate material: unknown
    - Screw configuration: varied screw number
    - Bone model: cadaveric ulnar fracture model
- **Model relevance:** Model 3 (P-Delta) — plate-length / working-length / screw-density fatigue study; informs working-length intuition under bending.

### Egol 2004
- **Citation:** Egol KA, Kubiak EN, Fulkerson E, Kummer FJ, Koval KJ. Biomechanics of locked plates and screws. J Orthop Trauma. 2004;18(8):488-493. PMID: 15475843.
- **Finding (one line):** Foundational review distinguishing locked from non-locked plating biomechanics; locked plate functions as internal fixator.
- **Loading conditions:**
    - Load type: review (axial, bending, torsion)
    - Magnitude: review
    - Cycles: review
    - Rate: review
- **Construct conditions:**
    - Gap state: review (diaphyseal and metaphyseal)
    - Working length: review
    - Plate material: locking plates
    - Screw configuration: review
    - Bone model: review
- **Model relevance:** Tangential — foundational review across all three model regimes.

### Ricci 2010
- **Citation:** Ricci WM, Tornetta P, Petteys T, Gerlach D, Cartner J, Walker Z, Russell TA. A comparison of screw insertion torque and pullout strength. J Orthop Trauma. 2010;24(6):374-378. PMID: 20502221.
- **Finding (one line):** Self-tapping screws had insertion torque and pullout strength similar to non-self-tapping screws across substrates.
- **Loading conditions:**
    - Load type: insertion-torque + pullout testing
    - Magnitude: unknown
    - Cycles: single load
    - Rate: unknown
- **Construct conditions:**
    - Gap state: n/a (screw bench test)
    - Working length: n/a
    - Plate material: n/a
    - Screw configuration: self-tapping vs non-self-tapping cortical
    - Bone model: polyurethane foam blocks of varied density
- **Model relevance:** Not relevant to the three biomechanical models (screw-only bench test).

# Section II — Veterinary medicine

### Welsh 2025
- **Citation:** Welsh PJ, Nylund AM, Gilbert PJ, Smith NA, Smith LV. Biomechanical analysis of orthogonal and unilateral locking plate constructs in a fracture gap model. Vet Surg. 2025;54(4):757-765. PMID: 39972999.
- **Finding (one line):** Unilateral plating had 3.5–4.1× the gap strain of orthogonal plating; OP constructs had 2.5–4.1× the strength and 3.0–4.2× the stiffness of UP.
- **Loading conditions:**
    - Load type: cyclic axial compression + static load-to-failure
    - Magnitude: 4–196 N cyclic
    - Cycles: 90,000 cycles + ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (fixed gap)
    - Working length: unknown
    - Plate material: 3.5 mm locking plate (unilateral) vs 3.5 + 2.0/2.4/3.0 mm Arthrex OrthoLine (orthogonal)
    - Screw configuration: unilateral vs orthogonal
    - Bone model: acetal homopolymer (Delrin) rods
- **Model relevance:** Model 3 (P-Delta) — bridging gap; orthogonal-plate component also engages Model 2 parallel-spring behaviour.

### Zderic 2023
- **Citation:** Zderic I, Varga P, Styger U, Drenchev L, Gueorguiev B, Asimus E, Saunders WB, Kowaleski M, Boudrieau RJ, Déjardin LM. Mechanical assessment of two hybrid plate designs for pancarpal canine arthrodesis under cyclic loading. Front Bioeng Biotechnol. 2023;11:1170977. PMID: 37064234.
- **Finding (one line):** Round-radiocarpal-hole plates had higher fatigue life than oval-hole plates; surgical maneuverability of OH design comes at cost of reduced fatigue life.
- **Loading conditions:**
    - Load type: cyclic axial fatigue (sinusoidal); strain-gauge
    - Magnitude: unknown
    - Cycles: fatigue
    - Rate: unknown
- **Construct conditions:**
    - Gap state: arthrodesis (closed)
    - Working length: n/a (arthrodesis)
    - Plate material: 2.7/3.5 mm 12-hole hybrid pancarpal arthrodesis plate
    - Screw configuration: round vs oval RC hole
    - Bone model: canine forelimb model (radius/RC/MC3)
- **Model relevance:** Model 1 (composite AMI) — closed arthrodesis where plate + bone act as a composite beam.

### Zderic 2021
- **Citation:** Zderic I, Varga P, Styger U, Drenchev L, Gueorguiev B, Asimus E, Saunders WB, Kowaleski M, Boudrieau RJ, Déjardin LM. Mechanical evaluation of two hybrid locking plate designs for canine pancarpal arthrodesis. BioMed Res Int. 2021;2021:2526879. PMID: 34504901.
- **Finding (one line):** Oval-hole pancarpal plates had ~50% higher peak strains adjacent to the radiocarpal hole than round-hole plates.
- **Loading conditions:**
    - Load type: quasi-static axial loading + FEA
    - Magnitude: 0–300 N
    - Cycles: 10 cycles
    - Rate: unknown
- **Construct conditions:**
    - Gap state: arthrodesis (closed)
    - Working length: n/a
    - Plate material: 2.7/3.5 mm hybrid pancarpal plate
    - Screw configuration: round vs oval RC hole
    - Bone model: simulated canine forelimb (radius/RC/MC3)
- **Model relevance:** Model 1 (composite AMI) — closed arthrodesis composite beam.

### Bleakley 2021
- **Citation:** Bleakley S, Palmer R, Miller N, McGilvray K, Tepic S. Biomechanical comparison of tibial plateau leveling osteotomy performed with a novel titanium alloy locking plate construct vs. an established stainless-steel locking plate construct. Front Vet Sci. 2021;8:698159. PMID: 34568474.
- **Finding (one line):** Novel TA plate with monocortical distal screws had 18% higher mean load-to-failure than predicate SS plate with bicortical screws (716 vs 629 N).
- **Loading conditions:**
    - Load type: single-cycle axial compression to failure
    - Magnitude: load-to-failure
    - Cycles: single ramp
    - Rate: unknown
- **Construct conditions:**
    - Gap state: TPLO osteotomy (intact stifle preparation)
    - Working length: unknown
    - Plate material: titanium-alloy point-contact vs stainless-steel locking plate
    - Screw configuration: monocortical (TA) vs bicortical (SS)
    - Bone model: 16 paired canine cadaveric pelvic limbs
- **Model relevance:** Tangential — TPLO is a specific anatomical/load case rather than a clean Model 1/2/3 mapping.

### Tremolada 2017
- **Citation:** Tremolada G, Lewis DD, Paragnani KL, Conrad BP, Kim SE, Pozzi A. Biomechanical comparison of a 3.5-mm conical coupling plating system and a 3.5-mm locking compression plate applied as plate-rod constructs to an experimentally created fracture gap in femurs of canine cadavers. Am J Vet Res. 2017;78(6):712-717. PMID: 28541152.
- **Finding (one line):** Conical coupling plating system tolerated more cycles before failure than LCP plate-rod under cyclic axial load (1/10 vs 6/10 failures).
- **Loading conditions:**
    - Load type: cyclic axial loading with stepwise increasing magnitude
    - Magnitude: stepwise
    - Cycles: cyclic to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging 40 mm mid-diaphyseal
    - Working length: unknown
    - Plate material: 3.5 mm conical coupling vs LCP
    - Screw configuration: plate + IM Steinmann pin (plate-rod)
    - Bone model: 10 paired canine cadaveric femora
- **Model relevance:** Model 3 (P-Delta) — bridging large-gap construct; plate-rod hybrid also engages Model 2 parallel-spring behaviour.

### Malenfant 2014
- **Citation:** Malenfant RC, Sod GA. In vitro biomechanical comparison of 3.5 string of pearl plate fixation to 3.5 locking compression plate fixation in a canine fracture gap model. Vet Surg. 2014;43(4):465-470. PMID: 24720361.
- **Finding (one line):** SOP outperformed LCP in 4-point bending (greater yield, rigidity, failure moment); LCP outperformed SOP in torsion.
- **Loading conditions:**
    - Load type: 4-point bending and torsion: single-cycle to failure + cyclic fatigue
    - Magnitude: unknown
    - Cycles: ramp + fatigue
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging 20 mm mid-diaphyseal ostectomy
    - Working length: unknown
    - Plate material: 3.5 mm SOP vs 3.5 mm LCP
    - Screw configuration: unknown
    - Bone model: 24 paired canine cadaveric tibiae
- **Model relevance:** Model 3 (P-Delta) — bridging-gap construct in bending and torsion.

### Pearson 2015
- **Citation:** Pearson T, Glyde M, Hosgood G, Day R. The effect of intramedullary pin size and monocortical screw configuration on locking compression plate-rod constructs in an in vitro fracture-gap model. Vet Comp Orthop Traumatol. 2015;28(2):95-103. PMID: 25657028.
- **Finding (one line):** Larger IM pin (50% canal fill) and additional monocortical locking screws increased plate-rod construct stiffness in axial loading.
- **Loading conditions:**
    - Load type: cyclic axial loading
    - Magnitude: unknown
    - Cycles: cyclic
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (canine femoral fracture-gap)
    - Working length: unknown
    - Plate material: 3.5 mm LCP + IM pin (varied diameter)
    - Screw configuration: varied number of monocortical locking screws
    - Bone model: canine femoral fracture-gap model
- **Model relevance:** Model 2 (parallel-spring) — plate + IM pin act as parallel stiffness elements; bridging gap also engages Model 3.

### Hurt 2014
- **Citation:** Hurt RJ, Syrcle JA, Elder S, McLaughlin R. A biomechanical comparison of unilateral and bilateral String-of-Pearls locking plates in a canine distal humeral metaphyseal gap model. Vet Comp Orthop Traumatol. 2014;27(3):186-191. PMID: 24736840.
- **Finding (one line):** Bilateral SOP plating had significantly higher torsional and bending stiffness than unilateral SOP in distal humeral metaphyseal gap.
- **Loading conditions:**
    - Load type: quasi-static torsion and bending
    - Magnitude: unknown
    - Cycles: single load
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging (distal humeral metaphyseal gap)
    - Working length: unknown
    - Plate material: 3.5 mm SOP plates (unilateral vs bilateral)
    - Screw configuration: unilateral vs bilateral
    - Bone model: canine cadaveric humeri
- **Model relevance:** Model 2 (parallel-spring) — bilateral-plate construct engages parallel stiffness; bridging metaphyseal gap also engages Model 3.

### Meeson 2012
- **Citation:** Meeson RL, Goodship AE, Arthurs GI. A biomechanical evaluation of a hybrid dynamic compression plate and a CastLess Arthrodesis Plate for pancarpal arthrodesis in dogs. Vet Surg. 2012;41(6):738-744. PMID: 22642497.
- **Finding (one line):** HDCP had higher bending stiffness (2269 N/mm) than CastLess plate (1754 N/mm); both withstood 10⁶ cycles in fatigue testing.
- **Loading conditions:**
    - Load type: single-cycle load-to-failure + cyclic
    - Magnitude: 38–380 N cyclic
    - Cycles: 10⁶ cycles
    - Rate: unknown
- **Construct conditions:**
    - Gap state: arthrodesis (closed)
    - Working length: n/a
    - Plate material: HDCP vs CastLess Arthrodesis Plate
    - Screw configuration: unknown
    - Bone model: synthetic pancarpal arthrodesis model
- **Model relevance:** Model 1 (composite AMI) — closed arthrodesis composite beam.

### Guillou 2012
- **Citation:** Guillou RP, Demianiuk RM, Sinnott MT, Curcio K, DeCamp CE, Haut RC, Déjardin LM. In vitro mechanical evaluation of a limited contact dynamic compression plate and hybrid carpal arthrodesis plate for canine pancarpal arthrodesis. Vet Comp Orthop Traumatol. 2012;25(2):83-88. PMID: 22027813.
- **Finding (one line):** Hybrid plate had lower compliance than LC-DCP but higher peak plate strain; both within physiological range.
- **Loading conditions:**
    - Load type: cyclic + strain-gauge instrumentation
    - Magnitude: 100/200/300 N
    - Cycles: 10 cycles per level
    - Rate: unknown
- **Construct conditions:**
    - Gap state: arthrodesis (20° extension)
    - Working length: n/a
    - Plate material: 3.5 mm LC-DCP vs 3.5/2.7 mm hybrid plate
    - Screw configuration: unknown
    - Bone model: 7 paired canine forelimbs
- **Model relevance:** Model 1 (composite AMI) — closed arthrodesis composite beam.

### Rothstock 2012
- **Citation:** Rothstock S, Kowaleski MP, Boudrieau RJ, Beale BS, Piras A, Ryan M, Bouré L, Brianza S. Biomechanical and computational evaluation of two loading transfer concepts for pancarpal arthrodesis in dogs. Am J Vet Res. 2012;73(11):1687-1695. PMID: 23106452.
- **Finding (one line):** Cyclic loading reproduced clinical failure patterns; FE-validated model identified high-strain regions at distal metacarpal screws for both plates.
- **Loading conditions:**
    - Load type: quasi-static elastic + cyclic loading to failure
    - Magnitude: unknown
    - Cycles: cyclic to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: arthrodesis
    - Working length: n/a
    - Plate material: HDCP vs castless arthrodesis plate
    - Screw configuration: unknown
    - Bone model: paired canine cadaveric forelimbs
- **Model relevance:** Model 1 (composite AMI) — closed arthrodesis composite beam.

### Tremolada 2019
- **Citation:** Tremolada G, Taggart R, Lewis DD, Palmer RH, Lambrechts NE. Assessment of mechanical properties and screw push-out for two 3.5-mm pearl-type locking plate systems. Am J Vet Res. 2019;80(6):533-538. PMID: 31112048.
- **Finding (one line):** Two pearl-type 3.5 mm plates produced equivalent screw push-out strength but differed in 4-point bending stiffness.
- **Loading conditions:**
    - Load type: screw push-out + 4-point bending
    - Magnitude: unknown
    - Cycles: single load
    - Rate: unknown
- **Construct conditions:**
    - Gap state: unknown
    - Working length: unknown
    - Plate material: two 3.5 mm pearl-style locking plate systems
    - Screw configuration: unknown
    - Bone model: synthetic bone
- **Model relevance:** Tangential — implant bench characterisation.

### Higuchi 2021
- **Citation:** Higuchi M, Katayama M. Clinical outcomes of orthogonal plating to treat radial and ulnar fractures in toy-breed dogs. J Small Anim Pract. 2021;62(11):1001-1006. PMID: 34254325.
- **Finding (one line):** Orthogonal LCP technique gave 95% union without major complications in toy-breed radial-ulnar fractures.
- **Loading conditions:**
    - Load type: clinical/radiographic
    - Magnitude: physiological
    - Cycles: clinical
    - Rate: clinical
- **Construct conditions:**
    - Gap state: radial-ulnar diaphyseal fractures
    - Working length: unknown
    - Plate material: 2.0/2.4 mm orthogonal locking plates
    - Screw configuration: orthogonal
    - Bone model: toy-breed dogs (in vivo)
- **Model relevance:** Tangential — clinical outcome study; supports orthogonal-plate concept relevant to Model 2.

### Hyndman 2021
- **Citation:** Hyndman P, Worth AJ, Clark K. The effect of pearl spacing on single-cycle load-to-failure and cyclic loading parameters of 2.0 mm pearl locking plates. N Z Vet J. 2021;69(6):337-342. PMID: 34111386.
- **Finding (one line):** Decreased pearl spacing in 2.0 mm SOP plates increased single-cycle stiffness and resistance to cyclic deformation.
- **Loading conditions:**
    - Load type: single-cycle load-to-failure + cyclic 4-point bending
    - Magnitude: unknown
    - Cycles: ramp + fatigue
    - Rate: unknown
- **Construct conditions:**
    - Gap state: unknown
    - Working length: unknown
    - Plate material: 2.0 mm SOP plates with varied pearl spacing
    - Screw configuration: unknown
    - Bone model: synthetic small-bone model
- **Model relevance:** Tangential — implant geometric-design effect.

### Eayrs 2021
- **Citation:** Eayrs MK, Guerin V, Grierson J, Moores AP. Repair of fractures of the lateral aspect of the humeral condyle in skeletally mature dogs with locking and non-locking plates. Vet Comp Orthop Traumatol. 2021;34(6):419-426. PMID: 34448167.
- **Finding (one line):** Locking plate repair gave higher union rate and lower complication rate than non-locking plate for canine lateral humeral condyle fractures.
- **Loading conditions:**
    - Load type: clinical/radiographic
    - Magnitude: physiological
    - Cycles: clinical
    - Rate: clinical
- **Construct conditions:**
    - Gap state: lateral humeral condylar fractures
    - Working length: unknown
    - Plate material: locking vs non-locking plates
    - Screw configuration: unknown
    - Bone model: skeletally mature dogs (in vivo)
- **Model relevance:** Tangential — clinical outcome study.

### Schmierer 2019
- **Citation:** Schmierer PA, Smolders LA, Zderic I, Gueorguiev B, Pozzi A, Knell SC. Biomechanical properties of plate constructs for feline ilial fracture gap stabilization. Vet Surg. 2019;48(1):88-95. PMID: 30422336.
- **Finding (one line):** Lateral locking plate had highest cycles to failure; orthogonal lateral + dorsal locking provided strongest construct in feline ilial gap model.
- **Loading conditions:**
    - Load type: cyclic axial loading to failure
    - Magnitude: unknown
    - Cycles: cyclic to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: bridging 3 mm transverse ilial gap
    - Working length: n/a (pelvis)
    - Plate material: dorsal nonlocking, lateral nonlocking, lateral locking, orthogonal lateral + dorsal locking
    - Screw configuration: single vs orthogonal
    - Bone model: 40 paired feline hemipelves
- **Model relevance:** Tangential — pelvic ilial construct, not a long-bone diaphyseal beam.

### Pagès 2022
- **Citation:** Pagès G, Hammer M, Grand JG, Irubetagoyena I. Long-term outcome of tibial plateau leveling osteotomy using an antimicrobial silver-based coated plate in dogs. PLOS One. 2022;17(8):e0272555. PMID: 35960763.
- **Finding (one line):** Silver-coated TPLO plates achieved comparable healing to non-coated plates with low SSI rate in 248 stifles over a median 48-day follow-up.
- **Loading conditions:**
    - Load type: clinical/radiographic
    - Magnitude: physiological
    - Cycles: clinical
    - Rate: clinical
- **Construct conditions:**
    - Gap state: TPLO
    - Working length: n/a
    - Plate material: BioMedtrix TPLO Curve plate (silver-coated)
    - Screw configuration: unknown
    - Bone model: canine TPLO (in vivo)
- **Model relevance:** Not relevant to the three biomechanical models (clinical infection / outcome study).

### Sumner 2010
- **Citation:** Sumner JP, Markel MD, Muir P. Biomechanical comparison of tibial plateau levelling osteotomy plates. Vet Surg. 2010;39(5):560-567. PMID: 20459489.
- **Finding (one line):** Different commercial TPLO plates produced different bending and torsional behaviour at clinically relevant loads.
- **Loading conditions:**
    - Load type: cyclic axial + torsion
    - Magnitude: clinically relevant
    - Cycles: cyclic
    - Rate: unknown
- **Construct conditions:**
    - Gap state: TPLO
    - Working length: n/a
    - Plate material: multiple commercial TPLO plate designs
    - Screw configuration: unknown
    - Bone model: canine cadaveric TPLO models
- **Model relevance:** Tangential — TPLO-specific construct.

### Aper 2003
- **Citation:** Aper RL, Litsky AS, Roe SC, Johnson KA. Effect of bone diameter and eccentric loading on fatigue life of cortical screws used with interlocking nails. Am J Vet Res. 2003;64(5):569-573. PMID: 12755298.
- **Finding (one line):** Larger bone diameter and eccentric loading reduced fatigue life of cortical interlocking screws.
- **Loading conditions:**
    - Load type: cyclic eccentric axial loading to failure
    - Magnitude: unknown
    - Cycles: fatigue to failure
    - Rate: unknown
- **Construct conditions:**
    - Gap state: n/a (interlocking-nail screw model)
    - Working length: n/a
    - Plate material: n/a (interlocking nail)
    - Screw configuration: cortical interlocking screws; varied eccentricity
    - Bone model: acrylic-mounted interlocking screw model
- **Model relevance:** Not relevant — interlocking-nail screw fatigue, not a plate construct.

# Provenance note

All 56 entries above were verified against PubMed (PMID provided per entry) in
the source list at https://github.com/chnikola-wq/literature-list (Apr 2026
verification pass). Where the source did not state a field explicitly, the
field is marked `unknown` rather than guessed. Per the bot's literature
protocol, `unknown` fields are treated as "cannot confirm match" rather than
as agreement when the bot classifies a paper as direct / partial / tangential
against a user's scenario.
