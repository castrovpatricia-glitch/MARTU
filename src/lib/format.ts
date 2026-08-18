// Money is always stored as an integer in minor units (cents). These helpers
// convert to/from major units and handle all display formatting.

export function toMinor(majorAmount: number): number {
  return Math.round(majorAmount * 100);
}

export function toMajor(minorAmount: number): number {
  return minorAmount / 100;
}

export function formatMoney(
  minorAmount: number,
  currency: string,
  locale: string = "es-AR",
  opts?: { compact?: boolean; sign?: boolean }
): string {
  const major = toMajor(minorAmount);
  const showSign = opts?.sign && major !== 0;
  const sign = showSign ? (major > 0 ? "+" : "") : "";

  if (opts?.compact) {
    const abs = Math.abs(major);
    if (abs >= 1_000_000) {
      return `${sign}${formatPlain(major / 1_000_000, locale)} M`;
    }
    if (abs >= 100_000) {
      return `${sign}${formatPlain(major / 1_000, locale, 0)} k`;
    }
  }

  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(major));
    return showSign ? `${sign}${formatted}` : formatted;
  } catch {
    return `${sign}$${Math.round(major)}`;
  }
}

function formatPlain(value: number, locale: string, digits = 1): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatNumber(value: number, locale: string = "es-AR"): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatPercent(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

const MONTHS_ES = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];
const MONTHS_ES_SHORT = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];
const DAYS_ES_SHORT = ["D", "L", "M", "M", "J", "V", "S"];
const DAYS_ES_MED = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

export function monthLabel(monthId: string): string {
  const [y, m] = monthId.split("-").map(Number);
  return `${MONTHS_ES[m - 1]} ${y}`;
}

export function monthShortLabel(monthId: string): string {
  const [, m] = monthId.split("-").map(Number);
  return MONTHS_ES_SHORT[m - 1];
}

export function dayLetter(dayOfWeek: number): string {
  return DAYS_ES_SHORT[dayOfWeek];
}

export function dayMedLabel(dayOfWeek: number): string {
  return DAYS_ES_MED[dayOfWeek];
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MONTHS_ES_SHORT[d.getMonth()]}`;
}

export function formatDateFull(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${DAYS_ES_MED[d.getDay()]} ${d.getDate()} ${MONTHS_ES_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function isoFromDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
