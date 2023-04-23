const element = document.getElementById("button-login");
element.addEventListener("click", loginAction);

function loginAction() {
  const uname = document.getElementById("username").value;
  const passwd = document.getElementById("password").value;
  const auth_body = {
    username: uname,
    password: passwd
  };
  console.log(auth_body);
}