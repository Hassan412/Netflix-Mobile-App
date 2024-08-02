function hideSiblings(element) {
  let sibling = element.parentNode.firstChild;

  while (sibling) {
    if (sibling !== element && sibling.nodeType === 1) {
      sibling.style.display = "none";
    }
    sibling = sibling.nextSibling;
  }
}

function hideAncestorsSiblings(element) {
  while (element) {
    hideSiblings(element);
    element = element.parentNode;
  }
}
document.body.style.background = "black"
const watch = document.querySelector("#watch");
const playNowElement = document.querySelector<HTMLDivElement>("#play-now");

if (playNowElement) {
  hideAncestorsSiblings(playNowElement,watch);

  playNowElement.style.display = "flex";
  playNowElement.style.height = "100vh"
  playNowElement.style.width = "100vw"
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  watch.querySelectorAll("*").forEach((child) => {
    child.style.display = "block";
  });
  playNowElement.querySelectorAll("*").forEach((child) => {
    child.style.display = "block";
  });
}
