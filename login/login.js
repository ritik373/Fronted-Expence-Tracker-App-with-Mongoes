let from2 = document
  .getElementById("signIn")
  .addEventListener("submit", SignIn);

async function SignIn(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let password = e.target.password.value;
  let obj = {
    name,
    email,
    password,
  };
  try {
    let res = await axios.post("http://localhost:5500/user/login", obj);
    if (res.status === 200) {
      alert("User Logined");
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "../expence/Expence.html";
    }
  } catch (error) {
    console.log("error:", error);
    alert("User Not Found");
  }
}
