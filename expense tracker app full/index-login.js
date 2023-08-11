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
    // if (response.status === 200 && response.data.message == "Login successful") {
    //     alert("Successfully logged in");
    //     console.log("success");

    //   } else if (response.status === 404 && response.data.message == "User not found") {
    //     console.log('not found')
    //     alert("User not found");
    //   } else if (response.status === 401 && response.data.message == "User not authorized") {
    //     console.log('nor auth')
    //     alert("Wrong credentials");
    //   } else {
    //     alert("An error occurred");
    //   }


    if (response.data=="login succesfull") {
     alert("succesfully logged in")
    } else if (response.data=="User not found"){
        alert("User not found")
    }
     else {
        alert("wrong credintials")
    }
  } catch (error) {
    console.log(error);
  }
}
