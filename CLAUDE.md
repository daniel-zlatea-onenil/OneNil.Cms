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

## Development Server Management

**Important**: This is a Next.js project that runs a dev server.

### Before making code changes:
1. The dev server may be running - be aware that file changes can cause build conflicts
2. If build errors occur (ENOENT in .next folder), instruct the user to:
   - Stop the dev server (Ctrl+C)
   - Run: `rm -rf .next`
   - Restart: `npm run dev`

### After completing changes:
- Remind the user to restart the dev server if it was stopped
- Suggest testing the changes with `npm run dev`

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

## Branch Naming Convention

When implementing new features or fixes:

1. **Always create a new branch** - Never work directly on main/master
2. **Use this naming format**: `feature/ONENIL-{ticket-number}-{brief-description}`
    - Example: `feature/ONENIL-1-improve-header-brightness`
    - Use lowercase for the description
    - Use hyphens to separate words
    - Keep descriptions brief but descriptive

3. **Before starting work**:
    - Extract or ask for the ticket number from the feature request
    - Create a branch with the proper naming convention
    - Confirm the branch name before proceeding

4. **Branch creation workflow**:
```bash
   git checkout -b feature/ONENIL-{ticket-number}-{description}
```

## GitHub Issues

Tickets are tracked using GitHub Issues: https://github.com/daniel-zlatea-onenil/OneNil.Cms/issues

### Labels
- `feature` - New feature or enhancement
- `bug` - Something isn't working
- `ui` - User interface changes
- `in-progress` - Currently being worked on
- `ready-for-review` - PR ready for review

### Issue Commands
```bash
gh issue list                           # List open issues
gh issue view {number}                  # View issue details
gh issue create --title "..." --body "..." --label feature  # Create issue
gh issue close {number}                 # Close issue
```

## Feature Implementation Process

When given a feature request:
1. Check if a GitHub Issue exists, or create one: `gh issue create`
2. Note the issue number (e.g., #15 becomes ONENIL-15)
3. Create branch: `feature/ONENIL-{issue-number}-{description}`
4. Implement the feature
5. Commit changes with descriptive messages
6. Push and create PR linking to the issue
7. Do not merge the pull request.

## Feature Implementation Workflow with Agents

For complex features, use specialized agents in the following workflow:

### 1. Feature Analysis (feature-analyzer)
**When**: Before starting implementation
**Purpose**: Analyze feature requirements, identify gaps, and generate acceptance criteria

```
"Use feature-analyzer to analyze the [feature name] feature for completeness and generate acceptance criteria"
```

### 2. Implementation (react-feature-implementer)
**When**: After requirements are clear and acceptance criteria defined
**Purpose**: Implement React components, hooks, and functionality

```
"Use react-feature-implementer to build [feature description]"
```

### 3. Testing (feature-branch-tester)
**When**: After PR is created and Vercel preview is deployed
**Purpose**: Validate against acceptance criteria and run smoke tests

```
"Use feature-branch-tester to test PR #[number] on the Vercel preview"
```

### 4. UX Review (ux-ui-analyst)
**When**: Periodically after features are merged (not during active development)
**Purpose**: Analyze UI changes and create improvement issues

```
"Use ux-ui-analyst to review recent UI changes and create improvement issues"
```

### Example Complete Workflow

```
User: "I want to add a user profile page with avatar upload"

Step 1: "Use feature-analyzer to analyze the user profile feature"
        → Outputs: requirements, edge cases, acceptance criteria

Step 2: "Use react-feature-implementer to build the profile page with avatar upload"
        → Outputs: implemented components, PR created

Step 3: "Use feature-branch-tester to test PR #42 on preview"
        → Outputs: test results, any issues found

Step 4 (later): "Use ux-ui-analyst to review recent UI changes"
        → Outputs: GitHub issues for UI improvements
```

### Agent Selection Guide

| Task | Agent | Trigger |
|------|-------|---------|
| Understand requirements | feature-analyzer | New feature request |
| Build React UI | react-feature-implementer | Clear requirements exist |
| Test on preview | feature-branch-tester | PR + Vercel deploy ready |
| Review UI quality | ux-ui-analyst | After sprint/batch of features |
