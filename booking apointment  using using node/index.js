const form = document.getElementById("form");
let ul = document.getElementById("lists");
async function addItem(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("mob").value;
  const email = document.getElementById("mail").value;
  const userId = document.getElementById("userId").value;

  if (userId == "") {
    try {
      const response = await axios.post("http://localhost:3002/add", {
        name,
        email,
        phone,
      });
      console.log("New Appointment Created");
      form.reset();
      showAllAppointments();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await axios.post("http://localhost:3002/edits/", {
        userId,
        name,
        email,
        phone,
      });
      console.log("Appointment Updated");
      form.reset();
      showAllAppointments();
    } catch (error) {
      console.log(error);
    }
    document.getElementById("userId").value = "";
  }
}
document.addEventListener("DOMContentLoaded", showAllAppointments());

async function showAllAppointments() {
  const response = await axios.get("http://localhost:3002/getAll");

  ul.innerHTML = " ";
  response.data.forEach((user) => {
    const li = document.createElement("li");
    li.textContent =
      user.name + ":" + user.phone + ":" + user.contact + "--" + user.id;
    const deletebtn = document.createElement("input");
    deletebtn.type = "button";
    deletebtn.value = "delete";

    deletebtn.onclick = () => {
      let id = user.id;
      deleteAppointment(id);
    };

    const editbtn = document.createElement("input");
    editbtn.type = "button";
    editbtn.value = "edit";

    editbtn.onclick = () => {
      let id = user.id;
      editAppointment(id);
    };
    li.appendChild(deletebtn);
    li.appendChild(editbtn);
    ul.appendChild(li);
  });
}

async function deleteAppointment(id) {
  try {
    const res = await axios.get("http://localhost:3002/delete/" + id);
    ul.innerHTML = " ";
    showAllAppointments();
  } catch (error) {
    console.log(error);
  }
}

async function editAppointment(id) {
  try {
    const res = await axios.get("http://localhost:3002/edit/" + id);
    document.getElementById("name").value = res.data.name;
    document.getElementById("mail").value = res.data.contact;
    document.getElementById("mob").value = res.data.phone;
    document.getElementById("userId").value = res.data.id;
    showAllAppointments();
  } catch (error) {
    console.log(error);
  }
}
