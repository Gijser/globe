import * as THREE from "three";
import { latLonToVec3 } from "./coordUtils.js";

const dotGeom = new THREE.SphereGeometry(0.02, 10, 10); // marker size
const dotMat = new THREE.MeshBasicMaterial(); // default white

/**
 * Creates a marker mesh for the globe at the given latitude and longitude.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {object} userData - Data to attach to the marker
 * @returns {THREE.Mesh} The marker mesh
 */
export function markerFactory(lat, lon, userData) {
  const marker = new THREE.Mesh(dotGeom, dotMat.clone());
  marker.position.copy(latLonToVec3(lat, lon, 2.01));
  marker.userData = userData;
  return marker;
}
