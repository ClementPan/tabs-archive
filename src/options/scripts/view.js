import { model } from './model.js'
import { data } from './data.js'


// not done
const detectDropLocation = function (tabId, dragenter, dragleave) {
  console.log('tabId:     ' + tabId)
  console.log('dragenter: ' + dragenter)
  console.log('dragleave: ' + dragleave)
  console.log('---------------')
  let result = 'no detect'
  if ((tabId === dragenter) && (tabId === dragleave)) {
    result = 'same location'
  } else if ((tabId !== dragenter) && (tabId === dragleave)) {
    result = 'same location'
  } else if ((dragenter === dragleave) && (tabId !== dragleave) && (tabId !== dragenter)) {
    result = `before ${dragleave}`
  } else if ((dragenter !== dragleave) && (tabId !== dragleave) && (tabId !== dragenter)) {
    result = `after ${dragenter}`
  }

  console.log('result: ' + result)
  console.log('---------------')
  return
}

// (tabId === dragenter) && (tabId === dragleave)
// A A A
// result = 'same location'

// (tabId !== dragenter) && (tabId === dragleave)
// A B A
// result = 'same location'

// (dragenter === dragleave) && (tabId !== dragleave) && (tabId !== dragenter)
// A B B 
// dragleave 的前一個

// (dragenter !== dragleave) && (tabId !== dragleave) && (tabId !== dragenter)
// A B C
// dragleave 的前一個

const emptyTab = `
  <div class='tab empty tab-style'>
    <p class='empty-tab'>No tab here yet!</p>
  </div>
`

