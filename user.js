let usersRow = document.querySelector('.users-row');

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

function getUserRow({name, username, email, website, address, phone,  id}) {
  return `
  <div class="user-wrap">
    <h2>${name}</h2>
    <h3>${username}</h3>
    <p>Email : <a href="">${email}</a></p>
    <p>Website : <a href="">${website}</a></p>
    <p>Address : <a href="">${address.street} , ${address.city}</a></p>
    <p>Phone : <a href="">${phone}</a></p>
    <div class="btn">
      <button><a href="todos.html?todos=${id}">Todos</a></button>
      <button><a href="posts.html?posts=${id}">Posts</a></button>
      <button><a href="albums.html?albums=${id}">Albums</a></button>
    </div>
  </div>
  `
}

usersRow.innerHTML = '...Loading'

getData('https://jsonplaceholder.typicode.com/users', (users) => {
  usersRow.innerHTML = '';
  users.map((user) => {
    usersRow.innerHTML += getUserRow(user);   
  })
})