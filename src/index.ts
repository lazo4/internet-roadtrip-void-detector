import "./meta.js?userscript-metadata";
import { decodePanoId, isVoid } from "./void";


(async function () {
    // Check if you're *really* on Internet Roadtrip
    if (!IRF?.isInternetRoadtrip) {
        return
    }

    GM_addStyle(`
        .void-detector-void path {
            fill: #d91620 !important;
        }
    `);

    let container = await IRF.vdom.container;

    // Execute code BEFORE a vue method executes
    container.state.changeStop = new Proxy(container.methods.changeStop, {
        apply: (target, thisArg, args) => {
            let options: any[] = args[5];

            let arrows = Array.from(document.querySelectorAll(".option"));

            for (const optionArrowEl of arrows) {
                optionArrowEl.classList.remove("void-detector-void");
            }

            // Now check all the options for voids

            for (let [idx, option] of options.entries()) {
                let pano = decodePanoId(option.pano);

                if (idx === 0) {
                    pano = decodePanoId("CAoSHENJQUJJaERqSWFwZDZ1YzhLZjVfRzNaWFRSeVo.");
                }

                isVoid(pano).then(isVoid => {
                    if (isVoid) {
                        console.log("[Void Detector] Void detected at option", idx);
                        arrows[idx]!.classList.add("void-detector-void");
                    }
                });
            }

            return Reflect.apply(target, thisArg, args);
        },
    });

})();
