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
  deleteTab(target, archive, tabId) {
    // target: DOM elemnt
    // remove tab
    const newArchive = model.removeTab(data.archive, tabId)

    // update archive
    data.archive = newArchive

    // rerender view
    view.removeTab(target)

    // store archive to storage
    model.storeArchive()
  },
  openAllTabs(archiveId) {
    const { unclassified } = model.searchArchiveById(data.archive, archiveId)
    unclassified.forEach(each => {
      const url = each.url
      chrome.tabs.create({ url, active: false })
    });
  },
  deleteAllTabs(archiveId) {
    // remove tab
    const newArchive = model.clearArchiveById(data.archive, archiveId)

    // update archive
    data.archive = newArchive

    // rerender view
    view.clearArchive(archiveId)
    return

    // store archive to storage
    model.storeArchive()
  },
  showNewArchiveInput() {
    view.showNewArchiveInput()
  },
  createNewArchive() {
    // get user input
    const archiveName = document.getElementById('archiveName-input').value

    // no empty input allowed
    if (!archiveName) {
      view.cancelInput()
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
    view.cancelInput()

    return
  },
  cancelInput() {
    view.cancelInput()
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