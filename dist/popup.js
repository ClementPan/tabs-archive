const methods = {
  openTabsArchive() {
    chrome.runtime.openOptionsPage()
  },

  getAllTabs() {
    // to be finished
    // chrome.tabs.query({}, (data) => {
    //   const tabs = []
    //   for (let tab of data) {
    //     console.log('tab: ', tab)
    //     const { favIconUrl: icon, title, url } = tab
    //     // send to index.html
    //     tabs.push({ icon, title, url })
    //   }
    // })
    controller.getAllOpenedTabs()
  },

  close() {
    window.close()
  }
}


window.addEventListener('click', (e) => {
  const target = e.target
  if (target.className === 'open') {
    methods.openTabsArchive()
  }

  if (target.className === 'get-all') {
    methods.getAllTabs()
  }

  if (target.className === 'close') {
    methods.close();
  }
})