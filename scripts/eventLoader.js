import { loadEonetMarkers } from "./eonetLoader.js";

/**
 * Loads EONET events, creates markers, and updates the event HUD.
 * @param {THREE.Group} markers - The group to add markers to
 * @param {Function} markerFactory - Function to create a marker
 * @param {Function} setEvents - Function to update the HUD with shown events
 * @returns {Promise<void>}
 */
export async function loadAndDisplayEvents(markers, markerFactory, setEvents, eventLimit) {
  const shownEvents = [];
  function markerFactoryWithCollect(lat, lon, userData) {
    shownEvents.push(userData);
    return markerFactory(lat, lon, userData);
  }
  await loadEonetMarkers(markers, markerFactoryWithCollect, eventLimit);
  setEvents(shownEvents);
}

/**
 * Shows the loader until events are loaded and HUD is ready.
 * @param {Function} loadAndDisplayEventsFn - Function to load and display events
 * @returns {Promise<void>}
 */
export async function showLoaderUntilLoaded(loadAndDisplayEventsFn) {
  document.getElementById("loadPage").style.display = "flex";
  document.getElementById("app").style.visibility = "hidden";
  const hudDiv = document.querySelector(".hud");
  if (hudDiv) hudDiv.style.visibility = "hidden";
  await loadAndDisplayEventsFn();
  document.getElementById("loadPage").style.display = "none";
  document.getElementById("app").style.visibility = "visible";
  if (hudDiv) hudDiv.style.visibility = "visible";
}
