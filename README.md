# Globe

Simple WebGL/Three-style globe project.

## Overview

This project contains a minimal globe demo served via the static `index.html` in the repository root. Textures used by the globe are stored in the `Textures/` folder.

## Quick Start

- Open [index.html](index.html) in a web browser (double-click or drag into a browser window).
- For local testing with CORS-sensitive texture loading, serve the folder with a static server (example using Python 3):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## File Structure

- [index.html](index.html) — main demo page
- Textures/ — texture image assets used by the globe

## Notes

- If the globe uses external libraries (e.g., Three.js), ensure those libraries are available or served locally. If you want, I can add a minimal `package.json` and install dependencies.
- If you plan to deploy, prefer serving via HTTPS to avoid mixed-content issues when loading remote resources.

## Next steps I can help with

- Add usage examples and API notes
- Add a `docs/` folder with screenshots and explanations
- Create a development `package.json` and npm scripts

---
If you'd like more detailed documentation (API, architecture, or deployment), tell me which areas to expand.
