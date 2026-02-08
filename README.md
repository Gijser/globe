
# Globe: 3D EONET Event Visualizer

This project is an interactive 3D globe built with Three.js that visualizes recent NASA EONET (Earth Observatory Natural Event Tracker) events as markers on the globe.

## Features

- 3D globe with realistic textures (8K day map, normal/specular maps)
- Loads and displays the 20 most recent EONET events as interactive markers
- Clickable event markers open the event's NASA EONET page
- Hovering a marker shows the event title in a floating HUD
- Responsive design and smooth camera controls
- Modern ES module code structure

## Quick Start

1. **Install dependencies (for testing only):**
	 ```bash
	 npm install
	 ```
2. **Serve locally:**
	 - With Python 3:
		 ```bash
		 python -m http.server 8000
		 # then open http://localhost:8000
		 ```
	 - Or use any static server (e.g. `npx serve`)
3. **Open [index.html](index.html) in your browser.**

## File Structure

- `index.html` — Main demo page and app entry point
- `Textures/8k_earth_daymap.jpg` — Globe color texture (8K)
- `scripts/coordUtils.js` — Latitude/longitude to 3D vector conversion
- `scripts/eonetLoader.js` — Loads EONET events and adds globe markers
- `scripts/markerInteraction.js` — Handles marker hover/click interaction
- `scripts/eonetLoader.test.js` — Vitest test for EONET loader logic
- `package.json` — Project and test config

## EONET Event Markers

- The globe fetches live event data from NASA's EONET API (https://eonet.gsfc.nasa.gov/api/v3/events/geojson)
- Only events with Point geometry are shown
- Only the 20 most recent events (by date) are displayed
- Clicking a marker opens the event's NASA page

## Development & Testing

- All code uses ES modules (import/export)
- Unit tests for the EONET loader are written in Vitest (see `scripts/eonetLoader.test.js`)
- To run tests:
```bash
npx vitest run
```

## Dependencies

- [Three.js](https://threejs.org/) (loaded via CDN/importmap in `index.html`)
- [NASA EONET API](https://eonet.gsfc.nasa.gov/)
- [Vitest](https://vitest.dev/) (for testing, local only)

---
For questions, improvements, or to expand the documentation, open an issue or ask for help!
