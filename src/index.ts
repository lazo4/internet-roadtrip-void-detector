import "./meta.js?userscript-metadata";
import { decodePanoId, isVoid } from "./void";


(async function () {
    // Check if you're *really* on Internet Roadtrip
    if (!IRF?.isInternetRoadtrip) {
        return
    }

    GM_addStyle(`
        .void-detector-void path {
            fill: #f00 !important;
        }
    `);

    let container = await IRF.vdom.container;

    console.log("[Void Detector] Loaded State", container.state);

    // Execute code when a Internet Roadtrip SETS a data value
    const { set: currentPanoSetter } = Object.getOwnPropertyDescriptor(container.state, 'currentOptions')!;
    Object.defineProperty(container.state, 'currentOptions', {
        set(currentOptions) {

            let value = currentPanoSetter!.call(this, currentOptions);

            // Wait for Vue to finish re-rendering the DOM on the next frame
            setTimeout(() => {
                let arrows = Array.from(document.querySelectorAll<HTMLElement>(".option"));

                console.log("[Void Detector] Current Options", currentOptions);
                console.log("[Void Detector] Rendered Arrows", arrows);

                if (!currentOptions || arrows.length === 0) return;

                // Check all options for void panos
                for (let [idx, option] of currentOptions.entries()) {
                    let pano = decodePanoId(option.pano);

                    if (idx === 0) {
                        pano = decodePanoId("CAoSHENJQUJJaERqSWFwZDZ1YzhLZjVfRzNaWFRSeVo.");
                    }

                    isVoid(pano).then(isVoid => {
                        const arrowEl = arrows[idx];
                        if (!arrowEl) return;

                        if (isVoid) {
                            console.log("[Void Detector] Void detected at option index", idx);
                            arrowEl.classList.add("void-detector-void");
                        } else {
                            arrowEl.classList.remove("void-detector-void");
                        }
                    });
                }
            }, 50); // 50ms buffer ensures Vue DOM patch is complete

            return value;
        },
        configurable: true,
        enumerable: true,
    });

    // // Execute code BEFORE a vue method executes
    // container.state.changeStop = new Proxy(container.methods.changeStop, {
    //     apply: (target, thisArg, args) => {
    //         let options: any[] = args[5];

    //         let arrows = Array.from(document.querySelectorAll(".option"));

    //         // Now check all the options for voids

    //         for (let [idx, option] of options.entries()) {
    //             let pano = decodePanoId(option.pano);

    //             if (idx === 0) {
    //                 // pano = decodePanoId("CAoSHENJQUJJaERqSWFwZDZ1YzhLZjVfRzNaWFRSeVo.");
    //             }

    //             isVoid(pano).then(isVoid => {
    //                 if (isVoid) {
    //                     console.log("[Void Detector] Void detected at option", idx);
    //                     arrows[idx]!.classList.add("void-detector-void");
    //                 } else {
    //                     arrows[idx]!.classList.remove("void-detector-void");
    //                 }
    //             });
    //         }

    //         return Reflect.apply(target, thisArg, args);
    //     },
    // });

})();
