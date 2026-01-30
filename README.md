# Manyr — Agent Firewall

A production-quality marketing and demo website for Manyr, a governance layer for autonomous AI agents. Built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion.

## Overview

Manyr is an "Agent Firewall" that intercepts agent actions at the execution boundary, evaluates them against configurable policies, and produces audit trails for compliance and incident review.

This website showcases:
- **Vision & Product**: The narrative around AI moving from "assist" → "act" → "autonomy"
- **Interactive Policy Playground**: A live demo simulating firewall allow/deny/approve decisions
- **Technical Documentation**: How the system works (action normalization, policy evaluation, audit trails)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Fonts**: Fraunces (serif headings) + Inter (body text)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/manyr-website.git
cd manyr-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Site Structure

```
/                 # Homepage - scroll narrative with 7 numbered sections
/demo             # Interactive Policy Playground
/docs             # Technical documentation & privacy information
/contact          # Contact form page
```

### Homepage Sections

1. **Hero** — "From assistants to autonomy."
2. **001/ About** — What Manyr is (governance layer, Select function)
3. **002/ Mission** — Make autonomy deployable
4. **003/ The Product** — Observe → Decide → Enforce + Record
5. **004/ Demo Preview** — Teaser of the Policy Playground
6. **005/ Trust & Privacy** — Control plane, not data hoarder
7. **006/ Use Cases** — DevOps, Security, IT, R&D, Data, Admin
8. **007/ Contact** — Request a pilot

### Policy Playground (/demo)

Interactive 3-column interface:
- **Agent Action**: Select agent type, tool, and describe the proposed action
- **Policy**: Toggle policy rules and adjust risk tolerance
- **Decision + Audit Log**: View decisions (Allow/Deny/Approve/Constrain) and audit trail

Features:
- Real-time policy evaluation simulation
- Approval modal for high-risk actions
- Export audit logs as JSON

## Design System

### Colors

- Background: `#F6F3EE` (warm off-white)
- Text: `#1C1C1C` (charcoal)
- Muted text: `#4A4A4A`
- Accents: cream, pale yellow, lavender, sage, warm gray

### Typography

- Headings: Fraunces (serif, light weight)
- Body: Inter (sans-serif, 400-500 weight)

### Visual Elements

- Blurred ellipse backgrounds (CSS gradients + filter blur)
- Section numbering (001/, 002/, etc.)
- Arrow bullets (→)
- Soft cards with subtle borders and shadows

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles and design tokens
│   ├── layout.tsx        # Root layout with nav + footer
│   ├── page.tsx          # Homepage
│   ├── demo/
│   │   └── page.tsx      # Policy Playground
│   ├── docs/
│   │   └── page.tsx      # Documentation
│   └── contact/
│       └── page.tsx      # Contact form
├── components/
│   ├── BlurredEllipses.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── DecisionChip.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── Section.tsx
│   ├── ToggleSwitch.tsx
│   ├── index.ts
│   └── home/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Mission.tsx
│       ├── Product.tsx
│       ├── DemoPreview.tsx
│       ├── Trust.tsx
│       ├── UseCases.tsx
│       ├── Contact.tsx
│       └── index.ts
```

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Color contrast compliant

## License

MIT

---

Built with care for the autonomous future.
