// Dismiss warning container and save it's state in localStorage
async function dismissWarningContainer() {
  if (window.localStorage.getItem('isClosed') != "true") {
    window.localStorage.setItem('isClosed', "true");
  }
  document.getElementById("warningCont").style.opacity = "0";
  await new Promise(r => setTimeout(r, 410));
  document.getElementById("warningCont").remove();
}

/*
  Check for dismiss status of warning container:

  null - initialize dismiss status and save it in localStorage (Also set opacity for warning container elements to 1)
  true - delete warning container from DOM
  false - set opacity for warning container elements to 1
*/
function checkForDismiss(dismissStatus) {
  switch (dismissStatus) {
    case null:
      window.localStorage.setItem('isClosed', "false");
      document.getElementById("warningCont-elements").style.opacity = "1";
      break;
    case "true":
      document.getElementById("warningCont").remove();
      break;
    case "false":
      document.getElementById("warningCont-elements").style.opacity = "1";
      break;
    default:
      break;
  }
}

// Change favicons depending on current theme
function changeFavicons() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("link[rel='apple-touch-icon']").setAttribute("href", "favicons/main/dark/apple-touch-icon.png");
    document.querySelector("link[sizes='32x32']").setAttribute("href", "favicons/main/dark/favicon-32x32.png");
    document.querySelector("link[sizes='16x16']").setAttribute("href",  "favicons/main/dark/favicon-16x16.png");
    document.querySelector("link[rel='manifest']").setAttribute("href",  "favicons/main/dark/site.webmanifest");
    document.querySelector("link[rel='mask-icon']").setAttribute("href", "favicons/main/dark/safari-pinned-tab.svg");
    document.querySelector('link[rel="mask-icon"]').setAttribute("color", "#e6739f");
    document.querySelector("link[rel='shortcut icon']").setAttribute("href", "favicons/main/dark/favicon.ico");
    document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content", "#e6739f");
    document.querySelector('meta[name="msapplication-config"]').setAttribute("content", "favicons/main/dark/browserconfig.xml");
  }
  else {
    document.querySelector("link[rel='apple-touch-icon']").setAttribute("href", "favicons/main/light/apple-touch-icon.png");
    document.querySelector("link[sizes='32x32']").setAttribute("href", "favicons/main/light/favicon-32x32.png");
    document.querySelector("link[sizes='16x16']").setAttribute("href",  "favicons/main/light/favicon-16x16.png");
    document.querySelector("link[rel='manifest']").setAttribute("href",  "favicons/main/light/site.webmanifest");
    document.querySelector("link[rel='mask-icon']").setAttribute("href", "favicons/main/light/safari-pinned-tab.svg");
    document.querySelector('link[rel="mask-icon"]').setAttribute("color", "#b91d47");
    document.querySelector("link[rel='shortcut icon']").setAttribute("href", "favicons/main/light/favicon.ico");
    document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content", "#b91d47");
    document.querySelector('meta[name="msapplication-config"]').setAttribute("content", "favicons/main/light/browserconfig.xml");
  }
}

// Move to certain element on page without changing URL (Default anchors replacement)
function scrollToElement(divID) {
  const divElement = document.getElementById(divID);
  divElement.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });
}

// Event listener for scrolling. Control hiding "Scroll down" container
window.addEventListener("scroll", () => {
  const scrollCheckpoint = 600;
  const currentScroll = window.pageYOffset;
  if (currentScroll <= scrollCheckpoint) {
    opacity = 1 - currentScroll / scrollCheckpoint;
  } else {
    opacity = 0;
  }
  document.getElementById("scrollTip").style.opacity = opacity;
});

// Event listener for theme switch. Control favicons change
window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener('change', event => {
  changeFavicons();
  if (!event.matches) {
    console.info("Favicons have been successfully replaced with a light version");
  }
  else {
    console.info("Favicons have been successfully replaced with a dark version");
  }
});

// Onload function. Execute favicons change, check for dismiss status and set opacity of elements of main container to 1
window.onload = function () {
  changeFavicons();
  checkForDismiss(window.localStorage.getItem('isClosed'));
  document.getElementById("mainCont-elements").style.opacity = "1";
}
