const openBtn = document.getElementById('open')
const getAll = document.getElementById('getAll')

const openTabsArchive = () => {
  chrome.tabs.create({ url: "index.html" });
}
const getAllTabs = () => {
  chrome.tabs.query({}, (data) => {
    const tabs = []
    for (let tab of data) {
      const { favIconUrl: icon, title, url } = tab
      tabs.push({ icon, title, url })
    }
  })
  // get storage defaultArchive

  // add new tabs to root.unclassified

  // store defaultArchive to storage
  // chrome.storage.sync.set({ defaultArchive }, () => {
  //   console.log('defaultArchive set!')
  // });
  // open index.html
  // chrome.tabs.create({ url: "index.html" });
}

openBtn.addEventListener('click', openTabsArchive)
getAll.addEventListener('click', getAllTabs)