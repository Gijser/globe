import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Creates a 3D globe scene with camera, controls, lights, and globe mesh.
 * @param {HTMLElement} container - The DOM element to attach the renderer to.
 * @returns {Object} { scene, camera, renderer, controls, globe, markers, atmosphere }
 */
export function createGlobe(container) {
  // Set up the WebGL renderer and attach it to the DOM
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Create the main scene and set its background color
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070b);

  // Set up a perspective camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 6;

  // Add mouse/touch controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 2.5;
  controls.maxDistance = 12;

  // Add lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(5, 2, 5);
  scene.add(sun);

  // Texture loader
  const loader = new THREE.TextureLoader();
  const earthMapUrl = "./textures/8k_earth_daymap.jpg";
  const earthSpecUrl = "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg";
  const earthNormUrl = "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg";
  const earthMap = loader.load(earthMapUrl);
  const earthSpec = loader.load(earthSpecUrl);
  const earthNorm = loader.load(earthNormUrl);
  earthMap.colorSpace = THREE.SRGBColorSpace;

  // Globe mesh
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(2, 96, 96),
    new THREE.MeshPhongMaterial({
      map: earthMap,
      specularMap: earthSpec,
      normalMap: earthNorm,
      normalScale: new THREE.Vector2(0.85, 0.85),
      specular: new THREE.Color(0x333333),
      shininess: 12,
    })
  );
  scene.add(globe);

  // Markers group
  const markers = new THREE.Group();
  scene.add(markers);

  // Atmosphere
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.03, 96, 96),
    new THREE.MeshBasicMaterial({
      color: 0x59a7ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  );
  scene.add(atmosphere);

  return { scene, camera, renderer, controls, globe, markers, atmosphere };
}
