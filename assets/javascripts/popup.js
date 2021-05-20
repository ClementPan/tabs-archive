const popup = document.getElementById('popup')

const popupClickHandler = () => {
  chrome.tabs.create({ url: "index.html" });
}

popup.addEventListener('click', popupClickHandler)