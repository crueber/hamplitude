import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import { siteConfig } from './site.config.ts'

export default defineConfig(({ command, isPreview }) => {
  const site = siteConfig()
  return {
    // Real URLs (no hash), so the base must be absolute. Dev always serves from '/'.
    base: command === 'build' || isPreview ? site.base : '/',
    define: { __SITE_URL__: JSON.stringify(site.url) },
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    plugins: [
      { enforce: 'pre', ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      }) },
      react({ include: /\.(mdx|tsx?|jsx?)$/ }),
    ],
  }
})
