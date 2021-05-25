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
        No tab here yet!
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
/* harmony import */ var _styles_application_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/application.scss */ "./src/options/styles/application.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/index.scss */ "./src/options/styles/index.scss");
/* harmony import */ var _styles_normalize_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/normalize.scss */ "./src/options/styles/normalize.scss");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.js */ "./src/options/scripts/data.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controller.js */ "./src/options/scripts/controller.js");
// css bundle







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
    console.log(target.parentElement.parentElement)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS8uL3NyYy9vcHRpb25zL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdmlldy5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FrQztBQUNGO0FBQ0E7O0FBRXpCO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDZEQUFzQjs7QUFFckQ7QUFDQTtBQUNBLFFBQVEsb0VBQThCO0FBQ3RDOztBQUVBO0FBQ0EsYUFBYSxlQUFlLEdBQUcsa0RBQVk7QUFDM0MsTUFBTSw0REFBc0I7O0FBRTVCO0FBQ0EsTUFBTSx5REFBa0I7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUksa0RBQVk7O0FBRWhCLFdBQVcsZUFBZSxHQUFHLGtEQUFZO0FBQ3pDLElBQUksNERBQXNCOztBQUUxQixXQUFXLGVBQWUsR0FBRyxrREFBWTtBQUN6QyxJQUFJLDhEQUF3QjtBQUM1QixHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUksa0RBQVksR0FBRyxzREFBZSxDQUFDLGtEQUFZOztBQUUvQztBQUNBLElBQUksb0RBQWM7O0FBRWxCO0FBQ0EsSUFBSSx5REFBa0I7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7OztBQ3hETztBQUNQLGFBQWE7QUFDYjtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0orQjtBQUNDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLHdDQUF3QztBQUNqRDtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQTtBQUNBLGtCQUFrQixLQUFLO0FBQ3ZCO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQSw2Q0FBNkMsSUFBSTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxHQUFHO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsV0FBVyw4Q0FBOEM7O0FBRXpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsR0FBRztBQUM3Qiw2QkFBNkIsR0FBRztBQUNoQyxrQ0FBa0MsWUFBWTtBQUM5QztBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLG9EQUFnQixDQUFDLG9EQUFnQjs7QUFFM0QsbUJBQW1CLHdCQUF3QjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLG9EQUFjO0FBQzFCLHVCQUF1QixxREFBaUIsUUFBUSxvREFBYzs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsV0FBVyxVQUFVLEdBQUcsMENBQUk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7QUMvTU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7O0FDdkJrQzs7QUFFM0I7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtFQUEyQjtBQUNoRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLHFFQUE4QjtBQUM5RDs7QUFFQSxnQ0FBZ0Msc0VBQStCO0FBQy9EO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDNUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ21DO0FBQ047QUFDSTs7QUFFRDtBQUNZOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQ0FBb0M7QUFDL0MsSUFBSSxvREFBYztBQUNsQixJQUFJLHdEQUFrQjtBQUN0QixJQUFJLDJFQUErQjtBQUNuQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHVFQUEyQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBb0IsU0FBUyxrREFBWTtBQUM3Qzs7QUFFQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7QUFDQSxDQUFDLEMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldy5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBkZWxldGVUYWIodGFyZ2V0LCBhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgLy8gcmVtb3ZlIHRhYiBmcm9tIGRhdGEuYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5yZW1vdmVUYWIodGFyZ2V0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIC8vICBkZXZlbG9waW5nIG1ldGhvZHNcclxuICBjbGVhclN0b3JhZ2UoKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmNsZWFyKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1N0b3JhZ2UgY2xlYXJlZCEnKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNob3dTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydhcmNoaXZlJ10sIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImV4cG9ydCBjb25zdCBkYXRhID0ge1xyXG4gIGFyY2hpdmU6IHt9LFxyXG4gIGxhc3RUYWJJZDogJycsXHJcbiAgbGFzdEFyY2hpdmVJZDogJydcclxufSIsImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbi8vIEFyY2hpdmUgcHJvdG9cclxuY29uc3QgQXJjaGl2ZURhdGEgPSBmdW5jdGlvbiAoYXJjaGl2ZU5hbWUpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0YWIpIHtcclxuICBjb25zdCB7IGlkLCBpY29uLCB0aXRsZSwgY3JlYXRlZEF0LCB1cmwsIHRhZ3MgfSA9IHRhYlxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdudW1iZXIgYm94Jz5cclxuICAgICAgPHA+JHtpZH08L3A+XHJcbiAgICAgICAgICA8L2RpdiA+XHJcbiAgICA8ZGl2IGNsYXNzPSdpY29uIGJveCc+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J3RpdGxlIGJveCc+XHJcbiAgICAgICAgPHA+JHt0aXRsZX08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWdzIGJveCc+XHJcbiAgICAgICAgPHA+JHt0YWdzfTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2NyZWF0ZWRBdCBib3gnPlxyXG4gICAgICAgIDxwPiR7Y3JlYXRlZEF0fTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9J29wZW4tdGFiJyBkYXRhLXVybD1cIiR7dXJsfVwiPlxyXG4gICAgICAgICAgT3BlblxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS10YWInIGRhdGEtdGFiaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgRGVsZXRlXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gIGBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGVsID0ge1xyXG4gIGNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihhcmNoaXZlKSB7XHJcbiAgICBjb25zdCB7IGFyY2hpdmVOYW1lLCBpZCB9ID0gYXJjaGl2ZVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2FyZXQtcmlnaHQgY2xvc2VkXCI+PC9pPlxyXG4gICAgICA8cD4ke2FyY2hpdmVOYW1lfTwvcD5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGx1cyBuZXdcIj48L2k+XHJcbiAgICBgXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9ICdhcmNoaXZlIGFyY2hpdmUtc3R5bGUnXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGFyY2hpdmVzTGlzdCwgdW5jbGFzc2lmaWVkLCBpZCB9ID0gYXJjaGl2ZVxyXG5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRET01TID0gJydcclxuXHJcbiAgICBpZiAodW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gdW5jbGFzc2lmaWVkLm1hcChlYWNoID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgdGFiLXN0eWxlJz5cclxuICAgICAgICAke3RhYlRlbXBsYXRlKGVhY2gpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gICAgICB9KS5qb2luKCcnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdW5jbGFzc2lmaWVkRE9NUyA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0ndGFiIHRhYi1zdHlsZSc+XHJcbiAgICAgICAgTm8gdGFiIGhlcmUgeWV0IVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbmV3QXJjaGl2ZS5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZGl2IGNsYXNzPSdhcmNoaXZlTmFtZSc+XHJcbiAgICAgIDxpbnB1dCBpZD1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJhcmNoaXZlJHtpZH0tZHJvcGRvd25cIj5cclxuICAgICAgICAgIDxoMyB1bnNlbGVjdGFibGU9XCJvblwiPiR7YXJjaGl2ZU5hbWV9PC9oMz5cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWNvbnRlbnRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlc0xpc3RcIj5cclxuICAgICAgICAgICAgPHA+JHthcmNoaXZlc0xpc3R9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFicy1saXN0XCI+XHJcbiAgICAgICAgICAgICR7dW5jbGFzc2lmaWVkRE9NU31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGBcclxuXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9ICdhcmNoaXZlIGFyY2hpdmUtc3R5bGUnXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVUYWJET01JbkNvbnRlbnQodGFiRGF0YSkge1xyXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHRhYi5pbm5lckhUTUwgPSB0YWJUZW1wbGF0ZSh0YWJEYXRhKVxyXG4gICAgdGFiLmNsYXNzTGlzdCArPSAndGFiIHRhYi1zdHlsZSdcclxuICAgIHJldHVybiB0YWJcclxuICB9LFxyXG4gIGFzeW5jIGdldFN0b3JhZ2VEYXRhKHRhcmdldERhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW3RhcmdldERhdGFdLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWplY3QhJylcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogZmFsc2UgfSwgKHF1ZXJ5UmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0YWJzID0gW11cclxuICAgICAgICAgIGZvciAobGV0IHRhYiBvZiBxdWVyeVJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgKHRhYi50aXRsZSA9PT0gXCJjaHJvbWUudGFicyAtIENocm9tZSBEZXZlbG9wZXJzXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwgPT09IFwiY2hyb21lOi8vZXh0ZW5zaW9ucy9cIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybC5zcGxpdCgnOi8vJylbMF0gPT09ICdjaHJvbWUtZXh0ZW5zaW9uJykpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29udGludWUgb24gJyArIHRhYi50aXRsZSlcclxuICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNsZWFyXHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQpXHJcblxyXG4gICAgICAgICAgICAvLyBmb3JtIHRhYkRhdGFcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSB1dGlscy50cmltU3RyaW5nKHV0aWxzLmVzY2FwZUh0bWwodGFiLnRpdGxlKSwgNDUpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB7IGZhdkljb25Vcmw6IGljb24sIHVybCB9ID0gdGFiXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGlkXHJcbiAgICAgICAgICAgIGRhdGEubGFzdFRhYklkKytcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcigndGFiJywgZGF0YS5sYXN0VGFiSWQpXHJcblxyXG4gICAgICAgICAgICB0YWJzLnB1c2gobmV3IFRhYkRhdGEoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHRhYnMpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBzdG9yZUFyY2hpdmUoKSB7XHJcbiAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBjb25zdCB7IGFyY2hpdmUgfSA9IGRhdGFcclxuICAgIGFyY2hpdmUuYXJjaGl2ZU5hbWUgPSAncm9vdC1hcmNoaXZlJ1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgbWVzc2FnZTogJ3N0b3JlLWFyY2hpdmUnLFxyXG4gICAgICBkYXRhOiBhcmNoaXZlXHJcbiAgICB9XHJcblxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1tJbmRleF0gJywgbWVzc2FnZSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVtb3ZlVGFiKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICBjb25zdCB0YXJnZXRJZCA9IHRhYklkXHJcblxyXG4gICAgY29uc3QgcmVtb3ZlVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJjaGl2ZS51bmNsYXNzaWZpZWQuaW5kZXhPZih0YWIpXHJcbiAgICAgICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9XHJcbn0iLCJleHBvcnQgY29uc3QgdXRpbHMgPSB7XHJcbiAgaWRGb3JtYXR0ZXI6IGZ1bmN0aW9uICh0eXBlLCBudW0pIHtcclxuICAgIGxldCBtb2RlID0gdHlwZSA9PT0gJ3RhYicgPyA1IDogM1xyXG4gICAgbnVtID0gbnVtICsgJydcclxuICAgIGxldCBvdXRwdXQgPSBudW0uc3BsaXQoJycpXHJcbiAgICBpZiAobnVtLmxlbmd0aCA8IG1vZGUpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlIC0gbnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgb3V0cHV0LnVuc2hpZnQoJzAnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXHJcbiAgfSxcclxuICBlc2NhcGVIdG1sOiBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nXHJcbiAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbiAgfSxcclxuICB0cmltU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nLCBtZXhsZW5ndGgpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIG1leGxlbmd0aClcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcblxyXG5leHBvcnQgY29uc3QgdmlldyA9IHtcclxuICBzaG93VGFic0luQ29udGVudChkYXRhKSB7XHJcbiAgICAvLyBkYXRhOiByb290LnVuY2xhc3NpZmllZFxyXG4gICAgY29uc3QgdGFic0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuICAgIHRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcbiAgICBmb3IgKGxldCB0YWIgb2YgZGF0YSkge1xyXG4gICAgICBjb25zdCBuZXdUYWIgPSBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKVxyXG4gICAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZChuZXdUYWIpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93Um9vdEFyY2hpdmVMaXN0KGxpc3QpIHtcclxuICAgIC8vIGxpc3Q6IHJvb3QuYXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5cclxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBuZXdTaWRlYmFyQXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihpdGVtKVxyXG4gICAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld1NpZGViYXJBcmNoaXZlKVxyXG5cclxuICAgICAgY29uc3QgbmV3Q29udGVudEFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGl0ZW0pXHJcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q29udGVudEFyY2hpdmUpXHJcbiAgICB9XHJcbiAgfSxcclxuICByZW1vdmVUYWIodGFiQmFyKSB7XHJcbiAgICB0YWJCYXIuY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGNzcyBidW5kbGVcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwbGljYXRpb24uc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvaW5kZXguc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvbm9ybWFsaXplLnNjc3MnXHJcblxyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmpzJ1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZygnW0luZGV4XSBJbmRleC5odG1sIGxvYWRlZCEgQXNrIGZvciBhcmNoaXZlIGRhdGEhJylcclxuICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgbWVzc2FnZTogJ2dldC1hcmNoaXZlLWRhdGEnLFxyXG4gICAgZGF0YTogbnVsbFxyXG4gIH1cclxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAocmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdIHJlY2VpdmVkIGFyY2hpdmUgZGF0YScsIHJlc3BvbnNlKVxyXG4gICAgY29uc3QgeyBhcmNoaXZlLCBsYXN0VGFiSWQsIGxhc3RBcmNoaXZlSWQgfSA9IHJlc3BvbnNlXHJcbiAgICBkYXRhLmxhc3RUYWJJZCA9IGxhc3RUYWJJZFxyXG4gICAgZGF0YS5sYXN0QXJjaGl2ZUlkID0gbGFzdEFyY2hpdmVJZFxyXG4gICAgY29udHJvbGxlci5pbml0TG9jYWxBcmNoaXZlRGF0YShhcmNoaXZlKVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBldmVudExpc3RlbmVyXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuICAvLyBjb25zb2xlLmxvZyh0YXJnZXQpXHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWFsbC1idG4nKSB7XHJcbiAgICBjb250cm9sbGVyLmdldEFsbE9wZW5lZFRhYnMoKVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLWFsbCcpIHtcclxuICAgIGNvbnNvbGUubG9nKHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ29wZW4tdGFiJykge1xyXG4gICAgY29uc3QgdXJsID0gdGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLXRhYicpIHtcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0LmRhdGFzZXQudGFiaWRcclxuICAgIGNvbnN0IHRhYkJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlVGFiKHRhYkJhciwgZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dTdG9yYWdlKCdhcmNoaXZlJylcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnY2xlYXItZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2xlYXJTdG9yYWdlKClcclxuICB9XHJcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==