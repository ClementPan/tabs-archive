import '../styles/normalize.scss'
import '../styles/application.scss'
import '../styles/index.scss'

import { data } from './data.js'
import { controller } from './controller.js'
import { view } from './view'

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

    // setup drop item & drop zone
    controller.setUpDragAndDropSystem()
  });
}

// click eventListener
window.addEventListener('click', (e) => {
  const target = e.target

  // cancel show input
  // controller.cancelNewArchiveInput()

  // get all opened tabs
  if (target.className === 'get-all-btn') {
    controller.getAllOpenedTabs()
  }

  // oepn all tabs in archive
  if (target.classList.contains('open-all')) {
    const archiveId = target.dataset.id
    if (target.classList.contains('on-search')) {
      controller.openAllSearchTabs()
      return
    }
    controller.openAllTabs(archiveId)
    return
  }

  // open cetain tab in archive
  if (target.className === 'open-tab') {
    const url = target.dataset.url
    chrome.tabs.create({ url, active: false })
  }

  // show new archive input
  if (target.classList.contains('show-new-archive-input')) {
    controller.showNewArchiveInput()
  }

  // cancel new archive input
  if (target.classList.contains('cancel-new-archive-input')) {
    controller.cancelNewArchiveInput()
  }

  // create new archive
  if (target.classList.contains('new-archive-name-input')) {
    controller.createNewArchive()
  }

  // show edit tab name input
  if (target.classList.contains('show-edit-tab-name')) {
    const targetTabDOM = target.parentElement.parentElement
    controller.showTabNameEditInput(targetTabDOM)
  }

  // cancel edit tab name
  if (target.classList.contains('cancel-edit-tab-input')) {
    const targetTabDOM = target.parentElement.parentElement
    controller.cancelEditTabInput(targetTabDOM)
  }

  // update tab name
  if (target.classList.contains('confirm-tab-edit')) {
    const targetTabDOM = target.parentElement.parentElement
    controller.updateTabName(targetTabDOM)
  }

  // show edit archive name in content
  if (target.classList.contains('edit-archive-title-content')) {
    const titleDOM = target.parentElement
    controller.showEditArchiveInputContent(titleDOM)
  }

  // cancel edit archive name in content
  if (target.classList.contains('cancel-edit-archive-title-content')) {
    const titleDOM = target.parentElement
    controller.cancelEditArchiveInputContent(titleDOM)
  }

  // update archive name in content
  if (target.classList.contains('confirm-archive-title-content-input')) {
    const titleDOM = target.parentElement
    controller.updateArchiveTitleContent(titleDOM)
  }

  // show edit-archive-sidebar
  if (target.classList.contains('edit-archive-sidebar')) {
    console.log('show archive edit sidebar')
    const titleDOM = target.parentElement.parentElement
    controller.showEditArchiveSidebar(titleDOM)
  }

  // cancel
  if (target.classList.contains('cancel-new-archive-input-sidebar')) {
    console.log('cancel archive edit sidebar')
    const titleDOM = target.parentElement.parentElement
    controller.cancelNewArchiveInputSidebar(titleDOM)
  }

  // delete one certain tab in archive
  if (target.className === 'delete-tab') {
    const tabId = target.dataset.tabid
    const tabBar = target.parentElement.parentElement
    controller.deleteTab(tabBar, tabId)
  }

  // delete certain archive from sidebar
  if (target.classList.contains('delete-archive')) {
    const archiveBar = target.parentElement.parentElement.parentElement
    const targetArchiveId = target.dataset.id
    controller.deleteArchive(archiveBar, targetArchiveId)
  }

  // delete all unclassified tabs in certain archive
  if (target.className === 'delete-all-in-archive') {
    const archiveId = target.dataset.id
    console.log('archiveId: ' + archiveId)
    controller.deleteAllTabsInArchive(archiveId)
  }

  // cacnel tabs search
  if (target.classList.contains('cancel-search')) {
    const searchBar = target.parentElement
    searchBar.querySelector('input').value = ''

    // cancel search
    controller.cancelSearch()
  }

  if (target.className === 'brand-title') {
    controller.cancelSearch()
  }

  ///// for developing /////
  if (target.className === 'get-data') {
    controller.showStorage('archive')
  }

  if (target.className === 'clear-data') {
    controller.clearStorage()
  }
}, false)
// false = event.preventDefault()
// to stop bubbling: event.stopPropagation()


// KeyboardEvent eventListener
window.addEventListener('keyup', (e) => {
  const target = e.target

  // input new archive name
  if (target.id === 'archiveName-input') {
    if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
      controller.createNewArchive()
    }
  }

  // input update tab name
  // if (target.classList.contains('edit-tab-name-input')) {
  //   if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
  //     const targetTabDOM = target.parentElement.parentElement
  //     controller.updateTabName(targetTabDOM)
  //   }
  // }

  // unput update archive name
  // if (target.classList.contains('archive-title-input-content')) {
  //   if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
  //     const titleDOM = target.parentElement
  //     controller.updateArchiveTitleContent(titleDOM)
  //   }
  // }

  // input tabs search input
  if (target.classList.contains('tabs-search-input')) {
    // if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
    const queryBody = target.value
    if (!queryBody) {
      console.log('NO queryBody!')
      controller.cancelSearch()
      return
    }
    controller.searchTab(queryBody)
    // }
  }
})