const openBtn = document.getElementById('open')
const getAll = document.getElementById('getAll')

const openTabsArchive = () => {
  console.log('Click openTabsArchive')
  chrome.runtime.openOptionsPage()
}

const getAllTabs = () => {
  // to be finished
  console.log('Click getAllTabs')
  chrome.tabs.query({}, (data) => {
    const tabs = []
    for (let tab of data) {
      console.log('tab: ', tab)
      const { favIconUrl: icon, title, url } = tab
      // send to index.html
      tabs.push({ icon, title, url })
    }
  })
}

openBtn.addEventListener('click', openTabsArchive)
getAll.addEventListener('click', getAllTabs)