export function checkToken() {
  const token = localStorage.getItem("access_token");

  return Boolean(token);
}

export function redirect(path) {
  window.location = path;
}
