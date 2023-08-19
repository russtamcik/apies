let postsRow = document.querySelector('.posts-row');

const posts = new URLSearchParams(location.search).get("posts")

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

function getUserRow({title, body, id}) {
  return `
  <div class="posts-wrap">
    <div class="posts-line">
      <h5>${title}</h5>
      <p>${body}</p>
      </div>
      <button class="btn_posts"><a href="comments.html?posts=${id}">Comments</a></button>
  </div>
  `
}

postsRow.innerHTML = '...Loading'

getData(`https://jsonplaceholder.typicode.com/posts?userId=${posts}`, (posts) => {
  postsRow.innerHTML = ''
  posts.map((posts) => {
    postsRow.innerHTML += getUserRow(posts);   
  })
})

