let albumsRow = document.querySelector('.albums-row');

const albums = new URLSearchParams(location.search).get("albums")

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

function getUserRow({title, id}) {
  return `
  <div class="albums-wrap">
    <h5 class="albums_title">${title}</h5>
    <div class="btn_albums">
      <button><a href="photos.html?albums=${id}">Photos</a></button>
    </div>
  </div>
  `
}

albumsRow.innerHTML = '...Loading'

getData(`https://jsonplaceholder.typicode.com/albums?userId=${albums}`, (albums) => {
  albumsRow.innerHTML = ''
  albums.map((albums) => {
    albumsRow.innerHTML += getUserRow(albums);   
  })
})

