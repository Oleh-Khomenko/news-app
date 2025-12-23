# How to Start

This project uses json-server as a mock API server.

**Option 1:** Start both the app and server together:
```bash
npm run dev
```

**Option 2:** Start them separately:
```bash
# Start the mock API server
npm run dev:api

# Start the Vite dev server
npm run vite
```

## Lighthouse Metrics

To check Lighthouse performance metrics, use:
```bash
npm run fresh-preview
```

This builds the project from scratch and starts a preview server for accurate performance testing.

## State Management Decision: TanStack Query over Pinia

### Why TanStack Query?

While the requirements mentioned Pinia, this project uses **TanStack Vue Query** exclusively. Here's why:

This app has **100% server state** and **0% client state**:
- All data comes from the API (news list, news details)
- No user preferences, theme settings, or authentication
- No data needs to persist across unmounting