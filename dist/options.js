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

const model = {
  createArhiveDOMInSidebar(archiveName) {
    const archive = document.createElement('div')
    archive.innerHTML = `
      <i class="fas fa-caret-right closed"></i>
      <p>${archiveName}</p>
      <i class="fas fa-plus new"></i>
    `
    archive.classList = 'archive-style'
    return archive
  },
  // 5/25 start here  <------
  createArchiveDOMInContent(archiveData) {
    const archive = document.createElement('div')
    archive.innerHTML = `
      <i class="fas fa-caret-right closed"></i>
      <p>${archiveName}</p>
      <i class="fas fa-plus new"></i>
    `
    archive.classList = 'archive-style'
    return archive
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
            const id = utils.idFormatter('tab', data.lastTabId)

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
    const contentArchivesList = document.querySelector('.content .archivesList')
    for (let item of list) {
      const newSidebarArchive = model.createArhiveDOMInSidebar(item.archiveName)
      sidebarArchivesList.appendChild(newSidebarArchive)

      // const newContentArchive = model.createArhiveDOMInContent(item.archiveName)
      // contentArchivesList.appendChild(newnewContentArchiveArchive)
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

// controller.setRootArchiveList()
// controller.clearStorage()

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS8uL3NyYy9vcHRpb25zL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzPzg2ZGYiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2Nzcz9iNDY0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS12YW5pbGxhLy4vc3JjL29wdGlvbnMvc3R5bGVzL25vcm1hbGl6ZS5zY3NzPzMzZDciLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLXZhbmlsbGEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUtdmFuaWxsYS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDbUM7QUFDTjtBQUNJOzs7QUFHakM7QUFDQSxVQUFVLE9BQU87O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBLGVBQWUsVUFBVTtBQUN6QjtBQUNBO0FBQ0EsK0NBQStDLElBQUk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsR0FBRztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLGVBQWU7QUFDNUI7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLGVBQWU7QUFDMUI7O0FBRUEsV0FBVyxlQUFlO0FBQzFCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0NBQW9DO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQyIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGNzcyBidW5kbGVcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwbGljYXRpb24uc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvaW5kZXguc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvbm9ybWFsaXplLnNjc3MnXHJcblxyXG5cclxuLy90byBiZSBmaXhlZFxyXG4vLyBjb25zdCB7IHV1aWQgfSA9ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZHY0JyBcclxuXHJcbi8vIEFyY2hpdmUgcHJvdG9cclxuY29uc3QgQXJjaGl2ZURhdGEgPSBmdW5jdGlvbiAoYXJjaGl2ZU5hbWUpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCBkYXRhID0ge1xyXG4gIGFyY2hpdmU6IHt9LFxyXG4gIGxhc3RUYWJJZDogJycsXHJcbiAgbGFzdEFyY2hpdmVJZDogJydcclxufVxyXG5cclxuY29uc3QgdXRpbHMgPSB7XHJcbiAgaWRGb3JtYXR0ZXI6IGZ1bmN0aW9uICh0eXBlLCBudW0pIHtcclxuICAgIGxldCBtb2RlID0gdHlwZSA9PT0gJ3RhYicgPyA1IDogM1xyXG4gICAgbnVtID0gbnVtICsgJydcclxuICAgIGxldCBvdXRwdXQgPSBudW0uc3BsaXQoJycpXHJcbiAgICBpZiAobnVtLmxlbmd0aCA8IG1vZGUpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlIC0gbnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgb3V0cHV0LnVuc2hpZnQoJzAnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBtb2RlbCA9IHtcclxuICBjcmVhdGVBcmhpdmVET01JblNpZGViYXIoYXJjaGl2ZU5hbWUpIHtcclxuICAgIGNvbnN0IGFyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgYXJjaGl2ZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNhcmV0LXJpZ2h0IGNsb3NlZFwiPjwvaT5cclxuICAgICAgPHA+JHthcmNoaXZlTmFtZX08L3A+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsdXMgbmV3XCI+PC9pPlxyXG4gICAgYFxyXG4gICAgYXJjaGl2ZS5jbGFzc0xpc3QgPSAnYXJjaGl2ZS1zdHlsZSdcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICAvLyA1LzI1IHN0YXJ0IGhlcmUgIDwtLS0tLS1cclxuICBjcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGFyY2hpdmVEYXRhKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGFyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1jYXJldC1yaWdodCBjbG9zZWRcIj48L2k+XHJcbiAgICAgIDxwPiR7YXJjaGl2ZU5hbWV9PC9wPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzIG5ld1wiPjwvaT5cclxuICAgIGBcclxuICAgIGFyY2hpdmUuY2xhc3NMaXN0ID0gJ2FyY2hpdmUtc3R5bGUnXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYkRhdGEpIHtcclxuICAgIGNvbnN0IHsgY3JlYXRlZEF0LCBmaW5pc2hSZWFkaW5nLCBpY29uLCBpZCwgdGFncywgdGl0bGUsIHVwZGF0ZWRBdCwgdXJsIH0gPSB0YWJEYXRhXHJcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgdGFiLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPSdudW1iZXInPlxyXG4gICAgICAgICAgPHA+JHtpZH08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0naWNvbic+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cIiR7aWNvbn1cIiBhbHQ9XCJcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSd0aXRsZSc+XHJcbiAgICAgICAgICA8cD4ke3RpdGxlfTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSd0YWdzJz5cclxuICAgICAgICAgIDxwPiR7dGFnc308L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nY3JlYXRlZEF0Jz5cclxuICAgICAgICAgIDxwPiR7Y3JlYXRlZEF0fTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdidG4nPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nb3Blbi10YWInIGRhdGEtdXJsPVwiJHt1cmx9XCI+XHJcbiAgICAgICAgICAgIE9wZW5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J2J0bic+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWxldGUtdGFiJyBkYXRhLXRhYmlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgRGVsZXRlXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgXHJcbiAgICB0YWIuY2xhc3NMaXN0ICs9ICd0YWIgdGFiLXN0eWxlJ1xyXG4gICAgcmV0dXJuIHRhYlxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0U3RvcmFnZURhdGEodGFyZ2V0RGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbdGFyZ2V0RGF0YV0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlamVjdCEnKVxyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiBmYWxzZSB9LCAocXVlcnlSZXN1bHQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRhYnMgPSBbXVxyXG4gICAgICAgICAgZm9yIChsZXQgdGFiIG9mIHF1ZXJ5UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhYilcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICh0YWIudGl0bGUgPT09IFwiY2hyb21lLnRhYnMgLSBDaHJvbWUgRGV2ZWxvcGVyc1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSBcImNocm9tZTovL2V4dGVuc2lvbnMvXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwuc3BsaXQoJzovLycpWzBdID09PSAnY2hyb21lLWV4dGVuc2lvbicpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRpbnVlIG9uICcgKyB0YWIudGl0bGUpXHJcbiAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiLmlkKVxyXG5cclxuICAgICAgICAgICAgLy8gZm9ybSB0YWJEYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IHsgZmF2SWNvblVybDogaWNvbiwgdGl0bGUsIHVybCB9ID0gdGFiXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGlkXHJcbiAgICAgICAgICAgIGRhdGEubGFzdFRhYklkKytcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcigndGFiJywgZGF0YS5sYXN0VGFiSWQpXHJcblxyXG4gICAgICAgICAgICB0YWJzLnB1c2gobmV3IFRhYkRhdGEoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHRhYnMpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBzdG9yZUFyY2hpdmUoKSB7XHJcbiAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBjb25zdCB7IGFyY2hpdmUgfSA9IGRhdGFcclxuICAgIGFyY2hpdmUuYXJjaGl2ZU5hbWUgPSAncm9vdC1hcmNoaXZlJ1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgbWVzc2FnZTogJ3N0b3JlLWFyY2hpdmUnLFxyXG4gICAgICBkYXRhOiBhcmNoaXZlXHJcbiAgICB9XHJcblxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1tJbmRleF0gJywgbWVzc2FnZSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVtb3ZlVGFiKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICBjb25zdCB0YXJnZXRJZCA9IHRhYklkXHJcblxyXG4gICAgY29uc3QgcmVtb3ZlVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJjaGl2ZS51bmNsYXNzaWZpZWQuaW5kZXhPZih0YWIpXHJcbiAgICAgICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHZpZXcgPSB7XHJcbiAgc2hvd1RhYnNJbkNvbnRlbnQoZGF0YSkge1xyXG4gICAgLy8gZGF0YTogcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcbiAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgZm9yIChsZXQgdGFiIG9mIGRhdGEpIHtcclxuICAgICAgY29uc3QgbmV3VGFiID0gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYilcclxuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFiKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd1Jvb3RBcmNoaXZlTGlzdChsaXN0KSB7XHJcbiAgICAvLyBsaXN0OiByb290LmFyY2hpdmVzTGlzdFxyXG4gICAgY29uc3Qgc2lkZWJhckFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgY29uc3QgY29udGVudEFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50IC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1NpZGViYXJBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGl0ZW0uYXJjaGl2ZU5hbWUpXHJcbiAgICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3U2lkZWJhckFyY2hpdmUpXHJcblxyXG4gICAgICAvLyBjb25zdCBuZXdDb250ZW50QXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluQ29udGVudChpdGVtLmFyY2hpdmVOYW1lKVxyXG4gICAgICAvLyBjb250ZW50QXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld25ld0NvbnRlbnRBcmNoaXZlQXJjaGl2ZSlcclxuICAgIH1cclxuICB9LFxyXG4gIHJlbW92ZVRhYih0YWJCYXIpIHtcclxuICAgIHRhYkJhci5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY29udHJvbGxlciA9IHtcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gZ2V0IGFsbCBhY3RpdmUgdGFic1xyXG4gICAgICBjb25zdCBhY3RpdmVUYWJzID0gYXdhaXQgbW9kZWwuZ2V0QWxsT3BlbmVkVGFicygpXHJcblxyXG4gICAgICAvLyBhZGQgbmV3IHRhYnMgdG8gcm9vdC51bmNsYXNzaWZpZWRcclxuICAgICAgZm9yIChsZXQgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcclxuICAgICAgICBkYXRhLmFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGFuZ2Ugdmlld1xyXG4gICAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfSxcclxuICBpbml0TG9jYWxBcmNoaXZlRGF0YShyZXNwb25zZSkge1xyXG4gICAgLy8gc3RvcmUgaXQgdG8gbG9jYWwgZGF0YVxyXG4gICAgZGF0YS5hcmNoaXZlID0gcmVzcG9uc2VcclxuXHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dUYWJzSW5Db250ZW50KHVuY2xhc3NpZmllZClcclxuXHJcbiAgICBjb25zdCB7IGFyY2hpdmVzTGlzdCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dSb290QXJjaGl2ZUxpc3QoYXJjaGl2ZXNMaXN0KVxyXG4gIH0sXHJcbiAgZGVsZXRlVGFiKHRhcmdldCwgYXJjaGl2ZSwgdGFiSWQpIHtcclxuICAgIC8vIHJlbW92ZSB0YWIgZnJvbSBkYXRhLmFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZSA9IG1vZGVsLnJlbW92ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcucmVtb3ZlVGFiKHRhcmdldClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICAvLyAgZGV2ZWxvcGluZyBtZXRob2RzXHJcbiAgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlIGNsZWFyZWQhJylcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93U3RvcmFnZSgpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbi8vIGNvbnRyb2xsZXIuc2V0Um9vdEFyY2hpdmVMaXN0KClcclxuLy8gY29udHJvbGxlci5jbGVhclN0b3JhZ2UoKVxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZygnW0luZGV4XSBJbmRleC5odG1sIGxvYWRlZCEgQXNrIGZvciBhcmNoaXZlIGRhdGEhJylcclxuICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgbWVzc2FnZTogJ2dldC1hcmNoaXZlLWRhdGEnLFxyXG4gICAgZGF0YTogbnVsbFxyXG4gIH1cclxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAocmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdIHJlY2VpdmVkIGFyY2hpdmUgZGF0YScsIHJlc3BvbnNlKVxyXG4gICAgY29uc3QgeyBhcmNoaXZlLCBsYXN0VGFiSWQsIGxhc3RBcmNoaXZlSWQgfSA9IHJlc3BvbnNlXHJcbiAgICBkYXRhLmxhc3RUYWJJZCA9IGxhc3RUYWJJZFxyXG4gICAgZGF0YS5sYXN0QXJjaGl2ZUlkID0gbGFzdEFyY2hpdmVJZFxyXG4gICAgY29udHJvbGxlci5pbml0TG9jYWxBcmNoaXZlRGF0YShhcmNoaXZlKVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBldmVudExpc3RlbmVyXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuICAvLyBjb25zb2xlLmxvZyh0YXJnZXQpXHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWFsbC1idG4nKSB7XHJcbiAgICBjb250cm9sbGVyLmdldEFsbE9wZW5lZFRhYnMoKVxyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLWFsbCcpIHtcclxuICAgIGNvbnNvbGUubG9nKHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ29wZW4tdGFiJykge1xyXG4gICAgY29uc3QgdXJsID0gdGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLXRhYicpIHtcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0LmRhdGFzZXQudGFiaWRcclxuICAgIGNvbnN0IHRhYkJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlVGFiKHRhYkJhciwgZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dTdG9yYWdlKCdhcmNoaXZlJylcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnY2xlYXItZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2xlYXJTdG9yYWdlKClcclxuICB9XHJcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==