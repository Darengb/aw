// Maps each US_MAP_SVG path (by its index in the source SVG) to a US state code.
// The SVG has 50 paths — 48 contiguous states + AK + HI. There is no separate DC path;
// DC is represented within the MD path.
export const STATE_CODES = [
  'CT', 'WA', 'OR', 'AZ', 'NM', 'MS', 'AL', 'FL', 'GA', 'SC',
  'NC', 'VA', 'DE', 'WV', 'KY', 'OH', 'AR', 'MO', 'MI', 'IN',
  'MN', 'IA', 'OK', 'KS', 'SD', 'ND', 'CO', 'UT', 'NV', 'ID',
  'MT', 'RI', 'MA', 'NH', 'ME', 'WY', 'AK', 'HI', 'NJ', 'CA',
  'TX', 'LA', 'MD', 'PA', 'TN', 'IL', 'WI', 'NE', 'NY', 'VT',
] as const;

export type StateCode = typeof STATE_CODES[number];

export const STATE_NAMES: Record<StateCode, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};
