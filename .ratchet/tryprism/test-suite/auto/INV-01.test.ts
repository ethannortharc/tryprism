/**
 * INV-01: App builds successfully with zero errors and zero warnings
 *
 * Verifier: auto (Vitest)
 * Claim: TypeScript compiles with strict mode, zero errors; build output generates valid static assets;
 *        key modules can be imported without runtime errors.
 *
 * These tests FAIL until the implementation exists and compiles cleanly.
 *
 * Note: execSync calls below use only static string literals — no user input is interpolated,
 * so command injection is not a concern. The commands are equivalent to running them in a terminal.
 */

import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// Workspace root is four levels above this test file:
// .ratchet/tryprism/test-suite/auto/ → ../../../.. = workspace root
const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const DIST_DIR = path.join(WORKSPACE_ROOT, 'dist');

// ---------------------------------------------------------------------------
// Level 1 — Static / build checks
// ---------------------------------------------------------------------------

describe('INV-01 — TypeScript strict mode produces zero errors', () => {
  it('tsc --noEmit exits with code 0', () => {
    let stdout = '';
    try {
      // execFileSync avoids shell interpolation — args are passed as array
      stdout = execFileSync('npx', ['tsc', '--noEmit'], {
        cwd: WORKSPACE_ROOT,
        encoding: 'utf8',
      });
    } catch (err: any) {
      throw new Error(
        `TypeScript compilation failed:\n${err.stdout ?? ''}\n${err.stderr ?? ''}`
      );
    }
    // tsc with --noEmit produces no stdout on success
    expect(stdout.trim()).toBe('');
  });
});

describe('INV-01 — npm run build produces valid static assets', () => {
  it('build command exits with code 0', () => {
    try {
      execFileSync('npm', ['run', 'build'], {
        cwd: WORKSPACE_ROOT,
        encoding: 'utf8',
        timeout: 120_000,
      });
    } catch (err: any) {
      throw new Error(
        `Build failed:\n${err.stdout ?? ''}\n${err.stderr ?? ''}`
      );
    }
  });

  it('dist/ directory is created after build', () => {
    expect(fs.existsSync(DIST_DIR)).toBe(true);
  });

  it('dist/index.html exists', () => {
    expect(fs.existsSync(path.join(DIST_DIR, 'index.html'))).toBe(true);
  });

  it('dist/assets/ contains at least one JavaScript bundle', () => {
    const assetsDir = path.join(DIST_DIR, 'assets');
    expect(fs.existsSync(assetsDir)).toBe(true);
    const jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
    expect(jsFiles.length, 'No .js bundles found in dist/assets/').toBeGreaterThan(0);
  });

  it('dist/assets/ contains at least one CSS file', () => {
    const assetsDir = path.join(DIST_DIR, 'assets');
    const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
    expect(cssFiles.length, 'No .css files found in dist/assets/').toBeGreaterThan(0);
  });

  it('index.html references the built JS bundle', () => {
    const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    expect(html).toMatch(/<script[^>]+src="[^"]*\.js"/);
  });
});

// ---------------------------------------------------------------------------
// Level 2 — Module import smoke tests
// ---------------------------------------------------------------------------

describe('INV-01 — Key modules import without runtime errors', () => {
  it('scoring module imports cleanly', async () => {
    const mod = await import('../../../../src/lib/scoring').catch((e: Error) => {
      throw new Error(`scoring module failed to import: ${e.message}`);
    });
    expect(mod).toBeDefined();
  });

  it('i18n module imports cleanly', async () => {
    const mod = await import('../../../../src/lib/i18n').catch((e: Error) => {
      throw new Error(`i18n module failed to import: ${e.message}`);
    });
    expect(mod).toBeDefined();
  });

  it('questions data module imports cleanly', async () => {
    const mod = await import('../../../../src/data/questions').catch((e: Error) => {
      throw new Error(`questions module failed to import: ${e.message}`);
    });
    expect(mod).toBeDefined();
  });

  it('localStorage utility module imports cleanly', async () => {
    const mod = await import('../../../../src/lib/storage').catch((e: Error) => {
      throw new Error(`storage module failed to import: ${e.message}`);
    });
    expect(mod).toBeDefined();
  });
});
