let win;
let winIdentity;
let callbackOnWindowClose;
let closeWindowOnWindowClose;

export async function onWindowClose(callback, closeWindow = true) {
  callbackOnWindowClose = callback;
  closeWindowOnWindowClose = closeWindow;

  await init();
  return {
    dispose: () => {
      removeCloseListener();
      removeTargetChangedListener();
      callbackOnWindowClose = undefined;
      closeWindowOnWindowClose = undefined;
    }
  };
}

async function watchForChanges(event) {
  if (event.name === winIdentity) {
    // perform custom action
    console.log(
      "Target and Current Window Match: Window check...event name: " +
        event.name +
        " last stored value: " +
        winIdentity
    );
    await callbackOnWindowClose();
    if (closeWindowOnWindowClose) {
      removeCloseListener();
      removeTargetChangedListener();
      win.close();
    }
  } else {
    console.warn(
      "This shouldn't fire as we remove the event handler on window move. Window check...event name: " +
        event.name +
        " last stored value: " +
        winIdentity
    );
    removeCloseListener();
    removeTargetChangedListener();
    win.close();
  }
}

async function init() {
  await getCurrentWindow();
  window.fin.me.addListener("target-changed", targetChanged);
}

async function targetChanged(event) {
  console.log("The View Parent Window was changed.", event);
  await getCurrentWindow();
}

async function getCurrentWindow() {
  removeCloseListener();
  win = await window.fin.me.getCurrentWindow();
  winIdentity = win.identity.name;
  console.log("Adding close requested to: " + winIdentity);
  win.on("close-requested", watchForChanges);
}

function removeCloseListener() {
  if (win !== undefined) {
    console.log("Removing close requested from: " + winIdentity);
    win.removeListener("close-requested", watchForChanges);
  }
}

function removeTargetChangedListener() {
  console.log("Removing target changed listener from view.");
  window.fin.me.removeListener("target-changed", targetChanged);
}
