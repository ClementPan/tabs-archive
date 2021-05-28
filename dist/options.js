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
      unclassifiedDOMS = `
      <div class='tab empty tab-style'>
        <p class='empty-tab'>No tab here yet!</p>
      </div>
      `
    }

    const newArchive = document.createElement('div')
    newArchive.innerHTML = archiveInnerTemplate(archive, unclassifiedDOMS,)

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
  // edit tab name
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

  // unput update archive name
  if (target.classList.contains('archive-title-input-content')) {
    if ((e.code === 'Enter') || (e.code === 'NumpadEnter')) {
      const titleDOM = target.parentElement
      _controller_js__WEBPACK_IMPORTED_MODULE_4__.controller.updateArchiveTitleContent(titleDOM)
    }
  }
})





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zdHlsZXMvbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvZGF0YS5qcyIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvLi9zcmMvb3B0aW9ucy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGFicy1hcmNoaXZlLy4vc3JjL29wdGlvbnMvc2NyaXB0cy92aWV3LmpzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YWJzLWFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RhYnMtYXJjaGl2ZS8uL3NyYy9vcHRpb25zL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0M7QUFDRjtBQUNBOztBQUV6QjtBQUNQO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFD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O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5RUFBNkI7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBd0I7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrRkFBc0M7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRkFBd0M7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRkFBb0M7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdFQUFvQjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUF3QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkVBQWlDO0FBQ3JDOzs7O0FBSUE7QUFDQTtBQUNBLElBQUksa0VBQXNCO0FBQzFCOztBQUVBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0I7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sdUVBQTJCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG9FQUF3QjtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxnRkFBb0M7QUFDMUM7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IG1vZGVsIH0gZnJvbSAnLi9tb2RlbC5qcydcclxuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldy5qcydcclxuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4vZGF0YS5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGFzeW5jIGdldEFsbE9wZW5lZFRhYnMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnZXQgYWxsIGFjdGl2ZSB0YWJzXHJcbiAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBhd2FpdCBtb2RlbC5nZXRBbGxPcGVuZWRUYWJzKClcclxuXHJcbiAgICAgIC8vIGFkZCBuZXcgdGFicyB0byByb290LnVuY2xhc3NpZmllZFxyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgYWN0aXZlVGFicykge1xyXG4gICAgICAgIGRhdGEuYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYW5nZSB2aWV3XHJcbiAgICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgICAgdmlldy5zaG93VGFic0luQ29udGVudCh1bmNsYXNzaWZpZWQpXHJcblxyXG4gICAgICAvLyBzdG9yZSBkZWZhdWx0QXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRMb2NhbEFyY2hpdmVEYXRhKHJlc3BvbnNlKSB7XHJcbiAgICAvLyBzdG9yZSBpdCB0byBsb2NhbCBkYXRhXHJcbiAgICBkYXRhLmFyY2hpdmUgPSByZXNwb25zZVxyXG5cclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1RhYnNJbkNvbnRlbnQodW5jbGFzc2lmaWVkKVxyXG5cclxuICAgIGNvbnN0IHsgYXJjaGl2ZXNMaXN0IH0gPSBkYXRhLmFyY2hpdmVcclxuICAgIHZpZXcuc2hvd1Jvb3RBcmNoaXZlTGlzdChhcmNoaXZlc0xpc3QpXHJcbiAgfSxcclxuICBvcGVuQWxsVGFicyhhcmNoaXZlSWQpIHtcclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkIH0gPSBtb2RlbC5zZWFyY2hBcmNoaXZlQnlJZChkYXRhLmFyY2hpdmUsIGFyY2hpdmVJZClcclxuICAgIHVuY2xhc3NpZmllZC5mb3JFYWNoKGVhY2ggPT4ge1xyXG4gICAgICBjb25zdCB1cmwgPSBlYWNoLnVybFxyXG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZGVsZXRlVGFiKHRhcmdldCwgdGFiSWQpIHtcclxuICAgIC8vIHRhcmdldDogRE9NIGVsZW1udFxyXG5cclxuICAgIC8vIHJldHVybiBuZXdBcmNoaXZlIHdpdGggdGFyZ2V0IHRhYlxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLnJlbW92ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5yZW1vdmVUYWIodGFyZ2V0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIGRlbGV0ZUFsbFRhYnNJbkFyY2hpdmUoYXJjaGl2ZUlkKSB7XHJcbiAgICAvLyBjaGVjazogaWYgaXMgYWxyZWFkeSBlbXB0eVxyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gYC5hcmNoaXZlLSR7YXJjaGl2ZUlkfS1jb250ZW50IC50YWJzLWxpc3QgLnRhYmBcclxuICAgIGNvbnN0IHRhYkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpXHJcbiAgICBpZiAoKHRhYkl0ZW1zLmxlbmd0aCA9PT0gMSkgJiYgKHRhYkl0ZW1zWzBdLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVtb3ZlIHRhYlxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLmNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcblxyXG4gICAgLy8gdXBkYXRlIGFyY2hpdmVcclxuICAgIGRhdGEuYXJjaGl2ZSA9IG5ld0FyY2hpdmVcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3XHJcbiAgICB2aWV3LmNsZWFyVGFic0luQXJjaGl2ZShhcmNoaXZlSWQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgZGVsZXRlQXJjaGl2ZShhcmNoaXZlQmFyLCBhcmNoaXZlSWQpIHtcclxuICAgIC8vIHJldHVybiBuZXdBcmNoaXZlIHdpdGggdGFyZ2V0IGFyY2hpdmVcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBtb2RlbC5yZW1vdmVBcmNoaXZlKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUgPSBuZXdBcmNoaXZlXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlldywgYm90aCBpbiBzaWRlYmFyICYgY29udGVudCAobmVlZCBhcmNoaXZlSWQpXHJcbiAgICB2aWV3LnJlbW92ZUFyY2hpdmUoYXJjaGl2ZUJhciwgYXJjaGl2ZUlkKVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuICB9LFxyXG4gIC8vIGNyZWF0aW5nIG5ldyBhcmNoaXZlXHJcbiAgc2hvd05ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIHZpZXcuc2hvd05ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfSxcclxuICBjcmVhdGVOZXdBcmNoaXZlKCkge1xyXG4gICAgLy8gZ2V0IHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IGFyY2hpdmVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyY2hpdmVOYW1lLWlucHV0JykudmFsdWVcclxuXHJcbiAgICAvLyBubyBlbXB0eSBpbnB1dCBhbGxvd2VkXHJcbiAgICBpZiAoIWFyY2hpdmVOYW1lKSB7XHJcbiAgICAgIHZpZXcuY2FuY2VsTmV3QXJjaGl2ZUlucHV0KClcclxuICAgICAgY29uc29sZS5sb2coJ05vIGVtcHR5IGlucHV0IGFsbG93ZWQhJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXQgYXJjaGl2ZSBkYXRhLCBhZGQgbmV3IGFyY2hpdmUgaW4gZGF0YVxyXG4gICAgLy8gbmV3QXJjaGl2ZTogZGF0YVxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZU5ld0FyY2hpdmVJbkRhdGEoYXJjaGl2ZU5hbWUpXHJcblxyXG4gICAgLy8gcmVyZW5kZXIgdmlld1xyXG4gICAgdmlldy5jcmVhdGVOZXdBcmNoaXZlSW5TaWRlYmFyKG5ld0FyY2hpdmUpXHJcbiAgICB2aWV3LmNyZWF0ZU5ld0FyY2hpdmVJbkNvbnRlbnQobmV3QXJjaGl2ZSlcclxuXHJcbiAgICAvLyBzdG9yZSBhcmNoaXZlIHRvIHN0b3JhZ2VcclxuICAgIG1vZGVsLnN0b3JlQXJjaGl2ZSgpXHJcblxyXG4gICAgLy8gcmVzdG9yZSBVSVxyXG4gICAgdmlldy5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgY2FuY2VsTmV3QXJjaGl2ZUlucHV0KCkge1xyXG4gICAgdmlldy5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH0sXHJcbiAgLy8gZWRpdGluZyB0YWIgbmFtZSh0aXRsZSlcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuc2hvd1RhYk5hbWVFZGl0SW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfSxcclxuICB1cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSkge1xyXG4gICAgLy8gZ2V0IHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IHRhYklkID0gdGFyZ2V0VGFiRE9NLmRhdGFzZXQuaWRcclxuICAgIGNvbnN0IHRhYk5hbWVJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgaW5wdXQnKS52YWx1ZVxyXG5cclxuICAgIC8vIGNoZWNrXHJcbiAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSBwJykudGV4dENvbnRlbnRcclxuICAgIGlmIChvcmlnaW5hbFRpdGxlID09PSB0YWJOYW1lSW5wdXQpIHtcclxuICAgICAgdmlldy5jYW5jZWxFZGl0VGFiSW5wdXQodGFyZ2V0VGFiRE9NKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gZmluZCB0YWIgaW4gYXJjaGl2ZSB2aWEgdGFiSWQsIHVwZGF0ZSBpdFxyXG4gICAgbW9kZWwudXBkYXRlVGFiKGRhdGEuYXJjaGl2ZSwgdGFiSWQsIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICAvLyByZXJlbmRlciB2aWV3IFxyXG4gICAgdmlldy51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSwgdGFiTmFtZUlucHV0KVxyXG5cclxuICAgIC8vIHN0b3JlIGFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyByZXN0b3JlIFVJXHJcbiAgICB2aWV3LmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcblxyXG4gICAgcmV0dXJuXHJcbiAgfSxcclxuICAvLyBlZGl0aW5nIGFyY2hpdmUgdGl0bGVcclxuICBzaG93RWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKSB7XHJcbiAgICB2aWV3LnNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0YXJnZXRUYWJET00pXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0YXJnZXRUYWJET00pIHtcclxuICAgIHZpZXcuY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKVxyXG4gIH0sXHJcbiAgdXBkYXRlQXJjaGl2ZVRpdGxlQ29udGVudCh0YXJnZXRUYWJET00pIHtcclxuICAgIC8vIGdldCB1c2VyIGlucHV0XHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSB0YXJnZXRUYWJET00uZGF0YXNldC5pZFxyXG4gICAgY29uc3QgYXJjaGl2ZVRpdGxlSW5wdXQgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLmFyY2hpdmUtdGl0bGUtaW5wdXQtY29udGVudCcpLnZhbHVlXHJcbiAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JykudGV4dENvbnRlbnRcclxuXHJcbiAgICAvLyBjaGVja1xyXG4gICAgaWYgKGFyY2hpdmVUaXRsZUlucHV0ID09PSBvcmlnaW5hbFRpdGxlKSB7XHJcbiAgICAgIHZpZXcuY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaW5kIGFyY2hpdmUgaW4gZGF0YSB2aWEgYXJjaGl2ZUlkLCB1cGRhdGUgaXRcclxuICAgIG1vZGVsLnVwZGF0ZUFyY2hpdmUoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQsIGFyY2hpdmVUaXRsZUlucHV0KVxyXG5cclxuICAgIC8vIHJlcmVuZGVyIHZpZXcgXHJcbiAgICB2aWV3LnVwZGF0ZUFyY2hpdmVUaXRsZSh0YXJnZXRUYWJET00sIGFyY2hpdmVJZCwgYXJjaGl2ZVRpdGxlSW5wdXQpXHJcblxyXG4gICAgLy8gc3RvcmUgYXJjaGl2ZSB0byBzdG9yYWdlXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG5cclxuICAgIC8vIHJlc3RvcmUgVUlcclxuICAgIHZpZXcuY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGFyZ2V0VGFiRE9NKVxyXG5cclxuICAgIHJldHVyblxyXG4gIH0sXHJcblxyXG4gIC8vIHNldCB1cCBkcmFnIGFuZCBkcm9wIHN5c3RlbVxyXG4gIHNldFVwRHJhZ0FuZERyb3BTeXN0ZW0oKSB7XHJcbiAgICAvLyBldmVudExpc3RlbmVyIGluIHZpZXdcclxuICAgIC8vIHZpZXcgY2FsbHMgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgdmlldy5zZXRVcERyYWdBbmREcm9wU3lzdGVtKClcclxuICB9LFxyXG5cclxuICAvLyAgZGV2ZWxvcGluZyBtZXRob2RzXHJcbiAgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlIGNsZWFyZWQhJylcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93U3RvcmFnZSgpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYXJjaGl2ZSddLCAoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJleHBvcnQgY29uc3QgZGF0YSA9IHtcclxuICBhcmNoaXZlOiB7fSxcclxuICBsYXN0VGFiSWQ6ICcnLFxyXG4gIGxhc3RBcmNoaXZlSWQ6ICcnXHJcbn0iLCJpbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbi8vICAgYXJjaGl2ZToge30sXHJcbi8vICAgbGFzdFRhYklkOiAnJyxcclxuLy8gICBsYXN0QXJjaGl2ZUlkOiAnJ1xyXG5cclxuLy8gQXJjaGl2ZSBwcm90b1xyXG5jb25zdCBBcmNoaXZlRGF0YSA9IGZ1bmN0aW9uIChhcmNoaXZlTmFtZSwgaWQpIHtcclxuICB0aGlzLmFyY2hpdmVOYW1lID0gYXJjaGl2ZU5hbWUgfHwgJ05ldyBBcmNoaXZlJ1xyXG4gIHRoaXMuaWQgPSBpZFxyXG4gIHRoaXMuYXJjaGl2ZXNMaXN0ID0gW11cclxuICB0aGlzLnVuY2xhc3NpZmllZCA9IFtdXHJcbn1cclxuXHJcbmNvbnN0IFRhYkRhdGEgPSBmdW5jdGlvbiAoaWQsIGljb24sIHRpdGxlLCB0YWdzLCBjcmVhdGVkQXQsIHVybCwgdXBkYXRlZEF0KSB7XHJcbiAgdGhpcy5pZCA9IGlkXHJcbiAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgdGhpcy51cmwgPSB1cmxcclxuICB0aGlzLmljb24gPSBpY29uXHJcbiAgdGhpcy5jcmVhdGVkQXQgPSBjcmVhdGVkQXRcclxuICB0aGlzLnVwZGF0ZWRBdCA9IHVwZGF0ZWRBdFxyXG4gIHRoaXMuZmluaXNoUmVhZGluZyA9IGZhbHNlXHJcbiAgdGhpcy50YWdzID0gdGFnc1xyXG59XHJcblxyXG5jb25zdCB0YWJJbm5lclRlbXBsYXRlID0gZnVuY3Rpb24gKHRhYikge1xyXG4gIGNvbnN0IHsgaWQsIGNyZWF0ZWRBdCwgdXJsLCB0YWdzIH0gPSB0YWJcclxuXHJcbiAgbGV0IHsgaWNvbiB9ID0gdGFiXHJcbiAgaWYgKCFpY29uKSB7IGljb24gPSB1dGlscy5pbWFnZUhvbGRlcigpIH07XHJcblxyXG4gIGxldCB7IHRpdGxlIH0gPSB0YWJcclxuICB0aXRsZSA9IHV0aWxzLmVzY2FwZUh0bWwodGl0bGUpXHJcblxyXG4gIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPSdudW1iZXIgYm94Jz5cclxuICAgICAgPHA+JHtpZH08L3A+XHJcbiAgICAgICAgICA8L2RpdiA+XHJcbiAgICA8ZGl2IGNsYXNzPSdpY29uIGJveCc+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtpY29ufVwiIGRyYWdnYWJsZT1cImZhbHNlXCIgYWx0PVwiXCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J3RpdGxlIGJveCcgZHJhZ2dhYmxlPVwiZmFsc2VcIj5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGNhbmNlbC1lZGl0LXRhYi1pbnB1dCBub25lXCI+PC9pPlxyXG4gICAgICA8cD4ke3RpdGxlfTwvcD5cclxuICAgICAgPGlucHV0IGNsYXNzPSdlZGl0LXRhYi1uYW1lLWlucHV0IG5vbmUnIHBsYWNlaG9sZGVyPScke3RpdGxlfScgdHlwZT1cInRleHRcIiBtYXhsZW5ndGg9XCI0NVwiPlxyXG5cclxuICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuLWFsdCBzaG93LWVkaXQtdGFiLW5hbWVcIj48L2k+XHJcbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZSBjb25maXJtLXRhYi1lZGl0IG5vbmVcIiBkYXRhLWlkPVwiJHtpZH1cIj48L2k+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSd0YWdzIGJveCc+XHJcbiAgICAgIDxwPiR7dGFnc308L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2NyZWF0ZWRBdCBib3gnPlxyXG4gICAgICA8cD4ke2NyZWF0ZWRBdH08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9J2J0biBib3gnPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdvcGVuLXRhYicgZGF0YS11cmw9XCIke3VybH1cIj5cclxuICAgICAgICBvcGVuXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPSdidG4gYm94Jz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLXRhYicgZGF0YS10YWJpZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgZGVsZXRlXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59XHJcblxyXG5jb25zdCBhcmNoaXZlSW5uZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uIChhcmNoaXZlLCB1bmNsYXNzaWZpZWRET01TKSB7XHJcbiAgY29uc3QgeyBhcmNoaXZlTmFtZSwgYXJjaGl2ZXNMaXN0LCBpZCB9ID0gYXJjaGl2ZVxyXG5cclxuICByZXR1cm4gYFxyXG4gICAgPGRpdiBjbGFzcz0nYXJjaGl2ZS1jb250YWluZXInPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1iYXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdhcmNoaXZlLXRpdGxlJyBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgIDxpIGNsYXNzPSdmYXMgZmEtdGltZXMtY2lyY2xlIGNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCBub25lJz48L2k+XHJcbiAgICAgICAgICA8aDMgY2xhc3M9J3RpdGxlLXRleHQnPiR7YXJjaGl2ZU5hbWV9PC9oMz5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHthcmNoaXZlTmFtZX1cIiBjbGFzcz0nYXJjaGl2ZS10aXRsZS1pbnB1dC1jb250ZW50IG5vbmUnPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuLWFsdCBlZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudFwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZSBjb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCBub25lXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm9wZW4tYWxsXCIgZGF0YS1pZD1cIiR7aWR9XCI+XHJcbiAgICAgICAgICAgICAgT3BlbiBBbGxcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLWFsbC1pbi1hcmNoaXZlJyBkYXRhLWlkPVwiJHtpZH1cIj5cclxuICAgICAgICAgICAgICBEZWxldGUgQWxsXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGlucHV0IGlkPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCIgY2xhc3M9J2FyY2hpdmUtZHJvcGRvd24gbm9uZScgdHlwZT1cImNoZWNrYm94XCI+XHJcblxyXG4gICAgICA8bGFiZWwgZm9yPVwiYXJjaGl2ZSR7aWR9LWRyb3Bkb3duXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nc2hvdy1pbmRpY2F0b3InPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtZm9sZGVyLW9wZW4gdW5mb2xkXCI+PC9pPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtZm9sZGVyIGZvbGRcIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbGFiZWw+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS1jb250ZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmVzTGlzdFwiPlxyXG4gICAgICAgICAgPHA+JHthcmNoaXZlc0xpc3R9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzLWxpc3RcIj5cclxuICAgICAgICAgICR7dW5jbGFzc2lmaWVkRE9NU31cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtb2RlbCA9IHtcclxuICBjcmVhdGVOZXdBcmNoaXZlSW5EYXRhKGFyY2hpdmVOYW1lKSB7XHJcbiAgICBjb25zdCBuZXdJZCA9IGRhdGEubGFzdEFyY2hpdmVJZCArPSAxXHJcbiAgICBjb25zdCBpZCA9IHV0aWxzLmlkRm9ybWF0dGVyKCdhcmNoaXZlJywgbmV3SWQpXHJcblxyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURhdGEgPSBuZXcgQXJjaGl2ZURhdGEoYXJjaGl2ZU5hbWUsIGlkKVxyXG5cclxuICAgIC8vIHB1c2ggbmV3QXJjaGl2ZURhdGEgdG8gZGF0YS5hcmNoaXZlXHJcbiAgICBkYXRhLmFyY2hpdmUuYXJjaGl2ZXNMaXN0LnB1c2gobmV3QXJjaGl2ZURhdGEpXHJcblxyXG4gICAgcmV0dXJuIG5ld0FyY2hpdmVEYXRhXHJcbiAgfSxcclxuICBjcmVhdGVBcmhpdmVET01JblNpZGViYXIoYXJjaGl2ZSkge1xyXG4gICAgY29uc3QgeyBhcmNoaXZlTmFtZSwgaWQgfSA9IGFyY2hpdmVcclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbmV3QXJjaGl2ZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxhIGhyZWY9XCIjYXJjaGl2ZS0ke2lkfVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1mb2xkZXJcIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHA+JHthcmNoaXZlTmFtZX08L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBkZWxldGUtYXJjaGl2ZVwiIGRhdGEtaWQ9XCIke2lkfVwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9hPlxyXG4gICAgYFxyXG4gICAgbmV3QXJjaGl2ZS5jbGFzc0xpc3QgPSAnYXJjaGl2ZSBhcmNoaXZlLXN0eWxlJ1xyXG4gICAgbmV3QXJjaGl2ZS5pZCA9IGBhcmNoaXZlLSR7aWR9LXNpZGViYXJgXHJcbiAgICBuZXdBcmNoaXZlLmRhdGFzZXQuYXJjaGl2ZUlkID0gaWRcclxuICAgIHJldHVybiBuZXdBcmNoaXZlXHJcbiAgfSxcclxuICBjcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KGFyY2hpdmUpIHtcclxuICAgIGNvbnN0IHsgdW5jbGFzc2lmaWVkLCBpZCB9ID0gYXJjaGl2ZVxyXG5cclxuICAgIGxldCB1bmNsYXNzaWZpZWRET01TID0gJydcclxuXHJcbiAgICBpZiAodW5jbGFzc2lmaWVkLmxlbmd0aCkge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gdW5jbGFzc2lmaWVkLm1hcChlYWNoID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz0ndGFiIHRhYi1zdHlsZScgZHJhZ2dhYmxlPVwidHJ1ZVwiIGlkPVwidGFiLSR7ZWFjaC5pZH1cIiBkYXRhLWlkPVwiJHtlYWNoLmlkfVwiPlxyXG4gICAgICAgICAgICAke3RhYklubmVyVGVtcGxhdGUoZWFjaCl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICAgIH0pLmpvaW4oJycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1bmNsYXNzaWZpZWRET01TID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgICAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld0FyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbmV3QXJjaGl2ZS5pbm5lckhUTUwgPSBhcmNoaXZlSW5uZXJUZW1wbGF0ZShhcmNoaXZlLCB1bmNsYXNzaWZpZWRET01TLClcclxuXHJcbiAgICBuZXdBcmNoaXZlLmlkID0gYGFyY2hpdmUtJHtpZH1gXHJcbiAgICBuZXdBcmNoaXZlLmNsYXNzTGlzdCA9IGBhcmNoaXZlIGRyb3B6b25lIGFyY2hpdmUtc3R5bGUgYXJjaGl2ZS0ke2lkfS1jb250ZW50YFxyXG4gICAgbmV3QXJjaGl2ZS5kYXRhc2V0LmFyY2hpdmVJZCA9IGlkXHJcbiAgICByZXR1cm4gbmV3QXJjaGl2ZVxyXG4gIH0sXHJcbiAgY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYkRhdGEpIHtcclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB0YWIuaW5uZXJIVE1MID0gdGFiSW5uZXJUZW1wbGF0ZSh0YWJEYXRhKVxyXG4gICAgdGFiLmNsYXNzTGlzdCArPSAndGFiIHRhYi1zdHlsZSdcclxuICAgIHRhYi5pZCA9IGB0YWItJHt0YWJEYXRhLmlkfWBcclxuICAgIHRhYi5kYXRhc2V0LmlkID0gdGFiRGF0YS5pZFxyXG4gICAgdGFiLmRyYWdnYWJsZSA9IHRydWVcclxuICAgIHJldHVybiB0YWJcclxuICB9LFxyXG4gIGFzeW5jIGdldFN0b3JhZ2VEYXRhKHRhcmdldERhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW3RhcmdldERhdGFdLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWplY3QhJylcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBhc3luYyBnZXRBbGxPcGVuZWRUYWJzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogZmFsc2UgfSwgKHF1ZXJ5UmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0YWJzID0gW11cclxuICAgICAgICAgIGZvciAobGV0IHRhYiBvZiBxdWVyeVJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgKHRhYi50aXRsZSA9PT0gXCJjaHJvbWUudGFicyAtIENocm9tZSBEZXZlbG9wZXJzXCIpIHx8XHJcbiAgICAgICAgICAgICAgKHRhYi51cmwgPT09IFwiY2hyb21lOi8vZXh0ZW5zaW9ucy9cIikgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybC5zcGxpdCgnOi8vJylbMF0gPT09ICdjaHJvbWUtZXh0ZW5zaW9uJykgfHxcclxuICAgICAgICAgICAgICAodGFiLnVybCA9PT0gJ2Nocm9tZTovL25ld3RhYi8nKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNsZWFyXHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQpXHJcblxyXG4gICAgICAgICAgICAvLyBmb3JtIHRhYkRhdGFcclxuICAgICAgICAgICAgLy8gY29uc3QgdGl0bGUgPSB1dGlscy50cmltU3RyaW5nKHV0aWxzLmVzY2FwZUh0bWwodGFiLnRpdGxlKSwgNDUpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB7IGZhdkljb25Vcmw6IGljb24sIHVybCwgdGl0bGUgfSA9IHRhYlxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnemgtdHcnKVxyXG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW11cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBpZFxyXG4gICAgICAgICAgICBkYXRhLmxhc3RUYWJJZCsrXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdXRpbHMuaWRGb3JtYXR0ZXIoJ3RhYicsIGRhdGEubGFzdFRhYklkKVxyXG5cclxuICAgICAgICAgICAgdGFicy5wdXNoKG5ldyBUYWJEYXRhKGlkLCBpY29uLCB0aXRsZSwgdGFncywgY3JlYXRlZEF0LCB1cmwsIHVwZGF0ZWRBdCkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0YWJzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc3RvcmVBcmNoaXZlKCkge1xyXG4gICAgLy8gc3RvcmUgZGVmYXVsdEFyY2hpdmUgdG8gc3RvcmFnZVxyXG4gICAgY29uc3QgeyBhcmNoaXZlIH0gPSBkYXRhXHJcbiAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gJ3Jvb3QtYXJjaGl2ZSdcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzdG9yZS1hcmNoaXZlJyxcclxuICAgICAgZGF0YTogYXJjaGl2ZVxyXG4gICAgfVxyXG5cclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlcXVlc3QsIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdICcsIG1lc3NhZ2UpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHVwZGF0ZVRhYihhcmNoaXZlLCB0YWJJZCwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSB0YWJJZFxyXG4gICAgY29uc29sZS5sb2coJ2luIHVwZGF0ZVRhYicsIHRhYk5hbWVJbnB1dClcclxuXHJcbiAgICBjb25zdCBmaW5kVGFiQnlJZCA9IChhcmNoaXZlLCB0YXJnZXRJZCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW4gZmluZFRhYkJ5SWQnLCB0YWJOYW1lSW5wdXQpXHJcbiAgICAgIGlmICghYXJjaGl2ZS51bmNsYXNzaWZpZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGZpbmRUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgYXJjaGl2ZS51bmNsYXNzaWZpZWQpIHtcclxuICAgICAgICAgIGlmICh0YWIuaWQgPT09IHRhcmdldElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBoaXQ6ICcsIHRhYk5hbWVJbnB1dClcclxuICAgICAgICAgICAgdGFiLnRpdGxlID0gdGFiTmFtZUlucHV0XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmUoYXJjaGl2ZSwgYXJjaGl2ZUlkLCBhcmNoaXZlVGl0bGVJbnB1dCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICBhcmNoaXZlLmFyY2hpdmVOYW1lID0gYXJjaGl2ZVRpdGxlSW5wdXRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS5hcmNoaXZlTmFtZSA9IGFyY2hpdmVUaXRsZUlucHV0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICB9LFxyXG4gIHJlbW92ZVRhYihhcmNoaXZlLCB0YWJJZCkge1xyXG4gICAgY29uc3QgdGFyZ2V0SWQgPSB0YWJJZFxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgcmVtb3ZlVGFiQnlJZChzdWJBcmNoaXZlLCB0YXJnZXRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIGFyY2hpdmUudW5jbGFzc2lmaWVkKSB7XHJcbiAgICAgICAgICBpZiAodGFiLmlkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUudW5jbGFzc2lmaWVkLmluZGV4T2YodGFiKVxyXG4gICAgICAgICAgICBhcmNoaXZlLnVuY2xhc3NpZmllZC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgc3ViQXJjaGl2ZSBvZiBhcmNoaXZlLmFyY2hpdmVzTGlzdCkge1xyXG4gICAgICAgICAgICByZW1vdmVUYWJCeUlkKHN1YkFyY2hpdmUsIHRhcmdldElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICAgIHJldHVybiBhcmNoaXZlXHJcbiAgfSxcclxuICByZW1vdmVBcmNoaXZlKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcblxyXG4gICAgY29uc3QgZGVsZXRlQXJjaGl2ZUJ5SWQgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gc3ViQXJjaGl2ZS5pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyY2hpdmUuYXJjaGl2ZXNMaXN0LmluZGV4T2Yoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgIGFyY2hpdmUuYXJjaGl2ZXNMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlQXJjaGl2ZUJ5SWQoc3ViQXJjaGl2ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBcmNoaXZlQnlJZChhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGNsZWFyVGFic0luQXJjaGl2ZUJ5SWQoYXJjaGl2ZSwgYXJjaGl2ZUlkKSB7XHJcbiAgICBsZXQgdGFyZ2V0SWQgPSBhcmNoaXZlSWRcclxuICAgIC8vIGxldCB0YXJnZXRBcmNoaXZlID0ge31cclxuXHJcbiAgICBjb25zdCBmaW5kQXJjaGl2ZSA9IChhcmNoaXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXRJZCA9PT0gYXJjaGl2ZS5pZCkge1xyXG4gICAgICAgIGFyY2hpdmUudW5jbGFzc2lmaWVkID0gW11cclxuICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IGFyY2hpdmVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgc3ViQXJjaGl2ZS51bmNsYXNzaWZpZWQgPSBbXVxyXG4gICAgICAgICAgICAvLyByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IHN1YkFyY2hpdmVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbm5lckFyY2hpdmUgb2Ygc3ViQXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgICBmaW5kQXJjaGl2ZShpbm5lckFyY2hpdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQXJjaGl2ZShhcmNoaXZlKVxyXG4gICAgcmV0dXJuIGFyY2hpdmVcclxuICB9LFxyXG4gIGdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKSB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgaWQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyIHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgaWNvbjogdGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy5pY29uIGltZycpLnNyYyxcclxuICAgICAgdGl0bGU6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICB0YWdzOiB0YWJET00ucXVlcnlTZWxlY3RvcignLnRhZ3MgcCcpLnRleHRDb250ZW50LFxyXG4gICAgICBjcmVhdGVkQXQ6IHRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlZEF0IHAnKS50ZXh0Q29udGVudCxcclxuICAgICAgdXJsOiB0YWJET00ucXVlcnlTZWxlY3RvcignLmJ0biBidXR0b24nKS5kYXRhc2V0LnVybCxcclxuICAgICAgdXBkYXRlZEF0OiAnJ1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvLyByZWN1cnNpdmUgc2VhcmNoIHByb3RvdHlwZSAvL1xyXG4gIHNlYXJjaFRhYkJ5SWQoYXJjaGl2ZSwgdGFiSWQpIHtcclxuICAgIGxldCB0YXJnZXRJZCA9IHRhYklkXHJcblxyXG4gICAgY29uc3QgZmluZFRhYkJ5SWQgPSAoYXJjaGl2ZSwgdGFyZ2V0SWQpID0+IHtcclxuICAgICAgaWYgKCFhcmNoaXZlLnVuY2xhc3NpZmllZC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiBhcmNoaXZlLnVuY2xhc3NpZmllZCkge1xyXG4gICAgICAgICAgaWYgKHRhYi5pZCA9PT0gdGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGFiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IHN1YkFyY2hpdmUgb2YgYXJjaGl2ZS5hcmNoaXZlc0xpc3QpIHtcclxuICAgICAgICAgICAgZmluZFRhYkJ5SWQoc3ViQXJjaGl2ZSwgdGFyZ2V0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kVGFiQnlJZChhcmNoaXZlLCB0YXJnZXRJZClcclxuICB9LFxyXG4gIHNlYXJjaEFyY2hpdmVCeUlkKGFyY2hpdmUsIGFyY2hpdmVJZCkge1xyXG4gICAgbGV0IHRhcmdldElkID0gYXJjaGl2ZUlkXHJcbiAgICBsZXQgdGFyZ2V0QXJjaGl2ZSA9IHt9XHJcblxyXG4gICAgY29uc3QgZmluZEFyY2hpdmUgPSAoYXJjaGl2ZSkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0SWQgPT09IGFyY2hpdmUuaWQpIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0QXJjaGl2ZSA9IGFyY2hpdmVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhcmNoaXZlLmFyY2hpdmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBzdWJBcmNoaXZlIG9mIGFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0SWQgPT09IHN1YkFyY2hpdmUuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldEFyY2hpdmUgPSBzdWJBcmNoaXZlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJBcmNoaXZlIG9mIHN1YkFyY2hpdmUuYXJjaGl2ZXNMaXN0KSB7XHJcbiAgICAgICAgICAgICAgZmluZEFyY2hpdmUoaW5uZXJBcmNoaXZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFyY2hpdmUoYXJjaGl2ZSlcclxuICAgIHJldHVybiB0YXJnZXRBcmNoaXZlXHJcbiAgfSxcclxufSIsImV4cG9ydCBjb25zdCB1dGlscyA9IHtcclxuICBpZEZvcm1hdHRlcjogZnVuY3Rpb24gKHR5cGUsIG51bSkge1xyXG4gICAgLy8gdHlwZSA9IFwidGFiXCIgfHwgXCJhcmNoaXZlXCJcclxuICAgIGxldCBtb2RlID0gdHlwZSA9PT0gJ3RhYicgPyA1IDogM1xyXG4gICAgbnVtID0gbnVtICsgJydcclxuICAgIGxldCBvdXRwdXQgPSBudW0uc3BsaXQoJycpXHJcbiAgICBpZiAobnVtLmxlbmd0aCA8IG1vZGUpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlIC0gbnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgb3V0cHV0LnVuc2hpZnQoJzAnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXHJcbiAgfSxcclxuICBlc2NhcGVIdG1sOiBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nXHJcbiAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbiAgfSxcclxuICB0cmltU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nLCBtZXhsZW5ndGgpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIG1leGxlbmd0aClcclxuICB9LFxyXG4gIGltYWdlSG9sZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8zMi81OTgzOTIvZmZmP3RleHQ9PydcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwuanMnXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcblxyXG5cclxuLy8gbm90IGRvbmVcclxuY29uc3QgZGV0ZWN0RHJvcExvY2F0aW9uID0gZnVuY3Rpb24gKHRhYklkLCBkcmFnZW50ZXIsIGRyYWdsZWF2ZSkge1xyXG4gIGNvbnNvbGUubG9nKCd0YWJJZDogICAgICcgKyB0YWJJZClcclxuICBjb25zb2xlLmxvZygnZHJhZ2VudGVyOiAnICsgZHJhZ2VudGVyKVxyXG4gIGNvbnNvbGUubG9nKCdkcmFnbGVhdmU6ICcgKyBkcmFnbGVhdmUpXHJcbiAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLScpXHJcbiAgbGV0IHJlc3VsdCA9ICdubyBkZXRlY3QnXHJcbiAgaWYgKCh0YWJJZCA9PT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSkpIHtcclxuICAgIHJlc3VsdCA9ICdzYW1lIGxvY2F0aW9uJ1xyXG4gIH0gZWxzZSBpZiAoKHRhYklkICE9PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKSkge1xyXG4gICAgcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcbiAgfSBlbHNlIGlmICgoZHJhZ2VudGVyID09PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcikpIHtcclxuICAgIHJlc3VsdCA9IGBiZWZvcmUgJHtkcmFnbGVhdmV9YFxyXG4gIH0gZWxzZSBpZiAoKGRyYWdlbnRlciAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnZW50ZXIpKSB7XHJcbiAgICByZXN1bHQgPSBgYWZ0ZXIgJHtkcmFnZW50ZXJ9YFxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coJ3Jlc3VsdDogJyArIHJlc3VsdClcclxuICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tJylcclxuICByZXR1cm5cclxufVxyXG5cclxuLy8gKHRhYklkID09PSBkcmFnZW50ZXIpICYmICh0YWJJZCA9PT0gZHJhZ2xlYXZlKVxyXG4vLyBBIEEgQVxyXG4vLyByZXN1bHQgPSAnc2FtZSBsb2NhdGlvbidcclxuXHJcbi8vICh0YWJJZCAhPT0gZHJhZ2VudGVyKSAmJiAodGFiSWQgPT09IGRyYWdsZWF2ZSlcclxuLy8gQSBCIEFcclxuLy8gcmVzdWx0ID0gJ3NhbWUgbG9jYXRpb24nXHJcblxyXG4vLyAoZHJhZ2VudGVyID09PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2xlYXZlKSAmJiAodGFiSWQgIT09IGRyYWdlbnRlcilcclxuLy8gQSBCIEIgXHJcbi8vIGRyYWdsZWF2ZSDnmoTliY3kuIDlgItcclxuXHJcbi8vIChkcmFnZW50ZXIgIT09IGRyYWdsZWF2ZSkgJiYgKHRhYklkICE9PSBkcmFnbGVhdmUpICYmICh0YWJJZCAhPT0gZHJhZ2VudGVyKVxyXG4vLyBBIEIgQ1xyXG4vLyBkcmFnbGVhdmUg55qE5YmN5LiA5YCLXHJcblxyXG5jb25zdCBlbXB0eVRhYiA9IGBcclxuICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgIDxwIGNsYXNzPSdlbXB0eS10YWInPk5vIHRhYiBoZXJlIHlldCE8L3A+XHJcbiAgPC9kaXY+XHJcbmBcclxuXHJcbmV4cG9ydCBjb25zdCB2aWV3ID0ge1xyXG4gIHNob3dUYWJzSW5Db250ZW50KGRhdGEpIHtcclxuICAgIC8vIGRhdGE6IHJvb3QudW5jbGFzc2lmaWVkXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG4gICAgdGFic0xpc3QuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIHRhYnNMaXN0LmlubmVySFRNTCA9IGVtcHR5VGFiXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgdGFiIG9mIGRhdGEpIHtcclxuICAgICAgY29uc3QgbmV3VGFiID0gbW9kZWwuY3JlYXRlVGFiRE9NSW5Db250ZW50KHRhYilcclxuICAgICAgLy8gYWRkIGV2ZW50TGlzdGVuZXIgdG8gbmV3IHRhYnMgLy9cclxuICAgICAgdGhpcy5zZXRVcFRhYkRyYWdBbmREcm9wU3lzdGVtKG5ld1RhYilcclxuXHJcbiAgICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKG5ld1RhYilcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dSb290QXJjaGl2ZUxpc3QobGlzdCkge1xyXG4gICAgLy8gbGlzdDogcm9vdC5hcmNoaXZlc0xpc3RcclxuICAgIGNvbnN0IHNpZGViYXJBcmNoaXZlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuYXJjaGl2ZXNMaXN0JylcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcblxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1NpZGViYXJBcmNoaXZlID0gbW9kZWwuY3JlYXRlQXJoaXZlRE9NSW5TaWRlYmFyKGl0ZW0pXHJcbiAgICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3U2lkZWJhckFyY2hpdmUpXHJcblxyXG4gICAgICBjb25zdCBuZXdDb250ZW50QXJjaGl2ZSA9IG1vZGVsLmNyZWF0ZUFyY2hpdmVET01JbkNvbnRlbnQoaXRlbSlcclxuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChuZXdDb250ZW50QXJjaGl2ZSlcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dOZXdBcmNoaXZlSW5wdXQoKSB7XHJcbiAgICAvLyBoaWRlIGlucHV0IGljb25cclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuaWNvbicpXHJcbiAgICBpY29uLmNsYXNzTmFtZSArPSAnIG5vbmUnXHJcblxyXG4gICAgLy8gaGlkZSA8cD5cclxuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBwJylcclxuICAgIGlmICghcC5jbGFzc05hbWUuaW5jbHVkZXMoJ25vbmUnKSkge1xyXG4gICAgICBwLmNsYXNzTmFtZSArPSAnIG5vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dCBVSVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyBpbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgLmNhbmNlbCcpXHJcbiAgICBjb25zdCBjb25maXJtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jb25maXJtJylcclxuXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGNvbmZpcm1JY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwgTmV3IEFyY2hpdmUgSW5wdXQnKVxyXG5cclxuICAgIC8vcmVzdG9yZSBcclxuICAgIC8vIGhpZGUgaW5wdXQgVUlcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgaW5wdXQnKVxyXG4gICAgY29uc3QgY2FuY2VsSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyIC5jcmVhdGUtbmV3IC5jYW5jZWwnKVxyXG4gICAgY29uc3QgY29uZmlybUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuY29uZmlybScpXHJcbiAgICBpbnB1dC5jbGFzc0xpc3QgKz0gJyBub25lJ1xyXG4gICAgY29uZmlybUljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuICAgIGNhbmNlbEljb24uY2xhc3NMaXN0ICs9ICcgbm9uZSdcclxuXHJcbiAgICAvLyBzaG93IGlucHV0IGljb25cclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuY3JlYXRlLW5ldyAuaWNvbicpXHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICAgIC8vIHNob3cgPHA+XHJcbiAgICBjb25zdCBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXIgLmNyZWF0ZS1uZXcgcC5zaG93LW5ldy1hcmNoaXZlLWlucHV0JylcclxuICAgIHAuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcblxyXG4gICAgLy8gY2xlYXIgaW5wdXQgdmFsdWVcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmNoaXZlTmFtZS1pbnB1dCcpLnZhbHVlID0gJydcclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJblNpZGViYXIobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgbmV3QXJjaGl2ZURPTSA9IG1vZGVsLmNyZWF0ZUFyaGl2ZURPTUluU2lkZWJhcihuZXdBcmNoaXZlKVxyXG5cclxuICAgIC8vIHB1c2ggbmV3QXJjaGl2ZURPTSBpbnRvIHNpZGViYXJBcmNoaXZlc0xpc3RcclxuICAgIGNvbnN0IHNpZGViYXJBcmNoaXZlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhciAuYXJjaGl2ZXNMaXN0JylcclxuICAgIHNpZGViYXJBcmNoaXZlc0xpc3QuYXBwZW5kQ2hpbGQobmV3QXJjaGl2ZURPTSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIGNyZWF0ZU5ld0FyY2hpdmVJbkNvbnRlbnQobmV3QXJjaGl2ZSkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuICAgIGNvbnN0IG5ld0FyY2hpdmVET00gPSBtb2RlbC5jcmVhdGVBcmNoaXZlRE9NSW5Db250ZW50KG5ld0FyY2hpdmUpXHJcbiAgICB0aGlzLnNldFVwQXJjaGl2ZURyYWdBbmREcm9wU3lzdGVtKG5ld0FyY2hpdmVET00pXHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0FyY2hpdmVET00pXHJcbiAgICByZXR1cm5cclxuICB9LFxyXG4gIC8vIGVkaXQgdGFiIG5hbWVcclxuICBzaG93VGFiTmFtZUVkaXRJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gaGlkZSAudGl0bGUgcFxyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHBhc3MgdGl0bGUgdG8gaW5wdXQgdmFsdWVcclxuICAgIGlucHV0LnZhbHVlID0gdGl0bGVQLnRleHRDb250ZW50XHJcblxyXG4gICAgLy8gc2hvdyBpbnB1dFxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICB9LFxyXG4gIGNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pIHtcclxuICAgIGNvbnNvbGUubG9nKCdjYW5jZWwtRWRpdC1UYWItSW5wdXQnKVxyXG5cclxuICAgIGNvbnN0IGNhbmNlbEVkaXRUYWJJbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWVkaXQtdGFiLWlucHV0JylcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YWItbmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCBjb25maXJtVGFiRWRpdCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS10YWItZWRpdCcpXHJcbiAgICBjb25zdCBzaG93RWRpdFRhYk5hbWUgPSB0YXJnZXRUYWJET00ucXVlcnlTZWxlY3RvcignLnNob3ctZWRpdC10YWItbmFtZScpXHJcblxyXG4gICAgLy8gdG8gc2hvd1xyXG4gICAgdGl0bGVQLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgc2hvd0VkaXRUYWJOYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgLy8gdG8gaGlkZVxyXG4gICAgY2FuY2VsRWRpdFRhYklucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnbm9uZScpXHJcbiAgICBjb25maXJtVGFiRWRpdC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICB9LFxyXG4gIHVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NLCB0YWJOYW1lSW5wdXQpIHtcclxuICAgIGNvbnN0IHRpdGxlUCA9IHRhcmdldFRhYkRPTS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgcCcpXHJcbiAgICB0aXRsZVAudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICB9LFxyXG4gIC8vIGVkaXQgYXJjaGl2ZSB0aXRsZVxyXG4gIHNob3dFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiAudGl0bGUtdGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHVwZGF0ZUljb24sIGNhbmNlbEljb25cclxuICAgIHVwZGF0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgICBjYW5jZWxJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpXHJcbiAgfSxcclxuICBjYW5jZWxFZGl0QXJjaGl2ZUlucHV0Q29udGVudCh0aXRsZURPTSkge1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLnRpdGxlLXRleHQnKVxyXG4gICAgY29uc3QgZWRpdEljb24gPSB0aXRsZURPTS5xdWVyeVNlbGVjdG9yKCcuZWRpdC1hcmNoaXZlLXRpdGxlLWNvbnRlbnQnKVxyXG4gICAgY29uc3QgdXBkYXRlSWNvbiA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWFyY2hpdmUtdGl0bGUtY29udGVudC1pbnB1dCcpXHJcbiAgICBjb25zdCBjYW5jZWxJY29uID0gdGl0bGVET00ucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LWFyY2hpdmUtdGl0bGUtY29udGVudCcpXHJcbiAgICBjb25zdCBpbnB1dCA9IHRpdGxlRE9NLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcclxuXHJcbiAgICAvLyB0byBoaWRlOiB1cGRhdGVJY29uLCBjYW5jZWxJY29uXHJcbiAgICB1cGRhdGVJY29uLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgY2FuY2VsSWNvbi5jbGFzc0xpc3QuYWRkKCdub25lJylcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG5cclxuICAgIC8vIHRvIHNob3c6IHRpdGxlVGV4dCwgZWRpdEljb25cclxuICAgIHRpdGxlVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKVxyXG5cclxuICB9LFxyXG4gIHVwZGF0ZUFyY2hpdmVUaXRsZSh0YXJnZXRUYWJET00sIGFyY2hpdmVJZCwgdGFiTmFtZUlucHV0KSB7XHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZSB0aXRsZSBpbiBjb250ZW50XHJcbiAgICBjb25zdCBhcmNoaXZlVGl0bGVDb250ZW50ID0gdGFyZ2V0VGFiRE9NLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS10ZXh0JylcclxuICAgIGFyY2hpdmVUaXRsZUNvbnRlbnQudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuXHJcbiAgICAvLyB1cGRhdGUgYXJjaGl2ZSB0aXRsZSBpbiBzaWRlYmFyXHJcbiAgICBjb25zdCBhcmNoaXZlVGl0bGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FyY2hpdmUtJHthcmNoaXZlSWR9LXNpZGViYXJgKVxyXG4gICAgYXJjaGl2ZVRpdGxlU2lkZWJhci5xdWVyeVNlbGVjdG9yKCdwJykudGV4dENvbnRlbnQgPSB0YWJOYW1lSW5wdXRcclxuICAgIHJldHVyblxyXG4gIH0sXHJcbiAgLy8gXHJcbiAgcmVtb3ZlVGFiKHRhYkJhcikge1xyXG4gICAgdGFiQmFyLnJlbW92ZSgpXHJcbiAgfSxcclxuICByZW1vdmVBcmNoaXZlKGFyY2hpdmVCYXIsIGFyY2hpdmVJZCkge1xyXG4gICAgLy8gcmVtb3ZlIGFyY2hpdmUgZnJvbSBzaWRlYmFyXHJcbiAgICBhcmNoaXZlQmFyLnJlbW92ZSgpXHJcblxyXG4gICAgLy8gcmVtb3ZlIGFyY2hpdmUgaW4gY29udGVudFxyXG4gICAgY29uc3QgYXJjaGl2ZUJhckluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhcmNoaXZlLSR7YXJjaGl2ZUlkfWApXHJcbiAgICBhcmNoaXZlQmFySW5Db250ZW50LnJlbW92ZSgpXHJcblxyXG4gIH0sXHJcbiAgY2xlYXJUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZCkge1xyXG4gICAgY29uc29sZS5sb2coJ2FyY2hpdmVJZDogJywgYXJjaGl2ZUlkKVxyXG4gICAgLy8gcmV0dXJuXHJcbiAgICBsZXQgdW5jbGFzc2lmaWVkTGlzdCA9ICcnXHJcblxyXG4gICAgaWYgKGFyY2hpdmVJZCA9PT0gJzAwMScpIHtcclxuICAgICAgdW5jbGFzc2lmaWVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmNsYXNzaWZpZWQgLnRhYnMtbGlzdCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgLmFyY2hpdmUtJHthcmNoaXZlSWR9LWNvbnRlbnQgLnRhYnMtbGlzdGBcclxuICAgICAgdW5jbGFzc2lmaWVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHVuY2xhc3NpZmllZExpc3QuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YWIgZW1wdHkgdGFiLXN0eWxlJz5cclxuICAgICAgICA8cCBjbGFzcz0nZW1wdHktdGFiJz5ObyB0YWIgaGVyZSB5ZXQhPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG4gIH0sXHJcbiAgLy8gZHJhZyBhbmQgZHJvcCBoYW5kbGVyc1xyXG4gIC8vIHNldCB1cCBkcmFnIGFuZCBkcm9wIHN5c3RlbSBmb3IgY3VycmVudCBkYXRhXHJcbiAgLy8gYXJjaGl2ZXMgYW5kIHRhYnNcclxuICBzZXRVcERyYWdBbmREcm9wU3lzdGVtKCkge1xyXG4gICAgY29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWInKVxyXG5cclxuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGhpcy5zZXRVcFRhYkRyYWdBbmREcm9wU3lzdGVtKHRhYikpXHJcblxyXG4gICAgLy8gc2V0IHVwIGRyb3B6b25lOiB1bmNsYXNzaWZpZWQsIGRyb3B6b25lXHJcbiAgICBjb25zdCBkcm9wem9uZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcHpvbmUnKVxyXG4gICAgY29uc3QgdW5jbGFzc2lmaWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuY2xhc3NpZmllZCcpXHJcblxyXG4gICAgLy8gc2V0IHVwIGRyb3B6b25lIGZvciBhcmNoaXZlc1xyXG4gICAgZHJvcHpvbmVzLmZvckVhY2goZHJvcHpvbmUgPT4gdGhpcy5zZXRVcEFyY2hpdmVEcmFnQW5kRHJvcFN5c3RlbShkcm9wem9uZSkpXHJcblxyXG4gICAgLy8gc2V0IHVwIGRyb3B6b25lIGZvciByb290LnVuY2xhc3NpZmllZFxyXG4gICAgdGhpcy5zZXRVcFVuY2xhc3NpZmllZERyYWdBbmREcm9wU3lzdGVtKHVuY2xhc3NpZmllZClcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIHVuY2xhc3NpZmllZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4geyB0aGlzLnVuY2xhc3NpZmllZERyb3BwZWRIYW5kbGVyKGUsIHVuY2xhc3NpZmllZCkgfSlcclxuICB9LFxyXG4gIC8vIHNldCB1cCBkcmFnIGFuZCBkcm9wIHN5c3RlbSBmb3IgbmV3IGNyZWF0ZWQgdGFiXHJcbiAgc2V0VXBUYWJEcmFnQW5kRHJvcFN5c3RlbSh0YWJET00pIHtcclxuICAgIC8vIGVtcHR5IHRhYiBpcyBub3QgZHJhZ2dhYmxlXHJcbiAgICBpZiAodGFiRE9NLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkgcmV0dXJuXHJcblxyXG4gICAgdGFiRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgIGNvbnNvbGUubG9nKCd0YXJnZXQ6ICcpXHJcbiAgICAgIGNvbnNvbGUubG9nKHRhcmdldClcclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB0YXJnZXQuaWRcclxuICAgICAgY29uc29sZS5sb2coJ3BheWxvYWQ6ICcgKyBwYXlsb2FkKVxyXG5cclxuICAgICAgLy8gZGF0YVRyYW5zZmVyLnNldERhdGFcclxuICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIHBheWxvYWQpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIGRldGVjdCBkcm9wIGxvY2F0aW9uXHJcbiAgICB0YWJET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAvLyBkcmFnZW50ZXIgPSB0YWIuaWRcclxuICAgICAgLy8gY29uc29sZS5sb2coJ2RyYWdlbnRlcjogJyArIGRyYWdlbnRlcilcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYkRPTS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8vIGRyYWdsZWF2ZSA9IHRhYi5pZFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcCBzeXN0ZW0gZm9yIG5ldyBjcmVhdGVkIGFyY2hpdmVcclxuICBzZXRVcEFyY2hpdmVEcmFnQW5kRHJvcFN5c3RlbShhcmNoaXZlRE9NKSB7XHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICBhcmNoaXZlRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHsgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkgfSlcclxuICAgIGFyY2hpdmVET00uYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7IHRoaXMuYXJjaGl2ZURyb3BwZWRIYW5kbGVyKGUsIGFyY2hpdmVET00pIH0pXHJcbiAgfSxcclxuICBzZXRVcFVuY2xhc3NpZmllZERyYWdBbmREcm9wU3lzdGVtKHVuY2xhc3NpZmllZERPTSkge1xyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgICB1bmNsYXNzaWZpZWRET00uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4geyB0aGlzLnByZXZlbnREZWZhdWx0SGFuZGxlcihlKSB9KVxyXG4gICAgdW5jbGFzc2lmaWVkRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7IHRoaXMucHJldmVudERlZmF1bHRIYW5kbGVyKGUpIH0pXHJcbiAgfSxcclxuICBwcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSkge1xyXG4gICAgLy8gZGVmYXVsdDogdGFnIGNhbm5vdCBiZSBkcmFnZ2VkXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyB0aGVuIG91ciBET00gY2FuIGJlIGRyYWdnZWQgaW5zaWRlXHJcbiAgfSxcclxuICBhcmNoaXZlRHJvcHBlZEhhbmRsZXIoZSwgYXJjaGl2ZURPTSkge1xyXG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdEhhbmRsZXIoZSlcclxuXHJcbiAgICBjb25zdCB0YWJET01JZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3QgdGFiRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGFiRE9NSWR9YClcclxuICAgIGNvbnNvbGUubG9nKCd0YWJET01JZDogJyArIHRhYkRPTUlkKVxyXG4gICAgY29uc3QgdGFic0xpc3QgPSBhcmNoaXZlRE9NLnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWxpc3QnKVxyXG5cclxuICAgIGNvbnN0IGlzVGFic0xpc3RFbXB0eSA9IHRoaXMudGFic0xpc3RDaGVjayh0YWJzTGlzdClcclxuICAgIC8vIGNvbnNvbGUubG9nKCdpc1RhYnNMaXN0RW1wdHk6ICcgKyBpc1RhYnNMaXN0RW1wdHkpXHJcbiAgICBpZiAoaXNUYWJzTGlzdEVtcHR5KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBcIk5PIHRhYiBoZXJlIHlldFwiIFxyXG4gICAgICB0YWJzTGlzdC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCBuZXcgdGFiRE9NIGludG8gdGFic0xpc3RcclxuICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYkRPTSlcclxuXHJcbiAgICAvLyBjcmVhdGUgdGFiRGF0YSBmb3Igc3RvcmFnZVxyXG4gICAgY29uc3QgdGFiRGF0YSA9IG1vZGVsLmdldFRhYkRhdGFWaWFUYWJET00odGFiRE9NKVxyXG5cclxuICAgIC8vIGZpbmQgYXJjaGl2ZSBieSBJZCwgYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSBhcmNoaXZlRE9NLmRhdGFzZXQuYXJjaGl2ZUlkXHJcblxyXG4gICAgLy8gZGVsZXRlIG9yaWdpbmFsIHRhYlxyXG4gICAgY29uc3QgdGFiSWQgPSB0YWJET01JZC5zcGxpdCgnLScpWzFdXHJcbiAgICBtb2RlbC5yZW1vdmVUYWIoZGF0YS5hcmNoaXZlLCB0YWJJZClcclxuXHJcbiAgICBjb25zdCB0YXJnZXRBcmNoaXZlID0gbW9kZWwuc2VhcmNoQXJjaGl2ZUJ5SWQoZGF0YS5hcmNoaXZlLCBhcmNoaXZlSWQpXHJcbiAgICB0YXJnZXRBcmNoaXZlLnVuY2xhc3NpZmllZC5wdXNoKHRhYkRhdGEpXHJcblxyXG4gICAgLy8gY2FsbCBtb2RlbCB0byBzdG9yZSBkYXRhXHJcbiAgICBtb2RlbC5zdG9yZUFyY2hpdmUoKVxyXG4gIH0sXHJcbiAgdW5jbGFzc2lmaWVkRHJvcHBlZEhhbmRsZXIoZSwgdW5jbGFzc2lmaWVkKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHRhYkRPTUlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBjb25zb2xlLmxvZygndGFiRE9NSWQ6ICcgKyB0YWJET01JZClcclxuICAgIGNvbnN0IHRhYkRPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RhYkRPTUlkfWApXHJcbiAgICBjb25zdCB0YWJzTGlzdCA9IHVuY2xhc3NpZmllZC5xdWVyeVNlbGVjdG9yKCcudGFicy1saXN0JylcclxuXHJcbiAgICBjb25zdCBpc1RhYnNMaXN0RW1wdHkgPSB0aGlzLnRhYnNMaXN0Q2hlY2sodGFic0xpc3QpXHJcbiAgICBjb25zb2xlLmxvZygnaXNUYWJzTGlzdEVtcHR5OiAnICsgaXNUYWJzTGlzdEVtcHR5KVxyXG5cclxuICAgIGlmIChpc1RhYnNMaXN0RW1wdHkpIHtcclxuICAgICAgLy8gcmVtb3ZlIFwiTk8gdGFiIGhlcmUgeWV0XCIgXHJcbiAgICAgIHRhYnNMaXN0LmlubmVySFRNTCA9ICcnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIG5ldyB0YWJET00gaW50byB0YWJzTGlzdFxyXG4gICAgLy8gYWx0ZXJuYXRpdmUgLmluc2VydEJlZm9yZSgpOlxyXG4gICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQodGFiRE9NKVxyXG5cclxuICAgIGNvbnN0IHRhYkRhdGEgPSBtb2RlbC5nZXRUYWJEYXRhVmlhVGFiRE9NKHRhYkRPTSlcclxuXHJcbiAgICAvLyBkZWxldGUgb3JpZ2luYWwgdGFiXHJcbiAgICBjb25zdCB0YWJJZCA9IHRhYkRPTUlkLnNwbGl0KCctJylbMV1cclxuICAgIG1vZGVsLnJlbW92ZVRhYihkYXRhLmFyY2hpdmUsIHRhYklkKVxyXG4gICAgLy8gY29uc29sZS5sb2coKVxyXG5cclxuICAgIC8vIGZpbmQgYXJjaGl2ZSBieSBJZCwgYXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWIpXHJcbiAgICBjb25zdCBhcmNoaXZlSWQgPSAnMDAxJ1xyXG4gICAgY29uc3QgdGFyZ2V0QXJjaGl2ZSA9IG1vZGVsLnNlYXJjaEFyY2hpdmVCeUlkKGRhdGEuYXJjaGl2ZSwgYXJjaGl2ZUlkKVxyXG4gICAgdGFyZ2V0QXJjaGl2ZS51bmNsYXNzaWZpZWQucHVzaCh0YWJEYXRhKVxyXG5cclxuICAgIC8vIGNhbGwgbW9kZWwgdG8gc3RvcmUgZGF0YVxyXG4gICAgbW9kZWwuc3RvcmVBcmNoaXZlKClcclxuXHJcbiAgICAvLyBkZXRlY3REcm9wTG9jYXRpb24odGFiRE9NSWQsIGRyYWdlbnRlciwgZHJhZ2xlYXZlKVxyXG4gIH0sXHJcbiAgdGFic0xpc3RDaGVjayh0YWJzTGlzdCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRhYnNMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWInKVxyXG4gICAgcmV0dXJuICgoY29udGVudC5sZW5ndGggPT09IDEpICYmIChjb250ZW50WzBdLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkpXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3N0eWxlcy9ub3JtYWxpemUuc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwbGljYXRpb24uc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvaW5kZXguc2NzcydcclxuXHJcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuL2RhdGEuanMnXHJcbmltcG9ydCB7IGNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuanMnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdbSW5kZXhdIEluZGV4Lmh0bWwgbG9hZGVkISBBc2sgZm9yIGFyY2hpdmUgZGF0YSEnKVxyXG4gIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICBtZXNzYWdlOiAnZ2V0LWFyY2hpdmUtZGF0YScsXHJcbiAgICBkYXRhOiBudWxsXHJcbiAgfVxyXG5cclxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXF1ZXN0LCAocmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdbSW5kZXhdIHJlY2VpdmVkIGFyY2hpdmUgZGF0YScsIHJlc3BvbnNlKVxyXG4gICAgY29uc3QgeyBhcmNoaXZlLCBsYXN0VGFiSWQsIGxhc3RBcmNoaXZlSWQgfSA9IHJlc3BvbnNlXHJcbiAgICBkYXRhLmxhc3RUYWJJZCA9IGxhc3RUYWJJZFxyXG4gICAgZGF0YS5sYXN0QXJjaGl2ZUlkID0gbGFzdEFyY2hpdmVJZFxyXG4gICAgY29udHJvbGxlci5pbml0TG9jYWxBcmNoaXZlRGF0YShhcmNoaXZlKVxyXG5cclxuICAgIC8vIHNldHVwIGRyb3AgaXRlbSAmIGRyb3Agem9uZVxyXG4gICAgY29udHJvbGxlci5zZXRVcERyYWdBbmREcm9wU3lzdGVtKClcclxuICB9KTtcclxufVxyXG5cclxuLy8gZXZlbnRMaXN0ZW5lclxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcblxyXG4gIC8vIGNhbmNlbCBzaG93IGlucHV0XHJcbiAgLy8gY29udHJvbGxlci5jYW5jZWxOZXdBcmNoaXZlSW5wdXQoKVxyXG5cclxuICAvLyBnZXQgYWxsIG9wZW5lZCB0YWJzXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdnZXQtYWxsLWJ0bicpIHtcclxuICAgIGNvbnRyb2xsZXIuZ2V0QWxsT3BlbmVkVGFicygpXHJcbiAgfVxyXG5cclxuICAvLyBvZXBuIGFsbCB0YWJzIGluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ29wZW4tYWxsJykge1xyXG4gICAgY29uc3QgYXJjaGl2ZUlkID0gdGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIGNvbnRyb2xsZXIub3BlbkFsbFRhYnMoYXJjaGl2ZUlkKVxyXG4gIH1cclxuXHJcbiAgLy8gb3BlbiBjZXRhaW4gdGFiIGluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ29wZW4tdGFiJykge1xyXG4gICAgY29uc3QgdXJsID0gdGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmwsIGFjdGl2ZTogZmFsc2UgfSlcclxuICB9XHJcblxyXG4gIC8vIHNob3cgbmV3IGFyY2hpdmUgaW5wdXRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1uZXctYXJjaGl2ZS1pbnB1dCcpKSB7XHJcbiAgICBjb250cm9sbGVyLnNob3dOZXdBcmNoaXZlSW5wdXQoKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FuY2VsIG5ldyBhcmNoaXZlIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1uZXctYXJjaGl2ZS1pbnB1dCcpKSB7XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbE5ld0FyY2hpdmVJbnB1dCgpXHJcbiAgfVxyXG5cclxuICAvLyBjcmVhdGUgbmV3IGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWFyY2hpdmUtbmFtZS1pbnB1dCcpKSB7XHJcbiAgICBjb250cm9sbGVyLmNyZWF0ZU5ld0FyY2hpdmUoKVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBlZGl0IHRhYiBuYW1lIGlucHV0XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctZWRpdC10YWItbmFtZScpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnNob3dUYWJOYW1lRWRpdElucHV0KHRhcmdldFRhYkRPTSlcclxuICB9XHJcblxyXG4gIC8vIGNhbmNlbCBlZGl0IHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1lZGl0LXRhYi1pbnB1dCcpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLmNhbmNlbEVkaXRUYWJJbnB1dCh0YXJnZXRUYWJET00pXHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgdGFiIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybS10YWItZWRpdCcpKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJET00gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBjb250cm9sbGVyLnVwZGF0ZVRhYk5hbWUodGFyZ2V0VGFiRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gc2hvdyBlZGl0IGFyY2hpdmUgbmFtZSBpbiBjb250ZW50XHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JykpIHtcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuc2hvd0VkaXRBcmNoaXZlSW5wdXRDb250ZW50KHRpdGxlRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gY2FuY2VsIGVkaXQgYXJjaGl2ZSBuYW1lIGluIGNvbnRlbnRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLWVkaXQtYXJjaGl2ZS10aXRsZS1jb250ZW50JykpIHtcclxuICAgIGNvbnN0IHRpdGxlRE9NID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnRyb2xsZXIuY2FuY2VsRWRpdEFyY2hpdmVJbnB1dENvbnRlbnQodGl0bGVET00pXHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgYXJjaGl2ZSBuYW1lIGluIGNvbnRlbnRcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybS1hcmNoaXZlLXRpdGxlLWNvbnRlbnQtaW5wdXQnKSkge1xyXG4gICAgY29uc3QgdGl0bGVET00gPSB0YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci51cGRhdGVBcmNoaXZlVGl0bGVDb250ZW50KHRpdGxlRE9NKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIG9uZSBjZXJ0YWluIHRhYiBpbiBhcmNoaXZlXHJcbiAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUtdGFiJykge1xyXG4gICAgY29uc3QgdGFiSWQgPSB0YXJnZXQuZGF0YXNldC50YWJpZFxyXG4gICAgY29uc3QgdGFiQmFyID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgY29udHJvbGxlci5kZWxldGVUYWIodGFiQmFyLCB0YWJJZClcclxuICB9XHJcblxyXG4gIC8vIGRlbGV0ZSBjZXJ0YWluIGFyY2hpdmUgZnJvbSBzaWRlYmFyXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1hcmNoaXZlJykpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVCYXIgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnNvbGUubG9nKGFyY2hpdmVCYXIpXHJcbiAgICAvLyByZXR1cm5cclxuICAgIGNvbnN0IHRhcmdldEFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb250cm9sbGVyLmRlbGV0ZUFyY2hpdmUoYXJjaGl2ZUJhciwgdGFyZ2V0QXJjaGl2ZUlkKVxyXG4gIH1cclxuXHJcbiAgLy8gZGVsZXRlIGFsbCB1bmNsYXNzaWZpZWQgdGFicyBpbiBjZXJ0YWluIGFyY2hpdmVcclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZS1hbGwtaW4tYXJjaGl2ZScpIHtcclxuICAgIGNvbnN0IGFyY2hpdmVJZCA9IHRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICBjb25zb2xlLmxvZygnYXJjaGl2ZUlkOiAnICsgYXJjaGl2ZUlkKVxyXG4gICAgY29udHJvbGxlci5kZWxldGVBbGxUYWJzSW5BcmNoaXZlKGFyY2hpdmVJZClcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLy8vLy8gZm9yIGRldmVsb3BpbmcgLy8vLy9cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dldC1kYXRhJykge1xyXG4gICAgY29udHJvbGxlci5zaG93U3RvcmFnZSgnYXJjaGl2ZScpXHJcbiAgfVxyXG5cclxuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NsZWFyLWRhdGEnKSB7XHJcbiAgICBjb250cm9sbGVyLmNsZWFyU3RvcmFnZSgpXHJcbiAgfVxyXG59LCBmYWxzZSlcclxuLy8gZmFsc2UgPSBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbi8vIHRvIHN0b3AgYnViYmxpbmc6IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcblxyXG5cclxuLy8gS2V5Ym9hcmRFdmVudFxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuXHJcbiAgLy8gaW5wdXQgbmV3IGFyY2hpdmUgbmFtZVxyXG4gIGlmICh0YXJnZXQuaWQgPT09ICdhcmNoaXZlTmFtZS1pbnB1dCcpIHtcclxuICAgIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gICAgICBjb250cm9sbGVyLmNyZWF0ZU5ld0FyY2hpdmUoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaW5wdXQgdXBkYXRlIHRhYiBuYW1lXHJcbiAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtdGFiLW5hbWUtaW5wdXQnKSkge1xyXG4gICAgaWYgKChlLmNvZGUgPT09ICdFbnRlcicpIHx8IChlLmNvZGUgPT09ICdOdW1wYWRFbnRlcicpKSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldFRhYkRPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgICAgY29udHJvbGxlci51cGRhdGVUYWJOYW1lKHRhcmdldFRhYkRPTSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHVucHV0IHVwZGF0ZSBhcmNoaXZlIG5hbWVcclxuICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXJjaGl2ZS10aXRsZS1pbnB1dC1jb250ZW50JykpIHtcclxuICAgIGlmICgoZS5jb2RlID09PSAnRW50ZXInKSB8fCAoZS5jb2RlID09PSAnTnVtcGFkRW50ZXInKSkge1xyXG4gICAgICBjb25zdCB0aXRsZURPTSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlQXJjaGl2ZVRpdGxlQ29udGVudCh0aXRsZURPTSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9