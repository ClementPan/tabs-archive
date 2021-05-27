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
  const { id, icon, title, createdAt, url, tags } = tab
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
      tabsList.innerHTML = `
      <div class='tab empty tab-style'>
        <p class='empty-tab'>No tab here yet!</p>
      </div>
      `
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

    tabsList.appendChild(tabDOM)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0M7QUFDRjtBQUNBOztBQUV6QjtBQUNQO0FB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O0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkVBQWlDO0FBQ3JDOzs7O0FBSUE7QUFDQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1RUFBMkI7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sb0VBQXdCO0FBQzlCO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6Im9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcuanMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcblxyXG5leHBvcnQgY29uc3QgY29udHJvbGxlciA9IHtcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gZ2V0IGFsbCBhY3RpdmUgdGFic1xyXG4gICAgICBjb25zdCBhY3RpdmVUYWJzID0gYXdhaXQgbW9kZWwuZ2V0QWxsT3BlbmVkVGFicygpXHJcblxyXG4gICAgICAvLyBhZGQgbmV3IHRhYnMgdG8gcm9vdC51bmNsYXNzaWZpZWRcclxuICAgICAgZm9yIChsZXQgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcclxuICAgICAgICBkYXRhLmFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGFuZ2Ugdmlld1xyXG4gICAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfSxcclxuICBpbml0TG9jYWxBcmNoaXZlRGF0YShyZXNwb25zZSkge1xyXG4gICAgLy8gc3RvcmUgaXQgdG8gbG9jYWwgZGF0YVxyXG4gICAgZGF0YS5hcmNoaXZlID0gcmVzcG9uc2VcclxuXHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dUYWJzSW5Db250ZW50KHVuY2xhc3NpZmllZClcclxuXHJcbiAgICBjb25zdCB7IGFyY2hpdmVzTGlzdCB9ID0gZGF0YS5hcmNoaXZlXHJcbiAgICB2aWV3LnNob3dSb290QXJjaGl2ZUxpc3QoYXJjaGl2ZXNMaXN0KVxyXG4gIH0sXHJcbiAgb3BlbkFsbFRhYnMoYXJjaGl2ZUlkKSB7XHJcbiAgICBjb25zdCB7IHVuY2xhc3NpZmllZCB9ID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB1bmNsYXNzaWZpZWQuZm9yRWFjaChlYWNoID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gZWFjaC51cmxcclxuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsLCBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRlbGV0ZVRhYih0YXJnZXQsIHRhYklkKSB7XHJcbiAgICAvLyB0YXJnZXQ6IERPTSBlbGVtbnRcclxuXHJcbiAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCB0YWJcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXdcclxuICAgIHZpZXcucmVtb3ZlVGFiKHRhcmdldClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICBkZWxldGVBbGxUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZCkge1xyXG4gICAgLy8gY2hlY2s6IGlmIGlzIGFscmVhZHkgZW1wdHlcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudCAudGFicy1saXN0IC50YWJgXHJcbiAgICBjb25zdCB0YWJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lKVxyXG4gICAgaWYgKCh0YWJJdGVtcy5sZW5ndGggPT09IDEpICYmICh0YWJJdGVtc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2VtcHR5JykpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB0YWJcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5jbGVhclRhYnNJbkFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5jbGVhclRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIGRlbGV0ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyByZXR1cm4gbmV3QXJjaGl2ZSB3aXRoIHRhcmdldCBhcmNoaXZlXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwucmVtb3ZlQXJjaGl2ZShkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZVxyXG4gICAgZGF0YS5hcmNoaXZlID0gbmV3QXJjaGl2ZVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXcsIGJvdGggaW4gc2lkZWJhciAmIGNvbnRlbnQgKG5lZWQgYXJjaGl2ZUlkKVxyXG4gICAgdmlldy5yZW1vdmVBcmNoaXZlKGFyY2hpdmVCYXIsIGFyY2hpdmVJZClcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgfSxcclxuICBzaG93TmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgdmlldy5zaG93TmV3QXJjaGl2ZUlucHV0KClcclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmUoKSB7XHJcbiAgICAvLyBnZXQgdXNlciBpbnB1dFxyXG4gICAgY29uc3QgYXJjaGl2ZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJjaGl2ZU5hbWUtaW5wdXQnKS52YWx1ZVxyXG5cclxuICAgIC8vIG5vIGVtcHR5IGlucHV0IGFsbG93ZWRcclxuICAgIGlmICghYXJjaGl2ZU5hbWUpIHtcclxuICAgICAgdmlldy5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gICAgICBjb25zb2xlLmxvZygnTm8gZW1wdHkgaW5wdXQgYWxsb3dlZCEnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdCBhcmNoaXZlIGRhdGEsIGFkZCBuZXcgYXJjaGl2ZSBpbiBkYXRhXHJcbiAgICAvLyBuZXdBcmNoaXZlOiBkYXRhXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlID0gbW9kZWwuY3JlYXRlTmV3QXJjaGl2ZUluRGF0YShhcmNoaXZlTmFtZSlcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LmNyZWF0ZU5ld0FyY2hpdmVJblNpZGViYXIobmV3QXJjaGl2ZSlcclxuICAgIHZpZXcuY3JlYXRlTmV3QXJjaGl2ZUluQ29udGVudChuZXdBcmNoaXZlKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjYW5jZWxOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICB2aWV3LmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfSxcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfSxcclxuICB1cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSkge1xyXG4gICAgLy8gZ2V0IHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0VGFiRE9NLmRhdGFzZXQuaWRcclxuICAgIGNvbnN0IHRhYk5hbWVJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgaW5wdXQnKS52YWx1ZVxyXG5cclxuICAgIC8vIGNoZWNrXHJcbiAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJykudGV4dENvbnRlbnRcclxuICAgIGlmIChvcmlnaW5hbFRpdGxlID09PSB0YWJOYW1lSW5wdXQpIHtcclxuICAgICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gZmluZCB0YWIgaW4gYXJjaGl2ZSB2aWEgdGFiSWQsIHVwZGF0ZSBpdFxyXG4gICAgbW9kZWwudXBkYXRlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQsIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3IFxyXG4gICAgdmlldy51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSwgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBzZXRVcERyYWdBbmREcm9wU3lzdGVtKCkge1xyXG4gICAgLy8gZXZlbnRMaXN0ZW5lciBpbiB2aWV3XHJcbiAgICAvLyB2aWV3IGNhbGxzIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIHZpZXcuc2V0VXBEcmFnQW5kRHJvcFN5c3RlbSgpXHJcbiAgfSxcclxuXHJcbiAgLy8gIGRldmVsb3BpbmcgbWV0aG9kc1xyXG4gIGNsZWFyU3RvcmFnZSgpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuY2xlYXIoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnU3RvcmFnZSBjbGVhcmVkIScpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2hvd1N0b3JhZ2UoKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2FyY2hpdmUnXSwgKGRhdGEpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IGRhdGEgPSB7XHJcbiAgYXJjaGl2ZToge30sXHJcbiAgbGFzdFRhYklkOiAnJyxcclxuICBsYXN0QXJjaGl2ZUlkOiAnJ1xyXG59IiwiaW1wb3J0IHsgdXRpbHMgfSBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi9kYXRhLmpzJ1xyXG4vLyAgIGFyY2hpdmU6IHt9LFxyXG4vLyAgIGxhc3RUYWJJZDogJycsXHJcbi8vICAgbGFzdEFyY2hpdmVJZDogJydcclxuXHJcbi8vIEFyY2hpdmUgcHJvdG9cclxuY29uc3QgQXJjaGl2ZURhdGEgPSBmdW5jdGlvbiAoYXJjaGl2ZU5hbWUsIGlkKSB7XHJcbiAgdGhpcy5hcmNoaXZlTmFtZSA9IGFyY2hpdmVOYW1lIHx8ICdOZXcgQXJjaGl2ZSdcclxuICB0aGlzLmlkID0gaWRcclxuICB0aGlzLmFyY2hpdmVzTGlzdCA9IFtdXHJcbiAgdGhpcy51bmNsYXNzaWZpZWQgPSBbXVxyXG59XHJcblxyXG5jb25zdCBUYWJEYXRhID0gZnVuY3Rpb24gKGlkLCBpY29uLCB0aXRsZSwgdGFncywgY3JlYXRlZEF0LCB1cmwsIHVwZGF0ZWRBdCkge1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gIHRoaXMudXJsID0gdXJsXHJcbiAgdGhpcy5pY29uID0gaWNvblxyXG4gIHRoaXMuY3JlYXRlZEF0ID0gY3JlYXRlZEF0XHJcbiAgdGhpcy51cGRhdGVkQXQgPSB1cGRhdGVkQXRcclxuICB0aGlzLmZpbmlzaFJlYWRpbmcgPSBmYWxzZVxyXG4gIHRoaXMudGFncyA9IHRhZ3NcclxufVxyXG5cclxuY29uc3QgdGFiSW5uZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0YWIpIHtcclxuICBjb25zdCB7IGlkLCBpY29uLCB0aXRsZSwgY3JlYXRlZEF0LCB1cmwsIHRhZ3MgfSA9IHRhYlxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdudW1iZXIgYm94Jz5cclxuICAgICAgPHA+JHtpZH08L3A+XHJcbiAgICAgICAgICA8L2RpdiA+XHJcbiAgICA8ZGl2IGNsYXNzPSdpY29uIGJveCc+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIlwiPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSd0aXRsZSBib3gnPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgY2FuY2VsLWVkaXQtdGFiLWlucHV0IG5vbmVcIj48L2k+XHJcblxyXG4gICAgICA8cD4ke3RpdGxlfTwvcD5cclxuXHJcbiAgICAgIDxpbnB1dCBjbGFzcz0nZWRpdC10YWItbmFtZS1pbnB1dCBub25lJyBwbGFjZWhvbGRlcj0nJHt0aXRsZX0nIHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiNDVcIj5cclxuXHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbi1hbHQgc2hvdy1lZGl0LXRhYi1uYW1lXCI+PC9pPlxyXG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVjay1jaXJjbGUgY29uZmlybS10YWItZWRpdCBub25lXCIgZGF0YS1pZD1cIiR7aWR9XCI+PC9pPlxyXG5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0ndGFncyBib3gnPlxyXG4gICAgICA8cD4ke3RhZ3N9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdjcmVhdGVkQXQgYm94Jz5cclxuICAgICAgPHA+JHtjcmVhdGVkQXR9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdidG4gYm94Jz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nb3Blbi10YWInIGRhdGEtdXJsPVwiJHt1cmx9XCI+XHJcbiAgICAgICAgb3BlblxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz0nYnRuIGJveCc+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS10YWInIGRhdGEtdGFiaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgIGRlbGV0ZVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGVsID0ge1xyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJbkRhdGEoYXJjaGl2ZU5hbWUpIHtcclxuICAgIGNvbnN0IG5ld0lkID0gZGF0YS5sYXN0QXJjaGl2ZUlkICs9IDFcclxuICAgIGNvbnN0IGlkID0gdXRpbHMuaWRGb3JtYXR0ZXIoJ2FyY2hpdmUnLCBuZXdJZClcclxuXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRGF0YSA9IG5ldyBBcmNoaXZlRGF0YShhcmNoaXZlTmFtZSwgaWQpXHJcblxyXG4gICAgLy8gcHVzaCBuZXdBcmNoaXZlRGF0YSB0byBkYXRhLmFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZS5hcmNoaXZlc0xpc3QucHVzaChuZXdBcmNoaXZlRGF0YSlcclxuXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZURhdGFcclxuICB9LFxyXG4gIGNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihhcmNoaXZlKSB7XHJcbiAgICBjb25zdCB7IGFyY2hpdmVOYW1lLCBpZCB9ID0gYXJjaGl2ZVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1mb2xkZXJcIj48L2k+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cD4ke2FyY2hpdmVOYW1lfTwvcD5cclxuICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgZGVsZXRlLWFyY2hpdmVcIiBkYXRhLWlkPVwiJHtpZH1cIj48L2k+XHJcbiAgICAgIDwvZGl2PiBcclxuICAgIGBcclxuICAgIG5ld0FyY2hpdmUuY2xhc3NMaXN0ID0gJ2FyY2hpdmUgYXJjaGl2ZS1zdHlsZSdcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIGNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoYXJjaGl2ZSkge1xyXG4gICAgY29uc3QgeyBhcmNoaXZlTmFtZSwgYXJjaGl2ZXNMaXN0LCB1bmNsYXNzaWZpZWQsIGlkIH0gPSBhcmNoaXZlXHJcblxyXG4gICAgbGV0IHVuY2xhc3NpZmllZERPTVMgPSAnJ1xyXG5cclxuICAgIGlmICh1bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSB1bmNsYXNzaWZpZWQubWFwKGVhY2ggPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSd0YWIgdGFiLXN0eWxlJyBkcmFnZ2FibGU9XCJ0cnVlXCIgaWQ9XCJ0YWItJHtlYWNoLmlkfVwiIGRhdGEtaWQ9XCIke2VhY2guaWR9XCI+XHJcbiAgICAgICAgICAgICR7dGFiSW5uZXJUZW1wbGF0ZShlYWNoKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgICAgfSkuam9pbignJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuY2xhc3NpZmllZERPTVMgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9J3RhYiBlbXB0eSB0YWItc3R5bGUnPlxyXG4gICAgICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBuZXdBcmNoaXZlLmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz0nYXJjaGl2ZU5hbWUnPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cImFyY2hpdmUke2lkfS1kcm9wZG93blwiIGNsYXNzPSdhcmNoaXZlLWRyb3Bkb3duJyB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCI+XHJcbiAgICAgICAgICA8aDMgdW5zZWxlY3RhYmxlPVwib25cIj4ke2FyY2hpdmVOYW1lfTwvaDM+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuc1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm9wZW4tYWxsXCIgZGF0YS1pZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICAgICAgICBPcGVuIEFsbFxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0blwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS1hbGwtaW4tYXJjaGl2ZScgZGF0YS1pZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICAgICAgICBEZWxldGUgQWxsXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1jb250ZW50XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZXNMaXN0XCI+XHJcbiAgICAgICAgICAgIDxwPiR7YXJjaGl2ZXNMaXN0fTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtbGlzdFwiPlxyXG4gICAgICAgICAgICAke3VuY2xhc3NpZmllZERPTVN9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgXHJcblxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSBgYXJjaGl2ZSBkcm9wem9uZSBhcmNoaXZlLXN0eWxlIGFyY2hpdmUtJHtpZH0tY29udGVudGBcclxuICAgIG5ld0FyY2hpdmUuZGF0YXNldC5hcmNoaXZlSWQgPSBpZFxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVcclxuICB9LFxyXG4gIGNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWJEYXRhKSB7XHJcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgdGFiLmlubmVySFRNTCA9IHRhYklubmVyVGVtcGxhdGUodGFiRGF0YSlcclxuICAgIHRhYi5jbGFzc0xpc3QgKz0gJ3RhYiB0YWItc3R5bGUnXHJcbiAgICB0YWIuaWQgPSBgdGFiLSR7dGFiRGF0YS5pZH1gXHJcbiAgICB0YWIuZGF0YXNldC5pZCA9IHRhYkRhdGEuaWRcclxuICAgIHRhYi5kcmFnZ2FibGUgPSB0cnVlXHJcbiAgICByZXR1cm4gdGFiXHJcbiAgfSxcclxuICBhc3luYyBnZXRTdG9yYWdlRGF0YSh0YXJnZXREYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFt0YXJnZXREYXRhXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVqZWN0IScpXHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsT3BlbmVkVGFicygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IGZhbHNlIH0sIChxdWVyeVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGFicyA9IFtdXHJcbiAgICAgICAgICBmb3IgKGxldCB0YWIgb2YgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICh0YWIudGl0bGUgPT09IFwiY2hyb21lLnRhYnMgLSBDaHJvbWUgRGV2ZWxvcGVyc1wiKSB8fFxyXG4gICAgICAgICAgICAgICh0YWIudXJsID09PSBcImNocm9tZTovL2V4dGVuc2lvbnMvXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwuc3BsaXQoJzovLycpWzBdID09PSAnY2hyb21lLWV4dGVuc2lvbicpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwgPT09ICdjaHJvbWU6Ly9uZXd0YWIvJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiLmlkKVxyXG5cclxuICAgICAgICAgICAgLy8gZm9ybSB0YWJEYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdXRpbHMudHJpbVN0cmluZyh1dGlscy5lc2NhcGVIdG1sKHRhYi50aXRsZSksIDQ1KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgeyBmYXZJY29uVXJsOiBpY29uLCB1cmwgfSA9IHRhYlxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW11cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBpZFxyXG4gICAgICAgICAgICBkYXRhLmxhc3RUYWJJZCsrXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdXRpbHMuaWRGb3JtYXR0ZXIoJ3RhYicsIGRhdGEubGFzdFRhYklkKVxyXG5cclxuICAgICAgICAgICAgdGFicy5wdXNoKG5ldyBUYWJEYXRhKGlkLCBpY29uLCB0aXRsZSwgdGFncywgY3JlYXRlZEF0LCB1cmwsIHVwZGF0ZWRBdCkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0YWJzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc3RvcmVBcmNoaXZlKCkge1xyXG4gICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgY29uc3QgeyBhcmNoaXZlIH0gPSBkYXRhXHJcbiAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gJ3Jvb3QtYXJjaGl2ZSdcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzdG9yZS1hcmNoaXZlJyxcclxuICAgICAgZGF0YTogYXJjaGl2ZVxyXG4gICAgfVxyXG5cclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdICcsIG1lc3NhZ2UpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHVwZGF0ZVRhYihhcmNoaXZlLCB0YWJJZCwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSB0YWJJZFxyXG4gICAgY29uc29sZS5sb2coJ2luIHVwZGF0ZVRhYicsIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICBjb25zdCBmaW5kVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW4gZmluZFRhYkJ5SWQnLCB0YWJOYW1lSW5wdXQpXHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBoaXQ6ICcsIHRhYk5hbWVJbnB1dClcclxuICAgICAgICAgICAgdGFiLnRpdGxlID0gdGFiTmFtZUlucHV0XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICB9LFxyXG4gIHJlbW92ZVRhYihhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgY29uc3QgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUudW5jbGFzc2lmaWVkLmluZGV4T2YodGFiKVxyXG4gICAgICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICByZW1vdmVBcmNoaXZlKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZGVsZXRlQXJjaGl2ZUJ5SWQgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUuYXJjaGl2ZXNMaXN0LmluZGV4T2Yoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgIGFyY2hpdmUuYXJjaGl2ZXNMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlQXJjaGl2ZUJ5SWQoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBcmNoaXZlQnlJZChhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkID0gW11cclxuICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IGFyY2hpdmVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS51bmNsYXNzaWZpZWQgPSBbXVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIHRhcmdldEFyY2hpdmVcclxuICB9LFxyXG4gIHNlYXJjaEFyY2hpdmVCeUlkKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcbiAgICBsZXQgdGFyZ2V0QXJjaGl2ZSA9IHt9XHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IGFyY2hpdmVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBzdWJBcmNoaXZlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICAgIHJldHVybiB0YXJnZXRBcmNoaXZlXHJcbiAgfSxcclxuICBnZXRUYWJEYXRhVmlhVGFiRE9NKHRhYkRPTSkge1xyXG4gICAgcmV0dXJuICh7XHJcbiAgICAgIGlkOiB0YWJET00ucXVlcnlTZWxlY3RvcignLm51bWJlciBwJykudGV4dENvbnRlbnQsXHJcbiAgICAgIGljb246IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuaWNvbiBpbWcnKS5zcmMsXHJcbiAgICAgIHRpdGxlOiB0YWJET00ucXVlcnlTZWxlY3RvcignLnRpdGxlIHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgdGFnczogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50YWdzIHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgY3JlYXRlZEF0OiB0YWJET00ucXVlcnlTZWxlY3RvcignLmNyZWF0ZWRBdCBwJykudGV4dENvbnRlbnQsXHJcbiAgICAgIHVybDogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5idG4gYnV0dG9uJykuZGF0YXNldC51cmwsXHJcbiAgICAgIHVwZGF0ZWRBdDogJydcclxuICAgIH0pXHJcbiAgfSxcclxuICAvLyByZWN1cnNpdmUgc2VhcmNoIHByb3RvdHlwZSAvL1xyXG4gIHNlYXJjaFRhYkJ5SWQ6IGZ1bmN0aW9uIChhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gdGFiSWRcclxuXHJcbiAgICBjb25zdCBmaW5kVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUudW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YWIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICBmaW5kVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRUYWJCeUlkKGFyY2hpdmUsIHRhcmdldElkKVxyXG4gIH1cclxufSIsImV4cG9ydCBjb25zdCB1dGlscyA9IHtcclxuICBpZEZvcm1hdHRlcjogZnVuY3Rpb24gKHR5cGUsIG51bSkge1xyXG4gICAgLy8gdHlwZSA9IFwidGFiXCIgfHwgXCJhcmNoaXZlXCJcclxuICAgIGxldCBtb2RlID0gdHlwZSA9PT0gJ3RhYicgPyA1IDogM1xyXG4gICAgbnVtID0gbnVtICsgJydcclxuICAgIGxldCBvdXRwdXQgPSBudW0uc3BsaXQoJycpXHJcbiAgICBpZiAobnVtLmxlbmd0aCA8IG1vZGUpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlIC0gbnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgb3V0cHV0LnVuc2hpZnQoJzAnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXHJcbiAgfSxcclxuICBlc2NhcGVIdG1sOiBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nXHJcbiAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbiAgfSxcclxuICB0cmltU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nLCBtZXhsZW5ndGgpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIG1leGxlbmd0aClcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcblxyXG5cclxuLy8gbm90IGRvbmVcclxuY29uc3QgZGV0ZWN0RHJvcExvY2F0aW9uID0gZnVuY3Rpb24gKHRhYklkLCBkcmFnZW50ZXIsIGRyYWdsZWF2ZSkge1xyXG4gIGNvbnNvbGUubG9nKCd0YWJJZDogICAgICcgKyB0YWJJZClcclxuICBjb25zb2xlLmxvZygnZHJhZ2VudGVyOiAnICsgZHJhZ2VudGVyKVxyXG4gIGNvbnNvbGUubG9nKCdkcmFnbGVhdmU6ICcgKyBkcmFnbGVhdmUpXHJcbiAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLScpXHJcbiAgbGV0IHJlc3VsdCA9ICdubyBkZXRlY3QnXHJcbiAgaWYgKCh0YWJJZCA9PT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSkpIHtcclxuICAgIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG4gIH0gZWxzZSBpZiAoKHRhYklkICE9PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKSkge1xyXG4gICAgcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcbiAgfSBlbHNlIGlmICgoZHJhZ2VudGVyID09PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcikpIHtcclxuICAgIHJlc3VsdCA9IGBiZWZvcmUgJHtkcmFnbGVhdmV9YFxyXG4gIH0gZWxzZSBpZiAoKGRyYWdlbnRlciAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpKSB7XHJcbiAgICByZXN1bHQgPSBgYWZ0ZXIgJHtkcmFnZW50ZXJ9YFxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coJ3Jlc3VsdDogJyArIHJlc3VsdClcclxuICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tJylcclxuICByZXR1cm5cclxufVxyXG5cclxuLy8gKHRhYklkID09PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKVxyXG4vLyBBIEEgQVxyXG4vLyByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuXHJcbi8vICh0YWJJZCAhPT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSlcclxuLy8gQSBCIEFcclxuLy8gcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcblxyXG4vLyAoZHJhZ2VudGVyID09PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcilcclxuLy8gQSBCIEIgXHJcbi8vIGRyYWdsZWF2ZSDnmoTliY3kuIDlgItcclxuXHJcbi8vIChkcmFnZW50ZXIgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKVxyXG4vLyBBIEIgQ1xyXG4vLyBkcmFnbGVhdmUg55qE5YmN5LiA5YCLXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHZpZXcgPSB7XHJcbiAgc2hvd1RhYnNJbkNvbnRlbnQoZGF0YSkge1xyXG4gICAgLy8gZGF0YTogcm9vdC51bmNsYXNzaWZpZWRcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcbiAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG5cclxuICAgIGlmICghZGF0YS5sZW5ndGgpIHtcclxuICAgICAgdGFic0xpc3QuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgICAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHRhYiBvZiBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IG5ld1RhYiA9IG1vZGVsLmNyZWF0ZVRhYkRPTUluQ29udGVudCh0YWIpXHJcbiAgICAgIC8vIGFkZCBldmVudExpc3RlbmVyIHRvIG5ldyB0YWJzIC8vXHJcbiAgICAgIHRoaXMuc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbShuZXdUYWIpXHJcblxyXG4gICAgICB0YWJzTGlzdC5hcHBlbmRDaGlsZChuZXdUYWIpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93Um9vdEFyY2hpdmVMaXN0KGxpc3QpIHtcclxuICAgIC8vIGxpc3Q6IHJvb3QuYXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5cclxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBuZXdTaWRlYmFyQXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihpdGVtKVxyXG4gICAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld1NpZGViYXJBcmNoaXZlKVxyXG5cclxuICAgICAgY29uc3QgbmV3Q29udGVudEFyY2hpdmUgPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGl0ZW0pXHJcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q29udGVudEFyY2hpdmUpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93TmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgLy8gaGlkZSBpbnB1dCBpY29uXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmljb24nKVxyXG4gICAgaWNvbi5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG5cclxuICAgIC8vIGhpZGUgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcCcpXHJcbiAgICBpZiAoIXAuY2xhc3NOYW1lLmluY2x1ZGVzKCdub25lJykpIHtcclxuICAgICAgcC5jbGFzc05hbWUgKz0gJyBub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3cgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcblxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2FuY2VsIE5ldyBBcmNoaXZlIElucHV0JylcclxuXHJcbiAgICAvL3Jlc3RvcmUgXHJcbiAgICAvLyBoaWRlIGlucHV0IFVJXHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IGlucHV0JylcclxuICAgIGNvbnN0IGNhbmNlbEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY2FuY2VsJylcclxuICAgIGNvbnN0IGNvbmZpcm1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNvbmZpcm0nKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICAgIGNvbmZpcm1JY29uLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdCArPSAnIG5vbmUnXHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dCBpY29uXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmljb24nKVxyXG4gICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuXHJcbiAgICAvLyBzaG93IDxwPlxyXG4gICAgY29uc3QgcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IHAuc2hvdy1uZXctYXJjaGl2ZS1pbnB1dCcpXHJcbiAgICBwLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIGNsZWFyIGlucHV0IHZhbHVlXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJjaGl2ZU5hbWUtaW5wdXQnKS52YWx1ZSA9ICcnXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5TaWRlYmFyKG5ld0FyY2hpdmUpIHtcclxuICAgIGNvbnN0IG5ld0FyY2hpdmVET00gPSBtb2RlbC5jcmVhdGVBcmhpdmVET01JblNpZGViYXIobmV3QXJjaGl2ZSlcclxuXHJcbiAgICAvLyBwdXNoIG5ld0FyY2hpdmVET00gaW50byBzaWRlYmFyQXJjaGl2ZXNMaXN0XHJcbiAgICBjb25zdCBzaWRlYmFyQXJjaGl2ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmFyY2hpdmVzTGlzdCcpXHJcbiAgICBzaWRlYmFyQXJjaGl2ZXNMaXN0LmFwcGVuZENoaWxkKG5ld0FyY2hpdmVET00pXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5Db250ZW50KG5ld0FyY2hpdmUpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcbiAgICBjb25zdCBuZXdBcmNoaXZlRE9NID0gbW9kZWwuY3JlYXRlQXJjaGl2ZURPTUluQ29udGVudChuZXdBcmNoaXZlKVxyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChuZXdBcmNoaXZlRE9NKVxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gaGlkZSAudGl0bGUgcFxyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHBhc3MgdGl0bGUgdG8gaW5wdXQgdmFsdWVcclxuICAgIGlucHV0LnZhbHVlID0gdGl0bGVQLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dFxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwtRWRpdC1UYWItSW5wdXQnKVxyXG5cclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gdG8gc2hvd1xyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgLy8gdG8gaGlkZVxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICB9LFxyXG4gIHVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICB0aXRsZVAudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICB9LFxyXG4gIHJlbW92ZVRhYih0YWJCYXIpIHtcclxuICAgIHRhYkJhci5yZW1vdmUoKVxyXG4gIH0sXHJcbiAgcmVtb3ZlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpIHtcclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGZyb20gc2lkZWJhclxyXG4gICAgYXJjaGl2ZUJhci5yZW1vdmUoKVxyXG5cclxuICAgIC8vIHJlbW92ZSBhcmNoaXZlIGluIGNvbnRlbnRcclxuICAgIGNvbnN0IGFyY2hpdmVCYXJJbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYXJjaGl2ZS0ke2FyY2hpdmVJZH0tY29udGVudGApXHJcbiAgICBhcmNoaXZlQmFySW5Db250ZW50LnJlbW92ZSgpXHJcblxyXG4gIH0sXHJcbiAgY2xlYXJUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZCkge1xyXG4gICAgY29uc29sZS5sb2coJ2FyY2hpdmVJZDogJywgYXJjaGl2ZUlkKVxyXG4gICAgLy8gcmV0dXJuXHJcbiAgICBsZXQgdW5jbGFzc2lmaWVkTGlzdCA9ICcnXHJcblxyXG4gICAgaWYgKGFyY2hpdmVJZCA9PT0gJzAwMScpIHtcclxuICAgICAgdW5jbGFzc2lmaWVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQgLnRhYnMtbGlzdCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgLmFyY2hpdmUtJHthcmNoaXZlSWR9LWNvbnRlbnQgLnRhYnMtbGlzdGBcclxuICAgICAgdW5jbGFzc2lmaWVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHVuY2xhc3NpZmllZExpc3QuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgICAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gIH0sXHJcbiAgLy8gZHJhZyBhbmQgZHJvcCBoYW5kbGVyc1xyXG4gIHNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKSB7XHJcbiAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpXHJcblxyXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0aGlzLnNldFVwVGFiRHJhZ0FuZERyb3BTeXN0ZW0odGFiKSlcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmU6IHVuY2xhc3NpZmllZCwgZHJvcHpvbmVcclxuICAgIGNvbnN0IGRyb3B6b25lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wem9uZScpXHJcbiAgICBjb25zdCB1bmNsYXNzaWZpZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5jbGFzc2lmaWVkJylcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmUgZm9yIGFyY2hpdmVzXHJcbiAgICBkcm9wem9uZXMuZm9yRWFjaChkcm9wem9uZSA9PiB0aGlzLnNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKGRyb3B6b25lKSlcclxuXHJcbiAgICAvLyBzZXQgdXAgZHJvcHpvbmUgZm9yIHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICB0aGlzLnNldFVwVW5jbGFzc2lmaWVkRHJhZ0FuZERyb3BTeXN0ZW0odW5jbGFzc2lmaWVkKVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7IHRoaXMudW5jbGFzc2lmaWVkRHJvcHBlZEhhbmRsZXIoZSwgdW5jbGFzc2lmaWVkKSB9KVxyXG4gIH0sXHJcbiAgc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbSh0YWJET00pIHtcclxuICAgIC8vIGVtcHR5IHRhYiBpcyBub3QgZHJhZ2dhYmxlXHJcbiAgICBpZiAodGFiRE9NLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkgcmV0dXJuXHJcblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgIGNvbnNvbGUubG9nKCd0YXJnZXQgaWQ6ICcgKyB0YXJnZXQuaWQpXHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB0YXJnZXQuaWRcclxuXHJcbiAgICAgIC8vIGRhdGFUcmFuc2Zlci5zZXREYXRhXHJcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBwYXlsb2FkKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBkZXRlY3QgZHJvcCBsb2NhdGlvblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgLy8gZHJhZ2VudGVyID0gdGFiLmlkXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkcmFnZW50ZXI6ICcgKyBkcmFnZW50ZXIpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAvLyBkcmFnbGVhdmUgPSB0YWIuaWRcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2V0VXBBcmNoaXZlRHJhZ0FuZERyb3BTeXN0ZW0oYXJjaGl2ZURPTSkge1xyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgYXJjaGl2ZURPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4geyB0aGlzLmFyY2hpdmVEcm9wcGVkSGFuZGxlcihlLCBhcmNoaXZlRE9NKSB9KVxyXG4gIH0sXHJcbiAgc2V0VXBVbmNsYXNzaWZpZWREcmFnQW5kRHJvcFN5c3RlbSh1bmNsYXNzaWZpZWRET00pIHtcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZERPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gIH0sXHJcbiAgcHJldmVudERlZmF1bHRIYW5kbGVyKGUpIHtcclxuICAgIC8vIGRlZmF1bHQ6IHRhZyBjYW5ub3QgYmUgZHJhZ2dlZFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gdGhlbiBvdXIgRE9NIGNhbiBiZSBkcmFnZ2VkIGluc2lkZVxyXG4gIH0sXHJcbiAgYXJjaGl2ZURyb3BwZWRIYW5kbGVyKGUsIGFyY2hpdmVET00pIHtcclxuICAgIHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpXHJcblxyXG4gICAgY29uc3QgdGFiRE9NSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnN0IHRhYkRPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RhYkRPTUlkfWApXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IGFyY2hpdmVET00ucXVlcnlTZWxlY3RvcignLnRhYnMtbGlzdCcpXHJcblxyXG4gICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQodGFiRE9NKVxyXG5cclxuICAgIGNvbnN0IHRhYkRhdGEgPSBtb2RlbC5nZXRUYWJEYXRhVmlhVGFiRE9NKHRhYkRPTSlcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gYXJjaGl2ZURPTS5kYXRhc2V0LmFyY2hpdmVJZFxyXG5cclxuICAgIC8vIGRlbGV0ZSBvcmlnaW5hbCB0YWJcclxuICAgIGNvbnN0IHRhYklkID0gdGFiRE9NSWQuc3BsaXQoJy0nKVsxXVxyXG4gICAgbW9kZWwucmVtb3ZlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQpXHJcblxyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZSA9IG1vZGVsLnNlYXJjaEFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG4gICAgdGFyZ2V0QXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWJEYXRhKVxyXG5cclxuICAgIC8vIGNhbGwgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIHVuY2xhc3NpZmllZERyb3BwZWRIYW5kbGVyKGUsIHVuY2xhc3NpZmllZCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCB0YWJET01JZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3QgdGFiRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGFiRE9NSWR9YClcclxuICAgIGNvbnN0IHRhYnNMaXN0ID0gdW5jbGFzc2lmaWVkLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIC8vIGFsdGVybmF0aXZlIC5pbnNlcnRCZWZvcmUoKTpcclxuICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuXHJcbiAgICBjb25zdCB0YWJEYXRhID0gbW9kZWwuZ2V0VGFiRGF0YVZpYVRhYkRPTSh0YWJET00pXHJcblxyXG4gICAgLy8gZGVsZXRlIG9yaWdpbmFsIHRhYlxyXG4gICAgY29uc3QgdGFiSWQgPSB0YWJET01JZC5zcGxpdCgnLScpWzFdXHJcbiAgICBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuICAgIC8vIGNvbnNvbGUubG9nKClcclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgYnkgSWQsIGFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiKVxyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gJzAwMSdcclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmUgPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHRhcmdldEFyY2hpdmUudW5jbGFzc2lmaWVkLnB1c2godGFiRGF0YSlcclxuXHJcbiAgICAvLyBjYWxsIG1vZGVsIHRvIHN0b3JlIGRhdGFcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gZGV0ZWN0RHJvcExvY2F0aW9uKHRhYkRPTUlkLCBkcmFnZW50ZXIsIGRyYWdsZWF2ZSlcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc3R5bGVzL25vcm1hbGl6ZS5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hcHBsaWNhdGlvbi5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9pbmRleC5zY3NzJ1xyXG5cclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci5qcydcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coJ1tJbmRleF0gSW5kZXguaHRtbCBsb2FkZWQhIEFzayBmb3IgYXJjaGl2ZSBkYXRhIScpXHJcbiAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgIG1lc3NhZ2U6ICdnZXQtYXJjaGl2ZS1kYXRhJyxcclxuICAgIGRhdGE6IG51bGxcclxuICB9XHJcblxyXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChyZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ1tJbmRleF0gcmVjZWl2ZWQgYXJjaGl2ZSBkYXRhJywgcmVzcG9uc2UpXHJcbiAgICBjb25zdCB7IGFyY2hpdmUsIGxhc3RUYWJJZCwgbGFzdEFyY2hpdmVJZCB9ID0gcmVzcG9uc2VcclxuICAgIGRhdGEubGFzdFRhYklkID0gbGFzdFRhYklkXHJcbiAgICBkYXRhLmxhc3RBcmNoaXZlSWQgPSBsYXN0QXJjaGl2ZUlkXHJcbiAgICBjb250cm9sbGVyLmluaXRMb2NhbEFyY2hpdmVEYXRhKGFyY2hpdmUpXHJcblxyXG4gICAgLy8gc2V0dXAgZHJvcCBpdGVtICYgZHJvcCB6b25lXHJcbiAgICBjb250cm9sbGVyLnNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBldmVudExpc3RlbmVyXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuXHJcbiAgLy8gY2FuY2VsIHNob3cgaW5wdXRcclxuICAvLyBjb250cm9sbGVyLmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcblxyXG4gIC8vIGdldCBhbGwgb3BlbmVkIHRhYnNcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1hbGwtYnRuJykge1xyXG4gICAgY29udHJvbGxlci5nZXRBbGxPcGVuZWRUYWJzKClcclxuICB9XHJcblxyXG4gIC8vIG9lcG4gYWxsIHRhYnMgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi1hbGwnKSB7XHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSB0YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgY29udHJvbGxlci5vcGVuQWxsVGFicyhhcmNoaXZlSWQpXHJcbiAgfVxyXG5cclxuICAvLyBvcGVuIGNldGFpbiB0YWIgaW4gYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnb3Blbi10YWInKSB7XHJcbiAgICBjb25zdCB1cmwgPSB0YXJnZXQuZGF0YXNldC51cmxcclxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCwgYWN0aXZlOiBmYWxzZSB9KVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBuZXcgYXJjaGl2ZSBpbnB1dFxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LW5ldy1hcmNoaXZlLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuc2hvd05ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfVxyXG5cclxuICAvLyBjYW5jZWwgbmV3IGFyY2hpdmUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLW5ldy1hcmNoaXZlLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICB9XHJcblxyXG4gIC8vIGNyZWF0ZSBuZXcgYXJjaGl2ZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctYXJjaGl2ZS1uYW1lLWlucHV0JykpIHtcclxuICAgIGNvbnRyb2xsZXIuY3JlYXRlTmV3QXJjaGl2ZSgpXHJcbiAgfVxyXG5cclxuICAvLyBzaG93IGVkaXQgdGFiIG5hbWUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1lZGl0LXRhYi1uYW1lJykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FuY2VsIGVkaXQgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLWVkaXQtdGFiLWlucHV0JykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsRWRpdFRhYklucHV0KHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIHVwZGF0ZSB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLXRhYi1lZGl0JykpIHtcclxuICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyBkZWxldGUgb25lIGNlcnRhaW4gdGFiIGluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZS10YWInKSB7XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhcmdldC5kYXRhc2V0LnRhYmlkXHJcbiAgICBjb25zdCB0YWJCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZVRhYih0YWJCYXIsIHRhYklkKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIGNlcnRhaW4gYXJjaGl2ZSBmcm9tIHNpZGViYXJcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWFyY2hpdmUnKSkge1xyXG4gICAgY29uc3QgYXJjaGl2ZUJhciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZUFyY2hpdmUoYXJjaGl2ZUJhciwgdGFyZ2V0QXJjaGl2ZUlkKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIGFsbCB1bmNsYXNzaWZpZWQgdGFicyBpbiBjZXJ0YWluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZS1hbGwtaW4tYXJjaGl2ZScpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZUFsbFRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKVxyXG4gIH1cclxuXHJcblxyXG5cclxuICAvLy8vLyBmb3IgZGV2ZWxvcGluZyAvLy8vL1xyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ2V0LWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dTdG9yYWdlKCdhcmNoaXZlJylcclxuICB9XHJcblxyXG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnY2xlYXItZGF0YScpIHtcclxuICAgIGNvbnRyb2xsZXIuY2xlYXJTdG9yYWdlKClcclxuICB9XHJcbn0sIGZhbHNlKVxyXG4vLyBmYWxzZSA9IGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuLy8gdG8gc3RvcCBidWJibGluZzogZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcbi8vIEtleWJvYXJkRXZlbnRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcblxyXG4gIC8vIGlucHV0IG5ldyBhcmNoaXZlIG5hbWVcclxuICBpZiAodGFyZ2V0LmlkID09PSAnYXJjaGl2ZU5hbWUtaW5wdXQnKSB7XHJcbiAgICBpZiAoKGUuY29kZSA9PT0gJ0VudGVyJykgfHwgKGUuY29kZSA9PT0gJ051bXBhZEVudGVyJykpIHtcclxuICAgICAgY29udHJvbGxlci5jcmVhdGVOZXdBcmNoaXZlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlucHV0IHVwZGF0ZSB0YWIgbmFtZVxyXG4gIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhYi1uYW1lLWlucHV0JykpIHtcclxuICAgIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gICAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlVGFiTmFtZSh0YXJnZXRUYWJET00pXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==