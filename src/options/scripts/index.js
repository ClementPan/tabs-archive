// css bundle
import '../styles/application.scss'
import '../styles/index.scss'
import '../styles/normalize.scss'

import { data } from './data.js'
import { controller } from './controller.js'

window.onload = function () {
  console.log('[Index] Index.html loaded! Ask for archive data!')
  const request = {
    message: 'get-archive-data',
    data: null
  }
  chrome.runtime.sendMessage(request, (response) => {
    console.log('[Index] received archive data', response)
    const { archive, lastTabId, lastArchiveId } = response
    data.lastTabId = lastTabId
    data.lastArchiveId = lastArchiveId
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
    console.log(target.parentElement.parentElement)
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