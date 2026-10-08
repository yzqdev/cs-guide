# Contribution Guide

We always welcome contributions!

## Prerequisites

Node.js 24 or later, and pnpm via corepack:

```bash
corepack prepare pnpm@latest --activate
```

## Clone and Install

```bash
git clone git@github.com:yzqdev/cs-guide.git
cd cs-guide
pnpm install
```

## Project Structure

```text
.github/   GitHub Actions workflows (GitHub Pages deployment)
docs/      All site content, plus the VuePress config under docs/.vuepress/
res/       Images referenced by README.md
dist/      Build output (gitignored, not committed)
```

There is no `plugins/` directory. Theme plugins come from npm dependencies and are switched on in
`docs/.vuepress/themeConfig.ts`. Custom components live in `docs/.vuepress/components/` and are
registered in `docs/.vuepress/client.ts`, then usable as plain tags in any Markdown file.

## Development

```bash
pnpm docs:dev      # dev server
pnpm docs:build    # build to dist/
```

The dev server serves the site at http://localhost:8989/cs-guide/ — note the `/cs-guide/` prefix,
which comes from `base` in `docs/.vuepress/config.ts`. Don't change that value: the site is deployed
to a GitHub Pages subdirectory, so `base: '/'` builds fine but breaks every asset online.

There is no test suite. Verify changes by starting the dev server and checking the page, or by
running a full build.

## Writing Documentation

- One Markdown file per page. A section's entry page is always `README.md`.
- Section and file names are lowercase with hyphens.
- `docs/.vuepress/sidebar.ts` uses `structure` mode for 14 sections, so new files show up in the
  sidebar automatically. `/android-tutor/` is the one exception: it uses an explicit child list,
  so new pages there also need an entry in `sidebar.ts`.
- Add a new top-level section in both `navbar.ts` and `sidebar.ts`.
- Custom styles go in `docs/.vuepress/styles/index.scss`. Other files in `styles/` are not loaded.
- Code highlighting uses Prism.js, configured under `markdown.highlighter` in `themeConfig.ts`.

## A note on `pnpm lint`

`pnpm lint` runs `prettier --write docs` and rewrites the entire `docs/` tree. Most existing files
do not match Prettier 3 defaults — line endings, two-space hard breaks inside lists, and table
column alignment all get changed — so it produces a diff covering most of the repository, including
rendering-visible changes. Only run it when you deliberately want a full reformat.

## Commit Messages

There is no strict rule, do what you like. Recent examples:

```text
docs: go routine
docs: 添加序号
docs: autohotkey
```

## License

Contributions are provided under the MIT License.
