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
    <div class='number'>
      <p>${id}</p>
          </div >
    <div class='icon'>
      <img src="${icon}" alt="">
          </div>
      <div class='title'>
        <p>${title}</p>
      </div>
      <div class='tags'>
        <p>${tags}</p>
      </div>
      <div class='createdAt'>
        <p>${createdAt}</p>
      </div>
      <div class='btn'>
        <button class='open-tab' data-url="${url}">
          Open
            </button>
      </div>
      <div class='btn'>
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

  // 5/25 working here  <------
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
            const title = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.escapeHtml(tab.title)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS8uL3NyYy9vcHRpb25zL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzPzg2ZGYiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2Nzcz9iNDY0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc3R5bGVzL25vcm1hbGl6ZS5zY3NzPzMzZDciLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdmlldy5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9pbmRleC5qcyJd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Q05BO0FBQ21DO0FBQ047QUFDSTs7QUFFRDtBQUNZOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQ0FBb0M7QUFDL0MsSUFBSSxvREFBYztBQUNsQixJQUFJLHdEQUFrQjtBQUN0QixJQUFJLDJFQUErQjtBQUNuQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHVFQUEyQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBb0IsU0FBUyxrREFBWTtBQUM3Qzs7QUFFQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7QUFDQSxDQUFDLEMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldy5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBkZWxldGVUYWIodGFyZ2V0LCBhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgLy8gcmVtb3ZlIHRhYiBmcm9tIGRhdGEuYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5yZW1vdmVUYWIodGFyZ2V0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIC8vICBkZXZlbG9waW5nIG1ldGhvZHNcclxuICBjbGVhclN0b3JhZ2UoKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmNsZWFyKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1N0b3JhZ2UgY2xlYXJlZCEnKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNob3dTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydhcmNoaXZlJ10sIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImV4cG9ydCBjb25zdCBkYXRhID0ge1xyXG4gIGFyY2hpdmU6IHt9LFxyXG4gIGxhc3RUYWJJZDogJycsXHJcbiAgbGFzdEFyY2hpdmVJZDogJydcclxufSIsImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbi8vIEFyY2hpdmUgcHJvdG9cclxuY29uc3QgQXJjaGl2ZURhdGEgPSBmdW5jdGlvbiAoYXJjaGl2ZU5hbWUpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0YWIpIHtcclxuICBjb25zdCB7IGlkLCBpY29uLCB0aXRsZSwgY3JlYXRlZEF0LCB1cmwsIHRhZ3MgfSA9IHRhYlxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdudW1iZXInPlxyXG4gICAgICA8cD4ke2lkfTwvcD5cclxuICAgICAgICAgIDwvZGl2ID5cclxuICAgIDxkaXYgY2xhc3M9J2ljb24nPlxyXG4gICAgICA8aW1nIHNyYz1cIiR7aWNvbn1cIiBhbHQ9XCJcIj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPSd0aXRsZSc+XHJcbiAgICAgICAgPHA+JHt0aXRsZX08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWdzJz5cclxuICAgICAgICA8cD4ke3RhZ3N9PC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz0nY3JlYXRlZEF0Jz5cclxuICAgICAgICA8cD4ke2NyZWF0ZWRBdH08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPSdidG4nPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9J29wZW4tdGFiJyBkYXRhLXVybD1cIiR7dXJsfVwiPlxyXG4gICAgICAgICAgT3BlblxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2J0bic+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLXRhYicgZGF0YS10YWJpZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICBEZWxldGVcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgYFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbW9kZWwgPSB7XHJcbiAgY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGlkIH0gPSBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1jYXJldC1yaWdodCBjbG9zZWRcIj48L2k+XHJcbiAgICAgIDxwPiR7YXJjaGl2ZU5hbWV9PC9wPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzIG5ld1wiPjwvaT5cclxuICAgIGBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gJ2FyY2hpdmUgYXJjaGl2ZS1zdHlsZSdcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG5cclxuICAvLyA1LzI1IHdvcmtpbmcgaGVyZSAgPC0tLS0tLVxyXG4gIGNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoYXJjaGl2ZSkge1xyXG4gICAgY29uc3QgeyBhcmNoaXZlTmFtZSwgYXJjaGl2ZXNMaXN0LCB1bmNsYXNzaWZpZWQsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gICAgbGV0IHVuY2xhc3NpZmllZERPTVMgPSAnJ1xyXG5cclxuICAgIGlmICh1bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSB1bmNsYXNzaWZpZWQubWFwKGVhY2ggPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiB0YWItc3R5bGUnPlxyXG4gICAgICAgICR7dGFiVGVtcGxhdGUoZWFjaCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgICAgIH0pLmpvaW4oJycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgdGFiLXN0eWxlJz5cclxuICAgICAgICBObyB0YWIgaGVyZSB5ZXQhXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgPGRpdiBjbGFzcz0nYXJjaGl2ZU5hbWUnPlxyXG4gICAgICA8aW5wdXQgaWQ9XCJhcmNoaXZlJHtpZH0tZHJvcGRvd25cIiB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCI+XHJcbiAgICAgICAgICA8aDMgdW5zZWxlY3RhYmxlPVwib25cIj4ke2FyY2hpdmVOYW1lfTwvaDM+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1jb250ZW50XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZXNMaXN0XCI+XHJcbiAgICAgICAgICAgIDxwPiR7YXJjaGl2ZXNMaXN0fTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtbGlzdFwiPlxyXG4gICAgICAgICAgICAke3VuY2xhc3NpZmllZERPTVN9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgXHJcblxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSAnYXJjaGl2ZSBhcmNoaXZlLXN0eWxlJ1xyXG4gICAgbmV3QXJjaGl2ZS5kYXRhc2V0LmFyY2hpdmVJZCA9IGlkXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYkRhdGEpIHtcclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB0YWIuaW5uZXJIVE1MID0gdGFiVGVtcGxhdGUodGFiRGF0YSlcclxuICAgIHRhYi5jbGFzc0xpc3QgKz0gJ3RhYiB0YWItc3R5bGUnXHJcbiAgICByZXR1cm4gdGFiXHJcbiAgfSxcclxuICBhc3luYyBnZXRTdG9yYWdlRGF0YSh0YXJnZXREYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVqZWN0IScpXHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IGZhbHNlIH0sIChxdWVyeVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGFicyA9IFtdXHJcbiAgICAgICAgICBmb3IgKGxldCB0YWIgb2YgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICh0YWIudGl0bGUgPT09IFwiY2hyb21lLnRhYnMgLSBDaHJvbWUgRGV2ZWxvcGVyc1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSBcImNocm9tZTovL2V4dGVuc2lvbnMvXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwuc3BsaXQoJzovLycpWzBdID09PSAnY2hyb21lLWV4dGVuc2lvbicpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRpbnVlIG9uICcgKyB0YWIudGl0bGUpXHJcbiAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiLmlkKVxyXG5cclxuICAgICAgICAgICAgLy8gZm9ybSB0YWJEYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdXRpbHMuZXNjYXBlSHRtbCh0YWIudGl0bGUpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB7IGZhdkljb25Vcmw6IGljb24sIHVybCB9ID0gdGFiXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGlkXHJcbiAgICAgICAgICAgIGRhdGEubGFzdFRhYklkKytcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcigndGFiJywgZGF0YS5sYXN0VGFiSWQpXHJcblxyXG4gICAgICAgICAgICB0YWJzLnB1c2gobmV3IFRhYkRhdGEoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHRhYnMpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBzdG9yZUFyY2hpdmUoKSB7XHJcbiAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBjb25zdCB7IGFyY2hpdmUgfSA9IGRhdGFcclxuICAgIGFyY2hpdmUuYXJjaGl2ZU5hbWUgPSAncm9vdC1hcmNoaXZlJ1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgbWVzc2FnZTogJ3N0b3JlLWFyY2hpdmUnLFxyXG4gICAgICBkYXRhOiBhcmNoaXZlXHJcbiAgICB9XHJcblxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1tJbmRleF0gJywgbWVzc2FnZSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVtb3ZlVGFiKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICBjb25zdCB0YXJnZXRJZCA9IHRhYklkXHJcblxyXG4gICAgY29uc3QgcmVtb3ZlVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJjaGl2ZS51bmNsYXNzaWZpZWQuaW5kZXhPZih0YWIpXHJcbiAgICAgICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9XHJcbn0iLCJleHBvcnQgY29uc3QgdXRpbHMgPSB7XHJcbiAgaWRGb3JtYXR0ZXI6IGZ1bmN0aW9uICh0eXBlLCBudW0pIHtcclxuICAgIGxldCBtb2RlID0gdHlwZSA9PT0gJ3RhYicgPyA1IDogM1xyXG4gICAgbnVtID0gbnVtICsgJydcclxuICAgIGxldCBvdXRwdXQgPSBudW0uc3BsaXQoJycpXHJcbiAgICBpZiAobnVtLmxlbmd0aCA8IG1vZGUpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlIC0gbnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgb3V0cHV0LnVuc2hpZnQoJzAnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXHJcbiAgfSxcclxuICBlc2NhcGVIdG1sOiBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nXHJcbiAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHZpZXcgPSB7XHJcbiAgc2hvd1RhYnNJbkNvbnRlbnQoZGF0YSkge1xyXG4gICAgLy8gZGF0YTogcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcbiAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgZm9yIChsZXQgdGFiIG9mIGRhdGEpIHtcclxuICAgICAgY29uc3QgbmV3VGFiID0gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYilcclxuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFiKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd1Jvb3RBcmNoaXZlTGlzdChsaXN0KSB7XHJcbiAgICAvLyBsaXN0OiByb290LmFyY2hpdmVzTGlzdFxyXG4gICAgY29uc3Qgc2lkZWJhckFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHtcclxuICAgICAgY29uc3QgbmV3U2lkZWJhckFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmhpdmVET01JblNpZGViYXIoaXRlbSlcclxuICAgICAgc2lkZWJhckFyY2hpdmVzTGlzdC5hcHBlbmRDaGlsZChuZXdTaWRlYmFyQXJjaGl2ZSlcclxuXHJcbiAgICAgIGNvbnN0IG5ld0NvbnRlbnRBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChpdGVtKVxyXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0NvbnRlbnRBcmNoaXZlKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVtb3ZlVGFiKHRhYkJhcikge1xyXG4gICAgdGFiQmFyLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBjc3MgYnVuZGxlXHJcbmltcG9ydCAnLi4vc3R5bGVzL2FwcGxpY2F0aW9uLnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2luZGV4LnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL25vcm1hbGl6ZS5zY3NzJ1xyXG5cclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci5qcydcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coJ1tJbmRleF0gSW5kZXguaHRtbCBsb2FkZWQhIEFzayBmb3IgYXJjaGl2ZSBkYXRhIScpXHJcbiAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgIG1lc3NhZ2U6ICdnZXQtYXJjaGl2ZS1kYXRhJyxcclxuICAgIGRhdGE6IG51bGxcclxuICB9XHJcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnW0luZGV4XSByZWNlaXZlZCBhcmNoaXZlIGRhdGEnLCByZXNwb25zZSlcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSwgbGFzdFRhYklkLCBsYXN0QXJjaGl2ZUlkIH0gPSByZXNwb25zZVxyXG4gICAgZGF0YS5sYXN0VGFiSWQgPSBsYXN0VGFiSWRcclxuICAgIGRhdGEubGFzdEFyY2hpdmVJZCA9IGxhc3RBcmNoaXZlSWRcclxuICAgIGNvbnRyb2xsZXIuaW5pdExvY2FsQXJjaGl2ZURhdGEoYXJjaGl2ZSlcclxuICB9KTtcclxufVxyXG5cclxuLy8gZXZlbnRMaXN0ZW5lclxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgLy8gY29uc29sZS5sb2codGFyZ2V0KVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1hbGwtYnRuJykge1xyXG4gICAgY29udHJvbGxlci5nZXRBbGxPcGVuZWRUYWJzKClcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi1hbGwnKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLXRhYicpIHtcclxuICAgIGNvbnN0IHVybCA9IHRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZS10YWInKSB7XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhcmdldC5kYXRhc2V0LnRhYmlkXHJcbiAgICBjb25zdCB0YWJCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZVRhYih0YWJCYXIsIGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1kYXRhJykge1xyXG4gICAgY29udHJvbGxlci5zaG93U3RvcmFnZSgnYXJjaGl2ZScpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NsZWFyLWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLmNsZWFyU3RvcmFnZSgpXHJcbiAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=