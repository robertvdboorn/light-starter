import { Html, Head, Main, NextScript } from "next/document";

/**
 * Next.js custom Document — server-only HTML shell.
 *
 * Sets `lang="en"` on `<html>` and `antialiased` on `<body>`.
 * Add global `<link>` / `<meta>` tags here only when they can't go in
 * `_app.tsx` (e.g. preconnect hints). Everything else belongs in `_app.tsx`.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
