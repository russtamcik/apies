let commentsRow = document.querySelector('.comments-row');

const comments = new URLSearchParams(location.search).get("posts")

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

function getUserRow({name, email, body}) {
  return `
  <div class="comments-wrap">
    <p class="coment_email">${email}</p>
    <h5 class="coment_name">${name}</h5>
    <p class="coment_body">${body}</p>
  </div>
  `
}

commentsRow.innerHTML = '...Loading'

getData(`https://jsonplaceholder.typicode.com/comments?postId=${comments}`, (posts) => {
  commentsRow.innerHTML = ''
  posts.map((comment) => {
    commentsRow.innerHTML += getUserRow(comment);   
  })
})

