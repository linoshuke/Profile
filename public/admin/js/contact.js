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

function loadContact() {
  if (!db) return;
  db.collection("admin")
    .doc("contact")
    .get()
    .then((doc) => {
      if (doc.exists) {
        const d = doc.data();
        document.getElementById("email").value = d.email || "";
        document.getElementById("linkedin").value = d.linkedin || "";
        document.getElementById("github").value = d.github || "";
        document.getElementById("twitter").value = d.twitter || "";
        updatePreview(d);
      }
    })
    .catch((e) => {
      console.error(e);
      showToast("Error loading", "error");
    });
}

function updatePreview(d) {
  document.getElementById("previewEmailText").textContent = d.email || "your@email.com";
  document.getElementById("previewEmail").href = d.email ? "mailto:" + d.email : "#";
  document.getElementById("previewLinkedin").href = d.linkedin || "#";
  document.getElementById("previewGithub").href = d.github || "#";
  document.getElementById("previewTwitter").href = d.twitter || "#";
}

function saveContact() {
  if (!db) return;
  const data = {
    email: document.getElementById("email").value,
    linkedin: document.getElementById("linkedin").value,
    github: document.getElementById("github").value,
    twitter: document.getElementById("twitter").value,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  db.collection("admin")
    .doc("contact")
    .set(data, { merge: true })
    .then(() => {
      showToast("Contact saved!");
      updatePreview(data);
    })
    .catch((e) => {
      console.error(e);
      showToast("Error saving", "error");
    });
}

// Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("admin_auth") !== "1") {
    window.location.href = "index.html";
    return;
  }
  try {
    db = firebase.firestore();
    loadContact();
  } catch (e) {
    showToast("Firebase error", "error");
  }
});