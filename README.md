# Internet Roadtrip Void Detector

Detect and avoid voids in the [neal.fun/internet-roadtrip](https://neal.fun/internet-roadtrip)

## Build locally

To build the mod locally, you will need [Nodejs](https://nodejs.org/en/) and [Bun](https://bun.sh/) installed.
Then you can run `bun run build` to build it once or `bun run dev` to watch for changes. The compiled userscript is in `static/void_detector.user.js`.

## Note
If you want to see void detection in action, uncomment lines 43 thru 46 in `src/index.ts` and rebuild.