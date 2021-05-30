/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/options/styles/application.scss":
/*!*********************************************!*\
  !*** ./src/options/styles/application.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/options/styles/index.scss":
/*!***************************************!*\
  !*** ./src/options/styles/index.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/options/styles/normalize.scss":
/*!*******************************************!*\
  !*** ./src/options/styles/normalize.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/options/scripts/controller.js":
/*!*******************************************!*\
  !*** ./src/options/scripts/controller.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "controller": () => (/* binding */ controller)
/* harmony export */ });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/options/scripts/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./src/options/scripts/view.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.js */ "./src/options/scripts/data.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/options/scripts/utils.js");





const controller = {
  async getAllOpenedTabs() {
    try {
      // get all active tabs
      const activeTabs = await _model_js__WEBPACK_IMPORTED_MODULE_0__.model.getAllOpenedTabs()

      // add new tabs to root.unclassified
      for (let tab of activeTabs) {
        _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive.unclassified.push(tab)
      }

      // change view
      const { unclassified } = _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive
      _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showTabsInContent(unclassified)

      // store defaultArchive to storage
      _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()
    } catch (error) {
      console.log(error)
    }
  },
  initLocalArchiveData(response) {
    // store it to local data
    _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive = response

    const { unclassified } = _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showTabsInContent(unclassified)

    const { archivesList } = _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showRootArchiveList(archivesList)
  },
  openAllTabs(archiveId) {
    const { unclassified } = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.searchArchiveById(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, archiveId)
    unclassified.forEach(each => {
      const url = each.url
      chrome.tabs.create({ url, active: false })
    });
  },
  openAllSearchTabs() {
    const searchTabs = _data_js__WEBPACK_IMPORTED_MODULE_2__.data.searchResult
    searchTabs.forEach(each => {
      const url = each.url
      chrome.tabs.create({ url, active: false })
    });
  },
  deleteTab(target, tabId) {
    // target: DOM elemnt

    // return newArchive with target tab
    const newArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.removeTab(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, tabId)

    // update archive
    _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive = newArchive

    // rerender view
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.removeTab(target)

    // store archive to storage
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()
  },
  deleteAllTabsInArchive(archiveId) {
    const text = 'delete all tabs in this archive?'
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.confirm(text, (confirmed) => {
      if (confirmed) {
        // check: if is already empty
        const className = `.archive-${archiveId}-content .tabs-list .tab`
        const tabItems = document.querySelectorAll(className)
        if ((tabItems.length === 1) && (tabItems[0].classList.contains('empty'))) {
          return
        }

        // remove tab
        const newArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.clearTabsInArchiveById(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, archiveId)

        // update archive
        _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive = newArchive

        // rerender view
        _view_js__WEBPACK_IMPORTED_MODULE_1__.view.clearTabsInArchive(archiveId)

        // store archive to storage
        _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()
      } else {
        return
      }
    })
  },
  deleteArchive(archiveBar, archiveId) {
    const text = 'delete this archive?'
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.confirm(text, (confirmed) => {
      if (confirmed) {
        // return newArchive with target archive
        const newArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.removeArchive(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, archiveId)

        // update archive
        _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive = newArchive

        // rerender view, both in sidebar & content (need archiveId)
        _view_js__WEBPACK_IMPORTED_MODULE_1__.view.removeArchive(archiveBar, archiveId)

        // store archive to storage
        _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()
      } else {
        return
      }
    })
  },
  // creating new archive
  showNewArchiveInput() {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showNewArchiveInput()
  },
  createNewArchive() {
    // get user input
    const archiveName = document.getElementById('archiveName-input').value

    // no empty input allowed
    if (!archiveName) {
      _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelNewArchiveInput()
      console.log('No empty input allowed!')
      return
    }

    // creat archive data, add new archive in data
    // newArchive: data
    const newArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createNewArchiveInData(archiveName)

    // rerender view
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.createNewArchiveInSidebar(newArchive)
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.createNewArchiveInContent(newArchive)

    // store archive to storage
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()

    // restore UI
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelNewArchiveInput()

    return
  },
  cancelNewArchiveInput() {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelNewArchiveInput()
  },
  // editing tab name(title)
  showTabNameEditInput(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showTabNameEditInput(targetTabDOM)
    return
  },
  cancelEditTabInput(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditTabInput(targetTabDOM)
  },
  updateTabName(targetTabDOM) {
    // get user input
    const tabId = targetTabDOM.dataset.id
    const tabNameInput = targetTabDOM.querySelector('.title input').value

    // check
    const originalTitle = targetTabDOM.querySelector('.title p').textContent
    if (originalTitle === tabNameInput) {
      _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditTabInput(targetTabDOM)
      return
    }


    // find tab in archive via tabId, update it
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.updateTab(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, tabId, tabNameInput)

    // rerender view 
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.updateTabName(targetTabDOM, tabNameInput)

    // store archive to storage
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()

    // restore UI
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditTabInput(targetTabDOM)

    return
  },
  // editing archive title in sidebar
  showEditArchiveInputContent(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showEditArchiveInputContent(targetTabDOM)
  },
  cancelEditArchiveInputContent(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditArchiveInputContent(targetTabDOM)
  },
  updateArchiveTitleContent(targetTabDOM) {
    // get user input
    const archiveId = targetTabDOM.dataset.id
    const archiveTitleInput = targetTabDOM.querySelector('.archive-title-input-content').value
    const originalTitle = targetTabDOM.querySelector('.title-text').textContent

    // check
    if (archiveTitleInput === originalTitle) {
      _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditArchiveInputContent(targetTabDOM)
      return
    }

    // find archive in data via archiveId, update it
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.updateArchive(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, archiveId, archiveTitleInput)

    // rerender view 
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.updateArchiveTitle(targetTabDOM, archiveId, archiveTitleInput)

    // store archive to storage
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()

    // restore UI
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditArchiveInputContent(targetTabDOM)

    return
  },
  // editing archive title in sidebar
  showEditArchiveSidebar(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showEditArchiveInputSidebar(targetTabDOM)
  },
  cancelNewArchiveInputSidebar(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditArchiveInputSidebar(targetTabDOM)
  },

  // set up drag and drop system
  setUpDragAndDropSystem() {
    // eventListener in view
    // view calls model to store data
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.setUpDragAndDropSystem()
  },

  // search tabs
  searchTab(queryBody) {
    console.log('queryBody: ' + queryBody)
    queryBody = queryBody.toLowerCase().trim()


    // model: search for tabs, store them in local data, and return tabs data: Array
    const searchResult = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.searchTabs(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, queryBody)

    // hide all archives in content
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showSearchResult(searchResult)
  },
  cancelSearch() {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.restoreContent()
  },

  //  developing methods
  clearStorage() {
    // chrome.storage.sync.clear(() => {
    chrome.storage.local.clear(() => {
      console.log('Storage cleared!')
    })
  },
  showStorage() {
    // chrome.storage.sync.get(['archive'], (data) => {
    chrome.storage.local.get(['archive'], (data) => {
      // const { QUOTA_BYTES, QUOTA_BYTES_PER_ITEM } = chrome.storage.sync
      const { QUOTA_BYTES } = chrome.storage.local
      // console.log(chrome.storage.local)
      console.log(QUOTA_BYTES)
      // console.log('Quota bytes per item: ' + QUOTA_BYTES_PER_ITEM)


      // const currentSyncStorage = utils.sizeOfData(data)
      // console.log('Data size: ' + currentSyncStorage)

      // // const maxSyncStorage = QUOTA_BYTES
      // // local max storage: 5,242,880 bytes = 5 mb
      // // sync max storage:   102,400

      // const tabsCount = model.searchTabs(data.archive, 'all').length

      // const storageRate = Math.round(100 * (currentSyncStorage / maxSyncStorage))
      // const maxTabs = Math.round((tabsCount * 100) / storageRate)
      // const text = 'Storage: ' + tabsCount + ' / ' + maxTabs + ' tabs (' + storageRate + '%)'
      // console.log(text)
      // console.log('Tabs In Storage: ' + tabsCount + ' tabs')
      // console.log('Max Tabs In Storage: ' + maxTabs + ' tabs')
    })
  }
}

/***/ }),

/***/ "./src/options/scripts/data.js":
/*!*************************************!*\
  !*** ./src/options/scripts/data.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "searchResult": () => (/* binding */ searchResult),
/* harmony export */   "data": () => (/* binding */ data)
/* harmony export */ });
const searchResult = []

const data = {
  archive: {},
  lastTabId: '',
  lastArchiveId: ''
}

/***/ }),

/***/ "./src/options/scripts/model.js":
/*!**************************************!*\
  !*** ./src/options/scripts/model.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emptyTab": () => (/* binding */ emptyTab),
/* harmony export */   "model": () => (/* binding */ model)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/options/scripts/utils.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ "./src/options/scripts/data.js");


//   archive: {},
//   lastTabId: '',
//   lastArchiveId: ''

// Archive proto
const ArchiveData = function (archiveName, id) {
  this.archiveName = archiveName || 'New Archive'
  this.id = id
  this.archivesList = []
  this.unclassified = []
}

const TabData = function (id, icon, title, tags, createdAt, url, updatedAt) {
  this.id = id
  this.title = title
  this.url = url
  this.icon = icon
  this.createdAt = createdAt
  this.updatedAt = updatedAt
  this.finishReading = false
  this.tags = tags
}

const tabInnerTemplate = function (tab) {
  const { id, createdAt, url, tags } = tab

  let { icon } = tab
  if (!icon) {
    console.log('No image!')
    icon = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.imageHolder()
  };

  let { title } = tab
  title = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.escapeHtml(title)

  return `
    <div class='number box'>
      <p>${id}</p>
          </div >
    <div class='icon box'>
      <img src="${icon}" draggable="false" alt="">
    </div>
    <div class='title box' draggable="false">
      <i class="fas fa-times-circle cancel-edit-tab-input none"></i>
      <p>${title}</p>
      <input class='edit-tab-name-input none' placeholder='${title}' type="text" maxlength="45">

      <i class="fas fa-pen-alt show-edit-tab-name"></i>
      <i class="fas fa-check-circle confirm-tab-edit none" data-id="${id}"></i>

    </div>
    <div class='tags box'>
      <p>${tags}</p>
    </div>
    <div class='createdAt box'>
      <p>${createdAt}</p>
    </div>
    <div class='btn box'>
      <button class='open-tab' data-url="${url}">
        open
      </button>
    </div>
    <div class='btn box'>
      <button class='delete-tab' data-tabid="${id}">
        delete
      </button>
    </div>
  `
}

const archiveInnerTemplate = function (archive, unclassifiedDOMS) {
  const { archiveName, archivesList, id } = archive

  return `
    <div class='archive-container'>
      <div class="archive-bar">
        <div class='archive-title' data-id="${id}">
          <i class='fas fa-times-circle cancel-edit-archive-title-content none'></i>
          <h3 class='title-text'>${archiveName}</h3>
          <input type="text" maxlength="25" value="${archiveName}" class='archive-title-input-content none'>
          <i class="fas fa-pen-alt edit-archive-title-content"></i>
          <i class="fas fa-check-circle confirm-archive-title-content-input none"></i>
        </div>


        <div class="btns">
          <div class="btn">
            <button class="open-all" data-id="${id}">
              Open All
            </button>
          </div>
          <div class="btn">
            <button class='delete-all-in-archive' data-id="${id}">
              Delete All
            </button>
          </div>
        </div>
      </div>

      <input id="archive${id}-dropdown" class='archive-dropdown none' type="checkbox">

      <label for="archive${id}-dropdown">
        <div class='show-indicator'>
          <i class="far fa-folder-open unfold"></i>
          <i class="far fa-folder fold"></i>
        </div>
      </label>

      <div class="archive-content">
        <div class="archivesList">
          <p>${archivesList}</p>
        </div>
        <div class="tabs-list">
          ${unclassifiedDOMS}
        </div>
      </div>
    </div>
  `
}

const emptyTab = `
  <div class='tab empty tab-style'>
    <p class='empty-tab'>No tab here yet!</p>
  </div>
`