export const view = {
  showTabsInContent(data) {
    // data: root.unclassified
    const tabsList = document.querySelector('.tabs-list')
    tabsList.innerHTML = ''

    if (!data.length) {
      tabsList.innerHTML = emptyTab
    }

    for (let tab of data) {
      const newTab = model.createTabDOMInContent(tab)
      // add eventListener to new tabs //
      this.setUpTabDragAndDropSystem(newTab)

      tabsList.appendChild(newTab)
    }
  },
  showRootArchiveList(list) {
    // list: root.archivesList
    const sidebarArchivesList = document.querySelector('.sidebar .archivesList')
    const content = document.querySelector('.content')

    for (let item of list) {
      const newSidebarArchive = model.createArhiveDOMInSidebar(item)
      sidebarArchivesList.appendChild(newSidebarArchive)

      const newContentArchive = model.createArchiveDOMInContent(item)
      content.appendChild(newContentArchive)
    }
  },
  showNewArchiveInput() {
    // hide input icon
    const icon = document.querySelector('.sidebar .create-new .icon')
    icon.className += ' none'

    // hide <p>
    const p = document.querySelector('.sidebar .create-new p')
    if (!p.className.includes('none')) {
      p.className += ' none'
    }

    // show input UI
    const input = document.querySelector('.sidebar .create-new input')
    const cancelIcon = document.querySelector('.sidebar .create-new .cancel')
    const confirmIcon = document.querySelector('.sidebar .create-new .confirm')

    input.classList.remove('none')
    confirmIcon.classList.remove('none')
    cancelIcon.classList.remove('none')
  },
  cancelNewArchiveInput() {
    console.log('cancel New Archive Input')

    //restore 
    // hide input UI
    const input = document.querySelector('.sidebar .create-new input')
    const cancelIcon = document.querySelector('.sidebar .create-new .cancel')
    const confirmIcon = document.querySelector('.sidebar .create-new .confirm')
    input.classList += ' none'
    confirmIcon.classList += ' none'
    cancelIcon.classList += ' none'

    // show input icon
    const icon = document.querySelector('.sidebar .create-new .icon')
    icon.classList.remove('none')

    // show <p>
    const p = document.querySelector('.sidebar .create-new p.show-new-archive-input')
    p.classList.remove('none')

    // clear input value
    document.getElementById('archiveName-input').value = ''
  },
  createNewArchiveInSidebar(newArchive) {
    const newArchiveDOM = model.createArhiveDOMInSidebar(newArchive)

    // push newArchiveDOM into sidebarArchivesList
    const sidebarArchivesList = document.querySelector('.sidebar .archivesList')
    sidebarArchivesList.appendChild(newArchiveDOM)

    return
  },
  createNewArchiveInContent(newArchive) {
    const content = document.querySelector('.content')
    const newArchiveDOM = model.createArchiveDOMInContent(newArchive)
    this.setUpArchiveDragAndDropSystem(newArchiveDOM)
    content.appendChild(newArchiveDOM)
    return
  },
  showTabNameEditInput(targetTabDOM) {
    const cancelEditTabInput = targetTabDOM.querySelector('.cancel-edit-tab-input')
    const titleP = targetTabDOM.querySelector('.title p')
    const input = targetTabDOM.querySelector('.edit-tab-name-input')
    const confirmTabEdit = targetTabDOM.querySelector('.confirm-tab-edit')
    const showEditTabName = targetTabDOM.querySelector('.show-edit-tab-name')

    // hide .title p
    titleP.classList.add('none')
    showEditTabName.classList.add('none')

    // pass title to input value
    input.value = titleP.textContent

    // show input
    cancelEditTabInput.classList.remove('none')
    input.classList.remove('none')
    confirmTabEdit.classList.remove('none')
  },
  cancelEditTabInput(targetTabDOM) {
    console.log('cancel-Edit-Tab-Input')

    const cancelEditTabInput = targetTabDOM.querySelector('.cancel-edit-tab-input')
    const titleP = targetTabDOM.querySelector('.title p')
    const input = targetTabDOM.querySelector('.edit-tab-name-input')
    const confirmTabEdit = targetTabDOM.querySelector('.confirm-tab-edit')
    const showEditTabName = targetTabDOM.querySelector('.show-edit-tab-name')

    // to show
    titleP.classList.remove('none')
    showEditTabName.classList.remove('none')
    // to hide
    cancelEditTabInput.classList.add('none')
    input.classList.add('none')
    confirmTabEdit.classList.add('none')
  },
  updateTabName(targetTabDOM, tabNameInput) {
    const titleP = targetTabDOM.querySelector('.title p')
    titleP.textContent = tabNameInput
  },
  removeTab(tabBar) {
    tabBar.remove()
  },
  removeArchive(archiveBar, archiveId) {
    // remove archive from sidebar
    archiveBar.remove()

    // remove archive in content
    const archiveBarInContent = document.querySelector(`#archive-${archiveId}`)
    archiveBarInContent.remove()

  },
  clearTabsInArchive(archiveId) {
    console.log('archiveId: ', archiveId)
    // return
    let unclassifiedList = ''

    if (archiveId === '001') {
      unclassifiedList = document.querySelector('.unclassified .tabs-list')
    } else {
      const className = `.archive-${archiveId}-content .tabs-list`
      unclassifiedList = document.querySelector(className)
    }

    unclassifiedList.innerHTML = `
      <div class='tab empty tab-style'>
        <p class='empty-tab'>No tab here yet!</p>
      </div>
      `
  },
  // drag and drop handlers
  // set up drag and drop system for current data
  // archives and tabs
  setUpDragAndDropSystem() {
    const tabs = document.querySelectorAll('.tab')

    tabs.forEach(tab => this.setUpTabDragAndDropSystem(tab))

    // set up dropzone: unclassified, dropzone
    const dropzones = document.querySelectorAll('.dropzone')
    const unclassified = document.querySelector('.unclassified')

    // set up dropzone for archives
    dropzones.forEach(dropzone => this.setUpArchiveDragAndDropSystem(dropzone))

    // set up dropzone for root.unclassified
    this.setUpUnclassifiedDragAndDropSystem(unclassified)
    unclassified.addEventListener('dragenter', (e) => { this.preventDefaultHandler(e) })
    unclassified.addEventListener('dragover', (e) => { this.preventDefaultHandler(e) })
    unclassified.addEventListener('dragleave', (e) => { this.preventDefaultHandler(e) })
    unclassified.addEventListener('drop', (e) => { this.unclassifiedDroppedHandler(e, unclassified) })
  },
  // set up drag and drop system for new created tab
  setUpTabDragAndDropSystem(tabDOM) {
    // empty tab is not draggable
    if (tabDOM.classList.contains('empty')) return

    tabDOM.addEventListener('dragstart', (e) => {
      const target = e.target
      console.log('target id: ' + target.id)
      const payload = target.id

      // dataTransfer.setData
      e.dataTransfer.setData('text/plain', payload)
    })

    // detect drop location
    tabDOM.addEventListener('dragenter', (e) => {
      e.preventDefault();
      // dragenter = tab.id
      // console.log('dragenter: ' + dragenter)
    });

    tabDOM.addEventListener('dragleave', (e) => {
      e.preventDefault();
      // dragleave = tab.id
    });
  },
  // set up drag and drop system for new created archive
  setUpArchiveDragAndDropSystem(archiveDOM) {
    archiveDOM.addEventListener('dragenter', (e) => { this.preventDefaultHandler(e) })
    archiveDOM.addEventListener('dragover', (e) => { this.preventDefaultHandler(e) })
    archiveDOM.addEventListener('dragleave', (e) => { this.preventDefaultHandler(e) })
    archiveDOM.addEventListener('drop', (e) => { this.archiveDroppedHandler(e, archiveDOM) })
  },
  setUpUnclassifiedDragAndDropSystem(unclassifiedDOM) {
    unclassifiedDOM.addEventListener('dragenter', (e) => { this.preventDefaultHandler(e) })
    unclassifiedDOM.addEventListener('dragover', (e) => { this.preventDefaultHandler(e) })
    unclassifiedDOM.addEventListener('dragleave', (e) => { this.preventDefaultHandler(e) })
  },
  preventDefaultHandler(e) {
    // default: tag cannot be dragged
    e.preventDefault();
    // then our DOM can be dragged inside
  },
  archiveDroppedHandler(e, archiveDOM) {
    this.preventDefaultHandler(e)

    const tabDOMId = e.dataTransfer.getData('text/plain')
    const tabDOM = document.getElementById(`${tabDOMId}`)
    const tabsList = archiveDOM.querySelector('.tabs-list')

    const isTabsListEmpty = this.tabsListCheck(tabsList)
    // console.log('isTabsListEmpty: ' + isTabsListEmpty)
    if (isTabsListEmpty) {
      // remove "NO tab here yet" 
      tabsList.innerHTML = ''
    }

    // append new tabDOM into tabsList
    tabsList.appendChild(tabDOM)

    // create tabData for storage
    const tabData = model.getTabDataViaTabDOM(tabDOM)

    // find archive by Id, archive.unclassified.push(tab)
    const archiveId = archiveDOM.dataset.archiveId

    // delete original tab
    const tabId = tabDOMId.split('-')[1]
    model.removeTab(data.archive, tabId)

    const targetArchive = model.searchArchiveById(data.archive, archiveId)
    targetArchive.unclassified.push(tabData)

    // call model to store data
    model.storeArchive()
  },
  unclassifiedDroppedHandler(e, unclassified) {
    e.preventDefault()
    const tabDOMId = e.dataTransfer.getData('text/plain')
    const tabDOM = document.getElementById(`${tabDOMId}`)
    const tabsList = unclassified.querySelector('.tabs-list')

    const isTabsListEmpty = this.tabsListCheck(tabsList)
    console.log('isTabsListEmpty: ' + isTabsListEmpty)

    if (isTabsListEmpty) {
      // remove "NO tab here yet" 
      tabsList.innerHTML = ''
    }

    // append new tabDOM into tabsList
    // alternative .insertBefore():
    tabsList.appendChild(tabDOM)

    const tabData = model.getTabDataViaTabDOM(tabDOM)

    // delete original tab
    const tabId = tabDOMId.split('-')[1]
    model.removeTab(data.archive, tabId)
    // console.log()

    // find archive by Id, archive.unclassified.push(tab)
    const archiveId = '001'
    const targetArchive = model.searchArchiveById(data.archive, archiveId)
    targetArchive.unclassified.push(tabData)

    // call model to store data
    model.storeArchive()

    // detectDropLocation(tabDOMId, dragenter, dragleave)
  },
  tabsListCheck(tabsList) {
    const content = tabsList.querySelectorAll('.tab')
    return ((content.length === 1) && (content[0].classList.contains('empty')))
  }
}