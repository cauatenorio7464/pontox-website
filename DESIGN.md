---
name: PONTO X Comunicação Visual
description: Deep blue-black UI with a diagonal wine-to-crimson glow, frosted-glass surfaces and the logo X's diagonal cut.
colors:
  ink: "#12141c" # --bg-base, main background (never pure black)
  ink-2: "#1a1d27" # --bg-elevated
  ink-3: "#252937" # --bg-raised
  outer-1: "#2b303d" # --bg-outer (optional slate for large outer areas)
  outer-2: "#3a4050"
  wine: "#5a0b17" # --red-wine, base of the red gradient
  red: "#b3152c" # --red-main, crimson accent
  red-deep: "#8a1023" # chips and pressed states
  red-hot: "#e0324a" # --red-highlight, only at the tip of a glow and in small graphics
  white: "#ffffff" # --text-primary
  mute: "rgb(255 255 255 / 0.68)" # --text-secondary
  line: "rgb(255 255 255 / 0.10)" # --border-subtle
  glass: "rgb(18 20 28 / 0.52)" # frosted surfaces (0.42–0.62 depending on the element)
  glass-solid: "rgb(26 29 39 / 0.92)" # fallback without backdrop-filter
  paper: "#f6f4f2" # only the light plate behind dark client logos
  shade: "rgb(0 0 0 / 0.6)" # shadow under the floating header only
  primary-hover-start: "#74101f"
  primary-hover-end: "#c81c36"
typography:
  display:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 72"
  display-secondary:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 4.7vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 72"
  headline:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  statement:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "clamp(1.25rem, 1.75vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 100"
  title:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  title-large:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  small:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 108"
rounded:
  none: "0px"
  sm: "12px" # buttons, chips, logo plates
  md: "16px" # glass cards, photo frames (with the X cut)
  lg: "18px" # floating header bar
  full: "9999px" # photo-slider arrows and dots
spacing:
  gutter: "clamp(16px, 3.2vw, 48px)"
  section: "clamp(96px, 12vw, 180px)"
  section-light: "clamp(72px, 9vw, 128px)"
  header: "68px"
  cut: "26px"
  notch: "14px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.red}" # 135° gradient wine 0% → red 58%, 1px red-hot border at 55%, soft red drop shadow
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.35rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "{colors.glass}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.35rem"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "rgb(255 255 255 / 0.10)"
    textColor: "#ffffff"
  chip-filter:
    backgroundColor: "{colors.ink-2}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "44px"
  chip-filter-active:
    backgroundColor: "{colors.red}"
    textColor: "#ffffff"
  card-project:
    backgroundColor: "{colors.glass}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "20px"
  service-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mute}"
    padding: "28px {spacing.gutter}"
  service-panel-active:
    backgroundColor: "{colors.red}"
    textColor: "#ffffff"
  contact-row:
    backgroundColor: "{colors.ink-2}"
    textColor: "#ffffff"
    padding: "16px 20px"
  icon-button:
    backgroundColor: "{colors.ink-2}"
    textColor: "#ffffff"
    size: "48px"
  timeline-node:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    size: "40px"
  timeline-node-active:
    backgroundColor: "#ffffff"
    textColor: "{colors.red}"
  header-solid:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    height: "{spacing.header}"
---

# Design System: PONTO X Comunicação Visual

