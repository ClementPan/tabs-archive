import '../styles/normalize.scss'
import '../styles/application.scss'
import '../styles/index.scss'

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
    // console.log(target.parentElement.parentElement)
    const archiveId = target.dataset.id
    controller.openAllTabs(archiveId)
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

  if (target.className === 'delete-all') {
    console.log()
    const archiveId = target.dataset.id
    controller.deleteAllTabs(archiveId)
  }

  if (target.className.includes('new')) {
    controller.showNewArchiveInput()
  }

  if (target.className === 'fas fa-times-circle') {
    controller.cancelInput()
  }

  // console.log(target)
  if (target.classList.contains('new-archive-name-input')) {
    controller.createNewArchive()
  }

  // for developing
  if (target.className === 'get-data') {
    controller.showStorage('archive')
  }

  if (target.className === 'clear-data') {
    controller.clearStorage()
  }
}, true)