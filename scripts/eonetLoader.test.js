

import { describe, it, beforeAll, beforeEach, afterEach, expect, vi } from 'vitest';

// Mock THREE.Group and markerFactory
class MockGroup {
  constructor() { this.markers = []; }
  clear() { this.markers = []; }
  add(marker) { this.markers.push(marker); }
}

describe("loadEonetMarkers", () => {
  let loadEonetMarkers;

  beforeAll(async () => {
    ({ loadEonetMarkers } = await import("./eonetLoader.js"));
  });

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("adds only the last 20 events as markers", async () => {
    // Create 25 fake events with increasing dates
    const now = Date.now();
    const features = Array.from({ length: 25 }, (_, i) => ({
      geometry: {
        type: "Point",
        coordinates: [i, i],
        date: new Date(now - i * 1000 * 60 * 60).toISOString(),
      },
      properties: {
        title: `Event ${i}`,
        link: `http://event${i}`,
        categories: [{ title: "Cat" }],
      },
    }));
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ features }),
    });
    const group = new MockGroup();
    const markerFactory = vi.fn((lat, lon, userData) => ({ lat, lon, userData }));
    await loadEonetMarkers(group, markerFactory);
    expect(group.markers.length).toBe(20);
    // Should be the 20 most recent (i = 0 to 19)
    for (let i = 0; i < 20; i++) {
      expect(group.markers[i].userData.title).toBe(`Event ${i}`);
    }
  });
});