const model = {
  createNewArchiveInData(archiveName) {
    const newId = _data_js__WEBPACK_IMPORTED_MODULE_1__.data.lastArchiveId += 1
    const id = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.idFormatter('archive', newId)

    const newArchiveData = new ArchiveData(archiveName, id)

    // push newArchiveData to data.archive
    _data_js__WEBPACK_IMPORTED_MODULE_1__.data.archive.archivesList.push(newArchiveData)

    return newArchiveData
  },
  createArhiveDOMInSidebar(archive) {
    const { archiveName, id } = archive
    const newArchive = document.createElement('div')
    newArchive.innerHTML = `
      <a href="#archive-${id}">
        <div class="icon">
          <i class="fas fa-pen-alt edit-archive-sidebar"></i>
          <i class="fas fa-folder"></i>
          <i class="fas fa-times-circle cancel-new-archive-input-sidebar none"></i>
        </div>
        <p>${archiveName}</p>
        <input value="${archiveName}" class="none" type="text">
        <div class="icon">
          <i class="fas fa-times-circle delete-archive" data-id="${id}"></i>
          <i class="fas fa-check-circle new-archive-name-input-sidebar none"></i>
        </div>
      </a>
    `
    newArchive.classList = 'archive archive-style'
    newArchive.id = `archive-${id}-sidebar`
    newArchive.dataset.archiveId = id
    return newArchive
  },
  createArchiveDOMInContent(archive) {
    const { unclassified, id } = archive

    let unclassifiedDOMS = ''

    if (unclassified.length) {
      unclassifiedDOMS = unclassified.map(each => {
        return `
          <div class='tab tab-style' draggable="true" id="tab-${each.id}" data-id="${each.id}">
            ${tabInnerTemplate(each)}
          </div>
        `
      }).join('')
    } else {
      unclassifiedDOMS = emptyTab
    }

    const newArchive = document.createElement('div')
    newArchive.innerHTML = archiveInnerTemplate(archive, unclassifiedDOMS)

    newArchive.id = `archive-${id}`
    newArchive.classList = `archive dropzone archive-style archive-${id}-content`
    newArchive.dataset.archiveId = id
    return newArchive
  },
  createTabDOMInContent(tabData) {
    const tab = document.createElement('div')
    tab.innerHTML = tabInnerTemplate(tabData)
    tab.classList += 'tab tab-style'
    tab.id = `tab-${tabData.id}`
    tab.dataset.id = tabData.id
    tab.draggable = true
    return tab
  },
  async getStorageData(targetData) {
    return new Promise((resolve, reject) => {
      try {
        // chrome.storage.sync.get([targetData], (data) => {
        chrome.storage.local.get([targetData], (data) => {
          return resolve(data)
        })
      } catch (error) {
        console.log('reject!')
        reject(error)
      }
    })
  },
  async getAllOpenedTabs() {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query({ active: false, status: "complete" }, (queryResult) => {
          const tabs = []
          for (let tab of queryResult) {
            if (
              (tab.title === "chrome.tabs - Chrome Developers") ||
              (tab.url === "chrome://extensions/") ||
              (tab.url.split('://')[0] === 'chrome-extension') ||
              (tab.url === 'chrome://newtab/')
            ) {
              continue
            }
            // clear
            chrome.tabs.remove(tab.id)

            // form tabData
            // const title = utils.trimString(utils.escapeHtml(tab.title), 45)

            const { favIconUrl: icon, url, title } = tab
            const createdAt = new Date().toLocaleDateString('zh-tw')
            const updatedAt = new Date().toLocaleDateString('zh-tw')
            const tags = []

            // set id
            _data_js__WEBPACK_IMPORTED_MODULE_1__.data.lastTabId++
            const id = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.idFormatter('tab', _data_js__WEBPACK_IMPORTED_MODULE_1__.data.lastTabId)

            tabs.push(new TabData(id, icon, title, tags, createdAt, url, updatedAt))
          }
          return resolve(tabs)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  storeArchive() {
    // store defaultArchive to storage
    const { archive } = _data_js__WEBPACK_IMPORTED_MODULE_1__.data
    archive.archiveName = 'root-archive'
    const request = {
      message: 'store-archive',
      data: archive
    }

    const currentSyncStorage = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.sizeOfData(archive)
    // console.log(currentSyncStorage)
    chrome.runtime.sendMessage(request, (message) => {
      console.log('[Index] ', message)
    });
  },
  updateTab(archive, tabId, tabNameInput) {
    let targetId = tabId
    console.log('in updateTab', tabNameInput)

    const findTabById = (archive, targetId) => {
      if (!archive.unclassified.length) {
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findTabById(subArchive, targetId)
          }
        }
      } else {
        for (let tab of archive.unclassified) {
          if (tab.id === targetId) {
            console.log('in hit: ', tabNameInput)
            tab.title = tabNameInput
            return
          }
        }
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findTabById(subArchive, targetId)
          }
        }
      }
    }
    findTabById(archive, targetId)
  },
  updateArchive(archive, archiveId, archiveTitleInput) {
    let targetId = archiveId

    const findArchive = (archive) => {
      if (targetId === archive.id) {
        archive.archiveName = archiveTitleInput
      }

      if (!archive.archivesList.length) {
        return
      } else {
        for (let subArchive of archive.archivesList) {
          if (targetId === subArchive.id) {
            subArchive.archiveName = archiveTitleInput
          }
          if (!subArchive.archivesList.length) {
            continue
          } else {
            for (let innerArchive of subArchive.archivesList) {
              findArchive(innerArchive)
            }
          }
        }
      }
    }

    findArchive(archive)
  },
  removeTab(archive, tabId) {
    const targetId = tabId

    const removeTabById = (archive, targetId) => {
      if (!archive.unclassified.length) {
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            removeTabById(subArchive, targetId)
          }
        }
      } else {
        for (let tab of archive.unclassified) {
          if (tab.id === targetId) {
            const index = archive.unclassified.indexOf(tab)
            archive.unclassified.splice(index, 1)
          }
        }
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            removeTabById(subArchive, targetId)
          }
        }
      }
    }
    removeTabById(archive, targetId)
    return archive
  },
  removeArchive(archive, archiveId) {
    let targetId = archiveId

    const deleteArchiveById = (archive) => {
      if (!archive.archivesList.length) {
        return
      } else {
        for (let subArchive of archive.archivesList) {
          if (targetId === subArchive.id) {
            const index = archive.archivesList.indexOf(subArchive)
            // console.log(index)
            archive.archivesList.splice(index, 1)
            return
          } else {
            if (subArchive.archivesList.length) {
              deleteArchiveById(subArchive)
            }
          }

        }
      }
    }

    deleteArchiveById(archive)
    return archive
  },
  clearTabsInArchiveById(archive, archiveId) {
    let targetId = archiveId
    // let targetArchive = {}

    const findArchive = (archive) => {
      if (targetId === archive.id) {
        archive.unclassified = []
        // return targetArchive = archive
      }

      if (!archive.archivesList.length) {
        return
      } else {
        for (let subArchive of archive.archivesList) {
          if (targetId === subArchive.id) {
            subArchive.unclassified = []
            // return targetArchive = subArchive
          }
          if (!subArchive.archivesList.length) {
            continue
          } else {
            for (let innerArchive of subArchive.archivesList) {
              findArchive(innerArchive)
            }
          }
        }
      }
    }

    findArchive(archive)
    return archive
  },
  getTabDataViaTabDOM(tabDOM) {
    return ({
      id: tabDOM.querySelector('.number p').textContent,
      icon: tabDOM.querySelector('.icon img').src,
      title: tabDOM.querySelector('.title p').textContent,
      tags: tabDOM.querySelector('.tags p').textContent,
      createdAt: tabDOM.querySelector('.createdAt p').textContent,
      url: tabDOM.querySelector('.btn button').dataset.url,
      updatedAt: ''
    })
  },
  searchTabs(archive, queryBody) {
    const result = []

    const findTabByQueryBody = (archive, queryBody) => {
      if (!archive.unclassified.length) {
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findTabByQueryBody(subArchive, queryBody)
          }
        }
      } else {
        for (let tab of archive.unclassified) {
          if (queryBody === 'all') {
            result.push(tab)
            continue
          }

          if (
            (tab.title.toLowerCase().includes(queryBody)) ||
            (tab.id.includes(queryBody))
          ) {
            result.push(tab)
          }

        }
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findTabByQueryBody(subArchive, queryBody)
          }
        }
      }
    }
    findTabByQueryBody(archive, queryBody)

    // store search result in local data
    _data_js__WEBPACK_IMPORTED_MODULE_1__.data.searchResult = result

    // return result for view
    return result
  },

  // recursive search prototype //
  searchTabById(archive, tabId) {
    let targetId = tabId

    const findTabById = (archive, targetId) => {
      if (!archive.unclassified.length) {
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findTabById(subArchive, targetId)
          }
        }
      } else {
        for (let tab of archive.unclassified) {
          if (tab.id === targetId) {
            console.log(tab)
          }
        }
        if (!archive.archivesList.length) {
          return
        } else {
          for (let subArchive of archive.archivesList) {
            findTabById(subArchive, targetId)
          }
        }
      }
    }
    findTabById(archive, targetId)
  },
  searchArchiveById(archive, archiveId) {
    let targetId = archiveId
    let targetArchive = {}

    const findArchive = (archive) => {
      if (targetId === archive.id) {
        return targetArchive = archive
      }

      if (!archive.archivesList.length) {
        return
      } else {
        for (let subArchive of archive.archivesList) {
          if (targetId === subArchive.id) {
            return targetArchive = subArchive
          }
          if (!subArchive.archivesList.length) {
            continue
          } else {
            for (let innerArchive of subArchive.archivesList) {
              findArchive(innerArchive)
            }
          }
        }
      }
    }

    findArchive(archive)
    return targetArchive
  },
}

/***/ }),

/***/ "./src/options/scripts/utils.js":
/*!**************************************!*\
  !*** ./src/options/scripts/utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "utils": () => (/* binding */ utils)
/* harmony export */ });
const utils = {
  idFormatter: function (type, num) {
    // type = "tab" || "archive"
    let mode = type === 'tab' ? 5 : 3
    num = num + ''
    let output = num.split('')
    if (num.length < mode) {
      for (let i = 0; i < mode - num.length; i++) {
        output.unshift('0')
      }
    }
    return output.join('')
  },
  escapeHtml: function (string) {
    return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },
  trimString: function (string, mexlength) {
    return string.substring(0, mexlength)
  },
  imageHolder: function () {
    return 'https://via.placeholder.com/32/01161e/fff?text=?'
  },
  sizeOfData: function (object) {

    var objectList = [];
    var stack = [object];
    var bytes = 0;

    while (stack.length) {
      var value = stack.pop();

      if (typeof value === 'boolean') {
        bytes += 4;
      }
      else if (typeof value === 'string') {
        bytes += value.length * 2;
      }
      else if (typeof value === 'number') {
        bytes += 8;
      }
      else if
        (
        typeof value === 'object'
        && objectList.indexOf(value) === -1
      ) {
        objectList.push(value);

        for (var i in value) {
          stack.push(value[i]);
        }
      }
    }
    return bytes;
  }
}

/***/ }),

/***/ "./src/options/scripts/view.js":
/*!*************************************!*\
  !*** ./src/options/scripts/view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "view": () => (/* binding */ view)
/* harmony export */ });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/options/scripts/model.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ "./src/options/scripts/data.js");




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

