document.addEventListener("DOMContentLoaded", () => {

  const raw = localStorage.getItem("activeStudy");
  if (!raw) {
    alert("No study selected. Please open from worklist.");
    return;
  }

  const study = JSON.parse(raw);

  const img = document.getElementById("scan");
  img.src = study.image;

  document.getElementById("pid").innerText = study.patientId;
  document.getElementById("modality").innerText = study.modality;
  document.getElementById("time").innerText = "Received recently";
  document.getElementById("reviewStatus").innerText = "Status: Unreviewed";

  let scale = 1, angle = 0, flipped = false;
  let inverted = false, brightness = 100;
  let translateX = 0, translateY = 0;
  let isPanning = false, startX, startY;

  function update() {
    img.style.transform =
      `translate(${translateX}px, ${translateY}px)
       scale(${scale})
       rotate(${angle}deg)
       scaleX(${flipped ? -1 : 1})`;
    img.style.filter =
      `brightness(${brightness}%)
       invert(${inverted ? 1 : 0})`;
  }

  window.zoomIn = () => { scale += 0.1; update(); };
  window.zoomOut = () => { scale = Math.max(0.5, scale - 0.1); update(); };
  window.rotate = () => { angle += 90; update(); };
  window.flip = () => { flipped = !flipped; update(); };
  window.invert = () => { inverted = !inverted; update(); };
  window.brighten = () => { brightness += 10; update(); };
  window.darken = () => { brightness = Math.max(50, brightness - 10); update(); };

  window.reset = () => {
    scale = 1; angle = 0; flipped = false;
    inverted = false; brightness = 100;
    translateX = 0; translateY = 0;
    update();
  };

  window.markReviewed = () => {
    document.getElementById("reviewStatus").innerText = "Status: Reviewed";
  };

  window.lockStudy = () => alert("Study locked (demo)");

  window.panMode = () => {
    isPanning = !isPanning;
    img.style.cursor = isPanning ? "grabbing" : "default";
  };

  img.onmousedown = e => {
    if (!isPanning) return;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    document.onmousemove = ev => {
      translateX = ev.clientX - startX;
      translateY = ev.clientY - startY;
      update();
    };
  };

  document.onmouseup = () => document.onmousemove = null;

});




