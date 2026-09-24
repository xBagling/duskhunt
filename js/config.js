export const CONFIG = {
  // Puzzle #1 is played on this local date. Set it to your launch day before going live.
  LAUNCH_DATE: "2026-09-01",

  // Where the global stats API lives. "/api" works when served by server.js.
  // Use a full URL if the API is hosted elsewhere, or "" to turn global stats off.
  STATS_API: "",

  // SHA-256 of the admin passcode (default: "zookeeper"). Generate a new one with:
  //   bun -e 'const h=new Bun.CryptoHasher("sha256");h.update("your-pass");console.log(h.digest("hex"))'
  ADMIN_PASSCODE_SHA256: "456831beef3fc1500939995d7369695f48642664a02d5eab9d807592a08b2384",

  // Playback speed for each of the six steps. Steps 5 and 6 add visual hints instead.
  SPEEDS: [0.125, 0.25, 0.5, 1, 1, 1],

  // Length of the signature clip, in seconds of real-time audio.
  CLIP_SECONDS: 3,
};

export const MAX_GUESSES = CONFIG.SPEEDS.length;
