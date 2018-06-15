/**
 * get the current time milliseconds since the epoch.
 *
 * As we use this multiple times to calculate elapsed milliseconds and never
 * actually construct a date from it, this is reliable enough for our purposes.
 */
export function millis() {
  return new Date().getTime();
}
