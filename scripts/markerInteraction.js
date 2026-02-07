// markerInteraction.js
// HUD and pointer/click interaction for marker groups
import * as THREE from "three";
/**
 * Set up pointer HUD and click interaction for marker groups
 * @param {THREE.Group} markersGroup
 * @param {THREE.Camera} camera
 * @param {HTMLElement} hudDiv
 */
export function setupMarkerInteraction(markersGroup, camera, hudDiv) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function updatePointerFromEvent(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  function onPointerMove(event) {
    updatePointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(markersGroup.children, true);
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      const title = obj.userData?.title ?? "(no title)";
      hudDiv.textContent = title;
      hudDiv.style.display = "block";
      hudDiv.style.left = event.clientX + 12 + "px";
      hudDiv.style.top = event.clientY + 12 + "px";
    } else {
      hudDiv.style.display = "none";
    }
  }
  function onClick(event) {
    updatePointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(markersGroup.children, true);
    if (intersects.length > 0) {
      const link = intersects[0].object.userData?.link;
      if (link) window.open(link, "_blank");
    }
  }
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("click", onClick);
}
