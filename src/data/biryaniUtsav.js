// October Biryani Utsav — Half-Tray Feasts Designed for Gatherings.
// Offer runs 2026-10-01 through 2026-10-31 and is only available Mon–Thu.
// Each day of the week has a Veg and a Non-Veg option; the customer picks
// a date, and the form shows that weekday's two options.

export const UTSAV_START = '2026-10-01' // inclusive
export const UTSAV_END = '2026-10-31'   // inclusive

// Keyed by JS weekday index (0=Sun … 6=Sat). Only Mon(1)–Thu(4) are active.
export const WEEKLY_MENU = {
  1: { label: 'Monday',    veg: 'Veg Dum Biryani',              nonveg: 'Chicken Dum Biryani' },
  2: { label: 'Tuesday',   veg: 'Pachimirchi Paneer Biryani',   nonveg: 'Thalapakatti Goat Biryani' },
  3: { label: 'Wednesday', veg: 'Beach Style Paneer Pulav',     nonveg: 'Vijayawada Chicken Biryani' },
  4: { label: 'Thursday',  veg: 'Panasakkai (Jack Fruit) Biryani', nonveg: 'Pachimirchi Chicken Pulav' },
}

// Return every Mon–Thu date between today and 2026-10-31 (inclusive),
// clamped to the offer window. Returns an array of { iso, weekday, label, veg, nonveg, display }.
export function getAvailableDates(today = new Date()) {
  const start = new Date(UTSAV_START + 'T00:00:00')
  const end = new Date(UTSAV_END + 'T23:59:59')
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const cursor = new Date(Math.max(t0.getTime(), start.getTime()))

  const out = []
  while (cursor <= end) {
    const dow = cursor.getDay()
    if (WEEKLY_MENU[dow]) {
      const iso = cursor.toISOString().slice(0, 10)
      const menu = WEEKLY_MENU[dow]
      const display = cursor.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
      })
      out.push({ iso, weekday: dow, label: menu.label, veg: menu.veg, nonveg: menu.nonveg, display })
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return out
}

// True if the offer is still bookable (today <= 2026-10-31).
export function isOfferLive(today = new Date()) {
  const end = new Date(UTSAV_END + 'T23:59:59')
  return today <= end
}
