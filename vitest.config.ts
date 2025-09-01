import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: [
        'src/lib/api/response.ts',
        'src/lib/csrf.ts',
        'src/lib/flash.ts',
        'src/lib/ui/toast.ts',
        'src/lib/controllers/**/*.ts',
        'src/routes/api/**/+server.ts'
      ],
      exclude: [
        'src/lib/components/**/*',
        'src/routes/**/+page.*',
        'src/routes/**/+layout.*',
        'src/**/*.svelte',
        'node_modules/**',
        'test/**'
      ],
      thresholds: {
        lines: 80,
        functions: 75,
        branches: 70,
        statements: 80
      }
    }
  },
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  }
});
