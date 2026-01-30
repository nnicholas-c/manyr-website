# Manyr Website - Copilot Instructions

## Project Overview

This is the marketing and demo website for **Manyr** (Agent Firewall), built with:

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion**

## Design System

### Typography
- **Headings**: Fraunces (serif, light weight)
- **Body**: Inter (sans-serif)

### Colors
- Background: `#F6F3EE` (warm off-white)
- Text: `#1C1C1C` (charcoal)
- Muted text: `#4A4A4A`
- Accents: cream (`#F5EFE0`), pale yellow (`#FDF6E3`), lavender (`#EDE8F5`), sage (`#E8EDE5`), warm gray (`#E8E4DE`)

### Visual Style
- Editorial, minimal, premium feel
- Large whitespace, calm hierarchy
- Section numbering (001/, 002/, etc.)
- Blurred ellipse backgrounds
- Arrow bullets (→)

## Project Structure

```
src/
├── app/             # Pages (homepage, /demo, /docs, /contact)
├── components/      # Reusable UI components
│   ├── home/        # Homepage section components
│   └── *.tsx        # Core components (Button, Card, Navigation, etc.)
```

## Key Components

- `BlurredEllipses` - Parallax background ellipses
- `Navigation` - Sticky nav with full-screen menu overlay
- `Section` - Numbered content sections
- `DecisionChip` - Allow/Deny/Approve/Constrain indicators
- `ToggleSwitch` - Policy toggle controls

## Development

```bash
npm install    # Install dependencies
npm run dev    # Start dev server at http://localhost:3000
npm run build  # Production build
```

## Guidelines

- Keep the editorial, calm aesthetic
- Use Framer Motion for subtle animations
- Maintain mobile-first responsive design
- Follow accessibility best practices (ARIA, keyboard nav, contrast)
