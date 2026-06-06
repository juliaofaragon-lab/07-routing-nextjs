# NoteHub Routing

A notes application built with Next.js App Router, TypeScript, TanStack Query,
Axios, and CSS Modules. This version adds tag filtering with parallel and
catch-all routes, intercepted note previews, and a custom not-found page.

## Setup

1. Install dependencies with `npm install`.
2. Create `.env.local` and add:

   ```env
   NEXT_PUBLIC_NOTEHUB_TOKEN=your_notehub_token
   ```

3. Add the same variable in Vercel project settings for Production, Preview,
   and Development environments.
4. Start the development server with `npm run dev`.

## Routes

- `/` - application overview
- `/notes` - redirects to the complete notes list
- `/notes/filter/all` - all notes
- `/notes/filter/[tag]` - notes filtered by tag
- `/notes/[id]` - full details on direct navigation
- `/notes/[id]` - modal preview when opened from a notes list
