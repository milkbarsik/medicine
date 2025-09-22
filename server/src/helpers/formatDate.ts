// deps:
// yarn add dayjs
// yarn add -D @types/node
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ApiError from '../exceptions/apiError';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(customParseFormat);

const MSK_TZ = 'Europe/Moscow';

/**
 * Принимает строку даты/времени и возвращает календарный день в МСК в формате YYYY-MM-DD.
 * Поддерживаемые входы:
 *  - 'YYYY-MM-DD' (день)
 *  - ISO 8601 ('2025-09-20T10:00:00Z', '2025-09-20T13:00+03:00', и т.п.)
 *  - 'DD.MM.YYYY' и 'DD.MM.YYYY HH:mm[:ss]' (как часто вводят пользователи)
 *  - 'YYYY-MM-DD HH:mm[:ss]'
 *
 * Если вход не парсится — бросает BadDateError(400).
 */
export function toMskDateYYYYMMDD(input: string): string {
  if (!input || typeof input !== 'string') throw ApiError.BadDate('Empty date');

  const s = input.trim();
  const reYMD = /^\d{4}-\d{2}-\d{2}$/;
  const reDMY = /^\d{2}\.\d{2}\.\d{4}$/;
  const reDMYhm = /^\d{2}\.\d{2}\.\d{4}[ T]\d{2}:\d{2}(?::\d{2})?$/;
  const reYMDhm = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(?::\d{2})?$/;

  let m: dayjs.Dayjs;

  if (reYMD.test(s)) {
    // это «день» — трактуем как полночь МСК
    m = dayjs.tz(s, MSK_TZ);
  } else if (reDMY.test(s)) {
    m = dayjs.tz(s, 'DD.MM.YYYY', MSK_TZ);
  } else if (reDMYhm.test(s)) {
    // строгий парс 'DD.MM.YYYY HH:mm[:ss]' в МСК
    const fmt = s.match(/:\d{2}$/) ? 'DD.MM.YYYY HH:mm:ss' : 'DD.MM.YYYY HH:mm';
    m = dayjs.tz(s, fmt, MSK_TZ);
  } else if (reYMDhm.test(s)) {
    const fmt = s.match(/:\d{2}$/) ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
    m = dayjs.tz(s, fmt, MSK_TZ);
  } else {
    // ISO 8601 / RFC 2822 и прочее, что dayjs понимает нативно.
    // Если строка содержит офсет/Z — dayjs создаст момент; берём его календарный день в МСК.
    // Если без офсета — считаем это локальным временем и переводим в МСК.
    const iso = dayjs(s);
    if (!iso.isValid()) throw ApiError.BadDate('Unsupported date format');
    m = iso.tz(MSK_TZ);
  }

  if (!m.isValid()) throw ApiError.BadDate('Invalid date value');

  // Возвращаем календарный день по МСК в формате 'YYYY-MM-DD'
  return m.format('YYYY-MM-DD');
}
