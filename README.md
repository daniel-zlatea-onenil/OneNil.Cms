# OneNil CMS Admin Portal

A minimal Next.js login portal for the OneNil CMS admin interface.

## Quick Start

### Install dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Login page (client component)
└── lib/
    ├── types.ts         # TypeScript interfaces
    └── utils.tsx        # Utility functions
```

## Features

- **Login Form**: Email/password authentication form
- **Responsive Design**: Mobile-friendly with Tailwind CSS
- **Dark Theme**: Slate-colored admin interface
- **Error Handling**: User feedback for login failures
- **TypeScript**: Full type safety

## Next Steps

1. **Implement Authentication**: Replace the mock login in `src/app/page.tsx` with actual API calls
2. **Create Dashboard**: Add a protected `/dashboard` route after authentication
3. **Add Admin Features**: Build out content management interfaces
4. **Set Up Database**: Connect to your preferred database for user management
5. **Environment Variables**: Add `.env.local` for API endpoints and secrets

## Environment Variables

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19 with Tailwind CSS
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
