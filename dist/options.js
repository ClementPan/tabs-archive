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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWtDO0FBQ0Y7QUFDQTtBQUNFOztBQUUzQjtB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QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksdURBQWlCOztBQUVyQjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FB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O0FBRUE7QUFDQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sdUVBQTJCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG9FQUF3QjtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxnRkFBb0M7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG1FQUF1QjtBQUM3QjtBQUNBO0FBQ0EsSUFBSSxnRUFBb0I7QUFDeEI7QUFDQTtBQUNBLENBQUMsQyIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3LmpzJ1xyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMuanMnXHJcblxyXG5leHBvcnQgY29uc3QgY29udHJvbGxlciA9IHtcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gZ2V0IGFsbCBhY3RpdmUgdGFic1xyXG4gICAgICBjb25zdCBhY3RpdmVUYWJzID0gYXdhaXQgbW9kZWwuZ2V0QWxsT3BlbmVkVGFicygpXHJcblxyXG4gICAgICAvLyBhZGQgbmV3IHRhYnMgdG8gcm9vdC51bmNsYXNzaWZpZWRcclxuICAgICAgZm9yIChsZXQgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcclxuICAgICAgICBkYXRhLmFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGFuZ2Ugdmlld1xyXG4gICAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfSxcclxuICBpbml0TG9jYWxBcmNoaXZlRGF0YShyZXNwb25zZSkge1xyXG4gICAgLy8gc3RvcmUgaXQgdG8gbG9jYWwgZGF0YVxyXG4gICAgZGF0YS5hcmNoaXZlID0gcmVzcG9uc2VcclxuXHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dUYWJzSW5Db250ZW50KHVuY2xhc3NpZmllZClcclxuXHJcbiAgICBjb25zdCB7IGFyY2hpdmVzTGlzdCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dSb290QXJjaGl2ZUxpc3QoYXJjaGl2ZXNMaXN0KVxyXG4gIH0sXHJcbiAgb3BlbkFsbFRhYnMoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuZm9yRWFjaChlYWNoID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gZWFjaC51cmxcclxuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9wZW5BbGxTZWFyY2hUYWJzKCkge1xyXG4gICAgY29uc3Qgc2VhcmNoVGFicyA9IGRhdGEuc2VhcmNoUmVzdWx0XHJcbiAgICBzZWFyY2hUYWJzLmZvckVhY2goZWFjaCA9PiB7XHJcbiAgICAgIGNvbnN0IHVybCA9IGVhY2gudXJsXHJcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBkZWxldGVUYWIodGFyZ2V0LCB0YWJJZCkge1xyXG4gICAgLy8gdGFyZ2V0OiBET00gZWxlbW50XHJcblxyXG4gICAgLy8gcmV0dXJuIG5ld0FyY2hpdmUgd2l0aCB0YXJnZXQgdGFiXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZSA9IG5ld0FyY2hpdmVcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LnJlbW92ZVRhYih0YXJnZXQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgZGVsZXRlQWxsVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpIHtcclxuICAgIGNvbnN0IHRleHQgPSAnZGVsZXRlIGFsbCB0YWJzIGluIHRoaXMgYXJjaGl2ZT8nXHJcbiAgICB2aWV3LmNvbmZpcm0odGV4dCwgKGNvbmZpcm1lZCkgPT4ge1xyXG4gICAgICBpZiAoY29uZmlybWVkKSB7XHJcbiAgICAgICAgLy8gY2hlY2s6IGlmIGlzIGFscmVhZHkgZW1wdHlcclxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgLmFyY2hpdmUtJHthcmNoaXZlSWR9LWNvbnRlbnQgLnRhYnMtbGlzdCAudGFiYFxyXG4gICAgICAgIGNvbnN0IHRhYkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpXHJcbiAgICAgICAgaWYgKCh0YWJJdGVtcy5sZW5ndGggPT09IDEpICYmICh0YWJJdGVtc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSB0YWJcclxuICAgICAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwuY2xlYXJUYWJzSW5BcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgICAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgICAgICB2aWV3LmNsZWFyVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcblxyXG4gICAgICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBkZWxldGVBcmNoaXZlKGFyY2hpdmVCYXIsIGFyY2hpdmVJZCkge1xyXG4gICAgY29uc3QgdGV4dCA9ICdkZWxldGUgdGhpcyBhcmNoaXZlPydcclxuICAgIHZpZXcuY29uZmlybSh0ZXh0LCAoY29uZmlybWVkKSA9PiB7XHJcbiAgICAgIGlmIChjb25maXJtZWQpIHtcclxuICAgICAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCBhcmNoaXZlXHJcbiAgICAgICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLnJlbW92ZUFyY2hpdmUoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICAgICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgICAgICAvLyByZXJlbmRlciB2aWV3LCBib3RoIGluIHNpZGViYXIgJiBjb250ZW50IChuZWVkIGFyY2hpdmVJZClcclxuICAgICAgICB2aWV3LnJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKVxyXG5cclxuICAgICAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgICAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8gY3JlYXRpbmcgbmV3IGFyY2hpdmVcclxuICBzaG93TmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgdmlldy5zaG93TmV3QXJjaGl2ZUlucHV0KClcclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmUoKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgYXJjaGl2ZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJjaGl2ZU5hbWUtaW5wdXQnKS52YWx1ZVxyXG5cclxuICAgIC8vIG5vIGVtcHR5IGlucHV0IGFsbG93ZWRcclxuICAgIGlmICghYXJjaGl2ZU5hbWUpIHtcclxuICAgICAgdmlldy5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gICAgICBjb25zb2xlLmxvZygnTm8gZW1wdHkgaW5wdXQgYWxsb3dlZCEnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdCBhcmNoaXZlIGRhdGEsIGFkZCBuZXcgYXJjaGl2ZSBpbiBkYXRhXHJcbiAgICAvLyBuZXdBcmNoaXZlOiBkYXRhXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwuY3JlYXRlTmV3QXJjaGl2ZUluRGF0YShhcmNoaXZlTmFtZSlcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LmNyZWF0ZU5ld0FyY2hpdmVJblNpZGViYXIobmV3QXJjaGl2ZSlcclxuICAgIHZpZXcuY3JlYXRlTmV3QXJjaGl2ZUluQ29udGVudChuZXdBcmNoaXZlKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjYW5jZWxOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfSxcclxuICAvLyBlZGl0aW5nIHRhYiBuYW1lKHRpdGxlKVxyXG4gIHNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5zaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG4gIHVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgdGFiSWQgPSB0YXJnZXRUYWJET00uZGF0YXNldC5pZFxyXG4gICAgY29uc3QgdGFiTmFtZUlucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBpbnB1dCcpLnZhbHVlXHJcblxyXG4gICAgLy8gY2hlY2tcclxuICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKS50ZXh0Q29udGVudFxyXG4gICAgaWYgKG9yaWdpbmFsVGl0bGUgPT09IHRhYk5hbWVJbnB1dCkge1xyXG4gICAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBmaW5kIHRhYiBpbiBhcmNoaXZlIHZpYSB0YWJJZCwgdXBkYXRlIGl0XHJcbiAgICBtb2RlbC51cGRhdGVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZCwgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXcgXHJcbiAgICB2aWV3LnVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NLCB0YWJOYW1lSW5wdXQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIHJlc3RvcmUgVUlcclxuICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIC8vIGVkaXRpbmcgYXJjaGl2ZSB0aXRsZVxyXG4gIHNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5jYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0YXJnZXRUYWJET00pXHJcbiAgfSxcclxuICB1cGRhdGVBcmNoaXZlVGl0bGVDb250ZW50KHRhcmdldFRhYkRPTSkge1xyXG4gICAgLy8gZ2V0IHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldFRhYkRPTS5kYXRhc2V0LmlkXHJcbiAgICBjb25zdCBhcmNoaXZlVGl0bGVJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuYXJjaGl2ZS10aXRsZS1pbnB1dC1jb250ZW50JykudmFsdWVcclxuICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKS50ZXh0Q29udGVudFxyXG5cclxuICAgIC8vIGNoZWNrXHJcbiAgICBpZiAoYXJjaGl2ZVRpdGxlSW5wdXQgPT09IG9yaWdpbmFsVGl0bGUpIHtcclxuICAgICAgdmlldy5jYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0YXJnZXRUYWJET00pXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpbmQgYXJjaGl2ZSBpbiBkYXRhIHZpYSBhcmNoaXZlSWQsIHVwZGF0ZSBpdFxyXG4gICAgbW9kZWwudXBkYXRlQXJjaGl2ZShkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZCwgYXJjaGl2ZVRpdGxlSW5wdXQpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlldyBcclxuICAgIHZpZXcudXBkYXRlQXJjaGl2ZVRpdGxlKHRhcmdldFRhYkRPTSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gcmVzdG9yZSBVSVxyXG4gICAgdmlldy5jYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0YXJnZXRUYWJET00pXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtXHJcbiAgc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpIHtcclxuICAgIC8vIGV2ZW50TGlzdGVuZXIgaW4gdmlld1xyXG4gICAgLy8gdmlldyBjYWxscyBtb2RlbCB0byBzdG9yZSBkYXRhXHJcbiAgICB2aWV3LnNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKVxyXG4gIH0sXHJcblxyXG4gIC8vIHNlYXJjaCB0YWJzXHJcbiAgc2VhcmNoVGFiKHF1ZXJ5Qm9keSkge1xyXG4gICAgY29uc29sZS5sb2coJ3F1ZXJ5Qm9keTogJyArIHF1ZXJ5Qm9keSlcclxuICAgIHF1ZXJ5Qm9keSA9IHF1ZXJ5Qm9keS50b0xvd2VyQ2FzZSgpLnRyaW0oKVxyXG5cclxuXHJcbiAgICAvLyBtb2RlbDogc2VhcmNoIGZvciB0YWJzLCBzdG9yZSB0aGVtIGluIGxvY2FsIGRhdGEsIGFuZCByZXR1cm4gdGFicyBkYXRhOiBBcnJheVxyXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0ID0gbW9kZWwuc2VhcmNoVGFicyhkYXRhLmFyY2hpdmUsIHF1ZXJ5Qm9keSlcclxuXHJcbiAgICAvLyBoaWRlIGFsbCBhcmNoaXZlcyBpbiBjb250ZW50XHJcbiAgICB2aWV3LnNob3dTZWFyY2hSZXN1bHQoc2VhcmNoUmVzdWx0KVxyXG4gIH0sXHJcbiAgY2FuY2VsU2VhcmNoKCkge1xyXG4gICAgdmlldy5yZXN0b3JlQ29udGVudCgpXHJcbiAgfSxcclxuXHJcbiAgLy8gIGRldmVsb3BpbmcgbWV0aG9kc1xyXG4gIGNsZWFyU3RvcmFnZSgpIHtcclxuICAgIC8vIGNocm9tZS5zdG9yYWdlLnN5bmMuY2xlYXIoKCkgPT4ge1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuY2xlYXIoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnU3RvcmFnZSBjbGVhcmVkIScpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2hvd1N0b3JhZ2UoKSB7XHJcbiAgICAvLyBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2FyY2hpdmUnXSwgKGRhdGEpID0+IHtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ2FyY2hpdmUnXSwgKGRhdGEpID0+IHtcclxuICAgICAgLy8gY29uc3QgeyBRVU9UQV9CWVRFUywgUVVPVEFfQllURVNfUEVSX0lURU0gfSA9IGNocm9tZS5zdG9yYWdlLnN5bmNcclxuICAgICAgY29uc3QgeyBRVU9UQV9CWVRFUyB9ID0gY2hyb21lLnN0b3JhZ2UubG9jYWxcclxuICAgICAgLy8gY29uc29sZS5sb2coY2hyb21lLnN0b3JhZ2UubG9jYWwpXHJcbiAgICAgIGNvbnNvbGUubG9nKFFVT1RBX0JZVEVTKVxyXG4gICAgICAvLyBjb25zb2xlLmxvZygnUXVvdGEgYnl0ZXMgcGVyIGl0ZW06ICcgKyBRVU9UQV9CWVRFU19QRVJfSVRFTSlcclxuXHJcblxyXG4gICAgICAvLyBjb25zdCBjdXJyZW50U3luY1N0b3JhZ2UgPSB1dGlscy5zaXplT2ZEYXRhKGRhdGEpXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhIHNpemU6ICcgKyBjdXJyZW50U3luY1N0b3JhZ2UpXHJcblxyXG4gICAgICAvLyAvLyBjb25zdCBtYXhTeW5jU3RvcmFnZSA9IFFVT1RBX0JZVEVTXHJcbiAgICAgIC8vIC8vIGxvY2FsIG1heCBzdG9yYWdlOiA1LDI0Miw4ODAgYnl0ZXMgPSA1IG1iXHJcbiAgICAgIC8vIC8vIHN5bmMgbWF4IHN0b3JhZ2U6ICAgMTAyLDQwMFxyXG5cclxuICAgICAgLy8gY29uc3QgdGFic0NvdW50ID0gbW9kZWwuc2VhcmNoVGFicyhkYXRhLmFyY2hpdmUsICdhbGwnKS5sZW5ndGhcclxuXHJcbiAgICAgIC8vIGNvbnN0IHN0b3JhZ2VSYXRlID0gTWF0aC5yb3VuZCgxMDAgKiAoY3VycmVudFN5bmNTdG9yYWdlIC8gbWF4U3luY1N0b3JhZ2UpKVxyXG4gICAgICAvLyBjb25zdCBtYXhUYWJzID0gTWF0aC5yb3VuZCgodGFic0NvdW50ICogMTAwKSAvIHN0b3JhZ2VSYXRlKVxyXG4gICAgICAvLyBjb25zdCB0ZXh0ID0gJ1N0b3JhZ2U6ICcgKyB0YWJzQ291bnQgKyAnIC8gJyArIG1heFRhYnMgKyAnIHRhYnMgKCcgKyBzdG9yYWdlUmF0ZSArICclKSdcclxuICAgICAgLy8gY29uc29sZS5sb2codGV4dClcclxuICAgICAgLy8gY29uc29sZS5sb2coJ1RhYnMgSW4gU3RvcmFnZTogJyArIHRhYnNDb3VudCArICcgdGFicycpXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdNYXggVGFicyBJbiBTdG9yYWdlOiAnICsgbWF4VGFicyArICcgdGFicycpXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImV4cG9ydCBjb25zdCBzZWFyY2hSZXN1bHQgPSBbXVxyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGEgPSB7XHJcbiAgYXJjaGl2ZToge30sXHJcbiAgbGFzdFRhYklkOiAnJyxcclxuICBsYXN0QXJjaGl2ZUlkOiAnJ1xyXG59IiwiaW1wb3J0IHsgdXRpbHMgfSBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG4vLyAgIGFyY2hpdmU6IHt9LFxyXG4vLyAgIGxhc3RUYWJJZDogJycsXHJcbi8vICAgbGFzdEFyY2hpdmVJZDogJydcclxuXHJcbi8vIEFyY2hpdmUgcHJvdG9cclxuY29uc3QgQXJjaGl2ZURhdGEgPSBmdW5jdGlvbiAoYXJjaGl2ZU5hbWUsIGlkKSB7XHJcbiAgdGhpcy5hcmNoaXZlTmFtZSA9IGFyY2hpdmVOYW1lIHx8ICdOZXcgQXJjaGl2ZSdcclxuICB0aGlzLmlkID0gaWRcclxuICB0aGlzLmFyY2hpdmVzTGlzdCA9IFtdXHJcbiAgdGhpcy51bmNsYXNzaWZpZWQgPSBbXVxyXG59XHJcblxyXG5jb25zdCBUYWJEYXRhID0gZnVuY3Rpb24gKGlkLCBpY29uLCB0aXRsZSwgdGFncywgY3JlYXRlZEF0LCB1cmwsIHVwZGF0ZWRBdCkge1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gIHRoaXMudXJsID0gdXJsXHJcbiAgdGhpcy5pY29uID0gaWNvblxyXG4gIHRoaXMuY3JlYXRlZEF0ID0gY3JlYXRlZEF0XHJcbiAgdGhpcy51cGRhdGVkQXQgPSB1cGRhdGVkQXRcclxuICB0aGlzLmZpbmlzaFJlYWRpbmcgPSBmYWxzZVxyXG4gIHRoaXMudGFncyA9IHRhZ3NcclxufVxyXG5cclxuY29uc3QgdGFiSW5uZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0YWIpIHtcclxuICBjb25zdCB7IGlkLCBjcmVhdGVkQXQsIHVybCwgdGFncyB9ID0gdGFiXHJcblxyXG4gIGxldCB7IGljb24gfSA9IHRhYlxyXG4gIGlmICghaWNvbikge1xyXG4gICAgY29uc29sZS5sb2coJ05vIGltYWdlIScpXHJcbiAgICBpY29uID0gdXRpbHMuaW1hZ2VIb2xkZXIoKVxyXG4gIH07XHJcblxyXG4gIGxldCB7IHRpdGxlIH0gPSB0YWJcclxuICB0aXRsZSA9IHV0aWxzLmVzY2FwZUh0bWwodGl0bGUpXHJcblxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdudW1iZXIgYm94Jz5cclxuICAgICAgPHA+JHtpZH08L3A+XHJcbiAgICAgICAgICA8L2RpdiA+XHJcbiAgICA8ZGl2IGNsYXNzPSdpY29uIGJveCc+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtpY29ufVwiIGRyYWdnYWJsZT1cImZhbHNlXCIgYWx0PVwiXCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J3RpdGxlIGJveCcgZHJhZ2dhYmxlPVwiZmFsc2VcIj5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGNhbmNlbC1lZGl0LXRhYi1pbnB1dCBub25lXCI+PC9pPlxyXG4gICAgICA8cD4ke3RpdGxlfTwvcD5cclxuICAgICAgPGlucHV0IGNsYXNzPSdlZGl0LXRhYi1uYW1lLWlucHV0IG5vbmUnIHBsYWNlaG9sZGVyPScke3RpdGxlfScgdHlwZT1cInRleHRcIiBtYXhsZW5ndGg9XCI0NVwiPlxyXG5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuLWFsdCBzaG93LWVkaXQtdGFiLW5hbWVcIj48L2k+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZSBjb25maXJtLXRhYi1lZGl0IG5vbmVcIiBkYXRhLWlkPVwiJHtpZH1cIj48L2k+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSd0YWdzIGJveCc+XHJcbiAgICAgIDxwPiR7dGFnc308L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2NyZWF0ZWRBdCBib3gnPlxyXG4gICAgICA8cD4ke2NyZWF0ZWRBdH08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdvcGVuLXRhYicgZGF0YS11cmw9XCIke3VybH1cIj5cclxuICAgICAgICBvcGVuXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdidG4gYm94Jz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLXRhYicgZGF0YS10YWJpZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgZGVsZXRlXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59XHJcblxyXG5jb25zdCBhcmNoaXZlSW5uZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uIChhcmNoaXZlLCB1bmNsYXNzaWZpZWRET01TKSB7XHJcbiAgY29uc3QgeyBhcmNoaXZlTmFtZSwgYXJjaGl2ZXNMaXN0LCBpZCB9ID0gYXJjaGl2ZVxyXG5cclxuICByZXR1cm4gYFxyXG4gICAgPGRpdiBjbGFzcz0nYXJjaGl2ZS1jb250YWluZXInPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1iYXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdhcmNoaXZlLXRpdGxlJyBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgIDxpIGNsYXNzPSdmYXMgZmEtdGltZXMtY2lyY2xlIGNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCBub25lJz48L2k+XHJcbiAgICAgICAgICA8aDMgY2xhc3M9J3RpdGxlLXRleHQnPiR7YXJjaGl2ZU5hbWV9PC9oMz5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1heGxlbmd0aD1cIjI1XCIgdmFsdWU9XCIke2FyY2hpdmVOYW1lfVwiIGNsYXNzPSdhcmNoaXZlLXRpdGxlLWlucHV0LWNvbnRlbnQgbm9uZSc+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW4tYWx0IGVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50XCI+PC9pPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2stY2lyY2xlIGNvbmZpcm0tYXJjaGl2ZS10aXRsZS1jb250ZW50LWlucHV0IG5vbmVcIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuc1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0blwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwib3Blbi1hbGxcIiBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgICBPcGVuIEFsbFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0blwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWxldGUtYWxsLWluLWFyY2hpdmUnIGRhdGEtaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgICAgIERlbGV0ZSBBbGxcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8aW5wdXQgaWQ9XCJhcmNoaXZlJHtpZH0tZHJvcGRvd25cIiBjbGFzcz0nYXJjaGl2ZS1kcm9wZG93biBub25lJyB0eXBlPVwiY2hlY2tib3hcIj5cclxuXHJcbiAgICAgIDxsYWJlbCBmb3I9XCJhcmNoaXZlJHtpZH0tZHJvcGRvd25cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdzaG93LWluZGljYXRvcic+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1mb2xkZXItb3BlbiB1bmZvbGRcIj48L2k+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1mb2xkZXIgZm9sZFwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9sYWJlbD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWNvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZXNMaXN0XCI+XHJcbiAgICAgICAgICA8cD4ke2FyY2hpdmVzTGlzdH08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtbGlzdFwiPlxyXG4gICAgICAgICAgJHt1bmNsYXNzaWZpZWRET01TfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGVtcHR5VGFiID0gYFxyXG4gIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgPHAgY2xhc3M9J2VtcHR5LXRhYic+Tm8gdGFiIGhlcmUgeWV0ITwvcD5cclxuICA8L2Rpdj5cclxuYFxyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGVsID0ge1xyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJbkRhdGEoYXJjaGl2ZU5hbWUpIHtcclxuICAgIGNvbnN0IG5ld0lkID0gZGF0YS5sYXN0QXJjaGl2ZUlkICs9IDFcclxuICAgIGNvbnN0IGlkID0gdXRpbHMuaWRGb3JtYXR0ZXIoJ2FyY2hpdmUnLCBuZXdJZClcclxuXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRGF0YSA9IG5ldyBBcmNoaXZlRGF0YShhcmNoaXZlTmFtZSwgaWQpXHJcblxyXG4gICAgLy8gcHVzaCBuZXdBcmNoaXZlRGF0YSB0byBkYXRhLmFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZS5hcmNoaXZlc0xpc3QucHVzaChuZXdBcmNoaXZlRGF0YSlcclxuXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZURhdGFcclxuICB9LFxyXG4gIGNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihhcmNoaXZlKSB7XHJcbiAgICBjb25zdCB7IGFyY2hpdmVOYW1lLCBpZCB9ID0gYXJjaGl2ZVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGEgaHJlZj1cIiNhcmNoaXZlLSR7aWR9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZvbGRlclwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8cD4ke2FyY2hpdmVOYW1lfTwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGRlbGV0ZS1hcmNoaXZlXCIgZGF0YS1pZD1cIiR7aWR9XCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2E+XHJcbiAgICBgXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9ICdhcmNoaXZlIGFyY2hpdmUtc3R5bGUnXHJcbiAgICBuZXdBcmNoaXZlLmlkID0gYGFyY2hpdmUtJHtpZH0tc2lkZWJhcmBcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIGNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoYXJjaGl2ZSkge1xyXG4gICAgY29uc3QgeyB1bmNsYXNzaWZpZWQsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gICAgbGV0IHVuY2xhc3NpZmllZERPTVMgPSAnJ1xyXG5cclxuICAgIGlmICh1bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSB1bmNsYXNzaWZpZWQubWFwKGVhY2ggPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSd0YWIgdGFiLXN0eWxlJyBkcmFnZ2FibGU9XCJ0cnVlXCIgaWQ9XCJ0YWItJHtlYWNoLmlkfVwiIGRhdGEtaWQ9XCIke2VhY2guaWR9XCI+XHJcbiAgICAgICAgICAgICR7dGFiSW5uZXJUZW1wbGF0ZShlYWNoKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgICAgfSkuam9pbignJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSBlbXB0eVRhYlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbmV3QXJjaGl2ZS5pbm5lckhUTUwgPSBhcmNoaXZlSW5uZXJUZW1wbGF0ZShhcmNoaXZlLCB1bmNsYXNzaWZpZWRET01TKVxyXG5cclxuICAgIG5ld0FyY2hpdmUuaWQgPSBgYXJjaGl2ZS0ke2lkfWBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gYGFyY2hpdmUgZHJvcHpvbmUgYXJjaGl2ZS1zdHlsZSBhcmNoaXZlLSR7aWR9LWNvbnRlbnRgXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVUYWJET01JbkNvbnRlbnQodGFiRGF0YSkge1xyXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHRhYi5pbm5lckhUTUwgPSB0YWJJbm5lclRlbXBsYXRlKHRhYkRhdGEpXHJcbiAgICB0YWIuY2xhc3NMaXN0ICs9ICd0YWIgdGFiLXN0eWxlJ1xyXG4gICAgdGFiLmlkID0gYHRhYi0ke3RhYkRhdGEuaWR9YFxyXG4gICAgdGFiLmRhdGFzZXQuaWQgPSB0YWJEYXRhLmlkXHJcbiAgICB0YWIuZHJhZ2dhYmxlID0gdHJ1ZVxyXG4gICAgcmV0dXJuIHRhYlxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0U3RvcmFnZURhdGEodGFyZ2V0RGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbdGFyZ2V0RGF0YV0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVqZWN0IScpXHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IGZhbHNlLCBzdGF0dXM6IFwiY29tcGxldGVcIiB9LCAocXVlcnlSZXN1bHQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRhYnMgPSBbXVxyXG4gICAgICAgICAgZm9yIChsZXQgdGFiIG9mIHF1ZXJ5UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAodGFiLnRpdGxlID09PSBcImNocm9tZS50YWJzIC0gQ2hyb21lIERldmVsb3BlcnNcIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybCA9PT0gXCJjaHJvbWU6Ly9leHRlbnNpb25zL1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsLnNwbGl0KCc6Ly8nKVswXSA9PT0gJ2Nocm9tZS1leHRlbnNpb24nKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSAnY2hyb21lOi8vbmV3dGFiLycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2xlYXJcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYi5pZClcclxuXHJcbiAgICAgICAgICAgIC8vIGZvcm0gdGFiRGF0YVxyXG4gICAgICAgICAgICAvLyBjb25zdCB0aXRsZSA9IHV0aWxzLnRyaW1TdHJpbmcodXRpbHMuZXNjYXBlSHRtbCh0YWIudGl0bGUpLCA0NSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgZmF2SWNvblVybDogaWNvbiwgdXJsLCB0aXRsZSB9ID0gdGFiXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGlkXHJcbiAgICAgICAgICAgIGRhdGEubGFzdFRhYklkKytcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcigndGFiJywgZGF0YS5sYXN0VGFiSWQpXHJcblxyXG4gICAgICAgICAgICB0YWJzLnB1c2gobmV3IFRhYkRhdGEoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHRhYnMpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBzdG9yZUFyY2hpdmUoKSB7XHJcbiAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBjb25zdCB7IGFyY2hpdmUgfSA9IGRhdGFcclxuICAgIGFyY2hpdmUuYXJjaGl2ZU5hbWUgPSAncm9vdC1hcmNoaXZlJ1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgbWVzc2FnZTogJ3N0b3JlLWFyY2hpdmUnLFxyXG4gICAgICBkYXRhOiBhcmNoaXZlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3VycmVudFN5bmNTdG9yYWdlID0gdXRpbHMuc2l6ZU9mRGF0YShhcmNoaXZlKVxyXG4gICAgY29uc29sZS5sb2coY3VycmVudFN5bmNTdG9yYWdlKVxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1tJbmRleF0gJywgbWVzc2FnZSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgdXBkYXRlVGFiKGFyY2hpdmUsIHRhYklkLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IHRhYklkXHJcbiAgICBjb25zb2xlLmxvZygnaW4gdXBkYXRlVGFiJywgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBoaXQ6ICcsIHRhYk5hbWVJbnB1dClcclxuICAgICAgICAgICAgdGFiLnRpdGxlID0gdGFiTmFtZUlucHV0XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmUoYXJjaGl2ZSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gYXJjaGl2ZVRpdGxlSW5wdXRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS5hcmNoaXZlTmFtZSA9IGFyY2hpdmVUaXRsZUlucHV0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICB9LFxyXG4gIHJlbW92ZVRhYihhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgY29uc3QgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUudW5jbGFzc2lmaWVkLmluZGV4T2YodGFiKVxyXG4gICAgICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICByZW1vdmVBcmNoaXZlKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZGVsZXRlQXJjaGl2ZUJ5SWQgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUuYXJjaGl2ZXNMaXN0LmluZGV4T2Yoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgIGFyY2hpdmUuYXJjaGl2ZXNMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlQXJjaGl2ZUJ5SWQoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBcmNoaXZlQnlJZChhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIC8vIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkID0gW11cclxuICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IGFyY2hpdmVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS51bmNsYXNzaWZpZWQgPSBbXVxyXG4gICAgICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKSB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgaWQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyIHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgaWNvbjogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5pY29uIGltZycpLnNyYyxcclxuICAgICAgdGl0bGU6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICB0YWdzOiB0YWJET00ucXVlcnlTZWxlY3RvcignLnRhZ3MgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICBjcmVhdGVkQXQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlZEF0IHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgdXJsOiB0YWJET00ucXVlcnlTZWxlY3RvcignLmJ0biBidXR0b24nKS5kYXRhc2V0LnVybCxcclxuICAgICAgdXBkYXRlZEF0OiAnJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIHNlYXJjaFRhYnMoYXJjaGl2ZSwgcXVlcnlCb2R5KSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXVxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeVF1ZXJ5Qm9keSA9IChhcmNoaXZlLCBxdWVyeUJvZHkpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5UXVlcnlCb2R5KHN1YkFyY2hpdmUsIHF1ZXJ5Qm9keSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAocXVlcnlCb2R5ID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0YWIpXHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAodGFiLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnlCb2R5KSkgfHxcclxuICAgICAgICAgICAgKHRhYi5pZC5pbmNsdWRlcyhxdWVyeUJvZHkpKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRhYilcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlRdWVyeUJvZHkoc3ViQXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZFRhYkJ5UXVlcnlCb2R5KGFyY2hpdmUsIHF1ZXJ5Qm9keSlcclxuXHJcbiAgICAvLyBzdG9yZSBzZWFyY2ggcmVzdWx0IGluIGxvY2FsIGRhdGFcclxuICAgIGRhdGEuc2VhcmNoUmVzdWx0ID0gcmVzdWx0XHJcblxyXG4gICAgLy8gcmV0dXJuIHJlc3VsdCBmb3Igdmlld1xyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH0sXHJcblxyXG4gIC8vIHJlY3Vyc2l2ZSBzZWFyY2ggcHJvdG90eXBlIC8vXHJcbiAgc2VhcmNoVGFiQnlJZChhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gdGFiSWRcclxuXHJcbiAgICBjb25zdCBmaW5kVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YWIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gIH0sXHJcbiAgc2VhcmNoQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gYXJjaGl2ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIHRhcmdldEFyY2hpdmVcclxuICB9LFxyXG59IiwiZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xyXG4gIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICAvLyB0eXBlID0gXCJ0YWJcIiB8fCBcImFyY2hpdmVcIlxyXG4gICAgbGV0IG1vZGUgPSB0eXBlID09PSAndGFiJyA/IDUgOiAzXHJcbiAgICBudW0gPSBudW0gKyAnJ1xyXG4gICAgbGV0IG91dHB1dCA9IG51bS5zcGxpdCgnJylcclxuICAgIGlmIChudW0ubGVuZ3RoIDwgbW9kZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGUgLSBudW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBvdXRwdXQudW5zaGlmdCgnMCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQuam9pbignJylcclxuICB9LFxyXG4gIGVzY2FwZUh0bWw6IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmdcclxuICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxuICB9LFxyXG4gIHRyaW1TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcsIG1leGxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoMCwgbWV4bGVuZ3RoKVxyXG4gIH0sXHJcbiAgaW1hZ2VIb2xkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzMyLzAxMTYxZS9mZmY/dGV4dD0/J1xyXG4gIH0sXHJcbiAgc2l6ZU9mRGF0YTogZnVuY3Rpb24gKG9iamVjdCkge1xyXG5cclxuICAgIHZhciBvYmplY3RMaXN0ID0gW107XHJcbiAgICB2YXIgc3RhY2sgPSBbb2JqZWN0XTtcclxuICAgIHZhciBieXRlcyA9IDA7XHJcblxyXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBzdGFjay5wb3AoKTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIGJ5dGVzICs9IDQ7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGJ5dGVzICs9IHZhbHVlLmxlbmd0aCAqIDI7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGJ5dGVzICs9IDg7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZlxyXG4gICAgICAgIChcclxuICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXHJcbiAgICAgICAgJiYgb2JqZWN0TGlzdC5pbmRleE9mKHZhbHVlKSA9PT0gLTFcclxuICAgICAgKSB7XHJcbiAgICAgICAgb2JqZWN0TGlzdC5wdXNoKHZhbHVlKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgc3RhY2sucHVzaCh2YWx1ZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnl0ZXM7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyBlbXB0eVRhYiB9IGZyb20gJy4vbW9kZWwuanMnXHJcblxyXG4vLyBub3QgZG9uZVxyXG5jb25zdCBkZXRlY3REcm9wTG9jYXRpb24gPSBmdW5jdGlvbiAodGFiSWQsIGRyYWdlbnRlciwgZHJhZ2xlYXZlKSB7XHJcbiAgY29uc29sZS5sb2coJ3RhYklkOiAgICAgJyArIHRhYklkKVxyXG4gIGNvbnNvbGUubG9nKCdkcmFnZW50ZXI6ICcgKyBkcmFnZW50ZXIpXHJcbiAgY29uc29sZS5sb2coJ2RyYWdsZWF2ZTogJyArIGRyYWdsZWF2ZSlcclxuICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tJylcclxuICBsZXQgcmVzdWx0ID0gJ25vIGRldGVjdCdcclxuICBpZiAoKHRhYklkID09PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKSkge1xyXG4gICAgcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcbiAgfSBlbHNlIGlmICgodGFiSWQgIT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpKSB7XHJcbiAgICByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuICB9IGVsc2UgaWYgKChkcmFnZW50ZXIgPT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKSkge1xyXG4gICAgcmVzdWx0ID0gYGJlZm9yZSAke2RyYWdsZWF2ZX1gXHJcbiAgfSBlbHNlIGlmICgoZHJhZ2VudGVyICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcikpIHtcclxuICAgIHJlc3VsdCA9IGBhZnRlciAke2RyYWdlbnRlcn1gXHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZygncmVzdWx0OiAnICsgcmVzdWx0KVxyXG4gIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0nKVxyXG4gIHJldHVyblxyXG59XHJcblxyXG4vLyAodGFiSWQgPT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpXHJcbi8vIEEgQSBBXHJcbi8vIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG5cclxuLy8gKHRhYklkICE9PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKVxyXG4vLyBBIEIgQVxyXG4vLyByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuXHJcbi8vIChkcmFnZW50ZXIgPT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKVxyXG4vLyBBIEIgQiBcclxuLy8gZHJhZ2xlYXZlIOeahOWJjeS4gOWAi1xyXG5cclxuLy8gKGRyYWdlbnRlciAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpXHJcbi8vIEEgQiBDXHJcbi8vIGRyYWdsZWF2ZSDnmoTliY3kuIDlgItcclxuXHJcbmV4cG9ydCBjb25zdCB2aWV3ID0ge1xyXG4gIHNob3dUYWJzSW5Db250ZW50KGRhdGEpIHtcclxuICAgIC8vIGRhdGE6IHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG4gICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIHRhYnNMaXN0LmlubmVySFRNTCA9IGVtcHR5VGFiXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgdGFiIG9mIGRhdGEpIHtcclxuICAgICAgY29uc3QgbmV3VGFiID0gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYilcclxuICAgICAgLy8gYWRkIGV2ZW50TGlzdGVuZXIgdG8gbmV3IHRhYnMgLy9cclxuICAgICAgdGhpcy5zZXRVcFRhYkRyYWdBbmREcm9wU3lzdGVtKG5ld1RhYilcclxuXHJcbiAgICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKG5ld1RhYilcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dSb290QXJjaGl2ZUxpc3QobGlzdCkge1xyXG4gICAgLy8gbGlzdDogcm9vdC5hcmNoaXZlc0xpc3RcclxuICAgIGNvbnN0IHNpZGViYXJBcmNoaXZlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuYXJjaGl2ZXNMaXN0JylcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcblxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1NpZGViYXJBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGl0ZW0pXHJcbiAgICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3U2lkZWJhckFyY2hpdmUpXHJcblxyXG4gICAgICBjb25zdCBuZXdDb250ZW50QXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoaXRlbSlcclxuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChuZXdDb250ZW50QXJjaGl2ZSlcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICAvLyBoaWRlIGlucHV0IGljb25cclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuaWNvbicpXHJcbiAgICBpY29uLmNsYXNzTmFtZSArPSAnIG5vbmUnXHJcblxyXG4gICAgLy8gaGlkZSA8cD5cclxuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBwJylcclxuICAgIGlmICghcC5jbGFzc05hbWUuaW5jbHVkZXMoJ25vbmUnKSkge1xyXG4gICAgICBwLmNsYXNzTmFtZSArPSAnIG5vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dCBVSVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBpbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNhbmNlbCcpXHJcbiAgICBjb25zdCBjb25maXJtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jb25maXJtJylcclxuXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNvbmZpcm1JY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwgTmV3IEFyY2hpdmUgSW5wdXQnKVxyXG5cclxuICAgIC8vcmVzdG9yZSBcclxuICAgIC8vIGhpZGUgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG4gICAgY29uZmlybUljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuXHJcbiAgICAvLyBzaG93IGlucHV0IGljb25cclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuaWNvbicpXHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIHNob3cgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcC5zaG93LW5ldy1hcmNoaXZlLWlucHV0JylcclxuICAgIHAuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gY2xlYXIgaW5wdXQgdmFsdWVcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlID0gJydcclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJblNpZGViYXIobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURPTSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG5cclxuICAgIC8vIHB1c2ggbmV3QXJjaGl2ZURPTSBpbnRvIHNpZGViYXJBcmNoaXZlc0xpc3RcclxuICAgIGNvbnN0IHNpZGViYXJBcmNoaXZlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuYXJjaGl2ZXNMaXN0JylcclxuICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3QXJjaGl2ZURPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJbkNvbnRlbnQobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgIGNvbnN0IG5ld0FyY2hpdmVET00gPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcbiAgICB0aGlzLnNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKG5ld0FyY2hpdmVET00pXHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0FyY2hpdmVET00pXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIC8vIGVkaXQgdGFiIG5hbWVcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIC8vIG1ha2UgdGFiIHVuZHJhZ2dhYmxlXHJcbiAgICB0YXJnZXRUYWJET00uZHJhZ2dhYmxlID0gZmFsc2VcclxuXHJcbiAgICBjb25zdCBjYW5jZWxFZGl0VGFiSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LXRhYi1pbnB1dCcpXHJcbiAgICBjb25zdCB0aXRsZVAgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmVkaXQtdGFiLW5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgY29uZmlybVRhYkVkaXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tdGFiLWVkaXQnKVxyXG4gICAgY29uc3Qgc2hvd0VkaXRUYWJOYW1lID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5zaG93LWVkaXQtdGFiLW5hbWUnKVxyXG5cclxuICAgIC8vIGhpZGUgLnRpdGxlIHBcclxuICAgIHRpdGxlUC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIHNob3dFZGl0VGFiTmFtZS5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuXHJcbiAgICAvLyBwYXNzIHRpdGxlIHRvIGlucHV0IHZhbHVlXHJcbiAgICBpbnB1dC52YWx1ZSA9IHRpdGxlUC50ZXh0Q29udGVudFxyXG5cclxuICAgIC8vIHNob3cgaW5wdXRcclxuICAgIGNhbmNlbEVkaXRUYWJJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY29uZmlybVRhYkVkaXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB0YXJnZXRUYWJET00uZHJhZ2dhYmxlID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gdG8gc2hvd1xyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgLy8gdG8gaGlkZVxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICB9LFxyXG4gIHVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICB0aXRsZVAudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICB9LFxyXG4gIC8vIGVkaXQgYXJjaGl2ZSB0aXRsZVxyXG4gIHNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiAudGl0bGUtdGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHVwZGF0ZUljb24sIGNhbmNlbEljb25cclxuICAgIHVwZGF0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiB1cGRhdGVJY29uLCBjYW5jZWxJY29uXHJcbiAgICB1cGRhdGVJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHRpdGxlVGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmVUaXRsZSh0YXJnZXRUYWJET00sIGFyY2hpdmVJZCwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZSB0aXRsZSBpbiBjb250ZW50XHJcbiAgICBjb25zdCBhcmNoaXZlVGl0bGVDb250ZW50ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JylcclxuICAgIGFyY2hpdmVUaXRsZUNvbnRlbnQudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZSB0aXRsZSBpbiBzaWRlYmFyXHJcbiAgICBjb25zdCBhcmNoaXZlVGl0bGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FyY2hpdmUtJHthcmNoaXZlSWR9LXNpZGViYXJgKVxyXG4gICAgYXJjaGl2ZVRpdGxlU2lkZWJhci5xdWVyeVNlbGVjdG9yKCdwJykudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgLy8gXHJcbiAgcmVtb3ZlVGFiKHRhYkJhcikge1xyXG4gICAgdGFiQmFyLnJlbW92ZSgpXHJcbiAgfSxcclxuICByZW1vdmVBcmNoaXZlKGFyY2hpdmVCYXIsIGFyY2hpdmVJZCkge1xyXG4gICAgLy8gcmVtb3ZlIGFyY2hpdmUgZnJvbSBzaWRlYmFyXHJcbiAgICBhcmNoaXZlQmFyLnJlbW92ZSgpXHJcblxyXG4gICAgLy8gcmVtb3ZlIGFyY2hpdmUgaW4gY29udGVudFxyXG4gICAgY29uc3QgYXJjaGl2ZUJhckluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhcmNoaXZlLSR7YXJjaGl2ZUlkfWApXHJcbiAgICBhcmNoaXZlQmFySW5Db250ZW50LnJlbW92ZSgpXHJcblxyXG4gIH0sXHJcbiAgY2xlYXJUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZCkge1xyXG4gICAgY29uc29sZS5sb2coJ2FyY2hpdmVJZDogJywgYXJjaGl2ZUlkKVxyXG4gICAgLy8gcmV0dXJuXHJcbiAgICBsZXQgdW5jbGFzc2lmaWVkTGlzdCA9ICcnXHJcblxyXG4gICAgaWYgKGFyY2hpdmVJZCA9PT0gJzAwMScpIHtcclxuICAgICAgdW5jbGFzc2lmaWVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQgLnRhYnMtbGlzdCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgLmFyY2hpdmUtJHthcmNoaXZlSWR9LWNvbnRlbnQgLnRhYnMtbGlzdGBcclxuICAgICAgdW5jbGFzc2lmaWVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHVuY2xhc3NpZmllZExpc3QuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgICAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gIH0sXHJcbiAgc2hvd1NlYXJjaFJlc3VsdCh0YWJzQXJyYXkpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcbiAgICBjb25zdCBhcmNoaXZlcyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLmFyY2hpdmUnKVxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCcpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWRUYWJzTGlzdCA9IHVuY2xhc3NpZmllZC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWREYXRhQmFyID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy5kYXRhLWJhcicpXHJcbiAgICBjb25zdCBvcGVuQWxsQnRuID0gdW5jbGFzc2lmaWVkRGF0YUJhci5xdWVyeVNlbGVjdG9yKCcub3Blbi1hbGwnKVxyXG4gICAgY29uc3QgZGVsZXRlQWxsQnRuID0gdW5jbGFzc2lmaWVkRGF0YUJhci5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWFsbC1pbi1hcmNoaXZlJylcclxuXHJcbiAgICAvLyBzZXQgb3Blbi1hbGwgYnV0dG9uICYgZGVsZXRlLWFsbCBidXR0b24gb24gc2VhcmNoXHJcbiAgICBvcGVuQWxsQnRuLmNsYXNzTGlzdC5hZGQoJ29uLXNlYXJjaCcpXHJcbiAgICBkZWxldGVBbGxCdG4uY2xhc3NMaXN0LmFkZCgnb24tc2VhcmNoJylcclxuXHJcbiAgICAvLyBoaWRlIGFyY2hpdmVzXHJcbiAgICBhcmNoaXZlcy5mb3JFYWNoKGVhY2ggPT4gZWFjaC5jbGFzc0xpc3QuYWRkKCdub25lJykpXHJcblxyXG4gICAgLy8gY2xlYXIgdW5jbGFzc2lmaWVkVGFic1xyXG4gICAgdW5jbGFzc2lmaWVkVGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICAvLyBpZiAhdGFic0RhdGEubGVuZ3RoXHJcbiAgICBpZiAoIXRhYnNBcnJheS5sZW5ndGgpIHtcclxuICAgICAgdW5jbGFzc2lmaWVkVGFic0xpc3QuaW5uZXJIVE1MICs9IGVtcHR5VGFiXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRhYnNEYXRhLmxlbmd0aFxyXG4gICAgY29uc3QgdGFic0RPTSA9IHRhYnNBcnJheS5tYXAodGFiID0+IG1vZGVsLmNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWIpKVxyXG5cclxuICAgIHRhYnNET00uZm9yRWFjaCh0YWJET00gPT4ge1xyXG4gICAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5hcHBlbmRDaGlsZCh0YWJET00pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgcmVzdG9yZUNvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG4gICAgY29uc3QgYXJjaGl2ZXMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcmNoaXZlJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQnKVxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkVGFic0xpc3QgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcblxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkRGF0YUJhciA9IHVuY2xhc3NpZmllZC5xdWVyeVNlbGVjdG9yKCcuZGF0YS1iYXInKVxyXG4gICAgY29uc3Qgb3BlbkFsbEJ0biA9IHVuY2xhc3NpZmllZERhdGFCYXIucXVlcnlTZWxlY3RvcignLm9wZW4tYWxsJylcclxuICAgIGNvbnN0IGRlbGV0ZUFsbEJ0biA9IHVuY2xhc3NpZmllZERhdGFCYXIucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1hbGwtaW4tYXJjaGl2ZScpXHJcblxyXG4gICAgLy8gc2V0IG9wZW4tYWxsIGJ1dHRvbiAmIGRlbGV0ZS1hbGwgYnV0dG9uIG9uIHNlYXJjaFxyXG4gICAgb3BlbkFsbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdvbi1zZWFyY2gnKVxyXG4gICAgZGVsZXRlQWxsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ29uLXNlYXJjaCcpXHJcblxyXG4gICAgLy8gc2hvdyBhcmNoaXZlc1xyXG4gICAgYXJjaGl2ZXMuZm9yRWFjaChlYWNoID0+IGVhY2guY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpKVxyXG5cclxuICAgIC8vIGNsZWFyIHVuY2xhc3NpZmllZFRhYnNcclxuICAgIHVuY2xhc3NpZmllZFRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcblxyXG4gICAgLy8gcmVzdG9yZSB1bmNsYXNzaWZpZWQgdGFicywgZ2V0IGRhdGEgdmlhIG1vZGVsXHJcbiAgICBjb25zdCBPcmlnaW5hbFVuY2xhc3NpZmllZERhdGEgPSBkYXRhLmFyY2hpdmUudW5jbGFzc2lmaWVkXHJcbiAgICBPcmlnaW5hbFVuY2xhc3NpZmllZERhdGEuZm9yRWFjaCh0YWIgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbFRhYkluVW5jbGFzc2lmaWVkID0gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYilcclxuICAgICAgdW5jbGFzc2lmaWVkVGFic0xpc3QuYXBwZW5kQ2hpbGQob3JpZ2luYWxUYWJJblVuY2xhc3NpZmllZClcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgLy8gY29uZmlybSBhbGVydFxyXG4gIGNvbmZpcm0odGV4dCwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0JylcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJylcclxuXHJcbiAgICAvLyB0byBzaG93IGFsZXJ0XHJcbiAgICBhbGVydC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIG92ZXJ3cml0ZSB0ZXh0XHJcbiAgICBjb25zdCBhbGVydENvbnRlbnQgPSBhbGVydC5xdWVyeVNlbGVjdG9yKCcudGV4dC1jb250ZW50JylcclxuICAgIGFsZXJ0Q29udGVudC50ZXh0Q29udGVudCA9IHRleHRcclxuXHJcbiAgICBjb25zdCBhZmZpcm1hdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFmZmlybWF0aXZlJylcclxuICAgIGNvbnN0IG5lZ2F0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbmVnYXRpdmUnKVxyXG5cclxuICAgIC8vIGFkZCBldmVudExpc3RlbmVyIHRvIGJ1dHRvbnNcclxuICAgIGFmZmlybWF0aXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICAgIGNhbGxiYWNrKHRydWUpXHJcbiAgICB9KVxyXG5cclxuICAgIG5lZ2F0aXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICAgIGNhbGxiYWNrKGZhbHNlKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvLyBkcmFnIGFuZCBkcm9wIGhhbmRsZXJzXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtIGZvciBjdXJyZW50IGRhdGFcclxuICAvLyBhcmNoaXZlcyBhbmQgdGFic1xyXG4gIHNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKSB7XHJcbiAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpXHJcblxyXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0aGlzLnNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0odGFiKSlcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmU6IHVuY2xhc3NpZmllZCwgZHJvcHpvbmVcclxuICAgIGNvbnN0IGRyb3B6b25lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wem9uZScpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkJylcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmUgZm9yIGFyY2hpdmVzXHJcbiAgICBkcm9wem9uZXMuZm9yRWFjaChkcm9wem9uZSA9PiB0aGlzLnNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKGRyb3B6b25lKSlcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmUgZm9yIHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICB0aGlzLnNldFVwVW5jbGFzc2lmaWVkRHJhZ0FuZERyb3BTeXN0ZW0odW5jbGFzc2lmaWVkKVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7IHRoaXMudW5jbGFzc2lmaWVkRHJvcHBlZEhhbmRsZXIoZSwgdW5jbGFzc2lmaWVkKSB9KVxyXG4gIH0sXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtIGZvciBuZXcgY3JlYXRlZCB0YWJcclxuICBzZXRVcFRhYkRyYWdBbmREcm9wU3lzdGVtKHRhYkRPTSkge1xyXG4gICAgLy8gZW1wdHkgdGFiIGlzIG5vdCBkcmFnZ2FibGVcclxuICAgIGlmICh0YWJET00uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbXB0eScpKSByZXR1cm5cclxuXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuICAgICAgY29uc29sZS5sb2coJ3RhcmdldDogJylcclxuICAgICAgY29uc29sZS5sb2codGFyZ2V0KVxyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZCA9IHRhcmdldC5pZFxyXG4gICAgICBjb25zb2xlLmxvZygncGF5bG9hZDogJyArIHBheWxvYWQpXHJcblxyXG4gICAgICAvLyBkYXRhVHJhbnNmZXIuc2V0RGF0YVxyXG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgcGF5bG9hZClcclxuICAgIH0pXHJcblxyXG4gICAgLy8gZGV0ZWN0IGRyb3AgbG9jYXRpb25cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8vIGRyYWdlbnRlciA9IHRhYi5pZFxyXG4gICAgICAvLyBjb25zb2xlLmxvZygnZHJhZ2VudGVyOiAnICsgZHJhZ2VudGVyKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgLy8gZHJhZ2xlYXZlID0gdGFiLmlkXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIC8vIHNldCB1cCBkcmFnIGFuZCBkcm9wIHN5c3RlbSBmb3IgbmV3IGNyZWF0ZWQgYXJjaGl2ZVxyXG4gIHNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKGFyY2hpdmVET00pIHtcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHsgdGhpcy5hcmNoaXZlRHJvcHBlZEhhbmRsZXIoZSwgYXJjaGl2ZURPTSkgfSlcclxuICB9LFxyXG4gIHNldFVwVW5jbGFzc2lmaWVkRHJhZ0FuZERyb3BTeXN0ZW0odW5jbGFzc2lmaWVkRE9NKSB7XHJcbiAgICB1bmNsYXNzaWZpZWRET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWRET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICB9LFxyXG4gIHByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB7XHJcbiAgICAvLyBkZWZhdWx0OiB0YWcgY2Fubm90IGJlIGRyYWdnZWRcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIHRoZW4gb3VyIERPTSBjYW4gYmUgZHJhZ2dlZCBpbnNpZGVcclxuICB9LFxyXG4gIGFyY2hpdmVEcm9wcGVkSGFuZGxlcihlLCBhcmNoaXZlRE9NKSB7XHJcbiAgICB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKVxyXG5cclxuICAgIGNvbnN0IHRhYkRPTUlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBjb25zdCB0YWJET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0YWJET01JZH1gKVxyXG4gICAgY29uc29sZS5sb2coJ3RhYkRPTUlkOiAnICsgdGFiRE9NSWQpXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IGFyY2hpdmVET00ucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcblxyXG4gICAgY29uc3QgaXNUYWJzTGlzdEVtcHR5ID0gdGhpcy50YWJzTGlzdENoZWNrKHRhYnNMaXN0KVxyXG4gICAgLy8gY29uc29sZS5sb2coJ2lzVGFic0xpc3RFbXB0eTogJyArIGlzVGFic0xpc3RFbXB0eSlcclxuICAgIGlmIChpc1RhYnNMaXN0RW1wdHkpIHtcclxuICAgICAgLy8gcmVtb3ZlIFwiTk8gdGFiIGhlcmUgeWV0XCIgXHJcbiAgICAgIHRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIG5ldyB0YWJET00gaW50byB0YWJzTGlzdFxyXG4gICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQodGFiRE9NKVxyXG5cclxuICAgIC8vIGNyZWF0ZSB0YWJEYXRhIGZvciBzdG9yYWdlXHJcbiAgICBjb25zdCB0YWJEYXRhID0gbW9kZWwuZ2V0VGFiRGF0YVZpYVRhYkRPTSh0YWJET00pXHJcblxyXG4gICAgLy8gZmluZCBhcmNoaXZlIGJ5IElkLCBhcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYilcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IGFyY2hpdmVET00uZGF0YXNldC5hcmNoaXZlSWRcclxuXHJcbiAgICAvLyBkZWxldGUgb3JpZ2luYWwgdGFiXHJcbiAgICBjb25zdCB0YWJJZCA9IHRhYkRPTUlkLnNwbGl0KCctJylbMV1cclxuICAgIG1vZGVsLnJlbW92ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG5cclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmUgPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHRhcmdldEFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiRGF0YSlcclxuXHJcbiAgICAvLyBjYWxsIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICB1bmNsYXNzaWZpZWREcm9wcGVkSGFuZGxlcihlLCB1bmNsYXNzaWZpZWQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3QgdGFiRE9NSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnNvbGUubG9nKCd0YWJET01JZDogJyArIHRhYkRPTUlkKVxyXG4gICAgY29uc3QgdGFiRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGFiRE9NSWR9YClcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IGlzVGFic0xpc3RFbXB0eSA9IHRoaXMudGFic0xpc3RDaGVjayh0YWJzTGlzdClcclxuICAgIGNvbnNvbGUubG9nKCdpc1RhYnNMaXN0RW1wdHk6ICcgKyBpc1RhYnNMaXN0RW1wdHkpXHJcblxyXG4gICAgaWYgKGlzVGFic0xpc3RFbXB0eSkge1xyXG4gICAgICAvLyByZW1vdmUgXCJOTyB0YWIgaGVyZSB5ZXRcIiBcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgbmV3IHRhYkRPTSBpbnRvIHRhYnNMaXN0XHJcbiAgICAvLyBhbHRlcm5hdGl2ZSAuaW5zZXJ0QmVmb3JlKCk6XHJcbiAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZCh0YWJET00pXHJcblxyXG4gICAgY29uc3QgdGFiRGF0YSA9IG1vZGVsLmdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKVxyXG5cclxuICAgIC8vIGRlbGV0ZSBvcmlnaW5hbCB0YWJcclxuICAgIGNvbnN0IHRhYklkID0gdGFiRE9NSWQuc3BsaXQoJy0nKVsxXVxyXG4gICAgbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcbiAgICAvLyBjb25zb2xlLmxvZygpXHJcblxyXG4gICAgLy8gZmluZCBhcmNoaXZlIGJ5IElkLCBhcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYilcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9ICcwMDEnXHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB0YXJnZXRBcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYkRhdGEpXHJcblxyXG4gICAgLy8gY2FsbCBtb2RlbCB0byBzdG9yZSBkYXRhXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIGRldGVjdERyb3BMb2NhdGlvbih0YWJET01JZCwgZHJhZ2VudGVyLCBkcmFnbGVhdmUpXHJcbiAgfSxcclxuICB0YWJzTGlzdENoZWNrKHRhYnNMaXN0KSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGFic0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpXHJcbiAgICByZXR1cm4gKChjb250ZW50Lmxlbmd0aCA9PT0gMSkgJiYgKGNvbnRlbnRbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbXB0eScpKSlcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc3R5bGVzL25vcm1hbGl6ZS5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9pbmRleC5zY3NzJ1xyXG5cclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci5qcydcclxuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldydcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coJ1tJbmRleF0gSW5kZXguaHRtbCBsb2FkZWQhIEFzayBmb3IgYXJjaGl2ZSBkYXRhIScpXHJcbiAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgIG1lc3NhZ2U6ICdnZXQtYXJjaGl2ZS1kYXRhJyxcclxuICAgIGRhdGE6IG51bGxcclxuICB9XHJcblxyXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChyZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1tJbmRleF0gcmVjZWl2ZWQgYXJjaGl2ZSBkYXRhJywgcmVzcG9uc2UpXHJcbiAgICBjb25zdCB7IGFyY2hpdmUsIGxhc3RUYWJJZCwgbGFzdEFyY2hpdmVJZCB9ID0gcmVzcG9uc2VcclxuICAgIGRhdGEubGFzdFRhYklkID0gbGFzdFRhYklkXHJcbiAgICBkYXRhLmxhc3RBcmNoaXZlSWQgPSBsYXN0QXJjaGl2ZUlkXHJcbiAgICBjb250cm9sbGVyLmluaXRMb2NhbEFyY2hpdmVEYXRhKGFyY2hpdmUpXHJcblxyXG4gICAgLy8gc2V0dXAgZHJvcCBpdGVtICYgZHJvcCB6b25lXHJcbiAgICBjb250cm9sbGVyLnNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBjbGljayBldmVudExpc3RlbmVyXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuXHJcbiAgLy8gY2FuY2VsIHNob3cgaW5wdXRcclxuICAvLyBjb250cm9sbGVyLmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcblxyXG4gIC8vIGdldCBhbGwgb3BlbmVkIHRhYnNcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1hbGwtYnRuJykge1xyXG4gICAgY29udHJvbGxlci5nZXRBbGxPcGVuZWRUYWJzKClcclxuICB9XHJcblxyXG4gIC8vIG9lcG4gYWxsIHRhYnMgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuLWFsbCcpKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ29uLXNlYXJjaCcpKSB7XHJcbiAgICAgIGNvbnRyb2xsZXIub3BlbkFsbFNlYXJjaFRhYnMoKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnRyb2xsZXIub3BlbkFsbFRhYnMoYXJjaGl2ZUlkKVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICAvLyBvcGVuIGNldGFpbiB0YWIgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi10YWInKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0YXJnZXQuZGF0YXNldC51cmxcclxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBuZXcgYXJjaGl2ZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LW5ldy1hcmNoaXZlLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuc2hvd05ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfVxyXG5cclxuICAvLyBjYW5jZWwgbmV3IGFyY2hpdmUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLW5ldy1hcmNoaXZlLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICB9XHJcblxyXG4gIC8vIGNyZWF0ZSBuZXcgYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctYXJjaGl2ZS1uYW1lLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuY3JlYXRlTmV3QXJjaGl2ZSgpXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IGVkaXQgdGFiIG5hbWUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1lZGl0LXRhYi1uYW1lJykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FuY2VsIGVkaXQgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLWVkaXQtdGFiLWlucHV0JykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIHVwZGF0ZSB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLXRhYi1lZGl0JykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IGVkaXQgYXJjaGl2ZSBuYW1lIGluIGNvbnRlbnRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKSkge1xyXG4gICAgY29uc3QgdGl0bGVET00gPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5zaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pXHJcbiAgfVxyXG5cclxuICAvLyBjYW5jZWwgZWRpdCBhcmNoaXZlIG5hbWUgaW4gY29udGVudFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKSkge1xyXG4gICAgY29uc3QgdGl0bGVET00gPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5jYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIC8vIHVwZGF0ZSBhcmNoaXZlIG5hbWUgaW4gY29udGVudFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpKSB7XHJcbiAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnVwZGF0ZUFyY2hpdmVUaXRsZUNvbnRlbnQodGl0bGVET00pXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgb25lIGNlcnRhaW4gdGFiIGluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZS10YWInKSB7XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhcmdldC5kYXRhc2V0LnRhYmlkXHJcbiAgICBjb25zdCB0YWJCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZVRhYih0YWJCYXIsIHRhYklkKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIGNlcnRhaW4gYXJjaGl2ZSBmcm9tIHNpZGViYXJcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWFyY2hpdmUnKSkge1xyXG4gICAgY29uc3QgYXJjaGl2ZUJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlQXJjaGl2ZShhcmNoaXZlQmFyLCB0YXJnZXRBcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgYWxsIHVuY2xhc3NpZmllZCB0YWJzIGluIGNlcnRhaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLWFsbC1pbi1hcmNoaXZlJykge1xyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnNvbGUubG9nKCdhcmNoaXZlSWQ6ICcgKyBhcmNoaXZlSWQpXHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZUFsbFRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FjbmVsIHRhYnMgc2VhcmNoXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1zZWFyY2gnKSkge1xyXG4gICAgY29uc3Qgc2VhcmNoQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIHNlYXJjaEJhci5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gJydcclxuXHJcbiAgICAvLyBjYW5jZWwgc2VhcmNoXHJcbiAgICBjb250cm9sbGVyLmNhbmNlbFNlYXJjaCgpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2JyYW5kLXRpdGxlJykge1xyXG4gICAgY29udHJvbGxlci5jYW5jZWxTZWFyY2goKVxyXG4gIH1cclxuXHJcbiAgLy8vLy8gZm9yIGRldmVsb3BpbmcgLy8vLy9cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1kYXRhJykge1xyXG4gICAgY29udHJvbGxlci5zaG93U3RvcmFnZSgnYXJjaGl2ZScpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NsZWFyLWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLmNsZWFyU3RvcmFnZSgpXHJcbiAgfVxyXG59LCBmYWxzZSlcclxuLy8gZmFsc2UgPSBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbi8vIHRvIHN0b3AgYnViYmxpbmc6IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcblxyXG5cclxuLy8gS2V5Ym9hcmRFdmVudCBldmVudExpc3RlbmVyXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuXHJcbiAgLy8gaW5wdXQgbmV3IGFyY2hpdmUgbmFtZVxyXG4gIGlmICh0YXJnZXQuaWQgPT09ICdhcmNoaXZlTmFtZS1pbnB1dCcpIHtcclxuICAgIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gICAgICBjb250cm9sbGVyLmNyZWF0ZU5ld0FyY2hpdmUoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaW5wdXQgdXBkYXRlIHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtdGFiLW5hbWUtaW5wdXQnKSkge1xyXG4gICAgaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgICAgY29udHJvbGxlci51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHVucHV0IHVwZGF0ZSBhcmNoaXZlIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXJjaGl2ZS10aXRsZS1pbnB1dC1jb250ZW50JykpIHtcclxuICAgIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gICAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlQXJjaGl2ZVRpdGxlQ29udGVudCh0aXRsZURPTSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlucHV0IHRhYnMgc2VhcmNoIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYnMtc2VhcmNoLWlucHV0JykpIHtcclxuICAgIC8vIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gICAgY29uc3QgcXVlcnlCb2R5ID0gdGFyZ2V0LnZhbHVlXHJcbiAgICBpZiAoIXF1ZXJ5Qm9keSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnTk8gcXVlcnlCb2R5IScpXHJcbiAgICAgIGNvbnRyb2xsZXIuY2FuY2VsU2VhcmNoKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb250cm9sbGVyLnNlYXJjaFRhYihxdWVyeUJvZHkpXHJcbiAgICAvLyB9XHJcbiAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=