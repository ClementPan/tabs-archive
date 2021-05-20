const content = document.querySelector('.content')
console.log(content)

const initArchiveData = () => {
  chrome.storage.sync.get(["defaultArchive"], (data) => {
    console.log(data)
    content.innerText = JSON.stringify(data)
  })
}

initArchiveData()