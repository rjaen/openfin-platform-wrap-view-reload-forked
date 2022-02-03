let timer = document.getElementById("timer");
let launchBtn = document.getElementById("launch");

setInterval(() => {
  timer.innerText = new Date(Date.now()).toLocaleTimeString();
}, 1000);

launchBtn.onclick = async () => {
  let plat = window.fin.Platform.getCurrentSync();
  plat.createView({
    url: "https://ezvrj.csb.app/views/secondary-view.html",
    name: "secondary-view"
  });
};
