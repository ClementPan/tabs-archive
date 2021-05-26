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
  deleteTab(target, archive, tabId) {
    // remove tab from data.archive
    _data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.removeTab(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, tabId)

    // rerender view
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.removeTab(target)

    // store archive to storage
    _model_js__WEBPACK_IMPORTED_MODULE_0__.model.storeArchive()
  },
  openAllTabs(archiveId) {
    const { unclassified } = _model_js__WEBPACK_IMPORTED_MODULE_0__.model.searchArchiveById(_data_js__WEBPACK_IMPORTED_MODULE_2__.data.archive, archiveId)
    unclassified.forEach(each => {
      const url = each.url
      chrome.tabs.create({ url, active: false })
    });
  },
  deleteAllTabs(archiveId) {
    // model.searchArchiveById()

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



// Archive proto
const ArchiveData = function (archiveName) {
  this.archiveName = archiveName || 'New Archive'
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

const tabTemplate = function (tab) {
  const { id, icon, title, createdAt, url, tags } = tab
  return `
    <div class='number box'>
      <p>${id}</p>
          </div >
    <div class='icon box'>
      <img src="${icon}" alt="">
          </div>
      <div class='title box'>
        <p>${title}</p>
      </div>
      <div class='tags box'>
        <p>${tags}</p>
      </div>
      <div class='createdAt box'>
        <p>${createdAt}</p>
      </div>
      <div class='btn box'>
        <button class='open-tab' data-url="${url}">
          Open
            </button>
      </div>
      <div class='btn box'>
        <button class='delete-tab' data-tabid="${id}">
          Delete
        </button>
      </div>
  `
}

const model = {
  createArhiveDOMInSidebar(archive) {
    const { archiveName, id } = archive
    const newArchive = document.createElement('div')
    newArchive.innerHTML = `
      <i class="fas fa-caret-right closed"></i>
      <p>${archiveName}</p>
      <i class="fas fa-plus new"></i>
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
      <div class='tab tab-style'>
        ${tabTemplate(each)}
      </div>
      `
      }).join('')
    } else {
      unclassifiedDOMS = `
      <div class='tab tab-style'>
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

    newArchive.classList = 'archive archive-style'
    newArchive.dataset.archiveId = id
    return newArchive
  },
  createTabDOMInContent(tabData) {
    const tab = document.createElement('div')
    tab.innerHTML = tabTemplate(tabData)
    tab.classList += 'tab tab-style'
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
  removeTab(tabBar) {
    tabBar.classList += ' none'
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
  // console.log(target)

  if (target.className === 'get-all-btn') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.getAllOpenedTabs()
  }

  if (target.className === 'open-all') {
    // console.log(target.parentElement.parentElement)
    const archiveId = target.dataset.id
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.openAllTabs(archiveId)
  }

  if (target.className === 'open-tab') {
    const url = target.dataset.url
    chrome.tabs.create({ url, active: false })
  }

  if (target.className === 'delete-tab') {
    const tabId = target.dataset.tabid
    const tabBar = target.parentElement.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteTab(tabBar, _data_js__WEBPACK_IMPORTED_MODULE_3__.data.archive, tabId)
  }

  if (target.className === 'delete-all') {
    const archiveId = target.dataset.id
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteAllTabs(archiveId)
  }

  if (target.className === 'get-data') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showStorage('archive')
  }

  if (target.className === 'clear-data') {
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.clearStorage()
  }
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2Nzcz84NmRmIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3N0eWxlcy9pbmRleC5zY3NzP2I0NjQiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc3R5bGVzL25vcm1hbGl6ZS5zY3NzPzMzZDciLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0M7QUFDRjtBQUNB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QTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ0U7QUFDTjs7QUFFRztBQUNZOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQ0FBb0M7QUFDL0MsSUFBSSxvREFBYztBQUNsQixJQUFJLHdEQUFrQjtBQUN0QixJQUFJLDJFQUErQjtBQUNuQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHVFQUEyQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtFQUFzQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdFQUFvQixTQUFTLGtEQUFZO0FBQzdDOztBQUVBO0FBQ0E7QUFDQSxJQUFJLG9FQUF3QjtBQUM1Qjs7QUFFQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7QUFDQSxDQUFDLEMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldy5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBkZWxldGVUYWIodGFyZ2V0LCBhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgLy8gcmVtb3ZlIHRhYiBmcm9tIGRhdGEuYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5yZW1vdmVUYWIodGFyZ2V0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIG9wZW5BbGxUYWJzKGFyY2hpdmVJZCkge1xyXG4gICAgY29uc3QgeyB1bmNsYXNzaWZpZWQgfSA9IG1vZGVsLnNlYXJjaEFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG4gICAgdW5jbGFzc2lmaWVkLmZvckVhY2goZWFjaCA9PiB7XHJcbiAgICAgIGNvbnN0IHVybCA9IGVhY2gudXJsXHJcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBkZWxldGVBbGxUYWJzKGFyY2hpdmVJZCkge1xyXG4gICAgLy8gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoKVxyXG5cclxuICB9LFxyXG4gIC8vICBkZXZlbG9waW5nIG1ldGhvZHNcclxuICBjbGVhclN0b3JhZ2UoKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmNsZWFyKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1N0b3JhZ2UgY2xlYXJlZCEnKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNob3dTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydhcmNoaXZlJ10sIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImV4cG9ydCBjb25zdCBkYXRhID0ge1xyXG4gIGFyY2hpdmU6IHt9LFxyXG4gIGxhc3RUYWJJZDogJycsXHJcbiAgbGFzdEFyY2hpdmVJZDogJydcclxufSIsImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbi8vIEFyY2hpdmUgcHJvdG9cclxuY29uc3QgQXJjaGl2ZURhdGEgPSBmdW5jdGlvbiAoYXJjaGl2ZU5hbWUpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0YWIpIHtcclxuICBjb25zdCB7IGlkLCBpY29uLCB0aXRsZSwgY3JlYXRlZEF0LCB1cmwsIHRhZ3MgfSA9IHRhYlxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdudW1iZXIgYm94Jz5cclxuICAgICAgPHA+JHtpZH08L3A+XHJcbiAgICAgICAgICA8L2RpdiA+XHJcbiAgICA8ZGl2IGNsYXNzPSdpY29uIGJveCc+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J3RpdGxlIGJveCc+XHJcbiAgICAgICAgPHA+JHt0aXRsZX08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWdzIGJveCc+XHJcbiAgICAgICAgPHA+JHt0YWdzfTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2NyZWF0ZWRBdCBib3gnPlxyXG4gICAgICAgIDxwPiR7Y3JlYXRlZEF0fTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9J29wZW4tdGFiJyBkYXRhLXVybD1cIiR7dXJsfVwiPlxyXG4gICAgICAgICAgT3BlblxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS10YWInIGRhdGEtdGFiaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgRGVsZXRlXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gIGBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGVsID0ge1xyXG4gIGNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihhcmNoaXZlKSB7XHJcbiAgICBjb25zdCB7IGFyY2hpdmVOYW1lLCBpZCB9ID0gYXJjaGl2ZVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2FyZXQtcmlnaHQgY2xvc2VkXCI+PC9pPlxyXG4gICAgICA8cD4ke2FyY2hpdmVOYW1lfTwvcD5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGx1cyBuZXdcIj48L2k+XHJcbiAgICBgXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9ICdhcmNoaXZlIGFyY2hpdmUtc3R5bGUnXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGFyY2hpdmVzTGlzdCwgdW5jbGFzc2lmaWVkLCBpZCB9ID0gYXJjaGl2ZVxyXG5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRET01TID0gJydcclxuXHJcbiAgICBpZiAodW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gdW5jbGFzc2lmaWVkLm1hcChlYWNoID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgdGFiLXN0eWxlJz5cclxuICAgICAgICAke3RhYlRlbXBsYXRlKGVhY2gpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gICAgICB9KS5qb2luKCcnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdW5jbGFzc2lmaWVkRE9NUyA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0ndGFiIHRhYi1zdHlsZSc+XHJcbiAgICAgICAgPHAgY2xhc3M9J2VtcHR5LXRhYic+Tm8gdGFiIGhlcmUgeWV0ITwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIGBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgPGRpdiBjbGFzcz0nYXJjaGl2ZU5hbWUnPlxyXG4gICAgICA8aW5wdXQgaWQ9XCJhcmNoaXZlJHtpZH0tZHJvcGRvd25cIiB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCI+XHJcbiAgICAgICAgICA8aDMgdW5zZWxlY3RhYmxlPVwib25cIj4ke2FyY2hpdmVOYW1lfTwvaDM+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1jb250ZW50XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZXNMaXN0XCI+XHJcbiAgICAgICAgICAgIDxwPiR7YXJjaGl2ZXNMaXN0fTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtbGlzdFwiPlxyXG4gICAgICAgICAgICAke3VuY2xhc3NpZmllZERPTVN9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgXHJcblxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSAnYXJjaGl2ZSBhcmNoaXZlLXN0eWxlJ1xyXG4gICAgbmV3QXJjaGl2ZS5kYXRhc2V0LmFyY2hpdmVJZCA9IGlkXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYkRhdGEpIHtcclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB0YWIuaW5uZXJIVE1MID0gdGFiVGVtcGxhdGUodGFiRGF0YSlcclxuICAgIHRhYi5jbGFzc0xpc3QgKz0gJ3RhYiB0YWItc3R5bGUnXHJcbiAgICByZXR1cm4gdGFiXHJcbiAgfSxcclxuICBhc3luYyBnZXRTdG9yYWdlRGF0YSh0YXJnZXREYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVqZWN0IScpXHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IGZhbHNlIH0sIChxdWVyeVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGFicyA9IFtdXHJcbiAgICAgICAgICBmb3IgKGxldCB0YWIgb2YgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICh0YWIudGl0bGUgPT09IFwiY2hyb21lLnRhYnMgLSBDaHJvbWUgRGV2ZWxvcGVyc1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSBcImNocm9tZTovL2V4dGVuc2lvbnMvXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwuc3BsaXQoJzovLycpWzBdID09PSAnY2hyb21lLWV4dGVuc2lvbicpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRpbnVlIG9uICcgKyB0YWIudGl0bGUpXHJcbiAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiLmlkKVxyXG5cclxuICAgICAgICAgICAgLy8gZm9ybSB0YWJEYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdXRpbHMudHJpbVN0cmluZyh1dGlscy5lc2NhcGVIdG1sKHRhYi50aXRsZSksIDQ1KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgeyBmYXZJY29uVXJsOiBpY29uLCB1cmwgfSA9IHRhYlxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW11cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBpZFxyXG4gICAgICAgICAgICBkYXRhLmxhc3RUYWJJZCsrXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdXRpbHMuaWRGb3JtYXR0ZXIoJ3RhYicsIGRhdGEubGFzdFRhYklkKVxyXG5cclxuICAgICAgICAgICAgdGFicy5wdXNoKG5ldyBUYWJEYXRhKGlkLCBpY29uLCB0aXRsZSwgdGFncywgY3JlYXRlZEF0LCB1cmwsIHVwZGF0ZWRBdCkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0YWJzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc3RvcmVBcmNoaXZlKCkge1xyXG4gICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgY29uc3QgeyBhcmNoaXZlIH0gPSBkYXRhXHJcbiAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gJ3Jvb3QtYXJjaGl2ZSdcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzdG9yZS1hcmNoaXZlJyxcclxuICAgICAgZGF0YTogYXJjaGl2ZVxyXG4gICAgfVxyXG5cclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdICcsIG1lc3NhZ2UpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbW92ZVRhYihhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgY29uc3QgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUudW5jbGFzc2lmaWVkLmluZGV4T2YodGFiKVxyXG4gICAgICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICBzZWFyY2hBcmNoaXZlQnlJZChhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG4gICAgbGV0IHRhcmdldEFyY2hpdmUgPSB7fVxyXG5cclxuICAgIGNvbnN0IGZpbmRBcmNoaXZlID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKHRhcmdldElkID09PSBhcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBhcmNoaXZlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gc3ViQXJjaGl2ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlubmVyQXJjaGl2ZSBvZiBzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICAgIGZpbmRBcmNoaXZlKGlubmVyQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBcmNoaXZlKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZVxyXG4gIH0sXHJcbiAgc2VhcmNoVGFiQnlJZDogZnVuY3Rpb24gKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xyXG4gIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICBsZXQgbW9kZSA9IHR5cGUgPT09ICd0YWInID8gNSA6IDNcclxuICAgIG51bSA9IG51bSArICcnXHJcbiAgICBsZXQgb3V0cHV0ID0gbnVtLnNwbGl0KCcnKVxyXG4gICAgaWYgKG51bS5sZW5ndGggPCBtb2RlKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZSAtIG51bS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG91dHB1dC51bnNoaWZ0KCcwJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxyXG4gIH0sXHJcbiAgZXNjYXBlSHRtbDogZnVuY3Rpb24gKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZ1xyXG4gICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG4gIH0sXHJcbiAgdHJpbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZywgbWV4bGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBtZXhsZW5ndGgpXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHZpZXcgPSB7XHJcbiAgc2hvd1RhYnNJbkNvbnRlbnQoZGF0YSkge1xyXG4gICAgLy8gZGF0YTogcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcbiAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgZm9yIChsZXQgdGFiIG9mIGRhdGEpIHtcclxuICAgICAgY29uc3QgbmV3VGFiID0gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYilcclxuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFiKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd1Jvb3RBcmNoaXZlTGlzdChsaXN0KSB7XHJcbiAgICAvLyBsaXN0OiByb290LmFyY2hpdmVzTGlzdFxyXG4gICAgY29uc3Qgc2lkZWJhckFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHtcclxuICAgICAgY29uc3QgbmV3U2lkZWJhckFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmhpdmVET01JblNpZGViYXIoaXRlbSlcclxuICAgICAgc2lkZWJhckFyY2hpdmVzTGlzdC5hcHBlbmRDaGlsZChuZXdTaWRlYmFyQXJjaGl2ZSlcclxuXHJcbiAgICAgIGNvbnN0IG5ld0NvbnRlbnRBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChpdGVtKVxyXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0NvbnRlbnRBcmNoaXZlKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVtb3ZlVGFiKHRhYkJhcikge1xyXG4gICAgdGFiQmFyLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3N0eWxlcy9ub3JtYWxpemUuc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwbGljYXRpb24uc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvaW5kZXguc2NzcydcclxuXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbmltcG9ydCB7IGNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuanMnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdbSW5kZXhdIEluZGV4Lmh0bWwgbG9hZGVkISBBc2sgZm9yIGFyY2hpdmUgZGF0YSEnKVxyXG4gIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICBtZXNzYWdlOiAnZ2V0LWFyY2hpdmUtZGF0YScsXHJcbiAgICBkYXRhOiBudWxsXHJcbiAgfVxyXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChyZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1tJbmRleF0gcmVjZWl2ZWQgYXJjaGl2ZSBkYXRhJywgcmVzcG9uc2UpXHJcbiAgICBjb25zdCB7IGFyY2hpdmUsIGxhc3RUYWJJZCwgbGFzdEFyY2hpdmVJZCB9ID0gcmVzcG9uc2VcclxuICAgIGRhdGEubGFzdFRhYklkID0gbGFzdFRhYklkXHJcbiAgICBkYXRhLmxhc3RBcmNoaXZlSWQgPSBsYXN0QXJjaGl2ZUlkXHJcbiAgICBjb250cm9sbGVyLmluaXRMb2NhbEFyY2hpdmVEYXRhKGFyY2hpdmUpXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG4gIC8vIGNvbnNvbGUubG9nKHRhcmdldClcclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdnZXQtYWxsLWJ0bicpIHtcclxuICAgIGNvbnRyb2xsZXIuZ2V0QWxsT3BlbmVkVGFicygpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ29wZW4tYWxsJykge1xyXG4gICAgLy8gY29uc29sZS5sb2codGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudClcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb250cm9sbGVyLm9wZW5BbGxUYWJzKGFyY2hpdmVJZClcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi10YWInKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0YXJnZXQuZGF0YXNldC51cmxcclxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtdGFiJykge1xyXG4gICAgY29uc3QgdGFiSWQgPSB0YXJnZXQuZGF0YXNldC50YWJpZFxyXG4gICAgY29uc3QgdGFiQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5kZWxldGVUYWIodGFiQmFyLCBkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtYWxsJykge1xyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlQWxsVGFicyhhcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1kYXRhJykge1xyXG4gICAgY29udHJvbGxlci5zaG93U3RvcmFnZSgnYXJjaGl2ZScpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NsZWFyLWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLmNsZWFyU3RvcmFnZSgpXHJcbiAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=