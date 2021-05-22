const Archive = function (archiveName) {
  this.archiveName = archiveName || 'New Archive'
  this.archivesList = []
  this.unclassified = []
}

const defaultArchive = {
  archiveName: 'root',
  archivesList: [
    {
      archiveName: 'frontend',
      archivesList: ['scss'],
      unclassified: [
        {
          id: 4,
          title: 'Vue.js doc',
          url: 'https://vuejs.org/v2/api/',
          icon: '',
          createdAt: 'time',
          updatedAt: 'time',
          finishReading: false,
          tags: []
        }
      ]
    },
    {
      archiveName: 'back-end',
      archivesList: [],
      unclassified: []
    }
  ],
  unclassified: [
    {
      id: 1,
      title: 'Google',
      url: 'https://www.google.com',
      icon: '',
      createdAt: 'time',
      updatedAt: 'time',
      finishReading: false,
      tags: []
    },
    {
      id: 2,
      title: 'Youtube',
      url: 'https://www.youtube.com/',
      icon: '',
      createdAt: 'time',
      updatedAt: 'time',
      finishReading: false,
      tags: []
    },
    {
      id: 3,
      title: 'DeepL',
      url: 'https://www.deepl.com/translator',
      icon: '',
      createdAt: 'time',
      updatedAt: 'time',
      finishReading: false,
      tags: []
    }
  ]
}

/////////////// 
chrome.runtime.onInstalled.addListener(() => {
  console.log('Service worker working...')
  chrome.storage.sync.set({ defaultArchive }, () => {
    console.log('defaultArchive set!')
  });
  chrome.tabs.create({ url: "index.html" })
});