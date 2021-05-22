const Archive = function (archiveName) {
  this.archiveName = archiveName || 'New Archive'
  this.archivesList = []
  this.unclassified = []
}

const defaultArchive = {
  id: 1,
  archiveName: 'root',
  archivesList: [
    {
      id: 2,
      archiveName: 'frontend',
      archivesList: ['scss'],
      unclassified: [
        {
          id: 4,
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
      id: 3,
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
      icon: 'https://www.google.com/favicon.ico',
      createdAt: '2021/03/03',
      updatedAt: '2021/03/03',
      finishReading: false,
      tags: []
    },
    {
      id: 2,
      title: 'Youtube',
      url: 'https://www.youtube.com/',
      icon: 'https://www.youtube.com/s/desktop/df22805b/img/favicon_32.png',
      createdAt: '2021/03/03',
      updatedAt: '2021/03/03',
      finishReading: false,
      tags: []
    },
    {
      id: 3,
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

/////////////// 
chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled: Service worker working...')

  chrome.storage.sync.set({ defaultArchive }, () => {
    console.log('defaultArchive set!')
  });
  chrome.tabs.create({ url: "index.html" })
});

chrome.runtime.onStartup.addListener(() => {
  console.log('on Startup!')
})