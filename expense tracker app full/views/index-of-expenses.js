let form = document.getElementById("forms");
let table = document.getElementById("table");
let token = localStorage.getItem("token");
let premiumBuy = document.querySelector("#premiumbtn");
let leaderboardbtn = document.querySelector("#leader");
let leaderboard_div = document.querySelector("#leaderboard");
let downloadbtn = document.getElementById("download");
let downloadtable = document.getElementById("downloadTable");
let downloadtableBody = document.getElementById("downloadTableBody");
let pagination = document.getElementById("pagination");
// let pageLimit=document.getElementById("pageLimit")

let page = 1;

// DOWNLOAD REPORT BUTTON FUNCTION
downloadbtn.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const response = await axios.get("http://localhost:3005/user/download", {
      headers: { authorization: token },
    });

    if (response.status === 200) {
      console.log(response.data);
      var a = document.createElement("a");
      a.href = response.data.fileURL;
      a.download = "myexpenses.txt";
      a.click();
      showAllrecord(page) 
    } else {
      throw new Error(response.data.message);
    }
  } catch {
    (err) => {
      console.log("error", err);
    };
  }
});
// ADD AND EDIT FUNCTION

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
      console.log("New record Created" + response);
      form.reset();
      showAllrecord(page);
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
      showAllrecord(page);
    } catch (error) {
      console.log(error);
    }
    document.getElementById("userId").value = "";
  }
  form.reset();
  document.querySelector("#sub").value = "Add Expenses";
}

// LEADERBOARD FUNCTION
leaderboardbtn.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const response = await axios.get("http://localhost:3005/leaderboard", {
      headers: { authorization: token },
    });
    leaderboard_div.innerHTML=""
    const ul = document.createElement("ul");
    const h1=document.createElement('h1');
    h1.textContent=`leaderboard`;
    ul.appendChild(h1);
    if (response.data.data.length > 0) {

      response.data.data.forEach((data) => {
        // const p=document.createElement('p');
        // p.textContent=
        // ul.appendChild(p);
        
        const li = document.createElement("li");
        li.append(
          document.createTextNode(
            `Name: ${data.name} => Total Expense: ${data.totalExpense}`
          )
        );
        ul.appendChild(li);
      });
      leaderboard_div.appendChild(ul);
    }
  } catch (error) {
    console.log(error);
  }
});
// BUY PREMIUM BUTTON FUNCTION
premiumBuy.addEventListener("click", async function (e) {
  e.preventDefault();
  const response = await axios.get("http://localhost:3005/getPremium", {
    headers: { authorization: token },
  });
  console.log(response);

  const options = {
    key: response.data.key_id,
    name: "D J Company",
    description: "test transaction",
    // image:'https://png.pngtree.com/template/20201023/ourmid/pngtree-fitness-logo-with-letter-tg-icon-idea-of-logo-design-image_427180.jpg',
    order_id: response.data.order.id,
    // handles successful payment
    handler: async function (response) {
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
      window.location.reload();
      // localStorage.setItem("token", update.data.token);
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

// SHOW ALL RECORD FUNCTION
pageLimit.addEventListener("change", async function () {
  const selectedValue = pageLimit.value;
  localStorage.setItem("pageLimit", selectedValue);
});
document.addEventListener("DOMContentLoaded", showAllrecord(page));
async function showAllrecord(page) {
  let tableBody = document.getElementById("tableBody");
//  localStorage.setItem("pageLimit",document.getElementById("pageLimit").value)

 
 let limits=localStorage.getItem("pageLimit")
  // const response = await axios.get("http://localhost:3005/getAll", {
  //   headers: { Authorization: token },
  // });
  const pagedata = await axios.get(`http://localhost:3005/page/${page}/${limits}`, {
    headers: { Authorization: token },
   
  });
  
  // BUTTON SWITCHING
  if (pagedata.data.premium == true) {
    premiumBuy.innerHTML = "you are premium user";
    premiumBuy.disabled = true;
    downloadbtn.disabled = false;
    leaderboardbtn.disabled = false;

    const downloadres = await axios.get("http://localhost:3005/getlinks", {
      headers: { Authorization: token },
    });
    downloadtableBody.innerHTML = "";

    if (downloadres.data.length == 0) {
      let table_row = document.createElement("tr");

      let table_data_date = document.createElement("td");
      table_data_date.innerHTML = "no Previous downloads";
      table_row.appendChild(table_data_date);
      downloadtableBody.appendChild(table_row);
    }

    for (let i of downloadres.data) {
      let table_row = document.createElement("tr");

      let table_data_date = document.createElement("td");
      table_data_date.innerHTML = i.date;
      table_row.appendChild(table_data_date);

      let table_data_link = document.createElement("td");
      table_data_link.innerHTML = `<a href=${i.fileUrl}>download</a>`;
      table_row.appendChild(table_data_link);

      downloadtableBody.appendChild(table_row);
    }
  }

  tableBody.innerHTML = " ";
  pagination.innerHTML = " ";
  console.log(pagedata);

  let button1 = document.createElement("button");
  button1.classList = "btn";
  button1.innerText = pagedata.data.previousPage;
  pagination.appendChild(button1);

  let button2 = document.createElement("button");
  button2.classList = "btn";
  button2.classList = "active";
  button2.innerText = pagedata.data.currentPage;

  pagination.appendChild(button2);
  let button3 = document.createElement("button");
  button3.classList = "btn";
  button3.innerText = pagedata.data.nextPage;
  pagination.appendChild(button3);

  button1.addEventListener("click", () => {
    showAllrecord(pagedata.data.previousPage);
  });

  button2.addEventListener("click", () => {
    showAllrecord(pagedata.data.currentPage);
  });

  button3.addEventListener("click", () => {
    showAllrecord(pagedata.data.nextPage);
  });

  if (pagedata.data.expenses.length == 0) {
    let table_data_empty = document.createElement("td");
    table_data_empty.innerHTML = "No records found";

    tableBody.appendChild(table_data_empty);
  }
  pagedata.data.expenses.forEach((user) => {
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
  let curpage = 1;
}

async function deleteRecord(id) {
  try {
    const res = await axios.get("http://localhost:3005/delete/" + `${id}`, {
      headers: { authorization: token },
    });
    tableBody.innerHTML = " ";
    showAllrecord(page);
  } catch (error) {
    console.log(error);
  }
}
