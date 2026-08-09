'use client';

import { useEffect, useState } from 'react';

/**
 * A live clock in the site owner's timezone. Renders empty on the server so
 * hydration doesn't mismatch when the visitor is in a different zone.
 *
 * @param {Object} props
 * @param {string} props.timeZone IANA timezone name, e.g. 'America/New_York'.
 */
export function LocalTime({ timeZone }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <time>&nbsp;</time>;

  const formatted = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
    timeZoneName: 'short',
  }).format(now);

  return <time>{formatted}</time>;
}
