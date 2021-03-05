// SIDE MENU
const hamburger = document.querySelector(".hamburger");
const sideMenu = document.querySelector(".side");
const overlay = document.querySelector(".overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("times");
  hamburger.classList.toggle("move-side");
  sideMenu.classList.toggle("side-move");

  if (overlay.style.display !== "block") {
    overlay.style.display = "block";
  } else {
    overlay.style.display = "none";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    removeSide();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay")) {
    removeSide();
  }
});

function removeSide() {
  hamburger.classList.remove("times");
  hamburger.classList.remove("move-side");
  overlay.style.display = "none";
  sideMenu.classList.remove("side-move");
}

// SUBSCRIBE PART
const subInput = document.querySelector(".subscribe-input");
const subBtn = document.querySelector(".sub-btn");
const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

subBtn.addEventListener("click", () => {
  if (subInput.value === "") {
    showAlert("Please enter an email address");
  } else {
    if (!reg.test(subInput.value)) {
      showAlert("Please enter a proper email address");
    } else {
      subInput.value = "";
      showMessage();
    }
  }
});

function showAlert(text) {
  const div = document.createElement("DIV");
  div.className = "alert fade";
  div.appendChild(document.createTextNode(text));
  document.body.appendChild(div);

  setTimeout(() => {
    document.querySelector(".alert").classList.add("fadeout");
  }, 3000);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3500);
}

function showMessage() {
  const div = document.createElement("DIV");
  div.className = "thanks thanks-fade-in";
  div.innerHTML = `<i class="fas fa-check"></i>
      <h2>Thank you!</h2>
      <p>For subscribing to our newsletter</p>`;

  document.body.appendChild(div);

  setTimeout(() => {
    document.querySelector(".thanks").classList.add("thanks-fade-out");
  }, 3000);

  setTimeout(() => {
    document.querySelector(".thanks").classList.remove("thanks-fade-out");
    document.querySelector(".thanks").remove();
  }, 3500);
}

// CUSTOME OPTION SECTION

document
  .querySelector(".custom-select-wrapper")
  .addEventListener("click", function () {
    this.querySelector(".custom-select").classList.toggle("open");
  });

for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function (e) {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      document.querySelector(
        ".custom-select-display span"
      ).textContent = this.textContent;
    }
  });
}

// NUMBER COUNTER

// const speed = 300;
// const numbers = document.querySelectorAll(".number");

// numbers.forEach((number) => {
//   const updateCounter = () => {
//     const target = +number.getAttribute("data-number");
//     const n = +number.innerText;

//     const inc = target / speed;

//     if (n < target) {
//       number.innerText = Math.ceil(n + inc);
//       setTimeout(updateCounter, 1);
//     } else {
//       number.innerText = target;
//     }
//   };
//   updateCounter();
// });

// Fetch rss feed and display it
const url = "https://www.lianatech.com/resources/blog.rss";

const latestRow = document.querySelector(".latest-row");

async function getData(url) {
  const data = await fetch(url);
  const xmldata = await data.text();
  const parsed = new window.DOMParser().parseFromString(xmldata, "text/xml");
  let items = parsed.querySelectorAll("item");
  console.log(parsed);
  items = Array.from(items).splice(0, 3);

  let element = items
    .map(
      (item) => `
        <div class="latest-card">
          <div class="latest-date">${getDate(
            item.querySelector("pubDate").textContent
          )}</div>
          <div class="latest-content">
            <a href="${item.querySelector("link").textContent}" target="_blank">
             ${item.querySelector("title").textContent}</a>
          </div>
        </div>
  `
    )
    .join(" ");

  latestRow.innerHTML = element;
}

getData(url);

function getDate(date) {
  const arrDate = String(date).split(" ");
  const newForm = arrDate.splice(1, 3).join(" ");
  return newForm;
}

// Sidebar costume select
document
  .querySelector(".custom-select-wrapper-nav")
  .addEventListener("click", function () {
    this.querySelector(".custom-select-nav").classList.toggle("open");
  });

for (const option of document.querySelectorAll(".custom-option-nav")) {
  option.addEventListener("click", function (e) {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option-nav.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      document.querySelector(
        ".custom-select-display-nav span"
      ).textContent = this.textContent;
    }
  });
}
