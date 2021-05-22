const openBtn = document.getElementById('open')
const getAll = document.getElementById('getAll')

const openTabsArchive = () => {
  chrome.runtime.openOptionsPage()
}

const getAllTabs = () => {
  return
  // to be fixed
  chrome.tabs.query({}, (data) => {
    const tabs = []
    for (let tab of data) {
      const { favIconUrl: icon, title, url } = tab
      tabs.push({ icon, title, url })
    }
  })

}

openBtn.addEventListener('click', openTabsArchive)
getAll.addEventListener('click', getAllTabs)