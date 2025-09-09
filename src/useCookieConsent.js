import { useEffect, useState } from "react";

export function useCookieConsent() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
  //     console.log("Available globals:", window);
  // console.log("CookieConsent:", window.CookieConsent);
  // console.log("DPDPConsent:", window.DPDPConsent);
    function checkConsent() {
      // Look for any global that might be the consent manager
      for (let key in window) {
        if (key.toLowerCase().includes("consent")) {
          // console.log("👉 Found consent object:", key, window[key]);
        }
      }

      // Example: if script exposes window.CookieConsent
      if (window.CookieConsent) {
        // console.log("CookieConsent API detected:", window.CookieConsent);

        if (typeof window.CookieConsent.getStatus === "function") {
          const status = window.CookieConsent.getStatus();
          // console.log("Initial consent status:", status);
          setConsent(status);
        }

        if (typeof window.CookieConsent.onChange === "function") {
          window.CookieConsent.onChange((status) => {
            // console.log("Consent changed:", status);
            setConsent(status);
          });
        }
      }
    }

    // Run check a little after script loads
    const timer = setTimeout(checkConsent, 1000);

    return () => clearTimeout(timer);
  }, []);

  return consent;
}
