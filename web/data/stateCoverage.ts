import type { StateCode } from './stateCodes';

// Single source of truth for what coverage each state gets on the homepage map.
// - 'local'  = Local Programs + Ticket To Work (dark)
// - 'ttw'    = Ticket To Work only (light)
// Edit this map to change which states render as Local Programs.
// Offices (contact page) currently cover: CA, GA, LA, MD/DC, NJ, NY, PA, TN, VT, WI
// (Note: the SVG has no separate DC path — DC is inside the MD path.)
export const STATE_COVERAGE: Record<StateCode, 'local' | 'ttw'> = {
  CA: 'local', GA: 'local', LA: 'local', MD: 'local', NJ: 'local',
  NY: 'local', PA: 'local', TN: 'local', VT: 'local', WI: 'local',
  WA: 'local',
  AL: 'ttw', AK: 'ttw', AZ: 'ttw', AR: 'ttw', CO: 'ttw', CT: 'ttw',
  DE: 'ttw', FL: 'ttw', HI: 'ttw', ID: 'ttw', IL: 'ttw', IN: 'ttw',
  IA: 'ttw', KS: 'ttw', KY: 'ttw', ME: 'ttw', MA: 'ttw', MI: 'ttw',
  MN: 'ttw', MS: 'ttw', MO: 'ttw', MT: 'ttw', NE: 'ttw', NV: 'ttw',
  NH: 'ttw', NM: 'ttw', NC: 'ttw', ND: 'ttw', OH: 'ttw', OK: 'ttw',
  OR: 'ttw', RI: 'ttw', SC: 'ttw', SD: 'ttw', TX: 'ttw', UT: 'ttw',
  VA: 'ttw', WV: 'ttw', WY: 'ttw',
};
