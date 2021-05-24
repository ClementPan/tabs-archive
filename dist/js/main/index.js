// const { uuid } = '../../../node_modules/uuidv4' //to be fixed

// Archive proto
const ArchiveData = function (archiveName) {
  this.archiveName = archiveName || 'New Archive'
  this.archivesList = []
  this.unclassified = []
}

const TabData = function (id, icon, title, tags, createdAt, url, updatedAt) {
  this.id = id
  this.title = title
  this.url = url
  this.icon = icon
  this.createdAt = createdAt
  this.updatedAt = updatedAt
  this.finishReading = false
  this.tags = tags
}

const data = {
  archive: {},
  lastTabId: ''
}

const utils = {
  idFormatter: function (num) {
    num = num + ''
    let output = num.split('')
    if (num.length < 5) {
      for (let i = 0; i < 5 - num.length; i++) {
        output.unshift('0')
      }
    }
    return output.join('')
  }
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
        <div class='btn'>
          <button class='open-tab' data-url="${url}">
            Open
          </button>
        </div>
        <div class='btn'>
          <button class='delete-tab' data-tabid="${id}">
            Delete
          </button>
        </div>
      </div>
    `
    tab.classList += 'tab tab-style'
    return tab
  },
  async getStorageData(targetData) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get([targetData], (data) => {
          return resolve(data)
        })
      } catch (error) {
        console.log('reject!')
        reject(error)
      }
    })
  },
  async getAllOpenedTabs() {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query({ active: false }, (queryResult) => {
          const tabs = []
          for (let tab of queryResult) {
            // console.log(tab)
            if (
              (tab.title === "chrome.tabs - Chrome Developers") ||
              (tab.url === "chrome://extensions/") ||
              (tab.url.split('://')[0] === 'chrome-extension')) {
              console.log('continue on ' + tab.title)
              continue
            }
            // clear
            chrome.tabs.remove(tab.id)

            // form tabData
            const { favIconUrl: icon, title, url } = tab
            const createdAt = new Date().toLocaleDateString('zh-tw')
            const updatedAt = new Date().toLocaleDateString('zh-tw')
            const tags = []

            // set id
            data.lastTabId++
            const id = utils.idFormatter(data.lastTabId)

            tabs.push(new TabData(id, icon, title, tags, createdAt, url, updatedAt))
          }
          return resolve(tabs)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  storeArchive() {
    // store defaultArchive to storage
    const { archive } = data
    archive.archiveName = 'root-archive'
    const request = {
      message: 'store-archive',
      data: archive
    }

    chrome.runtime.sendMessage(request, (message) => {
      console.log('[Index] ', message)
    });
  },
  removeTab(archive, tabId) {
    const targetId = tabId

    const removeTabById = (archive, targetId) => {
      if (!archive.unclassified.length) {
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            removeTabById(subArchive, targetId)
          }
        }
      } else {
        for (let tab of archive.unclassified) {
          if (tab.id === targetId) {
            const index = archive.unclassified.indexOf(tab)
            archive.unclassified.splice(index, 1)
          }
        }
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            removeTabById(subArchive, targetId)
          }
        }
      }
    }
    removeTabById(archive, targetId)
    return archive
  }
}

const view = {
  showTabsInContent(data) {
    // data: root.unclassified
    const tabsList = document.querySelector('.tabs-list')
    tabsList.innerHTML = ''
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
  },
  removeTab(tabBar) {
    tabBar.classList += ' none'
  }
}

const controller = {
  async getAllOpenedTabs() {
    try {
      // get all active tabs
      const activeTabs = await model.getAllOpenedTabs()

      // add new tabs to root.unclassified
      for (let tab of activeTabs) {
        data.archive.unclassified.push(tab)
      }

      // change view
      const { unclassified } = data.archive
      view.showTabsInContent(unclassified)

      // store defaultArchive to storage
      model.storeArchive()
    } catch (error) {
      console.log(error)
    }
  },
  initLocalArchiveData(response) {
    // store it to local data
    data.archive = response

    const { unclassified } = data.archive
    view.showTabsInContent(unclassified)

    const { archivesList } = data.archive
    view.showRootArchiveList(archivesList)
  },
  deleteTab(target, archive, tabId) {
    // remove tab from data.archive
    data.archive = model.removeTab(data.archive, tabId)

    // rerender view
    view.removeTab(target)

    // store archive to storage
    model.storeArchive()
  },
  //  developing methods
  clearStorage() {
    chrome.storage.sync.clear(() => {
      console.log('Storage cleared!')
    })
  },
  showStorage() {
    chrome.storage.sync.get(['archive'], (data) => {
      console.log(data)
    })
  }
}

// controller.setRootArchiveList()
// controller.clearStorage()

window.onload = function () {
  console.log('[Index] Index.html loaded! Ask for archive data!')
  const request = {
    message: 'get-archive-data',
    data: null
  }
  chrome.runtime.sendMessage(request, (response) => {
    console.log('[Index] received archive data', response)
    const { archive, lastTabId } = response
    data.lastTabId = lastTabId
    // console.log('data.lastTabId: ' + data.lastTabId)
    controller.initLocalArchiveData(archive)
  });
}

// eventListener
window.addEventListener('click', (e) => {
  const target = e.target
  // console.log(target)

  if (target.className === 'get-all-btn') {
    controller.getAllOpenedTabs()
  }

  if (target.className === 'open-all') {
    console.log(target.parentElement)
  }

  if (target.className === 'open-tab') {
    const url = target.dataset.url
    chrome.tabs.create({ url, active: false })
  }

  if (target.className === 'delete-tab') {
    const tabId = target.dataset.tabid
    const tabBar = target.parentElement.parentElement
    controller.deleteTab(tabBar, data.archive, tabId)
  }

  if (target.className === 'get-data') {
    controller.showStorage('archive')
  }

  if (target.className === 'clear-data') {
    controller.clearStorage()
  }
})