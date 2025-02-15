import { checkToken, redirect } from "./utils.js";

const form = document.forms[0];

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

(function () {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/index.html");
  }
})();

form.onsubmit = login;
async function login(event) {
  event.preventDefault();
  const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: emailInput.value,
      password: passwordInput.value,
    }),
  });

  const result = await response.json();
  localStorage.setItem("access_token", result.token);

  const hasToken = checkToken();
  if (hasToken) {
    window.location = "../index.html";
  }
}

emailInput.oninput = function (event) {
  console.log(event.target.value);
};

passwordInput.oninput = function (event) {
  console.log(event.target.value);
};
