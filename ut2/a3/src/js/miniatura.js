function init() {
  let imgDefer = document.getElementsByTagName("img");
  for (let i = 0; i < imgDefer.length; i++) {
    if (imgDefer[i].getAttribute("data-src")) {
      imgDefer[i].setAttribute("src", imgDefer[i].getAttribute("data-src"));
    }
  }
}

window.onload = init;
