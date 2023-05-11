function showLeaderBoard() {
  const inputElement = document.createElement("input");
  inputElement.type = "button";
  inputElement.value = "Show LeaderBoard";
  inputElement.id = "btn";
  inputElement.onclick = async () => {
    const token = localStorage.getItem("token");
    const userLeaderBoardArray = await axios.get(
      "http://localhost:5500/preminum/showLeaderBoard",
      { headers: { Authorization: token } }
    );
    console.log(userLeaderBoardArray);
    var leaderBoardElem = document.getElementById("LeaderBoard");
    leaderBoardElem.innerHTML += `<h1>Leader Board</h1>`;
    userLeaderBoardArray.data.forEach((userDetails) => {
      leaderBoardElem.innerHTML += `<div>Name- ${
        userDetails.name
      } Total Expense- ${userDetails.totalExpenses || 0}</div>`;
    });
  };
  document.getElementById("message").appendChild(inputElement);
}



function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  // document.getElementById('downloadexpense').style.visibility="visible";
function Showdata(data) {
    // console.log(data);
    let expense = document.getElementById("expense-list");
    expense.innerHTML = "";
    data.forEach((items) => {
      let div = document.createElement("tr");
      div.dataset.id = `${items.id}`;
      let amount = document.createElement("td");
      amount.innerHTML = items.amount;
      let description = document.createElement("td");
      description.innerHTML = items.description;
      let category = document.createElement("td");
      category.innerHTML = items.category;
      let btndelete = document.createElement("td");
      btndelete.innerHTML = "DELETE";
      btndelete.className = "delete";
      btndelete.addEventListener("click", delet);
      div.append(amount, description, category, btndelete);
      expense.append(div);
    });
  }


  async function getData(page, limit) {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    // console.log(decodedToken);
    document.getElementById("nameOFUser").innerHTML = decodedToken.name;
    const premiumUser=localStorage.getItem('premiumUser');
    const ispremiumuser = decodedToken.ispremiumuser;
    console.log(ispremiumuser)
    console.log("here....")


  
    if (ispremiumuser) {
      document.getElementById("Razorbtn").style.visibility = "hidden";
      document.getElementById('downloadexpense').style.visibility=" hidden";
      document.getElementById("message").innerHTML = "You are a Premium user.";
      showLeaderBoard();
    }

     console.log("here....")

      let res = await axios.get(
        `http://localhost:5500/expense/getExpenses?page=${page}&$limit=${limit}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(res.data.NewData);
      // console.log("chekcjauiheidhie");
      Showdata(res.data.NewData);
      document.getElementById(
        "Total"
      ).innerHTML = `Total Page = ${res.data.lastpage}`;
    
  }
  getData();


  
async function delet(e) {
  let token = localStorage.getItem("token");
  if (e.target.classList.contains("delete")) {
    const deleteElem = e.target.parentElement;
    let Id = deleteElem.dataset.id;
    console.log(Id)
    try {
      let res = await axios.delete(
        `http://localhost:5500/expense/deleteExpense/${Id}`,
        { headers: { Authorization: token } }
      );
      if (res.status == 200) {
        console.log(res);
        location.reload();
      }else{
        alert(res.message);
      }
    } catch (error) {
      console.log("error:delete find id", error);
    }
  }
}
  

// razorpay proceess...................

document.getElementById('Razorbtn')
.addEventListener('click',RozarFunc);

async function RozarFunc(e){

  let token = localStorage.getItem("token");
  console.log(token);
  
  const res = await axios.get(
    "http://localhost:5500/purchase/premiummembership",
    {
      headers: { Authorization: token },
    }
  );
console.log(res.data.orders);
let options = {
  key: res.data.key_id,
  order_id: res.data.orders.orderid,
  handler: async function (response) {
    let res1 = await axios.post(
      "http://localhost:5500/purchase/updatetransactionstatus",
      {
        order_id: options.order_id,
        key:options.key,
      },
      { headers: { Authorization: token } }
    );
    alert("you are a premium user now");
   
      document.getElementById("Razorbtn").style.visibility = "hidden";
    
    document.getElementById("message").innerHTML = "You are a Premium user.";
 
    localStorage.setItem("premiumUser", true);
    localStorage.setItem("token", res1.data.token);
    showLeaderBoard();

    // }
    
  },
};

// leader borad......................



const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
  rzp1.on("payment failed", function (response) {
    // console.log(response);
    alert("Something went wrong");
  });
  


}

async function download() {
  const token = localStorage.getItem("token");
  try {
    // let res = await axios.get("http://localhost:5500/expense/download", {
    //   headers: { Authorization: token },
    // });
    console.log("clicked on download button");
    // if (res.status === 200) {
    //   var a = document.createElement("a");
    //   a.href = res.data.data.url;
    //   a.download = "expense.txt";
    //   a.click();
    // }
  } catch (error) {
    console.log("error:", error);
  }
}

let add = document.querySelector("#add");
let subract = document.querySelector("#subtract");
let output = document.querySelector("#output");


add.addEventListener("click", function () {
 
    let result = Number(output.innerText) + 1;
    let x = Number(result);
    output.innerText = x;
    getData(x);

  

});

subract.addEventListener("click", function () {
  if(Number(output.innerText)>0){
  let result = Number(output.innerText) - 1;
  let x = Number(result);
  output.innerText = x;
  getData(x);
  }
});

document.getElementById("limit-form").addEventListener("submit", setLimt);

function setLimt(e) {
  e.preventDefault();
  let x = e.target.limit.value;
  console.log(x);
  getData(1, x);
}

