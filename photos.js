let photosRow = document.querySelector('.photos-row');

const photos = new URLSearchParams(location.search).get("albums")

function getData(url, callback){
  let xhr = new XMLHttpRequest()

  // console.log(xhr.readyState);

  xhr.onreadystatechange = function (){
    if(xhr.readyState === 4 && xhr.status === 200){
      let resJson = xhr.response;
      let res = JSON.parse(resJson)
      callback?.(res)
    } else if(xhr.readyState === 4){
      console.log(xhr.statusText);
    }
  }

  xhr.open('get', url)

  xhr.send()
}

function getUserRow({title, url}) {
  return `
  <div class="photos-wrap">
    <h5>${title}</h5>
    <img src="${url}" alt="img" class="photo_img">
  </div>
  `
}

photosRow.innerHTML = '...Loading'

getData(`https://jsonplaceholder.typicode.com/photos?albumId=${photos}`, (albums) => {
  photosRow.innerHTML = ''
  albums.map((photos) => {
    photosRow.innerHTML += getUserRow(photos);   
  })
})

