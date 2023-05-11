let from = document.getElementById("signUp").addEventListener("submit", SignUp);

async function SignUp(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let password = e.target.password.value;
  let obj = {
    name,
    email,
    password,
  };
//   console.log(obj);
  try {
    
    const res = await axios.post("http://localhost:5500/user/sign", obj);
    if (res.status === 200) {
      window.location.href = "../login/login.html";
    }
    alert("User Signed Up");
    // console.log(res);
  } catch (error) {
    alert("Failed"+error.message);
    console.log("error:", error);
  }
 
}
