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




function roughSizeOfObject(object) {

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
  },
  deleteArchive(archiveBar, archiveId) {
    // return newArchive with target archive
    const newArchive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.removeArchive(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, archiveId)

    // update archive
    _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive = newArchive

    // rerender view, both in sidebar & content (need archiveId)
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.removeArchive(archiveBar, archiveId)

    // store archive to storage
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()
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
    chrome.storage.sync.clear(() => {
      console.log('Storage cleared!')
    })
  },
  showStorage() {
    chrome.storage.sync.get(['archive'], (data) => {
      // console.log(data)
      const currentSyncStorage = roughSizeOfObject(data)
      const maxSyncStorage = chrome.storage.sync.QUOTA_BYTES
      // local max storage: 5242,880
      // sync max storage:   102,400

      const tabsCount = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.searchTabs(data.archive, 'all').length

      const storageRate = Math.round(100 * (currentSyncStorage / maxSyncStorage))
      const maxTabs = Math.round((tabsCount * 100) / storageRate)

      console.log('Storage: ' + tabsCount + ' / ' + maxTabs + ' tabs (' + storageRate + '%)')
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
        chrome.storage.sync.get([targetData], (data) => {
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
        chrome.tabs.query({ active: false }, (queryResult) => {
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

    chrome.runtime.sendMessage(request, (message) => {
      console.log('[Index] ', message)
    });
  },
  updateTab(archive, tabId, tabNameInput) {
    let targetId = tabId
    console.log('in updateTab', tabNameInput)

    const findTabById = (archive, targetId) => {
      console.log('in findTabById', tabNameInput)
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
    console.log(archiveBar)
    // return
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0M7QUFDRjtBQUNBOztBQUVoQzs7QUFFQTtB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QTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHVEQUFpQjs7QUFFckI7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJIiwiZmlsZSI6Im9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcuanMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcblxyXG5mdW5jdGlvbiByb3VnaFNpemVPZk9iamVjdChvYmplY3QpIHtcclxuXHJcbiAgdmFyIG9iamVjdExpc3QgPSBbXTtcclxuICB2YXIgc3RhY2sgPSBbb2JqZWN0XTtcclxuICB2YXIgYnl0ZXMgPSAwO1xyXG5cclxuICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XHJcbiAgICB2YXIgdmFsdWUgPSBzdGFjay5wb3AoKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgYnl0ZXMgKz0gNDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgYnl0ZXMgKz0gdmFsdWUubGVuZ3RoICogMjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgYnl0ZXMgKz0gODtcclxuICAgIH1cclxuICAgIGVsc2UgaWZcclxuICAgICAgKFxyXG4gICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXHJcbiAgICAgICYmIG9iamVjdExpc3QuaW5kZXhPZih2YWx1ZSkgPT09IC0xXHJcbiAgICApIHtcclxuICAgICAgb2JqZWN0TGlzdC5wdXNoKHZhbHVlKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIHtcclxuICAgICAgICBzdGFjay5wdXNoKHZhbHVlW2ldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gYnl0ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBvcGVuQWxsVGFicyhhcmNoaXZlSWQpIHtcclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHVuY2xhc3NpZmllZC5mb3JFYWNoKGVhY2ggPT4ge1xyXG4gICAgICBjb25zdCB1cmwgPSBlYWNoLnVybFxyXG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb3BlbkFsbFNlYXJjaFRhYnMoKSB7XHJcbiAgICBjb25zdCBzZWFyY2hUYWJzID0gZGF0YS5zZWFyY2hSZXN1bHRcclxuICAgIHNlYXJjaFRhYnMuZm9yRWFjaChlYWNoID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gZWFjaC51cmxcclxuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRlbGV0ZVRhYih0YXJnZXQsIHRhYklkKSB7XHJcbiAgICAvLyB0YXJnZXQ6IERPTSBlbGVtbnRcclxuXHJcbiAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCB0YWJcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcucmVtb3ZlVGFiKHRhcmdldClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICBkZWxldGVBbGxUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZCkge1xyXG4gICAgLy8gY2hlY2s6IGlmIGlzIGFscmVhZHkgZW1wdHlcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0IC50YWJgXHJcbiAgICBjb25zdCB0YWJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lKVxyXG4gICAgaWYgKCh0YWJJdGVtcy5sZW5ndGggPT09IDEpICYmICh0YWJJdGVtc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB0YWJcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jbGVhclRhYnNJbkFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5jbGVhclRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIGRlbGV0ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwucmVtb3ZlQXJjaGl2ZShkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXcsIGJvdGggaW4gc2lkZWJhciAmIGNvbnRlbnQgKG5lZWQgYXJjaGl2ZUlkKVxyXG4gICAgdmlldy5yZW1vdmVBcmNoaXZlKGFyY2hpdmVCYXIsIGFyY2hpdmVJZClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICAvLyBjcmVhdGluZyBuZXcgYXJjaGl2ZVxyXG4gIHNob3dOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICB2aWV3LnNob3dOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZSgpIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCBhcmNoaXZlTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlXHJcblxyXG4gICAgLy8gbm8gZW1wdHkgaW5wdXQgYWxsb3dlZFxyXG4gICAgaWYgKCFhcmNoaXZlTmFtZSkge1xyXG4gICAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdObyBlbXB0eSBpbnB1dCBhbGxvd2VkIScpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0IGFyY2hpdmUgZGF0YSwgYWRkIG5ldyBhcmNoaXZlIGluIGRhdGFcclxuICAgIC8vIG5ld0FyY2hpdmU6IGRhdGFcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jcmVhdGVOZXdBcmNoaXZlSW5EYXRhKGFyY2hpdmVOYW1lKVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcuY3JlYXRlTmV3QXJjaGl2ZUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG4gICAgdmlldy5jcmVhdGVOZXdBcmNoaXZlSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIHJlc3RvcmUgVUlcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICB9LFxyXG4gIC8vIGVkaXRpbmcgdGFiIG5hbWUodGl0bGUpXHJcbiAgc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LnNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSlcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH0sXHJcbiAgdXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhcmdldFRhYkRPTS5kYXRhc2V0LmlkXHJcbiAgICBjb25zdCB0YWJOYW1lSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIGlucHV0JykudmFsdWVcclxuXHJcbiAgICAvLyBjaGVja1xyXG4gICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50XHJcbiAgICBpZiAob3JpZ2luYWxUaXRsZSA9PT0gdGFiTmFtZUlucHV0KSB7XHJcbiAgICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGZpbmQgdGFiIGluIGFyY2hpdmUgdmlhIHRhYklkLCB1cGRhdGUgaXRcclxuICAgIG1vZGVsLnVwZGF0ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkLCB0YWJOYW1lSW5wdXQpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlldyBcclxuICAgIHZpZXcudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00sIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gcmVzdG9yZSBVSVxyXG4gICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgLy8gZWRpdGluZyBhcmNoaXZlIHRpdGxlXHJcbiAgc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5zaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKVxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmVUaXRsZUNvbnRlbnQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0VGFiRE9NLmRhdGFzZXQuaWRcclxuICAgIGNvbnN0IGFyY2hpdmVUaXRsZUlucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlLXRpdGxlLWlucHV0LWNvbnRlbnQnKS52YWx1ZVxyXG4gICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdGV4dCcpLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gY2hlY2tcclxuICAgIGlmIChhcmNoaXZlVGl0bGVJbnB1dCA9PT0gb3JpZ2luYWxUaXRsZSkge1xyXG4gICAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmluZCBhcmNoaXZlIGluIGRhdGEgdmlhIGFyY2hpdmVJZCwgdXBkYXRlIGl0XHJcbiAgICBtb2RlbC51cGRhdGVBcmNoaXZlKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dClcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3IFxyXG4gICAgdmlldy51cGRhdGVBcmNoaXZlVGl0bGUodGFyZ2V0VGFiRE9NLCBhcmNoaXZlSWQsIGFyY2hpdmVUaXRsZUlucHV0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRhcmdldFRhYkRPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG5cclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW1cclxuICBzZXRVcERyYWdBbmREcm9wU3lzdGVtKCkge1xyXG4gICAgLy8gZXZlbnRMaXN0ZW5lciBpbiB2aWV3XHJcbiAgICAvLyB2aWV3IGNhbGxzIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIHZpZXcuc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpXHJcbiAgfSxcclxuXHJcbiAgLy8gc2VhcmNoIHRhYnNcclxuICBzZWFyY2hUYWIocXVlcnlCb2R5KSB7XHJcbiAgICBjb25zb2xlLmxvZygncXVlcnlCb2R5OiAnICsgcXVlcnlCb2R5KVxyXG4gICAgcXVlcnlCb2R5ID0gcXVlcnlCb2R5LnRvTG93ZXJDYXNlKCkudHJpbSgpXHJcblxyXG5cclxuICAgIC8vIG1vZGVsOiBzZWFyY2ggZm9yIHRhYnMsIHN0b3JlIHRoZW0gaW4gbG9jYWwgZGF0YSwgYW5kIHJldHVybiB0YWJzIGRhdGE6IEFycmF5XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBtb2RlbC5zZWFyY2hUYWJzKGRhdGEuYXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG5cclxuICAgIC8vIGhpZGUgYWxsIGFyY2hpdmVzIGluIGNvbnRlbnRcclxuICAgIHZpZXcuc2hvd1NlYXJjaFJlc3VsdChzZWFyY2hSZXN1bHQpXHJcbiAgfSxcclxuICBjYW5jZWxTZWFyY2goKSB7XHJcbiAgICB2aWV3LnJlc3RvcmVDb250ZW50KClcclxuICB9LFxyXG5cclxuICAvLyAgZGV2ZWxvcGluZyBtZXRob2RzXHJcbiAgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlIGNsZWFyZWQhJylcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93U3RvcmFnZSgpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICBjb25zdCBjdXJyZW50U3luY1N0b3JhZ2UgPSByb3VnaFNpemVPZk9iamVjdChkYXRhKVxyXG4gICAgICBjb25zdCBtYXhTeW5jU3RvcmFnZSA9IGNocm9tZS5zdG9yYWdlLnN5bmMuUVVPVEFfQllURVNcclxuICAgICAgLy8gbG9jYWwgbWF4IHN0b3JhZ2U6IDUyNDIsODgwXHJcbiAgICAgIC8vIHN5bmMgbWF4IHN0b3JhZ2U6ICAgMTAyLDQwMFxyXG5cclxuICAgICAgY29uc3QgdGFic0NvdW50ID0gbW9kZWwuc2VhcmNoVGFicyhkYXRhLmFyY2hpdmUsICdhbGwnKS5sZW5ndGhcclxuXHJcbiAgICAgIGNvbnN0IHN0b3JhZ2VSYXRlID0gTWF0aC5yb3VuZCgxMDAgKiAoY3VycmVudFN5bmNTdG9yYWdlIC8gbWF4U3luY1N0b3JhZ2UpKVxyXG4gICAgICBjb25zdCBtYXhUYWJzID0gTWF0aC5yb3VuZCgodGFic0NvdW50ICogMTAwKSAvIHN0b3JhZ2VSYXRlKVxyXG5cclxuICAgICAgY29uc29sZS5sb2coJ1N0b3JhZ2U6ICcgKyB0YWJzQ291bnQgKyAnIC8gJyArIG1heFRhYnMgKyAnIHRhYnMgKCcgKyBzdG9yYWdlUmF0ZSArICclKScpXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdUYWJzIEluIFN0b3JhZ2U6ICcgKyB0YWJzQ291bnQgKyAnIHRhYnMnKVxyXG4gICAgICAvLyBjb25zb2xlLmxvZygnTWF4IFRhYnMgSW4gU3RvcmFnZTogJyArIG1heFRhYnMgKyAnIHRhYnMnKVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJleHBvcnQgY29uc3Qgc2VhcmNoUmVzdWx0ID0gW11cclxuXHJcbmV4cG9ydCBjb25zdCBkYXRhID0ge1xyXG4gIGFyY2hpdmU6IHt9LFxyXG4gIGxhc3RUYWJJZDogJycsXHJcbiAgbGFzdEFyY2hpdmVJZDogJydcclxufSIsImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuLy8gICBhcmNoaXZlOiB7fSxcclxuLy8gICBsYXN0VGFiSWQ6ICcnLFxyXG4vLyAgIGxhc3RBcmNoaXZlSWQ6ICcnXHJcblxyXG4vLyBBcmNoaXZlIHByb3RvXHJcbmNvbnN0IEFyY2hpdmVEYXRhID0gZnVuY3Rpb24gKGFyY2hpdmVOYW1lLCBpZCkge1xyXG4gIHRoaXMuYXJjaGl2ZU5hbWUgPSBhcmNoaXZlTmFtZSB8fCAnTmV3IEFyY2hpdmUnXHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy5hcmNoaXZlc0xpc3QgPSBbXVxyXG4gIHRoaXMudW5jbGFzc2lmaWVkID0gW11cclxufVxyXG5cclxuY29uc3QgVGFiRGF0YSA9IGZ1bmN0aW9uIChpZCwgaWNvbiwgdGl0bGUsIHRhZ3MsIGNyZWF0ZWRBdCwgdXJsLCB1cGRhdGVkQXQpIHtcclxuICB0aGlzLmlkID0gaWRcclxuICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICB0aGlzLnVybCA9IHVybFxyXG4gIHRoaXMuaWNvbiA9IGljb25cclxuICB0aGlzLmNyZWF0ZWRBdCA9IGNyZWF0ZWRBdFxyXG4gIHRoaXMudXBkYXRlZEF0ID0gdXBkYXRlZEF0XHJcbiAgdGhpcy5maW5pc2hSZWFkaW5nID0gZmFsc2VcclxuICB0aGlzLnRhZ3MgPSB0YWdzXHJcbn1cclxuXHJcbmNvbnN0IHRhYklubmVyVGVtcGxhdGUgPSBmdW5jdGlvbiAodGFiKSB7XHJcbiAgY29uc3QgeyBpZCwgY3JlYXRlZEF0LCB1cmwsIHRhZ3MgfSA9IHRhYlxyXG5cclxuICBsZXQgeyBpY29uIH0gPSB0YWJcclxuICBpZiAoIWljb24pIHtcclxuICAgIGNvbnNvbGUubG9nKCdObyBpbWFnZSEnKVxyXG4gICAgaWNvbiA9IHV0aWxzLmltYWdlSG9sZGVyKClcclxuICB9O1xyXG5cclxuICBsZXQgeyB0aXRsZSB9ID0gdGFiXHJcbiAgdGl0bGUgPSB1dGlscy5lc2NhcGVIdG1sKHRpdGxlKVxyXG5cclxuICByZXR1cm4gYFxyXG4gICAgPGRpdiBjbGFzcz0nbnVtYmVyIGJveCc+XHJcbiAgICAgIDxwPiR7aWR9PC9wPlxyXG4gICAgICAgICAgPC9kaXYgPlxyXG4gICAgPGRpdiBjbGFzcz0naWNvbiBib3gnPlxyXG4gICAgICA8aW1nIHNyYz1cIiR7aWNvbn1cIiBkcmFnZ2FibGU9XCJmYWxzZVwiIGFsdD1cIlwiPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSd0aXRsZSBib3gnIGRyYWdnYWJsZT1cImZhbHNlXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBjYW5jZWwtZWRpdC10YWItaW5wdXQgbm9uZVwiPjwvaT5cclxuICAgICAgPHA+JHt0aXRsZX08L3A+XHJcbiAgICAgIDxpbnB1dCBjbGFzcz0nZWRpdC10YWItbmFtZS1pbnB1dCBub25lJyBwbGFjZWhvbGRlcj0nJHt0aXRsZX0nIHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiNDVcIj5cclxuXHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbi1hbHQgc2hvdy1lZGl0LXRhYi1uYW1lXCI+PC9pPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVjay1jaXJjbGUgY29uZmlybS10YWItZWRpdCBub25lXCIgZGF0YS1pZD1cIiR7aWR9XCI+PC9pPlxyXG5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0ndGFncyBib3gnPlxyXG4gICAgICA8cD4ke3RhZ3N9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdjcmVhdGVkQXQgYm94Jz5cclxuICAgICAgPHA+JHtjcmVhdGVkQXR9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdidG4gYm94Jz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nb3Blbi10YWInIGRhdGEtdXJsPVwiJHt1cmx9XCI+XHJcbiAgICAgICAgb3BlblxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0nYnRuIGJveCc+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS10YWInIGRhdGEtdGFiaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgIGRlbGV0ZVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufVxyXG5cclxuY29uc3QgYXJjaGl2ZUlubmVyVGVtcGxhdGUgPSBmdW5jdGlvbiAoYXJjaGl2ZSwgdW5jbGFzc2lmaWVkRE9NUykge1xyXG4gIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGFyY2hpdmVzTGlzdCwgaWQgfSA9IGFyY2hpdmVcclxuXHJcbiAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9J2FyY2hpdmUtY29udGFpbmVyJz5cclxuICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmUtYmFyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nYXJjaGl2ZS10aXRsZScgZGF0YS1pZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz0nZmFzIGZhLXRpbWVzLWNpcmNsZSBjYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQgbm9uZSc+PC9pPlxyXG4gICAgICAgICAgPGgzIGNsYXNzPSd0aXRsZS10ZXh0Jz4ke2FyY2hpdmVOYW1lfTwvaDM+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBtYXhsZW5ndGg9XCIyNVwiIHZhbHVlPVwiJHthcmNoaXZlTmFtZX1cIiBjbGFzcz0nYXJjaGl2ZS10aXRsZS1pbnB1dC1jb250ZW50IG5vbmUnPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuLWFsdCBlZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudFwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZSBjb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCBub25lXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm9wZW4tYWxsXCIgZGF0YS1pZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICAgICAgT3BlbiBBbGxcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLWFsbC1pbi1hcmNoaXZlJyBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgICBEZWxldGUgQWxsXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGlucHV0IGlkPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCIgY2xhc3M9J2FyY2hpdmUtZHJvcGRvd24gbm9uZScgdHlwZT1cImNoZWNrYm94XCI+XHJcblxyXG4gICAgICA8bGFiZWwgZm9yPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nc2hvdy1pbmRpY2F0b3InPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtZm9sZGVyLW9wZW4gdW5mb2xkXCI+PC9pPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtZm9sZGVyIGZvbGRcIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbGFiZWw+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1jb250ZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmVzTGlzdFwiPlxyXG4gICAgICAgICAgPHA+JHthcmNoaXZlc0xpc3R9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzLWxpc3RcIj5cclxuICAgICAgICAgICR7dW5jbGFzc2lmaWVkRE9NU31cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBlbXB0eVRhYiA9IGBcclxuICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgPC9kaXY+XHJcbmBcclxuXHJcbmV4cG9ydCBjb25zdCBtb2RlbCA9IHtcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5EYXRhKGFyY2hpdmVOYW1lKSB7XHJcbiAgICBjb25zdCBuZXdJZCA9IGRhdGEubGFzdEFyY2hpdmVJZCArPSAxXHJcbiAgICBjb25zdCBpZCA9IHV0aWxzLmlkRm9ybWF0dGVyKCdhcmNoaXZlJywgbmV3SWQpXHJcblxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURhdGEgPSBuZXcgQXJjaGl2ZURhdGEoYXJjaGl2ZU5hbWUsIGlkKVxyXG5cclxuICAgIC8vIHB1c2ggbmV3QXJjaGl2ZURhdGEgdG8gZGF0YS5hcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUuYXJjaGl2ZXNMaXN0LnB1c2gobmV3QXJjaGl2ZURhdGEpXHJcblxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVEYXRhXHJcbiAgfSxcclxuICBjcmVhdGVBcmhpdmVET01JblNpZGViYXIoYXJjaGl2ZSkge1xyXG4gICAgY29uc3QgeyBhcmNoaXZlTmFtZSwgaWQgfSA9IGFyY2hpdmVcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbmV3QXJjaGl2ZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxhIGhyZWY9XCIjYXJjaGl2ZS0ke2lkfVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1mb2xkZXJcIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHA+JHthcmNoaXZlTmFtZX08L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBkZWxldGUtYXJjaGl2ZVwiIGRhdGEtaWQ9XCIke2lkfVwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9hPlxyXG4gICAgYFxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSAnYXJjaGl2ZSBhcmNoaXZlLXN0eWxlJ1xyXG4gICAgbmV3QXJjaGl2ZS5pZCA9IGBhcmNoaXZlLSR7aWR9LXNpZGViYXJgXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkLCBpZCB9ID0gYXJjaGl2ZVxyXG5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRET01TID0gJydcclxuXHJcbiAgICBpZiAodW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gdW5jbGFzc2lmaWVkLm1hcChlYWNoID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz0ndGFiIHRhYi1zdHlsZScgZHJhZ2dhYmxlPVwidHJ1ZVwiIGlkPVwidGFiLSR7ZWFjaC5pZH1cIiBkYXRhLWlkPVwiJHtlYWNoLmlkfVwiPlxyXG4gICAgICAgICAgICAke3RhYklubmVyVGVtcGxhdGUoZWFjaCl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICAgIH0pLmpvaW4oJycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gZW1wdHlUYWJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYXJjaGl2ZUlubmVyVGVtcGxhdGUoYXJjaGl2ZSwgdW5jbGFzc2lmaWVkRE9NUylcclxuXHJcbiAgICBuZXdBcmNoaXZlLmlkID0gYGFyY2hpdmUtJHtpZH1gXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9IGBhcmNoaXZlIGRyb3B6b25lIGFyY2hpdmUtc3R5bGUgYXJjaGl2ZS0ke2lkfS1jb250ZW50YFxyXG4gICAgbmV3QXJjaGl2ZS5kYXRhc2V0LmFyY2hpdmVJZCA9IGlkXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYkRhdGEpIHtcclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB0YWIuaW5uZXJIVE1MID0gdGFiSW5uZXJUZW1wbGF0ZSh0YWJEYXRhKVxyXG4gICAgdGFiLmNsYXNzTGlzdCArPSAndGFiIHRhYi1zdHlsZSdcclxuICAgIHRhYi5pZCA9IGB0YWItJHt0YWJEYXRhLmlkfWBcclxuICAgIHRhYi5kYXRhc2V0LmlkID0gdGFiRGF0YS5pZFxyXG4gICAgdGFiLmRyYWdnYWJsZSA9IHRydWVcclxuICAgIHJldHVybiB0YWJcclxuICB9LFxyXG4gIGFzeW5jIGdldFN0b3JhZ2VEYXRhKHRhcmdldERhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW3RhcmdldERhdGFdLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWplY3QhJylcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogZmFsc2UgfSwgKHF1ZXJ5UmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0YWJzID0gW11cclxuICAgICAgICAgIGZvciAobGV0IHRhYiBvZiBxdWVyeVJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgKHRhYi50aXRsZSA9PT0gXCJjaHJvbWUudGFicyAtIENocm9tZSBEZXZlbG9wZXJzXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwgPT09IFwiY2hyb21lOi8vZXh0ZW5zaW9ucy9cIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybC5zcGxpdCgnOi8vJylbMF0gPT09ICdjaHJvbWUtZXh0ZW5zaW9uJykgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybCA9PT0gJ2Nocm9tZTovL25ld3RhYi8nKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNsZWFyXHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQpXHJcblxyXG4gICAgICAgICAgICAvLyBmb3JtIHRhYkRhdGFcclxuICAgICAgICAgICAgLy8gY29uc3QgdGl0bGUgPSB1dGlscy50cmltU3RyaW5nKHV0aWxzLmVzY2FwZUh0bWwodGFiLnRpdGxlKSwgNDUpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB7IGZhdkljb25Vcmw6IGljb24sIHVybCwgdGl0bGUgfSA9IHRhYlxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW11cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBpZFxyXG4gICAgICAgICAgICBkYXRhLmxhc3RUYWJJZCsrXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdXRpbHMuaWRGb3JtYXR0ZXIoJ3RhYicsIGRhdGEubGFzdFRhYklkKVxyXG5cclxuICAgICAgICAgICAgdGFicy5wdXNoKG5ldyBUYWJEYXRhKGlkLCBpY29uLCB0aXRsZSwgdGFncywgY3JlYXRlZEF0LCB1cmwsIHVwZGF0ZWRBdCkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0YWJzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc3RvcmVBcmNoaXZlKCkge1xyXG4gICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgY29uc3QgeyBhcmNoaXZlIH0gPSBkYXRhXHJcbiAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gJ3Jvb3QtYXJjaGl2ZSdcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzdG9yZS1hcmNoaXZlJyxcclxuICAgICAgZGF0YTogYXJjaGl2ZVxyXG4gICAgfVxyXG5cclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdICcsIG1lc3NhZ2UpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHVwZGF0ZVRhYihhcmNoaXZlLCB0YWJJZCwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSB0YWJJZFxyXG4gICAgY29uc29sZS5sb2coJ2luIHVwZGF0ZVRhYicsIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICBjb25zdCBmaW5kVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW4gZmluZFRhYkJ5SWQnLCB0YWJOYW1lSW5wdXQpXHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBoaXQ6ICcsIHRhYk5hbWVJbnB1dClcclxuICAgICAgICAgICAgdGFiLnRpdGxlID0gdGFiTmFtZUlucHV0XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmUoYXJjaGl2ZSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gYXJjaGl2ZVRpdGxlSW5wdXRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS5hcmNoaXZlTmFtZSA9IGFyY2hpdmVUaXRsZUlucHV0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICB9LFxyXG4gIHJlbW92ZVRhYihhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgY29uc3QgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUudW5jbGFzc2lmaWVkLmluZGV4T2YodGFiKVxyXG4gICAgICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICByZW1vdmVBcmNoaXZlKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZGVsZXRlQXJjaGl2ZUJ5SWQgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUuYXJjaGl2ZXNMaXN0LmluZGV4T2Yoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgIGFyY2hpdmUuYXJjaGl2ZXNMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlQXJjaGl2ZUJ5SWQoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBcmNoaXZlQnlJZChhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIC8vIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkID0gW11cclxuICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IGFyY2hpdmVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS51bmNsYXNzaWZpZWQgPSBbXVxyXG4gICAgICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKSB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgaWQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyIHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgaWNvbjogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5pY29uIGltZycpLnNyYyxcclxuICAgICAgdGl0bGU6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICB0YWdzOiB0YWJET00ucXVlcnlTZWxlY3RvcignLnRhZ3MgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICBjcmVhdGVkQXQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlZEF0IHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgdXJsOiB0YWJET00ucXVlcnlTZWxlY3RvcignLmJ0biBidXR0b24nKS5kYXRhc2V0LnVybCxcclxuICAgICAgdXBkYXRlZEF0OiAnJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIHNlYXJjaFRhYnMoYXJjaGl2ZSwgcXVlcnlCb2R5KSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXVxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeVF1ZXJ5Qm9keSA9IChhcmNoaXZlLCBxdWVyeUJvZHkpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5UXVlcnlCb2R5KHN1YkFyY2hpdmUsIHF1ZXJ5Qm9keSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAocXVlcnlCb2R5ID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0YWIpXHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAodGFiLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnlCb2R5KSkgfHxcclxuICAgICAgICAgICAgKHRhYi5pZC5pbmNsdWRlcyhxdWVyeUJvZHkpKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRhYilcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlRdWVyeUJvZHkoc3ViQXJjaGl2ZSwgcXVlcnlCb2R5KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZFRhYkJ5UXVlcnlCb2R5KGFyY2hpdmUsIHF1ZXJ5Qm9keSlcclxuXHJcbiAgICAvLyBzdG9yZSBzZWFyY2ggcmVzdWx0IGluIGxvY2FsIGRhdGFcclxuICAgIGRhdGEuc2VhcmNoUmVzdWx0ID0gcmVzdWx0XHJcblxyXG4gICAgLy8gcmV0dXJuIHJlc3VsdCBmb3Igdmlld1xyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH0sXHJcblxyXG4gIC8vIHJlY3Vyc2l2ZSBzZWFyY2ggcHJvdG90eXBlIC8vXHJcbiAgc2VhcmNoVGFiQnlJZChhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gdGFiSWRcclxuXHJcbiAgICBjb25zdCBmaW5kVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YWIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gIH0sXHJcbiAgc2VhcmNoQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gYXJjaGl2ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIHRhcmdldEFyY2hpdmVcclxuICB9LFxyXG59IiwiZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xyXG4gIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICAvLyB0eXBlID0gXCJ0YWJcIiB8fCBcImFyY2hpdmVcIlxyXG4gICAgbGV0IG1vZGUgPSB0eXBlID09PSAndGFiJyA/IDUgOiAzXHJcbiAgICBudW0gPSBudW0gKyAnJ1xyXG4gICAgbGV0IG91dHB1dCA9IG51bS5zcGxpdCgnJylcclxuICAgIGlmIChudW0ubGVuZ3RoIDwgbW9kZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGUgLSBudW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBvdXRwdXQudW5zaGlmdCgnMCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQuam9pbignJylcclxuICB9LFxyXG4gIGVzY2FwZUh0bWw6IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmdcclxuICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxuICB9LFxyXG4gIHRyaW1TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcsIG1leGxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoMCwgbWV4bGVuZ3RoKVxyXG4gIH0sXHJcbiAgaW1hZ2VIb2xkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzMyLzAxMTYxZS9mZmY/dGV4dD0/J1xyXG4gIH1cclxufSIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuaW1wb3J0IHsgZW1wdHlUYWIgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5cclxuLy8gbm90IGRvbmVcclxuY29uc3QgZGV0ZWN0RHJvcExvY2F0aW9uID0gZnVuY3Rpb24gKHRhYklkLCBkcmFnZW50ZXIsIGRyYWdsZWF2ZSkge1xyXG4gIGNvbnNvbGUubG9nKCd0YWJJZDogICAgICcgKyB0YWJJZClcclxuICBjb25zb2xlLmxvZygnZHJhZ2VudGVyOiAnICsgZHJhZ2VudGVyKVxyXG4gIGNvbnNvbGUubG9nKCdkcmFnbGVhdmU6ICcgKyBkcmFnbGVhdmUpXHJcbiAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLScpXHJcbiAgbGV0IHJlc3VsdCA9ICdubyBkZXRlY3QnXHJcbiAgaWYgKCh0YWJJZCA9PT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSkpIHtcclxuICAgIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG4gIH0gZWxzZSBpZiAoKHRhYklkICE9PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKSkge1xyXG4gICAgcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcbiAgfSBlbHNlIGlmICgoZHJhZ2VudGVyID09PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcikpIHtcclxuICAgIHJlc3VsdCA9IGBiZWZvcmUgJHtkcmFnbGVhdmV9YFxyXG4gIH0gZWxzZSBpZiAoKGRyYWdlbnRlciAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpKSB7XHJcbiAgICByZXN1bHQgPSBgYWZ0ZXIgJHtkcmFnZW50ZXJ9YFxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coJ3Jlc3VsdDogJyArIHJlc3VsdClcclxuICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tJylcclxuICByZXR1cm5cclxufVxyXG5cclxuLy8gKHRhYklkID09PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKVxyXG4vLyBBIEEgQVxyXG4vLyByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuXHJcbi8vICh0YWJJZCAhPT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSlcclxuLy8gQSBCIEFcclxuLy8gcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcblxyXG4vLyAoZHJhZ2VudGVyID09PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcilcclxuLy8gQSBCIEIgXHJcbi8vIGRyYWdsZWF2ZSDnmoTliY3kuIDlgItcclxuXHJcbi8vIChkcmFnZW50ZXIgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKVxyXG4vLyBBIEIgQ1xyXG4vLyBkcmFnbGVhdmUg55qE5YmN5LiA5YCLXHJcblxyXG5leHBvcnQgY29uc3QgdmlldyA9IHtcclxuICBzaG93VGFic0luQ29udGVudChkYXRhKSB7XHJcbiAgICAvLyBkYXRhOiByb290LnVuY2xhc3NpZmllZFxyXG4gICAgY29uc3QgdGFic0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuICAgIHRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcblxyXG4gICAgaWYgKCFkYXRhLmxlbmd0aCkge1xyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSBlbXB0eVRhYlxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHRhYiBvZiBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IG5ld1RhYiA9IG1vZGVsLmNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWIpXHJcbiAgICAgIC8vIGFkZCBldmVudExpc3RlbmVyIHRvIG5ldyB0YWJzIC8vXHJcbiAgICAgIHRoaXMuc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbShuZXdUYWIpXHJcblxyXG4gICAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZChuZXdUYWIpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93Um9vdEFyY2hpdmVMaXN0KGxpc3QpIHtcclxuICAgIC8vIGxpc3Q6IHJvb3QuYXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5cclxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBuZXdTaWRlYmFyQXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihpdGVtKVxyXG4gICAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld1NpZGViYXJBcmNoaXZlKVxyXG5cclxuICAgICAgY29uc3QgbmV3Q29udGVudEFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGl0ZW0pXHJcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q29udGVudEFyY2hpdmUpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93TmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgLy8gaGlkZSBpbnB1dCBpY29uXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmljb24nKVxyXG4gICAgaWNvbi5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG5cclxuICAgIC8vIGhpZGUgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcCcpXHJcbiAgICBpZiAoIXAuY2xhc3NOYW1lLmluY2x1ZGVzKCdub25lJykpIHtcclxuICAgICAgcC5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3cgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcblxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2FuY2VsIE5ldyBBcmNoaXZlIElucHV0JylcclxuXHJcbiAgICAvL3Jlc3RvcmUgXHJcbiAgICAvLyBoaWRlIGlucHV0IFVJXHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IGlucHV0JylcclxuICAgIGNvbnN0IGNhbmNlbEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY2FuY2VsJylcclxuICAgIGNvbnN0IGNvbmZpcm1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNvbmZpcm0nKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICAgIGNvbmZpcm1JY29uLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dCBpY29uXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmljb24nKVxyXG4gICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgICAvLyBzaG93IDxwPlxyXG4gICAgY29uc3QgcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IHAuc2hvdy1uZXctYXJjaGl2ZS1pbnB1dCcpXHJcbiAgICBwLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIGNsZWFyIGlucHV0IHZhbHVlXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJjaGl2ZU5hbWUtaW5wdXQnKS52YWx1ZSA9ICcnXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5TaWRlYmFyKG5ld0FyY2hpdmUpIHtcclxuICAgIGNvbnN0IG5ld0FyY2hpdmVET00gPSBtb2RlbC5jcmVhdGVBcmhpdmVET01JblNpZGViYXIobmV3QXJjaGl2ZSlcclxuXHJcbiAgICAvLyBwdXNoIG5ld0FyY2hpdmVET00gaW50byBzaWRlYmFyQXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld0FyY2hpdmVET00pXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5Db250ZW50KG5ld0FyY2hpdmUpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRE9NID0gbW9kZWwuY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChuZXdBcmNoaXZlKVxyXG4gICAgdGhpcy5zZXRVcEFyY2hpdmVEcmFnQW5kRHJvcFN5c3RlbShuZXdBcmNoaXZlRE9NKVxyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChuZXdBcmNoaXZlRE9NKVxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICAvLyBlZGl0IHRhYiBuYW1lXHJcbiAgc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICAvLyBtYWtlIHRhYiB1bmRyYWdnYWJsZVxyXG4gICAgdGFyZ2V0VGFiRE9NLmRyYWdnYWJsZSA9IGZhbHNlXHJcblxyXG4gICAgY29uc3QgY2FuY2VsRWRpdFRhYklucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtZWRpdC10YWItaW5wdXQnKVxyXG4gICAgY29uc3QgdGl0bGVQID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJylcclxuICAgIGNvbnN0IGlucHV0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LXRhYi1uYW1lLWlucHV0JylcclxuICAgIGNvbnN0IGNvbmZpcm1UYWJFZGl0ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLXRhYi1lZGl0JylcclxuICAgIGNvbnN0IHNob3dFZGl0VGFiTmFtZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuc2hvdy1lZGl0LXRhYi1uYW1lJylcclxuXHJcbiAgICAvLyBoaWRlIC50aXRsZSBwXHJcbiAgICB0aXRsZVAuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBzaG93RWRpdFRhYk5hbWUuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcblxyXG4gICAgLy8gcGFzcyB0aXRsZSB0byBpbnB1dCB2YWx1ZVxyXG4gICAgaW5wdXQudmFsdWUgPSB0aXRsZVAudGV4dENvbnRlbnRcclxuXHJcbiAgICAvLyBzaG93IGlucHV0XHJcbiAgICBjYW5jZWxFZGl0VGFiSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNvbmZpcm1UYWJFZGl0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdGFyZ2V0VGFiRE9NLmRyYWdnYWJsZSA9IHRydWVcclxuXHJcbiAgICBjb25zdCBjYW5jZWxFZGl0VGFiSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LXRhYi1pbnB1dCcpXHJcbiAgICBjb25zdCB0aXRsZVAgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmVkaXQtdGFiLW5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgY29uZmlybVRhYkVkaXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tdGFiLWVkaXQnKVxyXG4gICAgY29uc3Qgc2hvd0VkaXRUYWJOYW1lID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5zaG93LWVkaXQtdGFiLW5hbWUnKVxyXG5cclxuICAgIC8vIHRvIHNob3dcclxuICAgIHRpdGxlUC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIHNob3dFZGl0VGFiTmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIC8vIHRvIGhpZGVcclxuICAgIGNhbmNlbEVkaXRUYWJJbnB1dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgY29uZmlybVRhYkVkaXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgfSxcclxuICB1cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICBjb25zdCB0aXRsZVAgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKVxyXG4gICAgdGl0bGVQLnRleHRDb250ZW50ID0gdGFiTmFtZUlucHV0XHJcbiAgfSxcclxuICAvLyBlZGl0IGFyY2hpdmUgdGl0bGVcclxuICBzaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pIHtcclxuICAgIGNvbnN0IHRpdGxlVGV4dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JylcclxuICAgIGNvbnN0IGVkaXRJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JylcclxuICAgIGNvbnN0IHVwZGF0ZUljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXHJcblxyXG4gICAgLy8gdG8gaGlkZTogLnRpdGxlLXRleHQsIGVkaXRJY29uXHJcbiAgICB0aXRsZVRleHQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuXHJcbiAgICAvLyB0byBzaG93OiB1cGRhdGVJY29uLCBjYW5jZWxJY29uXHJcbiAgICB1cGRhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pIHtcclxuICAgIGNvbnN0IHRpdGxlVGV4dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JylcclxuICAgIGNvbnN0IGVkaXRJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JylcclxuICAgIGNvbnN0IHVwZGF0ZUljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXHJcblxyXG4gICAgLy8gdG8gaGlkZTogdXBkYXRlSWNvbiwgY2FuY2VsSWNvblxyXG4gICAgdXBkYXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuXHJcbiAgICAvLyB0byBzaG93OiB0aXRsZVRleHQsIGVkaXRJY29uXHJcbiAgICB0aXRsZVRleHQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgfSxcclxuICB1cGRhdGVBcmNoaXZlVGl0bGUodGFyZ2V0VGFiRE9NLCBhcmNoaXZlSWQsIHRhYk5hbWVJbnB1dCkge1xyXG4gICAgLy8gdXBkYXRlIGFyY2hpdmUgdGl0bGUgaW4gY29udGVudFxyXG4gICAgY29uc3QgYXJjaGl2ZVRpdGxlQ29udGVudCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUtdGV4dCcpXHJcbiAgICBhcmNoaXZlVGl0bGVDb250ZW50LnRleHRDb250ZW50ID0gdGFiTmFtZUlucHV0XHJcblxyXG4gICAgLy8gdXBkYXRlIGFyY2hpdmUgdGl0bGUgaW4gc2lkZWJhclxyXG4gICAgY29uc3QgYXJjaGl2ZVRpdGxlU2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhcmNoaXZlLSR7YXJjaGl2ZUlkfS1zaWRlYmFyYClcclxuICAgIGFyY2hpdmVUaXRsZVNpZGViYXIucXVlcnlTZWxlY3RvcigncCcpLnRleHRDb250ZW50ID0gdGFiTmFtZUlucHV0XHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIC8vIFxyXG4gIHJlbW92ZVRhYih0YWJCYXIpIHtcclxuICAgIHRhYkJhci5yZW1vdmUoKVxyXG4gIH0sXHJcbiAgcmVtb3ZlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpIHtcclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gICAgYXJjaGl2ZUJhci5yZW1vdmUoKVxyXG5cclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGluIGNvbnRlbnRcclxuICAgIGNvbnN0IGFyY2hpdmVCYXJJbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYXJjaGl2ZS0ke2FyY2hpdmVJZH1gKVxyXG4gICAgYXJjaGl2ZUJhckluQ29udGVudC5yZW1vdmUoKVxyXG5cclxuICB9LFxyXG4gIGNsZWFyVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdhcmNoaXZlSWQ6ICcsIGFyY2hpdmVJZClcclxuICAgIC8vIHJldHVyblxyXG4gICAgbGV0IHVuY2xhc3NpZmllZExpc3QgPSAnJ1xyXG5cclxuICAgIGlmIChhcmNoaXZlSWQgPT09ICcwMDEnKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkIC50YWJzLWxpc3QnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY2xhc3NOYW1lID0gYC5hcmNoaXZlLSR7YXJjaGl2ZUlkfS1jb250ZW50IC50YWJzLWxpc3RgXHJcbiAgICAgIHVuY2xhc3NpZmllZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSlcclxuICAgIH1cclxuXHJcbiAgICB1bmNsYXNzaWZpZWRMaXN0LmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0ndGFiIGVtcHR5IHRhYi1zdHlsZSc+XHJcbiAgICAgICAgPHAgY2xhc3M9J2VtcHR5LXRhYic+Tm8gdGFiIGhlcmUgeWV0ITwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIGBcclxuICB9LFxyXG4gIHNob3dTZWFyY2hSZXN1bHQodGFic0FycmF5KSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG4gICAgY29uc3QgYXJjaGl2ZXMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcmNoaXZlJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQnKVxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkVGFic0xpc3QgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcblxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkRGF0YUJhciA9IHVuY2xhc3NpZmllZC5xdWVyeVNlbGVjdG9yKCcuZGF0YS1iYXInKVxyXG4gICAgY29uc3Qgb3BlbkFsbEJ0biA9IHVuY2xhc3NpZmllZERhdGFCYXIucXVlcnlTZWxlY3RvcignLm9wZW4tYWxsJylcclxuICAgIGNvbnN0IGRlbGV0ZUFsbEJ0biA9IHVuY2xhc3NpZmllZERhdGFCYXIucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1hbGwtaW4tYXJjaGl2ZScpXHJcblxyXG4gICAgLy8gc2V0IG9wZW4tYWxsIGJ1dHRvbiAmIGRlbGV0ZS1hbGwgYnV0dG9uIG9uIHNlYXJjaFxyXG4gICAgb3BlbkFsbEJ0bi5jbGFzc0xpc3QuYWRkKCdvbi1zZWFyY2gnKVxyXG4gICAgZGVsZXRlQWxsQnRuLmNsYXNzTGlzdC5hZGQoJ29uLXNlYXJjaCcpXHJcblxyXG4gICAgLy8gaGlkZSBhcmNoaXZlc1xyXG4gICAgYXJjaGl2ZXMuZm9yRWFjaChlYWNoID0+IGVhY2guY2xhc3NMaXN0LmFkZCgnbm9uZScpKVxyXG5cclxuICAgIC8vIGNsZWFyIHVuY2xhc3NpZmllZFRhYnNcclxuICAgIHVuY2xhc3NpZmllZFRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcblxyXG4gICAgLy8gaWYgIXRhYnNEYXRhLmxlbmd0aFxyXG4gICAgaWYgKCF0YWJzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZFRhYnNMaXN0LmlubmVySFRNTCArPSBlbXB0eVRhYlxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0YWJzRGF0YS5sZW5ndGhcclxuICAgIGNvbnN0IHRhYnNET00gPSB0YWJzQXJyYXkubWFwKHRhYiA9PiBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKSlcclxuXHJcbiAgICB0YWJzRE9NLmZvckVhY2godGFiRE9NID0+IHtcclxuICAgICAgdW5jbGFzc2lmaWVkVGFic0xpc3QuYXBwZW5kQ2hpbGQodGFiRE9NKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHJlc3RvcmVDb250ZW50KCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgIGNvbnN0IGFyY2hpdmVzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJjaGl2ZScpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZFRhYnNMaXN0ID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZERhdGFCYXIgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLmRhdGEtYmFyJylcclxuICAgIGNvbnN0IG9wZW5BbGxCdG4gPSB1bmNsYXNzaWZpZWREYXRhQmFyLnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLWFsbCcpXHJcbiAgICBjb25zdCBkZWxldGVBbGxCdG4gPSB1bmNsYXNzaWZpZWREYXRhQmFyLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtYWxsLWluLWFyY2hpdmUnKVxyXG5cclxuICAgIC8vIHNldCBvcGVuLWFsbCBidXR0b24gJiBkZWxldGUtYWxsIGJ1dHRvbiBvbiBzZWFyY2hcclxuICAgIG9wZW5BbGxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnb24tc2VhcmNoJylcclxuICAgIGRlbGV0ZUFsbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdvbi1zZWFyY2gnKVxyXG5cclxuICAgIC8vIHNob3cgYXJjaGl2ZXNcclxuICAgIGFyY2hpdmVzLmZvckVhY2goZWFjaCA9PiBlYWNoLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKSlcclxuXHJcbiAgICAvLyBjbGVhciB1bmNsYXNzaWZpZWRUYWJzXHJcbiAgICB1bmNsYXNzaWZpZWRUYWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG5cclxuICAgIC8vIHJlc3RvcmUgdW5jbGFzc2lmaWVkIHRhYnMsIGdldCBkYXRhIHZpYSBtb2RlbFxyXG4gICAgY29uc3QgT3JpZ2luYWxVbmNsYXNzaWZpZWREYXRhID0gZGF0YS5hcmNoaXZlLnVuY2xhc3NpZmllZFxyXG4gICAgT3JpZ2luYWxVbmNsYXNzaWZpZWREYXRhLmZvckVhY2godGFiID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxUYWJJblVuY2xhc3NpZmllZCA9IG1vZGVsLmNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWIpXHJcbiAgICAgIHVuY2xhc3NpZmllZFRhYnNMaXN0LmFwcGVuZENoaWxkKG9yaWdpbmFsVGFiSW5VbmNsYXNzaWZpZWQpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8vIGRyYWcgYW5kIGRyb3AgaGFuZGxlcnNcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIGN1cnJlbnQgZGF0YVxyXG4gIC8vIGFyY2hpdmVzIGFuZCB0YWJzXHJcbiAgc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpIHtcclxuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuXHJcbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRoaXMuc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbSh0YWIpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZTogdW5jbGFzc2lmaWVkLCBkcm9wem9uZVxyXG4gICAgY29uc3QgZHJvcHpvbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3B6b25lJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQnKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3IgYXJjaGl2ZXNcclxuICAgIGRyb3B6b25lcy5mb3JFYWNoKGRyb3B6b25lID0+IHRoaXMuc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0oZHJvcHpvbmUpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3Igcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIHRoaXMuc2V0VXBVbmNsYXNzaWZpZWREcmFnQW5kRHJvcFN5c3RlbSh1bmNsYXNzaWZpZWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHsgdGhpcy51bmNsYXNzaWZpZWREcm9wcGVkSGFuZGxlcihlLCB1bmNsYXNzaWZpZWQpIH0pXHJcbiAgfSxcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIG5ldyBjcmVhdGVkIHRhYlxyXG4gIHNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0odGFiRE9NKSB7XHJcbiAgICAvLyBlbXB0eSB0YWIgaXMgbm90IGRyYWdnYWJsZVxyXG4gICAgaWYgKHRhYkRPTS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpIHJldHVyblxyXG5cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG4gICAgICBjb25zb2xlLmxvZygndGFyZ2V0OiAnKVxyXG4gICAgICBjb25zb2xlLmxvZyh0YXJnZXQpXHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkID0gdGFyZ2V0LmlkXHJcbiAgICAgIGNvbnNvbGUubG9nKCdwYXlsb2FkOiAnICsgcGF5bG9hZClcclxuXHJcbiAgICAgIC8vIGRhdGFUcmFuc2Zlci5zZXREYXRhXHJcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBwYXlsb2FkKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBkZXRlY3QgZHJvcCBsb2NhdGlvblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgLy8gZHJhZ2VudGVyID0gdGFiLmlkXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkcmFnZW50ZXI6ICcgKyBkcmFnZW50ZXIpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAvLyBkcmFnbGVhdmUgPSB0YWIuaWRcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtIGZvciBuZXcgY3JlYXRlZCBhcmNoaXZlXHJcbiAgc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0oYXJjaGl2ZURPTSkge1xyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4geyB0aGlzLmFyY2hpdmVEcm9wcGVkSGFuZGxlcihlLCBhcmNoaXZlRE9NKSB9KVxyXG4gIH0sXHJcbiAgc2V0VXBVbmNsYXNzaWZpZWREcmFnQW5kRHJvcFN5c3RlbSh1bmNsYXNzaWZpZWRET00pIHtcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gIH0sXHJcbiAgcHJldmVudERlZmF1bHRIYW5kbGVyKGUpIHtcclxuICAgIC8vIGRlZmF1bHQ6IHRhZyBjYW5ub3QgYmUgZHJhZ2dlZFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gdGhlbiBvdXIgRE9NIGNhbiBiZSBkcmFnZ2VkIGluc2lkZVxyXG4gIH0sXHJcbiAgYXJjaGl2ZURyb3BwZWRIYW5kbGVyKGUsIGFyY2hpdmVET00pIHtcclxuICAgIHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpXHJcblxyXG4gICAgY29uc3QgdGFiRE9NSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnN0IHRhYkRPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RhYkRPTUlkfWApXHJcbiAgICBjb25zb2xlLmxvZygndGFiRE9NSWQ6ICcgKyB0YWJET01JZClcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gYXJjaGl2ZURPTS5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCBpc1RhYnNMaXN0RW1wdHkgPSB0aGlzLnRhYnNMaXN0Q2hlY2sodGFic0xpc3QpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnaXNUYWJzTGlzdEVtcHR5OiAnICsgaXNUYWJzTGlzdEVtcHR5KVxyXG4gICAgaWYgKGlzVGFic0xpc3RFbXB0eSkge1xyXG4gICAgICAvLyByZW1vdmUgXCJOTyB0YWIgaGVyZSB5ZXRcIiBcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgbmV3IHRhYkRPTSBpbnRvIHRhYnNMaXN0XHJcbiAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZCh0YWJET00pXHJcblxyXG4gICAgLy8gY3JlYXRlIHRhYkRhdGEgZm9yIHN0b3JhZ2VcclxuICAgIGNvbnN0IHRhYkRhdGEgPSBtb2RlbC5nZXRUYWJEYXRhVmlhVGFiRE9NKHRhYkRPTSlcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gYXJjaGl2ZURPTS5kYXRhc2V0LmFyY2hpdmVJZFxyXG5cclxuICAgIC8vIGRlbGV0ZSBvcmlnaW5hbCB0YWJcclxuICAgIGNvbnN0IHRhYklkID0gdGFiRE9NSWQuc3BsaXQoJy0nKVsxXVxyXG4gICAgbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZSA9IG1vZGVsLnNlYXJjaEFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG4gICAgdGFyZ2V0QXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWJEYXRhKVxyXG5cclxuICAgIC8vIGNhbGwgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIHVuY2xhc3NpZmllZERyb3BwZWRIYW5kbGVyKGUsIHVuY2xhc3NpZmllZCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YWJET01JZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc29sZS5sb2coJ3RhYkRPTUlkOiAnICsgdGFiRE9NSWQpXHJcbiAgICBjb25zdCB0YWJET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0YWJET01JZH1gKVxyXG4gICAgY29uc3QgdGFic0xpc3QgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcblxyXG4gICAgY29uc3QgaXNUYWJzTGlzdEVtcHR5ID0gdGhpcy50YWJzTGlzdENoZWNrKHRhYnNMaXN0KVxyXG4gICAgY29uc29sZS5sb2coJ2lzVGFic0xpc3RFbXB0eTogJyArIGlzVGFic0xpc3RFbXB0eSlcclxuXHJcbiAgICBpZiAoaXNUYWJzTGlzdEVtcHR5KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBcIk5PIHRhYiBoZXJlIHlldFwiIFxyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCBuZXcgdGFiRE9NIGludG8gdGFic0xpc3RcclxuICAgIC8vIGFsdGVybmF0aXZlIC5pbnNlcnRCZWZvcmUoKTpcclxuICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuXHJcbiAgICBjb25zdCB0YWJEYXRhID0gbW9kZWwuZ2V0VGFiRGF0YVZpYVRhYkRPTSh0YWJET00pXHJcblxyXG4gICAgLy8gZGVsZXRlIG9yaWdpbmFsIHRhYlxyXG4gICAgY29uc3QgdGFiSWQgPSB0YWJET01JZC5zcGxpdCgnLScpWzFdXHJcbiAgICBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuICAgIC8vIGNvbnNvbGUubG9nKClcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gJzAwMSdcclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmUgPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHRhcmdldEFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiRGF0YSlcclxuXHJcbiAgICAvLyBjYWxsIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gZGV0ZWN0RHJvcExvY2F0aW9uKHRhYkRPTUlkLCBkcmFnZW50ZXIsIGRyYWdsZWF2ZSlcclxuICB9LFxyXG4gIHRhYnNMaXN0Q2hlY2sodGFic0xpc3QpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0YWJzTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuICAgIHJldHVybiAoKGNvbnRlbnQubGVuZ3RoID09PSAxKSAmJiAoY29udGVudFswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zdHlsZXMvbm9ybWFsaXplLnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2FwcGxpY2F0aW9uLnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2luZGV4LnNjc3MnXHJcblxyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmpzJ1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZygnW0luZGV4XSBJbmRleC5odG1sIGxvYWRlZCEgQXNrIGZvciBhcmNoaXZlIGRhdGEhJylcclxuICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgbWVzc2FnZTogJ2dldC1hcmNoaXZlLWRhdGEnLFxyXG4gICAgZGF0YTogbnVsbFxyXG4gIH1cclxuXHJcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnW0luZGV4XSByZWNlaXZlZCBhcmNoaXZlIGRhdGEnLCByZXNwb25zZSlcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSwgbGFzdFRhYklkLCBsYXN0QXJjaGl2ZUlkIH0gPSByZXNwb25zZVxyXG4gICAgZGF0YS5sYXN0VGFiSWQgPSBsYXN0VGFiSWRcclxuICAgIGRhdGEubGFzdEFyY2hpdmVJZCA9IGxhc3RBcmNoaXZlSWRcclxuICAgIGNvbnRyb2xsZXIuaW5pdExvY2FsQXJjaGl2ZURhdGEoYXJjaGl2ZSlcclxuXHJcbiAgICAvLyBzZXR1cCBkcm9wIGl0ZW0gJiBkcm9wIHpvbmVcclxuICAgIGNvbnRyb2xsZXIuc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGNsaWNrIGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICAvLyBjYW5jZWwgc2hvdyBpbnB1dFxyXG4gIC8vIGNvbnRyb2xsZXIuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgLy8gZ2V0IGFsbCBvcGVuZWQgdGFic1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWFsbC1idG4nKSB7XHJcbiAgICBjb250cm9sbGVyLmdldEFsbE9wZW5lZFRhYnMoKVxyXG4gIH1cclxuXHJcbiAgLy8gb2VwbiBhbGwgdGFicyBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4tYWxsJykpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb24tc2VhcmNoJykpIHtcclxuICAgICAgY29udHJvbGxlci5vcGVuQWxsU2VhcmNoVGFicygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29udHJvbGxlci5vcGVuQWxsVGFicyhhcmNoaXZlSWQpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIC8vIG9wZW4gY2V0YWluIHRhYiBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLXRhYicpIHtcclxuICAgIGNvbnN0IHVybCA9IHRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IG5ldyBhcmNoaXZlIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5zaG93TmV3QXJjaGl2ZUlucHV0KClcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBuZXcgYXJjaGl2ZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIG5ldyBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1hcmNoaXZlLW5hbWUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jcmVhdGVOZXdBcmNoaXZlKClcclxuICB9XHJcblxyXG4gIC8vIHNob3cgZWRpdCB0YWIgbmFtZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LWVkaXQtdGFiLW5hbWUnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5zaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyBjYW5jZWwgZWRpdCB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtZWRpdC10YWItaW5wdXQnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gdXBkYXRlIHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tdGFiLWVkaXQnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIHNob3cgZWRpdCBhcmNoaXZlIG5hbWUgaW4gY29udGVudFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpKSB7XHJcbiAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBlZGl0IGFyY2hpdmUgbmFtZSBpbiBjb250ZW50XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpKSB7XHJcbiAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gdXBkYXRlIGFyY2hpdmUgbmFtZSBpbiBjb250ZW50XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tYXJjaGl2ZS10aXRsZS1jb250ZW50LWlucHV0JykpIHtcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIudXBkYXRlQXJjaGl2ZVRpdGxlQ29udGVudCh0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBvbmUgY2VydGFpbiB0YWIgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLXRhYicpIHtcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0LmRhdGFzZXQudGFiaWRcclxuICAgIGNvbnN0IHRhYkJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlVGFiKHRhYkJhciwgdGFiSWQpXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgY2VydGFpbiBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtYXJjaGl2ZScpKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb25zb2xlLmxvZyhhcmNoaXZlQmFyKVxyXG4gICAgLy8gcmV0dXJuXHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29udHJvbGxlci5kZWxldGVBcmNoaXZlKGFyY2hpdmVCYXIsIHRhcmdldEFyY2hpdmVJZClcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBhbGwgdW5jbGFzc2lmaWVkIHRhYnMgaW4gY2VydGFpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtYWxsLWluLWFyY2hpdmUnKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29uc29sZS5sb2coJ2FyY2hpdmVJZDogJyArIGFyY2hpdmVJZClcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlQWxsVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBjYWNuZWwgdGFicyBzZWFyY2hcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLXNlYXJjaCcpKSB7XHJcbiAgICBjb25zdCBzZWFyY2hCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgc2VhcmNoQmFyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPSAnJ1xyXG5cclxuICAgIC8vIGNhbmNlbCBzZWFyY2hcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsU2VhcmNoKClcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnYnJhbmQtdGl0bGUnKSB7XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbFNlYXJjaCgpXHJcbiAgfVxyXG5cclxuICAvLy8vLyBmb3IgZGV2ZWxvcGluZyAvLy8vL1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dTdG9yYWdlKCdhcmNoaXZlJylcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnY2xlYXItZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2xlYXJTdG9yYWdlKClcclxuICB9XHJcbn0sIGZhbHNlKVxyXG4vLyBmYWxzZSA9IGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuLy8gdG8gc3RvcCBidWJibGluZzogZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcblxyXG4vLyBLZXlib2FyZEV2ZW50IGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICAvLyBpbnB1dCBuZXcgYXJjaGl2ZSBuYW1lXHJcbiAgaWYgKHRhcmdldC5pZCA9PT0gJ2FyY2hpdmVOYW1lLWlucHV0Jykge1xyXG4gICAgaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICAgIGNvbnRyb2xsZXIuY3JlYXRlTmV3QXJjaGl2ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpbnB1dCB1cGRhdGUgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YWItbmFtZS1pbnB1dCcpKSB7XHJcbiAgICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgICBjb250cm9sbGVyLnVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gdW5wdXQgdXBkYXRlIGFyY2hpdmUgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhcmNoaXZlLXRpdGxlLWlucHV0LWNvbnRlbnQnKSkge1xyXG4gICAgaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgICAgY29udHJvbGxlci51cGRhdGVBcmNoaXZlVGl0bGVDb250ZW50KHRpdGxlRE9NKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaW5wdXQgdGFicyBzZWFyY2ggaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFicy1zZWFyY2gtaW5wdXQnKSkge1xyXG4gICAgLy8gaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICBjb25zdCBxdWVyeUJvZHkgPSB0YXJnZXQudmFsdWVcclxuICAgIGlmICghcXVlcnlCb2R5KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOTyBxdWVyeUJvZHkhJylcclxuICAgICAgY29udHJvbGxlci5jYW5jZWxTZWFyY2goKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnRyb2xsZXIuc2VhcmNoVGFiKHF1ZXJ5Qm9keSlcclxuICAgIC8vIH1cclxuICB9XHJcbn0pXHJcblxyXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xyXG4vLyAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcblxyXG4vLyAgIC8vIFVzZXIgY2xlYXIgc2VhcmNoIVxyXG4vLyAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWJzLXNlYXJjaC1pbnB1dCcpKSB7XHJcbi8vICAgICBpZiAoKGUuY29kZSA9PT0gJ0RlbGV0ZScpIHx8IChlLmNvZGUgPT09ICdCYWNrc3BhY2UnKSkge1xyXG4vLyAgICAgICBjb25zdCBxdWVyeUJvZHkgPSB0YXJnZXQudmFsdWVcclxuLy8gICAgICAgaWYgKCFxdWVyeUJvZHkpIHtcclxuLy8gICAgICAgICBjb250cm9sbGVyLmNhbmNlbFNlYXJjaCgpXHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vIH0pXHJcblxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9