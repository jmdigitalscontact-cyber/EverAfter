# EverAfter — Digital Wedding Suite

**By JMDigitals**

A complete digital wedding system: invitation website, private QR RSVP, couple admin, and a live reception app. Built to be customized for each couple and delivered as a finished experience — not a template they have to figure out.

Use this document for proposals, sales pages, and client conversations.

---

## One-line pitch

From the first click on the invitation to the last photo on the dance floor, guests have one beautiful, private digital home for your wedding.

## Who it is for

Couples, planners, and families who want more than a Canva page and a Google Form. Especially strong for:

- Invitation-only weddings with a hard guest cap
- Church + reception days that need clear directions, attire, and program
- Philippine celebrations with entourage, sponsors, and assigned seating
- Couples who want QR codes on printed invites, not public RSVP links
- Receptions that need find-your-seat, menu, gifts, and a live guest photo wall

## The problem we solve

Paper invites still get lost. Public RSVP links get forwarded. Spreadsheets break when Auntie changes her plus-one. On the night, guests crowd the registration table asking where they sit, what is for dinner, and how to send a gift.

EverAfter is the full guest journey, already designed:

1. They open a cinematic invitation site.
2. They RSVP only with their personal QR or link.
3. You watch headcount, seating, and photos in one dashboard.
4. At the venue they scan once, pick a team, find their seat, share POVs, leave a private note, and see gift details.

---

## What guests receive

### 1. Invitation website

A mobile-first wedding site, customized with the couple’s names, photos, palette, and copy.

Typical sections:

- Hero with names, date, and ambient music
- Live countdown
- Ceremony and reception cards with maps
- Love story / “our moments”
- Photo gallery and lightbox (plus a dedicated gallery page)
- Guest notes (adults-only, unplugged ceremony, weather, gifts)
- Attire and motif guide for guests, sponsors, and entourage
- Ceremony and reception program
- Entourage photo book
- FAQ
- Invitation-only RSVP (locked until their QR or personal link is used)

We start from one of five design looks (Sage Garden, Champagne Blush, Midnight Velvet, Terracotta Olive, Ivory & Ink), then customize photography, type, and copy so it is theirs — not a leftover template.

### 2. Private QR RSVP

Each household gets a unique invitation — not a public form.

- Unique QR code and personal link per invitation
- Guest list on the card is preloaded (they tick who is coming)
- Dietary notes and messages
- One controlled update after the first submit; later changes go through the couple
- No plus-ones unless you put them on the invitation
- Capacity-aware: you set the guest limit; the dashboard tracks remaining seats

### 3. Reception night app (QR at the door)

A phone app guests unlock by scanning the venue QR. The public wedding site never links to it.

Guest path:

1. Venue QR lock screen (the public wedding site never links here)
2. Welcome
3. **Team Bride or Team Groom?** — required vote, one locked vote per phone, live scores
4. Find your seat (search by name; table and seat appear only after they type)
5. Interactive floor plan (pinch, pan, tap a table)
6. Tonight’s menu with dietary tags and filters
7. Live POV gallery — camera or camera roll, on-phone WebP compress, like photos, lightbox
8. Private note for the couple (only they and admin can read it)
9. Wedding gifts — envelope, bank, or e-wallet details after a gift-box reveal

Also available: a **TV / projector wall** that plays guest photos full-screen for the room.

---

## What the couple (and planner) receive

A private admin dashboard:

| Area | What they can do |
|------|------------------|
| Dashboard | Capacity, invitations sent, responded, confirmed, declined, unused slots |
| Invitations | Create one or many, generate QRs, send, edit, delete |
| Responses | See who is coming, names, notes, one-time edit / clear |
| Export | CSV downloads and Google Sheets push |
| Seating | Assign tables and seats; print-ready overview |
| Photos | Moderate the live gallery, hide, delete, download a ZIP of every POV |
| Reception | Print the venue QR; watch Team Bride vs Team Groom totals; reset votes for rehearsal |
| Notes | Read private guest messages; export CSV |

