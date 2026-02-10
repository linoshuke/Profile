Struktur folder adalah kontrak mutlak.

Aturan utama:

Tidak ada file di luar folder yang ditentukan.

Tidak ada komponen besar di satu folder tanpa pemisahan.

Tidak ada data di dalam file UI.

Struktur wajib:
src
components
sections
shared
data
hooks
styles

Definisi:

sections berisi komponen section halaman.

shared berisi komponen reusable lintas section.

data hanya berisi konten statis.

hooks hanya logic reusable.

styles hanya CSS global dan animasi.

AI dilarang:

Membuat folder baru tanpa instruksi eksplisit.

Menaruh data di JSX.

Menaruh logic berat di components UI.