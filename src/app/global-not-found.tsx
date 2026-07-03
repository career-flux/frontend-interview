import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-2 text-center">
          <h1>404</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </body>
    </html>
  );
}