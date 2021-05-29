const data = {
  Archive: function (archiveName) {
    this.archiveName = archiveName || 'New Archive'
    this.archivesList = []
    this.unclassified = []
  },
  archive: {
    id: '001',
    archiveName: 'defaultArchive',
    archivesList: [
      {
        id: '002',
        archiveName: 'frontend',
        archivesList: [],
        unclassified: [
          {
            id: '00004',
            title: 'Vue.js doc',
            url: 'https://vuejs.org/v2/api/',
            icon: '',
            createdAt: '2021/03/03',
            updatedAt: '2021/03/03',
            finishReading: false,
            tags: []
          }
        ]
      },
      {
        id: '003',
        archiveName: 'back-end',
        archivesList: [],
        unclassified: []
      }
    ],
    unclassified: [
      {
        id: '00001',
        title: 'Google',
        url: 'https://www.google.com',
        icon: 'https://www.google.com/favicon.ico',
        createdAt: '2021/03/03',
        updatedAt: '2021/03/03',
        finishReading: false,
        tags: []
      },
      {
        id: '00002',
        title: 'Youtube',
        url: 'https://www.youtube.com/',
        icon: 'https://www.youtube.com/s/desktop/df22805b/img/favicon_32.png',
        createdAt: '2021/03/03',
        updatedAt: '2021/03/03',
        finishReading: false,
        tags: []
      },
      {
        id: '00003',
        title: 'DeepL',
        url: 'https://www.deepl.com/translator',
        icon: 'https://www.deepl.com/img/favicon/favicon_32.png',
        createdAt: '2021/03/03',
        updatedAt: '2021/03/03',
        finishReading: false,
        tags: []
      }
    ]
  }
}

/////////////// methods
const methods = {
  getLastTabId: function (data) {
    let tabId = 0
    const archive = data

    const findLastTabId = (archive) => {
      if (!archive.unclassified.length) {
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findLastTabId(subArchive)
          }
        }
      } else {
        for (let tab of archive.unclassified) {
          if (tabId < + tab.id) {
            tabId = + tab.id
          }
        }
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findLastTabId(subArchive)
          }
        }
      }
    }

    findLastTabId(archive)
    return tabId
  },
  getLastArchiveId(data) {
    let archiveId = 0
    const archive = data

    const findLastArchiveId = (archive) => {
      if (archiveId < + archive.id) {
        archiveId = + archive.id
      }

      if (!archive.archivesList.length) {
        return
      } else {
        for (let subArchive of archive.archivesList) {
          if (archiveId < + subArchive.id) {
            archiveId = + subArchive.id
          }
          if (!subArchive.archivesList.length) {
            continue
          } else {
            for (let innerArchive of subArchive.archivesList) {
              findLastArchiveId(innerArchive)
            }
          }
        }
      }
    }

    findLastArchiveId(archive)
    return archiveId
  },
  getStorageData: async function (archive) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(archive)
        // chrome.storage.sync.get([archive], (data) => {
        chrome.storage.local.get([archive], (data) => {
          // console.log(data)
          return resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  setStorageData: async function (archive) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(archive)
        // chrome.storage.sync.set({ archive }, () => {
        chrome.storage.local.set({ archive }, () => {
          console.log('Archive data set!')
          return resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  sendArchiveData: async function (sendResponse) {
    try {
      let { archive } = await methods.getStorageData('archive')
      // console.log(archive)
      if (!archive) {
        console.log('[background] No previous archive data')
        await this.setStorageData(data.archive)
        archive = data.archive
      }
      // console.log(archive)

      // get tabs count
      const lastTabId = methods.getLastTabId(archive)
      const lastArchiveId = methods.getLastArchiveId(archive)
      const response = {
        archive, lastTabId, lastArchiveId
      }

      sendResponse(response)
    } catch (error) {
      console.log(error)
    }
  },
  sendNotification: function (archive, sendResponse) {
    console.log('[background] storing data to archive...')
    // console.log(archive)
    this.setStorageData(archive)
    sendResponse('Archive stored!')
  }
}

// onInstalled:
chrome.runtime.onInstalled.addListener(() => {
  console.log('[Background] Service worker working...')
  // open index.html
  chrome.tabs.create({ url: "index.html" })
});

// onMessage:
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { message, data } = request
  console.log('[Background] Got message: ' + message)

  if (message === 'get-archive-data') {
    methods.sendArchiveData(sendResponse)
    return true
  }

  if (message === 'store-archive') {
    methods.sendNotification(data, sendResponse)
    return true
  }
});

// error
// chrome.runtime.lastError(error => console.error(error))