// Keeps availability and price current.
//
// Each stay has a fixed price for the listed period. Once the listed start
// date has passed, the stay is shown as starting today and the price is
// reduced to the remaining nights, at the same price per night. Without
// JavaScript the dates and prices written in the HTML are shown unchanged.
//
// Markup: an element with data-stay-start, data-stay-end (YYYY-MM-DD) and
// data-stay-price (euros for the whole listed period), containing any of:
//   [data-stay-dates]   the date range and length (replaced once the stay has ended)
//   [data-stay-from]    the <time> holding the start date
//   [data-stay-length]  the length of the stay, e.g. "40 nights"
//   [data-stay-total]   the price
//   [data-stay-rolled]  a hidden note, shown when the start date has moved

const DAY_MS = 24 * 60 * 60 * 1000;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const euroFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function parseDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function today() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

function nightsBetween(start, end) {
  return Math.round((end - start) / DAY_MS);
}

for (const stay of document.querySelectorAll("[data-stay-start]")) {
  const listedStart = parseDate(stay.dataset.stayStart);
  const end = parseDate(stay.dataset.stayEnd);
  const start = Math.max(listedStart, today());
  const dates = stay.querySelector("[data-stay-dates]");
  const from = stay.querySelector("[data-stay-from]");
  const length = stay.querySelector("[data-stay-length]");
  const total = stay.querySelector("[data-stay-total]");
  const rolled = stay.querySelector("[data-stay-rolled]");

  if (start >= end) {
    if (dates) dates.textContent = "No longer available";
    if (total) total.textContent = "–";
    continue;
  }

  if (start > listedStart) {
    const nights = nightsBetween(start, end);
    const price = Number(stay.dataset.stayPrice) * nights / nightsBetween(listedStart, end);
    if (from) {
      from.textContent = dateFormat.format(start);
      from.dateTime = new Date(start).toISOString().slice(0, 10);
    }
    if (length) length.textContent = nights === 1 ? "1 night" : `${nights} nights`;
    if (total) total.textContent = euroFormat.format(Math.round(price));
    if (rolled) rolled.hidden = false;
  }
}
