/**
 * Starts the main animation loop for the globe scene.
 * Keeps the atmosphere in sync, updates controls, and renders the scene.
 * @param {THREE.Mesh} atmosphere - The atmosphere mesh to rotate
 * @param {THREE.Mesh} globe - The globe mesh to sync rotation with
 * @param {THREE.OrbitControls} controls - The orbit controls to update
 * @param {THREE.WebGLRenderer} renderer - The renderer
 * @param {THREE.Scene} scene - The scene to render
 * @param {THREE.Camera} camera - The camera
 */
export function startAnimationLoop(atmosphere, globe, controls, renderer, scene, camera) {
  function animate() {
    atmosphere.rotation.y = globe.rotation.y;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
