let form = document.getElementById("form");
let ul1 = document.getElementById("table 1");
let ul2 = document.getElementById("table 2");
let ul3 = document.getElementById("table 3");
let ul4 = document.getElementById("table 4");

async function addItem(event) {
  event.preventDefault();

  let price = document.getElementById("price").value;
  let item = document.getElementById("item").value;
  let table = document.getElementById("tablee").value;

  try {
    const response = await axios.post("http://localhost:3002/add", {
      price: price,
      item: item,
      table: table,
    });
    console.log("New record Created");
    form.reset();
    showTables();
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("DOMContentLoaded", showTables());
async function showTables() {
  const response = await axios.get("http://localhost:3002/getAll");

  ul1.innerHTML = " ";
  ul2.innerHTML = " ";
  ul3.innerHTML = " ";
  ul4.innerHTML = " ";
  response.data.forEach((user) => {
    console.log(response.data);
    const li = document.createElement("li");
    li.setAttribute("type","square")
    li.textContent = user.price + "  ---  " + user.item + " ";
    const deletebtn = document.createElement("input");
    deletebtn.type = "button";
    deletebtn.value = "delete";

    deletebtn.onclick = () => {
      let id = user.id;
      deleteAppointment(id);
    };
    li.appendChild(deletebtn);

    // appending it to respected ul
    if (user.table == "table 1") {
      ul1.appendChild(li);
    } else if (user.table == "table 2") {
      ul2.appendChild(li);
    } else if (user.table == "table 3") {
      ul3.appendChild(li);
    } else {
      ul4.appendChild(li);
    }
  });
}

async function deleteAppointment(id) {
  try {
    const res = await axios.get("http://localhost:3002/delete/" + id);
    ul1.innerHTML = " ";
    ul2.innerHTML = " ";
    ul3.innerHTML = " ";
    ul4.innerHTML = " ";
    showTables();
  } catch (error) {
    console.log(error);
  }
}
