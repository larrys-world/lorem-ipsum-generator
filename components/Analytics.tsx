'use client';

import Script from 'next/script';

export default function Analytics() {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Domain is set per tool
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || window.location.hostname;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
