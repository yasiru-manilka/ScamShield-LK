# ScamShield LK

A browser-only scam warning and verification assistant for the SparkX ’26 student project. This is a complete implementation of the scoped web MVP, not a certified fraud detector.

## 1. Run on Windows (beginner guide)

1. Extract the ZIP to a folder, for example `Desktop\ScamShield-LK`.
2. Open that folder in VS Code (File > Open Folder).
3. Install Node.js 18 or later from https://nodejs.org/ if you do not already have it.
4. Open Terminal > New Terminal. Run `node -v` to check Node is available.
5. Run `npm run dev`. No `npm install` is needed: React 18.2.0 is already bundled locally.
6. In Chrome or Edge, open `http://localhost:5173`.
7. To stop the server, press Ctrl+C in the terminal.

You can also double-click `START_WINDOWS.bat` and open the printed address. Alternatively, open `index.html` directly in a modern browser that allows local script files; the local server is recommended. If port 5173 is already used, in Command Prompt run `set PORT=5174` then `npm run dev` and use the new address. The Node server serves static files only; it is not an analysis backend.

## 2. Using the application

- Choose Message or Website link. Paste one link or a message with personal information removed.
- Select Analyze. Review warning indicators, highlighted evidence and actual detected hostnames.
- Choose English or Sinhala explanations. The message engine also recognizes limited Singlish patterns.
- Use the scenario-specific checklist. Checkboxes help track your own verification steps; they do not certify a sender.
- Clear the content or navigate away to discard application state.
- Safety guide and Report a scam contain general guidance and official links. The site does not submit reports itself.
- Try the fictional examples in the select menu. They are not survey results or real cases.

## 3. Technology and source files

React.js 18.2.0, JavaScript, HTML, CSS, Regex, JSON dictionaries and the browser URL API. No database, authentication, paid API, AI model or backend needed. The interface uses a dark charcoal security workspace with green controls and separate warning colors. React's `createElement` syntax avoids a transpiler or JSX build dependency.

```
index.html                  HTML shell and content-security policy
src/app.js                  React components and UI state
src/engine.js               Pure text and URL detection functions
src/guidance.js             English/Sinhala guidance and fictional examples
src/styles.css              Responsive layout and styling
data/rules.json             Editable multilingual patterns and explanations
data/rules.generated.js     Browser-readable version of JSON (generated)
vendor/react-runtime.js     Bundled React, ReactDOM and Scheduler
vendor/LICENSES.txt         Third-party MIT license notices
scripts/server.cjs          Dependency-free development server
scripts/generate-data.cjs   Regenerate browser rule data
scripts/build.cjs           Produce static dist/ folder
tests/engine.test.cjs       Node unit tests
tests/browser-test.py       Optional Playwright UI smoke test
vercel.json                 Static deployment settings
docs/                       Test outputs, design and implementation notes
```

### Edit detection rules

Open `data/rules.json`. Each rule includes a unique `id`, English/Sinhala titles and explanations, a weight and an array of JavaScript regular expression strings. Add or edit carefully (escape backslashes in JSON). Run `npm run generate:rules`, then refresh the browser. Run `npm test` after every change.

### How the analysis works

The engine trims and normalizes Unicode, removes some invisible characters, matches the rule dictionary and checks URL structure without opening the link. It counts each category once. A heuristic sum >= 5 shows multiple or strong warning signs, 1–4 shows warning signs, and zero shows no matching signs. These thresholds are design choices, not statistical probabilities. The result includes text spans for highlighting, parsed hostnames and a context-specific checklist. It can miss novel or obfuscated scams or flag legitimate requests. The language selection applies to explanations and guidance rather than translating the entire UI.

## 4. Testing

Run `npm test` (Node built-in test runner). The recorded run has 34 passing unit tests. The optional Python Playwright smoke test checks the actual React UI in headless Chromium; see `docs/browser-test-results.txt`. The authoring environment blocked navigation to file and localhost pages, so the UI test loaded the local files directly into an isolated page. It does not test production HTTP/CSP or external destinations end to end. No uncaught JS errors or network requests were observed during those isolated checks. To run that optional test, install Python Playwright and Chromium (`pip install playwright`, `python -m playwright install chromium`), then run `python tests/browser-test.py`.

## 5. GitHub and Vercel

Use GitHub to share the source with your group. Create a repository, then run the following from this folder (replace YOUR-REPOSITORY with your real URL):

```
git init
git add .
git commit -m "Initial ScamShield LK MVP"
git branch -M main
git remote add origin YOUR-REPOSITORY
git push -u origin main
```

Run `npm run build` to generate `dist/`. On Vercel, import the repository, choose Other as the framework, set build command `npm run build` and output directory `dist` (also set in `vercel.json`). No environment variables required. Deployment was not performed from this environment. Review React dependencies and privacy configuration before publishing publicly. The bundled runtime is React 18.2.0 from the local Jupyter distribution; no claim is made that it is the newest release. Its license is included. For a future maintained production release, migrate the source to a current supported React package and rebuild/test.

## 6. Scope and honest limitations

Implemented: message and URL analysis, local language pattern checks, English/Sinhala findings, evidence highlighting, contextual checklist, reporting links, privacy reset, examples and mobile layout. No screenshots/OCR, Tamil analysis, live threat intelligence, shared reports, ML or automated SMS monitoring; these are deferred in the proposal. No real-user testing or detection accuracy claims have been made. Rules are not a substitute for independent verification. The proposal's synthetic survey must not be submitted as real primary research.

AI use: ChatGPT assisted with code implementation, design research and initial tests. Team members should review, understand and test the code, and update the competition's AI disclosure to reflect actual use.
