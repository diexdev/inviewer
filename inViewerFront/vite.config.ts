import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// @ts-expect-error to compile the program
import eslintPlugin from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      cache: false // evita que use resultados guardados y se salten errores
    })
  ],
})
