const content = document.querySelector('.content')
console.log(content)

const getArchiveData = () => {
  chrome.storage.sync.get(["defaultArchive"], (data) => {
    console.log(data)
    content.innerText = JSON.stringify(data)
  })
}

getArchiveData()