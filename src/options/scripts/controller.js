import { model } from './model.js'
import { view } from './view.js'
import { data } from './data.js'

export const controller = {
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
  openAllTabs(archiveId) {
    const { unclassified } = model.searchArchiveById(data.archive, archiveId)
    unclassified.forEach(each => {
      const url = each.url
      chrome.tabs.create({ url, active: false })
    });
  },
  deleteTab(target, tabId) {
    // target: DOM elemnt

    // return newArchive with target tab
    const newArchive = model.removeTab(data.archive, tabId)

    // update archive
    data.archive = newArchive

    // rerender view
    view.removeTab(target)

    // store archive to storage
    model.storeArchive()
  },
  deleteAllTabsInArchive(archiveId) {
    // check: if is already empty
    const className = `.archive-${archiveId}-content .tabs-list .tab`
    const tabItems = document.querySelectorAll(className)
    if ((tabItems.length === 1) && (tabItems[0].classList.contains('empty'))) {
      return
    }

    // remove tab
    const newArchive = model.clearTabsInArchiveById(data.archive, archiveId)

    // update archive
    data.archive = newArchive

    // rerender view
    view.clearTabsInArchive(archiveId)

    // store archive to storage
    model.storeArchive()
  },
  deleteArchive(archiveBar, archiveId) {
    // return newArchive with target archive
    const newArchive = model.removeArchive(data.archive, archiveId)

    // update archive
    data.archive = newArchive

    // rerender view, both in sidebar & content (need archiveId)
    view.removeArchive(archiveBar, archiveId)

    // store archive to storage
    model.storeArchive()
  },
  // creating new archive
  showNewArchiveInput() {
    view.showNewArchiveInput()
  },
  createNewArchive() {
    // get user input
    const archiveName = document.getElementById('archiveName-input').value

    // no empty input allowed
    if (!archiveName) {
      view.cancelNewArchiveInput()
      console.log('No empty input allowed!')
      return
    }

    // creat archive data, add new archive in data
    // newArchive: data
    const newArchive = model.createNewArchiveInData(archiveName)

    // rerender view
    view.createNewArchiveInSidebar(newArchive)
    view.createNewArchiveInContent(newArchive)

    // store archive to storage
    model.storeArchive()

    // restore UI
    view.cancelNewArchiveInput()

    return
  },
  cancelNewArchiveInput() {
    view.cancelNewArchiveInput()
  },
  // editing tab name(title)
  showTabNameEditInput(targetTabDOM) {
    view.showTabNameEditInput(targetTabDOM)
    return
  },
  cancelEditTabInput(targetTabDOM) {
    view.cancelEditTabInput(targetTabDOM)
  },
  updateTabName(targetTabDOM) {
    // get user input
    const tabId = targetTabDOM.dataset.id
    const tabNameInput = targetTabDOM.querySelector('.title input').value

    // check
    const originalTitle = targetTabDOM.querySelector('.title p').textContent
    if (originalTitle === tabNameInput) {
      view.cancelEditTabInput(targetTabDOM)
      return
    }


    // find tab in archive via tabId, update it
    model.updateTab(data.archive, tabId, tabNameInput)

    // rerender view 
    view.updateTabName(targetTabDOM, tabNameInput)

    // store archive to storage
    model.storeArchive()

    // restore UI
    view.cancelEditTabInput(targetTabDOM)

    return
  },
  // editing archive title
  showEditArchiveInputContent(targetTabDOM) {
    view.showEditArchiveInputContent(targetTabDOM)
  },
  cancelEditArchiveInputContent(targetTabDOM) {
    view.cancelEditArchiveInputContent(targetTabDOM)
  },
  updateArchiveTitleContent(targetTabDOM) {
    // get user input
    const archiveId = targetTabDOM.dataset.id
    const archiveTitleInput = targetTabDOM.querySelector('.archive-title-input-content').value
    const originalTitle = targetTabDOM.querySelector('.title-text').textContent

    // check
    if (archiveTitleInput === originalTitle) {
      view.cancelEditArchiveInputContent(targetTabDOM)
      return
    }

    // find archive in data via archiveId, update it
    model.updateArchive(data.archive, archiveId, archiveTitleInput)

    // rerender view 
    view.updateArchiveTitle(targetTabDOM, archiveId, archiveTitleInput)

    // store archive to storage
    model.storeArchive()

    // restore UI
    view.cancelEditArchiveInputContent(targetTabDOM)

    return
  },

  // set up drag and drop system
  setUpDragAndDropSystem() {
    // eventListener in view
    // view calls model to store data
    view.setUpDragAndDropSystem()
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