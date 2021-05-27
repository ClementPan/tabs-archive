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
  showTabNameEditInput(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showTabNameEditInput(targetTabDOM)
    return
  },
  cancelEditTabInput(targetTabDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditTabInput(targetTabDOM)
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

/***/ }),

/***/ "./src/options/scripts/data.js":
/*!*************************************!*\
  !*** ./src/options/scripts/data.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data)
/* harmony export */ });
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
  const { id, icon, title, createdAt, url, tags } = tab
  return `
    <div class='number box'>
      <p>${id}</p>
          </div >
    <div class='icon box'>
      <img src="${icon}" alt="">
    </div>
    <div class='title box'>
      <i class="fas fa-times-circle none cancel-edit-tab-input"></i>

      <p>${title}</p>

      <input class='edit-tab-name-input none' placeholder='${title}' type="text" maxlength="45">

      <i class="fas fa-pen-alt show-edit-tab-name"></i>
      <i class="fas fa-check-circle none confirm-tab-edit"></i>

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
      <div class="icon">
        <i class="fas fa-folder"></i>
      </div>
      <p>${archiveName}</p>
      <div class="icon">
        <i class="fas fa-times-circle delete-archive" data-id="${id}"></i>
      </div> 
    `
    newArchive.classList = 'archive archive-style'
    newArchive.dataset.archiveId = id
    return newArchive
  },
  createArchiveDOMInContent(archive) {
    const { archiveName, archivesList, unclassified, id } = archive

    let unclassifiedDOMS = ''

    if (unclassified.length) {
      unclassifiedDOMS = unclassified.map(each => {
        return `
          <div class='tab tab-style' data-id="${each.id}">
            ${tabInnerTemplate(each)}
          </div>
        `
      }).join('')
    } else {
      unclassifiedDOMS = `
      <div class='tab empty tab-style'>
        <p class='empty-tab'>No tab here yet!</p>
      </div>
      `
    }

    const newArchive = document.createElement('div')
    newArchive.innerHTML = `
      <div class='archiveName'>
        <input id="archive${id}-dropdown" type="checkbox">
        <label for="archive${id}-dropdown">
          <h3 unselectable="on">${archiveName}</h3>
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

    newArchive.classList = `archive archive-style archive-${id}-content`
    newArchive.dataset.archiveId = id
    return newArchive
  },
  createTabDOMInContent(tabData) {
    const tab = document.createElement('div')
    tab.innerHTML = tabInnerTemplate(tabData)
    tab.classList += 'tab tab-style'
    tab.dataset.id = tabData.id
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
              (tab.url.split('://')[0] === 'chrome-extension')) {
              console.log('continue on ' + tab.title)
              continue
            }
            // clear
            chrome.tabs.remove(tab.id)

            // form tabData
            const title = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.trimString(_utils__WEBPACK_IMPORTED_MODULE_0__.utils.escapeHtml(tab.title), 45)

            const { favIconUrl: icon, url } = tab
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
    let targetArchive = {}

    const findArchive = (archive) => {
      if (targetId === archive.id) {
        archive.unclassified = []
        return targetArchive = archive
      }

      if (!archive.archivesList.length) {
        return
      } else {
        for (let subArchive of archive.archivesList) {
          if (targetId === subArchive.id) {
            subArchive.unclassified = []
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
  searchTabById: function (archive, tabId) {
  }
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


const view = {
  showTabsInContent(data) {
    // data: root.unclassified
    const tabsList = document.querySelector('.tabs-list')
    tabsList.innerHTML = ''

    if (!data.length) {
      tabsList.innerHTML = `
      <div class='tab empty tab-style'>
        <p class='empty-tab'>No tab here yet!</p>
      </div>
      `
    }

    for (let tab of data) {
      const newTab = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.createTabDOMInContent(tab)
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
    content.appendChild(newArchiveDOM)
    return
  },
  removeTab(tabBar) {
    tabBar.remove()
  },
  removeArchive(archiveBar, archiveId) {
    // remove archive from sidebar
    archiveBar.remove()

    // remove archive in content
    const archiveBarInContent = document.querySelector(`.archive-${archiveId}-content`)
    archiveBarInContent.remove()

  },
  // not done
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
  });
}

// eventListener
window.addEventListener('click', (e) => {
  const target = e.target

  // cancel show input
  _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelNewArchiveInput()

  // get all opened tabs
  if (target.className === 'get-all-btn') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.getAllOpenedTabs()
  }

  // oepn all tabs in archive
  if (target.className === 'open-all') {
    const archiveId = target.dataset.id
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.openAllTabs(archiveId)
  }

  // open cetain tab in archive
  if (target.className === 'open-tab') {
    const url = target.dataset.url
    chrome.tabs.create({ url, active: false })
  }

  // open new archive input
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

  // delete one certain tab in archive
  if (target.className === 'delete-tab') {
    const tabId = target.dataset.tabid
    const tabBar = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteTab(tabBar, tabId)
  }

  // delete certain archive from sidebar
  if (target.classList.contains('delete-archive')) {
    const archiveBar = target.parentElement.parentElement
    const targetArchiveId = target.dataset.id
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteArchive(archiveBar, targetArchiveId)
  }

  // delete all unclassified tabs in certain archive
  if (target.className === 'delete-all-in-archive') {
    const archiveId = target.dataset.id
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteAllTabsInArchive(archiveId)
  }

  // edit tab name
  if (target.classList.contains('show-edit-tab-name')) {
    const targetTabDOM = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showTabNameEditInput(targetTabDOM)
  }

  // cancel edit tab name
  if (target.classList.contains('cancel-edit-tab-input')) {
    const targetTabDOM = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelEditTabInput(targetTabDOM)
  }

  // for developing
  if (target.className === 'get-data') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showStorage('archive')
  }

  if (target.className === 'clear-data') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.clearStorage()
  }
}, false)
// false = event.preventDefault()
// to stop bubbling: event.stopPropagation()


// KeyboardEvent
window.addEventListener('keydown', (e) => {
  const target = e.target

  if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
    if (target.id !== 'archiveName-input') return
    console.log("Input!")
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.createNewArchive()
  }
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0M7QUFDRjtBQUNBOztBQUV6QjtBQUNQO0FB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QUc7QUFDSDtBQUNBO0FBQ0EsV0FBVyxVQUFVLEdBQUcsMENBQUk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7OztBQ2pWTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiwwQkFBMEI7QUFDMUIsMEJBQTBCO0FBQzFCLDRCQUE0QjtBQUM1Qiw0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QUNqQzs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxrRUFBc0I7QUFDMUI7O0FBRUE7QUFDQSxJQUFJLG1FQUF1QjtBQUMzQjtBQUNBLENBQUM7QUFDRDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1RUFBMkI7QUFDL0I7QUFDQSxDQUFDLEMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldy5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBvcGVuQWxsVGFicyhhcmNoaXZlSWQpIHtcclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHVuY2xhc3NpZmllZC5mb3JFYWNoKGVhY2ggPT4ge1xyXG4gICAgICBjb25zdCB1cmwgPSBlYWNoLnVybFxyXG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZGVsZXRlVGFiKHRhcmdldCwgdGFiSWQpIHtcclxuICAgIC8vIHRhcmdldDogRE9NIGVsZW1udFxyXG5cclxuICAgIC8vIHJldHVybiBuZXdBcmNoaXZlIHdpdGggdGFyZ2V0IHRhYlxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLnJlbW92ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5yZW1vdmVUYWIodGFyZ2V0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIGRlbGV0ZUFsbFRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyBjaGVjazogaWYgaXMgYWxyZWFkeSBlbXB0eVxyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gYC5hcmNoaXZlLSR7YXJjaGl2ZUlkfS1jb250ZW50IC50YWJzLWxpc3QgLnRhYmBcclxuICAgIGNvbnN0IHRhYkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpXHJcbiAgICBpZiAoKHRhYkl0ZW1zLmxlbmd0aCA9PT0gMSkgJiYgKHRhYkl0ZW1zWzBdLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVtb3ZlIHRhYlxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLmNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcblxyXG4gICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZSA9IG5ld0FyY2hpdmVcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LmNsZWFyVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgZGVsZXRlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpIHtcclxuICAgIC8vIHJldHVybiBuZXdBcmNoaXZlIHdpdGggdGFyZ2V0IGFyY2hpdmVcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5yZW1vdmVBcmNoaXZlKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlldywgYm90aCBpbiBzaWRlYmFyICYgY29udGVudCAobmVlZCBhcmNoaXZlSWQpXHJcbiAgICB2aWV3LnJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIHNob3dOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICB2aWV3LnNob3dOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZSgpIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCBhcmNoaXZlTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlXHJcblxyXG4gICAgLy8gbm8gZW1wdHkgaW5wdXQgYWxsb3dlZFxyXG4gICAgaWYgKCFhcmNoaXZlTmFtZSkge1xyXG4gICAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdObyBlbXB0eSBpbnB1dCBhbGxvd2VkIScpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0IGFyY2hpdmUgZGF0YSwgYWRkIG5ldyBhcmNoaXZlIGluIGRhdGFcclxuICAgIC8vIG5ld0FyY2hpdmU6IGRhdGFcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jcmVhdGVOZXdBcmNoaXZlSW5EYXRhKGFyY2hpdmVOYW1lKVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcuY3JlYXRlTmV3QXJjaGl2ZUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG4gICAgdmlldy5jcmVhdGVOZXdBcmNoaXZlSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIHJlc3RvcmUgVUlcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICB9LFxyXG4gIHNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5zaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICB9LFxyXG5cclxuICAvLyAgZGV2ZWxvcGluZyBtZXRob2RzXHJcbiAgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlIGNsZWFyZWQhJylcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93U3RvcmFnZSgpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJleHBvcnQgY29uc3QgZGF0YSA9IHtcclxuICBhcmNoaXZlOiB7fSxcclxuICBsYXN0VGFiSWQ6ICcnLFxyXG4gIGxhc3RBcmNoaXZlSWQ6ICcnXHJcbn0iLCJpbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbi8vICAgYXJjaGl2ZToge30sXHJcbi8vICAgbGFzdFRhYklkOiAnJyxcclxuLy8gICBsYXN0QXJjaGl2ZUlkOiAnJ1xyXG5cclxuLy8gQXJjaGl2ZSBwcm90b1xyXG5jb25zdCBBcmNoaXZlRGF0YSA9IGZ1bmN0aW9uIChhcmNoaXZlTmFtZSwgaWQpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJJbm5lclRlbXBsYXRlID0gZnVuY3Rpb24gKHRhYikge1xyXG4gIGNvbnN0IHsgaWQsIGljb24sIHRpdGxlLCBjcmVhdGVkQXQsIHVybCwgdGFncyB9ID0gdGFiXHJcbiAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9J251bWJlciBib3gnPlxyXG4gICAgICA8cD4ke2lkfTwvcD5cclxuICAgICAgICAgIDwvZGl2ID5cclxuICAgIDxkaXYgY2xhc3M9J2ljb24gYm94Jz5cclxuICAgICAgPGltZyBzcmM9XCIke2ljb259XCIgYWx0PVwiXCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J3RpdGxlIGJveCc+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBub25lIGNhbmNlbC1lZGl0LXRhYi1pbnB1dFwiPjwvaT5cclxuXHJcbiAgICAgIDxwPiR7dGl0bGV9PC9wPlxyXG5cclxuICAgICAgPGlucHV0IGNsYXNzPSdlZGl0LXRhYi1uYW1lLWlucHV0IG5vbmUnIHBsYWNlaG9sZGVyPScke3RpdGxlfScgdHlwZT1cInRleHRcIiBtYXhsZW5ndGg9XCI0NVwiPlxyXG5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuLWFsdCBzaG93LWVkaXQtdGFiLW5hbWVcIj48L2k+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZSBub25lIGNvbmZpcm0tdGFiLWVkaXRcIj48L2k+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSd0YWdzIGJveCc+XHJcbiAgICAgIDxwPiR7dGFnc308L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2NyZWF0ZWRBdCBib3gnPlxyXG4gICAgICA8cD4ke2NyZWF0ZWRBdH08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdvcGVuLXRhYicgZGF0YS11cmw9XCIke3VybH1cIj5cclxuICAgICAgICBvcGVuXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdidG4gYm94Jz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLXRhYicgZGF0YS10YWJpZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgZGVsZXRlXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbW9kZWwgPSB7XHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluRGF0YShhcmNoaXZlTmFtZSkge1xyXG4gICAgY29uc3QgbmV3SWQgPSBkYXRhLmxhc3RBcmNoaXZlSWQgKz0gMVxyXG4gICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcignYXJjaGl2ZScsIG5ld0lkKVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmVEYXRhID0gbmV3IEFyY2hpdmVEYXRhKGFyY2hpdmVOYW1lLCBpZClcclxuXHJcbiAgICAvLyBwdXNoIG5ld0FyY2hpdmVEYXRhIHRvIGRhdGEuYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlLmFyY2hpdmVzTGlzdC5wdXNoKG5ld0FyY2hpdmVEYXRhKVxyXG5cclxuICAgIHJldHVybiBuZXdBcmNoaXZlRGF0YVxyXG4gIH0sXHJcbiAgY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGlkIH0gPSBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZvbGRlclwiPjwvaT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxwPiR7YXJjaGl2ZU5hbWV9PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBkZWxldGUtYXJjaGl2ZVwiIGRhdGEtaWQ9XCIke2lkfVwiPjwvaT5cclxuICAgICAgPC9kaXY+IFxyXG4gICAgYFxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSAnYXJjaGl2ZSBhcmNoaXZlLXN0eWxlJ1xyXG4gICAgbmV3QXJjaGl2ZS5kYXRhc2V0LmFyY2hpdmVJZCA9IGlkXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChhcmNoaXZlKSB7XHJcbiAgICBjb25zdCB7IGFyY2hpdmVOYW1lLCBhcmNoaXZlc0xpc3QsIHVuY2xhc3NpZmllZCwgaWQgfSA9IGFyY2hpdmVcclxuXHJcbiAgICBsZXQgdW5jbGFzc2lmaWVkRE9NUyA9ICcnXHJcblxyXG4gICAgaWYgKHVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgdW5jbGFzc2lmaWVkRE9NUyA9IHVuY2xhc3NpZmllZC5tYXAoZWFjaCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9J3RhYiB0YWItc3R5bGUnIGRhdGEtaWQ9XCIke2VhY2guaWR9XCI+XHJcbiAgICAgICAgICAgICR7dGFiSW5uZXJUZW1wbGF0ZShlYWNoKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgICAgfSkuam9pbignJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0nYXJjaGl2ZU5hbWUnPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJhcmNoaXZlJHtpZH0tZHJvcGRvd25cIj5cclxuICAgICAgICAgIDxoMyB1bnNlbGVjdGFibGU9XCJvblwiPiR7YXJjaGl2ZU5hbWV9PC9oMz5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5zXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwib3Blbi1hbGxcIiBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgICAgIE9wZW4gQWxsXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLWFsbC1pbi1hcmNoaXZlJyBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgICAgIERlbGV0ZSBBbGxcclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWNvbnRlbnRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlc0xpc3RcIj5cclxuICAgICAgICAgICAgPHA+JHthcmNoaXZlc0xpc3R9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFicy1saXN0XCI+XHJcbiAgICAgICAgICAgICR7dW5jbGFzc2lmaWVkRE9NU31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGBcclxuXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9IGBhcmNoaXZlIGFyY2hpdmUtc3R5bGUgYXJjaGl2ZS0ke2lkfS1jb250ZW50YFxyXG4gICAgbmV3QXJjaGl2ZS5kYXRhc2V0LmFyY2hpdmVJZCA9IGlkXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYkRhdGEpIHtcclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB0YWIuaW5uZXJIVE1MID0gdGFiSW5uZXJUZW1wbGF0ZSh0YWJEYXRhKVxyXG4gICAgdGFiLmNsYXNzTGlzdCArPSAndGFiIHRhYi1zdHlsZSdcclxuICAgIHRhYi5kYXRhc2V0LmlkID0gdGFiRGF0YS5pZFxyXG4gICAgcmV0dXJuIHRhYlxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0U3RvcmFnZURhdGEodGFyZ2V0RGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbdGFyZ2V0RGF0YV0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlamVjdCEnKVxyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiBmYWxzZSB9LCAocXVlcnlSZXN1bHQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRhYnMgPSBbXVxyXG4gICAgICAgICAgZm9yIChsZXQgdGFiIG9mIHF1ZXJ5UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAodGFiLnRpdGxlID09PSBcImNocm9tZS50YWJzIC0gQ2hyb21lIERldmVsb3BlcnNcIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybCA9PT0gXCJjaHJvbWU6Ly9leHRlbnNpb25zL1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsLnNwbGl0KCc6Ly8nKVswXSA9PT0gJ2Nocm9tZS1leHRlbnNpb24nKSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250aW51ZSBvbiAnICsgdGFiLnRpdGxlKVxyXG4gICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2xlYXJcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYi5pZClcclxuXHJcbiAgICAgICAgICAgIC8vIGZvcm0gdGFiRGF0YVxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHV0aWxzLnRyaW1TdHJpbmcodXRpbHMuZXNjYXBlSHRtbCh0YWIudGl0bGUpLCA0NSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgZmF2SWNvblVybDogaWNvbiwgdXJsIH0gPSB0YWJcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdGFncyA9IFtdXHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgaWRcclxuICAgICAgICAgICAgZGF0YS5sYXN0VGFiSWQrK1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHV0aWxzLmlkRm9ybWF0dGVyKCd0YWInLCBkYXRhLmxhc3RUYWJJZClcclxuXHJcbiAgICAgICAgICAgIHRhYnMucHVzaChuZXcgVGFiRGF0YShpZCwgaWNvbiwgdGl0bGUsIHRhZ3MsIGNyZWF0ZWRBdCwgdXJsLCB1cGRhdGVkQXQpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUodGFicylcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHN0b3JlQXJjaGl2ZSgpIHtcclxuICAgIC8vIHN0b3JlIGRlZmF1bHRBcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSB9ID0gZGF0YVxyXG4gICAgYXJjaGl2ZS5hcmNoaXZlTmFtZSA9ICdyb290LWFyY2hpdmUnXHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICBtZXNzYWdlOiAnc3RvcmUtYXJjaGl2ZScsXHJcbiAgICAgIGRhdGE6IGFyY2hpdmVcclxuICAgIH1cclxuXHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAobWVzc2FnZSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnW0luZGV4XSAnLCBtZXNzYWdlKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZW1vdmVUYWIoYXJjaGl2ZSwgdGFiSWQpIHtcclxuICAgIGNvbnN0IHRhcmdldElkID0gdGFiSWRcclxuXHJcbiAgICBjb25zdCByZW1vdmVUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiBhcmNoaXZlLnVuY2xhc3NpZmllZCkge1xyXG4gICAgICAgICAgaWYgKHRhYi5pZCA9PT0gdGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhcmNoaXZlLnVuY2xhc3NpZmllZC5pbmRleE9mKHRhYilcclxuICAgICAgICAgICAgYXJjaGl2ZS51bmNsYXNzaWZpZWQuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZVRhYkJ5SWQoYXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH0sXHJcbiAgcmVtb3ZlQXJjaGl2ZShhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZUFyY2hpdmVCeUlkID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhcmNoaXZlLmFyY2hpdmVzTGlzdC5pbmRleE9mKHN1YkFyY2hpdmUpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KVxyXG4gICAgICAgICAgICBhcmNoaXZlLmFyY2hpdmVzTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZUFyY2hpdmVCeUlkKHN1YkFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQXJjaGl2ZUJ5SWQoYXJjaGl2ZSlcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICBjbGVhclRhYnNJbkFyY2hpdmVCeUlkKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcbiAgICBsZXQgdGFyZ2V0QXJjaGl2ZSA9IHt9XHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZCA9IFtdXHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBhcmNoaXZlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIHN1YkFyY2hpdmUudW5jbGFzc2lmaWVkID0gW11cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBzdWJBcmNoaXZlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICAgIHJldHVybiB0YXJnZXRBcmNoaXZlXHJcbiAgfSxcclxuICBzZWFyY2hBcmNoaXZlQnlJZChhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG4gICAgbGV0IHRhcmdldEFyY2hpdmUgPSB7fVxyXG5cclxuICAgIGNvbnN0IGZpbmRBcmNoaXZlID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKHRhcmdldElkID09PSBhcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBhcmNoaXZlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gc3ViQXJjaGl2ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlubmVyQXJjaGl2ZSBvZiBzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICAgIGZpbmRBcmNoaXZlKGlubmVyQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBcmNoaXZlKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZVxyXG4gIH0sXHJcbiAgc2VhcmNoVGFiQnlJZDogZnVuY3Rpb24gKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xyXG4gIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICAvLyB0eXBlID0gXCJ0YWJcIiB8fCBcImFyY2hpdmVcIlxyXG4gICAgbGV0IG1vZGUgPSB0eXBlID09PSAndGFiJyA/IDUgOiAzXHJcbiAgICBudW0gPSBudW0gKyAnJ1xyXG4gICAgbGV0IG91dHB1dCA9IG51bS5zcGxpdCgnJylcclxuICAgIGlmIChudW0ubGVuZ3RoIDwgbW9kZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGUgLSBudW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBvdXRwdXQudW5zaGlmdCgnMCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQuam9pbignJylcclxuICB9LFxyXG4gIGVzY2FwZUh0bWw6IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmdcclxuICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxuICB9LFxyXG4gIHRyaW1TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcsIG1leGxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoMCwgbWV4bGVuZ3RoKVxyXG4gIH1cclxufSIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuXHJcbmV4cG9ydCBjb25zdCB2aWV3ID0ge1xyXG4gIHNob3dUYWJzSW5Db250ZW50KGRhdGEpIHtcclxuICAgIC8vIGRhdGE6IHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG4gICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIHRhYnNMaXN0LmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0ndGFiIGVtcHR5IHRhYi1zdHlsZSc+XHJcbiAgICAgICAgPHAgY2xhc3M9J2VtcHR5LXRhYic+Tm8gdGFiIGhlcmUgeWV0ITwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB0YWIgb2YgZGF0YSkge1xyXG4gICAgICBjb25zdCBuZXdUYWIgPSBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKVxyXG4gICAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZChuZXdUYWIpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93Um9vdEFyY2hpdmVMaXN0KGxpc3QpIHtcclxuICAgIC8vIGxpc3Q6IHJvb3QuYXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5cclxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBuZXdTaWRlYmFyQXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihpdGVtKVxyXG4gICAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld1NpZGViYXJBcmNoaXZlKVxyXG5cclxuICAgICAgY29uc3QgbmV3Q29udGVudEFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGl0ZW0pXHJcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q29udGVudEFyY2hpdmUpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93TmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgLy8gaGlkZSBpbnB1dCBpY29uXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmljb24nKVxyXG4gICAgaWNvbi5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG5cclxuICAgIC8vIGhpZGUgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcCcpXHJcbiAgICBpZiAoIXAuY2xhc3NOYW1lLmluY2x1ZGVzKCdub25lJykpIHtcclxuICAgICAgcC5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3cgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcblxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gaGlkZSAudGl0bGUgcFxyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHBhc3MgdGl0bGUgdG8gaW5wdXQgdmFsdWVcclxuICAgIGlucHV0LnZhbHVlID0gdGl0bGVQLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dFxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwgTmV3IEFyY2hpdmUgSW5wdXQnKVxyXG5cclxuICAgIC8vcmVzdG9yZSBcclxuICAgIC8vIGhpZGUgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG4gICAgY29uZmlybUljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuXHJcbiAgICAvLyBzaG93IGlucHV0IGljb25cclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuaWNvbicpXHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIHNob3cgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcC5zaG93LW5ldy1hcmNoaXZlLWlucHV0JylcclxuICAgIHAuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gY2xlYXIgaW5wdXQgdmFsdWVcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlID0gJydcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwtRWRpdC1UYWItSW5wdXQnKVxyXG5cclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gdG8gc2hvd1xyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgLy8gdG8gaGlkZVxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJblNpZGViYXIobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURPTSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG5cclxuICAgIC8vIHB1c2ggbmV3QXJjaGl2ZURPTSBpbnRvIHNpZGViYXJBcmNoaXZlc0xpc3RcclxuICAgIGNvbnN0IHNpZGViYXJBcmNoaXZlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuYXJjaGl2ZXNMaXN0JylcclxuICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3QXJjaGl2ZURPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJbkNvbnRlbnQobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgIGNvbnN0IG5ld0FyY2hpdmVET00gPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0FyY2hpdmVET00pXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIHJlbW92ZVRhYih0YWJCYXIpIHtcclxuICAgIHRhYkJhci5yZW1vdmUoKVxyXG4gIH0sXHJcbiAgcmVtb3ZlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpIHtcclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gICAgYXJjaGl2ZUJhci5yZW1vdmUoKVxyXG5cclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGluIGNvbnRlbnRcclxuICAgIGNvbnN0IGFyY2hpdmVCYXJJbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudGApXHJcbiAgICBhcmNoaXZlQmFySW5Db250ZW50LnJlbW92ZSgpXHJcblxyXG4gIH0sXHJcbiAgLy8gbm90IGRvbmVcclxuICBjbGVhclRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zb2xlLmxvZygnYXJjaGl2ZUlkOiAnLCBhcmNoaXZlSWQpXHJcbiAgICAvLyByZXR1cm5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRMaXN0ID0gJydcclxuXHJcbiAgICBpZiAoYXJjaGl2ZUlkID09PSAnMDAxJykge1xyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCAudGFicy1saXN0JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0YFxyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgdW5jbGFzc2lmaWVkTGlzdC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3N0eWxlcy9ub3JtYWxpemUuc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwbGljYXRpb24uc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvaW5kZXguc2NzcydcclxuXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbmltcG9ydCB7IGNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuanMnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdbSW5kZXhdIEluZGV4Lmh0bWwgbG9hZGVkISBBc2sgZm9yIGFyY2hpdmUgZGF0YSEnKVxyXG4gIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICBtZXNzYWdlOiAnZ2V0LWFyY2hpdmUtZGF0YScsXHJcbiAgICBkYXRhOiBudWxsXHJcbiAgfVxyXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChyZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1tJbmRleF0gcmVjZWl2ZWQgYXJjaGl2ZSBkYXRhJywgcmVzcG9uc2UpXHJcbiAgICBjb25zdCB7IGFyY2hpdmUsIGxhc3RUYWJJZCwgbGFzdEFyY2hpdmVJZCB9ID0gcmVzcG9uc2VcclxuICAgIGRhdGEubGFzdFRhYklkID0gbGFzdFRhYklkXHJcbiAgICBkYXRhLmxhc3RBcmNoaXZlSWQgPSBsYXN0QXJjaGl2ZUlkXHJcbiAgICBjb250cm9sbGVyLmluaXRMb2NhbEFyY2hpdmVEYXRhKGFyY2hpdmUpXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICAvLyBjYW5jZWwgc2hvdyBpbnB1dFxyXG4gIGNvbnRyb2xsZXIuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgLy8gZ2V0IGFsbCBvcGVuZWQgdGFic1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWFsbC1idG4nKSB7XHJcbiAgICBjb250cm9sbGVyLmdldEFsbE9wZW5lZFRhYnMoKVxyXG4gIH1cclxuXHJcbiAgLy8gb2VwbiBhbGwgdGFicyBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLWFsbCcpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb250cm9sbGVyLm9wZW5BbGxUYWJzKGFyY2hpdmVJZClcclxuICB9XHJcblxyXG4gIC8vIG9wZW4gY2V0YWluIHRhYiBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLXRhYicpIHtcclxuICAgIGNvbnN0IHVybCA9IHRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgfVxyXG5cclxuICAvLyBvcGVuIG5ldyBhcmNoaXZlIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5zaG93TmV3QXJjaGl2ZUlucHV0KClcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBuZXcgYXJjaGl2ZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIG5ldyBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1hcmNoaXZlLW5hbWUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jcmVhdGVOZXdBcmNoaXZlKClcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBvbmUgY2VydGFpbiB0YWIgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLXRhYicpIHtcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0LmRhdGFzZXQudGFiaWRcclxuICAgIGNvbnN0IHRhYkJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlVGFiKHRhYkJhciwgdGFiSWQpXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgY2VydGFpbiBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtYXJjaGl2ZScpKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlQXJjaGl2ZShhcmNoaXZlQmFyLCB0YXJnZXRBcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgYWxsIHVuY2xhc3NpZmllZCB0YWJzIGluIGNlcnRhaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLWFsbC1pbi1hcmNoaXZlJykge1xyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlQWxsVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBlZGl0IHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctZWRpdC10YWItbmFtZScpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBlZGl0IHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1lZGl0LXRhYi1pbnB1dCcpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyBmb3IgZGV2ZWxvcGluZ1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dTdG9yYWdlKCdhcmNoaXZlJylcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnY2xlYXItZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2xlYXJTdG9yYWdlKClcclxuICB9XHJcbn0sIGZhbHNlKVxyXG4vLyBmYWxzZSA9IGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuLy8gdG8gc3RvcCBidWJibGluZzogZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcblxyXG4vLyBLZXlib2FyZEV2ZW50XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgIGlmICh0YXJnZXQuaWQgIT09ICdhcmNoaXZlTmFtZS1pbnB1dCcpIHJldHVyblxyXG4gICAgY29uc29sZS5sb2coXCJJbnB1dCFcIilcclxuICAgIGNvbnRyb2xsZXIuY3JlYXRlTmV3QXJjaGl2ZSgpXHJcbiAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=