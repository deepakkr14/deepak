// AXIOS GLOBAL
axios.defaults.headers.common['x-Auth-Token']="fsdfdfdfdfadlllll"



// GET REQUEST
function getTodos() {
  // console.log('GET Request');
  // axios({
  //   method:"get",
  //   url:"https://jsonplaceholder.typicode.com/todos",
  //   params:{
  //     _limit :15
  //   }
  // })
  // .then((data) =>showOutput(data)
  // //  console.log(data.data
  //   )
  // .catch((err) => console.log(err))

  console.log('GET Request');
  // axios.get("https://jsonplaceholder.typicode.com/todos",{  params: {
  //   _limit:3
  // }})
  axios
  .get("https://jsonplaceholder.typicode.com/todos?_limit=5",{timeout: 4})
  .then((data) =>showOutput(data) )
  .catch((err) => console.log(err))
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  axios.post("https://jsonplaceholder.typicode.com/todos", {
    title:"deepak is a noob",
        completed:"false"
      }
  )
   .then((data) =>showOutput(data)
      )
    .catch((err) => console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios.patch("https://jsonplaceholder.typicode.com/todos/1", {
    title:"deepak is a pro",
        completed:"false"
      }
  )
   .then((data) =>showOutput(data)
      )
    .catch((err) => console.log(err))


}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
 
  axios.delete("https://jsonplaceholder.typicode.com/todos/1")
   .then((data) =>showOutput(data)
      )
    .catch((err) => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios.all([
    axios("https://jsonplaceholder.typicode.com/todos"),
    axios("https://jsonplaceholder.typicode.com/posts")
  ])
  // .then(data =>  { console.log(data[0]);
  //           console.log(data[1]);
  //           showOutput(data)
  //         }
  // )
  .then(axios.spread((todos,posts) => showOutput(todos)))
    .catch((err) => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log('Custom Headers');
   const config = {
     headers:{
    'Content-Type': 'application/json',
    authorization : 'sometoken'
    } 
  }

   
  axios.post("https://jsonplaceholder.typicode.com/todos", {
    title:"deepak is a noob",
        completed:"false",
       
      }, config
  )
   .then((data) =>showOutput(data)
      )
    .catch((err) => console.log(err))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  const trans={
    method:"post",
    url:"https://jsonplaceholder.typicode.com/todos",
    data:{
      title:"hello world"
    },transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title=data.title.toUpperCase();
      return data;
    })
  }
  axios(trans).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios
  .get("https://jsonplaceholder.typicode.com/todoss")
  .then((data) =>showOutput(data) )
  .catch(error =>{ if(error.response){
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    if(error.response.status===404){
      alert("error : page not found")
    }
  }else if(error.request){
  console.log(error.request)}
 else{console.log(error.message)}
  } )
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  // console.log('Cancel Token');
  axios
  .get("https://jsonplaceholder.typicode.com/todos",{cancelToken :source.token})
  .then((data) =>showOutput(data) )
  .catch(thrown => {
   if(   axios.isCancel(thrown))
  {
    console.log('request cancel',thrown.message);
  }
});
if(true){
  source.cancel('requeat canceled!')
}
  
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config=> {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}` );
    return config;
  }, error => { return Promise.reject(error)}

);

// AXIOS INSTANCES
const axiosinstances = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
}) ;
axiosinstances.get('/comments').then(res => showOutput(res));
// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
