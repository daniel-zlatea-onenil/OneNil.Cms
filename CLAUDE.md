# OneNil FC CMS

## Build & Development Commands

```bash
npm run dev      # Start development server (Next.js with Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## Architecture

- **Framework**: Next.js 15.3.8 with App Router and React 19
- **Styling**: Tailwind CSS 4 with custom design system (glassmorphism, gradients)
- **CMS**: Contentful for content management
- **Language**: TypeScript with strict mode

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── components/         # React Server Components
│   ├── articles/           # Articles listing page
│   ├── fixtures/           # Fixtures page
│   ├── league-table/       # League table page
│   ├── results/            # Results page
│   ├── team/               # Team page
│   └── page.tsx            # Homepage
├── lib/
│   ├── contentful.ts       # Contentful client configuration
│   ├── contentHelper.tsx   # Data fetching functions (getLatestArticles, getPlayers, etc.)
│   ├── serverUtils.ts      # Server-side utilities (getLastSeason, getAllTeamLogos, etc.)
│   └── types.ts            # TypeScript type definitions
```

## Key Patterns

### Data Fetching
- All data fetching uses React Server Components with Contentful
- Functions in `src/lib/contentHelper.tsx` and `src/lib/serverUtils.ts`
- ISR with 60-second revalidation on pages

### Styling
- Custom CSS variables in `globals.css` for design tokens
- Glassmorphism utility classes: `.glass`, `.glass-dark`, `.glass-light`
- Gradient backgrounds defined in `tailwind.config.ts`
- React Icons for all icons (no emojis)

### Component Structure
- Server Components by default (async components)
- Client Components marked with `'use client'` only when needed
- Components in `src/app/components/` are reusable across pages

## Environment Variables

Required in `.env.local`:
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## Contentful Content Types

- `article` - News articles with title, slug, summary, publishDate, coverImage
- `player` - Players with name, position, squadNumber, bio, photo
- `team` - Teams with name, slug, logo, isTheTeamWeSupport
- `season` - Seasons with leagueTable, fixtures, results
- `fixture` - Match fixtures with home/away teams, date, venue
- `result` - Match results with scores
