class Navbar extends HTMLElement {
  constructor() {
    super();
    this.page = this.getAttribute("page");
    this.load();
  }

  async load() {
    this.innerHTML = await loader("../components/navbar.html");
    this.style.zIndex = "1000";
    this.style.position = "relative";
    this.addToggleBehavior();
    this.addHeightBehavior();
  }

  addToggleBehavior() {
    const navbarToggler = this.querySelector("#navbarToggler");
    const togglerIcon = this.querySelector("#togglerIcon");

    if (navbarToggler && togglerIcon) {
      navbarToggler.addEventListener("click", () => {
        if (togglerIcon.classList.contains("fa-bars")) {
          togglerIcon.classList.remove("fa-bars");
          togglerIcon.classList.add("fa-times");
        } else {
          togglerIcon.classList.remove("fa-times");
          togglerIcon.classList.add("fa-bars");
        }
      });
    }
  }

  addHeightBehavior() {
    const navbarList = this.querySelector(".navbar-nav");

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        navbarList.style.height = "";
      } else {
        navbarList.style.height = "calc(100vh - 74px)";
      }
    });
  }
}

async function loader(f) {
  const res = await fetch(f);
  if (res.ok) {
    return await res.text();
  } else {
    console.error(`Failed to fetch ${f}`);
  }
}

window.customElements.define("navbar-component", Navbar);
