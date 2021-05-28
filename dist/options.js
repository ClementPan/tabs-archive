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
        <div class="archive-bar">
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
    console.log('archiveId: ' + archiveId)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0M7QUFDRjtBQUNBOztBQUV6QjtBQUNQO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7OztBQ3RiTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiwwQkFBMEI7QUFD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ZmlsZSI6Im9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcuanMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcblxyXG5leHBvcnQgY29uc3QgY29udHJvbGxlciA9IHtcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gZ2V0IGFsbCBhY3RpdmUgdGFic1xyXG4gICAgICBjb25zdCBhY3RpdmVUYWJzID0gYXdhaXQgbW9kZWwuZ2V0QWxsT3BlbmVkVGFicygpXHJcblxyXG4gICAgICAvLyBhZGQgbmV3IHRhYnMgdG8gcm9vdC51bmNsYXNzaWZpZWRcclxuICAgICAgZm9yIChsZXQgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcclxuICAgICAgICBkYXRhLmFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGFuZ2Ugdmlld1xyXG4gICAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfSxcclxuICBpbml0TG9jYWxBcmNoaXZlRGF0YShyZXNwb25zZSkge1xyXG4gICAgLy8gc3RvcmUgaXQgdG8gbG9jYWwgZGF0YVxyXG4gICAgZGF0YS5hcmNoaXZlID0gcmVzcG9uc2VcclxuXHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dUYWJzSW5Db250ZW50KHVuY2xhc3NpZmllZClcclxuXHJcbiAgICBjb25zdCB7IGFyY2hpdmVzTGlzdCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dSb290QXJjaGl2ZUxpc3QoYXJjaGl2ZXNMaXN0KVxyXG4gIH0sXHJcbiAgb3BlbkFsbFRhYnMoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuZm9yRWFjaChlYWNoID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gZWFjaC51cmxcclxuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRlbGV0ZVRhYih0YXJnZXQsIHRhYklkKSB7XHJcbiAgICAvLyB0YXJnZXQ6IERPTSBlbGVtbnRcclxuXHJcbiAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCB0YWJcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcucmVtb3ZlVGFiKHRhcmdldClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICBkZWxldGVBbGxUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZCkge1xyXG4gICAgLy8gY2hlY2s6IGlmIGlzIGFscmVhZHkgZW1wdHlcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0IC50YWJgXHJcbiAgICBjb25zdCB0YWJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lKVxyXG4gICAgaWYgKCh0YWJJdGVtcy5sZW5ndGggPT09IDEpICYmICh0YWJJdGVtc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB0YWJcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jbGVhclRhYnNJbkFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5jbGVhclRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIGRlbGV0ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwucmVtb3ZlQXJjaGl2ZShkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXcsIGJvdGggaW4gc2lkZWJhciAmIGNvbnRlbnQgKG5lZWQgYXJjaGl2ZUlkKVxyXG4gICAgdmlldy5yZW1vdmVBcmNoaXZlKGFyY2hpdmVCYXIsIGFyY2hpdmVJZClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICAvLyBjcmVhdGluZyBuZXcgYXJjaGl2ZVxyXG4gIHNob3dOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICB2aWV3LnNob3dOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZSgpIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCBhcmNoaXZlTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlXHJcblxyXG4gICAgLy8gbm8gZW1wdHkgaW5wdXQgYWxsb3dlZFxyXG4gICAgaWYgKCFhcmNoaXZlTmFtZSkge1xyXG4gICAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdObyBlbXB0eSBpbnB1dCBhbGxvd2VkIScpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0IGFyY2hpdmUgZGF0YSwgYWRkIG5ldyBhcmNoaXZlIGluIGRhdGFcclxuICAgIC8vIG5ld0FyY2hpdmU6IGRhdGFcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jcmVhdGVOZXdBcmNoaXZlSW5EYXRhKGFyY2hpdmVOYW1lKVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcuY3JlYXRlTmV3QXJjaGl2ZUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG4gICAgdmlldy5jcmVhdGVOZXdBcmNoaXZlSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIHJlc3RvcmUgVUlcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICB9LFxyXG4gIC8vIGVkaXRpbmcgdGFiIG5hbWUodGl0bGUpXHJcbiAgc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LnNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSlcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSkge1xyXG4gICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH0sXHJcbiAgdXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhcmdldFRhYkRPTS5kYXRhc2V0LmlkXHJcbiAgICBjb25zdCB0YWJOYW1lSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIGlucHV0JykudmFsdWVcclxuXHJcbiAgICAvLyBjaGVja1xyXG4gICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50XHJcbiAgICBpZiAob3JpZ2luYWxUaXRsZSA9PT0gdGFiTmFtZUlucHV0KSB7XHJcbiAgICAgIHZpZXcuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGZpbmQgdGFiIGluIGFyY2hpdmUgdmlhIHRhYklkLCB1cGRhdGUgaXRcclxuICAgIG1vZGVsLnVwZGF0ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkLCB0YWJOYW1lSW5wdXQpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlldyBcclxuICAgIHZpZXcudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00sIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gcmVzdG9yZSBVSVxyXG4gICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgLy8gZWRpdGluZyBhcmNoaXZlIHRpdGxlXHJcbiAgc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKSB7XHJcbiAgICB2aWV3LnNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSlcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKVxyXG4gIH0sXHJcblxyXG4gIC8vIHNldCB1cCBkcmFnIGFuZCBkcm9wIHN5c3RlbVxyXG4gIHNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKSB7XHJcbiAgICAvLyBldmVudExpc3RlbmVyIGluIHZpZXdcclxuICAgIC8vIHZpZXcgY2FsbHMgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgdmlldy5zZXRVcERyYWdBbmREcm9wU3lzdGVtKClcclxuICB9LFxyXG5cclxuICAvLyAgZGV2ZWxvcGluZyBtZXRob2RzXHJcbiAgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlIGNsZWFyZWQhJylcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93U3RvcmFnZSgpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJleHBvcnQgY29uc3QgZGF0YSA9IHtcclxuICBhcmNoaXZlOiB7fSxcclxuICBsYXN0VGFiSWQ6ICcnLFxyXG4gIGxhc3RBcmNoaXZlSWQ6ICcnXHJcbn0iLCJpbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbi8vICAgYXJjaGl2ZToge30sXHJcbi8vICAgbGFzdFRhYklkOiAnJyxcclxuLy8gICBsYXN0QXJjaGl2ZUlkOiAnJ1xyXG5cclxuLy8gQXJjaGl2ZSBwcm90b1xyXG5jb25zdCBBcmNoaXZlRGF0YSA9IGZ1bmN0aW9uIChhcmNoaXZlTmFtZSwgaWQpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJJbm5lclRlbXBsYXRlID0gZnVuY3Rpb24gKHRhYikge1xyXG4gIGNvbnN0IHsgaWQsIGNyZWF0ZWRBdCwgdXJsLCB0YWdzIH0gPSB0YWJcclxuXHJcbiAgbGV0IHsgaWNvbiB9ID0gdGFiXHJcbiAgaWYgKCFpY29uKSB7IGljb24gPSB1dGlscy5pbWFnZUhvbGRlcigpIH07XHJcblxyXG4gIGxldCB7IHRpdGxlIH0gPSB0YWJcclxuICB0aXRsZSA9IHV0aWxzLmVzY2FwZUh0bWwodGl0bGUpXHJcblxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdudW1iZXIgYm94Jz5cclxuICAgICAgPHA+JHtpZH08L3A+XHJcbiAgICAgICAgICA8L2RpdiA+XHJcbiAgICA8ZGl2IGNsYXNzPSdpY29uIGJveCc+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIlwiPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSd0aXRsZSBib3gnPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgY2FuY2VsLWVkaXQtdGFiLWlucHV0IG5vbmVcIj48L2k+XHJcblxyXG4gICAgICA8cD4ke3RpdGxlfTwvcD5cclxuXHJcbiAgICAgIDxpbnB1dCBjbGFzcz0nZWRpdC10YWItbmFtZS1pbnB1dCBub25lJyBwbGFjZWhvbGRlcj0nJHt0aXRsZX0nIHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiNDVcIj5cclxuXHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbi1hbHQgc2hvdy1lZGl0LXRhYi1uYW1lXCI+PC9pPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVjay1jaXJjbGUgY29uZmlybS10YWItZWRpdCBub25lXCIgZGF0YS1pZD1cIiR7aWR9XCI+PC9pPlxyXG5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0ndGFncyBib3gnPlxyXG4gICAgICA8cD4ke3RhZ3N9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdjcmVhdGVkQXQgYm94Jz5cclxuICAgICAgPHA+JHtjcmVhdGVkQXR9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdidG4gYm94Jz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nb3Blbi10YWInIGRhdGEtdXJsPVwiJHt1cmx9XCI+XHJcbiAgICAgICAgb3BlblxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0nYnRuIGJveCc+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS10YWInIGRhdGEtdGFiaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgIGRlbGV0ZVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGVsID0ge1xyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJbkRhdGEoYXJjaGl2ZU5hbWUpIHtcclxuICAgIGNvbnN0IG5ld0lkID0gZGF0YS5sYXN0QXJjaGl2ZUlkICs9IDFcclxuICAgIGNvbnN0IGlkID0gdXRpbHMuaWRGb3JtYXR0ZXIoJ2FyY2hpdmUnLCBuZXdJZClcclxuXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRGF0YSA9IG5ldyBBcmNoaXZlRGF0YShhcmNoaXZlTmFtZSwgaWQpXHJcblxyXG4gICAgLy8gcHVzaCBuZXdBcmNoaXZlRGF0YSB0byBkYXRhLmFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZS5hcmNoaXZlc0xpc3QucHVzaChuZXdBcmNoaXZlRGF0YSlcclxuXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZURhdGFcclxuICB9LFxyXG4gIGNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihhcmNoaXZlKSB7XHJcbiAgICBjb25zdCB7IGFyY2hpdmVOYW1lLCBpZCB9ID0gYXJjaGl2ZVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGEgaHJlZj1cIiNhcmNoaXZlLSR7aWR9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZvbGRlclwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8cD4ke2FyY2hpdmVOYW1lfTwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGRlbGV0ZS1hcmNoaXZlXCIgZGF0YS1pZD1cIiR7aWR9XCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2E+XHJcbiAgICBgXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9ICdhcmNoaXZlIGFyY2hpdmUtc3R5bGUnXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgYXJjaGl2ZU5hbWUsIGFyY2hpdmVzTGlzdCwgdW5jbGFzc2lmaWVkLCBpZCB9ID0gYXJjaGl2ZVxyXG5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRET01TID0gJydcclxuXHJcbiAgICBpZiAodW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gdW5jbGFzc2lmaWVkLm1hcChlYWNoID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz0ndGFiIHRhYi1zdHlsZScgZHJhZ2dhYmxlPVwidHJ1ZVwiIGlkPVwidGFiLSR7ZWFjaC5pZH1cIiBkYXRhLWlkPVwiJHtlYWNoLmlkfVwiPlxyXG4gICAgICAgICAgICAke3RhYklubmVyVGVtcGxhdGUoZWFjaCl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICAgIH0pLmpvaW4oJycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgICAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbmV3QXJjaGl2ZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J2FyY2hpdmVOYW1lJz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1iYXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9J2FyY2hpdmUtdGl0bGUnPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz0nZmFzIGZhLXRpbWVzLWNpcmNsZSBjYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQgbm9uZSc+PC9pPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9J3RpdGxlLXRleHQnPiR7YXJjaGl2ZU5hbWV9PC9oMz5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2FyY2hpdmVOYW1lfVwiIGNsYXNzPSdhcmNoaXZlLXRpdGxlLWlucHV0LWNvbnRlbnQgbm9uZSc+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbi1hbHQgZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnRcIj48L2k+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZSBjb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCBub25lXCI+PC9pPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5zXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwib3Blbi1hbGxcIiBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgICAgIE9wZW4gQWxsXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLWFsbC1pbi1hcmNoaXZlJyBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgICAgIERlbGV0ZSBBbGxcclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGlucHV0IGlkPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCIgY2xhc3M9J2FyY2hpdmUtZHJvcGRvd24gbm9uZScgdHlwZT1cImNoZWNrYm94XCI+XHJcblxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJhcmNoaXZlJHtpZH0tZHJvcGRvd25cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9J3Nob3ctaW5kaWNhdG9yJz5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtZm9sZGVyLW9wZW4gdW5mb2xkXCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1mb2xkZXIgZm9sZFwiPjwvaT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbGFiZWw+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWNvbnRlbnRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlc0xpc3RcIj5cclxuICAgICAgICAgICAgPHA+JHthcmNoaXZlc0xpc3R9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFicy1saXN0XCI+XHJcbiAgICAgICAgICAgICR7dW5jbGFzc2lmaWVkRE9NU31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGBcclxuICAgIG5ld0FyY2hpdmUuaWQgPSBgYXJjaGl2ZS0ke2lkfWBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gYGFyY2hpdmUgZHJvcHpvbmUgYXJjaGl2ZS1zdHlsZSBhcmNoaXZlLSR7aWR9LWNvbnRlbnRgXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVUYWJET01JbkNvbnRlbnQodGFiRGF0YSkge1xyXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHRhYi5pbm5lckhUTUwgPSB0YWJJbm5lclRlbXBsYXRlKHRhYkRhdGEpXHJcbiAgICB0YWIuY2xhc3NMaXN0ICs9ICd0YWIgdGFiLXN0eWxlJ1xyXG4gICAgdGFiLmlkID0gYHRhYi0ke3RhYkRhdGEuaWR9YFxyXG4gICAgdGFiLmRhdGFzZXQuaWQgPSB0YWJEYXRhLmlkXHJcbiAgICB0YWIuZHJhZ2dhYmxlID0gdHJ1ZVxyXG4gICAgcmV0dXJuIHRhYlxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0U3RvcmFnZURhdGEodGFyZ2V0RGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbdGFyZ2V0RGF0YV0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlamVjdCEnKVxyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiBmYWxzZSB9LCAocXVlcnlSZXN1bHQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRhYnMgPSBbXVxyXG4gICAgICAgICAgZm9yIChsZXQgdGFiIG9mIHF1ZXJ5UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAodGFiLnRpdGxlID09PSBcImNocm9tZS50YWJzIC0gQ2hyb21lIERldmVsb3BlcnNcIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybCA9PT0gXCJjaHJvbWU6Ly9leHRlbnNpb25zL1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsLnNwbGl0KCc6Ly8nKVswXSA9PT0gJ2Nocm9tZS1leHRlbnNpb24nKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSAnY2hyb21lOi8vbmV3dGFiLycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2xlYXJcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYi5pZClcclxuXHJcbiAgICAgICAgICAgIC8vIGZvcm0gdGFiRGF0YVxyXG4gICAgICAgICAgICAvLyBjb25zdCB0aXRsZSA9IHV0aWxzLnRyaW1TdHJpbmcodXRpbHMuZXNjYXBlSHRtbCh0YWIudGl0bGUpLCA0NSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgZmF2SWNvblVybDogaWNvbiwgdXJsLCB0aXRsZSB9ID0gdGFiXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCd6aC10dycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGlkXHJcbiAgICAgICAgICAgIGRhdGEubGFzdFRhYklkKytcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB1dGlscy5pZEZvcm1hdHRlcigndGFiJywgZGF0YS5sYXN0VGFiSWQpXHJcblxyXG4gICAgICAgICAgICB0YWJzLnB1c2gobmV3IFRhYkRhdGEoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHRhYnMpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBzdG9yZUFyY2hpdmUoKSB7XHJcbiAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBjb25zdCB7IGFyY2hpdmUgfSA9IGRhdGFcclxuICAgIGFyY2hpdmUuYXJjaGl2ZU5hbWUgPSAncm9vdC1hcmNoaXZlJ1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgbWVzc2FnZTogJ3N0b3JlLWFyY2hpdmUnLFxyXG4gICAgICBkYXRhOiBhcmNoaXZlXHJcbiAgICB9XHJcblxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVxdWVzdCwgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1tJbmRleF0gJywgbWVzc2FnZSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgdXBkYXRlVGFiKGFyY2hpdmUsIHRhYklkLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IHRhYklkXHJcbiAgICBjb25zb2xlLmxvZygnaW4gdXBkYXRlVGFiJywgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdpbiBmaW5kVGFiQnlJZCcsIHRhYk5hbWVJbnB1dClcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiBhcmNoaXZlLnVuY2xhc3NpZmllZCkge1xyXG4gICAgICAgICAgaWYgKHRhYi5pZCA9PT0gdGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luIGhpdDogJywgdGFiTmFtZUlucHV0KVxyXG4gICAgICAgICAgICB0YWIudGl0bGUgPSB0YWJOYW1lSW5wdXRcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gIH0sXHJcbiAgcmVtb3ZlVGFiKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICBjb25zdCB0YXJnZXRJZCA9IHRhYklkXHJcblxyXG4gICAgY29uc3QgcmVtb3ZlVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJjaGl2ZS51bmNsYXNzaWZpZWQuaW5kZXhPZih0YWIpXHJcbiAgICAgICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIHJlbW92ZUFyY2hpdmUoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuXHJcbiAgICBjb25zdCBkZWxldGVBcmNoaXZlQnlJZCA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldElkID09PSBzdWJBcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJjaGl2ZS5hcmNoaXZlc0xpc3QuaW5kZXhPZihzdWJBcmNoaXZlKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleClcclxuICAgICAgICAgICAgYXJjaGl2ZS5hcmNoaXZlc0xpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBkZWxldGVBcmNoaXZlQnlJZChzdWJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFyY2hpdmVCeUlkKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH0sXHJcbiAgY2xlYXJUYWJzSW5BcmNoaXZlQnlJZChhcmNoaXZlLCBhcmNoaXZlSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IGFyY2hpdmVJZFxyXG4gICAgLy8gbGV0IHRhcmdldEFyY2hpdmUgPSB7fVxyXG5cclxuICAgIGNvbnN0IGZpbmRBcmNoaXZlID0gKGFyY2hpdmUpID0+IHtcclxuICAgICAgaWYgKHRhcmdldElkID09PSBhcmNoaXZlLmlkKSB7XHJcbiAgICAgICAgYXJjaGl2ZS51bmNsYXNzaWZpZWQgPSBbXVxyXG4gICAgICAgIC8vIHJldHVybiB0YXJnZXRBcmNoaXZlID0gYXJjaGl2ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBzdWJBcmNoaXZlLnVuY2xhc3NpZmllZCA9IFtdXHJcbiAgICAgICAgICAgIC8vIHJldHVybiB0YXJnZXRBcmNoaXZlID0gc3ViQXJjaGl2ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlubmVyQXJjaGl2ZSBvZiBzdWJBcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICAgIGZpbmRBcmNoaXZlKGlubmVyQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBcmNoaXZlKGFyY2hpdmUpXHJcbiAgICByZXR1cm4gYXJjaGl2ZVxyXG4gIH0sXHJcbiAgc2VhcmNoQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRBcmNoaXZlID0gYXJjaGl2ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIHRhcmdldEFyY2hpdmVcclxuICB9LFxyXG4gIGdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKSB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgaWQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyIHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgaWNvbjogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5pY29uIGltZycpLnNyYyxcclxuICAgICAgdGl0bGU6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICB0YWdzOiB0YWJET00ucXVlcnlTZWxlY3RvcignLnRhZ3MgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICBjcmVhdGVkQXQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlZEF0IHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgdXJsOiB0YWJET00ucXVlcnlTZWxlY3RvcignLmJ0biBidXR0b24nKS5kYXRhc2V0LnVybCxcclxuICAgICAgdXBkYXRlZEF0OiAnJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIHJlY3Vyc2l2ZSBzZWFyY2ggcHJvdG90eXBlIC8vXHJcbiAgc2VhcmNoVGFiQnlJZDogZnVuY3Rpb24gKGFyY2hpdmUsIHRhYklkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IGZpbmRUYWJCeUlkID0gKGFyY2hpdmUsIHRhcmdldElkKSA9PiB7XHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhYilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZFRhYkJ5SWQoYXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xyXG4gIGlkRm9ybWF0dGVyOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICAvLyB0eXBlID0gXCJ0YWJcIiB8fCBcImFyY2hpdmVcIlxyXG4gICAgbGV0IG1vZGUgPSB0eXBlID09PSAndGFiJyA/IDUgOiAzXHJcbiAgICBudW0gPSBudW0gKyAnJ1xyXG4gICAgbGV0IG91dHB1dCA9IG51bS5zcGxpdCgnJylcclxuICAgIGlmIChudW0ubGVuZ3RoIDwgbW9kZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGUgLSBudW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBvdXRwdXQudW5zaGlmdCgnMCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQuam9pbignJylcclxuICB9LFxyXG4gIGVzY2FwZUh0bWw6IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmdcclxuICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxuICB9LFxyXG4gIHRyaW1TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcsIG1leGxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoMCwgbWV4bGVuZ3RoKVxyXG4gIH0sXHJcbiAgaW1hZ2VIb2xkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzMyLzU5ODM5Mi9mZmY/dGV4dD0/J1xyXG4gIH1cclxufSIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcblxyXG4vLyBub3QgZG9uZVxyXG5jb25zdCBkZXRlY3REcm9wTG9jYXRpb24gPSBmdW5jdGlvbiAodGFiSWQsIGRyYWdlbnRlciwgZHJhZ2xlYXZlKSB7XHJcbiAgY29uc29sZS5sb2coJ3RhYklkOiAgICAgJyArIHRhYklkKVxyXG4gIGNvbnNvbGUubG9nKCdkcmFnZW50ZXI6ICcgKyBkcmFnZW50ZXIpXHJcbiAgY29uc29sZS5sb2coJ2RyYWdsZWF2ZTogJyArIGRyYWdsZWF2ZSlcclxuICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tJylcclxuICBsZXQgcmVzdWx0ID0gJ25vIGRldGVjdCdcclxuICBpZiAoKHRhYklkID09PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKSkge1xyXG4gICAgcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcbiAgfSBlbHNlIGlmICgodGFiSWQgIT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpKSB7XHJcbiAgICByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuICB9IGVsc2UgaWYgKChkcmFnZW50ZXIgPT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKSkge1xyXG4gICAgcmVzdWx0ID0gYGJlZm9yZSAke2RyYWdsZWF2ZX1gXHJcbiAgfSBlbHNlIGlmICgoZHJhZ2VudGVyICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcikpIHtcclxuICAgIHJlc3VsdCA9IGBhZnRlciAke2RyYWdlbnRlcn1gXHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZygncmVzdWx0OiAnICsgcmVzdWx0KVxyXG4gIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0nKVxyXG4gIHJldHVyblxyXG59XHJcblxyXG4vLyAodGFiSWQgPT09IGRyYWdlbnRlcikgJiYgKHRhYklkID09PSBkcmFnbGVhdmUpXHJcbi8vIEEgQSBBXHJcbi8vIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG5cclxuLy8gKHRhYklkICE9PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKVxyXG4vLyBBIEIgQVxyXG4vLyByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuXHJcbi8vIChkcmFnZW50ZXIgPT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKVxyXG4vLyBBIEIgQiBcclxuLy8gZHJhZ2xlYXZlIOeahOWJjeS4gOWAi1xyXG5cclxuLy8gKGRyYWdlbnRlciAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpXHJcbi8vIEEgQiBDXHJcbi8vIGRyYWdsZWF2ZSDnmoTliY3kuIDlgItcclxuXHJcbmNvbnN0IGVtcHR5VGFiID0gYFxyXG4gIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgPHAgY2xhc3M9J2VtcHR5LXRhYic+Tm8gdGFiIGhlcmUgeWV0ITwvcD5cclxuICA8L2Rpdj5cclxuYFxyXG5cclxuZXhwb3J0IGNvbnN0IHZpZXcgPSB7XHJcbiAgc2hvd1RhYnNJbkNvbnRlbnQoZGF0YSkge1xyXG4gICAgLy8gZGF0YTogcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcbiAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG5cclxuICAgIGlmICghZGF0YS5sZW5ndGgpIHtcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gZW1wdHlUYWJcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB0YWIgb2YgZGF0YSkge1xyXG4gICAgICBjb25zdCBuZXdUYWIgPSBtb2RlbC5jcmVhdGVUYWJET01JbkNvbnRlbnQodGFiKVxyXG4gICAgICAvLyBhZGQgZXZlbnRMaXN0ZW5lciB0byBuZXcgdGFicyAvL1xyXG4gICAgICB0aGlzLnNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0obmV3VGFiKVxyXG5cclxuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFiKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd1Jvb3RBcmNoaXZlTGlzdChsaXN0KSB7XHJcbiAgICAvLyBsaXN0OiByb290LmFyY2hpdmVzTGlzdFxyXG4gICAgY29uc3Qgc2lkZWJhckFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHtcclxuICAgICAgY29uc3QgbmV3U2lkZWJhckFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmhpdmVET01JblNpZGViYXIoaXRlbSlcclxuICAgICAgc2lkZWJhckFyY2hpdmVzTGlzdC5hcHBlbmRDaGlsZChuZXdTaWRlYmFyQXJjaGl2ZSlcclxuXHJcbiAgICAgIGNvbnN0IG5ld0NvbnRlbnRBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChpdGVtKVxyXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0NvbnRlbnRBcmNoaXZlKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd05ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIC8vIGhpZGUgaW5wdXQgaWNvblxyXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5pY29uJylcclxuICAgIGljb24uY2xhc3NOYW1lICs9ICcgbm9uZSdcclxuXHJcbiAgICAvLyBoaWRlIDxwPlxyXG4gICAgY29uc3QgcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IHAnKVxyXG4gICAgaWYgKCFwLmNsYXNzTmFtZS5pbmNsdWRlcygnbm9uZScpKSB7XHJcbiAgICAgIHAuY2xhc3NOYW1lICs9ICcgbm9uZSdcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93IGlucHV0IFVJXHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IGlucHV0JylcclxuICAgIGNvbnN0IGNhbmNlbEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY2FuY2VsJylcclxuICAgIGNvbnN0IGNvbmZpcm1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNvbmZpcm0nKVxyXG5cclxuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY29uZmlybUljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gIH0sXHJcbiAgY2FuY2VsTmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ2NhbmNlbCBOZXcgQXJjaGl2ZSBJbnB1dCcpXHJcblxyXG4gICAgLy9yZXN0b3JlIFxyXG4gICAgLy8gaGlkZSBpbnB1dCBVSVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBpbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNhbmNlbCcpXHJcbiAgICBjb25zdCBjb25maXJtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jb25maXJtJylcclxuICAgIGlucHV0LmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcbiAgICBjb25maXJtSWNvbi5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG5cclxuICAgIC8vIHNob3cgaW5wdXQgaWNvblxyXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5pY29uJylcclxuICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gc2hvdyA8cD5cclxuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBwLnNob3ctbmV3LWFyY2hpdmUtaW5wdXQnKVxyXG4gICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgICAvLyBjbGVhciBpbnB1dCB2YWx1ZVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyY2hpdmVOYW1lLWlucHV0JykudmFsdWUgPSAnJ1xyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluU2lkZWJhcihuZXdBcmNoaXZlKSB7XHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRE9NID0gbW9kZWwuY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKG5ld0FyY2hpdmUpXHJcblxyXG4gICAgLy8gcHVzaCBuZXdBcmNoaXZlRE9NIGludG8gc2lkZWJhckFyY2hpdmVzTGlzdFxyXG4gICAgY29uc3Qgc2lkZWJhckFyY2hpdmVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5hcmNoaXZlc0xpc3QnKVxyXG4gICAgc2lkZWJhckFyY2hpdmVzTGlzdC5hcHBlbmRDaGlsZChuZXdBcmNoaXZlRE9NKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgY3JlYXRlTmV3QXJjaGl2ZUluQ29udGVudChuZXdBcmNoaXZlKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURPTSA9IG1vZGVsLmNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQobmV3QXJjaGl2ZSlcclxuICAgIHRoaXMuc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0obmV3QXJjaGl2ZURPTSlcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3QXJjaGl2ZURPTSlcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICBjb25zdCBjYW5jZWxFZGl0VGFiSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LXRhYi1pbnB1dCcpXHJcbiAgICBjb25zdCB0aXRsZVAgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmVkaXQtdGFiLW5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgY29uZmlybVRhYkVkaXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tdGFiLWVkaXQnKVxyXG4gICAgY29uc3Qgc2hvd0VkaXRUYWJOYW1lID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5zaG93LWVkaXQtdGFiLW5hbWUnKVxyXG5cclxuICAgIC8vIGhpZGUgLnRpdGxlIHBcclxuICAgIHRpdGxlUC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIHNob3dFZGl0VGFiTmFtZS5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuXHJcbiAgICAvLyBwYXNzIHRpdGxlIHRvIGlucHV0IHZhbHVlXHJcbiAgICBpbnB1dC52YWx1ZSA9IHRpdGxlUC50ZXh0Q29udGVudFxyXG5cclxuICAgIC8vIHNob3cgaW5wdXRcclxuICAgIGNhbmNlbEVkaXRUYWJJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY29uZmlybVRhYkVkaXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2FuY2VsLUVkaXQtVGFiLUlucHV0JylcclxuXHJcbiAgICBjb25zdCBjYW5jZWxFZGl0VGFiSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LXRhYi1pbnB1dCcpXHJcbiAgICBjb25zdCB0aXRsZVAgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmVkaXQtdGFiLW5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgY29uZmlybVRhYkVkaXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tdGFiLWVkaXQnKVxyXG4gICAgY29uc3Qgc2hvd0VkaXRUYWJOYW1lID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5zaG93LWVkaXQtdGFiLW5hbWUnKVxyXG5cclxuICAgIC8vIHRvIHNob3dcclxuICAgIHRpdGxlUC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIHNob3dFZGl0VGFiTmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIC8vIHRvIGhpZGVcclxuICAgIGNhbmNlbEVkaXRUYWJJbnB1dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgY29uZmlybVRhYkVkaXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgfSxcclxuICB1cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICBjb25zdCB0aXRsZVAgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKVxyXG4gICAgdGl0bGVQLnRleHRDb250ZW50ID0gdGFiTmFtZUlucHV0XHJcbiAgfSxcclxuICBzaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pIHtcclxuICAgIGNvbnN0IHRpdGxlVGV4dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JylcclxuICAgIGNvbnN0IGVkaXRJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JylcclxuICAgIGNvbnN0IHVwZGF0ZUljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXHJcblxyXG4gICAgLy8gdG8gaGlkZTogLnRpdGxlLXRleHQsIGVkaXRJY29uXHJcbiAgICB0aXRsZVRleHQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuXHJcbiAgICAvLyB0byBzaG93OiB1cGRhdGVJY29uLCBjYW5jZWxJY29uXHJcbiAgICB1cGRhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gIH0sXHJcbiAgY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pIHtcclxuICAgIGNvbnN0IHRpdGxlVGV4dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JylcclxuICAgIGNvbnN0IGVkaXRJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JylcclxuICAgIGNvbnN0IHVwZGF0ZUljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgaW5wdXQgPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXHJcblxyXG4gICAgLy8gdG8gaGlkZTogdXBkYXRlSWNvbiwgY2FuY2VsSWNvblxyXG4gICAgdXBkYXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuXHJcbiAgICAvLyB0byBzaG93OiB0aXRsZVRleHQsIGVkaXRJY29uXHJcbiAgICB0aXRsZVRleHQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgfSxcclxuICByZW1vdmVUYWIodGFiQmFyKSB7XHJcbiAgICB0YWJCYXIucmVtb3ZlKClcclxuICB9LFxyXG4gIHJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyByZW1vdmUgYXJjaGl2ZSBmcm9tIHNpZGViYXJcclxuICAgIGFyY2hpdmVCYXIucmVtb3ZlKClcclxuXHJcbiAgICAvLyByZW1vdmUgYXJjaGl2ZSBpbiBjb250ZW50XHJcbiAgICBjb25zdCBhcmNoaXZlQmFySW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FyY2hpdmUtJHthcmNoaXZlSWR9YClcclxuICAgIGFyY2hpdmVCYXJJbkNvbnRlbnQucmVtb3ZlKClcclxuXHJcbiAgfSxcclxuICBjbGVhclRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zb2xlLmxvZygnYXJjaGl2ZUlkOiAnLCBhcmNoaXZlSWQpXHJcbiAgICAvLyByZXR1cm5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRMaXN0ID0gJydcclxuXHJcbiAgICBpZiAoYXJjaGl2ZUlkID09PSAnMDAxJykge1xyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCAudGFicy1saXN0JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0YFxyXG4gICAgICB1bmNsYXNzaWZpZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgdW5jbGFzc2lmaWVkTGlzdC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgfSxcclxuICAvLyBkcmFnIGFuZCBkcm9wIGhhbmRsZXJzXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtIGZvciBjdXJyZW50IGRhdGFcclxuICAvLyBhcmNoaXZlcyBhbmQgdGFic1xyXG4gIHNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKSB7XHJcbiAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpXHJcblxyXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0aGlzLnNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0odGFiKSlcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmU6IHVuY2xhc3NpZmllZCwgZHJvcHpvbmVcclxuICAgIGNvbnN0IGRyb3B6b25lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wem9uZScpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkJylcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmUgZm9yIGFyY2hpdmVzXHJcbiAgICBkcm9wem9uZXMuZm9yRWFjaChkcm9wem9uZSA9PiB0aGlzLnNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKGRyb3B6b25lKSlcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmUgZm9yIHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICB0aGlzLnNldFVwVW5jbGFzc2lmaWVkRHJhZ0FuZERyb3BTeXN0ZW0odW5jbGFzc2lmaWVkKVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7IHRoaXMudW5jbGFzc2lmaWVkRHJvcHBlZEhhbmRsZXIoZSwgdW5jbGFzc2lmaWVkKSB9KVxyXG4gIH0sXHJcbiAgLy8gc2V0IHVwIGRyYWcgYW5kIGRyb3Agc3lzdGVtIGZvciBuZXcgY3JlYXRlZCB0YWJcclxuICBzZXRVcFRhYkRyYWdBbmREcm9wU3lzdGVtKHRhYkRPTSkge1xyXG4gICAgLy8gZW1wdHkgdGFiIGlzIG5vdCBkcmFnZ2FibGVcclxuICAgIGlmICh0YWJET00uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbXB0eScpKSByZXR1cm5cclxuXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuICAgICAgY29uc29sZS5sb2coJ3RhcmdldCBpZDogJyArIHRhcmdldC5pZClcclxuICAgICAgY29uc3QgcGF5bG9hZCA9IHRhcmdldC5pZFxyXG5cclxuICAgICAgLy8gZGF0YVRyYW5zZmVyLnNldERhdGFcclxuICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIHBheWxvYWQpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIGRldGVjdCBkcm9wIGxvY2F0aW9uXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAvLyBkcmFnZW50ZXIgPSB0YWIuaWRcclxuICAgICAgLy8gY29uc29sZS5sb2coJ2RyYWdlbnRlcjogJyArIGRyYWdlbnRlcilcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8vIGRyYWdsZWF2ZSA9IHRhYi5pZFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIG5ldyBjcmVhdGVkIGFyY2hpdmVcclxuICBzZXRVcEFyY2hpdmVEcmFnQW5kRHJvcFN5c3RlbShhcmNoaXZlRE9NKSB7XHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7IHRoaXMuYXJjaGl2ZURyb3BwZWRIYW5kbGVyKGUsIGFyY2hpdmVET00pIH0pXHJcbiAgfSxcclxuICBzZXRVcFVuY2xhc3NpZmllZERyYWdBbmREcm9wU3lzdGVtKHVuY2xhc3NpZmllZERPTSkge1xyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWRET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgfSxcclxuICBwcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkge1xyXG4gICAgLy8gZGVmYXVsdDogdGFnIGNhbm5vdCBiZSBkcmFnZ2VkXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyB0aGVuIG91ciBET00gY2FuIGJlIGRyYWdnZWQgaW5zaWRlXHJcbiAgfSxcclxuICBhcmNoaXZlRHJvcHBlZEhhbmRsZXIoZSwgYXJjaGl2ZURPTSkge1xyXG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSlcclxuXHJcbiAgICBjb25zdCB0YWJET01JZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3QgdGFiRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGFiRE9NSWR9YClcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gYXJjaGl2ZURPTS5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCBpc1RhYnNMaXN0RW1wdHkgPSB0aGlzLnRhYnNMaXN0Q2hlY2sodGFic0xpc3QpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnaXNUYWJzTGlzdEVtcHR5OiAnICsgaXNUYWJzTGlzdEVtcHR5KVxyXG4gICAgaWYgKGlzVGFic0xpc3RFbXB0eSkge1xyXG4gICAgICAvLyByZW1vdmUgXCJOTyB0YWIgaGVyZSB5ZXRcIiBcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgbmV3IHRhYkRPTSBpbnRvIHRhYnNMaXN0XHJcbiAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZCh0YWJET00pXHJcblxyXG4gICAgLy8gY3JlYXRlIHRhYkRhdGEgZm9yIHN0b3JhZ2VcclxuICAgIGNvbnN0IHRhYkRhdGEgPSBtb2RlbC5nZXRUYWJEYXRhVmlhVGFiRE9NKHRhYkRPTSlcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gYXJjaGl2ZURPTS5kYXRhc2V0LmFyY2hpdmVJZFxyXG5cclxuICAgIC8vIGRlbGV0ZSBvcmlnaW5hbCB0YWJcclxuICAgIGNvbnN0IHRhYklkID0gdGFiRE9NSWQuc3BsaXQoJy0nKVsxXVxyXG4gICAgbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZSA9IG1vZGVsLnNlYXJjaEFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG4gICAgdGFyZ2V0QXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWJEYXRhKVxyXG5cclxuICAgIC8vIGNhbGwgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIHVuY2xhc3NpZmllZERyb3BwZWRIYW5kbGVyKGUsIHVuY2xhc3NpZmllZCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YWJET01JZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3QgdGFiRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGFiRE9NSWR9YClcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IGlzVGFic0xpc3RFbXB0eSA9IHRoaXMudGFic0xpc3RDaGVjayh0YWJzTGlzdClcclxuICAgIGNvbnNvbGUubG9nKCdpc1RhYnNMaXN0RW1wdHk6ICcgKyBpc1RhYnNMaXN0RW1wdHkpXHJcblxyXG4gICAgaWYgKGlzVGFic0xpc3RFbXB0eSkge1xyXG4gICAgICAvLyByZW1vdmUgXCJOTyB0YWIgaGVyZSB5ZXRcIiBcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgbmV3IHRhYkRPTSBpbnRvIHRhYnNMaXN0XHJcbiAgICAvLyBhbHRlcm5hdGl2ZSAuaW5zZXJ0QmVmb3JlKCk6XHJcbiAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZCh0YWJET00pXHJcblxyXG4gICAgY29uc3QgdGFiRGF0YSA9IG1vZGVsLmdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKVxyXG5cclxuICAgIC8vIGRlbGV0ZSBvcmlnaW5hbCB0YWJcclxuICAgIGNvbnN0IHRhYklkID0gdGFiRE9NSWQuc3BsaXQoJy0nKVsxXVxyXG4gICAgbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcbiAgICAvLyBjb25zb2xlLmxvZygpXHJcblxyXG4gICAgLy8gZmluZCBhcmNoaXZlIGJ5IElkLCBhcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYilcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9ICcwMDEnXHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB0YXJnZXRBcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYkRhdGEpXHJcblxyXG4gICAgLy8gY2FsbCBtb2RlbCB0byBzdG9yZSBkYXRhXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIGRldGVjdERyb3BMb2NhdGlvbih0YWJET01JZCwgZHJhZ2VudGVyLCBkcmFnbGVhdmUpXHJcbiAgfSxcclxuICB0YWJzTGlzdENoZWNrKHRhYnNMaXN0KSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGFic0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpXHJcbiAgICByZXR1cm4gKChjb250ZW50Lmxlbmd0aCA9PT0gMSkgJiYgKGNvbnRlbnRbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlbXB0eScpKSlcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc3R5bGVzL25vcm1hbGl6ZS5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9pbmRleC5zY3NzJ1xyXG5cclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci5qcydcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coJ1tJbmRleF0gSW5kZXguaHRtbCBsb2FkZWQhIEFzayBmb3IgYXJjaGl2ZSBkYXRhIScpXHJcbiAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgIG1lc3NhZ2U6ICdnZXQtYXJjaGl2ZS1kYXRhJyxcclxuICAgIGRhdGE6IG51bGxcclxuICB9XHJcblxyXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChyZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1tJbmRleF0gcmVjZWl2ZWQgYXJjaGl2ZSBkYXRhJywgcmVzcG9uc2UpXHJcbiAgICBjb25zdCB7IGFyY2hpdmUsIGxhc3RUYWJJZCwgbGFzdEFyY2hpdmVJZCB9ID0gcmVzcG9uc2VcclxuICAgIGRhdGEubGFzdFRhYklkID0gbGFzdFRhYklkXHJcbiAgICBkYXRhLmxhc3RBcmNoaXZlSWQgPSBsYXN0QXJjaGl2ZUlkXHJcbiAgICBjb250cm9sbGVyLmluaXRMb2NhbEFyY2hpdmVEYXRhKGFyY2hpdmUpXHJcblxyXG4gICAgLy8gc2V0dXAgZHJvcCBpdGVtICYgZHJvcCB6b25lXHJcbiAgICBjb250cm9sbGVyLnNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBldmVudExpc3RlbmVyXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuXHJcbiAgLy8gY2FuY2VsIHNob3cgaW5wdXRcclxuICAvLyBjb250cm9sbGVyLmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcblxyXG4gIC8vIGdldCBhbGwgb3BlbmVkIHRhYnNcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1hbGwtYnRuJykge1xyXG4gICAgY29udHJvbGxlci5nZXRBbGxPcGVuZWRUYWJzKClcclxuICB9XHJcblxyXG4gIC8vIG9lcG4gYWxsIHRhYnMgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi1hbGwnKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29udHJvbGxlci5vcGVuQWxsVGFicyhhcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBvcGVuIGNldGFpbiB0YWIgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi10YWInKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0YXJnZXQuZGF0YXNldC51cmxcclxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBuZXcgYXJjaGl2ZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LW5ldy1hcmNoaXZlLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuc2hvd05ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfVxyXG5cclxuICAvLyBjYW5jZWwgbmV3IGFyY2hpdmUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLW5ldy1hcmNoaXZlLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICB9XHJcblxyXG4gIC8vIGNyZWF0ZSBuZXcgYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctYXJjaGl2ZS1uYW1lLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuY3JlYXRlTmV3QXJjaGl2ZSgpXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IGVkaXQgdGFiIG5hbWUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1lZGl0LXRhYi1uYW1lJykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FuY2VsIGVkaXQgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLWVkaXQtdGFiLWlucHV0JykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIHVwZGF0ZSB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLXRhYi1lZGl0JykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IGVkaXQgYXJjaGl2ZSBuYW1lIGNvbnRlbnRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKSkge1xyXG4gICAgY29uc3QgdGl0bGVET00gPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5zaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JykpIHtcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgb25lIGNlcnRhaW4gdGFiIGluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZS10YWInKSB7XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhcmdldC5kYXRhc2V0LnRhYmlkXHJcbiAgICBjb25zdCB0YWJCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZVRhYih0YWJCYXIsIHRhYklkKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIGNlcnRhaW4gYXJjaGl2ZSBmcm9tIHNpZGViYXJcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWFyY2hpdmUnKSkge1xyXG4gICAgY29uc3QgYXJjaGl2ZUJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29uc29sZS5sb2coYXJjaGl2ZUJhcilcclxuICAgIC8vIHJldHVyblxyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnRyb2xsZXIuZGVsZXRlQXJjaGl2ZShhcmNoaXZlQmFyLCB0YXJnZXRBcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgYWxsIHVuY2xhc3NpZmllZCB0YWJzIGluIGNlcnRhaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsZXRlLWFsbC1pbi1hcmNoaXZlJykge1xyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnNvbGUubG9nKCdhcmNoaXZlSWQ6ICcgKyBhcmNoaXZlSWQpXHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZUFsbFRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKVxyXG4gIH1cclxuXHJcblxyXG5cclxuICAvLy8vLyBmb3IgZGV2ZWxvcGluZyAvLy8vL1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dTdG9yYWdlKCdhcmNoaXZlJylcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnY2xlYXItZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2xlYXJTdG9yYWdlKClcclxuICB9XHJcbn0sIGZhbHNlKVxyXG4vLyBmYWxzZSA9IGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuLy8gdG8gc3RvcCBidWJibGluZzogZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcbi8vIEtleWJvYXJkRXZlbnRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcblxyXG4gIC8vIGlucHV0IG5ldyBhcmNoaXZlIG5hbWVcclxuICBpZiAodGFyZ2V0LmlkID09PSAnYXJjaGl2ZU5hbWUtaW5wdXQnKSB7XHJcbiAgICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgICAgY29udHJvbGxlci5jcmVhdGVOZXdBcmNoaXZlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlucHV0IHVwZGF0ZSB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhYi1uYW1lLWlucHV0JykpIHtcclxuICAgIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gICAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==