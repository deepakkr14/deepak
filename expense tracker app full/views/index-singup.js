let form = document.getElementById("form");
// let ul1 = document.getElementById("table 1");
// let ul2 = document.getElementById("table 2");
// let ul3 = document.getElementById("table 3");
// let ul4 = document.getElementById("table 4");
const p = document.querySelector("#message");
async function singup(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:3005/users/singup", {
      name,
      email,
      password,
    });
    console.log(response.data);
    if (response.data.length > 0) {
      p.innerText = "Email already exists";
    } else {
      window.location.href = "./log in page.html";
    }
  } catch (error) {
    console.log(error);
  }
}

