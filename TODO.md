# TODO List for Fixing Build Errors

- [x] Edit `src/index.css` to add `--color-border: hsl(var(--border));` in the `@theme inline` block to resolve the unknown utility class `border-border`.
- [x] Edit `src/components/ui/badge.tsx` to remove `forwardRef` from the import statement to fix the unused import error.
- [x] Create `src/vite-env.d.ts` with `declare module '*.css';` to resolve the TypeScript module not found error for CSS imports.
- [x] Run `npm run build` to verify that all errors are fixed.
