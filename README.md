# Internet Roadtrip Void Detector

Detect and avoid voids in the [neal.fun/internet-roadtrip](https://neal.fun/internet-roadtrip)

## Build locally

To build the mod locally, you will need [Nodejs](https://nodejs.org/en/) and [Bun](https://bun.sh/) installed.
Then you can run `bun run build` to build it once or `bun run dev` to watch for changes.

## Note
If you want to see void detection in action, uncomment line 181 in the final mod, or uncomment line 32 in `index.ts` and rebuild. It overrides the first option with a pano that is guaranteed to be void.