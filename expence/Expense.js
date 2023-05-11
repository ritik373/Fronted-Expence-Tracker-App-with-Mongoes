let form = document.querySelector("form").addEventListener("submit", Expense);

async function Expense(e) {
  e.preventDefault();
  let amount = e.target.expenseAmount.value;
  let description = e.target.description.value;
  let category = e.target.category.value;
  let obj = {
    amount,
    description,
    category,
  };
  // console.log(obj);
  const token = localStorage.getItem("token");
  try {
    let res = await axios.post(
      "http://localhost:5500/expense/addExpense",
      obj,
      { headers: { Authorization: token } }
    );
    if (res.status === 200) {
      alert("Expense Added SuccessFully");
      // console.log(res.expense);
      window.location.href = "../singleExpence/SingleExpense.html";

    }
  } catch (error) {
    console.log("error:", error);
    alert("Please Fill Correct Details");
  }
}
