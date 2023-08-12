let form = document.getElementById("form");
const p = document.querySelector("#message");
async function singup(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:3005/users/login", {
      name,
      email,
      password,
    });
    console.log(response.data);
    if (response.status == 200) {
      alert("Successfully logged in");
      window.location.href = './copy of expense.html';
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
