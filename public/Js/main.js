document.addEventListener('DOMContentLoaded', function() {

    // --- 1. PENGATURAN MENU MOBILE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Menutup menu mobile jika link di klik
    const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
    for (let link of mobileMenuLinks) {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // --- 2. EFEK SCROLL REVEAL SEDERHANA ---
    // Fungsi ini akan menambahkan class 'visible' pada elemen yang memiliki class 'reveal' saat masuk ke viewport
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah elemen terlihat
            }
        });
    }, { threshold: 0.1 }); // Muncul saat 10% elemen terlihat

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- 3. VALIDASI FORM KONTAK ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form untuk submit secara default

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            showMessage('Semua kolom wajib diisi!', 'error');
            return;
        }

        // Jika validasi berhasil (di sini kita hanya menampilkan pesan sukses)
        // Nantinya Anda bisa integrasikan ini dengan layanan seperti Formspree, Netlify Forms, atau fungsi backend.
        showMessage('Pesan Anda berhasil terkirim! Terima kasih.', 'success');
        contactForm.reset();
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'mb-4 text-center p-2 rounded-lg'; // Reset class
        
        if (type === 'success') {
            formMessage.classList.add('bg-green-100', 'text-green-800');
        } else {
            formMessage.classList.add('bg-red-100', 'text-red-800');
        }

        formMessage.classList.remove('hidden');

        setTimeout(() => {
           formMessage.classList.add('hidden');
        }, 4000); // Sembunyikan pesan setelah 4 detik
    }
});