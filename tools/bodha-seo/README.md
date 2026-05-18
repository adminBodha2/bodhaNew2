# Bodha SEO Optimizer

Local, read-only-first SEO and AI discoverability analyzer for Bodha.

Run from the Bodha repo root:

```bash
npm run seo:audit
npm run seo:audit -- --live --limit 25
npm run seo:page -- /core/indian-knowledge-systems
npm run seo:topic -- hindu-temple
```

The direct Node commands also work:

```bash
node tools/bodha-seo/src/cli.mjs audit
node tools/bodha-seo/src/cli.mjs audit --live --limit 25
node tools/bodha-seo/src/cli.mjs page /core/indian-knowledge-systems
node tools/bodha-seo/src/cli.mjs topic hindu-temple
```

Reports are written to:

```text
reports/seo/
```

Default commands do not edit code. Patch/apply behavior will be added only after the audit engine is useful and reviewable.
