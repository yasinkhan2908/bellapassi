"use client";

import { useEffect } from "react";

export default function ClientBootstrap() {
  useEffect(() => {
    // Dynamically import only in browser
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => console.log("Bootstrap JS loaded on client"))
      .catch((err) => console.error("Error loading Bootstrap JS:", err));
  }, []);

  return null; // No visible output
}
