Development:

# For local development with auto-reload
pnpm velite:dev  # Runs Velite in watch mode in one terminal
pnpm dev         # Runs Next.js dev server in another terminal

# OR for manual rebuilds
pnpm velite      # Build docs once
pnpm dev         # Start dev server

Production Build:

pnpm clean       # Clean previous builds (optional)
pnpm velite      # Build latest docs from MDX
pnpm build       # Build Next.js app
pnpm start       # Start production server (or deploy)

Quick Preview:
pnpm preview     # Builds everything and starts production server

Git Workflow with Your Build Process

# On dev branch
pnpm velite
pnpm build
# Test locally with pnpm start
git add .
git commit -m "feat: add new content"
git push origin dev

# When ready for production
git checkout main
git merge dev
git push origin main  # Vercel auto-deploys with your velite build step