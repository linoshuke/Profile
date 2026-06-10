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
  setTimeout(() => toastElement.classList.remove("show"), 3000);
}

/**
 * Menangani fungsi otentikasi login admin
 * @param {Event} e - Event form submit
 */
async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById("loginBtn");
  const pw = document.getElementById("password").value.trim();
  if (!pw) return;

  btn.disabled = true;
  // Mengganti icon dengan SVG loader animasi native Tailwind
  btn.innerHTML = `
    <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Verifying...</span>`;

  try {
    // Memastikan modul SDK Firebase siap sebelum memanggil API database
    await new Promise((resolve) => {
      const check = () => {
        if (typeof firebase !== "undefined" && firebase.apps.length > 0) resolve();
        else setTimeout(check, 200);
      };
      check();
    });

    const db = firebase.firestore();
    const doc = await db.collection("admin").doc("auth").get();

    if (doc.exists && doc.data().password) {
      if (pw === doc.data().password) {
        sessionStorage.setItem("admin_auth", "1");
        showToast("Access granted!");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 500);
      } else {
        showToast("Wrong password", "error");
        resetButton(btn);
      }
    } else {
      // Setup Pertama kali — Menyimpan password baru otomatis ke Firestore
      await db.collection("admin").doc("auth").set({ password: pw });
      sessionStorage.setItem("admin_auth", "1");
      showToast("Password saved! Redirecting...");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    }
  } catch (err) {
    console.error("Authentication Error:", err);
    showToast("Error: " + err.message, "error");
    resetButton(btn);
  }
}

/**
 * Mengembalikan tampilan tombol sign-in ke kondisi normal
 * @param {HTMLElement} btn - Element button login
 */
function resetButton(btn) {
  btn.disabled = false;
  btn.innerHTML = "<span>Sign In</span>";
}

// Inisialisasi Event Listener setelah DOM ter-load
document.addEventListener("DOMContentLoaded", () => {
  // Jika admin sudah login sebelumnya, langsung arahkan ke Dashboard
  if (sessionStorage.getItem("admin_auth") === "1") {
    window.location.href = "dashboard.html";
    return;
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});