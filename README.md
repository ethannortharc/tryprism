# TryPrism

A bilingual personality test platform supporting **Enneagram**, **MBTI**, and **Big Five / OCEAN** assessments. Built with React + TypeScript, featuring dark/light themes, PDF export, and full Chinese/English language support.

![TryPrism Hub](screenshots/hub.png)

## Features

- **Three personality frameworks** — Enneagram (9 types), MBTI (16 types), and Big Five / OCEAN (5 factors + 30 facets)
- **Quick & Full modes** — shorter assessments for quick results, or comprehensive tests for detailed insights
- **Bilingual** — complete Chinese and English support, switchable anytime
- **Dark/Light themes** — premium calm aesthetic with prismatic accent colors
- **Detailed results** — type descriptions, cognitive function stacks (MBTI), growth/stress arrows (Enneagram), factor/facet breakdowns (Big Five), and more
- **PDF export** — save your results as a beautifully formatted PDF document
- **History** — revisit past test results from all three frameworks
- **Fully static** — no backend, no database, no tracking. Your data stays in your browser.

### Big Five / OCEAN Results

![Big Five Results](screenshots/bigfive-results.png)

The Big Five results page includes:
- 5 OCEAN factor scores (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) with horizontal bars and Low/Average/High band labels
- Personalized descriptions for each factor based on your score band
- **Full mode (IPIP-NEO-120)**: 30 facet-level scores (6 per factor) in collapsible sections
- **Quick mode (IPIP-50)**: 5 factor scores for a faster assessment

![Big Five Results — Chinese](screenshots/bigfive-results-zh.png)

### MBTI Results

![MBTI Results — INFP](screenshots/mbti-results.png)

The MBTI results page includes:
- 4-letter type with preference strength bars across all four dichotomies (E/I, S/N, T/F, J/P)
- Cognitive function stack (dominant through inferior) with descriptions
- Comprehensive sections: overview, strengths, blind spots, growth areas, career paths, and communication style
- All content available in both English and Chinese

## Tech Stack

- **React 18** + **TypeScript 5.6**
- **Vite 6** for build and dev server
- **react-router-dom 7** for routing
- **jsPDF** + **html2canvas** for PDF export
- **Vitest** for unit testing, **Playwright** for E2E testing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run test:run` | Run unit tests (CI mode) |
| `npm run test:e2e` | Run E2E tests |

## Built with Ratchet

This project was implemented using [**Ratchet**](https://github.com/ethannortharc/ratchet), an intent-driven autonomous execution framework for AI agents (Claude Code plugin).

Ratchet transforms high-level intent ("add MBTI personality test") into a structured spec with verifiable constraints, then autonomously executes the implementation through work packages with a keep-best ratchet loop.

### How it went

- **Enneagram test** — the initial personality test was built entirely by Ratchet in one autonomous session. Only one manual fix was needed afterward: a PDF export issue with CJK font rendering.
- **MBTI test** — successfully implemented in a single Ratchet session with zero manual fixes. The autonomous pipeline (spec → environment prep → test generation → planning → execution → verification) delivered all 8 work packages, passing 134 unit tests and 117 E2E tests on completion.
- **Big Five / OCEAN test** — added using the IPIP-50 (quick) and IPIP-NEO-120 (full) public domain instruments. 5 work packages, 201 unit tests and 217 E2E tests. Includes 170 bilingual question items (50 + 120), 30 facet-level scoring, and psychometrically accurate descriptions.

## License

[Apache License 2.0](LICENSE)
