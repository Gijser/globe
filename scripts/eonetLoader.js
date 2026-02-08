// eonetLoader.js
// EONET event data loader for globe
/**
 * Fetch EONET events and add markers to the globe
 * @param {THREE.Group} markersGroup The group to add marker meshes to
 * @param {function} markerFactory Function(lat, lon, userData) => THREE.Mesh
 * @returns {Promise<void>}
 */
export async function loadEonetMarkers(markersGroup, markerFactory, eventLimit) {
  const url = "https://eonet.gsfc.nasa.gov/api/v3/events/geojson?limit=" + eventLimit;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`EONET fetch failed: ${res.status}`);
  const geojson = await res.json();
  markersGroup.clear();
  // Collect all Point events with their most recent date
  const pointEvents = [];
  for (const feature of geojson.features ?? []) {
    const geom = feature.geometry;
    if (!geom) continue;
    if (geom.type === "Point") {
      let eventDateStr = geom.date;
      if (!eventDateStr && Array.isArray(feature.geometry)) {
        eventDateStr = feature.geometry.map(g => g.date).filter(Boolean).sort().pop();
      }
      const eventTime = eventDateStr ? Date.parse(eventDateStr) : 0;
      pointEvents.push({ feature, eventDateStr, eventTime });
    }
  }
  // Sort by most recent date descending
  pointEvents.sort((a, b) => b.eventTime - a.eventTime);
  const last20 = pointEvents.slice(0, eventLimit);
  console.log(`EONET: total Point events: ${pointEvents.length}, showing: ${last20.length}`);
  for (const { feature, eventDateStr } of last20) {
    const geom = feature.geometry;
    const [lon, lat] = geom.coordinates;
    const userData = {
      title: feature.properties?.title,
      link: feature.properties?.link,
      categories: feature.properties?.categories?.map((c) => c.title).join(", "),
      date: eventDateStr,
    };
    const marker = markerFactory(lat, lon, userData);
    markersGroup.add(marker);
    console.log("EONET: marker added", { lat, lon, userData });
  }
}
