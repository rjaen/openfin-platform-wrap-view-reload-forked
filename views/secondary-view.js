import { onWindowClose } from "./on-window-close.js";

async function init() {
  let disposable = await onWindowClose(() => {
    console.log("The window view closed.");
    let primaryView = window.fin.View.wrapSync({
      uuid: "platform-view-wrap-example",
      name: "primary-view"
    });
    return primaryView.reload();
  });
}
init();
