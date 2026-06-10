let db;

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function logout() {
  sessionStorage.removeItem("admin_auth");
  window.location.href = "index.html";
}

function openModal(id) {
  document.getElementById("projectModal").classList.add("open");
  if (id) {
    document.getElementById("modalTitle").textContent = "Edit Project";
    db.collection("projects")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const d = doc.data();
          document.getElementById("editId").value = id;
          document.getElementById("pTitle").value = d.title || "";
          document.getElementById("pShortDesc").value = d.shortDesc || "";
          document.getElementById("pCategory").value = d.category || "Web Application";
          document.getElementById("pTechStack").value = (d.techStack || []).join(", ");
          document.getElementById("pProjectUrl").value = d.projectUrl || "";
          document.getElementById("pRepoUrl").value = d.repoUrl || "";
          document.getElementById("pCaseStudy").value = d.caseStudy || "";
        }
      });
  } else {
    document.getElementById("modalTitle").textContent = "New Project";
    document.getElementById("projectForm").reset();
    document.getElementById("editId").value = "";
  }
}

function closeModal() {
  document.getElementById("projectModal").classList.remove("open");
}

function saveProject() {
  if (!db) return;
  const eid = document.getElementById("editId").value;
  const ts = document.getElementById("pTechStack").value;
  
  const data = {
    title: document.getElementById("pTitle").value,
    shortDesc: document.getElementById("pShortDesc").value,
    category: document.getElementById("pCategory").value,
    techStack: ts ? ts.split(",").map((s) => s.trim()).filter(Boolean) : [],
    projectUrl: document.getElementById("pProjectUrl").value,
    repoUrl: document.getElementById("pRepoUrl").value,
    caseStudy: document.getElementById("pCaseStudy").value,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  if (!data.title) {
    showToast("Title required", "error");
    return;
  }

  const promise = eid
    ? db.collection("projects").doc(eid).update(data)
    : db.collection("projects").add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

  promise
    .then(() => {
      showToast(eid ? "Updated!" : "Created!");
      closeModal();
      loadProjects();
    })
    .catch((e) => {
      console.error(e);
      showToast("Error saving", "error");
    });
}

function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;
  db.collection("projects")
    .doc(id)
    .delete()
    .then(() => {
      showToast("Deleted");
      loadProjects();
    })
    .catch((e) => {
      console.error(e);
      showToast("Error deleting", "error");
    });
}

function loadProjects() {
  if (!db) return;
  const list = document.getElementById("projectList");
  
  list.innerHTML = `
    <div class="col-span-full text-center py-12 text-on-surface-variant flex flex-col items-center justify-center gap-3">
      <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Loading...</span>
    </div>`;

  db.collection("projects")
    .orderBy("createdAt", "desc")
    .get()
    .then((snap) => {
      document.getElementById("projectCount").textContent = `${snap.size} project(s)`;
      if (snap.empty) {
        list.innerHTML = `
          <div class="col-span-full text-center py-16 text-on-surface-variant flex flex-col items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-slate-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
            </svg>
            <p class="font-h3 text-h3 text-slate-700">No projects yet</p>
            <p class="font-body-md text-body-md mt-1">Click "New Project" to get started.</p>
          </div>`;
        return;
      }
      
      let html = "";
      snap.forEach((doc) => {
        const d = doc.data();
        const id = doc.id;
        const techBadges = (d.techStack || [])
          .map((t) => `<span class="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">${esc(t)}</span>`)
          .join("");

        html += `
          <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 ambient-shadow hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,.1)] transition-shadow duration-300 flex flex-col">
            <div class="flex items-start justify-between mb-3">
              <span class="px-2.5 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">${d.category || "General"}</span>
              <div class="flex gap-1">
                <button class="p-1.5 text-slate-400 hover:text-primary rounded transition-colors" onclick="openModal('${id}')">
                  <!-- Icon Edit -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button class="p-1.5 text-slate-400 hover:text-error rounded transition-colors" onclick="deleteProject('${id}')">
                  <!-- Icon Delete -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 class="font-h3 text-h3 text-on-surface mb-2">${esc(d.title || "")}</h3>
            <p class="font-body-md text-body-md text-on-surface-variant mb-4 flex-1">${esc(d.shortDesc || "")}</p>
            <div class="flex flex-wrap gap-1.5 mb-4">${techBadges}</div>
            
            ${(d.projectUrl || d.repoUrl) ? '<div class="flex gap-4 pt-3 border-t border-outline-variant">' : ""}
              ${d.projectUrl ? `
                <a href="${d.projectUrl}" target="_blank" class="text-primary text-sm hover:underline flex items-center gap-1">
                  <!-- Icon Link Out -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Live
                </a>` : ""}
              ${d.repoUrl ? `
                <a href="${d.repoUrl}" target="_blank" class="text-primary text-sm hover:underline flex items-center gap-1">
                  <!-- Icon Code bracket -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                  Repo
                </a>` : ""}
            ${(d.projectUrl || d.repoUrl) ? "</div>" : ""}
          </div>`;
      });
      list.innerHTML = html;
    })
    .catch((e) => {
      console.error(e);
      list.innerHTML = '<div class="col-span-full text-center py-12 text-error">Error loading projects</div>';
    });
}

function esc(t) {
  const d = document.createElement("div");
  d.textContent = t;
  return d.innerHTML;
}

// Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("admin_auth") !== "1") {
    window.location.href = "index.html";
    return;
  }
  try {
    db = firebase.firestore();
    loadProjects();
  } catch (e) {
    showToast("Firebase error", "error");
  }
});