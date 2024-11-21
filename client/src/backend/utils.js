export function logout(setAccount, setBalance, navigate) {
  localStorage.clear();
  setBalance(null);
  setAccount(null);
  navigate("/");
}
