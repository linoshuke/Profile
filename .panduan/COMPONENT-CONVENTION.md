Standar penulisan komponen React.

Aturan umum:

Hanya functional component.

Gunakan arrow function.

Satu file satu component utama.

Naming:

PascalCase untuk component.

camelCase untuk props dan function.

Struktur wajib:
import
constant
hooks
handler
return JSX

Batasan:

Maksimal 120 baris per file.

Maksimal 1 useEffect per file kecuali sangat perlu.

Tidak ada anonymous function di JSX.

AI wajib:

Memecah komponen jika terlalu panjang.

Menjelaskan alasan jika memakai memo atau callback.