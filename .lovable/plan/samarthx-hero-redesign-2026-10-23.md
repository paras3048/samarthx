# SamarthX hero redesign

## Goals
1. The first screen (above the fold) shows heading, CTA and the animation together. No scrolling needed.
2. The header logo sits in the center.
3. A 2-second logo intro plays before the site appears.
4. Replace the cluttered stacked-planes animation with a clean "hub" story: SamarthX at the center, connecting each stakeholder and showing what it gives them.

## 1. Intro (about 2s, once per visit)
- Full-screen light background. The SamarthX logo strokes draw on (0-1.0s), the colors fill in (1.0-1.4s), and the amber X gives a soft pulse (1.4-1.7s).
- The logo then shrinks and glides up into its spot in the header, while the overlay fades and the hero fades in (1.7-2.1s).
- Skipped if the visitor has reduced motion turned on. Scrolling is locked while it plays.

## 2. Header
- Desktop: nav links split around a centered logo: `Platform  Stakeholders | LOGO | Features  Impact` with "Request a Demo" on the far right. "Contact" stays reachable through the CTA.
- It still shrinks into a centered pill after scrolling, with the logo kept in the middle.
- Mobile: logo centered, grid icon on the right opening the same glass menu.

## 3. Hero layout (fits one screen, 100svh)
- Left column (desktop) or top (mobile): eyebrow, H1, subheading, CTA.
- Right column or below: the new animation, sized to fit the remaining height.
- The large hero logo is removed (it now lives in the header), which frees up space.
- Same subtle dot grid and soft blue glow behind.

## 4. New animation: "SamarthX Hub"
```text
              [ State ]
                  |
   [ Families ]--( X )--[ Institutions ]
```
- **Center:** the SamarthX X mark in a glowing circle, the central node where everything intersects.
- **Three orbit nodes** around it, each a clean glass card with one icon and a label:
  - State & Government (shield/analytics), top
  - Institutions (school), right
  - Parents & Students (graduation cap), left
- Thin lines connect each node to the center. Small dots flow both ways along them to show data moving through SamarthX.
- **Story cycle (auto, about 4.5s per stakeholder, loops):** one stakeholder is spotlighted at a time and the others dim. A small panel unfolds beside the active node with that stakeholder's value:
  - **State:** a mini live dashboard. Data streams in from the other nodes into the center, then up into the state. Counters tick: "25,000 institutions", "Live attendance 94%". Caption: "Every institution, one centralised view."
  - **Institutions:** module chips fan out of the center one by one: Employee Records, Student Records, Mid-day Meal, Academics. Caption: "Every module to run your institution."
  - **Parents & Students:** module chips: Report Card, Attendance, Notices, Scholarships. Caption: "Follow progress anytime."
- Small tabs under the animation (State · Institutions · Families) let visitors pick a stakeholder; hovering or tabbing to a node does the same. Auto-cycling pauses while the visitor is interacting.
- Calm motion only (700-1000ms ease-out, no bounce). Animation pauses when off-screen. With reduced motion, a static hub is shown with all three panels' content listed.
- The secondary groups (Auditors, Mid-day Meal Operators, Welfare) move out of the hero; they stay in the Stakeholders section.

## Technical section
- Replace `LivingStack.tsx` with `StakeholderHub.tsx` (SVG lines and dots plus HTML panels animated with Framer Motion `AnimatePresence`). The X mark is cropped from the uploaded logo SVG, not redrawn.
- `IntroLoader` uses a shared `layoutId` with the header logo for the glide-into-header handoff, with the total duration kept around 2.1s.
- `Header` gets a three-zone grid (left nav / centered logo / right nav + CTA) that keeps the existing compact-pill behavior.
- Hero becomes a `min-h-[100svh]` two-column grid on lg screens and stacks on smaller screens, with the animation height capped so the CTA stays visible at 920x713.
- Everything below the hero (sections, form, Cloud saving) is unchanged.
