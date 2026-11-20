// Albers equal-area projection of the contiguous United States, drawn as a dot grid.
const rad = (d: number) => (d * Math.PI) / 180;
const P1 = rad(29.5), P2 = rad(45.5), P0 = rad(37.5), L0 = rad(-96);
const n = (Math.sin(P1) + Math.sin(P2)) / 2;
const C = Math.cos(P1) ** 2 + 2 * n * Math.sin(P1);
const rho = (p: number) => Math.sqrt(C - 2 * n * Math.sin(p)) / n;
const R0 = rho(P0);

function raw(lat: number, lng: number): [number, number] {
  const r = rho(rad(lat));
  const t = n * (rad(lng) - L0);
  return [r * Math.sin(t), -(R0 - r * Math.cos(t))];
}

// Coarse outline, [lat, lng], clockwise from the north-west corner.
const OUTLINE: [number, number][] = [
  [48.4, -124.7], [46.2, -124.0], [43.0, -124.4], [40.4, -124.4], [38.0, -123.0], [36.6, -121.9],
  [34.5, -120.6], [34.0, -118.5], [32.6, -117.1], [32.7, -114.7], [31.3, -111.0], [31.3, -108.2],
  [31.8, -108.2], [31.8, -106.5], [29.6, -104.4], [29.0, -103.1], [29.8, -102.4], [29.4, -101.0],
  [28.2, -100.3], [26.4, -99.1], [25.9, -97.2], [27.8, -97.2], [28.9, -95.4], [29.7, -93.8],
  [29.6, -92.0], [29.1, -90.9], [29.0, -89.3], [30.2, -89.4], [30.3, -87.5], [30.4, -86.4],
  [29.7, -85.3], [30.0, -84.0], [29.0, -82.8], [27.8, -82.8], [26.0, -81.8], [25.1, -81.1],
  [25.3, -80.3], [26.8, -80.0], [28.5, -80.6], [30.4, -81.4], [32.0, -80.9], [33.0, -79.4],
  [33.9, -78.0], [34.7, -76.6], [35.3, -75.5], [36.9, -76.0], [38.0, -75.3], [39.3, -74.4],
  [40.5, -74.0], [41.0, -72.0], [41.5, -70.0], [42.0, -70.0], [42.5, -70.8], [43.6, -70.2],
  [44.3, -68.3], [44.8, -67.0], [47.1, -67.8], [47.4, -69.0], [46.4, -70.0], [45.3, -70.9],
  [45.0, -71.5], [45.0, -74.8], [44.2, -76.2], [43.6, -76.2], [43.3, -77.6], [43.3, -79.0],
  [42.9, -78.9], [42.3, -79.8], [41.5, -81.7], [41.7, -83.4], [42.1, -83.1], [43.0, -82.4],
  [43.9, -82.7], [44.0, -83.6], [43.6, -83.9], [44.3, -83.3], [45.0, -83.4], [45.8, -84.7],
  [46.5, -84.4], [46.7, -85.5], [46.5, -87.4], [47.4, -87.9], [46.9, -89.3], [46.7, -90.5],
  [46.7, -92.1], [47.3, -91.2], [48.0, -89.6], [48.1, -90.8], [48.6, -93.2], [49.0, -95.2],
  [49.0, -123.3],
];
const LAKE_MICHIGAN: [number, number][] = [[45.9, -85.9], [41.7, -86.6], [41.7, -87.7], [45.4, -87.4]];

export const MAP_W = 1000;
export const MAP_H = 620;
const PAD = 24;

const rawOutline = OUTLINE.map(([a, b]) => raw(a, b));
const xs = rawOutline.map((p) => p[0]), ys = rawOutline.map((p) => p[1]);
const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
const scale = Math.min((MAP_W - PAD * 2) / (maxX - minX), (MAP_H - PAD * 2) / (maxY - minY));
const offX = (MAP_W - (maxX - minX) * scale) / 2, offY = (MAP_H - (maxY - minY) * scale) / 2;

export function project(lat: number, lng: number): [number, number] {
  const [x, y] = raw(lat, lng);
  return [offX + (x - minX) * scale, offY + (y - minY) * scale];
}

function inside(pt: [number, number], poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const land = OUTLINE.map(([a, b]) => project(a, b));
const lake = LAKE_MICHIGAN.map(([a, b]) => project(a, b));

const STEP = 13.5;
const DOT = 2.1;

function buildDots() {
  let d = "";
  let row = 0;
  for (let y = PAD / 2; y < MAP_H; y += STEP * 0.866, row++) {
    for (let x = PAD / 2 + (row % 2 ? STEP / 2 : 0); x < MAP_W; x += STEP) {
      const p: [number, number] = [x, y];
      if (inside(p, land) && !inside(p, lake)) {
        const X = x.toFixed(1), Y = y.toFixed(1);
        d += `M${X} ${Y}m-${DOT} 0a${DOT} ${DOT} 0 1 0 ${DOT * 2} 0a${DOT} ${DOT} 0 1 0 -${DOT * 2} 0`;
      }
    }
  }
  return d;
}

export const dotsPath = buildDots();

export function coords(lat: number, lng: number) {
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}  ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;
}
