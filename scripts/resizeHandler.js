/**
 * Sets up a window resize handler to keep the camera and renderer in sync with the viewport.
 * @param {THREE.PerspectiveCamera} camera - The camera to update
 * @param {THREE.WebGLRenderer} renderer - The renderer to resize
 */
export function setupResizeHandler(camera, renderer) {
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