const view = {
  showTabsInContent(data) {
    // data: root.unclassified
    const tabsList = document.querySelector('.tabs-list')
    tabsList.innerHTML = ''

    if (!data.length) {
      tabsList.innerHTML = _model_js__WEBPACK_IMPORTED_MODULE_0__.emptyTab
    }

    for (let tab of data) {
      const newTab = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createTabDOMInContent(tab)
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
      const newSidebarArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createArhiveDOMInSidebar(item)
      sidebarArchivesList.appendChild(newSidebarArchive)

      const newContentArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createArchiveDOMInContent(item)
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
    const newArchiveDOM = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createArhiveDOMInSidebar(newArchive)

    // push newArchiveDOM into sidebarArchivesList
    const sidebarArchivesList = document.querySelector('.sidebar .archivesList')
    sidebarArchivesList.appendChild(newArchiveDOM)

    return
  },
  createNewArchiveInContent(newArchive) {
    const content = document.querySelector('.content')
    const newArchiveDOM = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createArchiveDOMInContent(newArchive)
    this.setUpArchiveDragAndDropSystem(newArchiveDOM)
    content.appendChild(newArchiveDOM)
    return
  },
  // edit tab name
  showTabNameEditInput(targetTabDOM) {
    // make tab undraggable
    targetTabDOM.draggable = false

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
    targetTabDOM.draggable = true

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
  // edit archive title
  showEditArchiveInputContent(titleDOM) {
    const titleText = titleDOM.querySelector('.title-text')
    const editIcon = titleDOM.querySelector('.edit-archive-title-content')
    const updateIcon = titleDOM.querySelector('.confirm-archive-title-content-input')
    const cancelIcon = titleDOM.querySelector('.cancel-edit-archive-title-content')
    const input = titleDOM.querySelector('input')

    // to hide: .title-text, editIcon
    titleText.classList.add('none')
    editIcon.classList.add('none')

    // to show: updateIcon, cancelIcon
    updateIcon.classList.remove('none')
    cancelIcon.classList.remove('none')
    input.classList.remove('none')
  },
  cancelEditArchiveInputContent(titleDOM) {
    const titleText = titleDOM.querySelector('.title-text')
    const editIcon = titleDOM.querySelector('.edit-archive-title-content')
    const updateIcon = titleDOM.querySelector('.confirm-archive-title-content-input')
    const cancelIcon = titleDOM.querySelector('.cancel-edit-archive-title-content')
    const input = titleDOM.querySelector('input')

    // to hide: updateIcon, cancelIcon
    updateIcon.classList.add('none')
    cancelIcon.classList.add('none')
    input.classList.add('none')

    // to show: titleText, editIcon
    titleText.classList.remove('none')
    editIcon.classList.remove('none')

  },
  updateArchiveTitle(targetTabDOM, archiveId, tabNameInput) {
    // update archive title in content
    const archiveTitleContent = targetTabDOM.querySelector('.title-text')
    archiveTitleContent.textContent = tabNameInput

    // update archive title in sidebar
    const archiveTitleSidebar = document.querySelector(`#archive-${archiveId}-sidebar`)
    archiveTitleSidebar.querySelector('p').textContent = tabNameInput
    return
  },
  // edit archive title sidebar
  showEditArchiveInputSidebar(targetTabDOM) {
    console.log(targetTabDOM)
    const cancel = targetTabDOM.querySelector('.cancel-new-archive-input-sidebar')
    const folder = targetTabDOM.querySelector('.fa-folder')
    const edit = targetTabDOM.querySelector('.edit-archive-sidebar')
    const update = targetTabDOM.querySelector('.new-archive-name-input-sidebar')
    const deleteIcon = targetTabDOM.querySelector('.delete-archive')
    const title = targetTabDOM.querySelector('p')
    const input = targetTabDOM.querySelector('input')

    title.classList.add('none')
    cancel.classList.remove('none')
    update.classList.remove('none')
    edit.classList.add('none')
    folder.classList.add('none')
    deleteIcon.classList.add('none')
    input.classList.remove('none')

  },
  cancelEditArchiveInputSidebar(targetTabDOM) {
    const cancel = targetTabDOM.querySelector('.cancel-new-archive-input-sidebar')
    const folder = targetTabDOM.querySelector('.fa-folder')
    const edit = targetTabDOM.querySelector('.edit-archive-sidebar')
    const update = targetTabDOM.querySelector('.new-archive-name-input-sidebar')
    const deleteIcon = targetTabDOM.querySelector('.delete-archive')
    const title = targetTabDOM.querySelector('p')
    const input = targetTabDOM.querySelector('input')

    title.classList.remove('none')
    cancel.classList.add('none')
    update.classList.add('none')
    edit.classList.remove('none')
    folder.classList.remove('none')
    deleteIcon.classList.remove('none')
    input.classList.add('none')

  },
  updateArchiveTitleSidebar(targetTabDOM) {
    console.log(targetTabDOM)
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
  showSearchResult(tabsArray) {
    const content = document.querySelector('.content')
    const archives = content.querySelectorAll('.archive')
    const unclassified = document.querySelector('.unclassified')
    const unclassifiedTabsList = unclassified.querySelector('.tabs-list')

    const unclassifiedDataBar = unclassified.querySelector('.data-bar')
    const openAllBtn = unclassifiedDataBar.querySelector('.open-all')
    const deleteAllBtn = unclassifiedDataBar.querySelector('.delete-all-in-archive')

    // set open-all button & delete-all button on search
    openAllBtn.classList.add('on-search')
    deleteAllBtn.classList.add('on-search')

    // hide archives
    archives.forEach(each => each.classList.add('none'))

    // clear unclassifiedTabs
    unclassifiedTabsList.innerHTML = ''

    // if !tabsData.length
    if (!tabsArray.length) {
      unclassifiedTabsList.innerHTML += _model_js__WEBPACK_IMPORTED_MODULE_0__.emptyTab
      return
    }

    // if tabsData.length
    const tabsDOM = tabsArray.map(tab => _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createTabDOMInContent(tab))

    tabsDOM.forEach(tabDOM => {
      unclassifiedTabsList.appendChild(tabDOM)
    })
  },
  restoreContent() {
    const content = document.querySelector('.content')
    const archives = content.querySelectorAll('.archive')
    const unclassified = document.querySelector('.unclassified')
    const unclassifiedTabsList = unclassified.querySelector('.tabs-list')

    const unclassifiedDataBar = unclassified.querySelector('.data-bar')
    const openAllBtn = unclassifiedDataBar.querySelector('.open-all')
    const deleteAllBtn = unclassifiedDataBar.querySelector('.delete-all-in-archive')

    // set open-all button & delete-all button on search
    openAllBtn.classList.remove('on-search')
    deleteAllBtn.classList.remove('on-search')

    // show archives
    archives.forEach(each => each.classList.remove('none'))

    // clear unclassifiedTabs
    unclassifiedTabsList.innerHTML = ''

    // restore unclassified tabs, get data via model
    const OriginalUnclassifiedData = _data_js__WEBPACK_IMPORTED_MODULE_1__.data.archive.unclassified
    OriginalUnclassifiedData.forEach(tab => {
      const originalTabInUnclassified = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createTabDOMInContent(tab)
      unclassifiedTabsList.appendChild(originalTabInUnclassified)
    })
  },

  // confirm alert
  confirm(text, callback) {
    const alert = document.querySelector('.alert')
    const backdrop = document.querySelector('.backdrop')

    // to show alert
    alert.classList.remove('none')
    backdrop.classList.remove('none')

    // overwrite text
    const alertContent = alert.querySelector('.text-content')
    alertContent.textContent = text

    const affirmative = document.querySelector('.confirm-affirmative')
    const negative = document.querySelector('.confirm-negative')

    // add eventListener to buttons
    affirmative.addEventListener('click', () => {
      alert.classList.add('none')
      backdrop.classList.add('none')
      callback(true)
    })

    negative.addEventListener('click', () => {
      alert.classList.add('none')
      backdrop.classList.add('none')
      callback(false)
    })
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

    tabDOM.addEventListener('drag', (e) => {
      const viewportHeight = window.innerHeight
      const content = document.querySelector('.content')
      const { clientY } = e
      const currenHeightPercent = clientY / viewportHeight * 100
      console.log(currenHeightPercent)
      if (currenHeightPercent < 15) {
        content.scrollBy({
          top: -300,
          left: 0,
          behavior: 'smooth'
        });
      }

      if (currenHeightPercent > 95) {
        content.scrollBy({
          top: 300,
          left: 0,
          behavior: 'smooth'
        });
      }
    })

    tabDOM.addEventListener('dragstart', (e) => {
      const target = e.target

      const payload = target.id

      // dataTransfer.setData
      e.dataTransfer.setData('text/plain', payload)
    })

    // detect drop location
    tabDOM.addEventListener('dragenter', (e) => {
      e.preventDefault();
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
    console.log('tabDOMId: ' + tabDOMId)
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
    const tabData = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.getTabDataViaTabDOM(tabDOM)

    // find archive by Id, archive.unclassified.push(tab)
    const archiveId = archiveDOM.dataset.archiveId

    // delete original tab
    const tabId = tabDOMId.split('-')[1]
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.removeTab(_data_js__WEBPACK_IMPORTED_MODULE_1__.data.archive, tabId)

    const targetArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.searchArchiveById(_data_js__WEBPACK_IMPORTED_MODULE_1__.data.archive, archiveId)
    targetArchive.unclassified.push(tabData)

    // call model to store data
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()
  },
  unclassifiedDroppedHandler(e, unclassified) {
    e.preventDefault()
    const tabDOMId = e.dataTransfer.getData('text/plain')
    console.log('tabDOMId: ' + tabDOMId)
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

    const tabData = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.getTabDataViaTabDOM(tabDOM)

    // delete original tab
    const tabId = tabDOMId.split('-')[1]
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.removeTab(_data_js__WEBPACK_IMPORTED_MODULE_1__.data.archive, tabId)
    // console.log()

    // find archive by Id, archive.unclassified.push(tab)
    const archiveId = '001'
    const targetArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.searchArchiveById(_data_js__WEBPACK_IMPORTED_MODULE_1__.data.archive, archiveId)
    targetArchive.unclassified.push(tabData)

    // call model to store data
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()

    // detectDropLocation(tabDOMId, dragenter, dragleave)
  },
  tabsListCheck(tabsList) {
    const content = tabsList.querySelectorAll('.tab')
    return ((content.length === 1) && (content[0].classList.contains('empty')))
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/options/scripts/index.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_normalize_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/normalize.scss */ "./src/options/styles/normalize.scss");
/* harmony import */ var _styles_application_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/application.scss */ "./src/options/styles/application.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/index.scss */ "./src/options/styles/index.scss");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.js */ "./src/options/scripts/data.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controller.js */ "./src/options/scripts/controller.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view */ "./src/options/scripts/view.js");








window.onload = function () {
  console.log('[Index] Index.html loaded! Ask for archive data!')
  const request = {
    message: 'get-archive-data',
    data: null
  }

  chrome.runtime.sendMessage(request, (response) => {
    console.log('[Index] received archive data', response)
    const { archive, lastTabId, lastArchiveId } = response
    _data_js__WEBPACK_IMPORTED_MODULE_3__.data.lastTabId = lastTabId
    _data_js__WEBPACK_IMPORTED_MODULE_3__.data.lastArchiveId = lastArchiveId
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.initLocalArchiveData(archive)

    // setup drop item & drop zone
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.setUpDragAndDropSystem()
  });
}

// click eventListener
window.addEventListener('click', (e) => {
  const target = e.target

  // cancel show input
  // controller.cancelNewArchiveInput()

  // get all opened tabs
  if (target.className === 'get-all-btn') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.getAllOpenedTabs()
  }

  // oepn all tabs in archive
  if (target.classList.contains('open-all')) {
    const archiveId = target.dataset.id
    if (target.classList.contains('on-search')) {
      _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.openAllSearchTabs()
      return
    }
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.openAllTabs(archiveId)
    return
  }

  // open cetain tab in archive
  if (target.className === 'open-tab') {
    const url = target.dataset.url
    chrome.tabs.create({ url, active: false })
  }

  // show new archive input
  if (target.classList.contains('show-new-archive-input')) {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showNewArchiveInput()
  }

  // cancel new archive input
  if (target.classList.contains('cancel-new-archive-input')) {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelNewArchiveInput()
  }

  // create new archive
  if (target.classList.contains('new-archive-name-input')) {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.createNewArchive()
  }

  // show edit tab name input
  if (target.classList.contains('show-edit-tab-name')) {
    const targetTabDOM = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showTabNameEditInput(targetTabDOM)
  }

  // cancel edit tab name
  if (target.classList.contains('cancel-edit-tab-input')) {
    const targetTabDOM = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelEditTabInput(targetTabDOM)
  }

  // update tab name
  if (target.classList.contains('confirm-tab-edit')) {
    const targetTabDOM = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.updateTabName(targetTabDOM)
  }

  // show edit archive name in content
  if (target.classList.contains('edit-archive-title-content')) {
    const titleDOM = target.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showEditArchiveInputContent(titleDOM)
  }

  // cancel edit archive name in content
  if (target.classList.contains('cancel-edit-archive-title-content')) {
    const titleDOM = target.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelEditArchiveInputContent(titleDOM)
  }

  // update archive name in content
  if (target.classList.contains('confirm-archive-title-content-input')) {
    const titleDOM = target.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.updateArchiveTitleContent(titleDOM)
  }

  // show edit-archive-sidebar
  if (target.classList.contains('edit-archive-sidebar')) {
    console.log('show archive edit sidebar')
    const titleDOM = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showEditArchiveSidebar(titleDOM)
  }

  // cancel
  if (target.classList.contains('cancel-new-archive-input-sidebar')) {
    console.log('cancel archive edit sidebar')
    const titleDOM = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelNewArchiveInputSidebar(titleDOM)
  }

  // delete one certain tab in archive
  if (target.className === 'delete-tab') {
    const tabId = target.dataset.tabid
    const tabBar = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteTab(tabBar, tabId)
  }

  // delete certain archive from sidebar
  if (target.classList.contains('delete-archive')) {
    const archiveBar = target.parentElement.parentElement.parentElement
    const targetArchiveId = target.dataset.id
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteArchive(archiveBar, targetArchiveId)
  }

  // delete all unclassified tabs in certain archive
  if (target.className === 'delete-all-in-archive') {
    const archiveId = target.dataset.id
    console.log('archiveId: ' + archiveId)
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteAllTabsInArchive(archiveId)
  }

  // cacnel tabs search
  if (target.classList.contains('cancel-search')) {
    const searchBar = target.parentElement
    searchBar.querySelector('input').value = ''

    // cancel search
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelSearch()
  }

  if (target.className === 'brand-title') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelSearch()
  }

  ///// for developing /////
  if (target.className === 'get-data') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showStorage('archive')
  }

  if (target.className === 'clear-data') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.clearStorage()
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
      _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.createNewArchive()
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
      _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelSearch()
      return
    }
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.searchTab(queryBody)
    // }
  }
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWtDO0FBQ0Y7QUFDQTtBQUNFOztBQUUzQjtB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Q0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSx1REFBaUI7O0FBRXJCO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDOzs7Ozs7Ozs7Ozs7OztBQ2hoQk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNEa0M7QUFDRjtBQUNLOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsdUJBQXVCLFVBQVU7QUFDakMsR0FBRztBQUNILHNCQUFzQixVQUFVO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLCtDQUFRO0FBQ25DOztBQUVBO0FBQ0EscUJBQXFCLGtFQUEyQjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MscUVBQThCO0FBQzlEOztBQUVBLGdDQUFnQyxzRUFBK0I7QUFDL0Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsMEJBQTBCLHFFQUE4Qjs7QUFFeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSwwQkFBMEIsc0VBQStCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FLFVBQVU7QUFDN0U7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRSxVQUFVO0FBQzdFOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG9DQUFvQyxVQUFVO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsK0NBQVE7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QyxrRUFBMkI7O0FBRXBFO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsK0RBQXlCO0FBQzlEO0FBQ0Esd0NBQXdDLGtFQUEyQjtBQUNuRTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxnQ0FBZ0M7QUFDdkYsc0RBQXNELGdDQUFnQztBQUN0Rix1REFBdUQsZ0NBQWdDO0FBQ3ZGLGtEQUFrRCxtREFBbUQ7QUFDckcsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EscURBQXFELGdDQUFnQztBQUNyRixvREFBb0QsZ0NBQWdDO0FBQ3BGLHFEQUFxRCxnQ0FBZ0M7QUFDckYsZ0RBQWdELDRDQUE0QztBQUM1RixHQUFHO0FBQ0g7QUFDQSwwREFBMEQsZ0NBQWdDO0FBQzFGLHlEQUF5RCxnQ0FBZ0M7QUFDekYsMERBQTBELGdDQUFnQztBQUMxRixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxTQUFTO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsZ0VBQXlCOztBQUU3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHNEQUFlLENBQUMsa0RBQVk7O0FBRWhDLDBCQUEwQiw4REFBdUIsQ0FBQyxrREFBWTtBQUM5RDs7QUFFQTtBQUNBLElBQUkseURBQWtCO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxTQUFTO0FBQ3ZEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixnRUFBeUI7O0FBRTdDO0FBQ0E7QUFDQSxJQUFJLHNEQUFlLENBQUMsa0RBQVk7QUFDaEM7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQiw4REFBdUIsQ0FBQyxrREFBWTtBQUM5RDs7QUFFQTtBQUNBLElBQUkseURBQWtCOztBQUV0QjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztVQzloQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNFO0FBQ047O0FBRUc7QUFDWTtBQUNmOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsb0NBQW9DO0FBQy9DLElBQUksb0RBQWM7QUFDbEIsSUFBSSx3REFBa0I7QUFDdEIsSUFBSSwyRUFBK0I7O0FBRW5DO0FBQ0EsSUFBSSw2RUFBaUM7QUFDckMsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHVFQUEyQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sd0VBQTRCO0FBQ2xDO0FBQ0E7QUFDQSxJQUFJLGtFQUFzQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7O0FBRUE7QUFDQTtBQUNBLElBQUksMEVBQThCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSxJQUFJLDRFQUFnQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx1RUFBMkI7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyRUFBK0I7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5RUFBNkI7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBd0I7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrRkFBc0M7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRkFBd0M7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRkFBb0M7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDZFQUFpQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksbUZBQXVDO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBb0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUF3QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkVBQWlDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7O0FBRUE7QUFDQSxJQUFJLG1FQUF1QjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxrRUFBc0I7QUFDMUI7O0FBRUE7QUFDQSxJQUFJLG1FQUF1QjtBQUMzQjtBQUNBLENBQUM7QUFDRDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1RUFBMkI7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG1FQUF1QjtBQUM3QjtBQUNBO0FBQ0EsSUFBSSxnRUFBb0I7QUFDeEI7QUFDQTtBQUNBLENBQUMsQyIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3LmpzJ1xyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMuanMnXHJcblxyXG5leHBvcnQgY29uc3QgY29udHJvbGxlciA9IHtcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gZ2V0IGFsbCBhY3RpdmUgdGFic1xyXG4gICAgICBjb25zdCBhY3RpdmVUYWJzID0gYXdhaXQgbW9kZWwuZ2V0QWxsT3BlbmVkVGFicygpXHJcblxyXG4gICAgICAvLyBhZGQgbmV3IHRhYnMgdG8gcm9vdC51bmNsYXNzaWZpZWRcclxuICAgICAgZm9yIChsZXQgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcclxuICAgICAgICBkYXRhLmFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGFuZ2Ugdmlld1xyXG4gICAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfSxcclxuICBpbml0TG9jYWxBcmNoaXZlRGF0YShyZXNwb25zZSkge1xyXG4gICAgLy8gc3RvcmUgaXQgdG8gbG9jYWwgZGF0YVxyXG4gICAgZGF0YS5hcmNoaXZlID0gcmVzcG9uc2VcclxuXHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dUYWJzSW5Db250ZW50KHVuY2xhc3NpZmllZClcclxuXHJcbiAgICBjb25zdCB7IGFyY2hpdmVzTGlzdCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dSb290QXJjaGl2ZUxpc3QoYXJjaGl2ZXNMaXN0KVxyXG4gIH0sXHJcbiAgb3BlbkFsbFRhYnMoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuZm9yRWFjaChlYWNoID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gZWFjaC51cmxcclxuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9wZW5BbGxTZWFyY2hUYWJzKCkge1xyXG4gICAgY29uc3Qgc2VhcmNoVGFicyA9IGRhdGEuc2VhcmNoUmVzdWx0XHJcbiAgICBzZWFyY2hUYWJzLmZvckVhY2goZWFjaCA9PiB7XHJcbiAgICAgIGNvbnN0IHVybCA9IGVhY2gudXJsXHJcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBkZWxldGVUYWIodGFyZ2V0LCB0YWJJZCkge1xyXG4gICAgLy8gdGFyZ2V0OiBET00gZWxlbW50XHJcblxyXG4gICAgLy8gcmV0dXJuIG5ld0FyY2hpdmUgd2l0aCB0YXJnZXQgdGFiXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZSA9IG5ld0FyY2hpdmVcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LnJlbW92ZVRhYih0YXJnZXQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgZGVsZXRlQWxsVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpIHtcclxuICAgIGNvbnN0IHRleHQgPSAnZGVsZXRlIGFsbCB0YWJzIGluIHRoaXMgYXJjaGl2ZT8nXHJcbiAgICB2aWV3LmNvbmZpcm0odGV4dCwgKGNvbmZpcm1lZCkgPT4ge1xyXG4gICAgICBpZiAoY29uZmlybWVkKSB7XHJcbiAgICAgICAgLy8gY2hlY2s6IGlmIGlzIGFscmVhZHkgZW1wdHlcclxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgLmFyY2hpdmUtJHthcmNoaXZlSWR9LWNvbnRlbnQgLnRhYnMtbGlzdCAudGFiYFxyXG4gICAgICAgIGNvbnN0IHRhYkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpXHJcbiAgICAgICAgaWYgKCh0YWJJdGVtcy5sZW5ndGggPT09IDEpICYmICh0YWJJdGVtc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSB0YWJcclxuICAgICAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwuY2xlYXJUYWJzSW5BcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgICAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgICAgICB2aWV3LmNsZWFyVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcblxyXG4gICAgICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBkZWxldGVBcmNoaXZlKGFyY2hpdmVCYXIsIGFyY2hpdmVJZCkge1xyXG4gICAgY29uc3QgdGV4dCA9ICdkZWxldGUgdGhpcyBhcmNoaXZlPydcclxuICAgIHZpZXcuY29uZmlybSh0ZXh0LCAoY29uZmlybWVkKSA9PiB7XHJcbiAgICAgIGlmIChjb25maXJtZWQpIHtcclxuICAgICAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCBhcmNoaXZlXHJcbiAgICAgICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLnJlbW92ZUFyY2hpdmUoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICAgICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgICAgICAvLyByZXJlbmRlciB2aWV3LCBib3RoIGluIHNpZGViYXIgJiBjb250ZW50IChuZWVkIGFyY2hpdmVJZClcclxuICAgICAgICB2aWV3LnJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKVxyXG5cclxuICAgICAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgICAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8gY3JlYXRpbmcgbmV3IGFyY2hpdmVcclxuICBzaG93TmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgdmlldy5zaG93TmV3QXJjaGl2ZUlucHV0KClcclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmUoKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgYXJjaGl2ZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJjaGl2ZU5hbWUtaW5wdXQnKS52YWx1ZVxyXG5cclxuICAgIC8vIG5vIGVtcHR5IGlucHV0IGFsbG93ZWRcclxuICAgIGlmICghYXJjaGl2ZU5hbWUpIHtcclxuICAgICAgdmlldy5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gICAgICBjb25zb2xlLmxvZygnTm8gZW1wdHkgaW5wdXQgYWxsb3dlZCEnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdCBhcmNoaXZlIGRhdGEsIGFkZCBuZXcgYXJjaGl2ZSBpbiBkYXRhXHJcbiAgICAvLyBuZXdBcmNoaXZlOiBkYXRhXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwuY3JlYXRlTmV3QXJjaGl2ZUluRGF0YShhcmNoaXZlTmFtZSlcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LmNyZWF0ZU5ld0FyY2hpdmVJblNpZGViYXIobmV3QXJjaGl2ZSlcclxuICAgIHZpZXcuY3JlYXRlTmV3QXJjaGl2ZUluQ29udGVudChuZXdBcmNoaXZlKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjYW5jZWxOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfSxcclxuICAvLyBlZGl0aW5nIHRhYiBuYW1lKHRpdGxlKVxyXG4gIHNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5zaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG4gIHVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgdGFiSWQgPSB0YXJnZXRUYWJET00uZGF0YXNldC5pZFxyXG4gICAgY29uc3QgdGFiTmFtZUlucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBpbnB1dCcpLnZhbHVlXHJcblxyXG4gICAgLy8gY2hlY2tcclxuICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKS50ZXh0Q29udGVudFxyXG4gICAgaWYgKG9yaWdpbmFsVGl0bGUgPT09IHRhYk5hbWVJbnB1dCkge1xyXG4gICAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBmaW5kIHRhYiBpbiBhcmNoaXZlIHZpYSB0YWJJZCwgdXBkYXRlIGl0XHJcbiAgICBtb2RlbC51cGRhdGVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZCwgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXcgXHJcbiAgICB2aWV3LnVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NLCB0YWJOYW1lSW5wdXQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIHJlc3RvcmUgVUlcclxuICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIC8vIGVkaXRpbmcgYXJjaGl2ZSB0aXRsZSBpbiBzaWRlYmFyXHJcbiAgc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5zaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKVxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmVUaXRsZUNvbnRlbnQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0VGFiRE9NLmRhdGFzZXQuaWRcclxuICAgIGNvbnN0IGFyY2hpdmVUaXRsZUlucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlLXRpdGxlLWlucHV0LWNvbnRlbnQnKS52YWx1ZVxyXG4gICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdGV4dCcpLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gY2hlY2tcclxuICAgIGlmIChhcmNoaXZlVGl0bGVJbnB1dCA9PT0gb3JpZ2luYWxUaXRsZSkge1xyXG4gICAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmluZCBhcmNoaXZlIGluIGRhdGEgdmlhIGFyY2hpdmVJZCwgdXBkYXRlIGl0XHJcbiAgICBtb2RlbC51cGRhdGVBcmNoaXZlKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dClcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3IFxyXG4gICAgdmlldy51cGRhdGVBcmNoaXZlVGl0bGUodGFyZ2V0VGFiRE9NLCBhcmNoaXZlSWQsIGFyY2hpdmVUaXRsZUlucHV0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIC8vIGVkaXRpbmcgYXJjaGl2ZSB0aXRsZSBpbiBzaWRlYmFyXHJcbiAgc2hvd0VkaXRBcmNoaXZlU2lkZWJhcih0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuc2hvd0VkaXRBcmNoaXZlSW5wdXRTaWRlYmFyKHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dFNpZGViYXIodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRTaWRlYmFyKHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG5cclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW1cclxuICBzZXRVcERyYWdBbmREcm9wU3lzdGVtKCkge1xyXG4gICAgLy8gZXZlbnRMaXN0ZW5lciBpbiB2aWV3XHJcbiAgICAvLyB2aWV3IGNhbGxzIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIHZpZXcuc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpXHJcbiAgfSxcclxuXHJcbiAgLy8gc2VhcmNoIHRhYnNcclxuICBzZWFyY2hUYWIocXVlcnlCb2R5KSB7XHJcbiAgICBjb25zb2xlLmxvZygncXVlcnlCb2R5OiAnICsgcXVlcnlCb2R5KVxyXG4gICAgcXVlcnlCb2R5ID0gcXVlcnlCb2R5LnRvTG93ZXJDYXNlKCkudHJpbSgpXHJcblxyXG5cclxuICAgIC8vIG1vZGVsOiBzZWFyY2ggZm9yIHRhYnMsIHN0b3JlIHRoZW0gaW4gbG9jYWwgZGF0YSwgYW5kIHJldHVybiB0YWJzIGRhdGE6IEFycmF5XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBtb2RlbC5zZWFyY2hUYWJzKGRhdGEuYXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG5cclxuICAgIC8vIGhpZGUgYWxsIGFyY2hpdmVzIGluIGNvbnRlbnRcclxuICAgIHZpZXcuc2hvd1NlYXJjaFJlc3VsdChzZWFyY2hSZXN1bHQpXHJcbiAgfSxcclxuICBjYW5jZWxTZWFyY2goKSB7XHJcbiAgICB2aWV3LnJlc3RvcmVDb250ZW50KClcclxuICB9LFxyXG5cclxuICAvLyAgZGV2ZWxvcGluZyBtZXRob2RzXHJcbiAgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgLy8gY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcigoKSA9PiB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5jbGVhcigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlIGNsZWFyZWQhJylcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93U3RvcmFnZSgpIHtcclxuICAgIC8vIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgICAvLyBjb25zdCB7IFFVT1RBX0JZVEVTLCBRVU9UQV9CWVRFU19QRVJfSVRFTSB9ID0gY2hyb21lLnN0b3JhZ2Uuc3luY1xyXG4gICAgICBjb25zdCB7IFFVT1RBX0JZVEVTIH0gPSBjaHJvbWUuc3RvcmFnZS5sb2NhbFxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhjaHJvbWUuc3RvcmFnZS5sb2NhbClcclxuICAgICAgY29uc29sZS5sb2coUVVPVEFfQllURVMpXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdRdW90YSBieXRlcyBwZXIgaXRlbTogJyArIFFVT1RBX0JZVEVTX1BFUl9JVEVNKVxyXG5cclxuXHJcbiAgICAgIC8vIGNvbnN0IGN1cnJlbnRTeW5jU3RvcmFnZSA9IHV0aWxzLnNpemVPZkRhdGEoZGF0YSlcclxuICAgICAgLy8gY29uc29sZS5sb2coJ0RhdGEgc2l6ZTogJyArIGN1cnJlbnRTeW5jU3RvcmFnZSlcclxuXHJcbiAgICAgIC8vIC8vIGNvbnN0IG1heFN5bmNTdG9yYWdlID0gUVVPVEFfQllURVNcclxuICAgICAgLy8gLy8gbG9jYWwgbWF4IHN0b3JhZ2U6IDUsMjQyLDg4MCBieXRlcyA9IDUgbWJcclxuICAgICAgLy8gLy8gc3luYyBtYXggc3RvcmFnZTogICAxMDIsNDAwXHJcblxyXG4gICAgICAvLyBjb25zdCB0YWJzQ291bnQgPSBtb2RlbC5zZWFyY2hUYWJzKGRhdGEuYXJjaGl2ZSwgJ2FsbCcpLmxlbmd0aFxyXG5cclxuICAgICAgLy8gY29uc3Qgc3RvcmFnZVJhdGUgPSBNYXRoLnJvdW5kKDEwMCAqIChjdXJyZW50U3luY1N0b3JhZ2UgLyBtYXhTeW5jU3RvcmFnZSkpXHJcbiAgICAgIC8vIGNvbnN0IG1heFRhYnMgPSBNYXRoLnJvdW5kKCh0YWJzQ291bnQgKiAxMDApIC8gc3RvcmFnZVJhdGUpXHJcbiAgICAgIC8vIGNvbnN0IHRleHQgPSAnU3RvcmFnZTogJyArIHRhYnNDb3VudCArICcgLyAnICsgbWF4VGFicyArICcgdGFicyAoJyArIHN0b3JhZ2VSYXRlICsgJyUpJ1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0ZXh0KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZygnVGFicyBJbiBTdG9yYWdlOiAnICsgdGFic0NvdW50ICsgJyB0YWJzJylcclxuICAgICAgLy8gY29uc29sZS5sb2coJ01heCBUYWJzIEluIFN0b3JhZ2U6ICcgKyBtYXhUYWJzICsgJyB0YWJzJylcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IHNlYXJjaFJlc3VsdCA9IFtdXHJcblxyXG5leHBvcnQgY29uc3QgZGF0YSA9IHtcclxuICBhcmNoaXZlOiB7fSxcclxuICBsYXN0VGFiSWQ6ICcnLFxyXG4gIGxhc3RBcmNoaXZlSWQ6ICcnXHJcbn0iLCJpbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbi8vICAgYXJjaGl2ZToge30sXHJcbi8vICAgbGFzdFRhYklkOiAnJyxcclxuLy8gICBsYXN0QXJjaGl2ZUlkOiAnJ1xyXG5cclxuLy8gQXJjaGl2ZSBwcm90b1xyXG5jb25zdCBBcmNoaXZlRGF0YSA9IGZ1bmN0aW9uIChhcmNoaXZlTmFtZSwgaWQpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJJbm5lclRlbXBsYXRlID0gZnVuY3Rpb24gKHRhYikge1xyXG4gIGNvbnN0IHsgaWQsIGNyZWF0ZWRBdCwgdXJsLCB0YWdzIH0gPSB0YWJcclxuXHJcbiAgbGV0IHsgaWNvbiB9ID0gdGFiXHJcbiAgaWYgKCFpY29uKSB7XHJcbiAgICBjb25zb2xlLmxvZygnTm8gaW1hZ2UhJylcclxuICAgIGljb24gPSB1dGlscy5pbWFnZUhvbGRlcigpXHJcbiAgfTtcclxuXHJcbiAgbGV0IHsgdGl0bGUgfSA9IHRhYlxyXG4gIHRpdGxlID0gdXRpbHMuZXNjYXBlSHRtbCh0aXRsZSlcclxuXHJcbiAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9J251bWJlciBib3gnPlxyXG4gICAgICA8cD4ke2lkfTwvcD5cclxuICAgICAgICAgIDwvZGl2ID5cclxuICAgIDxkaXYgY2xhc3M9J2ljb24gYm94Jz5cclxuICAgICAgPGltZyBzcmM9XCIke2ljb259XCIgZHJhZ2dhYmxlPVwiZmFsc2VcIiBhbHQ9XCJcIj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0ndGl0bGUgYm94JyBkcmFnZ2FibGU9XCJmYWxzZVwiPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgY2FuY2VsLWVkaXQtdGFiLWlucHV0IG5vbmVcIj48L2k+XHJcbiAgICAgIDxwPiR7dGl0bGV9PC9wPlxyXG4gICAgICA8aW5wdXQgY2xhc3M9J2VkaXQtdGFiLW5hbWUtaW5wdXQgbm9uZScgcGxhY2Vob2xkZXI9JyR7dGl0bGV9JyB0eXBlPVwidGV4dFwiIG1heGxlbmd0aD1cIjQ1XCI+XHJcblxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW4tYWx0IHNob3ctZWRpdC10YWItbmFtZVwiPjwvaT5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2stY2lyY2xlIGNvbmZpcm0tdGFiLWVkaXQgbm9uZVwiIGRhdGEtaWQ9XCIke2lkfVwiPjwvaT5cclxuXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J3RhZ3MgYm94Jz5cclxuICAgICAgPHA+JHt0YWdzfTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0nY3JlYXRlZEF0IGJveCc+XHJcbiAgICAgIDxwPiR7Y3JlYXRlZEF0fTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0nYnRuIGJveCc+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9J29wZW4tdGFiJyBkYXRhLXVybD1cIiR7dXJsfVwiPlxyXG4gICAgICAgIG9wZW5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdkZWxldGUtdGFiJyBkYXRhLXRhYmlkPVwiJHtpZH1cIj5cclxuICAgICAgICBkZWxldGVcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn1cclxuXHJcbmNvbnN0IGFyY2hpdmVJbm5lclRlbXBsYXRlID0gZnVuY3Rpb24gKGFyY2hpdmUsIHVuY2xhc3NpZmllZERPTVMpIHtcclxuICBjb25zdCB7IGFyY2hpdmVOYW1lLCBhcmNoaXZlc0xpc3QsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdhcmNoaXZlLWNvbnRhaW5lcic+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWJhclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J2FyY2hpdmUtdGl0bGUnIGRhdGEtaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9J2ZhcyBmYS10aW1lcy1jaXJjbGUgY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50IG5vbmUnPjwvaT5cclxuICAgICAgICAgIDxoMyBjbGFzcz0ndGl0bGUtdGV4dCc+JHthcmNoaXZlTmFtZX08L2gzPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiMjVcIiB2YWx1ZT1cIiR7YXJjaGl2ZU5hbWV9XCIgY2xhc3M9J2FyY2hpdmUtdGl0bGUtaW5wdXQtY29udGVudCBub25lJz5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbi1hbHQgZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnRcIj48L2k+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVjay1jaXJjbGUgY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQgbm9uZVwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG5zXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJvcGVuLWFsbFwiIGRhdGEtaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgICAgIE9wZW4gQWxsXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS1hbGwtaW4tYXJjaGl2ZScgZGF0YS1pZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICAgICAgRGVsZXRlIEFsbFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxpbnB1dCBpZD1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiIGNsYXNzPSdhcmNoaXZlLWRyb3Bkb3duIG5vbmUnIHR5cGU9XCJjaGVja2JveFwiPlxyXG5cclxuICAgICAgPGxhYmVsIGZvcj1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J3Nob3ctaW5kaWNhdG9yJz5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWZvbGRlci1vcGVuIHVuZm9sZFwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWZvbGRlciBmb2xkXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2xhYmVsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmUtY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlc0xpc3RcIj5cclxuICAgICAgICAgIDxwPiR7YXJjaGl2ZXNMaXN0fTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFicy1saXN0XCI+XHJcbiAgICAgICAgICAke3VuY2xhc3NpZmllZERPTVN9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZW1wdHlUYWIgPSBgXHJcbiAgPGRpdiBjbGFzcz0ndGFiIGVtcHR5IHRhYi1zdHlsZSc+XHJcbiAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gIDwvZGl2PlxyXG5gXHJcblxyXG5leHBvcnQgY29uc3QgbW9kZWwgPSB7XHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluRGF0YShhcmNoaXZlTmFtZSkge1xyXG4gICAgY29uc3QgbmV3SWQgPSBkYXRhLmxhc3RBcmNoaXZlSWQgKz0gMVxyXG4gICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcignYXJjaGl2ZScsIG5ld0lkKVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmVEYXRhID0gbmV3IEFyY2hpdmVEYXRhKGFyY2hpdmVOYW1lLCBpZClcclxuXHJcbiAgICAvLyBwdXNoIG5ld0FyY2hpdmVEYXRhIHRvIGRhdGEuYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlLmFyY2hpdmVzTGlzdC5wdXNoKG5ld0FyY2hpdmVEYXRhKVxyXG5cclxuICAgIHJldHVybiBuZXdBcmNoaXZlRGF0YVxyXG4gIH0sXHJcbiAgY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGlkIH0gPSBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8YSBocmVmPVwiI2FyY2hpdmUtJHtpZH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuLWFsdCBlZGl0LWFyY2hpdmUtc2lkZWJhclwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZvbGRlclwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBjYW5jZWwtbmV3LWFyY2hpdmUtaW5wdXQtc2lkZWJhciBub25lXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxwPiR7YXJjaGl2ZU5hbWV9PC9wPlxyXG4gICAgICAgIDxpbnB1dCB2YWx1ZT1cIiR7YXJjaGl2ZU5hbWV9XCIgY2xhc3M9XCJub25lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGRlbGV0ZS1hcmNoaXZlXCIgZGF0YS1pZD1cIiR7aWR9XCI+PC9pPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2stY2lyY2xlIG5ldy1hcmNoaXZlLW5hbWUtaW5wdXQtc2lkZWJhciBub25lXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2E+XHJcbiAgICBgXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9ICdhcmNoaXZlIGFyY2hpdmUtc3R5bGUnXHJcbiAgICBuZXdBcmNoaXZlLmlkID0gYGFyY2hpdmUtJHtpZH0tc2lkZWJhcmBcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIGNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoYXJjaGl2ZSkge1xyXG4gICAgY29uc3QgeyB1bmNsYXNzaWZpZWQsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gICAgbGV0IHVuY2xhc3NpZmllZERPTVMgPSAnJ1xyXG5cclxuICAgIGlmICh1bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSB1bmNsYXNzaWZpZWQubWFwKGVhY2ggPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSd0YWIgdGFiLXN0eWxlJyBkcmFnZ2FibGU9XCJ0cnVlXCIgaWQ9XCJ0YWItJHtlYWNoLmlkfVwiIGRhdGEtaWQ9XCIke2VhY2guaWR9XCI+XHJcbiAgICAgICAgICAgICR7dGFiSW5uZXJUZW1wbGF0ZShlYWNoKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgICAgfSkuam9pbignJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSBlbXB0eVRhYlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbmV3QXJjaGl2ZS5pbm5lckhUTUwgPSBhcmNoaXZlSW5uZXJUZW1wbGF0ZShhcmNoaXZlLCB1bmNsYXNzaWZpZWRET01TKVxyXG5cclxuICAgIG5ld0FyY2hpdmUuaWQgPSBgYXJjaGl2ZS0ke2lkfWBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gYGFyY2hpdmUgZHJvcHpvbmUgYXJjaGl2ZS1zdHlsZSBhcmNoaXZlLSR7aWR9LWNvbnRlbnRgXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVUYWJET01JbkNvbnRlbnQodGFiRGF0YSkge1xyXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHRhYi5pbm5lckhUTUwgPSB0YWJJbm5lclRlbXBsYXRlKHRhYkRhdGEpXHJcbiAgICB0YWIuY2xhc3NMaXN0ICs9ICd0YWIgdGFiLXN0eWxlJ1xyXG4gICAgdGFiLmlkID0gYHRhYi0ke3RhYkRhdGEuaWR9YFxyXG4gICAgdGFiLmRhdGFzZXQuaWQgPSB0YWJEYXRhLmlkXHJcbiAgICB0YWIuZHJhZ2dhYmxlID0gdHJ1ZVxyXG4gICAgcmV0dXJuIHRhYlxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0U3RvcmFnZURhdGEodGFyZ2V0RGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbdGFyZ2V0RGF0YV0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVqZWN0IScpXHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IGZhbHNlLCBzdGF0dXM6IFwiY29tcGxldGVcIiB9LCAocXVlcnlSZXN1bHQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRhYnMgPSBbXVxyXG4gICAgICAgICAgZm9yIChsZXQgdGFiIG9mIHF1ZXJ5UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAodGFiLnRpdGxlID09PSBcImNocm9tZS50YWJzIC0gQ2hyb21lIERldmVsb3BlcnNcIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybCA9PT0gXCJjaHJvbWU6Ly9leHRlbnNpb25zL1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsLnNwbGl0KCc6Ly8nKVswXSA9PT0gJ2Nocm9tZS1leHRlbnNpb24nKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSAnY2hyb21lOi8vbmV3dGFiLycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2xlYXJcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYi5pZClcclxuXHJcbiAgICAgICAgICAgIC8vIGZvcm0gdGFiRGF0YVxyXG4gICAgICAgICAgICAvLyBjb25zdCB0aXRsZSA9IHV0aWxzLnRyaW1TdHJpbmcodXRpbHMuZXNjYXBlSHRtbCh0YWIudGl0bGUpLCA0NSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgZmF2SWNvblVybDogaWNvbiwgdXJsLCB0aXRsZSB9ID0gdGFiXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGlkXHJcbiAgICAgICAgICAgIGRhdGEubGFzdFRhYklkKytcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcigndGFiJywgZGF0YS5sYXN0VGFiSWQpXHJcblxyXG4gICAgICAgICAgICB0YWJzLnB1c2gobmV3IFRhYkRhdGEoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHRhYnMpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBzdG9yZUFyY2hpdmUoKSB7XHJcbiAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBjb25zdCB7IGFyY2hpdmUgfSA9IGRhdGFcclxuICAgIGFyY2hpdmUuYXJjaGl2ZU5hbWUgPSAncm9vdC1hcmNoaXZlJ1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgbWVzc2FnZTogJ3N0b3JlLWFyY2hpdmUnLFxyXG4gICAgICBkYXRhOiBhcmNoaXZlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3VycmVudFN5bmNTdG9yYWdlID0gdXRpbHMuc2l6ZU9mRGF0YShhcmNoaXZlKVxyXG4gICAgLy8gY29uc29sZS5sb2coY3VycmVudFN5bmNTdG9yYWdlKVxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1tJbmRleF0gJywgbWVzc2FnZSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgdXBkYXRlVGFiKGFyY2hpdmUsIHRhYklkLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IHRhYklkXHJcbiAgICBjb25zb2xlLmxvZygnaW4gdXBkYXRlVGFiJywgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBoaXQ6ICcsIHRhYk5hbWVJbnB1dClcclxuICAgICAgICAgICAgdGFiLnRpdGxlID0gdGFiTmFtZUlucHV0XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmUoYXJjaGl2ZSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gYXJjaGl2ZVRpdGxlSW5wdXRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS5hcmNoaXZlTmFtZSA9IGFyY2hpdmVUaXRsZUlucHV0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICB9LFxyXG4gIHJlbW92ZVRhYihhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgY29uc3QgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUudW5jbGFzc2lmaWVkLmluZGV4T2YodGFiKVxyXG4gICAgICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICByZW1vdmVBcmNoaXZlKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZGVsZXRlQXJjaGl2ZUJ5SWQgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUuYXJjaGl2ZXNMaXN0LmluZGV4T2Yoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgIGFyY2hpdmUuYXJjaGl2ZXNMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlQXJjaGl2ZUJ5SWQoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBcmNoaXZlQnlJZChhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIC8vIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkID0gW11cclxuICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IGFyY2hpdmVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS51bmNsYXNzaWZpZWQgPSBbXVxyXG4gICAgICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKSB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgaWQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyIHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgaWNvbjogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5pY29uIGltZycpLnNyYyxcclxuICAgICAgdGl0bGU6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICB0YWdzOiB0YWJET00ucXVlcnlTZWxlY3RvcignLnRhZ3MgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICBjcmVhdGVkQXQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlZEF0IHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgdXJsOiB0YWJET00ucXVlcnlTZWxlY3RvcignLmJ0biBidXR0b24nKS5kYXRhc2V0LnVybCxcclxuICAgICAgdXBkYXRlZEF0OiAnJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIHNlYXJjaFRhYnMoYXJjaGl2ZSwgcXVlcnlCb2R5KSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXVxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeVF1ZXJ5Qm9keSA9IChhcmNoaXZlLCBxdWVyeUJvZHkpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5UXVlcnlCb2R5KHN1YkFyY2hpdmUsIHF1ZXJ5Qm9keSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAocXVlcnlCb2R5ID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0YWIpXHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAodGFiLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnlCb2R5KSkgfHxcclxuICAgICAgICAgICAgKHRhYi5pZC5pbmNsdWRlcyhxdWVyeUJvZHkpKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRhYilcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlRdWVyeUJvZHkoc3ViQXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZFRhYkJ5UXVlcnlCb2R5KGFyY2hpdmUsIHF1ZXJ5Qm9keSlcclxuXHJcbiAgICAvLyBzdG9yZSBzZWFyY2ggcmVzdWx0IGluIGxvY2FsIGRhdGFcclxuICAgIGRhdGEuc2VhcmNoUmVzdWx0ID0gcmVzdWx0XHJcblxyXG4gICAgLy8gcmV0dXJuIHJlc3VsdCBmb3Igdmlld1xyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH0sXHJcblxyXG4gIC8vIHJlY3Vyc2l2ZSBzZWFyY2ggcHJvdG90eXBlIC8vXHJcbiAgc2VhcmNoVGFiQnlJZChhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gdGFiSWRcclxuXHJcbiAgICBjb25zdCBmaW5kVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YWIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gIH0sXHJcbiAgc2VhcmNoQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gYXJjaGl2ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIHRhcmdldEFyY2hpdmVcclxuICB9LFxyXG59IiwiZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xyXG4gIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICAvLyB0eXBlID0gXCJ0YWJcIiB8fCBcImFyY2hpdmVcIlxyXG4gICAgbGV0IG1vZGUgPSB0eXBlID09PSAndGFiJyA/IDUgOiAzXHJcbiAgICBudW0gPSBudW0gKyAnJ1xyXG4gICAgbGV0IG91dHB1dCA9IG51bS5zcGxpdCgnJylcclxuICAgIGlmIChudW0ubGVuZ3RoIDwgbW9kZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGUgLSBudW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBvdXRwdXQudW5zaGlmdCgnMCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQuam9pbignJylcclxuICB9LFxyXG4gIGVzY2FwZUh0bWw6IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmdcclxuICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxuICB9LFxyXG4gIHRyaW1TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcsIG1leGxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoMCwgbWV4bGVuZ3RoKVxyXG4gIH0sXHJcbiAgaW1hZ2VIb2xkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzMyLzAxMTYxZS9mZmY/dGV4dD0/J1xyXG4gIH0sXHJcbiAgc2l6ZU9mRGF0YTogZnVuY3Rpb24gKG9iamVjdCkge1xyXG5cclxuICAgIHZhciBvYmplY3RMaXN0ID0gW107XHJcbiAgICB2YXIgc3RhY2sgPSBbb2JqZWN0XTtcclxuICAgIHZhciBieXRlcyA9IDA7XHJcblxyXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBzdGFjay5wb3AoKTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIGJ5dGVzICs9IDQ7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGJ5dGVzICs9IHZhbHVlLmxlbmd0aCAqIDI7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGJ5dGVzICs9IDg7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZlxyXG4gICAgICAgIChcclxuICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXHJcbiAgICAgICAgJiYgb2JqZWN0TGlzdC5pbmRleE9mKHZhbHVlKSA9PT0gLTFcclxuICAgICAgKSB7XHJcbiAgICAgICAgb2JqZWN0TGlzdC5wdXNoKHZhbHVlKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgc3RhY2sucHVzaCh2YWx1ZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnl0ZXM7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyBlbXB0eVRhYiB9IGZyb20gJy4vbW9kZWwuanMnXHJcblxyXG4vLyBub3QgZG9uZVxyXG5jb25zdCBkZXRlY3REcm9wTG9jYXRpb24gPSBmdW5jdGlvbiAodGFiSWQsIGRyYWdlbnRlciwgZHJhZ2xlYXZlKSB7XHJcbiAgY29uc29sZS5sb2coJ3RhYklkOiAgICAgJyArIHRhYklkKVxyXG4gIGNvbnNvbGUubG9nKCdkcmFnZW50ZXI6ICcgKyBkcmFnZW50ZXIpXHJcbiAgY29uc29sZS5sb2coJ2RyYWdsZWF2ZTogJyArIGRyYWdsZWF2ZSlcclxuICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tJylcclxuICBsZXQgcmVzdWx0ID0gJ25vIGRldGVjdCdcclxuICBpZiAoKHRhYklkID09PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKSkge1xyXG4gICAgcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcbiAgfSBlbHNlIGlmICgodGFiSWQgIT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpKSB7XHJcbiAgICByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuICB9IGVsc2UgaWYgKChkcmFnZW50ZXIgPT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKSkge1xyXG4gICAgcmVzdWx0ID0gYGJlZm9yZSAke2RyYWdsZWF2ZX1gXHJcbiAgfSBlbHNlIGlmICgoZHJhZ2VudGVyICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcikpIHtcclxuICAgIHJlc3VsdCA9IGBhZnRlciAke2RyYWdlbnRlcn1gXHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZygncmVzdWx0OiAnICsgcmVzdWx0KVxyXG4gIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0nKVxyXG4gIHJldHVyblxyXG59XHJcblxyXG4vLyAodGFiSWQgPT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpXHJcbi8vIEEgQSBBXHJcbi8vIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG5cclxuLy8gKHRhYklkICE9PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKVxyXG4vLyBBIEIgQVxyXG4vLyByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuXHJcbi8vIChkcmFnZW50ZXIgPT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKVxyXG4vLyBBIEIgQiBcclxuLy8gZHJhZ2xlYXZlIOeahOWJjeS4gOWAi1xyXG5cclxuLy8gKGRyYWdlbnRlciAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpXHJcbi8vIEEgQiBDXHJcbi8vIGRyYWdsZWF2ZSDnmoTliY3kuIDlgItcclxuXHJcbmV4cG9ydCBjb25zdCB2aWV3ID0ge1xyXG4gIHNob3dUYWJzSW5Db250ZW50KGRhdGEpIHtcclxuICAgIC8vIGRhdGE6IHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG4gICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIHRhYnNMaXN0LmlubmVySFRNTCA9IGVtcHR5VGFiXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgdGFiIG9mIGRhdGEpIHtcclxuICAgICAgY29uc3QgbmV3VGFiID0gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYilcclxuICAgICAgLy8gYWRkIGV2ZW50TGlzdGVuZXIgdG8gbmV3IHRhYnMgLy9cclxuICAgICAgdGhpcy5zZXRVcFRhYkRyYWdBbmREcm9wU3lzdGVtKG5ld1RhYilcclxuXHJcbiAgICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKG5ld1RhYilcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dSb290QXJjaGl2ZUxpc3QobGlzdCkge1xyXG4gICAgLy8gbGlzdDogcm9vdC5hcmNoaXZlc0xpc3RcclxuICAgIGNvbnN0IHNpZGViYXJBcmNoaXZlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuYXJjaGl2ZXNMaXN0JylcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcblxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1NpZGViYXJBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGl0ZW0pXHJcbiAgICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3U2lkZWJhckFyY2hpdmUpXHJcblxyXG4gICAgICBjb25zdCBuZXdDb250ZW50QXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoaXRlbSlcclxuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChuZXdDb250ZW50QXJjaGl2ZSlcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICAvLyBoaWRlIGlucHV0IGljb25cclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuaWNvbicpXHJcbiAgICBpY29uLmNsYXNzTmFtZSArPSAnIG5vbmUnXHJcblxyXG4gICAgLy8gaGlkZSA8cD5cclxuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBwJylcclxuICAgIGlmICghcC5jbGFzc05hbWUuaW5jbHVkZXMoJ25vbmUnKSkge1xyXG4gICAgICBwLmNsYXNzTmFtZSArPSAnIG5vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dCBVSVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBpbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNhbmNlbCcpXHJcbiAgICBjb25zdCBjb25maXJtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jb25maXJtJylcclxuXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNvbmZpcm1JY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwgTmV3IEFyY2hpdmUgSW5wdXQnKVxyXG5cclxuICAgIC8vcmVzdG9yZSBcclxuICAgIC8vIGhpZGUgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG4gICAgY29uZmlybUljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuXHJcbiAgICAvLyBzaG93IGlucHV0IGljb25cclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuaWNvbicpXHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIHNob3cgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcC5zaG93LW5ldy1hcmNoaXZlLWlucHV0JylcclxuICAgIHAuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gY2xlYXIgaW5wdXQgdmFsdWVcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlID0gJydcclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJblNpZGViYXIobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURPTSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG5cclxuICAgIC8vIHB1c2ggbmV3QXJjaGl2ZURPTSBpbnRvIHNpZGViYXJBcmNoaXZlc0xpc3RcclxuICAgIGNvbnN0IHNpZGViYXJBcmNoaXZlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuYXJjaGl2ZXNMaXN0JylcclxuICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3QXJjaGl2ZURPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJbkNvbnRlbnQobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgIGNvbnN0IG5ld0FyY2hpdmVET00gPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcbiAgICB0aGlzLnNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKG5ld0FyY2hpdmVET00pXHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0FyY2hpdmVET00pXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIC8vIGVkaXQgdGFiIG5hbWVcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIC8vIG1ha2UgdGFiIHVuZHJhZ2dhYmxlXHJcbiAgICB0YXJnZXRUYWJET00uZHJhZ2dhYmxlID0gZmFsc2VcclxuXHJcbiAgICBjb25zdCBjYW5jZWxFZGl0VGFiSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LXRhYi1pbnB1dCcpXHJcbiAgICBjb25zdCB0aXRsZVAgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmVkaXQtdGFiLW5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgY29uZmlybVRhYkVkaXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tdGFiLWVkaXQnKVxyXG4gICAgY29uc3Qgc2hvd0VkaXRUYWJOYW1lID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5zaG93LWVkaXQtdGFiLW5hbWUnKVxyXG5cclxuICAgIC8vIGhpZGUgLnRpdGxlIHBcclxuICAgIHRpdGxlUC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIHNob3dFZGl0VGFiTmFtZS5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuXHJcbiAgICAvLyBwYXNzIHRpdGxlIHRvIGlucHV0IHZhbHVlXHJcbiAgICBpbnB1dC52YWx1ZSA9IHRpdGxlUC50ZXh0Q29udGVudFxyXG5cclxuICAgIC8vIHNob3cgaW5wdXRcclxuICAgIGNhbmNlbEVkaXRUYWJJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY29uZmlybVRhYkVkaXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB0YXJnZXRUYWJET00uZHJhZ2dhYmxlID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gdG8gc2hvd1xyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgLy8gdG8gaGlkZVxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICB9LFxyXG4gIHVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICB0aXRsZVAudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICB9LFxyXG4gIC8vIGVkaXQgYXJjaGl2ZSB0aXRsZVxyXG4gIHNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiAudGl0bGUtdGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHVwZGF0ZUljb24sIGNhbmNlbEljb25cclxuICAgIHVwZGF0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiB1cGRhdGVJY29uLCBjYW5jZWxJY29uXHJcbiAgICB1cGRhdGVJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHRpdGxlVGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmVUaXRsZSh0YXJnZXRUYWJET00sIGFyY2hpdmVJZCwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZSB0aXRsZSBpbiBjb250ZW50XHJcbiAgICBjb25zdCBhcmNoaXZlVGl0bGVDb250ZW50ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JylcclxuICAgIGFyY2hpdmVUaXRsZUNvbnRlbnQudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZSB0aXRsZSBpbiBzaWRlYmFyXHJcbiAgICBjb25zdCBhcmNoaXZlVGl0bGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FyY2hpdmUtJHthcmNoaXZlSWR9LXNpZGViYXJgKVxyXG4gICAgYXJjaGl2ZVRpdGxlU2lkZWJhci5xdWVyeVNlbGVjdG9yKCdwJykudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgLy8gZWRpdCBhcmNoaXZlIHRpdGxlIHNpZGViYXJcclxuICBzaG93RWRpdEFyY2hpdmVJbnB1dFNpZGViYXIodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0YXJnZXRUYWJET00pXHJcbiAgICBjb25zdCBjYW5jZWwgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1uZXctYXJjaGl2ZS1pbnB1dC1zaWRlYmFyJylcclxuICAgIGNvbnN0IGZvbGRlciA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZmEtZm9sZGVyJylcclxuICAgIGNvbnN0IGVkaXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmVkaXQtYXJjaGl2ZS1zaWRlYmFyJylcclxuICAgIGNvbnN0IHVwZGF0ZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcubmV3LWFyY2hpdmUtbmFtZS1pbnB1dC1zaWRlYmFyJylcclxuICAgIGNvbnN0IGRlbGV0ZUljb24gPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1hcmNoaXZlJylcclxuICAgIGNvbnN0IHRpdGxlID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJ3AnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignaW5wdXQnKVxyXG5cclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgY2FuY2VsLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgdXBkYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgZWRpdC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGZvbGRlci5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0QXJjaGl2ZUlucHV0U2lkZWJhcih0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnN0IGNhbmNlbCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW5ldy1hcmNoaXZlLWlucHV0LXNpZGViYXInKVxyXG4gICAgY29uc3QgZm9sZGVyID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5mYS1mb2xkZXInKVxyXG4gICAgY29uc3QgZWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXNpZGViYXInKVxyXG4gICAgY29uc3QgdXBkYXRlID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5uZXctYXJjaGl2ZS1uYW1lLWlucHV0LXNpZGViYXInKVxyXG4gICAgY29uc3QgZGVsZXRlSWNvbiA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWFyY2hpdmUnKVxyXG4gICAgY29uc3QgdGl0bGUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcigncCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXHJcblxyXG4gICAgdGl0bGUuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjYW5jZWwuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICB1cGRhdGUuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBlZGl0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgZm9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmVUaXRsZVNpZGViYXIodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0YXJnZXRUYWJET00pXHJcbiAgfSxcclxuICByZW1vdmVUYWIodGFiQmFyKSB7XHJcbiAgICB0YWJCYXIucmVtb3ZlKClcclxuICB9LFxyXG4gIHJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyByZW1vdmUgYXJjaGl2ZSBmcm9tIHNpZGViYXJcclxuICAgIGFyY2hpdmVCYXIucmVtb3ZlKClcclxuXHJcbiAgICAvLyByZW1vdmUgYXJjaGl2ZSBpbiBjb250ZW50XHJcbiAgICBjb25zdCBhcmNoaXZlQmFySW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FyY2hpdmUtJHthcmNoaXZlSWR9YClcclxuICAgIGFyY2hpdmVCYXJJbkNvbnRlbnQucmVtb3ZlKClcclxuXHJcbiAgfSxcclxuICBjbGVhclRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zb2xlLmxvZygnYXJjaGl2ZUlkOiAnLCBhcmNoaXZlSWQpXHJcbiAgICAvLyByZXR1cm5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRMaXN0ID0gJydcclxuXHJcbiAgICBpZiAoYXJjaGl2ZUlkID09PSAnMDAxJykge1xyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCAudGFicy1saXN0JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0YFxyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgdW5jbGFzc2lmaWVkTGlzdC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgfSxcclxuICBzaG93U2VhcmNoUmVzdWx0KHRhYnNBcnJheSkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgIGNvbnN0IGFyY2hpdmVzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJjaGl2ZScpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZFRhYnNMaXN0ID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZERhdGFCYXIgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLmRhdGEtYmFyJylcclxuICAgIGNvbnN0IG9wZW5BbGxCdG4gPSB1bmNsYXNzaWZpZWREYXRhQmFyLnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLWFsbCcpXHJcbiAgICBjb25zdCBkZWxldGVBbGxCdG4gPSB1bmNsYXNzaWZpZWREYXRhQmFyLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtYWxsLWluLWFyY2hpdmUnKVxyXG5cclxuICAgIC8vIHNldCBvcGVuLWFsbCBidXR0b24gJiBkZWxldGUtYWxsIGJ1dHRvbiBvbiBzZWFyY2hcclxuICAgIG9wZW5BbGxCdG4uY2xhc3NMaXN0LmFkZCgnb24tc2VhcmNoJylcclxuICAgIGRlbGV0ZUFsbEJ0bi5jbGFzc0xpc3QuYWRkKCdvbi1zZWFyY2gnKVxyXG5cclxuICAgIC8vIGhpZGUgYXJjaGl2ZXNcclxuICAgIGFyY2hpdmVzLmZvckVhY2goZWFjaCA9PiBlYWNoLmNsYXNzTGlzdC5hZGQoJ25vbmUnKSlcclxuXHJcbiAgICAvLyBjbGVhciB1bmNsYXNzaWZpZWRUYWJzXHJcbiAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG5cclxuICAgIC8vIGlmICF0YWJzRGF0YS5sZW5ndGhcclxuICAgIGlmICghdGFic0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5pbm5lckhUTUwgKz0gZW1wdHlUYWJcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGFic0RhdGEubGVuZ3RoXHJcbiAgICBjb25zdCB0YWJzRE9NID0gdGFic0FycmF5Lm1hcCh0YWIgPT4gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYikpXHJcblxyXG4gICAgdGFic0RPTS5mb3JFYWNoKHRhYkRPTSA9PiB7XHJcbiAgICAgIHVuY2xhc3NpZmllZFRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuICAgIH0pXHJcbiAgfSxcclxuICByZXN0b3JlQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcbiAgICBjb25zdCBhcmNoaXZlcyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLmFyY2hpdmUnKVxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCcpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWRUYWJzTGlzdCA9IHVuY2xhc3NpZmllZC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWREYXRhQmFyID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy5kYXRhLWJhcicpXHJcbiAgICBjb25zdCBvcGVuQWxsQnRuID0gdW5jbGFzc2lmaWVkRGF0YUJhci5xdWVyeVNlbGVjdG9yKCcub3Blbi1hbGwnKVxyXG4gICAgY29uc3QgZGVsZXRlQWxsQnRuID0gdW5jbGFzc2lmaWVkRGF0YUJhci5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWFsbC1pbi1hcmNoaXZlJylcclxuXHJcbiAgICAvLyBzZXQgb3Blbi1hbGwgYnV0dG9uICYgZGVsZXRlLWFsbCBidXR0b24gb24gc2VhcmNoXHJcbiAgICBvcGVuQWxsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ29uLXNlYXJjaCcpXHJcbiAgICBkZWxldGVBbGxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnb24tc2VhcmNoJylcclxuXHJcbiAgICAvLyBzaG93IGFyY2hpdmVzXHJcbiAgICBhcmNoaXZlcy5mb3JFYWNoKGVhY2ggPT4gZWFjaC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJykpXHJcblxyXG4gICAgLy8gY2xlYXIgdW5jbGFzc2lmaWVkVGFic1xyXG4gICAgdW5jbGFzc2lmaWVkVGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICAvLyByZXN0b3JlIHVuY2xhc3NpZmllZCB0YWJzLCBnZXQgZGF0YSB2aWEgbW9kZWxcclxuICAgIGNvbnN0IE9yaWdpbmFsVW5jbGFzc2lmaWVkRGF0YSA9IGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWRcclxuICAgIE9yaWdpbmFsVW5jbGFzc2lmaWVkRGF0YS5mb3JFYWNoKHRhYiA9PiB7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsVGFiSW5VbmNsYXNzaWZpZWQgPSBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKVxyXG4gICAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5hcHBlbmRDaGlsZChvcmlnaW5hbFRhYkluVW5jbGFzc2lmaWVkKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvLyBjb25maXJtIGFsZXJ0XHJcbiAgY29uZmlybSh0ZXh0LCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQnKVxyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKVxyXG5cclxuICAgIC8vIHRvIHNob3cgYWxlcnRcclxuICAgIGFsZXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gb3ZlcndyaXRlIHRleHRcclxuICAgIGNvbnN0IGFsZXJ0Q29udGVudCA9IGFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWNvbnRlbnQnKVxyXG4gICAgYWxlcnRDb250ZW50LnRleHRDb250ZW50ID0gdGV4dFxyXG5cclxuICAgIGNvbnN0IGFmZmlybWF0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tYWZmaXJtYXRpdmUnKVxyXG4gICAgY29uc3QgbmVnYXRpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZWdhdGl2ZScpXHJcblxyXG4gICAgLy8gYWRkIGV2ZW50TGlzdGVuZXIgdG8gYnV0dG9uc1xyXG4gICAgYWZmaXJtYXRpdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgICAgY2FsbGJhY2sodHJ1ZSlcclxuICAgIH0pXHJcblxyXG4gICAgbmVnYXRpdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgICAgY2FsbGJhY2soZmFsc2UpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8vIGRyYWcgYW5kIGRyb3AgaGFuZGxlcnNcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIGN1cnJlbnQgZGF0YVxyXG4gIC8vIGFyY2hpdmVzIGFuZCB0YWJzXHJcbiAgc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpIHtcclxuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuXHJcbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRoaXMuc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbSh0YWIpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZTogdW5jbGFzc2lmaWVkLCBkcm9wem9uZVxyXG4gICAgY29uc3QgZHJvcHpvbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3B6b25lJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQnKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3IgYXJjaGl2ZXNcclxuICAgIGRyb3B6b25lcy5mb3JFYWNoKGRyb3B6b25lID0+IHRoaXMuc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0oZHJvcHpvbmUpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3Igcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIHRoaXMuc2V0VXBVbmNsYXNzaWZpZWREcmFnQW5kRHJvcFN5c3RlbSh1bmNsYXNzaWZpZWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHsgdGhpcy51bmNsYXNzaWZpZWREcm9wcGVkSGFuZGxlcihlLCB1bmNsYXNzaWZpZWQpIH0pXHJcbiAgfSxcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIG5ldyBjcmVhdGVkIHRhYlxyXG4gIHNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0odGFiRE9NKSB7XHJcbiAgICAvLyBlbXB0eSB0YWIgaXMgbm90IGRyYWdnYWJsZVxyXG4gICAgaWYgKHRhYkRPTS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpIHJldHVyblxyXG5cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnJywgKGUpID0+IHtcclxuICAgICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgICAgY29uc3QgeyBjbGllbnRZIH0gPSBlXHJcbiAgICAgIGNvbnN0IGN1cnJlbkhlaWdodFBlcmNlbnQgPSBjbGllbnRZIC8gdmlld3BvcnRIZWlnaHQgKiAxMDBcclxuICAgICAgY29uc29sZS5sb2coY3VycmVuSGVpZ2h0UGVyY2VudClcclxuICAgICAgaWYgKGN1cnJlbkhlaWdodFBlcmNlbnQgPCAxNSkge1xyXG4gICAgICAgIGNvbnRlbnQuc2Nyb2xsQnkoe1xyXG4gICAgICAgICAgdG9wOiAtMzAwLFxyXG4gICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY3VycmVuSGVpZ2h0UGVyY2VudCA+IDk1KSB7XHJcbiAgICAgICAgY29udGVudC5zY3JvbGxCeSh7XHJcbiAgICAgICAgICB0b3A6IDMwMCxcclxuICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB0YXJnZXQuaWRcclxuXHJcbiAgICAgIC8vIGRhdGFUcmFuc2Zlci5zZXREYXRhXHJcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBwYXlsb2FkKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBkZXRlY3QgZHJvcCBsb2NhdGlvblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8vIGRyYWdsZWF2ZSA9IHRhYi5pZFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIG5ldyBjcmVhdGVkIGFyY2hpdmVcclxuICBzZXRVcEFyY2hpdmVEcmFnQW5kRHJvcFN5c3RlbShhcmNoaXZlRE9NKSB7XHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7IHRoaXMuYXJjaGl2ZURyb3BwZWRIYW5kbGVyKGUsIGFyY2hpdmVET00pIH0pXHJcbiAgfSxcclxuICBzZXRVcFVuY2xhc3NpZmllZERyYWdBbmREcm9wU3lzdGVtKHVuY2xhc3NpZmllZERPTSkge1xyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWRET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgfSxcclxuICBwcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkge1xyXG4gICAgLy8gZGVmYXVsdDogdGFnIGNhbm5vdCBiZSBkcmFnZ2VkXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyB0aGVuIG91ciBET00gY2FuIGJlIGRyYWdnZWQgaW5zaWRlXHJcbiAgfSxcclxuICBhcmNoaXZlRHJvcHBlZEhhbmRsZXIoZSwgYXJjaGl2ZURPTSkge1xyXG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSlcclxuXHJcbiAgICBjb25zdCB0YWJET01JZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3QgdGFiRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGFiRE9NSWR9YClcclxuICAgIGNvbnNvbGUubG9nKCd0YWJET01JZDogJyArIHRhYkRPTUlkKVxyXG4gICAgY29uc3QgdGFic0xpc3QgPSBhcmNoaXZlRE9NLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IGlzVGFic0xpc3RFbXB0eSA9IHRoaXMudGFic0xpc3RDaGVjayh0YWJzTGlzdClcclxuICAgIC8vIGNvbnNvbGUubG9nKCdpc1RhYnNMaXN0RW1wdHk6ICcgKyBpc1RhYnNMaXN0RW1wdHkpXHJcbiAgICBpZiAoaXNUYWJzTGlzdEVtcHR5KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBcIk5PIHRhYiBoZXJlIHlldFwiIFxyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCBuZXcgdGFiRE9NIGludG8gdGFic0xpc3RcclxuICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuXHJcbiAgICAvLyBjcmVhdGUgdGFiRGF0YSBmb3Igc3RvcmFnZVxyXG4gICAgY29uc3QgdGFiRGF0YSA9IG1vZGVsLmdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKVxyXG5cclxuICAgIC8vIGZpbmQgYXJjaGl2ZSBieSBJZCwgYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSBhcmNoaXZlRE9NLmRhdGFzZXQuYXJjaGl2ZUlkXHJcblxyXG4gICAgLy8gZGVsZXRlIG9yaWdpbmFsIHRhYlxyXG4gICAgY29uc3QgdGFiSWQgPSB0YWJET01JZC5zcGxpdCgnLScpWzFdXHJcbiAgICBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB0YXJnZXRBcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYkRhdGEpXHJcblxyXG4gICAgLy8gY2FsbCBtb2RlbCB0byBzdG9yZSBkYXRhXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgdW5jbGFzc2lmaWVkRHJvcHBlZEhhbmRsZXIoZSwgdW5jbGFzc2lmaWVkKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHRhYkRPTUlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBjb25zb2xlLmxvZygndGFiRE9NSWQ6ICcgKyB0YWJET01JZClcclxuICAgIGNvbnN0IHRhYkRPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RhYkRPTUlkfWApXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IHVuY2xhc3NpZmllZC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCBpc1RhYnNMaXN0RW1wdHkgPSB0aGlzLnRhYnNMaXN0Q2hlY2sodGFic0xpc3QpXHJcbiAgICBjb25zb2xlLmxvZygnaXNUYWJzTGlzdEVtcHR5OiAnICsgaXNUYWJzTGlzdEVtcHR5KVxyXG5cclxuICAgIGlmIChpc1RhYnNMaXN0RW1wdHkpIHtcclxuICAgICAgLy8gcmVtb3ZlIFwiTk8gdGFiIGhlcmUgeWV0XCIgXHJcbiAgICAgIHRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIG5ldyB0YWJET00gaW50byB0YWJzTGlzdFxyXG4gICAgLy8gYWx0ZXJuYXRpdmUgLmluc2VydEJlZm9yZSgpOlxyXG4gICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQodGFiRE9NKVxyXG5cclxuICAgIGNvbnN0IHRhYkRhdGEgPSBtb2RlbC5nZXRUYWJEYXRhVmlhVGFiRE9NKHRhYkRPTSlcclxuXHJcbiAgICAvLyBkZWxldGUgb3JpZ2luYWwgdGFiXHJcbiAgICBjb25zdCB0YWJJZCA9IHRhYkRPTUlkLnNwbGl0KCctJylbMV1cclxuICAgIG1vZGVsLnJlbW92ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG4gICAgLy8gY29uc29sZS5sb2coKVxyXG5cclxuICAgIC8vIGZpbmQgYXJjaGl2ZSBieSBJZCwgYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSAnMDAxJ1xyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZSA9IG1vZGVsLnNlYXJjaEFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG4gICAgdGFyZ2V0QXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWJEYXRhKVxyXG5cclxuICAgIC8vIGNhbGwgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyBkZXRlY3REcm9wTG9jYXRpb24odGFiRE9NSWQsIGRyYWdlbnRlciwgZHJhZ2xlYXZlKVxyXG4gIH0sXHJcbiAgdGFic0xpc3RDaGVjayh0YWJzTGlzdCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRhYnNMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWInKVxyXG4gICAgcmV0dXJuICgoY29udGVudC5sZW5ndGggPT09IDEpICYmIChjb250ZW50WzBdLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkpXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3N0eWxlcy9ub3JtYWxpemUuc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwbGljYXRpb24uc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvaW5kZXguc2NzcydcclxuXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbmltcG9ydCB7IGNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuanMnXHJcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdbSW5kZXhdIEluZGV4Lmh0bWwgbG9hZGVkISBBc2sgZm9yIGFyY2hpdmUgZGF0YSEnKVxyXG4gIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICBtZXNzYWdlOiAnZ2V0LWFyY2hpdmUtZGF0YScsXHJcbiAgICBkYXRhOiBudWxsXHJcbiAgfVxyXG5cclxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAocmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdIHJlY2VpdmVkIGFyY2hpdmUgZGF0YScsIHJlc3BvbnNlKVxyXG4gICAgY29uc3QgeyBhcmNoaXZlLCBsYXN0VGFiSWQsIGxhc3RBcmNoaXZlSWQgfSA9IHJlc3BvbnNlXHJcbiAgICBkYXRhLmxhc3RUYWJJZCA9IGxhc3RUYWJJZFxyXG4gICAgZGF0YS5sYXN0QXJjaGl2ZUlkID0gbGFzdEFyY2hpdmVJZFxyXG4gICAgY29udHJvbGxlci5pbml0TG9jYWxBcmNoaXZlRGF0YShhcmNoaXZlKVxyXG5cclxuICAgIC8vIHNldHVwIGRyb3AgaXRlbSAmIGRyb3Agem9uZVxyXG4gICAgY29udHJvbGxlci5zZXRVcERyYWdBbmREcm9wU3lzdGVtKClcclxuICB9KTtcclxufVxyXG5cclxuLy8gY2xpY2sgZXZlbnRMaXN0ZW5lclxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcblxyXG4gIC8vIGNhbmNlbCBzaG93IGlucHV0XHJcbiAgLy8gY29udHJvbGxlci5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG5cclxuICAvLyBnZXQgYWxsIG9wZW5lZCB0YWJzXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdnZXQtYWxsLWJ0bicpIHtcclxuICAgIGNvbnRyb2xsZXIuZ2V0QWxsT3BlbmVkVGFicygpXHJcbiAgfVxyXG5cclxuICAvLyBvZXBuIGFsbCB0YWJzIGluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi1hbGwnKSkge1xyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvbi1zZWFyY2gnKSkge1xyXG4gICAgICBjb250cm9sbGVyLm9wZW5BbGxTZWFyY2hUYWJzKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb250cm9sbGVyLm9wZW5BbGxUYWJzKGFyY2hpdmVJZClcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgLy8gb3BlbiBjZXRhaW4gdGFiIGluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ29wZW4tdGFiJykge1xyXG4gICAgY29uc3QgdXJsID0gdGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICB9XHJcblxyXG4gIC8vIHNob3cgbmV3IGFyY2hpdmUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1uZXctYXJjaGl2ZS1pbnB1dCcpKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FuY2VsIG5ldyBhcmNoaXZlIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1uZXctYXJjaGl2ZS1pbnB1dCcpKSB7XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfVxyXG5cclxuICAvLyBjcmVhdGUgbmV3IGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWFyY2hpdmUtbmFtZS1pbnB1dCcpKSB7XHJcbiAgICBjb250cm9sbGVyLmNyZWF0ZU5ld0FyY2hpdmUoKVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBlZGl0IHRhYiBuYW1lIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctZWRpdC10YWItbmFtZScpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBlZGl0IHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1lZGl0LXRhYi1pbnB1dCcpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybS10YWItZWRpdCcpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBlZGl0IGFyY2hpdmUgbmFtZSBpbiBjb250ZW50XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JykpIHtcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FuY2VsIGVkaXQgYXJjaGl2ZSBuYW1lIGluIGNvbnRlbnRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JykpIHtcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pXHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgYXJjaGl2ZSBuYW1lIGluIGNvbnRlbnRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQnKSkge1xyXG4gICAgY29uc3QgdGl0bGVET00gPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci51cGRhdGVBcmNoaXZlVGl0bGVDb250ZW50KHRpdGxlRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBlZGl0LWFyY2hpdmUtc2lkZWJhclxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWFyY2hpdmUtc2lkZWJhcicpKSB7XHJcbiAgICBjb25zb2xlLmxvZygnc2hvdyBhcmNoaXZlIGVkaXQgc2lkZWJhcicpXHJcbiAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuc2hvd0VkaXRBcmNoaXZlU2lkZWJhcih0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtbmV3LWFyY2hpdmUtaW5wdXQtc2lkZWJhcicpKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2FuY2VsIGFyY2hpdmUgZWRpdCBzaWRlYmFyJylcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5jYW5jZWxOZXdBcmNoaXZlSW5wdXRTaWRlYmFyKHRpdGxlRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIG9uZSBjZXJ0YWluIHRhYiBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtdGFiJykge1xyXG4gICAgY29uc3QgdGFiSWQgPSB0YXJnZXQuZGF0YXNldC50YWJpZFxyXG4gICAgY29uc3QgdGFiQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5kZWxldGVUYWIodGFiQmFyLCB0YWJJZClcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBjZXJ0YWluIGFyY2hpdmUgZnJvbSBzaWRlYmFyXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1hcmNoaXZlJykpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZUFyY2hpdmUoYXJjaGl2ZUJhciwgdGFyZ2V0QXJjaGl2ZUlkKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIGFsbCB1bmNsYXNzaWZpZWQgdGFicyBpbiBjZXJ0YWluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZS1hbGwtaW4tYXJjaGl2ZScpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb25zb2xlLmxvZygnYXJjaGl2ZUlkOiAnICsgYXJjaGl2ZUlkKVxyXG4gICAgY29udHJvbGxlci5kZWxldGVBbGxUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZClcclxuICB9XHJcblxyXG4gIC8vIGNhY25lbCB0YWJzIHNlYXJjaFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtc2VhcmNoJykpIHtcclxuICAgIGNvbnN0IHNlYXJjaEJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICBzZWFyY2hCYXIucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9ICcnXHJcblxyXG4gICAgLy8gY2FuY2VsIHNlYXJjaFxyXG4gICAgY29udHJvbGxlci5jYW5jZWxTZWFyY2goKVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdicmFuZC10aXRsZScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsU2VhcmNoKClcclxuICB9XHJcblxyXG4gIC8vLy8vIGZvciBkZXZlbG9waW5nIC8vLy8vXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdnZXQtZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuc2hvd1N0b3JhZ2UoJ2FyY2hpdmUnKVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdjbGVhci1kYXRhJykge1xyXG4gICAgY29udHJvbGxlci5jbGVhclN0b3JhZ2UoKVxyXG4gIH1cclxufSwgZmFsc2UpXHJcbi8vIGZhbHNlID0gZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4vLyB0byBzdG9wIGJ1YmJsaW5nOiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG5cclxuXHJcbi8vIEtleWJvYXJkRXZlbnQgZXZlbnRMaXN0ZW5lclxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcblxyXG4gIC8vIGlucHV0IG5ldyBhcmNoaXZlIG5hbWVcclxuICBpZiAodGFyZ2V0LmlkID09PSAnYXJjaGl2ZU5hbWUtaW5wdXQnKSB7XHJcbiAgICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgICAgY29udHJvbGxlci5jcmVhdGVOZXdBcmNoaXZlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlucHV0IHVwZGF0ZSB0YWIgbmFtZVxyXG4gIC8vIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhYi1uYW1lLWlucHV0JykpIHtcclxuICAvLyAgIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gIC8vICAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgLy8gICAgIGNvbnRyb2xsZXIudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pXHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICAvLyB1bnB1dCB1cGRhdGUgYXJjaGl2ZSBuYW1lXHJcbiAgLy8gaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FyY2hpdmUtdGl0bGUtaW5wdXQtY29udGVudCcpKSB7XHJcbiAgLy8gICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAvLyAgICAgY29uc3QgdGl0bGVET00gPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gIC8vICAgICBjb250cm9sbGVyLnVwZGF0ZUFyY2hpdmVUaXRsZUNvbnRlbnQodGl0bGVET00pXHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICAvLyBpbnB1dCB0YWJzIHNlYXJjaCBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWJzLXNlYXJjaC1pbnB1dCcpKSB7XHJcbiAgICAvLyBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgIGNvbnN0IHF1ZXJ5Qm9keSA9IHRhcmdldC52YWx1ZVxyXG4gICAgaWYgKCFxdWVyeUJvZHkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ05PIHF1ZXJ5Qm9keSEnKVxyXG4gICAgICBjb250cm9sbGVyLmNhbmNlbFNlYXJjaCgpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29udHJvbGxlci5zZWFyY2hUYWIocXVlcnlCb2R5KVxyXG4gICAgLy8gfVxyXG4gIH1cclxufSkiXSwic291cmNlUm9vdCI6IiJ9