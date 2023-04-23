const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const username = usernameInput.value;
	const password = passwordInput.value;

    console.log({username, password})
	// Your login code here...
});
