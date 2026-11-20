// Dot-grid map of the contiguous United States, built from a hand-drawn outline.
// Albers equal-area conic projection, no external data.

type P = [number, number]; // [lng, lat]

const OUTLINE: P[] = [
  [-124.7, 48.4], [-123.2, 48.2], [-122.8, 49.0], [-95.2, 49.0], [-94.6, 48.7], [-93.0, 48.6], [-91.5, 48.1],
  [-89.6, 48.0], [-90.8, 47.3], [-92.1, 46.8], [-90.8, 46.9], [-88.5, 47.4], [-87.5, 46.5], [-85.0, 46.7],
  [-84.4, 46.5], [-84.7, 45.9], [-83.5, 45.3], [-83.3, 44.3], [-83.9, 43.7], [-82.6, 44.0], [-82.4, 43.0],
  [-83.2, 42.0], [-83.4, 41.7], [-82.7, 41.5], [-81.7, 41.5], [-80.1, 42.2], [-78.9, 42.9], [-79.0, 43.3],
  [-77.5, 43.3], [-76.3, 43.5], [-76.2, 44.1], [-75.0, 45.0], [-71.5, 45.0], [-70.3, 45.9], [-69.2, 47.4],
  [-68.2, 47.3], [-67.8, 45.7], [-67.0, 44.8], [-68.8, 44.4], [-70.2, 43.6], [-70.7, 42.7], [-70.0, 41.8],
  [-71.3, 41.5], [-73.7, 40.9], [-74.0, 40.5], [-74.2, 39.6], [-75.0, 38.9], [-75.6, 37.9], [-76.0, 36.9],
  [-75.5, 35.3], [-76.7, 34.7], [-77.9, 33.9], [-79.2, 33.2], [-81.1, 32.0], [-81.4, 30.4], [-80.6, 28.4],
  [-80.0, 26.8], [-80.3, 25.4], [-81.1, 25.2], [-81.8, 26.1], [-82.8, 27.8], [-82.7, 29.0], [-83.7, 30.0],
  [-85.3, 29.7], [-86.5, 30.4], [-88.0, 30.3], [-89.6, 30.2], [-89.2, 29.1], [-90.9, 29.1], [-93.8, 29.7],
  [-94.8, 29.3], [-96.4, 28.4], [-97.2, 27.8], [-97.2, 25.95], [-99.1, 26.4], [-99.5, 27.5], [-100.3, 28.3],
  [-101.4, 29.8], [-102.4, 29.8], [-103.1, 29.0], [-104.5, 29.6], [-106.5, 31.75], [-108.2, 31.75],
  [-108.2, 31.33], [-111.1, 31.33], [-114.8, 32.5], [-117.1, 32.5], [-118.4, 33.8], [-120.5, 34.5],
  [-121.9, 36.6], [-122.5, 37.8], [-123.8, 39.8], [-124.3, 40.4], [-124.1, 42.0], [-124.5, 42.8],
  [-124.0, 44.6], [-124.0, 46.2],
];

const LAKE_MICHIGAN: P[] = [
  [-87.5, 41.7], [-86.8, 41.8], [-86.3, 42.6], [-86.4, 43.8], [-86.2, 44.7], [-85.4, 45.2], [-85.0, 45.7],
  [-85.6, 46.0], [-86.6, 45.8], [-87.1, 45.3], [-87.9, 44.6], [-87.6, 43.9], [-87.9, 43.0], [-87.8, 42.3],
];

const rad = (d: number) => (d * Math.PI) / 180;
const P1 = rad(29.5), P2 = rad(45.5), P0 = rad(37.5), L0 = rad(-96);
const N = (Math.sin(P1) + Math.sin(P2)) / 2;
const C = Math.cos(P1) ** 2 + 2 * N * Math.sin(P1);
const R0 = Math.sqrt(C - 2 * N * Math.sin(P0)) / N;

function albers([lng, lat]: P): P {
  const r = Math.sqrt(C - 2 * N * Math.sin(rad(lat))) / N;
  const t = N * (rad(lng) - L0);
  return [r * Math.sin(t), -(R0 - r * Math.cos(t))];
}

function densify(poly: P[]): P[] {
  const out: P[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 1.5));
    for (let s = 0; s < steps; s++) out.push([a[0] + ((b[0] - a[0]) * s) / steps, a[1] + ((b[1] - a[1]) * s) / steps]);
  }
  return out;
}

function inside(pt: P, poly: P[]): boolean {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

export const MAP_W = 1000;
const PAD = 16;

const rawOutline = densify(OUTLINE).map(albers);
const xs = rawOutline.map((p) => p[0]);
const ys = rawOutline.map((p) => p[1]);
const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
const SCALE = (MAP_W - PAD * 2) / (maxX - minX);
export const MAP_H = Math.round((maxY - minY) * SCALE + PAD * 2);

const fit = ([x, y]: P): P => [(x - minX) * SCALE + PAD, (y - minY) * SCALE + PAD];
const outline = rawOutline.map(fit);
const lake = densify(LAKE_MICHIGAN).map(albers).map(fit);

export function project(lng: number, lat: number): { x: number; y: number } {
  const [x, y] = fit(albers([lng, lat]));
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

const STEP = 13.4;
const R = 3.5;

function buildDots(): string {
  let d = "";
  for (let y = PAD; y <= MAP_H - PAD; y += STEP) {
    for (let x = PAD; x <= MAP_W - PAD; x += STEP) {
      const pt: P = [x, y];
      if (inside(pt, outline) && !inside(pt, lake)) {
        const cx = Math.round(x * 10) / 10, cy = Math.round(y * 10) / 10;
        d += `M${cx - R} ${cy}a${R} ${R} 0 1 0 ${R * 2} 0a${R} ${R} 0 1 0 ${-R * 2} 0`;
      }
    }
  }
  return d;
}

export const DOTS_PATH = buildDots();
