# Nexus Main

Standalone web and Android entry for the Nexus finance and personal workspace. This is an extracted snapshot from the Nexus monorepo; the original repository remains the source of truth during the migration.

## Development

```bash
npm install
npm run dev
npm run build
```

Environment variables are intentionally not copied. Create a local `.env.local` from the deployment configuration before enabling Supabase-backed features.
