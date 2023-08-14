let form = document.getElementById("forms");
let table = document.getElementById("table");
let token = localStorage.getItem("token");
let premiumBuy = document.querySelector("#premiumbtn");

premiumBuy.addEventListener("click", async function (e) {
  e.preventDefault();
  const response = await axios.get("http://localhost:3005/getPremium", {
    headers: { authorization: token },
  });
  console.log(response);

  const options = {
    "key": response.data.key_id,
    "name": "D J Company",
    "description": "test transaction",
    // image:'https://png.pngtree.com/template/20201023/ourmid/pngtree-fitness-logo-with-letter-tg-icon-idea-of-logo-design-image_427180.jpg',
    "order_id": response.data.order.id,
    // handles successful payment
    "handler": async function (response) {
      const update = await axios.post(
        `http://localhost:3005/update`,
        {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
        },
        {
          headers: { Authorization: token },
        }
      );

      alert("You are a premium user now!");
      // set new token to localStorage
      if (localStorage.getItem("token") != update.token) {
       
        premiumBuy.innerHTML = "you are premium user";
        premiumBuy.disabled = true;
      }
      localStorage.setItem("token", update.data.token);
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new Razorpay(options);

  rzp1.open();
  e.preventDefault();
  rzp1.on("payment.failed", function (response) {
    console.log(response);
    alert("Something went wrong");
  });
});

form.addEventListener("submit", addItem);
async function addItem(e) {
  e.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("desc").value;
  const category = document.getElementById("category").value;
  const userId = document.getElementById("userId").value;

  if (userId == "") {
    try {
      const response = await axios.post(
        "http://localhost:3005/add",
        {
          amount: amount,
          description: description,
          category: category,
        },
        { headers: { authorization: token } }
      );
      console.log("New record Created");
      form.reset();
      showAllrecord();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await axios.post(
        "http://localhost:3005/edit",
        {
          userId,
          amount,
          description,
          category,
        },
        { headers: { authorization: token } }
      );
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
  // console.log(token)
  const response = await axios.get("http://localhost:3005/getAll", {
    headers: { Authorization: token },
  });

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
    const res = await axios.get("http://localhost:3005/delete/" + `${id}`, {
      headers: { authorization: token },
    });
    tableBody.innerHTML = " ";
    showAllrecord();
  } catch (error) {
    console.log(error);
  }
}
