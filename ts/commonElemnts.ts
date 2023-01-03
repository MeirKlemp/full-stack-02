import $ from "./tools/fastAccess.js";

setTopNavbar();

function setTopNavbar() {
  // <nav class="navbar">
  // <a class="navbar-brand" href="../index.html?logout=true">Logout</a>
  // </nav>
  const container = $.id("top-nav-container") as HTMLDivElement;
  //add the nav element
  const nav = document.createElement("nav");
  nav.className = "navbar";
  //add the logout button to the navbar
  const logOutBtn = document.createElement("a");
  logOutBtn.className = "navbar-brand";
  logOutBtn.innerHTML = "Logout";
  logOutBtn.href = "../index.html?logout=true";
  nav.appendChild(logOutBtn);
  //add home redirection
  if (location.href.indexOf("home.html") == -1) {
    const homeBtn = document.createElement("a");
    homeBtn.href = "/html/home.html";
    homeBtn.className = "navbar-brand";
    homeBtn.innerHTML = "Home";
    nav.appendChild(homeBtn);
  }
  
  container.appendChild(nav);
}