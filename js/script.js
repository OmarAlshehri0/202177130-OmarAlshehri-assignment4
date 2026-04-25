const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section, header[id]");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const backToTopBtn = document.getElementById("backToTopBtn"); 

function updateActiveNav() {
  let currentId = "about";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (window.scrollY >= top - 160 && window.scrollY < top + height - 160) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
}

function updateBackToTopButton() {
  if (!backToTopBtn) {
    return;
  }

  backToTopBtn.classList.toggle("hidden", window.scrollY < 260);
}

window.addEventListener("scroll", () => {
  updateActiveNav();
  updateBackToTopButton();
});

window.addEventListener("load", () => {
  updateActiveNav();
  updateBackToTopButton();
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    tabButtons.forEach((tabButton) => {
      const active = tabButton === button;
      tabButton.classList.toggle("active", active);
      tabButton.setAttribute("aria-pressed", String(active));
    });

    tabPanels.forEach((panel) => {
      const active = panel.id === target;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  });
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

const githubLoading = document.getElementById("githubLoading");
const githubError = document.getElementById("githubError");
const githubEmpty = document.getElementById("githubEmpty");
const githubProjectsGrid = document.getElementById("githubProjectsGrid");

function showFieldState(element, message) {
  element.textContent = message;
  element.classList.toggle("hidden", !message);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^[+\d\s()-]{7,20}$/.test(value);
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let hasError = false;

    showFieldState(nameError, "");
    showFieldState(phoneError, "");
    showFieldState(emailError, "");
    showFieldState(messageError, "");
    showFieldState(formSuccess, "");

    if (!name) {
      showFieldState(nameError, "Please enter your name.");
      hasError = true;
    }

    if (!phone) {
      showFieldState(phoneError, "Please enter your phone number.");
      hasError = true;
    } else if (!isValidPhone(phone)) {
      showFieldState(phoneError, "Please enter a valid phone number.");
      hasError = true;
    }

    if (!email) {
      showFieldState(emailError, "Please enter your email address.");
      hasError = true;
    } else if (!isValidEmail(email)) {
      showFieldState(emailError, "Please enter a valid email address.");
      hasError = true;
    }

    if (!message) {
      showFieldState(messageError, "Please write a short message.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    showFieldState(formSuccess, "Message sent successfully.");
    contactForm.reset();
  });
}

async function loadGithubProjects() {
  if (!githubLoading || !githubError || !githubEmpty || !githubProjectsGrid) {
    return;
  }

  githubProjectsGrid.innerHTML = "";
  githubError.textContent = "";
  githubError.classList.add("hidden");
  githubEmpty.classList.add("hidden");
  githubLoading.classList.remove("hidden");

  try {
    const response = await fetch(
      "https://api.github.com/users/OmarAlshehri0/repos?sort=updated&per_page=4"
    );

    if (!response.ok) {
      throw new Error("Unable to load GitHub repositories right now.");
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      githubEmpty.classList.remove("hidden");
      return;
    }

    githubProjectsGrid.innerHTML = repos
      .map((repo) => {
        const description = repo.description
          ? repo.description
          : "No description provided for this repository yet.";

        const language = repo.language ? repo.language : "Not specified";

        return `
          <article class="github-card">
            <h3>${repo.name}</h3>
            <p>${description}</p>
            <span class="github-language">${language}</span>
            <a class="pixel-btn" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Open Repository</a>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    githubError.textContent = error.message;
    githubError.classList.remove("hidden");
  } finally {
    githubLoading.classList.add("hidden");
  }
}

loadGithubProjects();
