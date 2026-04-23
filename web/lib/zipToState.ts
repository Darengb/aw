// First-three-digit ZIP code prefix ranges mapped to US state names.
// Ranges are inclusive on both ends.
const ZIP_STATE_RANGES: ReadonlyArray<[number, number, string]> = [
  [5, 5, 'New York'],
  [10, 27, 'Massachusetts'],
  [28, 29, 'Rhode Island'],
  [30, 38, 'New Hampshire'],
  [39, 49, 'Maine'],
  [50, 59, 'Vermont'],
  [60, 69, 'Connecticut'],
  [70, 89, 'New Jersey'],
  [100, 149, 'New York'],
  [150, 196, 'Pennsylvania'],
  [197, 199, 'Delaware'],
  [200, 200, 'District of Columbia'],
  [201, 201, 'Virginia'],
  [202, 205, 'District of Columbia'],
  [206, 219, 'Maryland'],
  [220, 246, 'Virginia'],
  [247, 268, 'West Virginia'],
  [270, 289, 'North Carolina'],
  [290, 299, 'South Carolina'],
  [300, 319, 'Georgia'],
  [320, 339, 'Florida'],
  [341, 349, 'Florida'],
  [350, 369, 'Alabama'],
  [370, 385, 'Tennessee'],
  [386, 397, 'Mississippi'],
  [398, 399, 'Georgia'],
  [400, 427, 'Kentucky'],
  [430, 459, 'Ohio'],
  [460, 479, 'Indiana'],
  [480, 499, 'Michigan'],
  [500, 528, 'Iowa'],
  [530, 549, 'Wisconsin'],
  [550, 567, 'Minnesota'],
  [570, 577, 'South Dakota'],
  [580, 588, 'North Dakota'],
  [590, 599, 'Montana'],
  [600, 629, 'Illinois'],
  [630, 658, 'Missouri'],
  [660, 679, 'Kansas'],
  [680, 693, 'Nebraska'],
  [700, 714, 'Louisiana'],
  [716, 729, 'Arkansas'],
  [730, 749, 'Oklahoma'],
  [750, 799, 'Texas'],
  [800, 816, 'Colorado'],
  [820, 831, 'Wyoming'],
  [832, 838, 'Idaho'],
  [840, 847, 'Utah'],
  [850, 865, 'Arizona'],
  [870, 884, 'New Mexico'],
  [885, 885, 'Texas'],
  [889, 898, 'Nevada'],
  [900, 961, 'California'],
  [967, 968, 'Hawaii'],
  [970, 979, 'Oregon'],
  [980, 994, 'Washington'],
  [995, 999, 'Alaska'],
];

export function zipToState(zip: string | null | undefined): string | null {
  if (!zip) return null;
  const digits = zip.replace(/\D/g, '');
  if (digits.length < 3) return null;
  const prefix = parseInt(digits.slice(0, 3), 10);
  for (const [start, end, state] of ZIP_STATE_RANGES) {
    if (prefix >= start && prefix <= end) return state;
  }
  return null;
}

function parseZip(zip: string | null | undefined): number | null {
  if (!zip) return null;
  const digits = zip.replace(/\D/g, '').slice(0, 5);
  if (digits.length < 5) return null;
  const n = parseInt(digits, 10);
  return Number.isNaN(n) ? null : n;
}

export function findNearestOfficeInState<T extends { state: string; zip: string }>(
  userZip: string | null | undefined,
  offices: readonly T[],
): T | null {
  const state = zipToState(userZip);
  if (!state) return null;
  const userZipNum = parseZip(userZip);
  if (userZipNum === null) return null;

  let best: { office: T; distance: number } | null = null;
  for (const office of offices) {
    if (office.state !== state) continue;
    const officeZipNum = parseZip(office.zip);
    if (officeZipNum === null) continue;
    const distance = Math.abs(officeZipNum - userZipNum);
    if (!best || distance < best.distance) {
      best = { office, distance };
    }
  }
  return best?.office ?? null;
}
