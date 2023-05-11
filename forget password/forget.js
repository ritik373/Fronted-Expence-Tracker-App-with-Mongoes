let form = document.getElementById("forget").addEventListener("submit", forget);

async function forget(e) {
  e.preventDefault();
  let email = e.target.email.value;
  let obj = {
    email,
  };
  console.log(obj.email);
  try {
    let res = await axios.post(
      "http://localhost:5500/forget/forgotpassword",
      obj
    );
    alert(res.data.message);
    console.log(res);
  } catch (error) {
    console.log("error:", error);
  }
}
