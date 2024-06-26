// app/root.tsx

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
      <meta charSet="utf-8" /> Add charset meta tag
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
