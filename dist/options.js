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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/options/scripts/utils.js");
// css bundle






//to be fixed
// const { uuid } = '../../../node_modules/uuidv4' 

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

const data = {
  archive: {},
  lastTabId: '',
  lastArchiveId: ''
}

// const utils = {
//   idFormatter: function (type, num) {
//     let mode = type === 'tab' ? 5 : 3
//     num = num + ''
//     let output = num.split('')
//     if (num.length < mode) {
//       for (let i = 0; i < mode - num.length; i++) {
//         output.unshift('0')
//       }
//     }
//     return output.join('')
//   }
// }

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
    // console.log(archive)
    const { archiveName, archivesList, unclassified, id } = archive

    const newArchive = document.createElement('div')
    newArchive.innerHTML = `
      <p>${archiveName}</p>
      <p>${archivesList}</p>
      <p>${unclassified}</p>
    `

    newArchive.classList = 'archive-style'
    newArchive.dataset.archiveId = id
    return newArchive
  },
  createTabDOMInContent(tabData) {
    const { createdAt, finishReading, icon, id, tags, title, updatedAt, url } = tabData
    const tab = document.createElement('div')
    tab.innerHTML = `
        <div class='number'>
          <p>${id}</p>
        </div>
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
      </div>
    `
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
            // console.log(tab)
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
            const { favIconUrl: icon, title, url } = tab
            const createdAt = new Date().toLocaleDateString('zh-tw')
            const updatedAt = new Date().toLocaleDateString('zh-tw')
            const tags = []

            // set id
            data.lastTabId++
            const id = _utils__WEBPACK_IMPORTED_MODULE_3__.utils.idFormatter('tab', data.lastTabId)

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
    const { archive } = data
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

const view = {
  showTabsInContent(data) {
    // data: root.unclassified
    const tabsList = document.querySelector('.tabs-list')
    tabsList.innerHTML = ''
    for (let tab of data) {
      const newTab = model.createTabDOMInContent(tab)
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
  removeTab(tabBar) {
    tabBar.classList += ' none'
  }
}

const controller = {
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
    // remove tab from data.archive
    data.archive = model.removeTab(data.archive, tabId)

    // rerender view
    view.removeTab(target)

    // store archive to storage
    model.storeArchive()
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

window.onload = function () {
  console.log('[Index] Index.html loaded! Ask for archive data!')
  const request = {
    message: 'get-archive-data',
    data: null
  }
  chrome.runtime.sendMessage(request, (response) => {
    console.log('[Index] received archive data', response)
    const { archive, lastTabId, lastArchiveId } = response
    data.lastTabId = lastTabId
    data.lastArchiveId = lastArchiveId
    controller.initLocalArchiveData(archive)
  });
}

// eventListener
window.addEventListener('click', (e) => {
  const target = e.target
  // console.log(target)

  if (target.className === 'get-all-btn') {
    controller.getAllOpenedTabs()
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
    controller.deleteTab(tabBar, data.archive, tabId)
  }

  if (target.className === 'get-data') {
    controller.showStorage('archive')
  }

  if (target.className === 'clear-data') {
    controller.clearStorage()
  }
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS8uL3NyYy9vcHRpb25zL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL3V0aWxzLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDWkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFD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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0NBQW9DO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQyIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xyXG4gIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICBsZXQgbW9kZSA9IHR5cGUgPT09ICd0YWInID8gNSA6IDNcclxuICAgIG51bSA9IG51bSArICcnXHJcbiAgICBsZXQgb3V0cHV0ID0gbnVtLnNwbGl0KCcnKVxyXG4gICAgaWYgKG51bS5sZW5ndGggPCBtb2RlKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZSAtIG51bS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG91dHB1dC51bnNoaWZ0KCcwJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gY3NzIGJ1bmRsZVxyXG5pbXBvcnQgJy4uL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9pbmRleC5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9ub3JtYWxpemUuc2NzcydcclxuXHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi91dGlscydcclxuXHJcbi8vdG8gYmUgZml4ZWRcclxuLy8gY29uc3QgeyB1dWlkIH0gPSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWR2NCcgXHJcblxyXG4vLyBBcmNoaXZlIHByb3RvXHJcbmNvbnN0IEFyY2hpdmVEYXRhID0gZnVuY3Rpb24gKGFyY2hpdmVOYW1lKSB7XHJcbiAgdGhpcy5hcmNoaXZlTmFtZSA9IGFyY2hpdmVOYW1lIHx8ICdOZXcgQXJjaGl2ZSdcclxuICB0aGlzLmFyY2hpdmVzTGlzdCA9IFtdXHJcbiAgdGhpcy51bmNsYXNzaWZpZWQgPSBbXVxyXG59XHJcblxyXG5jb25zdCBUYWJEYXRhID0gZnVuY3Rpb24gKGlkLCBpY29uLCB0aXRsZSwgdGFncywgY3JlYXRlZEF0LCB1cmwsIHVwZGF0ZWRBdCkge1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gIHRoaXMudXJsID0gdXJsXHJcbiAgdGhpcy5pY29uID0gaWNvblxyXG4gIHRoaXMuY3JlYXRlZEF0ID0gY3JlYXRlZEF0XHJcbiAgdGhpcy51cGRhdGVkQXQgPSB1cGRhdGVkQXRcclxuICB0aGlzLmZpbmlzaFJlYWRpbmcgPSBmYWxzZVxyXG4gIHRoaXMudGFncyA9IHRhZ3NcclxufVxyXG5cclxuY29uc3QgZGF0YSA9IHtcclxuICBhcmNoaXZlOiB7fSxcclxuICBsYXN0VGFiSWQ6ICcnLFxyXG4gIGxhc3RBcmNoaXZlSWQ6ICcnXHJcbn1cclxuXHJcbi8vIGNvbnN0IHV0aWxzID0ge1xyXG4vLyAgIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbi8vICAgICBsZXQgbW9kZSA9IHR5cGUgPT09ICd0YWInID8gNSA6IDNcclxuLy8gICAgIG51bSA9IG51bSArICcnXHJcbi8vICAgICBsZXQgb3V0cHV0ID0gbnVtLnNwbGl0KCcnKVxyXG4vLyAgICAgaWYgKG51bS5sZW5ndGggPCBtb2RlKSB7XHJcbi8vICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZSAtIG51bS5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgICAgIG91dHB1dC51bnNoaWZ0KCcwJylcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuY29uc3QgbW9kZWwgPSB7XHJcbiAgY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGlkIH0gPSBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1jYXJldC1yaWdodCBjbG9zZWRcIj48L2k+XHJcbiAgICAgIDxwPiR7YXJjaGl2ZU5hbWV9PC9wPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzIG5ld1wiPjwvaT5cclxuICAgIGBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gJ2FyY2hpdmUgYXJjaGl2ZS1zdHlsZSdcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIC8vIDUvMjUgd29ya2luZyBoZXJlICA8LS0tLS0tXHJcbiAgY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChhcmNoaXZlKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhhcmNoaXZlKVxyXG4gICAgY29uc3QgeyBhcmNoaXZlTmFtZSwgYXJjaGl2ZXNMaXN0LCB1bmNsYXNzaWZpZWQsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPHA+JHthcmNoaXZlTmFtZX08L3A+XHJcbiAgICAgIDxwPiR7YXJjaGl2ZXNMaXN0fTwvcD5cclxuICAgICAgPHA+JHt1bmNsYXNzaWZpZWR9PC9wPlxyXG4gICAgYFxyXG5cclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gJ2FyY2hpdmUtc3R5bGUnXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVUYWJET01JbkNvbnRlbnQodGFiRGF0YSkge1xyXG4gICAgY29uc3QgeyBjcmVhdGVkQXQsIGZpbmlzaFJlYWRpbmcsIGljb24sIGlkLCB0YWdzLCB0aXRsZSwgdXBkYXRlZEF0LCB1cmwgfSA9IHRhYkRhdGFcclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB0YWIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9J251bWJlcic+XHJcbiAgICAgICAgICA8cD4ke2lkfTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdpY29uJz5cclxuICAgICAgICAgIDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIlwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J3RpdGxlJz5cclxuICAgICAgICAgIDxwPiR7dGl0bGV9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J3RhZ3MnPlxyXG4gICAgICAgICAgPHA+JHt0YWdzfTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdjcmVhdGVkQXQnPlxyXG4gICAgICAgICAgPHA+JHtjcmVhdGVkQXR9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J2J0bic+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdvcGVuLXRhYicgZGF0YS11cmw9XCIke3VybH1cIj5cclxuICAgICAgICAgICAgT3BlblxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nYnRuJz5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS10YWInIGRhdGEtdGFiaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgICBEZWxldGVcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGBcclxuICAgIHRhYi5jbGFzc0xpc3QgKz0gJ3RhYiB0YWItc3R5bGUnXHJcbiAgICByZXR1cm4gdGFiXHJcbiAgfSxcclxuICBhc3luYyBnZXRTdG9yYWdlRGF0YSh0YXJnZXREYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVqZWN0IScpXHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IGZhbHNlIH0sIChxdWVyeVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGFicyA9IFtdXHJcbiAgICAgICAgICBmb3IgKGxldCB0YWIgb2YgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFiKVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgKHRhYi50aXRsZSA9PT0gXCJjaHJvbWUudGFicyAtIENocm9tZSBEZXZlbG9wZXJzXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwgPT09IFwiY2hyb21lOi8vZXh0ZW5zaW9ucy9cIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybC5zcGxpdCgnOi8vJylbMF0gPT09ICdjaHJvbWUtZXh0ZW5zaW9uJykpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29udGludWUgb24gJyArIHRhYi50aXRsZSlcclxuICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNsZWFyXHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQpXHJcblxyXG4gICAgICAgICAgICAvLyBmb3JtIHRhYkRhdGFcclxuICAgICAgICAgICAgY29uc3QgeyBmYXZJY29uVXJsOiBpY29uLCB0aXRsZSwgdXJsIH0gPSB0YWJcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdGFncyA9IFtdXHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgaWRcclxuICAgICAgICAgICAgZGF0YS5sYXN0VGFiSWQrK1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHV0aWxzLmlkRm9ybWF0dGVyKCd0YWInLCBkYXRhLmxhc3RUYWJJZClcclxuXHJcbiAgICAgICAgICAgIHRhYnMucHVzaChuZXcgVGFiRGF0YShpZCwgaWNvbiwgdGl0bGUsIHRhZ3MsIGNyZWF0ZWRBdCwgdXJsLCB1cGRhdGVkQXQpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUodGFicylcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHN0b3JlQXJjaGl2ZSgpIHtcclxuICAgIC8vIHN0b3JlIGRlZmF1bHRBcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSB9ID0gZGF0YVxyXG4gICAgYXJjaGl2ZS5hcmNoaXZlTmFtZSA9ICdyb290LWFyY2hpdmUnXHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICBtZXNzYWdlOiAnc3RvcmUtYXJjaGl2ZScsXHJcbiAgICAgIGRhdGE6IGFyY2hpdmVcclxuICAgIH1cclxuXHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAobWVzc2FnZSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnW0luZGV4XSAnLCBtZXNzYWdlKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZW1vdmVUYWIoYXJjaGl2ZSwgdGFiSWQpIHtcclxuICAgIGNvbnN0IHRhcmdldElkID0gdGFiSWRcclxuXHJcbiAgICBjb25zdCByZW1vdmVUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiBhcmNoaXZlLnVuY2xhc3NpZmllZCkge1xyXG4gICAgICAgICAgaWYgKHRhYi5pZCA9PT0gdGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhcmNoaXZlLnVuY2xhc3NpZmllZC5pbmRleE9mKHRhYilcclxuICAgICAgICAgICAgYXJjaGl2ZS51bmNsYXNzaWZpZWQuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZVRhYkJ5SWQoYXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgdmlldyA9IHtcclxuICBzaG93VGFic0luQ29udGVudChkYXRhKSB7XHJcbiAgICAvLyBkYXRhOiByb290LnVuY2xhc3NpZmllZFxyXG4gICAgY29uc3QgdGFic0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuICAgIHRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcbiAgICBmb3IgKGxldCB0YWIgb2YgZGF0YSkge1xyXG4gICAgICBjb25zdCBuZXdUYWIgPSBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKVxyXG4gICAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZChuZXdUYWIpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93Um9vdEFyY2hpdmVMaXN0KGxpc3QpIHtcclxuICAgIC8vIGxpc3Q6IHJvb3QuYXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5cclxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBuZXdTaWRlYmFyQXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihpdGVtKVxyXG4gICAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld1NpZGViYXJBcmNoaXZlKVxyXG5cclxuICAgICAgY29uc3QgbmV3Q29udGVudEFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGl0ZW0pXHJcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q29udGVudEFyY2hpdmUpXHJcbiAgICB9XHJcbiAgfSxcclxuICByZW1vdmVUYWIodGFiQmFyKSB7XHJcbiAgICB0YWJCYXIuY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSB7XHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIGdldCBhbGwgYWN0aXZlIHRhYnNcclxuICAgICAgY29uc3QgYWN0aXZlVGFicyA9IGF3YWl0IG1vZGVsLmdldEFsbE9wZW5lZFRhYnMoKVxyXG5cclxuICAgICAgLy8gYWRkIG5ldyB0YWJzIHRvIHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICAgIGZvciAobGV0IHRhYiBvZiBhY3RpdmVUYWJzKSB7XHJcbiAgICAgICAgZGF0YS5hcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYilcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hhbmdlIHZpZXdcclxuICAgICAgY29uc3QgeyB1bmNsYXNzaWZpZWQgfSA9IGRhdGEuYXJjaGl2ZVxyXG4gICAgICB2aWV3LnNob3dUYWJzSW5Db250ZW50KHVuY2xhc3NpZmllZClcclxuXHJcbiAgICAgIC8vIHN0b3JlIGRlZmF1bHRBcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5pdExvY2FsQXJjaGl2ZURhdGEocmVzcG9uc2UpIHtcclxuICAgIC8vIHN0b3JlIGl0IHRvIGxvY2FsIGRhdGFcclxuICAgIGRhdGEuYXJjaGl2ZSA9IHJlc3BvbnNlXHJcblxyXG4gICAgY29uc3QgeyB1bmNsYXNzaWZpZWQgfSA9IGRhdGEuYXJjaGl2ZVxyXG4gICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgY29uc3QgeyBhcmNoaXZlc0xpc3QgfSA9IGRhdGEuYXJjaGl2ZVxyXG4gICAgdmlldy5zaG93Um9vdEFyY2hpdmVMaXN0KGFyY2hpdmVzTGlzdClcclxuICB9LFxyXG4gIGRlbGV0ZVRhYih0YXJnZXQsIGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICAvLyByZW1vdmUgdGFiIGZyb20gZGF0YS5hcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LnJlbW92ZVRhYih0YXJnZXQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgLy8gIGRldmVsb3BpbmcgbWV0aG9kc1xyXG4gIGNsZWFyU3RvcmFnZSgpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuY2xlYXIoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnU3RvcmFnZSBjbGVhcmVkIScpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2hvd1N0b3JhZ2UoKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2FyY2hpdmUnXSwgKGRhdGEpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdbSW5kZXhdIEluZGV4Lmh0bWwgbG9hZGVkISBBc2sgZm9yIGFyY2hpdmUgZGF0YSEnKVxyXG4gIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICBtZXNzYWdlOiAnZ2V0LWFyY2hpdmUtZGF0YScsXHJcbiAgICBkYXRhOiBudWxsXHJcbiAgfVxyXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChyZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1tJbmRleF0gcmVjZWl2ZWQgYXJjaGl2ZSBkYXRhJywgcmVzcG9uc2UpXHJcbiAgICBjb25zdCB7IGFyY2hpdmUsIGxhc3RUYWJJZCwgbGFzdEFyY2hpdmVJZCB9ID0gcmVzcG9uc2VcclxuICAgIGRhdGEubGFzdFRhYklkID0gbGFzdFRhYklkXHJcbiAgICBkYXRhLmxhc3RBcmNoaXZlSWQgPSBsYXN0QXJjaGl2ZUlkXHJcbiAgICBjb250cm9sbGVyLmluaXRMb2NhbEFyY2hpdmVEYXRhKGFyY2hpdmUpXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG4gIC8vIGNvbnNvbGUubG9nKHRhcmdldClcclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdnZXQtYWxsLWJ0bicpIHtcclxuICAgIGNvbnRyb2xsZXIuZ2V0QWxsT3BlbmVkVGFicygpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ29wZW4tYWxsJykge1xyXG4gICAgY29uc29sZS5sb2codGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudClcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi10YWInKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0YXJnZXQuZGF0YXNldC51cmxcclxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtdGFiJykge1xyXG4gICAgY29uc3QgdGFiSWQgPSB0YXJnZXQuZGF0YXNldC50YWJpZFxyXG4gICAgY29uc3QgdGFiQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5kZWxldGVUYWIodGFiQmFyLCBkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdnZXQtZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuc2hvd1N0b3JhZ2UoJ2FyY2hpdmUnKVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdjbGVhci1kYXRhJykge1xyXG4gICAgY29udHJvbGxlci5jbGVhclN0b3JhZ2UoKVxyXG4gIH1cclxufSkiXSwic291cmNlUm9vdCI6IiJ9