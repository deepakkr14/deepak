let form = document.getElementById("form");
const p = document.querySelector("#message");
async function login(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:3005/users/login", {
      email,
      password,
    });
    console.log(response.data);
    localStorage.setItem("token",response.data.token)
    if (response.status == 201) {
      alert("Successfully logged in");
      window.location.href = './copy of expense.html';
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
