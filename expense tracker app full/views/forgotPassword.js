

const form = document.querySelector('#forgetform');

form.addEventListener('submit', forgotPassword);

async function forgotPassword(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value;
console.log(email)
  try {
    const response = await axios.post(`http://localhost:3005/password/forgot`, {
      email,
    });
    console.log(response)
    // if(response.data==false){
     
    // }
    alert('Check Your Inbox');
    window.location.href = './sign up page.html';
  } catch (error) {
   alert("enter correct email address")
    console.log(error);
  }
}