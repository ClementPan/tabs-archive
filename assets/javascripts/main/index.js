// Archive proto
const ArchiveData = function (archiveName) {
  this.archiveName = archiveName || 'New Archive'
  this.archivesList = []
  this.unclassified = []
}

const model = {
  createNewArhiveDOM(archiveName) {
    const archive = document.createElement('div')
    archive.innerHTML = `
      <i class="fas fa-caret-right closed"></i>
      <p>${archiveName}</p>
      <i class="fas fa-plus new"></i>
    `
    archive.classList = 'archive-style'
    return archive
  },
  createTabInContent(tabData) {
    const { title, url, icon, createdAt, id, tags, updatedAt } = tabData
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
  }
}

const view = {
  showDataInContent(data) {
    const content = document.querySelector('.content')
    content.innerText = JSON.stringify(data)
  },
  showRootArchiveList(list) {
    const archivesList = document.querySelector('.archivesList')
    for (item of list) {
      const newArchive = model.createNewArhiveDOM(item.archiveName)
      archivesList.appendChild(newArchive)
    }
  }
}

const controller = {
  async initArchiveData() {
    try {
      const data = await model.getDefaultArchive()
      view.showDataInContent(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  },
  async setRootArchiveList() {
    try {
      const { defaultArchive } = await model.getDefaultArchive()
      const { archivesList } = defaultArchive
      view.showRootArchiveList(archivesList)
      console.log(defaultArchive)
    } catch (error) {
      console.log(error)

    }
  }
}

// controller.initArchiveData()
controller.setRootArchiveList()