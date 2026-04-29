function retry(e){if("undefined"==typeof FastBoot){e.parentNode&&e.parentNode.removeChild(e)
const r=document.createElement("script")
Array.from(e.attributes).forEach((e=>{"onerror"!==e.name&&(r[e.name]=e.value)}))
document.body.appendChild(r)}}function bodyErrorHandler(e){const r=e.target
if(r&&r.matches("script")&&"support-locale-module"===r.id&&"undefined"==typeof FastBoot){document.querySelector("body").removeEventListener("error",bodyErrorHandler,!0)
retry(r)}}"undefined"==typeof FastBoot&&document.querySelector("body").addEventListener("error",bodyErrorHandler,!0)

//# sourceMappingURL=retry.map