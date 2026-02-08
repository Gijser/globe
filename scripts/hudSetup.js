/**
 * Creates and appends a floating HUD div for showing marker titles on hover.
 * @returns {HTMLDivElement} The created HUD div
 */
export function createHudDiv() {
  const hud = document.createElement("div");
  hud.className = "hud";
  hud.style.display = "none";
  document.body.appendChild(hud);
  return hud;
}
