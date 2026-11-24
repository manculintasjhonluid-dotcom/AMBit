// Step 1: Browser User ID, Starter Data & localStorage Helpers
function getUserId() {
  let userId = localStorage.getItem("ambit_user_id");
  if (!userId) {
    userId = "user_" + Date.now().toString();
    localStorage.setItem("ambit_user_id", userId);
  }
  return userId;
}

const defaultSkills = [
  {
    id: "default-skill-1",
    ownerId: "system",
    title: "Poster & UI Mockup Design",
    provider: "Alex Reyes",
    category: "Graphic Design",
    description: "Can help with Canva/Figma layouts, event posters, and wireframes.",
    availability: "Available This Week",
    contact: "@alex.reyes"
  },
  {
    id: "default-skill-2",
    ownerId: "system",
    title: "HTML, CSS & JavaScript Tutoring",
    provider: "Manculintas, Jhonluid",
    category: "Programming",
    description: "Happy to help classmates debug front-end layouts and basic JS.",
    availability: "Available Now",
    contact: "@jhonluid"
  }
];

function getSkills() {
  const saved = localStorage.getItem("ambit_skills");
  return saved ? JSON.parse(saved) : defaultSkills;
}

function saveSkills(skills) {
  localStorage.setItem("ambit_skills", JSON.stringify(skills));
}

// Step 2A: Starter Requests & localStorage Helpers
const defaultRequests = [
  {
    id: "default-req-1",
    ownerId: "system",
    title: "Need help debugging JavaScript loops",
    seeker: "Jamie Cruz",
    category: "Programming",
    description: "Looking for someone to review my IT23 lab exercise before Friday.",
    contact: "@jamiecruz"
  }
];

function getRequests() {
  const saved = localStorage.getItem("ambit_requests");
  return saved ? JSON.parse(saved) : defaultRequests;
}

function saveRequests(requests) {
  localStorage.setItem("ambit_requests", JSON.stringify(requests));
}

// Owner-Protected Delete Helpers
function deleteSkill(id) {
  const currentUser = getUserId();
  const target = getSkills().find(skill => skill.id === id);
  if (!target || target.ownerId !== currentUser) return;

  if (!confirm("Delete your skill post?")) return;
  const updated = getSkills().filter(skill => skill.id !== id);
  saveSkills(updated);
  filterAndSortSkills();
}

function deleteRequest(id) {
  const currentUser = getUserId();
  const target = getRequests().find(req => req.id === id);
  if (!target || target.ownerId !== currentUser) return;

  if (!confirm("Delete your help request?")) return;
  const updated = getRequests().filter(req => req.id !== id);
  saveRequests(updated);
  renderRequests();
}

// Step 2B: Display Skill & Request Cards on browse.html
function renderSkills(skillsList) {
  const skillsGrid = document.getElementById("skillsGrid");
  const noResults = document.getElementById("noResultsMessage");
  if (!skillsGrid) return;

  const currentUser = getUserId();
  skillsGrid.innerHTML = "";

  if (skillsList.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  skillsList.forEach(skill => {
    const isOwner = skill.ownerId === currentUser;
    const card = document.createElement("article");
    card.className = "skill-card";
    card.innerHTML = `
      <div class="card-top">
        <span class="badge">${skill.category}</span>
        ${isOwner ? `<button type="button" class="delete-btn" onclick="deleteSkill('${skill.id}')">Delete</button>` : ""}
      </div>
      <h3>${skill.title}</h3>
      <p class="provider-name">Provider: ${skill.provider} ${isOwner ? '<span class="owner-tag">(You)</span>' : ""}</p>
      <p class="skill-desc">${skill.description}</p>
      <div class="card-footer">
        <span class="availability">${skill.availability}</span>
        <span class="contact-info">Contact: ${skill.contact}</span>
      </div>
    `;
    skillsGrid.appendChild(card);
  });
}

// Step 2C: Display "I Need Help" Request Cards
function renderRequests() {
  const requestsGrid = document.getElementById("requestsGrid");
  if (!requestsGrid) return;

  const currentUser = getUserId();
  const requests = getRequests();
  requestsGrid.innerHTML = "";

  requests.forEach(req => {
    const isOwner = req.ownerId === currentUser;
    const card = document.createElement("article");
    card.className = "skill-card request-card";
    card.innerHTML = `
      <div class="card-top">
        <span class="badge badge-request">${req.category} Request</span>
        ${isOwner ? `<button type="button" class="delete-btn" onclick="deleteRequest('${req.id}')">Delete</button>` : ""}
      </div>
      <h3>${req.title}</h3>
      <p class="provider-name">Seeker: ${req.seeker} ${isOwner ? '<span class="owner-tag">(You)</span>' : ""}</p>
      <p class="skill-desc">${req.description}</p>
      <div class="card-footer">
        <span class="contact-info">Contact: ${req.contact}</span>
      </div>
    `;
    requestsGrid.appendChild(card);
  });
}

// Step 3A: Filter & Sort Skills
function filterAndSortSkills() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const category = document.getElementById("categoryFilter").value;
  const availability = document.getElementById("availabilityFilter").value;
  const sortBy = document.getElementById("sortFilter").value;

  let filtered = getSkills().filter(skill => {
    const matchesSearch =
      skill.title.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query) ||
      skill.provider.toLowerCase().includes(query);
    const matchesCategory = category === "all" || skill.category === category;
    const matchesAvailability = availability === "all" || skill.availability === availability;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  if (sortBy === "az") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderSkills(filtered);
}

// Step 3B: Initialize Browse Page Controls & URL Category Links
function initBrowsePage() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get("category");
  if (urlCategory) {
    document.getElementById("categoryFilter").value = urlCategory;
  }

  function resetAllFilters() {
    searchInput.value = "";
    document.getElementById("categoryFilter").value = "all";
    document.getElementById("availabilityFilter").value = "all";
    document.getElementById("sortFilter").value = "newest";
    filterAndSortSkills();
  }

  searchInput.addEventListener("input", filterAndSortSkills);
  document.getElementById("searchBtn").addEventListener("click", filterAndSortSkills);
  document.getElementById("categoryFilter").addEventListener("change", filterAndSortSkills);
  document.getElementById("availabilityFilter").addEventListener("change", filterAndSortSkills);
  document.getElementById("sortFilter").addEventListener("change", filterAndSortSkills);
  document.getElementById("resetFiltersBtn").addEventListener("click", resetAllFilters);
  document.getElementById("emptyResetBtn").addEventListener("click", resetAllFilters);

  filterAndSortSkills();
  renderRequests();
}

