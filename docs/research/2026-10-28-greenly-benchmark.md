# Greenly benchmark and v5 upgrades

28 October 2026. Reference studied: greenly.earth (French home page, Bilan Carbone® product page, pricing, demo request, free tools). Goal: present SPS-CARBON at least as well as Greenly presents its platform, in our own style, and go further where we can do so honestly.

## 1. How Greenly presents its platform

**Positioning.** "La donnée carbone au service de vos décisions": measure, report and reduce the footprint of the company and its products, on one platform, compliant and audit-ready. Two calls to action: "Réserver une démo" and "Découvrir EcoPilot (IA)".

**Home page, in order.**

1. Hero with a product video (dashboard), a G2 rating, then a two-row client logo wall ("4 000 clients nous font confiance").
2. "Mesurez, réduisez, reportez. Sur une seule plateforme.": four pillar cards (GHG footprint and climate strategy, corporate reporting, product reporting, value chain), each with a mini product screen and chip links to sub-products.
3. ROI figures: lower management cost, more staff involved, less time spent.
4. Merger with Normative, scale figures (500 Mt CO₂e under management).
5. Standards strip (SBTi, CSRD, CDP, TCFD, B Corp, ISO 27001, ISO 14067, etc.).
6. EcoPilot: "4 agents IA à votre service" (architect, Scope 3 scout, environmental engineer, strategist).
7. Recognition (G2 leader, rankings), partner programme, final "Commencez maintenant".
8. Footer: product and sector link groups, comparisons with competitors, trust centre, newsletter, and a note on the site's own footprint.

**Product page (Bilan Carbone®).** Label, H1 "auditable comme vos comptes", certification logos, logo wall, four feature blocks (productivity, precision, impact, expertise) each with three checks and a screen, KPI figures, standards strip, a five-step method (collect, analyse, set targets, act, keep the course), a link to a free ROI calculator, four benefit cards, and an FAQ that gives cost (about €10,000 for an SME) and duration.

**Pricing.** No prices. Three plans (the middle one marked "most popular"), a long comparison table, add-ons ("options supplémentaires"), FAQ, "Contactez-nous" on every plan.

**Demo request.** An eight-step qualifier that starts with "Quelle est la raison de votre demande ?" (six reasons).

**Free tools.** Seven calculators (simplified carbon calculator, ROI, CSRD and CBAM checkers…), no account needed, computed in the browser.

**How the platform itself solves the problem.** Data is collected from accounting and ERP exports, APIs and supplier documents; each line is matched to an emission factor (physical, or monetary for spend data); dashboards break emissions down by scope and category; a reduction plan is built on reference trajectories (SBTi); suppliers are engaged for Scope 3; reports are produced for CSRD, CDP, EcoVadis and similar frameworks; product LCAs extend it to products; AI agents automate structuring, factor assignment and Q&A.

## 2. Where SPS-CARBON can be better

| Greenly | SPS-CARBON advantage |
| --- | --- |
| Calculators are black boxes; spend-based factors for much of Scope 3 | Every factor, its source and its formula are shown and editable; physical data first |
| Consent wall with about twenty advertising partners | No tracker, no analytics, so no banner to accept |
| Pricing hidden behind "contact us" | Interactive scope builder and the four price drivers explained |
| Generic EU frame (CSRD first) | Moroccan frame: MACF for Moroccan exporters, law 09-08, AMMC ESG circular, French |
| Software first, experts sold by the day | QHSE and RSE firm: consultants included at every step, link with ISO 14001, 9001, 45001 |

## 3. Gap analysis and what v5 changes

| Greenly pattern | Before (v4) | v5 |
| --- | --- | --- |
| "One platform" pillar section with mini screens | Not on the home page | New panel: four linked steps (collect and check, calculate, reduce, report) on one data thread, mini screens, links to each detail |
| Trust badges under the hero | Frameworks band lower down | Framework checks under the hero CTAs (GHG Protocol, ISO 14064-1, MACF / CBAM, law 09-08) |
| Top announcement for the new feature | None | "Nouveau" link to the free tools in the hero footer |
| Pricing page | FAQ answer only | New `/offres`: three formulas, full comparison table, six options, scope builder, price drivers, FAQ |
| Free calculators | Diagnostic and checklist only | New `/outils`: express Scope 1 and 2 calculator with sourced factors, MACF / CBAM checker, diagnostic, checklist, standards |
| Demo qualifier starting with the reason | Two-step form with a subject list | Three-step guided request: reason tiles, details (sites, deadline), review; links from tools and builder pre-fill it |
| Product page feature blocks with screens | Long text after the demo | `/plateforme`: six-module visual tour added after the demo |
| Benefits and deliverables | Text | `/solutions`: "Ce que vous recevez" document stack and a link to compare offers |
| Regulatory urgency | Timeline removed from home | `/normes`: "Les échéances à retenir" timeline |
| Mega menu with pricing and tools | Five sections | Six sections: plateforme, solutions, offres, outils, cabinet, ressources (methodology moved into plateforme and ressources) |
| Rich footer | Three short columns | Five columns and a "no tracker" note linking to the cookies page |

### Facts used in the new tools

- Fuel factors: CO₂ from combustion, IPCC 2006 Guidelines vol. 2 default carbon content × default net calorific value (diesel 2.68 kg/L with 0.84 kg/L, petrol 2.29 kg/L with 0.745 kg/L, LPG 2.98 kg/kg, residual fuel oil 3.13 kg/kg). Upstream emissions, CH₄ and N₂O are excluded and the page says so.
- Electricity: 551 gCO₂e/kWh, average intensity of Moroccan generation in 2024 (Low Carbon Power, from Ember and IEA data), location-based. Editable; replace with the factor retained for each mission.
- MACF / CBAM: definitive period since 1 January 2026; 50-tonne annual threshold per importer for cement, iron and steel, aluminium and fertilisers, none for hydrogen and electricity; certificates for 2026 imports sold from February 2027; first annual declaration 30 September 2027. Consistent with the existing regulatory timeline.

## 4. What we did not copy, and what needs a decision

These Greenly elements are proof that SPS-CARBON does not have yet. Inventing them would break the site's honesty rule, so they are left out until real:

- Client logos, case studies, ratings (G2), awards, "X clients", ROI percentages. Suggested next step: a "programme pionniers" for the first pilot companies, then real case studies.
- An AI assistant like EcoPilot: a product decision. The site only describes automatic quality checks that are planned.
- Published prices or price ranges: the offers page explains the drivers; publishing ranges is your call.

To validate before publishing:

- The comparison rows and the six options on `/offres` are derived from the existing offer cards and solutions page. Check that each "included" mark matches what the firm will deliver.
- The calculator's default factors and the electricity source.

Next upgrades worth doing:

1. Sector pages (`/secteurs/industrie`, `agroalimentaire`, `transport`…) generated from the sector explorer data: Greenly has ten.
2. Arabic version of the key pages: a strong differentiator in Morocco.
3. A trust page (hosting, data location, roles, law 09-08) once hosting is final.
4. A lead endpoint and newsletter when a backend exists; today every request goes through a reviewed e-mail draft.
5. "Espace client" login link when the platform opens.
6. A partner page (accounting firms, engineering offices, federations): the contact form already has a "Proposer un partenariat" reason.

## Verification

Checked in Chromium through an esbuild preview harness (desktop 1440 px and phone 390 px, light and dark versions, reduced motion and full motion): home, offers, tools, contact, platform, solutions and standards pages; calculator, checker, builder and contact flow exercised end to end with no console errors. Run `npm run typecheck` and `npm run build` locally to confirm the Next.js static export.
