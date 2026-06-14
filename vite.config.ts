import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const API_TARGET =
  process.env.VITE_API_PROXY_TARGET ??
  'http://10.201.234.135:8889/lucky-cup/api/v1/prize'

const devCsp =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: blob:; " +
  "connect-src 'self' ws: wss: http: https:;"

const prodCsp =
  "default-src 'self'; " +
  "script-src 'self'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: blob:; " +
  "connect-src 'self' http: https:;"

function cspMetaTag(policy: string): string {
  return `<meta http-equiv="Content-Security-Policy" content="${policy}" />`
}

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'csp-meta',
      transformIndexHtml(html) {
        const policy = command === 'serve' ? devCsp : prodCsp
        return html.replace('<head>', `<head>\n    ${cspMetaTag(policy)}`)
      },
    },
  ],
  server: {
    headers: {
      'Content-Security-Policy': devCsp,
    },
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
  preview: {
    headers: {
      'Content-Security-Policy': prodCsp,
    },
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
}))
