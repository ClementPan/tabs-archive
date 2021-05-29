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
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.confirm(text, (res) => {
      if (res) {
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
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.confirm(text, (res) => {
      if (res) {
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
  // editing archive title
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
          <i class="fas fa-folder"></i>
        </div>
        <p>${archiveName}</p>
        <div class="icon">
          <i class="fas fa-times-circle delete-archive" data-id="${id}"></i>
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
    console.log(currentSyncStorage)
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
  // 
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
      this.hideconfirm()
      callback(true)
    })

    negative.addEventListener('click', () => {
      this.hideconfirm()
      callback(false)
    })
  },

  hideconfirm() {
    const alert = document.querySelector('.alert')
    const backdrop = document.querySelector('.backdrop')

    alert.classList.add('none')
    backdrop.classList.add('none')
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
      console.log('target: ')
      console.log(target)

      const payload = target.id
      console.log('payload: ' + payload)

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
  if (target.classList.contains('edit-tab-name-input')) {
    if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
      const targetTabDOM = target.parentElement.parentElement
      _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.updateTabName(targetTabDOM)
    }
  }

  // unput update archive name
  if (target.classList.contains('archive-title-input-content')) {
    if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
      const titleDOM = target.parentElement
      _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.updateArchiveTitleContent(titleDOM)
    }
  }

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

// window.addEventListener('keyup', (e) => {
//   const target = e.target

//   // User clear search!
//   if (target.classList.contains('tabs-search-input')) {
//     if ((e.code === 'Delete') || (e.code === 'Backspace')) {
//       const queryBody = target.value
//       if (!queryBody) {
//         controller.cancelSearch()
//       }
//     }
//   }
// })





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWtDO0FBQ0Y7QUFDQTtBQUNFOztBQUUzQjtB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QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksdURBQWlCOztBQUVyQjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FB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QUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sdUVBQTJCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG9FQUF3QjtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxnRkFBb0M7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG1FQUF1QjtBQUM3QjtBQUNBO0FBQ0EsSUFBSSxnRUFBb0I7QUFDeEI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJIiwiZmlsZSI6Im9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcuanMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi91dGlscy5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBvcGVuQWxsVGFicyhhcmNoaXZlSWQpIHtcclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHVuY2xhc3NpZmllZC5mb3JFYWNoKGVhY2ggPT4ge1xyXG4gICAgICBjb25zdCB1cmwgPSBlYWNoLnVybFxyXG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb3BlbkFsbFNlYXJjaFRhYnMoKSB7XHJcbiAgICBjb25zdCBzZWFyY2hUYWJzID0gZGF0YS5zZWFyY2hSZXN1bHRcclxuICAgIHNlYXJjaFRhYnMuZm9yRWFjaChlYWNoID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gZWFjaC51cmxcclxuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRlbGV0ZVRhYih0YXJnZXQsIHRhYklkKSB7XHJcbiAgICAvLyB0YXJnZXQ6IERPTSBlbGVtbnRcclxuXHJcbiAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCB0YWJcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcucmVtb3ZlVGFiKHRhcmdldClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICBkZWxldGVBbGxUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZCkge1xyXG4gICAgY29uc3QgdGV4dCA9ICdkZWxldGUgYWxsIHRhYnMgaW4gdGhpcyBhcmNoaXZlPydcclxuICAgIHZpZXcuY29uZmlybSh0ZXh0LCAocmVzKSA9PiB7XHJcbiAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAvLyBjaGVjazogaWYgaXMgYWxyZWFkeSBlbXB0eVxyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0IC50YWJgXHJcbiAgICAgICAgY29uc3QgdGFiSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZSlcclxuICAgICAgICBpZiAoKHRhYkl0ZW1zLmxlbmd0aCA9PT0gMSkgJiYgKHRhYkl0ZW1zWzBdLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIHRhYlxyXG4gICAgICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jbGVhclRhYnNJbkFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgICAgIGRhdGEuYXJjaGl2ZSA9IG5ld0FyY2hpdmVcclxuXHJcbiAgICAgICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgICAgIHZpZXcuY2xlYXJUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZClcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGRlbGV0ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gJ2RlbGV0ZSB0aGlzIGFyY2hpdmU/J1xyXG4gICAgdmlldy5jb25maXJtKHRleHQsIChyZXMpID0+IHtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIC8vIHJldHVybiBuZXdBcmNoaXZlIHdpdGggdGFyZ2V0IGFyY2hpdmVcclxuICAgICAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwucmVtb3ZlQXJjaGl2ZShkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgICAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgICAgIC8vIHJlcmVuZGVyIHZpZXcsIGJvdGggaW4gc2lkZWJhciAmIGNvbnRlbnQgKG5lZWQgYXJjaGl2ZUlkKVxyXG4gICAgICAgIHZpZXcucmVtb3ZlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpXHJcblxyXG4gICAgICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICAvLyBjcmVhdGluZyBuZXcgYXJjaGl2ZVxyXG4gIHNob3dOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICB2aWV3LnNob3dOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZSgpIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCBhcmNoaXZlTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlXHJcblxyXG4gICAgLy8gbm8gZW1wdHkgaW5wdXQgYWxsb3dlZFxyXG4gICAgaWYgKCFhcmNoaXZlTmFtZSkge1xyXG4gICAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdObyBlbXB0eSBpbnB1dCBhbGxvd2VkIScpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0IGFyY2hpdmUgZGF0YSwgYWRkIG5ldyBhcmNoaXZlIGluIGRhdGFcclxuICAgIC8vIG5ld0FyY2hpdmU6IGRhdGFcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jcmVhdGVOZXdBcmNoaXZlSW5EYXRhKGFyY2hpdmVOYW1lKVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcuY3JlYXRlTmV3QXJjaGl2ZUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG4gICAgdmlldy5jcmVhdGVOZXdBcmNoaXZlSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIHJlc3RvcmUgVUlcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICB9LFxyXG4gIC8vIGVkaXRpbmcgdGFiIG5hbWUodGl0bGUpXHJcbiAgc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LnNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSlcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH0sXHJcbiAgdXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhcmdldFRhYkRPTS5kYXRhc2V0LmlkXHJcbiAgICBjb25zdCB0YWJOYW1lSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIGlucHV0JykudmFsdWVcclxuXHJcbiAgICAvLyBjaGVja1xyXG4gICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50XHJcbiAgICBpZiAob3JpZ2luYWxUaXRsZSA9PT0gdGFiTmFtZUlucHV0KSB7XHJcbiAgICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGZpbmQgdGFiIGluIGFyY2hpdmUgdmlhIHRhYklkLCB1cGRhdGUgaXRcclxuICAgIG1vZGVsLnVwZGF0ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkLCB0YWJOYW1lSW5wdXQpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlldyBcclxuICAgIHZpZXcudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00sIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gcmVzdG9yZSBVSVxyXG4gICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgLy8gZWRpdGluZyBhcmNoaXZlIHRpdGxlXHJcbiAgc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5zaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKVxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmVUaXRsZUNvbnRlbnQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0VGFiRE9NLmRhdGFzZXQuaWRcclxuICAgIGNvbnN0IGFyY2hpdmVUaXRsZUlucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlLXRpdGxlLWlucHV0LWNvbnRlbnQnKS52YWx1ZVxyXG4gICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdGV4dCcpLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gY2hlY2tcclxuICAgIGlmIChhcmNoaXZlVGl0bGVJbnB1dCA9PT0gb3JpZ2luYWxUaXRsZSkge1xyXG4gICAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmluZCBhcmNoaXZlIGluIGRhdGEgdmlhIGFyY2hpdmVJZCwgdXBkYXRlIGl0XHJcbiAgICBtb2RlbC51cGRhdGVBcmNoaXZlKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dClcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3IFxyXG4gICAgdmlldy51cGRhdGVBcmNoaXZlVGl0bGUodGFyZ2V0VGFiRE9NLCBhcmNoaXZlSWQsIGFyY2hpdmVUaXRsZUlucHV0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG5cclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW1cclxuICBzZXRVcERyYWdBbmREcm9wU3lzdGVtKCkge1xyXG4gICAgLy8gZXZlbnRMaXN0ZW5lciBpbiB2aWV3XHJcbiAgICAvLyB2aWV3IGNhbGxzIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIHZpZXcuc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpXHJcbiAgfSxcclxuXHJcbiAgLy8gc2VhcmNoIHRhYnNcclxuICBzZWFyY2hUYWIocXVlcnlCb2R5KSB7XHJcbiAgICBjb25zb2xlLmxvZygncXVlcnlCb2R5OiAnICsgcXVlcnlCb2R5KVxyXG4gICAgcXVlcnlCb2R5ID0gcXVlcnlCb2R5LnRvTG93ZXJDYXNlKCkudHJpbSgpXHJcblxyXG5cclxuICAgIC8vIG1vZGVsOiBzZWFyY2ggZm9yIHRhYnMsIHN0b3JlIHRoZW0gaW4gbG9jYWwgZGF0YSwgYW5kIHJldHVybiB0YWJzIGRhdGE6IEFycmF5XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBtb2RlbC5zZWFyY2hUYWJzKGRhdGEuYXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG5cclxuICAgIC8vIGhpZGUgYWxsIGFyY2hpdmVzIGluIGNvbnRlbnRcclxuICAgIHZpZXcuc2hvd1NlYXJjaFJlc3VsdChzZWFyY2hSZXN1bHQpXHJcbiAgfSxcclxuICBjYW5jZWxTZWFyY2goKSB7XHJcbiAgICB2aWV3LnJlc3RvcmVDb250ZW50KClcclxuICB9LFxyXG5cclxuICAvLyAgZGV2ZWxvcGluZyBtZXRob2RzXHJcbiAgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgLy8gY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcigoKSA9PiB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5jbGVhcigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlIGNsZWFyZWQhJylcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93U3RvcmFnZSgpIHtcclxuICAgIC8vIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgICAvLyBjb25zdCB7IFFVT1RBX0JZVEVTLCBRVU9UQV9CWVRFU19QRVJfSVRFTSB9ID0gY2hyb21lLnN0b3JhZ2Uuc3luY1xyXG4gICAgICBjb25zdCB7IFFVT1RBX0JZVEVTIH0gPSBjaHJvbWUuc3RvcmFnZS5sb2NhbFxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhjaHJvbWUuc3RvcmFnZS5sb2NhbClcclxuICAgICAgY29uc29sZS5sb2coUVVPVEFfQllURVMpXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdRdW90YSBieXRlcyBwZXIgaXRlbTogJyArIFFVT1RBX0JZVEVTX1BFUl9JVEVNKVxyXG5cclxuXHJcbiAgICAgIC8vIGNvbnN0IGN1cnJlbnRTeW5jU3RvcmFnZSA9IHV0aWxzLnNpemVPZkRhdGEoZGF0YSlcclxuICAgICAgLy8gY29uc29sZS5sb2coJ0RhdGEgc2l6ZTogJyArIGN1cnJlbnRTeW5jU3RvcmFnZSlcclxuXHJcbiAgICAgIC8vIC8vIGNvbnN0IG1heFN5bmNTdG9yYWdlID0gUVVPVEFfQllURVNcclxuICAgICAgLy8gLy8gbG9jYWwgbWF4IHN0b3JhZ2U6IDUsMjQyLDg4MCBieXRlcyA9IDUgbWJcclxuICAgICAgLy8gLy8gc3luYyBtYXggc3RvcmFnZTogICAxMDIsNDAwXHJcblxyXG4gICAgICAvLyBjb25zdCB0YWJzQ291bnQgPSBtb2RlbC5zZWFyY2hUYWJzKGRhdGEuYXJjaGl2ZSwgJ2FsbCcpLmxlbmd0aFxyXG5cclxuICAgICAgLy8gY29uc3Qgc3RvcmFnZVJhdGUgPSBNYXRoLnJvdW5kKDEwMCAqIChjdXJyZW50U3luY1N0b3JhZ2UgLyBtYXhTeW5jU3RvcmFnZSkpXHJcbiAgICAgIC8vIGNvbnN0IG1heFRhYnMgPSBNYXRoLnJvdW5kKCh0YWJzQ291bnQgKiAxMDApIC8gc3RvcmFnZVJhdGUpXHJcbiAgICAgIC8vIGNvbnN0IHRleHQgPSAnU3RvcmFnZTogJyArIHRhYnNDb3VudCArICcgLyAnICsgbWF4VGFicyArICcgdGFicyAoJyArIHN0b3JhZ2VSYXRlICsgJyUpJ1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0ZXh0KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZygnVGFicyBJbiBTdG9yYWdlOiAnICsgdGFic0NvdW50ICsgJyB0YWJzJylcclxuICAgICAgLy8gY29uc29sZS5sb2coJ01heCBUYWJzIEluIFN0b3JhZ2U6ICcgKyBtYXhUYWJzICsgJyB0YWJzJylcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IHNlYXJjaFJlc3VsdCA9IFtdXHJcblxyXG5leHBvcnQgY29uc3QgZGF0YSA9IHtcclxuICBhcmNoaXZlOiB7fSxcclxuICBsYXN0VGFiSWQ6ICcnLFxyXG4gIGxhc3RBcmNoaXZlSWQ6ICcnXHJcbn0iLCJpbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbi8vICAgYXJjaGl2ZToge30sXHJcbi8vICAgbGFzdFRhYklkOiAnJyxcclxuLy8gICBsYXN0QXJjaGl2ZUlkOiAnJ1xyXG5cclxuLy8gQXJjaGl2ZSBwcm90b1xyXG5jb25zdCBBcmNoaXZlRGF0YSA9IGZ1bmN0aW9uIChhcmNoaXZlTmFtZSwgaWQpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJJbm5lclRlbXBsYXRlID0gZnVuY3Rpb24gKHRhYikge1xyXG4gIGNvbnN0IHsgaWQsIGNyZWF0ZWRBdCwgdXJsLCB0YWdzIH0gPSB0YWJcclxuXHJcbiAgbGV0IHsgaWNvbiB9ID0gdGFiXHJcbiAgaWYgKCFpY29uKSB7XHJcbiAgICBjb25zb2xlLmxvZygnTm8gaW1hZ2UhJylcclxuICAgIGljb24gPSB1dGlscy5pbWFnZUhvbGRlcigpXHJcbiAgfTtcclxuXHJcbiAgbGV0IHsgdGl0bGUgfSA9IHRhYlxyXG4gIHRpdGxlID0gdXRpbHMuZXNjYXBlSHRtbCh0aXRsZSlcclxuXHJcbiAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9J251bWJlciBib3gnPlxyXG4gICAgICA8cD4ke2lkfTwvcD5cclxuICAgICAgICAgIDwvZGl2ID5cclxuICAgIDxkaXYgY2xhc3M9J2ljb24gYm94Jz5cclxuICAgICAgPGltZyBzcmM9XCIke2ljb259XCIgZHJhZ2dhYmxlPVwiZmFsc2VcIiBhbHQ9XCJcIj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0ndGl0bGUgYm94JyBkcmFnZ2FibGU9XCJmYWxzZVwiPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgY2FuY2VsLWVkaXQtdGFiLWlucHV0IG5vbmVcIj48L2k+XHJcbiAgICAgIDxwPiR7dGl0bGV9PC9wPlxyXG4gICAgICA8aW5wdXQgY2xhc3M9J2VkaXQtdGFiLW5hbWUtaW5wdXQgbm9uZScgcGxhY2Vob2xkZXI9JyR7dGl0bGV9JyB0eXBlPVwidGV4dFwiIG1heGxlbmd0aD1cIjQ1XCI+XHJcblxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW4tYWx0IHNob3ctZWRpdC10YWItbmFtZVwiPjwvaT5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2stY2lyY2xlIGNvbmZpcm0tdGFiLWVkaXQgbm9uZVwiIGRhdGEtaWQ9XCIke2lkfVwiPjwvaT5cclxuXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J3RhZ3MgYm94Jz5cclxuICAgICAgPHA+JHt0YWdzfTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0nY3JlYXRlZEF0IGJveCc+XHJcbiAgICAgIDxwPiR7Y3JlYXRlZEF0fTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0nYnRuIGJveCc+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9J29wZW4tdGFiJyBkYXRhLXVybD1cIiR7dXJsfVwiPlxyXG4gICAgICAgIG9wZW5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdkZWxldGUtdGFiJyBkYXRhLXRhYmlkPVwiJHtpZH1cIj5cclxuICAgICAgICBkZWxldGVcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn1cclxuXHJcbmNvbnN0IGFyY2hpdmVJbm5lclRlbXBsYXRlID0gZnVuY3Rpb24gKGFyY2hpdmUsIHVuY2xhc3NpZmllZERPTVMpIHtcclxuICBjb25zdCB7IGFyY2hpdmVOYW1lLCBhcmNoaXZlc0xpc3QsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdhcmNoaXZlLWNvbnRhaW5lcic+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWJhclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J2FyY2hpdmUtdGl0bGUnIGRhdGEtaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9J2ZhcyBmYS10aW1lcy1jaXJjbGUgY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50IG5vbmUnPjwvaT5cclxuICAgICAgICAgIDxoMyBjbGFzcz0ndGl0bGUtdGV4dCc+JHthcmNoaXZlTmFtZX08L2gzPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiMjVcIiB2YWx1ZT1cIiR7YXJjaGl2ZU5hbWV9XCIgY2xhc3M9J2FyY2hpdmUtdGl0bGUtaW5wdXQtY29udGVudCBub25lJz5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbi1hbHQgZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnRcIj48L2k+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVjay1jaXJjbGUgY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQgbm9uZVwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG5zXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJvcGVuLWFsbFwiIGRhdGEtaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgICAgIE9wZW4gQWxsXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS1hbGwtaW4tYXJjaGl2ZScgZGF0YS1pZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICAgICAgRGVsZXRlIEFsbFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxpbnB1dCBpZD1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiIGNsYXNzPSdhcmNoaXZlLWRyb3Bkb3duIG5vbmUnIHR5cGU9XCJjaGVja2JveFwiPlxyXG5cclxuICAgICAgPGxhYmVsIGZvcj1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J3Nob3ctaW5kaWNhdG9yJz5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWZvbGRlci1vcGVuIHVuZm9sZFwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWZvbGRlciBmb2xkXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2xhYmVsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmUtY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlc0xpc3RcIj5cclxuICAgICAgICAgIDxwPiR7YXJjaGl2ZXNMaXN0fTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFicy1saXN0XCI+XHJcbiAgICAgICAgICAke3VuY2xhc3NpZmllZERPTVN9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZW1wdHlUYWIgPSBgXHJcbiAgPGRpdiBjbGFzcz0ndGFiIGVtcHR5IHRhYi1zdHlsZSc+XHJcbiAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gIDwvZGl2PlxyXG5gXHJcblxyXG5leHBvcnQgY29uc3QgbW9kZWwgPSB7XHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluRGF0YShhcmNoaXZlTmFtZSkge1xyXG4gICAgY29uc3QgbmV3SWQgPSBkYXRhLmxhc3RBcmNoaXZlSWQgKz0gMVxyXG4gICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcignYXJjaGl2ZScsIG5ld0lkKVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmVEYXRhID0gbmV3IEFyY2hpdmVEYXRhKGFyY2hpdmVOYW1lLCBpZClcclxuXHJcbiAgICAvLyBwdXNoIG5ld0FyY2hpdmVEYXRhIHRvIGRhdGEuYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlLmFyY2hpdmVzTGlzdC5wdXNoKG5ld0FyY2hpdmVEYXRhKVxyXG5cclxuICAgIHJldHVybiBuZXdBcmNoaXZlRGF0YVxyXG4gIH0sXHJcbiAgY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGlkIH0gPSBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8YSBocmVmPVwiI2FyY2hpdmUtJHtpZH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZm9sZGVyXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxwPiR7YXJjaGl2ZU5hbWV9PC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgZGVsZXRlLWFyY2hpdmVcIiBkYXRhLWlkPVwiJHtpZH1cIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvYT5cclxuICAgIGBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gJ2FyY2hpdmUgYXJjaGl2ZS1zdHlsZSdcclxuICAgIG5ld0FyY2hpdmUuaWQgPSBgYXJjaGl2ZS0ke2lkfS1zaWRlYmFyYFxyXG4gICAgbmV3QXJjaGl2ZS5kYXRhc2V0LmFyY2hpdmVJZCA9IGlkXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChhcmNoaXZlKSB7XHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCwgaWQgfSA9IGFyY2hpdmVcclxuXHJcbiAgICBsZXQgdW5jbGFzc2lmaWVkRE9NUyA9ICcnXHJcblxyXG4gICAgaWYgKHVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgdW5jbGFzc2lmaWVkRE9NUyA9IHVuY2xhc3NpZmllZC5tYXAoZWFjaCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9J3RhYiB0YWItc3R5bGUnIGRyYWdnYWJsZT1cInRydWVcIiBpZD1cInRhYi0ke2VhY2guaWR9XCIgZGF0YS1pZD1cIiR7ZWFjaC5pZH1cIj5cclxuICAgICAgICAgICAgJHt0YWJJbm5lclRlbXBsYXRlKGVhY2gpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgICB9KS5qb2luKCcnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdW5jbGFzc2lmaWVkRE9NUyA9IGVtcHR5VGFiXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGFyY2hpdmVJbm5lclRlbXBsYXRlKGFyY2hpdmUsIHVuY2xhc3NpZmllZERPTVMpXHJcblxyXG4gICAgbmV3QXJjaGl2ZS5pZCA9IGBhcmNoaXZlLSR7aWR9YFxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSBgYXJjaGl2ZSBkcm9wem9uZSBhcmNoaXZlLXN0eWxlIGFyY2hpdmUtJHtpZH0tY29udGVudGBcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIGNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWJEYXRhKSB7XHJcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgdGFiLmlubmVySFRNTCA9IHRhYklubmVyVGVtcGxhdGUodGFiRGF0YSlcclxuICAgIHRhYi5jbGFzc0xpc3QgKz0gJ3RhYiB0YWItc3R5bGUnXHJcbiAgICB0YWIuaWQgPSBgdGFiLSR7dGFiRGF0YS5pZH1gXHJcbiAgICB0YWIuZGF0YXNldC5pZCA9IHRhYkRhdGEuaWRcclxuICAgIHRhYi5kcmFnZ2FibGUgPSB0cnVlXHJcbiAgICByZXR1cm4gdGFiXHJcbiAgfSxcclxuICBhc3luYyBnZXRTdG9yYWdlRGF0YSh0YXJnZXREYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW3RhcmdldERhdGFdLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWplY3QhJylcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogZmFsc2UsIHN0YXR1czogXCJjb21wbGV0ZVwiIH0sIChxdWVyeVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGFicyA9IFtdXHJcbiAgICAgICAgICBmb3IgKGxldCB0YWIgb2YgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICh0YWIudGl0bGUgPT09IFwiY2hyb21lLnRhYnMgLSBDaHJvbWUgRGV2ZWxvcGVyc1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSBcImNocm9tZTovL2V4dGVuc2lvbnMvXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwuc3BsaXQoJzovLycpWzBdID09PSAnY2hyb21lLWV4dGVuc2lvbicpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwgPT09ICdjaHJvbWU6Ly9uZXd0YWIvJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiLmlkKVxyXG5cclxuICAgICAgICAgICAgLy8gZm9ybSB0YWJEYXRhXHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHRpdGxlID0gdXRpbHMudHJpbVN0cmluZyh1dGlscy5lc2NhcGVIdG1sKHRhYi50aXRsZSksIDQ1KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgeyBmYXZJY29uVXJsOiBpY29uLCB1cmwsIHRpdGxlIH0gPSB0YWJcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdGFncyA9IFtdXHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgaWRcclxuICAgICAgICAgICAgZGF0YS5sYXN0VGFiSWQrK1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHV0aWxzLmlkRm9ybWF0dGVyKCd0YWInLCBkYXRhLmxhc3RUYWJJZClcclxuXHJcbiAgICAgICAgICAgIHRhYnMucHVzaChuZXcgVGFiRGF0YShpZCwgaWNvbiwgdGl0bGUsIHRhZ3MsIGNyZWF0ZWRBdCwgdXJsLCB1cGRhdGVkQXQpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUodGFicylcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHN0b3JlQXJjaGl2ZSgpIHtcclxuICAgIC8vIHN0b3JlIGRlZmF1bHRBcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSB9ID0gZGF0YVxyXG4gICAgYXJjaGl2ZS5hcmNoaXZlTmFtZSA9ICdyb290LWFyY2hpdmUnXHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICBtZXNzYWdlOiAnc3RvcmUtYXJjaGl2ZScsXHJcbiAgICAgIGRhdGE6IGFyY2hpdmVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjdXJyZW50U3luY1N0b3JhZ2UgPSB1dGlscy5zaXplT2ZEYXRhKGFyY2hpdmUpXHJcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50U3luY1N0b3JhZ2UpXHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAobWVzc2FnZSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnW0luZGV4XSAnLCBtZXNzYWdlKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVUYWIoYXJjaGl2ZSwgdGFiSWQsIHRhYk5hbWVJbnB1dCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gdGFiSWRcclxuICAgIGNvbnNvbGUubG9nKCdpbiB1cGRhdGVUYWInLCB0YWJOYW1lSW5wdXQpXHJcblxyXG4gICAgY29uc3QgZmluZFRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiBhcmNoaXZlLnVuY2xhc3NpZmllZCkge1xyXG4gICAgICAgICAgaWYgKHRhYi5pZCA9PT0gdGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luIGhpdDogJywgdGFiTmFtZUlucHV0KVxyXG4gICAgICAgICAgICB0YWIudGl0bGUgPSB0YWJOYW1lSW5wdXRcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gIH0sXHJcbiAgdXBkYXRlQXJjaGl2ZShhcmNoaXZlLCBhcmNoaXZlSWQsIGFyY2hpdmVUaXRsZUlucHV0KSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIGFyY2hpdmUuYXJjaGl2ZU5hbWUgPSBhcmNoaXZlVGl0bGVJbnB1dFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBzdWJBcmNoaXZlLmFyY2hpdmVOYW1lID0gYXJjaGl2ZVRpdGxlSW5wdXRcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gIH0sXHJcbiAgcmVtb3ZlVGFiKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICBjb25zdCB0YXJnZXRJZCA9IHRhYklkXHJcblxyXG4gICAgY29uc3QgcmVtb3ZlVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJjaGl2ZS51bmNsYXNzaWZpZWQuaW5kZXhPZih0YWIpXHJcbiAgICAgICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIHJlbW92ZUFyY2hpdmUoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuXHJcbiAgICBjb25zdCBkZWxldGVBcmNoaXZlQnlJZCA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJjaGl2ZS5hcmNoaXZlc0xpc3QuaW5kZXhPZihzdWJBcmNoaXZlKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleClcclxuICAgICAgICAgICAgYXJjaGl2ZS5hcmNoaXZlc0xpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBkZWxldGVBcmNoaXZlQnlJZChzdWJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFyY2hpdmVCeUlkKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH0sXHJcbiAgY2xlYXJUYWJzSW5BcmNoaXZlQnlJZChhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG4gICAgLy8gbGV0IHRhcmdldEFyY2hpdmUgPSB7fVxyXG5cclxuICAgIGNvbnN0IGZpbmRBcmNoaXZlID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKHRhcmdldElkID09PSBhcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgYXJjaGl2ZS51bmNsYXNzaWZpZWQgPSBbXVxyXG4gICAgICAgIC8vIHJldHVybiB0YXJnZXRBcmNoaXZlID0gYXJjaGl2ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBzdWJBcmNoaXZlLnVuY2xhc3NpZmllZCA9IFtdXHJcbiAgICAgICAgICAgIC8vIHJldHVybiB0YXJnZXRBcmNoaXZlID0gc3ViQXJjaGl2ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlubmVyQXJjaGl2ZSBvZiBzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICAgIGZpbmRBcmNoaXZlKGlubmVyQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBcmNoaXZlKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH0sXHJcbiAgZ2V0VGFiRGF0YVZpYVRhYkRPTSh0YWJET00pIHtcclxuICAgIHJldHVybiAoe1xyXG4gICAgICBpZDogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXIgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICBpY29uOiB0YWJET00ucXVlcnlTZWxlY3RvcignLmljb24gaW1nJykuc3JjLFxyXG4gICAgICB0aXRsZTogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJykudGV4dENvbnRlbnQsXHJcbiAgICAgIHRhZ3M6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGFncyBwJykudGV4dENvbnRlbnQsXHJcbiAgICAgIGNyZWF0ZWRBdDogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGVkQXQgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICB1cmw6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuYnRuIGJ1dHRvbicpLmRhdGFzZXQudXJsLFxyXG4gICAgICB1cGRhdGVkQXQ6ICcnXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2VhcmNoVGFicyhhcmNoaXZlLCBxdWVyeUJvZHkpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IFtdXHJcblxyXG4gICAgY29uc3QgZmluZFRhYkJ5UXVlcnlCb2R5ID0gKGFyY2hpdmUsIHF1ZXJ5Qm9keSkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlRdWVyeUJvZHkoc3ViQXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmIChxdWVyeUJvZHkgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRhYilcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICh0YWIudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeUJvZHkpKSB8fFxyXG4gICAgICAgICAgICAodGFiLmlkLmluY2x1ZGVzKHF1ZXJ5Qm9keSkpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGFiKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeVF1ZXJ5Qm9keShzdWJBcmNoaXZlLCBxdWVyeUJvZHkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlRdWVyeUJvZHkoYXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG5cclxuICAgIC8vIHN0b3JlIHNlYXJjaCByZXN1bHQgaW4gbG9jYWwgZGF0YVxyXG4gICAgZGF0YS5zZWFyY2hSZXN1bHQgPSByZXN1bHRcclxuXHJcbiAgICAvLyByZXR1cm4gcmVzdWx0IGZvciB2aWV3XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfSxcclxuXHJcbiAgLy8gcmVjdXJzaXZlIHNlYXJjaCBwcm90b3R5cGUgLy9cclxuICBzZWFyY2hUYWJCeUlkKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhYilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZFRhYkJ5SWQoYXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgfSxcclxuICBzZWFyY2hBcmNoaXZlQnlJZChhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG4gICAgbGV0IHRhcmdldEFyY2hpdmUgPSB7fVxyXG5cclxuICAgIGNvbnN0IGZpbmRBcmNoaXZlID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKHRhcmdldElkID09PSBhcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBhcmNoaXZlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gc3ViQXJjaGl2ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlubmVyQXJjaGl2ZSBvZiBzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICAgIGZpbmRBcmNoaXZlKGlubmVyQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBcmNoaXZlKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZVxyXG4gIH0sXHJcbn0iLCJleHBvcnQgY29uc3QgdXRpbHMgPSB7XHJcbiAgaWRGb3JtYXR0ZXI6IGZ1bmN0aW9uICh0eXBlLCBudW0pIHtcclxuICAgIC8vIHR5cGUgPSBcInRhYlwiIHx8IFwiYXJjaGl2ZVwiXHJcbiAgICBsZXQgbW9kZSA9IHR5cGUgPT09ICd0YWInID8gNSA6IDNcclxuICAgIG51bSA9IG51bSArICcnXHJcbiAgICBsZXQgb3V0cHV0ID0gbnVtLnNwbGl0KCcnKVxyXG4gICAgaWYgKG51bS5sZW5ndGggPCBtb2RlKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZSAtIG51bS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG91dHB1dC51bnNoaWZ0KCcwJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxyXG4gIH0sXHJcbiAgZXNjYXBlSHRtbDogZnVuY3Rpb24gKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZ1xyXG4gICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG4gIH0sXHJcbiAgdHJpbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZywgbWV4bGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBtZXhsZW5ndGgpXHJcbiAgfSxcclxuICBpbWFnZUhvbGRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMzIvMDExNjFlL2ZmZj90ZXh0PT8nXHJcbiAgfSxcclxuICBzaXplT2ZEYXRhOiBmdW5jdGlvbiAob2JqZWN0KSB7XHJcblxyXG4gICAgdmFyIG9iamVjdExpc3QgPSBbXTtcclxuICAgIHZhciBzdGFjayA9IFtvYmplY3RdO1xyXG4gICAgdmFyIGJ5dGVzID0gMDtcclxuXHJcbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XHJcbiAgICAgIHZhciB2YWx1ZSA9IHN0YWNrLnBvcCgpO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgYnl0ZXMgKz0gNDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgYnl0ZXMgKz0gdmFsdWUubGVuZ3RoICogMjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgYnl0ZXMgKz0gODtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmXHJcbiAgICAgICAgKFxyXG4gICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcclxuICAgICAgICAmJiBvYmplY3RMaXN0LmluZGV4T2YodmFsdWUpID09PSAtMVxyXG4gICAgICApIHtcclxuICAgICAgICBvYmplY3RMaXN0LnB1c2godmFsdWUpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpIGluIHZhbHVlKSB7XHJcbiAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBieXRlcztcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbmltcG9ydCB7IGVtcHR5VGFiIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuXHJcbi8vIG5vdCBkb25lXHJcbmNvbnN0IGRldGVjdERyb3BMb2NhdGlvbiA9IGZ1bmN0aW9uICh0YWJJZCwgZHJhZ2VudGVyLCBkcmFnbGVhdmUpIHtcclxuICBjb25zb2xlLmxvZygndGFiSWQ6ICAgICAnICsgdGFiSWQpXHJcbiAgY29uc29sZS5sb2coJ2RyYWdlbnRlcjogJyArIGRyYWdlbnRlcilcclxuICBjb25zb2xlLmxvZygnZHJhZ2xlYXZlOiAnICsgZHJhZ2xlYXZlKVxyXG4gIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0nKVxyXG4gIGxldCByZXN1bHQgPSAnbm8gZGV0ZWN0J1xyXG4gIGlmICgodGFiSWQgPT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpKSB7XHJcbiAgICByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuICB9IGVsc2UgaWYgKCh0YWJJZCAhPT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSkpIHtcclxuICAgIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG4gIH0gZWxzZSBpZiAoKGRyYWdlbnRlciA9PT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpKSB7XHJcbiAgICByZXN1bHQgPSBgYmVmb3JlICR7ZHJhZ2xlYXZlfWBcclxuICB9IGVsc2UgaWYgKChkcmFnZW50ZXIgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKSkge1xyXG4gICAgcmVzdWx0ID0gYGFmdGVyICR7ZHJhZ2VudGVyfWBcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKCdyZXN1bHQ6ICcgKyByZXN1bHQpXHJcbiAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLScpXHJcbiAgcmV0dXJuXHJcbn1cclxuXHJcbi8vICh0YWJJZCA9PT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSlcclxuLy8gQSBBIEFcclxuLy8gcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcblxyXG4vLyAodGFiSWQgIT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpXHJcbi8vIEEgQiBBXHJcbi8vIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG5cclxuLy8gKGRyYWdlbnRlciA9PT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpXHJcbi8vIEEgQiBCIFxyXG4vLyBkcmFnbGVhdmUg55qE5YmN5LiA5YCLXHJcblxyXG4vLyAoZHJhZ2VudGVyICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcilcclxuLy8gQSBCIENcclxuLy8gZHJhZ2xlYXZlIOeahOWJjeS4gOWAi1xyXG5cclxuZXhwb3J0IGNvbnN0IHZpZXcgPSB7XHJcbiAgc2hvd1RhYnNJbkNvbnRlbnQoZGF0YSkge1xyXG4gICAgLy8gZGF0YTogcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcbiAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG5cclxuICAgIGlmICghZGF0YS5sZW5ndGgpIHtcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gZW1wdHlUYWJcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB0YWIgb2YgZGF0YSkge1xyXG4gICAgICBjb25zdCBuZXdUYWIgPSBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKVxyXG4gICAgICAvLyBhZGQgZXZlbnRMaXN0ZW5lciB0byBuZXcgdGFicyAvL1xyXG4gICAgICB0aGlzLnNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0obmV3VGFiKVxyXG5cclxuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFiKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd1Jvb3RBcmNoaXZlTGlzdChsaXN0KSB7XHJcbiAgICAvLyBsaXN0OiByb290LmFyY2hpdmVzTGlzdFxyXG4gICAgY29uc3Qgc2lkZWJhckFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHtcclxuICAgICAgY29uc3QgbmV3U2lkZWJhckFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmhpdmVET01JblNpZGViYXIoaXRlbSlcclxuICAgICAgc2lkZWJhckFyY2hpdmVzTGlzdC5hcHBlbmRDaGlsZChuZXdTaWRlYmFyQXJjaGl2ZSlcclxuXHJcbiAgICAgIGNvbnN0IG5ld0NvbnRlbnRBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChpdGVtKVxyXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0NvbnRlbnRBcmNoaXZlKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd05ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIC8vIGhpZGUgaW5wdXQgaWNvblxyXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5pY29uJylcclxuICAgIGljb24uY2xhc3NOYW1lICs9ICcgbm9uZSdcclxuXHJcbiAgICAvLyBoaWRlIDxwPlxyXG4gICAgY29uc3QgcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IHAnKVxyXG4gICAgaWYgKCFwLmNsYXNzTmFtZS5pbmNsdWRlcygnbm9uZScpKSB7XHJcbiAgICAgIHAuY2xhc3NOYW1lICs9ICcgbm9uZSdcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93IGlucHV0IFVJXHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IGlucHV0JylcclxuICAgIGNvbnN0IGNhbmNlbEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY2FuY2VsJylcclxuICAgIGNvbnN0IGNvbmZpcm1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNvbmZpcm0nKVxyXG5cclxuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY29uZmlybUljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gIH0sXHJcbiAgY2FuY2VsTmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ2NhbmNlbCBOZXcgQXJjaGl2ZSBJbnB1dCcpXHJcblxyXG4gICAgLy9yZXN0b3JlIFxyXG4gICAgLy8gaGlkZSBpbnB1dCBVSVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBpbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNhbmNlbCcpXHJcbiAgICBjb25zdCBjb25maXJtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jb25maXJtJylcclxuICAgIGlucHV0LmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcbiAgICBjb25maXJtSWNvbi5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG5cclxuICAgIC8vIHNob3cgaW5wdXQgaWNvblxyXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5pY29uJylcclxuICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gc2hvdyA8cD5cclxuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBwLnNob3ctbmV3LWFyY2hpdmUtaW5wdXQnKVxyXG4gICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgICAvLyBjbGVhciBpbnB1dCB2YWx1ZVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyY2hpdmVOYW1lLWlucHV0JykudmFsdWUgPSAnJ1xyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluU2lkZWJhcihuZXdBcmNoaXZlKSB7XHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRE9NID0gbW9kZWwuY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKG5ld0FyY2hpdmUpXHJcblxyXG4gICAgLy8gcHVzaCBuZXdBcmNoaXZlRE9NIGludG8gc2lkZWJhckFyY2hpdmVzTGlzdFxyXG4gICAgY29uc3Qgc2lkZWJhckFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgc2lkZWJhckFyY2hpdmVzTGlzdC5hcHBlbmRDaGlsZChuZXdBcmNoaXZlRE9NKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluQ29udGVudChuZXdBcmNoaXZlKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURPTSA9IG1vZGVsLmNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQobmV3QXJjaGl2ZSlcclxuICAgIHRoaXMuc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0obmV3QXJjaGl2ZURPTSlcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3QXJjaGl2ZURPTSlcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgLy8gZWRpdCB0YWIgbmFtZVxyXG4gIHNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgLy8gbWFrZSB0YWIgdW5kcmFnZ2FibGVcclxuICAgIHRhcmdldFRhYkRPTS5kcmFnZ2FibGUgPSBmYWxzZVxyXG5cclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gaGlkZSAudGl0bGUgcFxyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHBhc3MgdGl0bGUgdG8gaW5wdXQgdmFsdWVcclxuICAgIGlucHV0LnZhbHVlID0gdGl0bGVQLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dFxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIHRhcmdldFRhYkRPTS5kcmFnZ2FibGUgPSB0cnVlXHJcblxyXG4gICAgY29uc3QgY2FuY2VsRWRpdFRhYklucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtZWRpdC10YWItaW5wdXQnKVxyXG4gICAgY29uc3QgdGl0bGVQID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJylcclxuICAgIGNvbnN0IGlucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LXRhYi1uYW1lLWlucHV0JylcclxuICAgIGNvbnN0IGNvbmZpcm1UYWJFZGl0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLXRhYi1lZGl0JylcclxuICAgIGNvbnN0IHNob3dFZGl0VGFiTmFtZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuc2hvdy1lZGl0LXRhYi1uYW1lJylcclxuXHJcbiAgICAvLyB0byBzaG93XHJcbiAgICB0aXRsZVAuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBzaG93RWRpdFRhYk5hbWUuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICAvLyB0byBoaWRlXHJcbiAgICBjYW5jZWxFZGl0VGFiSW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGNvbmZpcm1UYWJFZGl0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gIH0sXHJcbiAgdXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00sIHRhYk5hbWVJbnB1dCkge1xyXG4gICAgY29uc3QgdGl0bGVQID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJylcclxuICAgIHRpdGxlUC50ZXh0Q29udGVudCA9IHRhYk5hbWVJbnB1dFxyXG4gIH0sXHJcbiAgLy8gZWRpdCBhcmNoaXZlIHRpdGxlXHJcbiAgc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKSB7XHJcbiAgICBjb25zdCB0aXRsZVRleHQgPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdGV4dCcpXHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCB1cGRhdGVJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tYXJjaGl2ZS10aXRsZS1jb250ZW50LWlucHV0JylcclxuICAgIGNvbnN0IGNhbmNlbEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JylcclxuICAgIGNvbnN0IGlucHV0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignaW5wdXQnKVxyXG5cclxuICAgIC8vIHRvIGhpZGU6IC50aXRsZS10ZXh0LCBlZGl0SWNvblxyXG4gICAgdGl0bGVUZXh0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcblxyXG4gICAgLy8gdG8gc2hvdzogdXBkYXRlSWNvbiwgY2FuY2VsSWNvblxyXG4gICAgdXBkYXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKSB7XHJcbiAgICBjb25zdCB0aXRsZVRleHQgPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdGV4dCcpXHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCB1cGRhdGVJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tYXJjaGl2ZS10aXRsZS1jb250ZW50LWlucHV0JylcclxuICAgIGNvbnN0IGNhbmNlbEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JylcclxuICAgIGNvbnN0IGlucHV0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignaW5wdXQnKVxyXG5cclxuICAgIC8vIHRvIGhpZGU6IHVwZGF0ZUljb24sIGNhbmNlbEljb25cclxuICAgIHVwZGF0ZUljb24uY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcblxyXG4gICAgLy8gdG8gc2hvdzogdGl0bGVUZXh0LCBlZGl0SWNvblxyXG4gICAgdGl0bGVUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gIH0sXHJcbiAgdXBkYXRlQXJjaGl2ZVRpdGxlKHRhcmdldFRhYkRPTSwgYXJjaGl2ZUlkLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlIHRpdGxlIGluIGNvbnRlbnRcclxuICAgIGNvbnN0IGFyY2hpdmVUaXRsZUNvbnRlbnQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgYXJjaGl2ZVRpdGxlQ29udGVudC50ZXh0Q29udGVudCA9IHRhYk5hbWVJbnB1dFxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlIHRpdGxlIGluIHNpZGViYXJcclxuICAgIGNvbnN0IGFyY2hpdmVUaXRsZVNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYXJjaGl2ZS0ke2FyY2hpdmVJZH0tc2lkZWJhcmApXHJcbiAgICBhcmNoaXZlVGl0bGVTaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJ3AnKS50ZXh0Q29udGVudCA9IHRhYk5hbWVJbnB1dFxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICAvLyBcclxuICByZW1vdmVUYWIodGFiQmFyKSB7XHJcbiAgICB0YWJCYXIucmVtb3ZlKClcclxuICB9LFxyXG4gIHJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyByZW1vdmUgYXJjaGl2ZSBmcm9tIHNpZGViYXJcclxuICAgIGFyY2hpdmVCYXIucmVtb3ZlKClcclxuXHJcbiAgICAvLyByZW1vdmUgYXJjaGl2ZSBpbiBjb250ZW50XHJcbiAgICBjb25zdCBhcmNoaXZlQmFySW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FyY2hpdmUtJHthcmNoaXZlSWR9YClcclxuICAgIGFyY2hpdmVCYXJJbkNvbnRlbnQucmVtb3ZlKClcclxuXHJcbiAgfSxcclxuICBjbGVhclRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zb2xlLmxvZygnYXJjaGl2ZUlkOiAnLCBhcmNoaXZlSWQpXHJcbiAgICAvLyByZXR1cm5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRMaXN0ID0gJydcclxuXHJcbiAgICBpZiAoYXJjaGl2ZUlkID09PSAnMDAxJykge1xyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCAudGFicy1saXN0JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0YFxyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgdW5jbGFzc2lmaWVkTGlzdC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgfSxcclxuICBzaG93U2VhcmNoUmVzdWx0KHRhYnNBcnJheSkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgIGNvbnN0IGFyY2hpdmVzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJjaGl2ZScpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZFRhYnNMaXN0ID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZERhdGFCYXIgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLmRhdGEtYmFyJylcclxuICAgIGNvbnN0IG9wZW5BbGxCdG4gPSB1bmNsYXNzaWZpZWREYXRhQmFyLnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLWFsbCcpXHJcbiAgICBjb25zdCBkZWxldGVBbGxCdG4gPSB1bmNsYXNzaWZpZWREYXRhQmFyLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtYWxsLWluLWFyY2hpdmUnKVxyXG5cclxuICAgIC8vIHNldCBvcGVuLWFsbCBidXR0b24gJiBkZWxldGUtYWxsIGJ1dHRvbiBvbiBzZWFyY2hcclxuICAgIG9wZW5BbGxCdG4uY2xhc3NMaXN0LmFkZCgnb24tc2VhcmNoJylcclxuICAgIGRlbGV0ZUFsbEJ0bi5jbGFzc0xpc3QuYWRkKCdvbi1zZWFyY2gnKVxyXG5cclxuICAgIC8vIGhpZGUgYXJjaGl2ZXNcclxuICAgIGFyY2hpdmVzLmZvckVhY2goZWFjaCA9PiBlYWNoLmNsYXNzTGlzdC5hZGQoJ25vbmUnKSlcclxuXHJcbiAgICAvLyBjbGVhciB1bmNsYXNzaWZpZWRUYWJzXHJcbiAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG5cclxuICAgIC8vIGlmICF0YWJzRGF0YS5sZW5ndGhcclxuICAgIGlmICghdGFic0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5pbm5lckhUTUwgKz0gZW1wdHlUYWJcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGFic0RhdGEubGVuZ3RoXHJcbiAgICBjb25zdCB0YWJzRE9NID0gdGFic0FycmF5Lm1hcCh0YWIgPT4gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYikpXHJcblxyXG4gICAgdGFic0RPTS5mb3JFYWNoKHRhYkRPTSA9PiB7XHJcbiAgICAgIHVuY2xhc3NpZmllZFRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuICAgIH0pXHJcbiAgfSxcclxuICByZXN0b3JlQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcbiAgICBjb25zdCBhcmNoaXZlcyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLmFyY2hpdmUnKVxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCcpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWRUYWJzTGlzdCA9IHVuY2xhc3NpZmllZC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWREYXRhQmFyID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy5kYXRhLWJhcicpXHJcbiAgICBjb25zdCBvcGVuQWxsQnRuID0gdW5jbGFzc2lmaWVkRGF0YUJhci5xdWVyeVNlbGVjdG9yKCcub3Blbi1hbGwnKVxyXG4gICAgY29uc3QgZGVsZXRlQWxsQnRuID0gdW5jbGFzc2lmaWVkRGF0YUJhci5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWFsbC1pbi1hcmNoaXZlJylcclxuXHJcbiAgICAvLyBzZXQgb3Blbi1hbGwgYnV0dG9uICYgZGVsZXRlLWFsbCBidXR0b24gb24gc2VhcmNoXHJcbiAgICBvcGVuQWxsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ29uLXNlYXJjaCcpXHJcbiAgICBkZWxldGVBbGxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnb24tc2VhcmNoJylcclxuXHJcbiAgICAvLyBzaG93IGFyY2hpdmVzXHJcbiAgICBhcmNoaXZlcy5mb3JFYWNoKGVhY2ggPT4gZWFjaC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJykpXHJcblxyXG4gICAgLy8gY2xlYXIgdW5jbGFzc2lmaWVkVGFic1xyXG4gICAgdW5jbGFzc2lmaWVkVGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICAvLyByZXN0b3JlIHVuY2xhc3NpZmllZCB0YWJzLCBnZXQgZGF0YSB2aWEgbW9kZWxcclxuICAgIGNvbnN0IE9yaWdpbmFsVW5jbGFzc2lmaWVkRGF0YSA9IGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWRcclxuICAgIE9yaWdpbmFsVW5jbGFzc2lmaWVkRGF0YS5mb3JFYWNoKHRhYiA9PiB7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsVGFiSW5VbmNsYXNzaWZpZWQgPSBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKVxyXG4gICAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5hcHBlbmRDaGlsZChvcmlnaW5hbFRhYkluVW5jbGFzc2lmaWVkKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvLyBjb25maXJtIGFsZXJ0XHJcbiAgY29uZmlybSh0ZXh0LCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQnKVxyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKVxyXG5cclxuICAgIC8vIHRvIHNob3cgYWxlcnRcclxuICAgIGFsZXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gb3ZlcndyaXRlIHRleHRcclxuICAgIGNvbnN0IGFsZXJ0Q29udGVudCA9IGFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWNvbnRlbnQnKVxyXG4gICAgYWxlcnRDb250ZW50LnRleHRDb250ZW50ID0gdGV4dFxyXG5cclxuICAgIGNvbnN0IGFmZmlybWF0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tYWZmaXJtYXRpdmUnKVxyXG4gICAgY29uc3QgbmVnYXRpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZWdhdGl2ZScpXHJcblxyXG4gICAgLy8gYWRkIGV2ZW50TGlzdGVuZXIgdG8gYnV0dG9uc1xyXG4gICAgYWZmaXJtYXRpdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZWNvbmZpcm0oKVxyXG4gICAgICBjYWxsYmFjayh0cnVlKVxyXG4gICAgfSlcclxuXHJcbiAgICBuZWdhdGl2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5oaWRlY29uZmlybSgpXHJcbiAgICAgIGNhbGxiYWNrKGZhbHNlKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBoaWRlY29uZmlybSgpIHtcclxuICAgIGNvbnN0IGFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0JylcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJylcclxuXHJcbiAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gIH0sXHJcblxyXG4gIC8vIGRyYWcgYW5kIGRyb3AgaGFuZGxlcnNcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIGN1cnJlbnQgZGF0YVxyXG4gIC8vIGFyY2hpdmVzIGFuZCB0YWJzXHJcbiAgc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpIHtcclxuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuXHJcbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRoaXMuc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbSh0YWIpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZTogdW5jbGFzc2lmaWVkLCBkcm9wem9uZVxyXG4gICAgY29uc3QgZHJvcHpvbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3B6b25lJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQnKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3IgYXJjaGl2ZXNcclxuICAgIGRyb3B6b25lcy5mb3JFYWNoKGRyb3B6b25lID0+IHRoaXMuc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0oZHJvcHpvbmUpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3Igcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIHRoaXMuc2V0VXBVbmNsYXNzaWZpZWREcmFnQW5kRHJvcFN5c3RlbSh1bmNsYXNzaWZpZWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHsgdGhpcy51bmNsYXNzaWZpZWREcm9wcGVkSGFuZGxlcihlLCB1bmNsYXNzaWZpZWQpIH0pXHJcbiAgfSxcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIG5ldyBjcmVhdGVkIHRhYlxyXG4gIHNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0odGFiRE9NKSB7XHJcbiAgICAvLyBlbXB0eSB0YWIgaXMgbm90IGRyYWdnYWJsZVxyXG4gICAgaWYgKHRhYkRPTS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpIHJldHVyblxyXG5cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG4gICAgICBjb25zb2xlLmxvZygndGFyZ2V0OiAnKVxyXG4gICAgICBjb25zb2xlLmxvZyh0YXJnZXQpXHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkID0gdGFyZ2V0LmlkXHJcbiAgICAgIGNvbnNvbGUubG9nKCdwYXlsb2FkOiAnICsgcGF5bG9hZClcclxuXHJcbiAgICAgIC8vIGRhdGFUcmFuc2Zlci5zZXREYXRhXHJcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBwYXlsb2FkKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBkZXRlY3QgZHJvcCBsb2NhdGlvblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgLy8gZHJhZ2VudGVyID0gdGFiLmlkXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkcmFnZW50ZXI6ICcgKyBkcmFnZW50ZXIpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAvLyBkcmFnbGVhdmUgPSB0YWIuaWRcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtIGZvciBuZXcgY3JlYXRlZCBhcmNoaXZlXHJcbiAgc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0oYXJjaGl2ZURPTSkge1xyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4geyB0aGlzLmFyY2hpdmVEcm9wcGVkSGFuZGxlcihlLCBhcmNoaXZlRE9NKSB9KVxyXG4gIH0sXHJcbiAgc2V0VXBVbmNsYXNzaWZpZWREcmFnQW5kRHJvcFN5c3RlbSh1bmNsYXNzaWZpZWRET00pIHtcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gIH0sXHJcbiAgcHJldmVudERlZmF1bHRIYW5kbGVyKGUpIHtcclxuICAgIC8vIGRlZmF1bHQ6IHRhZyBjYW5ub3QgYmUgZHJhZ2dlZFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gdGhlbiBvdXIgRE9NIGNhbiBiZSBkcmFnZ2VkIGluc2lkZVxyXG4gIH0sXHJcbiAgYXJjaGl2ZURyb3BwZWRIYW5kbGVyKGUsIGFyY2hpdmVET00pIHtcclxuICAgIHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpXHJcblxyXG4gICAgY29uc3QgdGFiRE9NSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnN0IHRhYkRPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RhYkRPTUlkfWApXHJcbiAgICBjb25zb2xlLmxvZygndGFiRE9NSWQ6ICcgKyB0YWJET01JZClcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gYXJjaGl2ZURPTS5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCBpc1RhYnNMaXN0RW1wdHkgPSB0aGlzLnRhYnNMaXN0Q2hlY2sodGFic0xpc3QpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnaXNUYWJzTGlzdEVtcHR5OiAnICsgaXNUYWJzTGlzdEVtcHR5KVxyXG4gICAgaWYgKGlzVGFic0xpc3RFbXB0eSkge1xyXG4gICAgICAvLyByZW1vdmUgXCJOTyB0YWIgaGVyZSB5ZXRcIiBcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgbmV3IHRhYkRPTSBpbnRvIHRhYnNMaXN0XHJcbiAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZCh0YWJET00pXHJcblxyXG4gICAgLy8gY3JlYXRlIHRhYkRhdGEgZm9yIHN0b3JhZ2VcclxuICAgIGNvbnN0IHRhYkRhdGEgPSBtb2RlbC5nZXRUYWJEYXRhVmlhVGFiRE9NKHRhYkRPTSlcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gYXJjaGl2ZURPTS5kYXRhc2V0LmFyY2hpdmVJZFxyXG5cclxuICAgIC8vIGRlbGV0ZSBvcmlnaW5hbCB0YWJcclxuICAgIGNvbnN0IHRhYklkID0gdGFiRE9NSWQuc3BsaXQoJy0nKVsxXVxyXG4gICAgbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZSA9IG1vZGVsLnNlYXJjaEFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG4gICAgdGFyZ2V0QXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWJEYXRhKVxyXG5cclxuICAgIC8vIGNhbGwgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIHVuY2xhc3NpZmllZERyb3BwZWRIYW5kbGVyKGUsIHVuY2xhc3NpZmllZCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YWJET01JZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc29sZS5sb2coJ3RhYkRPTUlkOiAnICsgdGFiRE9NSWQpXHJcbiAgICBjb25zdCB0YWJET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0YWJET01JZH1gKVxyXG4gICAgY29uc3QgdGFic0xpc3QgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcblxyXG4gICAgY29uc3QgaXNUYWJzTGlzdEVtcHR5ID0gdGhpcy50YWJzTGlzdENoZWNrKHRhYnNMaXN0KVxyXG4gICAgY29uc29sZS5sb2coJ2lzVGFic0xpc3RFbXB0eTogJyArIGlzVGFic0xpc3RFbXB0eSlcclxuXHJcbiAgICBpZiAoaXNUYWJzTGlzdEVtcHR5KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBcIk5PIHRhYiBoZXJlIHlldFwiIFxyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCBuZXcgdGFiRE9NIGludG8gdGFic0xpc3RcclxuICAgIC8vIGFsdGVybmF0aXZlIC5pbnNlcnRCZWZvcmUoKTpcclxuICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuXHJcbiAgICBjb25zdCB0YWJEYXRhID0gbW9kZWwuZ2V0VGFiRGF0YVZpYVRhYkRPTSh0YWJET00pXHJcblxyXG4gICAgLy8gZGVsZXRlIG9yaWdpbmFsIHRhYlxyXG4gICAgY29uc3QgdGFiSWQgPSB0YWJET01JZC5zcGxpdCgnLScpWzFdXHJcbiAgICBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuICAgIC8vIGNvbnNvbGUubG9nKClcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gJzAwMSdcclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmUgPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHRhcmdldEFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiRGF0YSlcclxuXHJcbiAgICAvLyBjYWxsIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gZGV0ZWN0RHJvcExvY2F0aW9uKHRhYkRPTUlkLCBkcmFnZW50ZXIsIGRyYWdsZWF2ZSlcclxuICB9LFxyXG4gIHRhYnNMaXN0Q2hlY2sodGFic0xpc3QpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0YWJzTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuICAgIHJldHVybiAoKGNvbnRlbnQubGVuZ3RoID09PSAxKSAmJiAoY29udGVudFswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zdHlsZXMvbm9ybWFsaXplLnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2FwcGxpY2F0aW9uLnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2luZGV4LnNjc3MnXHJcblxyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmpzJ1xyXG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3J1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZygnW0luZGV4XSBJbmRleC5odG1sIGxvYWRlZCEgQXNrIGZvciBhcmNoaXZlIGRhdGEhJylcclxuICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgbWVzc2FnZTogJ2dldC1hcmNoaXZlLWRhdGEnLFxyXG4gICAgZGF0YTogbnVsbFxyXG4gIH1cclxuXHJcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnW0luZGV4XSByZWNlaXZlZCBhcmNoaXZlIGRhdGEnLCByZXNwb25zZSlcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSwgbGFzdFRhYklkLCBsYXN0QXJjaGl2ZUlkIH0gPSByZXNwb25zZVxyXG4gICAgZGF0YS5sYXN0VGFiSWQgPSBsYXN0VGFiSWRcclxuICAgIGRhdGEubGFzdEFyY2hpdmVJZCA9IGxhc3RBcmNoaXZlSWRcclxuICAgIGNvbnRyb2xsZXIuaW5pdExvY2FsQXJjaGl2ZURhdGEoYXJjaGl2ZSlcclxuXHJcbiAgICAvLyBzZXR1cCBkcm9wIGl0ZW0gJiBkcm9wIHpvbmVcclxuICAgIGNvbnRyb2xsZXIuc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGNsaWNrIGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICAvLyBjYW5jZWwgc2hvdyBpbnB1dFxyXG4gIC8vIGNvbnRyb2xsZXIuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgLy8gZ2V0IGFsbCBvcGVuZWQgdGFic1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWFsbC1idG4nKSB7XHJcbiAgICBjb250cm9sbGVyLmdldEFsbE9wZW5lZFRhYnMoKVxyXG4gIH1cclxuXHJcbiAgLy8gb2VwbiBhbGwgdGFicyBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4tYWxsJykpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb24tc2VhcmNoJykpIHtcclxuICAgICAgY29udHJvbGxlci5vcGVuQWxsU2VhcmNoVGFicygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29udHJvbGxlci5vcGVuQWxsVGFicyhhcmNoaXZlSWQpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIC8vIG9wZW4gY2V0YWluIHRhYiBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLXRhYicpIHtcclxuICAgIGNvbnN0IHVybCA9IHRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IG5ldyBhcmNoaXZlIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5zaG93TmV3QXJjaGl2ZUlucHV0KClcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBuZXcgYXJjaGl2ZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIG5ldyBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1hcmNoaXZlLW5hbWUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jcmVhdGVOZXdBcmNoaXZlKClcclxuICB9XHJcblxyXG4gIC8vIHNob3cgZWRpdCB0YWIgbmFtZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LWVkaXQtdGFiLW5hbWUnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5zaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyBjYW5jZWwgZWRpdCB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtZWRpdC10YWItaW5wdXQnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gdXBkYXRlIHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tdGFiLWVkaXQnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIHNob3cgZWRpdCBhcmNoaXZlIG5hbWUgaW4gY29udGVudFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpKSB7XHJcbiAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBlZGl0IGFyY2hpdmUgbmFtZSBpbiBjb250ZW50XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpKSB7XHJcbiAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gdXBkYXRlIGFyY2hpdmUgbmFtZSBpbiBjb250ZW50XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tYXJjaGl2ZS10aXRsZS1jb250ZW50LWlucHV0JykpIHtcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIudXBkYXRlQXJjaGl2ZVRpdGxlQ29udGVudCh0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBvbmUgY2VydGFpbiB0YWIgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLXRhYicpIHtcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0LmRhdGFzZXQudGFiaWRcclxuICAgIGNvbnN0IHRhYkJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlVGFiKHRhYkJhciwgdGFiSWQpXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgY2VydGFpbiBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtYXJjaGl2ZScpKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29udHJvbGxlci5kZWxldGVBcmNoaXZlKGFyY2hpdmVCYXIsIHRhcmdldEFyY2hpdmVJZClcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBhbGwgdW5jbGFzc2lmaWVkIHRhYnMgaW4gY2VydGFpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtYWxsLWluLWFyY2hpdmUnKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29uc29sZS5sb2coJ2FyY2hpdmVJZDogJyArIGFyY2hpdmVJZClcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlQWxsVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBjYWNuZWwgdGFicyBzZWFyY2hcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLXNlYXJjaCcpKSB7XHJcbiAgICBjb25zdCBzZWFyY2hCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgc2VhcmNoQmFyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPSAnJ1xyXG5cclxuICAgIC8vIGNhbmNlbCBzZWFyY2hcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsU2VhcmNoKClcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnYnJhbmQtdGl0bGUnKSB7XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbFNlYXJjaCgpXHJcbiAgfVxyXG5cclxuICAvLy8vLyBmb3IgZGV2ZWxvcGluZyAvLy8vL1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dTdG9yYWdlKCdhcmNoaXZlJylcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnY2xlYXItZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2xlYXJTdG9yYWdlKClcclxuICB9XHJcbn0sIGZhbHNlKVxyXG4vLyBmYWxzZSA9IGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuLy8gdG8gc3RvcCBidWJibGluZzogZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcblxyXG4vLyBLZXlib2FyZEV2ZW50IGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICAvLyBpbnB1dCBuZXcgYXJjaGl2ZSBuYW1lXHJcbiAgaWYgKHRhcmdldC5pZCA9PT0gJ2FyY2hpdmVOYW1lLWlucHV0Jykge1xyXG4gICAgaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICAgIGNvbnRyb2xsZXIuY3JlYXRlTmV3QXJjaGl2ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpbnB1dCB1cGRhdGUgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YWItbmFtZS1pbnB1dCcpKSB7XHJcbiAgICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgICBjb250cm9sbGVyLnVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gdW5wdXQgdXBkYXRlIGFyY2hpdmUgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhcmNoaXZlLXRpdGxlLWlucHV0LWNvbnRlbnQnKSkge1xyXG4gICAgaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgICAgY29udHJvbGxlci51cGRhdGVBcmNoaXZlVGl0bGVDb250ZW50KHRpdGxlRE9NKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaW5wdXQgdGFicyBzZWFyY2ggaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFicy1zZWFyY2gtaW5wdXQnKSkge1xyXG4gICAgLy8gaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICBjb25zdCBxdWVyeUJvZHkgPSB0YXJnZXQudmFsdWVcclxuICAgIGlmICghcXVlcnlCb2R5KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOTyBxdWVyeUJvZHkhJylcclxuICAgICAgY29udHJvbGxlci5jYW5jZWxTZWFyY2goKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnRyb2xsZXIuc2VhcmNoVGFiKHF1ZXJ5Qm9keSlcclxuICAgIC8vIH1cclxuICB9XHJcbn0pXHJcblxyXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xyXG4vLyAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcblxyXG4vLyAgIC8vIFVzZXIgY2xlYXIgc2VhcmNoIVxyXG4vLyAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWJzLXNlYXJjaC1pbnB1dCcpKSB7XHJcbi8vICAgICBpZiAoKGUuY29kZSA9PT0gJ0RlbGV0ZScpIHx8IChlLmNvZGUgPT09ICdCYWNrc3BhY2UnKSkge1xyXG4vLyAgICAgICBjb25zdCBxdWVyeUJvZHkgPSB0YXJnZXQudmFsdWVcclxuLy8gICAgICAgaWYgKCFxdWVyeUJvZHkpIHtcclxuLy8gICAgICAgICBjb250cm9sbGVyLmNhbmNlbFNlYXJjaCgpXHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vIH0pXHJcblxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9