const { uuid } = '../../../node_modules/uuidv4' //to be fixed

// Archive proto
const ArchiveData = function (archiveName) {
  this.archiveName = archiveName || 'New Archive'
  this.archivesList = []
  this.unclassified = []
}

const TabData = function (title, url, icon, createdAt, updatedAt, tags) {
  this.id = NaN
  this.title = title
  this.url = url
  this.icon = icon
  this.createdAt = createdAt
  this.updatedAt = updatedAt
  this.finishReading = false
  this.tags = tags
}

const data = {
  archive: {}
}

const model = {
  createArhiveDOMInSidebar(archiveName) {
    const archive = document.createElement('div')
    archive.innerHTML = `
      <i class="fas fa-caret-right closed"></i>
      <p>${archiveName}</p>
      <i class="fas fa-plus new"></i>
    `
    archive.classList = 'archive-style'
    return archive
  },
  createArchiveDOMInContent() { },
  createTabDOMInContent(tabData) {
    const { createdAt, finishReading, icon, id, tags, title, updatedAt, url } = tabData
    const tab = document.createElement('div')
    tab.innerHTML = `
      <div class='number'>
          <p>${id}</p>
        </div>
        <div class='icon'>
          <img src="${icon}" alt="">
        </div>
        <div class='title'>
          <p>${title}</p>
        </div>
        <div class='tags'>
          <p>${tags}</p>
        </div>
        <div class='createdAt'>
          <p>${createdAt}</p>
        </div>
        <div class='open-btn'>
          <a href="${url}" target="_blank">
            <p>Open</p>
          </a>
        </div>
        <div class='delete-btn'>
          <p>Delete</p>
        </div>
      </div>
    `
    tab.classList += 'tab tab-style'
    return tab
  },
  async getDefaultArchive() {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(["defaultArchive"], (data) => {
          return resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  async getAllTabs() {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query({ active: false }, (data) => {
          const tabs = []
          for (let tab of data) {
            const { favIconUrl: icon, title, url } = tab
            const createdAt = new Date().toLocaleDateString('zh-tw')
            const updatedAt = new Date().toLocaleDateString('zh-tw')
            const tags = []
            tabs.push(new TabData(title, url, icon, createdAt, updatedAt, tags))
          }
          return resolve(tabs)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  storeArchiveToStorage(archive) {
    chrome.storage.sync.set({ archive }, () => {
      console.log('Archive stored!')
    });
  }
}

const view = {
  showTabsInContent(data) {
    // data: root.unclassified
    const tabsList = document.querySelector('.tabs-list')
    for (let tab of data) {
      const newTab = model.createTabDOMInContent(tab)
      tabsList.appendChild(newTab)
    }
  },
  showRootArchiveList(list) {
    // list: root.archivesList
    const archivesList = document.querySelector('.archivesList')
    for (let item of list) {
      const newArchive = model.createArhiveDOMInSidebar(item.archiveName)
      archivesList.appendChild(newArchive)
    }
  }
}

const controller = {
  async getAllTabs() {
    try {
      // get all active tabs
      const activeTabs = await model.getAllTabs()
      console.log(activeTabs)
      // return

      // add new tabs to root.unclassified
      for (let tab of activeTabs) {
        data.archive.unclassified.push(tab)
      }

      // change view
      const { unclassified } = data.archive
      view.showTabsInContent(unclassified)

      // store defaultArchive to storage
      const { archive } = data
      model.storeArchiveToStorage(archive)
    } catch (error) {
      console.log(error)
    }
  },
  async initLocalArchiveData() {
    try {
      // get chrome storage data
      const { defaultArchive } = await model.getDefaultArchive()

      // store it to local data
      data.archive = defaultArchive
      // console.log(data)

      const { unclassified } = data.archive
      view.showTabsInContent(unclassified)

      const { archivesList } = data.archive
      view.showRootArchiveList(archivesList)

      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  },
  clearStorage() {
    chrome.storage.sync.clear(() => {
      console.log('Storage cleared!')
    })

  }
}

controller.initLocalArchiveData()
// controller.setRootArchiveList()

// controller.clearStorage()

// eventListener
window.addEventListener('click', (e) => {
  const target = e.target
  if (target.className === 'get-all-btn') {
    controller.getAllTabs()
  }
})