initBrowsePage();

// Step 4A: Form Field Validation Helper
function validateField(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);

  if (!input.value.trim()) {
    input.classList.add("input-error");
    errorEl.textContent = message;
    return false;
  }

  input.classList.remove("input-error");
  errorEl.textContent = "";
  return true;
}

// Step 4B: Handle "Offer a Skill" Form Submission
const offerForm = document.getElementById("offerSkillForm");
if (offerForm) {
  offerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const v1 = validateField("skillTitle", "skillTitleError", "Skill title is required.");
    const v2 = validateField("providerName", "providerNameError", "Your name is required.");
    const v3 = validateField("skillCategory", "skillCategoryError", "Please select a category.");
    const v4 = validateField("skillDescription", "skillDescriptionError", "Description is required.");
    const v5 = validateField("skillAvailability", "skillAvailabilityError", "Please select availability.");
    const v6 = validateField("providerContact", "providerContactError", "Contact info is required.");

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) return;

    const skills = getSkills();
    skills.unshift({
      id: Date.now().toString(),
      ownerId: getUserId(),
      title: document.getElementById("skillTitle").value.trim(),
      provider: document.getElementById("providerName").value.trim(),
      category: document.getElementById("skillCategory").value,
      description: document.getElementById("skillDescription").value.trim(),
      availability: document.getElementById("skillAvailability").value,
      contact: document.getElementById("providerContact").value.trim()
    });

    saveSkills(skills);
    offerForm.reset();
    document.getElementById("offerSuccessMsg").textContent = "Skill profile posted! View it on Browse Skills.";
  });
}

// Step 4C: Handle "I Need Help" Request Form Submission
const requestForm = document.getElementById("requestHelpForm");
if (requestForm) {
  requestForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const r1 = validateField("requestTitle", "requestTitleError", "Request title is required.");
    const r2 = validateField("seekerName", "seekerNameError", "Your name is required.");
    const r3 = validateField("requestCategory", "requestCategoryError", "Please select a category.");
    const r4 = validateField("requestDescription", "requestDescriptionError", "Description is required.");
    const r5 = validateField("seekerContact", "seekerContactError", "Contact info is required.");

    if (!r1 || !r2 || !r3 || !r4 || !r5) return;

    const requests = getRequests();
    requests.unshift({
      id: Date.now().toString(),
      ownerId: getUserId(),
      title: document.getElementById("requestTitle").value.trim(),
      seeker: document.getElementById("seekerName").value.trim(),
      category: document.getElementById("requestCategory").value,
      description: document.getElementById("requestDescription").value.trim(),
      contact: document.getElementById("seekerContact").value.trim()
    });

    saveRequests(requests);
    requestForm.reset();
    document.getElementById("requestSuccessMsg").textContent = "Help request posted! View it on Browse Skills.";
  });
}