Security that is already built in:

- Invitation-only RSVP (QR + password / token)
- Reception gated by a secret key in the venue QR
- Admin login with CSRF protection, hashed passwords, and rate limiting
- Input sanitization and prepared queries

---

## What we customize per couple

This is not a generic “log in and edit a template” product. Each wedding is a finished site.

Always customized:

- Design look (palette, type, hero treatment)
- Couple names, date, venues, maps
- Color palette, fonts, and photography
- Copy: story, FAQ, attire, program, gift notes
- Guest list and invitation QRs
- Floor plan image and table positions
- Dinner menu
- Gift / e-wallet details
- Guest cap and RSVP deadline
- Reception access QR for the night

Optional extras:

- Entourage book
- Ambient audio
- Live photo wall on a venue screen
- Google Sheets export
- Bulk CSV invitation import
- Language (English, Filipino, or mixed)

---

## Suggested packages

Price these yourself. The packages describe **scope**, not a public rate card.

### Invitation
The public-facing site only: hero, countdown, events, story, gallery, details, attire, program, entourage book, FAQ, and a chosen design look. RSVP section can say “reply on your paper invite” or link to a form you already use.

**Best for:** couples who already have a guest process and want a beautiful site.

### Invitation + RSVP
Everything in Invitation, plus private QR RSVP, admin dashboard, seating, CSV export, and capacity tracking.

**Best for:** invitation-only weddings that need a real headcount.

### Full EverAfter Suite *(recommended)*
Invitation + RSVP, plus the reception night app (welcome, Team Bride/Groom, seats, floor, menu, live POV gallery, private notes, gifts), photo moderation, ZIP download, and optional venue photo wall.

**Best for:** couples who want the night to run itself after the QR is printed.

Add-ons (any package): extra gallery pages, extra languages, planner training, rehearsal QR reset, on-site wall laptop setup.

---

## How delivery works

Typical timeline (adjust per couple):

1. **Kickoff** — names, date, venues, guest cap, photos, palette, gift details
2. **Guest list** — spreadsheet of households and names for QR invitations
3. **Design pass** — invitation site on a private preview URL
4. **RSVP + admin** — invitations generated, QRs downloaded, dashboard walkthrough
5. **Reception pack** — menu, floor plan, gift details, venue QR, vote + gallery
6. **Launch** — printed QRs, RSVP deadline, night-of support notes

Hosting: PHP + MySQL on ordinary shared hosting / cPanel (GoDaddy and similar). No app-store install. Guests use the browser on their phones.

---

## What is included technically

For your own reference and for technical clients:

- Static invitation frontend (HTML/CSS/JS), customized per couple
- PHP API + MySQL (PostgreSQL supported as legacy)
- Admin dashboard (invitations, RSVP, seating, photos, reception)
- QR generation for each invitation and for venue access
- Reception SPA: lock screen, welcome, search, floor plan, menu, gallery upload (client-side compress + WebP), likes, private couple notes, gifts, Team Bride/Groom votes
- Live POV wall page for a venue screen
- Schema, setup, and GoDaddy-oriented deploy notes already in the product

---

## How to talk about it in a proposal

**Subject / title:** EverAfter Digital Wedding Suite — [Couple names]

**Opening:** We design and ship a private digital wedding system for [Couple]: a cinematic invitation site, QR-only RSVP, a dashboard for headcount and seating, and a reception app guests scan on the night to find their seat, vote Team Bride or Team Groom, see the menu, share photos, and send gifts.

**Close:** You receive a finished website and admin, printed-ready QRs, and a reception QR for the door. Guests never need an app. You never manage a spreadsheet during dinner.

---

## Demo

Open the interactive mockup from [`index.html`](index.html). Choose a design look (Sage Garden, Champagne Blush, Midnight Velvet, Terracotta Olive, or Ivory & Ink). It is static — no login, no database — so you can send the `mockup` folder to a client or walk through it on a call.
