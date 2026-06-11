let db;

/**
 * Menampilkan pesan toast di pojok kanan bawah
 * @param {string} message - Pesan yang akan ditampilkan
 * @param {"success" | "error"} type - Tipe notifikasi
 */
function showToast(message, type = "success") {
  const toastElement = document.getElementById("toast");
  if (!toastElement) return;

  toastElement.textContent = message;
  toastElement.className = `toast ${type} show`;

  setTimeout(() => {
    toastElement.classList.remove("show");
  }, 3000);
}

/**
 * Menangani proses logout dan membersihkan session
 */
function logout() {
  sessionStorage.removeItem("admin_auth");
  window.location.href = "/admin";
}

/**
 * Memuat data profil dari Firebase Firestore
 */
function loadProfile() {
  if (!db) return;

  db.collection("admin")
    .doc("profile")
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        
        // Memperbarui form input
        document.getElementById("fullName").value = data.fullName || "";
        document.getElementById("primaryRole").value = data.primaryRole || "";
        document.getElementById("aboutMe").value = data.aboutMe || "";
        
        // Memperbarui visual pratinjau (preview card)
        document.getElementById("previewName").textContent = data.fullName || "Your Name";
        document.getElementById("previewRole").textContent = data.primaryRole || "Your Role";
      }
    })
    .catch((error) => {
      console.error("Gagal memuat profil:", error);
      showToast("Error loading profile", "error");
    });
}

/**
 * Menyimpan data profil baru ke Firebase Firestore
 */
function saveProfile() {
  if (!db) return;

  const data = {
    fullName: document.getElementById("fullName").value,
    primaryRole: document.getElementById("primaryRole").value,
    aboutMe: document.getElementById("aboutMe").value,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  db.collection("admin")
    .doc("profile")
    .set(data, { merge: true })
    .then(() => {
      showToast("Profile saved!");
      
      // Memperbarui visual pratinjau secara real-time
      document.getElementById("previewName").textContent = data.fullName || "Your Name";
      document.getElementById("previewRole").textContent = data.primaryRole || "Your Role";
    })
    .catch((error) => {
      console.error("Gagal menyimpan profil:", error);
      showToast("Error saving profile", "error");
    });
}

// Menjalankan proses inisialisasi ketika DOM siap
document.addEventListener("DOMContentLoaded", () => {
  // Guard clause untuk mengecek sesi login
  if (sessionStorage.getItem("admin_auth") !== "1") {
    window.location.href = "/admin";
    return;
  }

  try {
    // Inisialisasi Firestore setelah SDK siap
    db = firebase.firestore();
    loadProfile();
  } catch (error) {
    showToast("Firebase error: " + error.message, "error");
  }
});