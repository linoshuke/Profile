let db;
let allSkills = [];
let currentFilter = "All";

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function logout() {
  sessionStorage.removeItem("admin_auth");
  window.location.href = "/admin";
}

function openSkillModal(id) {
  document.getElementById("skillModal").classList.add("open");
  const submitBtn = document.getElementById("skillSubmitBtn");
  
  if (id) {
    const s = allSkills.find((x) => x.id === id);
    if (s) {
      document.getElementById("editSkillId").value = id;
      document.getElementById("skillName").value = s.name;
      document.getElementById("skillCategory").value = s.category;
    }
    submitBtn.innerHTML = `
      <!-- Icon Save -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      Update`;
  } else {
    document.getElementById("skillForm").reset();
    document.getElementById("editSkillId").value = "";
    submitBtn.innerHTML = `
      <!-- Icon Plus -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Skill`;
  }
}

function openSkillModalForCategory(c) {
  document.getElementById("skillCategory").value = c;
  openSkillModal();
}

function closeSkillModal() {
  document.getElementById("skillModal").classList.remove("open");
}

function saveSkill() {
  if (!db) return;
  const eid = document.getElementById("editSkillId").value;
  const n = document.getElementById("skillName").value.trim();
  const c = document.getElementById("skillCategory").value;
  
  if (!n) {
    showToast("Name required", "error");
    return;
  }
  
  const data = {
    name: n,
    category: c,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  
  const promise = eid
    ? db.collection("techstack").doc(eid).update(data)
    : db.collection("techstack").add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      
  promise
    .then(() => {
      showToast(eid ? "Updated!" : "Added!");
      closeSkillModal();
      loadSkills();
    })
    .catch((e) => {
      console.error(e);
      showToast("Error saving", "error");
    });
}

function deleteSkill(id) {
  if (!confirm("Are you sure you want to delete this skill?")) return;
  db.collection("techstack")
    .doc(id)
    .delete()
    .then(() => {
      showToast("Deleted");
      loadSkills();
    })
    .catch((e) => {
      console.error(e);
      showToast("Error deleting", "error");
    });
}

function loadSkills() {
  if (!db) return;
  db.collection("techstack")
    .orderBy("createdAt", "asc")
    .get()
    .then((s) => {
      allSkills = [];
      s.forEach((d) => allSkills.push({ id: d.id, ...d.data() }));
      renderSkills();
    })
    .catch((e) => {
      console.error(e);
      document.getElementById("categoryGrid").innerHTML =
        '<div class="col-span-full text-center py-12 text-error">Error loading skills</div>';
    });
}

// Map SVG Graphics for Tech Stack Categories
const categoryIcons = {
  Frontend: `
    <!-- Icon Device/Desktop -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12H3V5.25" />
    </svg>`,
  Backend: `
    <!-- Icon Server/Database Stack -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
    </svg>`,
  Tools: `
    <!-- Icon Wrench/Config Tool -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.83m-1.247-2.902c.796-1.879.324-4.186-1.421-5.83-1.808-1.701-4.577-1.921-6.621-.663L11.25 9.75l-4.5 4.5-3.14-3.14a8.04 8.04 0 0 0-1.662 6.622c1.644 1.745 3.952 2.217 5.83 1.42l6.101-6.101" />
    </svg>`
};

const categoryDescriptions = {
  Frontend: "UI & Client-side",
  Backend: "Server & Database",
  Tools: "DevOps & Utilities"
};

function renderSkills() {
  const grid = document.getElementById("categoryGrid");
  const filtered = currentFilter === "All"
    ? allSkills
    : allSkills.filter((s) => s.category === currentFilter);
    
  const categories = ["Frontend", "Backend", "Tools"];
  let html = "";
  
  for (const cat of categories) {
    if (currentFilter !== "All" && currentFilter !== cat) continue;
    const skills = filtered.filter((s) => s.category === cat);
    
    const tags = skills
      .map((s) => `
        <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container/50 border border-secondary-container rounded-full group hover:bg-secondary-container transition-colors">
          <span class="font-label-sm text-label-sm text-on-secondary-fixed-variant">${esc(s.name)}</span>
          <button onclick="deleteSkill('${s.id}')" class="text-on-secondary-fixed-variant opacity-50 group-hover:opacity-100 hover:text-error transition-opacity flex items-center justify-center">
            <!-- Mini SVG Close -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>`
      )
      .join("");
      
    html += `
      <div class="bg-surface border border-outline-variant rounded-xl p-6 shadow-[0_4px_12px_-4px_rgba(0,0,0,.05)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,.1)] transition-shadow duration-300 flex flex-col">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-surface-variant">
          <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            ${categoryIcons[cat]}
          </div>
          <div>
            <h2 class="font-h3 text-h3 text-on-surface">${cat}</h2>
            <p class="font-label-sm text-label-sm text-outline">${categoryDescriptions[cat]}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          ${tags || '<p class="text-on-surface-variant text-sm italic py-1">No skills added yet</p>'}
          <button 
            class="inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-outline rounded-full text-outline hover:text-primary hover:border-primary transition-colors cursor-pointer" 
            onclick="openSkillModalForCategory('${cat}')"
          >
            <!-- Plus Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span class="font-label-sm text-label-sm font-medium">Add</span>
          </button>
        </div>
      </div>`;
  }
  
  grid.innerHTML = html || '<div class="col-span-full text-center py-12 text-on-surface-variant">No skills match the filter.</div>';
}

function filterByCategory(c) {
  currentFilter = c;
  document.querySelectorAll('[id^="filter"]').forEach((b) => {
    b.className = "px-4 py-2 rounded-lg bg-surface border border-outline-variant text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors";
  });
  const btn = document.getElementById("filter" + c);
  if (btn) btn.className = "px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm";
  renderSkills();
}

function filterSkills() {
  const query = document.getElementById("searchSkill").value.toLowerCase();
  if (!query) {
    renderSkills();
    return;
  }
  
  const grid = document.getElementById("categoryGrid");
  const filtered = allSkills.filter((s) => s.name.toLowerCase().includes(query));
  let html = "";
  
  for (const cat of ["Frontend", "Backend", "Tools"]) {
    const skills = filtered.filter((s) => s.category === cat);
    if (!skills.length) continue;
    
    const tags = skills
      .map((s) => `
        <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container/50 border border-secondary-container rounded-full group hover:bg-secondary-container transition-colors">
          <span class="font-label-sm text-label-sm text-on-secondary-fixed-variant">${esc(s.name)}</span>
          <button onclick="deleteSkill('${s.id}')" class="text-on-secondary-fixed-variant opacity-50 group-hover:opacity-100 hover:text-error transition-opacity flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>`
      )
      .join("");
      
    html += `
      <div class="bg-surface border border-outline-variant rounded-xl p-6 shadow-[0_4px_12px_-4px_rgba(0,0,0,.05)] flex flex-col">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-surface-variant">
          <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            ${categoryIcons[cat]}
          </div>
          <div>
            <h2 class="font-h3 text-h3 text-on-surface">${cat}</h2>
            <p class="font-label-sm text-label-sm text-outline">${categoryDescriptions[cat]}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          ${tags}
        </div>
      </div>`;
  }
  
  grid.innerHTML = html || '<div class="col-span-full text-center py-12 text-on-surface-variant">No skills match your search.</div>';
}

function esc(t) {
  const d = document.createElement("div");
  d.textContent = t;
  return d.innerHTML;
}

// Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("admin_auth") !== "1") {
    window.location.href = "/admin";
    return;
  }
  try {
    db = firebase.firestore();
    loadSkills();
  } catch (e) {
    showToast("Firebase error", "error");
  }
});