import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**', 'tests/inv-02/**', 'tests/inv-03/**', 'tests/inv-08/**',
              'tests/inv-09/**', 'tests/inv-10/**', 'tests/inv-12/**', 'tests/inv-13/**',
              'tests/inv-14/**'],
  },
})
