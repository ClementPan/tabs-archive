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
  showEditArchiveInputContent(titleDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.showEditArchiveInputContent(titleDOM)
  },
  cancelEditArchiveInputContent(titleDOM) {
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.cancelEditArchiveInputContent(titleDOM)
  },

  // set up drag and drop system
  setUpDragAndDropSystem() {
    // eventListener in view
    // view calls model to store data
    _view_js__WEBPACK_IMPORTED_MODULE_1__.view.setUpDragAndDropSystem()
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
  const { id, createdAt, url, tags } = tab

  let { icon } = tab
  if (!icon) { icon = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.imageHolder() };

  let { title } = tab
  title = _utils__WEBPACK_IMPORTED_MODULE_0__.utils.escapeHtml(title)

  return `
    <div class='number box'>
      <p>${id}</p>
          </div >
    <div class='icon box'>
      <img src="${icon}" alt="">
    </div>
    <div class='title box'>
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
    newArchive.dataset.archiveId = id
    return newArchive
  },
  createArchiveDOMInContent(archive) {
    const { archiveName, archivesList, unclassified, id } = archive

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
      unclassifiedDOMS = `
      <div class='tab empty tab-style'>
        <p class='empty-tab'>No tab here yet!</p>
      </div>
      `
    }

    const newArchive = document.createElement('div')
    newArchive.innerHTML = `
      <div class='archiveName'>
        <input id="archive${id}-dropdown" class='archive-dropdown' type="checkbox">
        <label for="archive${id}-dropdown">

          <div class='show-indicator'>
            <i class="far fa-folder-open unfold"></i>
            <i class="far fa-folder fold"></i>
          </div>



          <div class='archive-title'>
            <i class='fas fa-times-circle cancel-edit-archive-title-content none'></i>
            <h3 class='title-text'>${archiveName}</h3>
            <input type="text" value="${archiveName}" class='archive-title-input-content none'>
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
  // recursive search prototype //
  searchTabById: function (archive, tabId) {
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
  },
  imageHolder: function () {
    return 'https://via.placeholder.com/32/598392/fff?text=?'
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

const emptyTab = `
  <div class='tab empty tab-style'>
    <p class='empty-tab'>No tab here yet!</p>
  </div>
`

const view = {
  showTabsInContent(data) {
    // data: root.unclassified
    const tabsList = document.querySelector('.tabs-list')
    tabsList.innerHTML = ''

    if (!data.length) {
      tabsList.innerHTML = emptyTab
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
  updateTabName(targetTabDOM, tabNameInput) {
    const titleP = targetTabDOM.querySelector('.title p')
    titleP.textContent = tabNameInput
  },
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
      console.log('target id: ' + target.id)
      const payload = target.id

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

// eventListener
window.addEventListener('click', (e) => {
  const target = e.target

  // cancel show input
  // controller.cancelNewArchiveInput()

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

  // show edit archive name content
  if (target.classList.contains('edit-archive-title-content')) {
    const titleDOM = target.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.showEditArchiveInputContent(titleDOM)
  }

  if (target.classList.contains('cancel-edit-archive-title-content')) {
    const titleDOM = target.parentElement
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.cancelEditArchiveInputContent(titleDOM)
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
    _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.deleteAllTabsInArchive(archiveId)
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

// KeyboardEvent
window.addEventListener('keydown', (e) => {
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
})





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0M7QUFDRjtBQUNBOztBQUV6QjtBQUNQO0FB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Q0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7QUN0Yk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQmtDO0FBQ0Y7OztBQUdoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsdUJBQXVCLFVBQVU7QUFDakMsR0FBRztBQUNILHNCQUFzQixVQUFVO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGtFQUEyQjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MscUVBQThCO0FBQzlEOztBQUVBLGdDQUFnQyxzRUFBK0I7QUFDL0Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsMEJBQTBCLHFFQUE4Qjs7QUFFeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSwwQkFBMEIsc0VBQStCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FLFVBQVU7QUFDN0U7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsb0NBQW9DLFVBQVU7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxnQ0FBZ0M7QUFDdkYsc0RBQXNELGdDQUFnQztBQUN0Rix1REFBdUQsZ0NBQWdDO0FBQ3ZGLGtEQUFrRCxtREFBbUQ7QUFDckcsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLHFEQUFxRCxnQ0FBZ0M7QUFDckYsb0RBQW9ELGdDQUFnQztBQUNwRixxREFBcUQsZ0NBQWdDO0FBQ3JGLGdEQUFnRCw0Q0FBNEM7QUFDNUYsR0FBRztBQUNIO0FBQ0EsMERBQTBELGdDQUFnQztBQUMxRix5REFBeUQsZ0NBQWdDO0FBQ3pGLDBEQUEwRCxnQ0FBZ0M7QUFDMUYsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsU0FBUztBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixnRUFBeUI7O0FBRTdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksc0RBQWUsQ0FBQyxrREFBWTs7QUFFaEMsMEJBQTBCLDhEQUF1QixDQUFDLGtEQUFZO0FBQzlEOztBQUVBO0FBQ0EsSUFBSSx5REFBa0I7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxTQUFTO0FBQ3ZEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixnRUFBeUI7O0FBRTdDO0FBQ0E7QUFDQSxJQUFJLHNEQUFlLENBQUMsa0RBQVk7QUFDaEM7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQiw4REFBdUIsQ0FBQyxrREFBWTtBQUM5RDs7QUFFQTtBQUNBLElBQUkseURBQWtCOztBQUV0QjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztVQzFYQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDRTtBQUNOOztBQUVHO0FBQ1k7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxvQ0FBb0M7QUFDL0MsSUFBSSxvREFBYztBQUNsQixJQUFJLHdEQUFrQjtBQUN0QixJQUFJLDJFQUErQjs7QUFFbkM7QUFDQSxJQUFJLDZFQUFpQztBQUNyQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksdUVBQTJCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7O0FBRUE7QUFDQTtBQUNBLElBQUksMEVBQThCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSxJQUFJLDRFQUFnQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx1RUFBMkI7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyRUFBK0I7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5RUFBNkI7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBd0I7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrRkFBc0M7QUFDMUM7O0FBRUE7QUFDQTtBQUNBLElBQUksb0ZBQXdDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBb0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBd0I7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2RUFBaUM7QUFDckM7Ozs7QUFJQTtBQUNBO0FBQ0EsSUFBSSxrRUFBc0I7QUFDMUI7O0FBRUE7QUFDQSxJQUFJLG1FQUF1QjtBQUMzQjtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHVFQUEyQjtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxvRUFBd0I7QUFDOUI7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldy5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBvcGVuQWxsVGFicyhhcmNoaXZlSWQpIHtcclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHVuY2xhc3NpZmllZC5mb3JFYWNoKGVhY2ggPT4ge1xyXG4gICAgICBjb25zdCB1cmwgPSBlYWNoLnVybFxyXG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZGVsZXRlVGFiKHRhcmdldCwgdGFiSWQpIHtcclxuICAgIC8vIHRhcmdldDogRE9NIGVsZW1udFxyXG5cclxuICAgIC8vIHJldHVybiBuZXdBcmNoaXZlIHdpdGggdGFyZ2V0IHRhYlxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLnJlbW92ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5yZW1vdmVUYWIodGFyZ2V0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIGRlbGV0ZUFsbFRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyBjaGVjazogaWYgaXMgYWxyZWFkeSBlbXB0eVxyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gYC5hcmNoaXZlLSR7YXJjaGl2ZUlkfS1jb250ZW50IC50YWJzLWxpc3QgLnRhYmBcclxuICAgIGNvbnN0IHRhYkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpXHJcbiAgICBpZiAoKHRhYkl0ZW1zLmxlbmd0aCA9PT0gMSkgJiYgKHRhYkl0ZW1zWzBdLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVtb3ZlIHRhYlxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLmNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcblxyXG4gICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZSA9IG5ld0FyY2hpdmVcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LmNsZWFyVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgZGVsZXRlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpIHtcclxuICAgIC8vIHJldHVybiBuZXdBcmNoaXZlIHdpdGggdGFyZ2V0IGFyY2hpdmVcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5yZW1vdmVBcmNoaXZlKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlldywgYm90aCBpbiBzaWRlYmFyICYgY29udGVudCAobmVlZCBhcmNoaXZlSWQpXHJcbiAgICB2aWV3LnJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIC8vIGNyZWF0aW5nIG5ldyBhcmNoaXZlXHJcbiAgc2hvd05ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIHZpZXcuc2hvd05ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlKCkge1xyXG4gICAgLy8gZ2V0IHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IGFyY2hpdmVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyY2hpdmVOYW1lLWlucHV0JykudmFsdWVcclxuXHJcbiAgICAvLyBubyBlbXB0eSBpbnB1dCBhbGxvd2VkXHJcbiAgICBpZiAoIWFyY2hpdmVOYW1lKSB7XHJcbiAgICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICAgICAgY29uc29sZS5sb2coJ05vIGVtcHR5IGlucHV0IGFsbG93ZWQhJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXQgYXJjaGl2ZSBkYXRhLCBhZGQgbmV3IGFyY2hpdmUgaW4gZGF0YVxyXG4gICAgLy8gbmV3QXJjaGl2ZTogZGF0YVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZU5ld0FyY2hpdmVJbkRhdGEoYXJjaGl2ZU5hbWUpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5jcmVhdGVOZXdBcmNoaXZlSW5TaWRlYmFyKG5ld0FyY2hpdmUpXHJcbiAgICB2aWV3LmNyZWF0ZU5ld0FyY2hpdmVJbkNvbnRlbnQobmV3QXJjaGl2ZSlcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gcmVzdG9yZSBVSVxyXG4gICAgdmlldy5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgY2FuY2VsTmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgdmlldy5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH0sXHJcbiAgLy8gZWRpdGluZyB0YWIgbmFtZSh0aXRsZSlcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfSxcclxuICB1cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSkge1xyXG4gICAgLy8gZ2V0IHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0VGFiRE9NLmRhdGFzZXQuaWRcclxuICAgIGNvbnN0IHRhYk5hbWVJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgaW5wdXQnKS52YWx1ZVxyXG5cclxuICAgIC8vIGNoZWNrXHJcbiAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJykudGV4dENvbnRlbnRcclxuICAgIGlmIChvcmlnaW5hbFRpdGxlID09PSB0YWJOYW1lSW5wdXQpIHtcclxuICAgICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gZmluZCB0YWIgaW4gYXJjaGl2ZSB2aWEgdGFiSWQsIHVwZGF0ZSBpdFxyXG4gICAgbW9kZWwudXBkYXRlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQsIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3IFxyXG4gICAgdmlldy51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSwgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICAvLyBlZGl0aW5nIGFyY2hpdmUgdGl0bGVcclxuICBzaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pIHtcclxuICAgIHZpZXcuc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKVxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pIHtcclxuICAgIHZpZXcuY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pXHJcbiAgfSxcclxuXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtXHJcbiAgc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpIHtcclxuICAgIC8vIGV2ZW50TGlzdGVuZXIgaW4gdmlld1xyXG4gICAgLy8gdmlldyBjYWxscyBtb2RlbCB0byBzdG9yZSBkYXRhXHJcbiAgICB2aWV3LnNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKVxyXG4gIH0sXHJcblxyXG4gIC8vICBkZXZlbG9waW5nIG1ldGhvZHNcclxuICBjbGVhclN0b3JhZ2UoKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmNsZWFyKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1N0b3JhZ2UgY2xlYXJlZCEnKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNob3dTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydhcmNoaXZlJ10sIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImV4cG9ydCBjb25zdCBkYXRhID0ge1xyXG4gIGFyY2hpdmU6IHt9LFxyXG4gIGxhc3RUYWJJZDogJycsXHJcbiAgbGFzdEFyY2hpdmVJZDogJydcclxufSIsImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuLy8gICBhcmNoaXZlOiB7fSxcclxuLy8gICBsYXN0VGFiSWQ6ICcnLFxyXG4vLyAgIGxhc3RBcmNoaXZlSWQ6ICcnXHJcblxyXG4vLyBBcmNoaXZlIHByb3RvXHJcbmNvbnN0IEFyY2hpdmVEYXRhID0gZnVuY3Rpb24gKGFyY2hpdmVOYW1lLCBpZCkge1xyXG4gIHRoaXMuYXJjaGl2ZU5hbWUgPSBhcmNoaXZlTmFtZSB8fCAnTmV3IEFyY2hpdmUnXHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy5hcmNoaXZlc0xpc3QgPSBbXVxyXG4gIHRoaXMudW5jbGFzc2lmaWVkID0gW11cclxufVxyXG5cclxuY29uc3QgVGFiRGF0YSA9IGZ1bmN0aW9uIChpZCwgaWNvbiwgdGl0bGUsIHRhZ3MsIGNyZWF0ZWRBdCwgdXJsLCB1cGRhdGVkQXQpIHtcclxuICB0aGlzLmlkID0gaWRcclxuICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICB0aGlzLnVybCA9IHVybFxyXG4gIHRoaXMuaWNvbiA9IGljb25cclxuICB0aGlzLmNyZWF0ZWRBdCA9IGNyZWF0ZWRBdFxyXG4gIHRoaXMudXBkYXRlZEF0ID0gdXBkYXRlZEF0XHJcbiAgdGhpcy5maW5pc2hSZWFkaW5nID0gZmFsc2VcclxuICB0aGlzLnRhZ3MgPSB0YWdzXHJcbn1cclxuXHJcbmNvbnN0IHRhYklubmVyVGVtcGxhdGUgPSBmdW5jdGlvbiAodGFiKSB7XHJcbiAgY29uc3QgeyBpZCwgY3JlYXRlZEF0LCB1cmwsIHRhZ3MgfSA9IHRhYlxyXG5cclxuICBsZXQgeyBpY29uIH0gPSB0YWJcclxuICBpZiAoIWljb24pIHsgaWNvbiA9IHV0aWxzLmltYWdlSG9sZGVyKCkgfTtcclxuXHJcbiAgbGV0IHsgdGl0bGUgfSA9IHRhYlxyXG4gIHRpdGxlID0gdXRpbHMuZXNjYXBlSHRtbCh0aXRsZSlcclxuXHJcbiAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9J251bWJlciBib3gnPlxyXG4gICAgICA8cD4ke2lkfTwvcD5cclxuICAgICAgICAgIDwvZGl2ID5cclxuICAgIDxkaXYgY2xhc3M9J2ljb24gYm94Jz5cclxuICAgICAgPGltZyBzcmM9XCIke2ljb259XCIgYWx0PVwiXCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J3RpdGxlIGJveCc+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBjYW5jZWwtZWRpdC10YWItaW5wdXQgbm9uZVwiPjwvaT5cclxuXHJcbiAgICAgIDxwPiR7dGl0bGV9PC9wPlxyXG5cclxuICAgICAgPGlucHV0IGNsYXNzPSdlZGl0LXRhYi1uYW1lLWlucHV0IG5vbmUnIHBsYWNlaG9sZGVyPScke3RpdGxlfScgdHlwZT1cInRleHRcIiBtYXhsZW5ndGg9XCI0NVwiPlxyXG5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuLWFsdCBzaG93LWVkaXQtdGFiLW5hbWVcIj48L2k+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZSBjb25maXJtLXRhYi1lZGl0IG5vbmVcIiBkYXRhLWlkPVwiJHtpZH1cIj48L2k+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSd0YWdzIGJveCc+XHJcbiAgICAgIDxwPiR7dGFnc308L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2NyZWF0ZWRBdCBib3gnPlxyXG4gICAgICA8cD4ke2NyZWF0ZWRBdH08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdvcGVuLXRhYicgZGF0YS11cmw9XCIke3VybH1cIj5cclxuICAgICAgICBvcGVuXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdidG4gYm94Jz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLXRhYicgZGF0YS10YWJpZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgZGVsZXRlXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbW9kZWwgPSB7XHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluRGF0YShhcmNoaXZlTmFtZSkge1xyXG4gICAgY29uc3QgbmV3SWQgPSBkYXRhLmxhc3RBcmNoaXZlSWQgKz0gMVxyXG4gICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcignYXJjaGl2ZScsIG5ld0lkKVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmVEYXRhID0gbmV3IEFyY2hpdmVEYXRhKGFyY2hpdmVOYW1lLCBpZClcclxuXHJcbiAgICAvLyBwdXNoIG5ld0FyY2hpdmVEYXRhIHRvIGRhdGEuYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlLmFyY2hpdmVzTGlzdC5wdXNoKG5ld0FyY2hpdmVEYXRhKVxyXG5cclxuICAgIHJldHVybiBuZXdBcmNoaXZlRGF0YVxyXG4gIH0sXHJcbiAgY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGlkIH0gPSBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIG5ld0FyY2hpdmUuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8YSBocmVmPVwiI2FyY2hpdmUtJHtpZH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZm9sZGVyXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxwPiR7YXJjaGl2ZU5hbWV9PC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgZGVsZXRlLWFyY2hpdmVcIiBkYXRhLWlkPVwiJHtpZH1cIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvYT5cclxuICAgIGBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gJ2FyY2hpdmUgYXJjaGl2ZS1zdHlsZSdcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIGNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoYXJjaGl2ZSkge1xyXG4gICAgY29uc3QgeyBhcmNoaXZlTmFtZSwgYXJjaGl2ZXNMaXN0LCB1bmNsYXNzaWZpZWQsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gICAgbGV0IHVuY2xhc3NpZmllZERPTVMgPSAnJ1xyXG5cclxuICAgIGlmICh1bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSB1bmNsYXNzaWZpZWQubWFwKGVhY2ggPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSd0YWIgdGFiLXN0eWxlJyBkcmFnZ2FibGU9XCJ0cnVlXCIgaWQ9XCJ0YWItJHtlYWNoLmlkfVwiIGRhdGEtaWQ9XCIke2VhY2guaWR9XCI+XHJcbiAgICAgICAgICAgICR7dGFiSW5uZXJUZW1wbGF0ZShlYWNoKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgICAgfSkuam9pbignJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0nYXJjaGl2ZU5hbWUnPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiIGNsYXNzPSdhcmNoaXZlLWRyb3Bkb3duJyB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCI+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz0nc2hvdy1pbmRpY2F0b3InPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1mb2xkZXItb3BlbiB1bmZvbGRcIj48L2k+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWZvbGRlciBmb2xkXCI+PC9pPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSdhcmNoaXZlLXRpdGxlJz5cclxuICAgICAgICAgICAgPGkgY2xhc3M9J2ZhcyBmYS10aW1lcy1jaXJjbGUgY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50IG5vbmUnPjwvaT5cclxuICAgICAgICAgICAgPGgzIGNsYXNzPSd0aXRsZS10ZXh0Jz4ke2FyY2hpdmVOYW1lfTwvaDM+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHthcmNoaXZlTmFtZX1cIiBjbGFzcz0nYXJjaGl2ZS10aXRsZS1pbnB1dC1jb250ZW50IG5vbmUnPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW4tYWx0IGVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50XCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVjay1jaXJjbGUgY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQgbm9uZVwiPjwvaT5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bnNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0blwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJvcGVuLWFsbFwiIGRhdGEtaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgICAgICAgT3BlbiBBbGxcclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWxldGUtYWxsLWluLWFyY2hpdmUnIGRhdGEtaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgICAgICAgRGVsZXRlIEFsbFxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmUtY29udGVudFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmVzTGlzdFwiPlxyXG4gICAgICAgICAgICA8cD4ke2FyY2hpdmVzTGlzdH08L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzLWxpc3RcIj5cclxuICAgICAgICAgICAgJHt1bmNsYXNzaWZpZWRET01TfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYFxyXG4gICAgbmV3QXJjaGl2ZS5pZCA9IGBhcmNoaXZlLSR7aWR9YFxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSBgYXJjaGl2ZSBkcm9wem9uZSBhcmNoaXZlLXN0eWxlIGFyY2hpdmUtJHtpZH0tY29udGVudGBcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIGNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWJEYXRhKSB7XHJcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgdGFiLmlubmVySFRNTCA9IHRhYklubmVyVGVtcGxhdGUodGFiRGF0YSlcclxuICAgIHRhYi5jbGFzc0xpc3QgKz0gJ3RhYiB0YWItc3R5bGUnXHJcbiAgICB0YWIuaWQgPSBgdGFiLSR7dGFiRGF0YS5pZH1gXHJcbiAgICB0YWIuZGF0YXNldC5pZCA9IHRhYkRhdGEuaWRcclxuICAgIHRhYi5kcmFnZ2FibGUgPSB0cnVlXHJcbiAgICByZXR1cm4gdGFiXHJcbiAgfSxcclxuICBhc3luYyBnZXRTdG9yYWdlRGF0YSh0YXJnZXREYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVqZWN0IScpXHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IGZhbHNlIH0sIChxdWVyeVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGFicyA9IFtdXHJcbiAgICAgICAgICBmb3IgKGxldCB0YWIgb2YgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICh0YWIudGl0bGUgPT09IFwiY2hyb21lLnRhYnMgLSBDaHJvbWUgRGV2ZWxvcGVyc1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSBcImNocm9tZTovL2V4dGVuc2lvbnMvXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwuc3BsaXQoJzovLycpWzBdID09PSAnY2hyb21lLWV4dGVuc2lvbicpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwgPT09ICdjaHJvbWU6Ly9uZXd0YWIvJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiLmlkKVxyXG5cclxuICAgICAgICAgICAgLy8gZm9ybSB0YWJEYXRhXHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHRpdGxlID0gdXRpbHMudHJpbVN0cmluZyh1dGlscy5lc2NhcGVIdG1sKHRhYi50aXRsZSksIDQ1KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgeyBmYXZJY29uVXJsOiBpY29uLCB1cmwsIHRpdGxlIH0gPSB0YWJcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3poLXR3JylcclxuICAgICAgICAgICAgY29uc3QgdGFncyA9IFtdXHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgaWRcclxuICAgICAgICAgICAgZGF0YS5sYXN0VGFiSWQrK1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHV0aWxzLmlkRm9ybWF0dGVyKCd0YWInLCBkYXRhLmxhc3RUYWJJZClcclxuXHJcbiAgICAgICAgICAgIHRhYnMucHVzaChuZXcgVGFiRGF0YShpZCwgaWNvbiwgdGl0bGUsIHRhZ3MsIGNyZWF0ZWRBdCwgdXJsLCB1cGRhdGVkQXQpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUodGFicylcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHN0b3JlQXJjaGl2ZSgpIHtcclxuICAgIC8vIHN0b3JlIGRlZmF1bHRBcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSB9ID0gZGF0YVxyXG4gICAgYXJjaGl2ZS5hcmNoaXZlTmFtZSA9ICdyb290LWFyY2hpdmUnXHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICBtZXNzYWdlOiAnc3RvcmUtYXJjaGl2ZScsXHJcbiAgICAgIGRhdGE6IGFyY2hpdmVcclxuICAgIH1cclxuXHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAobWVzc2FnZSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnW0luZGV4XSAnLCBtZXNzYWdlKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVUYWIoYXJjaGl2ZSwgdGFiSWQsIHRhYk5hbWVJbnB1dCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gdGFiSWRcclxuICAgIGNvbnNvbGUubG9nKCdpbiB1cGRhdGVUYWInLCB0YWJOYW1lSW5wdXQpXHJcblxyXG4gICAgY29uc3QgZmluZFRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2luIGZpbmRUYWJCeUlkJywgdGFiTmFtZUlucHV0KVxyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW4gaGl0OiAnLCB0YWJOYW1lSW5wdXQpXHJcbiAgICAgICAgICAgIHRhYi50aXRsZSA9IHRhYk5hbWVJbnB1dFxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZFRhYkJ5SWQoYXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgfSxcclxuICByZW1vdmVUYWIoYXJjaGl2ZSwgdGFiSWQpIHtcclxuICAgIGNvbnN0IHRhcmdldElkID0gdGFiSWRcclxuXHJcbiAgICBjb25zdCByZW1vdmVUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiBhcmNoaXZlLnVuY2xhc3NpZmllZCkge1xyXG4gICAgICAgICAgaWYgKHRhYi5pZCA9PT0gdGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhcmNoaXZlLnVuY2xhc3NpZmllZC5pbmRleE9mKHRhYilcclxuICAgICAgICAgICAgYXJjaGl2ZS51bmNsYXNzaWZpZWQuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZVRhYkJ5SWQoYXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH0sXHJcbiAgcmVtb3ZlQXJjaGl2ZShhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZUFyY2hpdmVCeUlkID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhcmNoaXZlLmFyY2hpdmVzTGlzdC5pbmRleE9mKHN1YkFyY2hpdmUpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KVxyXG4gICAgICAgICAgICBhcmNoaXZlLmFyY2hpdmVzTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZUFyY2hpdmVCeUlkKHN1YkFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQXJjaGl2ZUJ5SWQoYXJjaGl2ZSlcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICBjbGVhclRhYnNJbkFyY2hpdmVCeUlkKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcbiAgICBsZXQgdGFyZ2V0QXJjaGl2ZSA9IHt9XHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZCA9IFtdXHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBhcmNoaXZlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIHN1YkFyY2hpdmUudW5jbGFzc2lmaWVkID0gW11cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBzdWJBcmNoaXZlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICAgIHJldHVybiB0YXJnZXRBcmNoaXZlXHJcbiAgfSxcclxuICBzZWFyY2hBcmNoaXZlQnlJZChhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG4gICAgbGV0IHRhcmdldEFyY2hpdmUgPSB7fVxyXG5cclxuICAgIGNvbnN0IGZpbmRBcmNoaXZlID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKHRhcmdldElkID09PSBhcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBhcmNoaXZlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gc3ViQXJjaGl2ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlubmVyQXJjaGl2ZSBvZiBzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICAgIGZpbmRBcmNoaXZlKGlubmVyQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBcmNoaXZlKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZVxyXG4gIH0sXHJcbiAgZ2V0VGFiRGF0YVZpYVRhYkRPTSh0YWJET00pIHtcclxuICAgIHJldHVybiAoe1xyXG4gICAgICBpZDogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXIgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICBpY29uOiB0YWJET00ucXVlcnlTZWxlY3RvcignLmljb24gaW1nJykuc3JjLFxyXG4gICAgICB0aXRsZTogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJykudGV4dENvbnRlbnQsXHJcbiAgICAgIHRhZ3M6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGFncyBwJykudGV4dENvbnRlbnQsXHJcbiAgICAgIGNyZWF0ZWRBdDogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGVkQXQgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICB1cmw6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuYnRuIGJ1dHRvbicpLmRhdGFzZXQudXJsLFxyXG4gICAgICB1cGRhdGVkQXQ6ICcnXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8gcmVjdXJzaXZlIHNlYXJjaCBwcm90b3R5cGUgLy9cclxuICBzZWFyY2hUYWJCeUlkOiBmdW5jdGlvbiAoYXJjaGl2ZSwgdGFiSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IHRhYklkXHJcblxyXG4gICAgY29uc3QgZmluZFRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiBhcmNoaXZlLnVuY2xhc3NpZmllZCkge1xyXG4gICAgICAgICAgaWYgKHRhYi5pZCA9PT0gdGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGFiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICB9XHJcbn0iLCJleHBvcnQgY29uc3QgdXRpbHMgPSB7XHJcbiAgaWRGb3JtYXR0ZXI6IGZ1bmN0aW9uICh0eXBlLCBudW0pIHtcclxuICAgIC8vIHR5cGUgPSBcInRhYlwiIHx8IFwiYXJjaGl2ZVwiXHJcbiAgICBsZXQgbW9kZSA9IHR5cGUgPT09ICd0YWInID8gNSA6IDNcclxuICAgIG51bSA9IG51bSArICcnXHJcbiAgICBsZXQgb3V0cHV0ID0gbnVtLnNwbGl0KCcnKVxyXG4gICAgaWYgKG51bS5sZW5ndGggPCBtb2RlKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZSAtIG51bS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG91dHB1dC51bnNoaWZ0KCcwJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxyXG4gIH0sXHJcbiAgZXNjYXBlSHRtbDogZnVuY3Rpb24gKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZ1xyXG4gICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG4gIH0sXHJcbiAgdHJpbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZywgbWV4bGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBtZXhsZW5ndGgpXHJcbiAgfSxcclxuICBpbWFnZUhvbGRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMzIvNTk4MzkyL2ZmZj90ZXh0PT8nXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsLmpzJ1xyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5cclxuXHJcbi8vIG5vdCBkb25lXHJcbmNvbnN0IGRldGVjdERyb3BMb2NhdGlvbiA9IGZ1bmN0aW9uICh0YWJJZCwgZHJhZ2VudGVyLCBkcmFnbGVhdmUpIHtcclxuICBjb25zb2xlLmxvZygndGFiSWQ6ICAgICAnICsgdGFiSWQpXHJcbiAgY29uc29sZS5sb2coJ2RyYWdlbnRlcjogJyArIGRyYWdlbnRlcilcclxuICBjb25zb2xlLmxvZygnZHJhZ2xlYXZlOiAnICsgZHJhZ2xlYXZlKVxyXG4gIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0nKVxyXG4gIGxldCByZXN1bHQgPSAnbm8gZGV0ZWN0J1xyXG4gIGlmICgodGFiSWQgPT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpKSB7XHJcbiAgICByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuICB9IGVsc2UgaWYgKCh0YWJJZCAhPT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSkpIHtcclxuICAgIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG4gIH0gZWxzZSBpZiAoKGRyYWdlbnRlciA9PT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpKSB7XHJcbiAgICByZXN1bHQgPSBgYmVmb3JlICR7ZHJhZ2xlYXZlfWBcclxuICB9IGVsc2UgaWYgKChkcmFnZW50ZXIgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKSkge1xyXG4gICAgcmVzdWx0ID0gYGFmdGVyICR7ZHJhZ2VudGVyfWBcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKCdyZXN1bHQ6ICcgKyByZXN1bHQpXHJcbiAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLScpXHJcbiAgcmV0dXJuXHJcbn1cclxuXHJcbi8vICh0YWJJZCA9PT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSlcclxuLy8gQSBBIEFcclxuLy8gcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcblxyXG4vLyAodGFiSWQgIT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpXHJcbi8vIEEgQiBBXHJcbi8vIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG5cclxuLy8gKGRyYWdlbnRlciA9PT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpXHJcbi8vIEEgQiBCIFxyXG4vLyBkcmFnbGVhdmUg55qE5YmN5LiA5YCLXHJcblxyXG4vLyAoZHJhZ2VudGVyICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcilcclxuLy8gQSBCIENcclxuLy8gZHJhZ2xlYXZlIOeahOWJjeS4gOWAi1xyXG5cclxuY29uc3QgZW1wdHlUYWIgPSBgXHJcbiAgPGRpdiBjbGFzcz0ndGFiIGVtcHR5IHRhYi1zdHlsZSc+XHJcbiAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gIDwvZGl2PlxyXG5gXHJcblxyXG5leHBvcnQgY29uc3QgdmlldyA9IHtcclxuICBzaG93VGFic0luQ29udGVudChkYXRhKSB7XHJcbiAgICAvLyBkYXRhOiByb290LnVuY2xhc3NpZmllZFxyXG4gICAgY29uc3QgdGFic0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuICAgIHRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcblxyXG4gICAgaWYgKCFkYXRhLmxlbmd0aCkge1xyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSBlbXB0eVRhYlxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHRhYiBvZiBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IG5ld1RhYiA9IG1vZGVsLmNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWIpXHJcbiAgICAgIC8vIGFkZCBldmVudExpc3RlbmVyIHRvIG5ldyB0YWJzIC8vXHJcbiAgICAgIHRoaXMuc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbShuZXdUYWIpXHJcblxyXG4gICAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZChuZXdUYWIpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93Um9vdEFyY2hpdmVMaXN0KGxpc3QpIHtcclxuICAgIC8vIGxpc3Q6IHJvb3QuYXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5cclxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBuZXdTaWRlYmFyQXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihpdGVtKVxyXG4gICAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld1NpZGViYXJBcmNoaXZlKVxyXG5cclxuICAgICAgY29uc3QgbmV3Q29udGVudEFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGl0ZW0pXHJcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q29udGVudEFyY2hpdmUpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93TmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgLy8gaGlkZSBpbnB1dCBpY29uXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmljb24nKVxyXG4gICAgaWNvbi5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG5cclxuICAgIC8vIGhpZGUgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcCcpXHJcbiAgICBpZiAoIXAuY2xhc3NOYW1lLmluY2x1ZGVzKCdub25lJykpIHtcclxuICAgICAgcC5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3cgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcblxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2FuY2VsIE5ldyBBcmNoaXZlIElucHV0JylcclxuXHJcbiAgICAvL3Jlc3RvcmUgXHJcbiAgICAvLyBoaWRlIGlucHV0IFVJXHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IGlucHV0JylcclxuICAgIGNvbnN0IGNhbmNlbEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY2FuY2VsJylcclxuICAgIGNvbnN0IGNvbmZpcm1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNvbmZpcm0nKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICAgIGNvbmZpcm1JY29uLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dCBpY29uXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmljb24nKVxyXG4gICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgICAvLyBzaG93IDxwPlxyXG4gICAgY29uc3QgcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IHAuc2hvdy1uZXctYXJjaGl2ZS1pbnB1dCcpXHJcbiAgICBwLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIGNsZWFyIGlucHV0IHZhbHVlXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJjaGl2ZU5hbWUtaW5wdXQnKS52YWx1ZSA9ICcnXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5TaWRlYmFyKG5ld0FyY2hpdmUpIHtcclxuICAgIGNvbnN0IG5ld0FyY2hpdmVET00gPSBtb2RlbC5jcmVhdGVBcmhpdmVET01JblNpZGViYXIobmV3QXJjaGl2ZSlcclxuXHJcbiAgICAvLyBwdXNoIG5ld0FyY2hpdmVET00gaW50byBzaWRlYmFyQXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld0FyY2hpdmVET00pXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5Db250ZW50KG5ld0FyY2hpdmUpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRE9NID0gbW9kZWwuY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChuZXdBcmNoaXZlKVxyXG4gICAgdGhpcy5zZXRVcEFyY2hpdmVEcmFnQW5kRHJvcFN5c3RlbShuZXdBcmNoaXZlRE9NKVxyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChuZXdBcmNoaXZlRE9NKVxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gaGlkZSAudGl0bGUgcFxyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHBhc3MgdGl0bGUgdG8gaW5wdXQgdmFsdWVcclxuICAgIGlucHV0LnZhbHVlID0gdGl0bGVQLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dFxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwtRWRpdC1UYWItSW5wdXQnKVxyXG5cclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gdG8gc2hvd1xyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgLy8gdG8gaGlkZVxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICB9LFxyXG4gIHVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICB0aXRsZVAudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICB9LFxyXG4gIHNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiAudGl0bGUtdGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHVwZGF0ZUljb24sIGNhbmNlbEljb25cclxuICAgIHVwZGF0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiB1cGRhdGVJY29uLCBjYW5jZWxJY29uXHJcbiAgICB1cGRhdGVJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHRpdGxlVGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICB9LFxyXG4gIHJlbW92ZVRhYih0YWJCYXIpIHtcclxuICAgIHRhYkJhci5yZW1vdmUoKVxyXG4gIH0sXHJcbiAgcmVtb3ZlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpIHtcclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gICAgYXJjaGl2ZUJhci5yZW1vdmUoKVxyXG5cclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGluIGNvbnRlbnRcclxuICAgIGNvbnN0IGFyY2hpdmVCYXJJbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYXJjaGl2ZS0ke2FyY2hpdmVJZH1gKVxyXG4gICAgYXJjaGl2ZUJhckluQ29udGVudC5yZW1vdmUoKVxyXG5cclxuICB9LFxyXG4gIGNsZWFyVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdhcmNoaXZlSWQ6ICcsIGFyY2hpdmVJZClcclxuICAgIC8vIHJldHVyblxyXG4gICAgbGV0IHVuY2xhc3NpZmllZExpc3QgPSAnJ1xyXG5cclxuICAgIGlmIChhcmNoaXZlSWQgPT09ICcwMDEnKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkIC50YWJzLWxpc3QnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY2xhc3NOYW1lID0gYC5hcmNoaXZlLSR7YXJjaGl2ZUlkfS1jb250ZW50IC50YWJzLWxpc3RgXHJcbiAgICAgIHVuY2xhc3NpZmllZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSlcclxuICAgIH1cclxuXHJcbiAgICB1bmNsYXNzaWZpZWRMaXN0LmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0ndGFiIGVtcHR5IHRhYi1zdHlsZSc+XHJcbiAgICAgICAgPHAgY2xhc3M9J2VtcHR5LXRhYic+Tm8gdGFiIGhlcmUgeWV0ITwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIGBcclxuICB9LFxyXG4gIC8vIGRyYWcgYW5kIGRyb3AgaGFuZGxlcnNcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIGN1cnJlbnQgZGF0YVxyXG4gIC8vIGFyY2hpdmVzIGFuZCB0YWJzXHJcbiAgc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpIHtcclxuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuXHJcbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRoaXMuc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbSh0YWIpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZTogdW5jbGFzc2lmaWVkLCBkcm9wem9uZVxyXG4gICAgY29uc3QgZHJvcHpvbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3B6b25lJylcclxuICAgIGNvbnN0IHVuY2xhc3NpZmllZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQnKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3IgYXJjaGl2ZXNcclxuICAgIGRyb3B6b25lcy5mb3JFYWNoKGRyb3B6b25lID0+IHRoaXMuc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0oZHJvcHpvbmUpKVxyXG5cclxuICAgIC8vIHNldCB1cCBkcm9wem9uZSBmb3Igcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIHRoaXMuc2V0VXBVbmNsYXNzaWZpZWREcmFnQW5kRHJvcFN5c3RlbSh1bmNsYXNzaWZpZWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHsgdGhpcy51bmNsYXNzaWZpZWREcm9wcGVkSGFuZGxlcihlLCB1bmNsYXNzaWZpZWQpIH0pXHJcbiAgfSxcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIG5ldyBjcmVhdGVkIHRhYlxyXG4gIHNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0odGFiRE9NKSB7XHJcbiAgICAvLyBlbXB0eSB0YWIgaXMgbm90IGRyYWdnYWJsZVxyXG4gICAgaWYgKHRhYkRPTS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpIHJldHVyblxyXG5cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG4gICAgICBjb25zb2xlLmxvZygndGFyZ2V0IGlkOiAnICsgdGFyZ2V0LmlkKVxyXG4gICAgICBjb25zdCBwYXlsb2FkID0gdGFyZ2V0LmlkXHJcblxyXG4gICAgICAvLyBkYXRhVHJhbnNmZXIuc2V0RGF0YVxyXG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgcGF5bG9hZClcclxuICAgIH0pXHJcblxyXG4gICAgLy8gZGV0ZWN0IGRyb3AgbG9jYXRpb25cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8vIGRyYWdlbnRlciA9IHRhYi5pZFxyXG4gICAgICAvLyBjb25zb2xlLmxvZygnZHJhZ2VudGVyOiAnICsgZHJhZ2VudGVyKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgLy8gZHJhZ2xlYXZlID0gdGFiLmlkXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIC8vIHNldCB1cCBkcmFnIGFuZCBkcm9wIHN5c3RlbSBmb3IgbmV3IGNyZWF0ZWQgYXJjaGl2ZVxyXG4gIHNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKGFyY2hpdmVET00pIHtcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHsgdGhpcy5hcmNoaXZlRHJvcHBlZEhhbmRsZXIoZSwgYXJjaGl2ZURPTSkgfSlcclxuICB9LFxyXG4gIHNldFVwVW5jbGFzc2lmaWVkRHJhZ0FuZERyb3BTeXN0ZW0odW5jbGFzc2lmaWVkRE9NKSB7XHJcbiAgICB1bmNsYXNzaWZpZWRET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWRET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICB9LFxyXG4gIHByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB7XHJcbiAgICAvLyBkZWZhdWx0OiB0YWcgY2Fubm90IGJlIGRyYWdnZWRcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIHRoZW4gb3VyIERPTSBjYW4gYmUgZHJhZ2dlZCBpbnNpZGVcclxuICB9LFxyXG4gIGFyY2hpdmVEcm9wcGVkSGFuZGxlcihlLCBhcmNoaXZlRE9NKSB7XHJcbiAgICB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKVxyXG5cclxuICAgIGNvbnN0IHRhYkRPTUlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBjb25zdCB0YWJET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0YWJET01JZH1gKVxyXG4gICAgY29uc3QgdGFic0xpc3QgPSBhcmNoaXZlRE9NLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IGlzVGFic0xpc3RFbXB0eSA9IHRoaXMudGFic0xpc3RDaGVjayh0YWJzTGlzdClcclxuICAgIC8vIGNvbnNvbGUubG9nKCdpc1RhYnNMaXN0RW1wdHk6ICcgKyBpc1RhYnNMaXN0RW1wdHkpXHJcbiAgICBpZiAoaXNUYWJzTGlzdEVtcHR5KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBcIk5PIHRhYiBoZXJlIHlldFwiIFxyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCBuZXcgdGFiRE9NIGludG8gdGFic0xpc3RcclxuICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuXHJcbiAgICAvLyBjcmVhdGUgdGFiRGF0YSBmb3Igc3RvcmFnZVxyXG4gICAgY29uc3QgdGFiRGF0YSA9IG1vZGVsLmdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKVxyXG5cclxuICAgIC8vIGZpbmQgYXJjaGl2ZSBieSBJZCwgYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSBhcmNoaXZlRE9NLmRhdGFzZXQuYXJjaGl2ZUlkXHJcblxyXG4gICAgLy8gZGVsZXRlIG9yaWdpbmFsIHRhYlxyXG4gICAgY29uc3QgdGFiSWQgPSB0YWJET01JZC5zcGxpdCgnLScpWzFdXHJcbiAgICBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB0YXJnZXRBcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYkRhdGEpXHJcblxyXG4gICAgLy8gY2FsbCBtb2RlbCB0byBzdG9yZSBkYXRhXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgdW5jbGFzc2lmaWVkRHJvcHBlZEhhbmRsZXIoZSwgdW5jbGFzc2lmaWVkKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHRhYkRPTUlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBjb25zdCB0YWJET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0YWJET01JZH1gKVxyXG4gICAgY29uc3QgdGFic0xpc3QgPSB1bmNsYXNzaWZpZWQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcblxyXG4gICAgY29uc3QgaXNUYWJzTGlzdEVtcHR5ID0gdGhpcy50YWJzTGlzdENoZWNrKHRhYnNMaXN0KVxyXG4gICAgY29uc29sZS5sb2coJ2lzVGFic0xpc3RFbXB0eTogJyArIGlzVGFic0xpc3RFbXB0eSlcclxuXHJcbiAgICBpZiAoaXNUYWJzTGlzdEVtcHR5KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBcIk5PIHRhYiBoZXJlIHlldFwiIFxyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCBuZXcgdGFiRE9NIGludG8gdGFic0xpc3RcclxuICAgIC8vIGFsdGVybmF0aXZlIC5pbnNlcnRCZWZvcmUoKTpcclxuICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuXHJcbiAgICBjb25zdCB0YWJEYXRhID0gbW9kZWwuZ2V0VGFiRGF0YVZpYVRhYkRPTSh0YWJET00pXHJcblxyXG4gICAgLy8gZGVsZXRlIG9yaWdpbmFsIHRhYlxyXG4gICAgY29uc3QgdGFiSWQgPSB0YWJET01JZC5zcGxpdCgnLScpWzFdXHJcbiAgICBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuICAgIC8vIGNvbnNvbGUubG9nKClcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gJzAwMSdcclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmUgPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHRhcmdldEFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiRGF0YSlcclxuXHJcbiAgICAvLyBjYWxsIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gZGV0ZWN0RHJvcExvY2F0aW9uKHRhYkRPTUlkLCBkcmFnZW50ZXIsIGRyYWdsZWF2ZSlcclxuICB9LFxyXG4gIHRhYnNMaXN0Q2hlY2sodGFic0xpc3QpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0YWJzTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuICAgIHJldHVybiAoKGNvbnRlbnQubGVuZ3RoID09PSAxKSAmJiAoY29udGVudFswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zdHlsZXMvbm9ybWFsaXplLnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2FwcGxpY2F0aW9uLnNjc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2luZGV4LnNjc3MnXHJcblxyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG5pbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmpzJ1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZygnW0luZGV4XSBJbmRleC5odG1sIGxvYWRlZCEgQXNrIGZvciBhcmNoaXZlIGRhdGEhJylcclxuICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgbWVzc2FnZTogJ2dldC1hcmNoaXZlLWRhdGEnLFxyXG4gICAgZGF0YTogbnVsbFxyXG4gIH1cclxuXHJcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnW0luZGV4XSByZWNlaXZlZCBhcmNoaXZlIGRhdGEnLCByZXNwb25zZSlcclxuICAgIGNvbnN0IHsgYXJjaGl2ZSwgbGFzdFRhYklkLCBsYXN0QXJjaGl2ZUlkIH0gPSByZXNwb25zZVxyXG4gICAgZGF0YS5sYXN0VGFiSWQgPSBsYXN0VGFiSWRcclxuICAgIGRhdGEubGFzdEFyY2hpdmVJZCA9IGxhc3RBcmNoaXZlSWRcclxuICAgIGNvbnRyb2xsZXIuaW5pdExvY2FsQXJjaGl2ZURhdGEoYXJjaGl2ZSlcclxuXHJcbiAgICAvLyBzZXR1cCBkcm9wIGl0ZW0gJiBkcm9wIHpvbmVcclxuICAgIGNvbnRyb2xsZXIuc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGV2ZW50TGlzdGVuZXJcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICAvLyBjYW5jZWwgc2hvdyBpbnB1dFxyXG4gIC8vIGNvbnRyb2xsZXIuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgLy8gZ2V0IGFsbCBvcGVuZWQgdGFic1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWFsbC1idG4nKSB7XHJcbiAgICBjb250cm9sbGVyLmdldEFsbE9wZW5lZFRhYnMoKVxyXG4gIH1cclxuXHJcbiAgLy8gb2VwbiBhbGwgdGFicyBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLWFsbCcpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb250cm9sbGVyLm9wZW5BbGxUYWJzKGFyY2hpdmVJZClcclxuICB9XHJcblxyXG4gIC8vIG9wZW4gY2V0YWluIHRhYiBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdvcGVuLXRhYicpIHtcclxuICAgIGNvbnN0IHVybCA9IHRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IG5ldyBhcmNoaXZlIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5zaG93TmV3QXJjaGl2ZUlucHV0KClcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBuZXcgYXJjaGl2ZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtbmV3LWFyY2hpdmUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIG5ldyBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1hcmNoaXZlLW5hbWUtaW5wdXQnKSkge1xyXG4gICAgY29udHJvbGxlci5jcmVhdGVOZXdBcmNoaXZlKClcclxuICB9XHJcblxyXG4gIC8vIHNob3cgZWRpdCB0YWIgbmFtZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LWVkaXQtdGFiLW5hbWUnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5zaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyBjYW5jZWwgZWRpdCB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtZWRpdC10YWItaW5wdXQnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gdXBkYXRlIHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tdGFiLWVkaXQnKSkge1xyXG4gICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIHNob3cgZWRpdCBhcmNoaXZlIG5hbWUgY29udGVudFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpKSB7XHJcbiAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKSkge1xyXG4gICAgY29uc3QgdGl0bGVET00gPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5jYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSlcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBvbmUgY2VydGFpbiB0YWIgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLXRhYicpIHtcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0LmRhdGFzZXQudGFiaWRcclxuICAgIGNvbnN0IHRhYkJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlVGFiKHRhYkJhciwgdGFiSWQpXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgY2VydGFpbiBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtYXJjaGl2ZScpKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb25zb2xlLmxvZyhhcmNoaXZlQmFyKVxyXG4gICAgLy8gcmV0dXJuXHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29udHJvbGxlci5kZWxldGVBcmNoaXZlKGFyY2hpdmVCYXIsIHRhcmdldEFyY2hpdmVJZClcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBhbGwgdW5jbGFzc2lmaWVkIHRhYnMgaW4gY2VydGFpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtYWxsLWluLWFyY2hpdmUnKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29udHJvbGxlci5kZWxldGVBbGxUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZClcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLy8vLy8gZm9yIGRldmVsb3BpbmcgLy8vLy9cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1kYXRhJykge1xyXG4gICAgY29udHJvbGxlci5zaG93U3RvcmFnZSgnYXJjaGl2ZScpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NsZWFyLWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLmNsZWFyU3RvcmFnZSgpXHJcbiAgfVxyXG59LCBmYWxzZSlcclxuLy8gZmFsc2UgPSBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbi8vIHRvIHN0b3AgYnViYmxpbmc6IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcblxyXG4vLyBLZXlib2FyZEV2ZW50XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG5cclxuICAvLyBpbnB1dCBuZXcgYXJjaGl2ZSBuYW1lXHJcbiAgaWYgKHRhcmdldC5pZCA9PT0gJ2FyY2hpdmVOYW1lLWlucHV0Jykge1xyXG4gICAgaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICAgIGNvbnRyb2xsZXIuY3JlYXRlTmV3QXJjaGl2ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpbnB1dCB1cGRhdGUgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YWItbmFtZS1pbnB1dCcpKSB7XHJcbiAgICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0VGFiRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgICBjb250cm9sbGVyLnVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=