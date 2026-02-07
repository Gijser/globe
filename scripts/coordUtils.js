// coordUtils.js
// Coordinate math utilities for globe
import * as THREE from "three";
/**
 * Convert latitude/longitude to a 3D position on a sphere
 * @param {number} lat Latitude in degrees
 * @param {number} lon Longitude in degrees
 * @param {number} radius Sphere radius
 * @returns {THREE.Vector3}
 */
export function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}
