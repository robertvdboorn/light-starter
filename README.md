# Uniform Next.js Starter

A clean Next.js starter integrated with [Uniform](https://uniform.app) for visual page building. Demonstrates modern patterns with documented components — useful for learning, prototyping, or as a base for production sites.

## Features

- **Uniform Canvas** — visual drag-and-drop page composition with inline editing
- **Component patterns** — reusable pre-configured component trees with data loops
- **Content types** — structured Article, Author, and FAQ entries
- **Personalization** — device-type quirk for viewport-based visibility rules
- **Responsive design** — mobile-first Tailwind CSS with custom brand tokens
- **Asset optimization** — automatic image resizing and focal point cropping
- **Component playground** — isolated per-component preview with breakpoint controls
- **TypeScript** — fully typed components and Uniform SDK integration

## Architecture

```
┌─────────────────┐
│     Header      │ ← navigationLinks slot (NavigationLink pattern)
├─────────────────┤
│                 │
│      Body       │ ← any registered body components
│                 │
├─────────────────┤
│     Footer      │ ← footerLinks slot + copyrightText
└─────────────────┘
```

All URLs are resolved by the catch-all route `src/pages/[[...slug]].tsx` via `withUniformGetServerSideProps` — no new route files needed for content pages.

## Components

### Layout
| Component | Description |
|---|---|
| `Header` | Sticky nav with hamburger menu, `navigationLinks` slot |
| `Footer` | `footerLinks` slot + editable copyright |
| `NavigationLink` | Desktop/mobile-aware link, auto-closes mobile menu |
| `FooterNavLink` | Minimal text link for footer |

### Content
| Component | Description |
|---|---|
| `Section` | 6-variant block: hero, content, feature, testimonial, callout, minimal |
| `Text` | Plain text paragraph, centered |
| `RichText` | Full rich-text with custom heading/list/quote/image renderers |
| `CTA` | Linked button, primary or secondary style |
| `FAQSection` | Two-column accordion section, Canvas auto-expand on item select |
| `FAQItem` | Single accordion row (question + answer) |

### Cards
| Component | Description |
|---|---|
| `CardGrid` | Responsive 1→2→3 col grid, `cards` slot |
| `Card` | Text card with title, body, CTA slot |
| `ImageFeature` | Icon-sized image + title + description card |

### Media
| Component | Description |
|---|---|
| `Image` | Standalone image with title and caption |
| `ImageHero` | Full-bleed background-image hero with overlay |
| `Video` | Native `<video>` player in 16:9 frame |

### Article
| Component | Description |
|---|---|
| `ArticleHeader` | Title, excerpt, category badge, metadata, featured image |
| `ArticleContent` | Rich-text article body with prose typography |
| `ArticleTags` | Badge list, hidden when no tags |
| `ArticleAuthor` | Avatar, bio, social links |

## Getting Started

### Prerequisites
- Node.js 18+
- A Uniform account and project — [uniform.app](https://uniform.app)

### Setup

1. **Clone and install:**
```bash
git clone <repository-url>
cd light-starter
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
```
Fill in your Uniform credentials:
```env
UNIFORM_API_KEY=your_api_key
UNIFORM_PROJECT_ID=your_project_id
UNIFORM_PREVIEW_SECRET=your_preview_secret
```

3. **Push all definitions and content to Uniform:**
```bash
npx uniform sync push
```
This pushes components, content types, data types, patterns, compositions, and entries defined under `uniform-data/`.

4. **Start the dev server:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

5. **Component playground:**
[http://localhost:3000/uniform-playground](http://localhost:3000/uniform-playground) — preview any component in isolation with breakpoint controls.

## Commands

```bash
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint

npx uniform sync push    # Push local uniform-data/ to Uniform
npx uniform sync pull    # Pull latest from Uniform to local
```

## Project Structure

```
src/
├── components/
│   ├── article/         # ArticleHeader, ArticleContent, ArticleTags, ArticleAuthor
│   ├── cards/           # Card, CardGrid
│   ├── content/         # Section, Text, RichText, CTA, FAQItem, FAQSection
│   ├── layout/          # Header, Footer, NavigationLink, FooterNavLink
│   ├── media/           # Image, ImageFeature, ImageHero, Video
│   ├── page/            # Page composition renderer
│   ├── playground/      # ResizablePlaygroundDecorator
│   └── ui/              # shadcn/ui primitives (Button, Card, Badge, …)
├── contexts/            # MobileMenuContext
├── hooks/               # useSetViewportQuirk (device-type personalization)
├── lib/                 # richTextRenderers, utils (cn)
├── pages/               # [[...slug]].tsx, _app.tsx, api/preview.ts, 404.tsx
├── styles/              # globals.css (CSS variables, Tailwind theme)
├── uniformContext/      # Uniform Context setup (personalization, A/B)
└── utilities/           # Canvas client factories
uniform-data/            # Uniform project definitions (synced via CLI)
├── component/           # Component definitions
├── componentPattern/    # Reusable component patterns (Header, Footer, FAQ, Articles)
├── composition/         # Page compositions (Home, Articles, Article, Images)
├── contentType/         # Article, Author, FAQ
├── dataType/            # uniformArticlesQuery, articleBySlug, uniformFaqQuery
└── entry/               # Content entries (articles, authors, FAQ items)
```

## Uniform Integration

### Visual Editing
Components are registered with `registerUniformComponent` and use `UniformText`, `UniformRichText`, and `UniformSlot` for inline editing in Canvas.

### Component Patterns
Pre-configured, reusable component trees stored in `uniform-data/componentPattern/`. Changes propagate to all compositions using the pattern. Includes: Header, Footer, Articles Grid, FAQ Section.

### Data Loops
The `$loop` system component iterates over a data resource and renders a child component per entry. Used in the Articles Grid and FAQ Section patterns to drive content from Uniform Content entries.

### Content Types
| Type | Fields |
|---|---|
| `Article` | title, excerpt, content, featuredImage, author, category, tags, publishedDate |
| `Author` | name, bio, avatar, twitter, linkedin, website |
| `FAQ` | question, answer |

### Personalization
`useSetViewportQuirk` sets a `deviceType` quirk (`m`/`t`/`d`) based on viewport width, enabling device-specific visibility rules in Canvas without JavaScript frameworks.

## Customizing Brand Colors

Edit three CSS variables in `src/styles/globals.css`:

```css
--accent-hue: 0;           /* 0–360 */
--accent-saturation: 0%;
--accent-lightness: 10%;
```

The primary button color is controlled separately by `--ui-primary`.

## Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```
Set `UNIFORM_API_KEY`, `UNIFORM_PROJECT_ID`, and `UNIFORM_PREVIEW_SECRET` in the Vercel dashboard.

### Other platforms
Any Node.js host works: Netlify, AWS Amplify, Railway, DigitalOcean App Platform.

## Resources

- [Uniform Documentation](https://docs.uniform.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com)
- [shadcn/ui](https://ui.shadcn.com)

---

Built with Next.js, Uniform, and Tailwind CSS.
