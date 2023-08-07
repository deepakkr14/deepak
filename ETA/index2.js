let form = document.getElementById("forms");
let table = document.getElementById("table");

form.addEventListener("submit", addItem);
async function addItem(e) {
  e.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("desc").value;
  const category = document.getElementById("category").value;
  const userId = document.getElementById("userId").value;

  
  if (userId == "") {
    try {
      const response = await axios.post("http://localhost:3003/add", {
        amount: amount,
        description: description,
        category: category,
      });
      console.log("New record Created");
      form.reset();
      showAllrecord();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await axios.post("http://localhost:3003/edit", {
        userId,
        amount,
        description,
        category,
      });
      console.log("record Updated");
      form.reset();
      showAllrecord();
    } catch (error) {
      console.log(error);
    }
    document.getElementById("userId").value = "";
  }
  form.reset();
  document.querySelector("#sub").value = "Add Expenses";
}
document.addEventListener("DOMContentLoaded", showAllrecord());
async function showAllrecord() {
  let tableBody = document.getElementById("tableBody");

  const response = await axios.get("http://localhost:3003/getAll");

  tableBody.innerHTML = " ";
  if (response.data.length == 0) {
    let table_data_empty = document.createElement("td");
    table_data_empty.innerHTML = "No records found";

    tableBody.appendChild(table_data_empty);
  }
  response.data.forEach((user) => {
   
    let table_row = document.createElement("tr");

    let table_data_amt = document.createElement("td");
    table_data_amt.innerHTML = `${user.amount}`;
    table_row.appendChild(table_data_amt);

    let table_data_desc = document.createElement("td");
    table_data_desc.innerHTML = `${user.description}`;
    table_row.appendChild(table_data_desc);

    let table_data_categ = document.createElement("td");
    table_data_categ.innerHTML = `${user.category}`;
    table_row.appendChild(table_data_categ);

    let table_data_btn = document.createElement("td");
    let table_data_del_button = document.createElement("button");
    table_data_del_button.setAttribute("class", "btn btn-danger btn-sm");
    table_data_del_button.innerHTML = "Delete";
    table_data_btn.append(table_data_del_button);

    table_row.appendChild(table_data_btn);

    let table_data_btn2 = document.createElement("td");
    let table_data_edit_button = document.createElement("button");
    table_data_edit_button.setAttribute("class", "btn btn-primary btn-sm");
    table_data_edit_button.innerHTML = "Edit";
    table_data_btn2.append(table_data_edit_button);

    table_row.appendChild(table_data_btn2);

    tableBody.appendChild(table_row);

    table_data_del_button.onclick = () => {
      let id = user.id;
      deleteRecord(id);
    };
    table_data_edit_button.onclick = () => {
      document.querySelector("#userId").value = user.id;
      document.querySelector("#amount").value = user.amount;
      document.querySelector("#desc").value = user.description;
      document.querySelector("#category").value = user.category;
      document.querySelector("#sub").value = "edit";

    };
  });
}

async function deleteRecord(id) {
  try {
    const res = await axios.get("http://localhost:3003/delete/" + `${id}`);
    tableBody.innerHTML = " ";
    showAllrecord();
  } catch (error) {
    console.log(error);
  }
}
