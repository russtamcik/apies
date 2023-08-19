let todosRow = document.querySelector('.todos-row');

const todos = new URLSearchParams(location.search).get("todos")

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

function getUserRow({id, title, completed}) {
  return `
  <div class="todos-wrap">
    <p>Id: ${id}</p>
    <h5>${title}</h5>
    <p>${completed ? "✅" : "❌"}</p>
  </div>
  `
}

todosRow.innerHTML = '...Loading'

getData(`https://jsonplaceholder.typicode.com/todos?userId=${todos}`, (todo) => {
  todosRow.innerHTML = ''
  todo.map((todos) => {
    todosRow.innerHTML += getUserRow(todos);   
  })
})