> **Palette update (2026-11-16, owner request):** the warm near-black and logo-red print palette was replaced by a cool blue-black base (#12141C / #1A1D27) with wine-to-crimson reds (#5A0B17 → #B3152C, #E0324A only at glow tips). Sections that were on paper (Quem somos, the Serviços photo cell, Vídeos) are now dark. A signature **diagonal glow** (dark top-left, wine then crimson growing to the bottom-right, built from layered CSS gradients) sits behind visuals: strong only behind the hero's closing CTA (whose veil is heaviest bottom-left, under the text, and lightest top-right, so the finished store stays visible); faint in Vídeos (0.3) and Projetos and Contato (0.16); none in Serviços (owner choice after the 2026-11-16 critique: less glow, the X's bands lead). **Frosted glass** (52% base, 16px blur + 140% saturation, 1px rgba(255,255,255,0.10) border, faint top highlight, 16px radius; 8px blur on phones; solid 92% fallback) is used on: the floating header bar after the hero (18px radius, detached from the top), project cards, Como trabalhamos step cards, the final CTA content box, Contato rows, secondary buttons and the photo-slider arrows and dots. Never over the hero video or its H1/H2 (the header button there is a plain outline). Primary buttons are a 135° wine-to-crimson gradient with a soft red glow, 12px radius; secondary buttons are glass. Photo frames keep the X cut and gain 16px rounding on the other corners. The PONTO X logo always keeps its original colours. The brand strip (below) shows client logos in their original colours. Older prose below that names "Logo Red", "ink" or "paper" refers to these tokens by role.

## Overview

**Creative North Star: "The Two-Colour Print Job"**

The site is printed, not decorated. Three inks taken from the PONTO X logo (a tinted near-black, the logo's own red, and a warm paper white) are laid down in flat, full-bleed fields, and the only graphic device is the diagonal cut of the X, at roughly 36 degrees. That cut shows up as red bands crossing light sections, a clipped top-right corner on photos and buttons, slanted section tops that overlap the section above, small skewed red ticks used as bullets and separators, and a diagonal wipe into the hero's closing call to action.

Density is generous and editorial: big expanded Archivo headlines, wide margins driven by a fluid gutter, long vertical rhythm between sections, and real client photography doing the persuading. Dark and light sections alternate (ink, paper, ink and red, paper, ink, paper, ink) so the page reads like a stack of printed sheets. Corners are square everywhere except where the X cuts them. There are no rounded corners, no drop shadows, and no icon-card grids.

Motion behaves like a sign being installed and switched on. The hero video is scrubbed by scroll, not autoplayed. The hero H1 lights up once like an LED letter. Section titles assemble word by word. Blocks rise into place, and on desktop a soft red light follows the pointer across service panels and project cards.

**Key Characteristics:**
- Three inks only: ink, logo red, paper. Tints of ink (ink-2, ink-3) and paper (paper-2) separate surfaces.
- One motif: the X's ~36° diagonal cut. Nothing else is ornamental.
- Square geometry (0px radius), with the clip-path corner cut as the only departure.
- Expanded, heavy Archivo for titles. Big Shoulders is reserved for the two hero headlines (signage letters).
- Flat surfaces. Depth comes from colour-field contrast, overlapping slanted edges, and the scrims and glows the brief asks for.

## Colors

A strict black, red and white print palette taken from the logo file, with warm tints of the black and the white instead of greys.

### Primary
- **Logo Red** (red): measured from the logo file. Used for the primary button fill, the active service panel, the whole "Como trabalhamos" section ground, diagonal bands, skewed tick bullets, underline decoration on links, the hero progress bar, selection highlight, and the scrollbar thumb.
- **Pressed Red** (red-deep): hover state of primary buttons and the dialog close button. Never used as a surface.
- **Signal Red** (red-hot): red for small text and focus rings on dark grounds, where Logo Red fails AA. Used for the global focus outline (3px, offset 3px) and for link hover text on dark. Also the tint of the mouse-follow light.

### Neutral
- **Shop-Window Black** (ink): page ground, header once solid, dark section fields, timeline nodes.
- **Sheet Black** (ink-2): raised dark surfaces: project cards, filter chips, contact rows, footer, alternating service panels, carousel arrow buttons, the dialog info column.
- **Proof Black** (ink-3): image placeholders behind photos, chip borders, dialog arrow buttons.
- **Paper** (paper): light section ground (Quem somos, brand strip, Vídeos) and the default text colour on dark.
- **Paper Fold** (paper-2): the light half of the Services split and placeholders behind photos on paper.
- **Ash** (mute): secondary text on dark (metadata, contact labels, footer body).
- **Ink Grey** (mute-ink): secondary text on paper (facts line, video captions, brand names).

### Named Rules
**The Palette Rule.** Every surface is a blue-black ink tint, frosted glass over ink, or a red from the wine→crimson ramp; paper appears only as the plate behind dark client logos. No other hue enters the system; photography carries all other colour.

**The Signal Red Rule.** Logo Red is for fields, bars, bands and large type. Small red text or outlines on a dark ground use Signal Red instead, for contrast.

## Typography

**Display Font:** Big Shoulders (variable, opsz axis), with Arial Narrow fallback
**Body Font:** Archivo (variable, wdth axis), with Helvetica Neue fallback

**Character:** Big Shoulders reads as the channel letters of a shop sign and appears only where the page is a sign: the hero H1 and H2. Archivo does everything else, stretched wide and heavy for titles so headlines feel like vinyl lettering, and at normal width for reading.

### Hierarchy
- **Display** (Big Shoulders 800, clamp(2.75rem, 7.4vw, 6rem), line-height 0.92, opsz 72): hero H1 only, bottom-left over the first video frame, max ~900px wide, balanced.
- **Display secondary** (Big Shoulders 800, clamp(2.25rem, 4.7vw, 4.4rem), line-height 0.92): hero H2 only, which replaces the H1 in the same position on scroll.
- **Headline** (Archivo 800, wdth 118, clamp(2.1rem, 4.4vw, 4.5rem), line-height 0.98, -0.03em, balanced): every section title and the hero's closing CTA title. Always revealed word by word.
- **Statement** (Archivo 400, clamp(1.25rem, 1.75vw, 1.75rem), line-height 1.35): lead paragraphs under headlines, 30 to 40ch max.
- **Title** (Archivo 700, wdth 112, 1.25rem, line-height 1.15): project and video names. Steps up to 1.75rem (title-large) for service group names, process step titles and the dialog title.
- **Body** (Archivo 400, 1.0625rem, line-height 1.55): running text, lists, contact values. Process step text runs at 30ch.
- **Small** (Archivo, 0.875rem, line-height 1.45): metadata, captions, footer legal line.
- **Label** (Archivo 700, wdth 108, 1rem, line-height 1.1): buttons. Nav links use 1rem semibold at normal width; the mobile menu sets them at 2.25rem extrabold, wdth 118.

### Named Rules
**The Sign Face Rule.** Big Shoulders appears only in the hero H1 and H2. Every other heading, including the hero's closing CTA, is Archivo.

**The Sentence Case Rule.** Headlines, buttons and nav are set in sentence case; the type gets its loudness from width and weight, not capitals.

## Layout

Full-bleed bands with a fluid side gutter (clamp(16px, 3.2vw, 48px)) instead of a centred container; content lines up to the gutter edge at every width. Sections breathe on a long vertical rhythm: clamp(96px, 12vw, 180px) top and bottom for most sections, clamp(96px, 13vw, 200px) for Quem somos, clamp(72px, 9vw, 128px) inside the Services light cell, and a tighter strip for the brand marquee.

Composition uses a 12-column grid at md/lg with asymmetric spans: image 5 of 12 and text starting at column 6 in Quem somos; 5 and 7 in Contato; a 50/50 split in Serviços where the light cell holds the title and the active photo while the dark cell stacks one panel per service group; the process title is pushed right by 34%. Galleries (projects, and videos on mobile) are horizontal native scroll tracks with scroll-snap, cards at 72vw on phones, 46vw at sm, then 30vw or 23vw (max 400px) on desktop; a filter with two items or fewer lets its cards (and the end card) share the row equally on desktop, with 4:3 images. Videos become a 3-column grid from md.

The hero is a sticky full-viewport stage inside a 320vh section on phones (440vh from md), and the header is fixed at 68px. Internal gaps step through 8, 12, 16, 20, 24, 32 and 48px.

## Elevation & Depth

The system is mostly flat. The only shadows are the faint inset top highlight on glass, the soft red drop shadow under primary buttons, and the shadow under the floating header. Depth comes from colour-field contrast (ink-2 cards on ink, red panels against ink), from slanted section tops that overlap the section above by the slant height, and from photography. The brief explicitly asks for four light effects, and they are part of the world on these terms:

- **Hero scrims:** a neutral ink gradient at the top (62% to 0, 160px) and the bottom (82% to 50% to 0 over 62% of the height), only so text reads over the video.
- **Red radial glows:** a low-opacity red ellipse (18% to 42% alpha) on dark grounds only: the Projects corner, the Contact corner, and behind the hero closing CTA.
- **LED glow:** a white and red text-shadow on the hero H1/H2 only, at full strength during the one-time light-up and then resting low.
- **Mouse-follow light:** a 260px radial of Signal Red at 22% alpha that tracks the pointer over service panels and project cards on fine-pointer devices.

### Named Rules
**The Flat Print Rule.** Surfaces never cast shadows. If something needs to lift, put it on the next tint (ink to ink-2 to ink-3) or on red.

**The Glow Belongs to the Sign Rule.** Text glow is for the hero sign lettering only. Red radial glows sit only on dark sections, never on paper.

## Shapes

Every corner is square (0px). The only departure is the X cut: a diagonal clip of the top-right corner, 26px across and 72% of that down, on photos, video cards, project cards, carousel and dialog arrow buttons, the play button and timeline nodes. Variants cut the bottom-left or both corners. Primary buttons carry a 14px cut at the top right; ghost buttons carry the same 14px triangle as a solid red notch that grows 1.35 times on hover.

Large-scale cuts repeat the angle: red bands rotated 36° (56 to 120px wide) cross the light sections and the mobile menu, an ink band crosses the red process section, slanted section tops (clamp(24px, 4vw, 56px)) lean right or left, and the hero CTA arrives through a diagonal clip-path wipe led by a red band. Small 36° skewed red ticks replace bullets and separators in lists, the facts line, the brand marquee and the hero progress label.

Icons are drawn in-house as 24px SVG with a 2.2px stroke, square caps and mitred joins, so they match the hard corners.

## Components

### Buttons
Solid, square, a little wide in the letters, with the X notch at the corner.
- **Shape:** square (0px) with the 14px top-right cut; min-height 48px (42px in the desktop header; 44px for the compact variant in the mobile header and video retry, and for the 0.875rem per-project ask).
- **Primary:** Logo Red fill with a 2px red border and white label, padded 0.8rem by 1.35rem. Used for every WhatsApp action. A trailing arrow slides 4px right on hover.
- **Hover / Focus:** primary darkens to Pressed Red; any button presses down 1px on active. Focus is the global 3px Signal Red outline (Logo Red on paper, white on red grounds). Transitions run 0.25s on the expo-out curve.
- **Ghost:** transparent with a 2px Logo Red border, label in the current text colour, and the red corner notch. Fills red with white text on hover. Used for secondary actions such as Orçamento in the header, Ver nossos trabalhos, Como chegar and the per-project ask.
- **Arrow link:** bold text underlined 2px in red at 0.3em offset, with an arrow that slides 4px on hover. Used for in-page jumps.

### Chips
- **Style:** project filters are square, 44px tall, with a 2px Proof Black border on a Sheet Black fill, white semibold label. No counts: a group with one photo must not read as "done once".
- **State:** the active filter fills red with a red border; hover on inactive chips turns the border red. They behave as a pressed toggle group and scroll horizontally on small screens.

### Cards / Containers
- **Corner Style:** square with the top-right X cut.
- **Background:** Sheet Black on ink; one card per client, a 4:5 photo frame on a Proof Black placeholder, then a 20px body (16px on phones) with name, segment and every service the client's photos show, and a ghost button pinned to the bottom.
- **Photo slider (clients with 2+ photos):** photos crossfade in 300ms (instant under reduced motion). Two 44px hit-area arrows sit vertically centred on each side: a translucent ink circle (36px on mouse devices, 32px on touch, 50% ink with a 6px backdrop blur) holding a thin 1.6px white chevron; on mouse devices they stay hidden until the card is hovered or focused, on touch they are always visible. Dots sit bottom-centre on a translucent ink pill: 8px white at 55%, the current one Logo Red and slightly larger, each with a 22×24px hit area. Swipe on touch (the frame is pan-y so horizontal swipes change photos instead of scrolling the gallery), arrow keys when focused, looping at both ends. Arrows and dots never open the dialog; the photo itself does. Only the current and next photos load.
- **Shadow Strategy:** none (see Elevation & Depth). Hover scales the photo to 1.04 inside the frame over 0.7s and shows the mouse-follow light.
- **Border:** none.
- **Video card:** 9:16 cut frame, poster under an 18% ink veil, and a centred 64px red cut square with a play glyph that scales to 1.1 on hover. Plays inline with sound after a click; only one plays at a time. Client videos also appear in the projects gallery under their service filter, as 4:5 poster cards with a centred 56px play square, opening in the same dialog with native controls.
- **End card:** a filtered gallery ends with a Proof Black cut card asking "Quer ver mais trabalhos de …?" and a primary "Pedir mais exemplos" WhatsApp button. Below every track a small tabular "1–4 de 31" position line sits left of the arrow buttons.
- **Video states:** after a tap, a small ink chip with a red tick reads "Carregando vídeo…" (only after 0.3s); a failed load covers the frame at 88% ink with "Não foi possível carregar o vídeo." and a compact ghost "Tentar de novo".
- **Pending tag:** content the company has not confirmed ([CONFIRMAR], [NOME DO CLIENTE], [SEGMENTO]) is a quiet inline annotation: 0.875rem, 600 weight, 0.04em tracking, 85% opacity, in the surrounding text colour, with no box or border so it never reads as a control. A missing client name never takes the title slot: the card and dialog title falls back to the segment (or what the video shows) and the annotation sits in the metadata line.
- **WhatsApp note:** under the hero CTA, the dialog button and the Contact WhatsApp row, a small muted line says the tap opens WhatsApp with the message ready and gives the opening hours.
- **Contact rows:** a definition list of Sheet Black rows, 16px by 20px, with a 120px muted label column. WhatsApp is the first row (number, primary button, the WhatsApp note), then address with Como chegar and hours, phone, e-mail, Instagram. On phones the shop photo comes after the list.
- **Footer:** compact: slogan, one line of contact links (WhatsApp, phone, e-mail, Instagram) with red underlines, the full-width logo as the sign-off, then the legal line. Address and hours live only in Contato, right above.

### Navigation
- **Header:** fixed, 68px, transparent over the hero video (sitting on the top scrim) and switching to solid ink after the hero ends. Logo image left; four semibold white links with a red 2px underline on hover; a compact Orçamento button, also shown on phones beside the menu button (a header control, not a floating button): ghost over the hero video, solid primary once the header turns ink, since it is the site-wide conversion control.
- **Mobile:** a 48px menu button opens a full-screen ink sheet below the header with 2.25rem extra-wide links, a full-width primary button, contact lines and a red band crossing the corner. Escape closes it and returns focus.

### Services Panels
A split: the Paper Mist cell holds the headline and, on desktop, the open group's photo filling all the remaining height (cut corner, horizontal clip wipe between groups). The ink cell stacks the five groups as 76px rows: closed rows show only the title (title-large, Ash, white on hover) and a 20px red-hot plus, alternating ink and Sheet Black. The open group becomes the section's peak: a Logo Red block that grows (flex-grow, 0.5s expo) to take the space the others leave, with its items at statement size behind white skew ticks, a "No vídeo do início" line of Pressed Red chips naming the pieces of that service seen in the hero video (same labels as the hero list), and the arrow link that filters the projects gallery anchored at the bottom. Hover (after a 140ms pause) or focus opens a group; on phones the photo sits inside the open block. The list keeps a bottom band the next section's slant can cover.

### Timeline
Como trabalhamos sits on a full red ground. A 4px rail (ink at 25%) runs horizontally from md and vertically on phones; a white line draws along it as the visitor scrolls. Each step has a 40px cut ink node holding its number, which turns white with a red numeral once the line reaches it.

### Brand Strip
A Sheet Black section with the title in the Headline style and a small Pausar/Continuar text button (WCAG 2.2.2). Two rows of client marks are always moving: row 1 to the left in 35s per loop, row 2 to the right in 45s, as a pure CSS translate3d of a track holding two identical copies (the second aria-hidden), from 0 to exactly -50%, linear and infinite; if a copy is narrower than the screen, the list repeats inside each copy (the duration scales with it) so the rows are always full. No hover effects. Reduced motion keeps it moving three times slower; the animation rests only while the section is off-screen and resumes on return. Edges fade through a mask. Logos are cropped from Ponto X's own project photos and video frames (scripts/brand-logos.cjs; never redrawn or downloaded) and always show their original colours, all on one height family (36–56px; very wide marks a little lower). Logos whose colours are dark (Milklandia, Ciocco, Maple Bear, Noma) sit on a light plate (paper at 90%, 1px light border, 12px radius, no blur so the animation stays cheap). Clients without a clean mark appear as their name in Archivo 800, wdth 118, uppercase, white.

### Lightbox Dialog
A native modal dialog at 96% ink covering the viewport. The photo grows out of its card (FLIP, 560ms open, 320ms close) and keeps the X cut; it opens on the photo the card was showing, with the same slider (44px arrow circles at the sides, dots, swipe), and the card keeps the last photo seen. A 400px Sheet Black info column on desktop holds the name, metadata, a full-width primary button, the WhatsApp note, cut arrow buttons that step between clients and a position count; on phones it collapses to a compact bar (name, metadata, button and step arrows in one row) so photos and vertical videos fill the screen. Arrow keys change photos (or clients when there is only one photo) and leave a focused video to seek. Close is a square red 48px button at the top right; Escape, a click outside and the Back gesture also close it.

### Hero Stage
A poster frame of the white store shows at once, then the video is scrubbed by scroll with light easing. The H1 lights up once and leaves upward; the H2 rises into its place and leaves; a minimal label with a red tick names the piece being installed while a 4px red progress bar grows along the bottom edge; a red band sweeps across as the closing CTA wipes in diagonally over an ink-and-red-glow field. The finished store holds unveiled for a moment (about 3.5% of the scroll) with its last label before the band sweeps; the closing veil is a diagonal ink scrim, strongest behind the text at the bottom left and lightest at the top right so the store stays visible. While the video has not delivered its first frames the label reads "Carregando o vídeo…". In portrait (phones and tablets standing up) the full 16:9 frame sits in the upper middle of an ink stage with the X cut on its top-right corner, the H1/H2 directly below it, the progress bar along the bottom edge of the video, and, on tall screens, a list of the installed pieces below the video in place of the single label (done: Ash text with a red tick; current: white semibold with a Signal Red tick; upcoming: Ink Grey).

### Motion
- **Curve:** expo-out (cubic-bezier(0.16, 1, 0.3, 1)) for every transition and entrance.
- **Title wipe:** section titles enter once with a diagonal clip-path wipe at the X's angle (0.9s expo-out), the same gesture as the hero's closing wipe; the clip lives on an inner span so the heading itself stays observable, and the end shape overshoots the text box so accents and descenders are never cut. Reduced motion shows titles directly.
- **Rise:** blocks enter 24px below with fade, 0.8 to 0.9s, with optional delays of 80 to 220ms.
- **LED on:** hero words go from dim grey to white with a bright glow (1s, 70ms stagger, 150ms lead), once.
- **Reduced motion:** reveals and rises show immediately, hover offsets and the notch scale are removed, the marquee stops and wraps, the hero video follows scroll without easing, the timeline is shown complete, the lightbox opens without the grow, and smooth scrolling is off. Colour and state changes stay.

## Do's and Don'ts

### Do:
- **Do** build every surface from ink, ink-2, ink-3, red, paper and paper-2; let photography bring all other colour.
- **Do** cut media and square controls at the top right with the X cut (26px, 72% drop) and keep every other corner square.
- **Do** use the 14px notch on buttons: clipped on primary, a red triangle on ghost.
- **Do** keep the diagonal at 36°: bands, skewed ticks, slanted section tops and wipes all share it.
- **Do** use Signal Red for small red text and focus outlines on dark grounds, and Logo Red for fields and large type.
- **Do** set section titles in Archivo 800 at wdth 118 and reveal them word by word.
- **Do** keep every section on the blue-black ground; sections separate through ink and ink-2 tints, the red Process field and the diagonal slants.
- **Do** give every motion a reduced-motion fallback that keeps state and colour changes.

### Don't:
- **Don't** round corners beyond the scale (12px buttons and chips, 16px cards and photo frames, 18px header) or add shadows beyond the three listed in Elevation. Small cut elements (badges, play and arrow buttons) use a smaller --cut (10–14px) so the X cut never reads as a dog-ear.
- **Don't** use Big Shoulders outside the hero H1 and H2.
- **Don't** introduce a second motif (circles, waves, gradients as decoration) next to the X cut.
- **Don't** use the diagonal glow as wallpaper: strong only behind the closing CTA, faint where glass needs something behind it; no text glow outside the hero sign lettering.
- **Don't** add eyebrow labels above titles; the two in Quem somos and Vídeos are brief-specific exceptions, not a pattern.
- **Don't** redraw or download client logos; the brand strip uses only marks cropped from Ponto X's own photos and video frames, in their original colours.
- **Don't** autoplay video with sound; the hero is scrubbed silently and the video cards play only on a click.
