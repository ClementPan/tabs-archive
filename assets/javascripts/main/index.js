// const { uuid } = '../../../package-lock.json/';

// Archive proto
const ArchiveData = function (archiveName) {
  this.archiveName = archiveName || 'New Archive'
  this.archivesList = []
  this.unclassified = []
}

const TabData = function (title, url, icon, createdAt, updatedAt, tags) {
  this.id = uuid()
  this.title = title
  this.url = url
  this.icon = icon
  this.createdAt = createdAt
  this.updatedAt = updatedAt
  this.finishReading = false
  this.tags = tags
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
          <p>${icon}</p>
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
        chrome.tabs.query({}, (data) => {
          const tabs = []
          for (let tab of data) {
            const { favIconUrl: icon, title, url } = tab
            tabs.push({ icon, title, url })
          }
          return resolve(tabs)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
}

const view = {
  showTabsInContent(data) {
    const tabsList = document.querySelector('.tabs-list')
    const { unclassified } = data.defaultArchive
    for (let tab of unclassified) {
      console.log(tab)
      const newTab = model.createTabDOMInContent(tab)
      tabsList.appendChild(newTab)
    }
  },
  showRootArchiveList(list) {
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
      // get storage defaultArchive
      const archive = await model.getDefaultArchive()
      console.log(archive)

      // add new tabs to root.unclassified

      // store defaultArchive to storage
      // chrome.storage.sync.set({ defaultArchive }, () => {
      //   console.log('Archive stored!')
      // });
      // open index.html
      // chrome.tabs.create({ url: "index.html" });


    } catch (error) {
      console.log(error)
    }
  },
  async initArchiveData() {
    try {
      const data = await model.getDefaultArchive()
      view.showTabsInContent(data)
    } catch (error) {
      console.log(error)
    }
  },
  async setRootArchiveList() {
    try {
      const { defaultArchive } = await model.getDefaultArchive()
      const { archivesList } = defaultArchive
      view.showRootArchiveList(archivesList)
    } catch (error) {
      console.log(error)

    }
  }
}

controller.getAllTabs()
controller.initArchiveData()
controller.setRootArchiveList()