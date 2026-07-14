# PatuhCioks — Sustainable Streetwear Atelier Platform

> **"Lahir dari Jalanan. Ditempa dengan Tangan. Grounded pada Bumi."**

PatuhCioks adalah platform digital interaktif berkelas *high-end/atelier* yang dirancang untuk memperkenalkan lini sneaker berkelanjutan premium pertama di Indonesia. Melalui gabungan estetika industrial brutalist, skema warna *Cosmic Slate* kontras tinggi, dan animasi transisi sinematik kompleks berbasis **Framer Motion (`motion/react`)**, platform ini menyajikan pengalaman eksplorasi produk yang mendalam dan teatrikal.

---

## 🎨 Visual Identity & Core Aesthetics

Aplikasi ini didesain dari nol dengan fokus ekstrem pada detail visual (*craftsmanship*), menghindari elemen standar bawaan (*cookie-cutter layouts*) demi menciptakan atmosfer premium:

1. **Cosmic Slate Theme**: Latar belakang ultra-dark `#0c0d10` dipadukan dengan aksen emas atelier `#a68a5d`, hijau lumut organik `#4a5d4e`, serta putih gading premium `#e2dfd2`.
2. **Cinematic Overlay**: Efek scanline CRT mikro dan grain retro-futuristik menyelimuti seluruh platform untuk memberikan tekstur analog yang organik.
3. **Typographical Rhythm**: Perpaduan dinamis antara heading sans-serif geometris, detail teknis monospaced bergaya *Brutalist HUD* (`JetBrains Mono`), serta visual negatif space yang lapang.

---

## ⚡ Fitur Utama & Interaktivitas Sinematik

### 1. Global Scroll Telemetry HUD Bar
* **Deskripsi**: Panel navigasi atas statis yang berfungsi sebagai layar monitor metrik real-time.
* **Interaktivitas**: Mengukur persentase kedalaman scroll halaman secara presisi (`000%` - `100%`) dengan bar indikator linear yang meluncur mulus mengikuti pergerakan jari atau roda mouse pengguna.

### 2. Kinetic Interactive HUD Cursor
* **Deskripsi**: Kursor kustom berbasis fisika spring-damper (tersembunyi secara otomatis pada layar sentuh/smartphone).
* **Interaktivitas**: 
  - Terdiri dari titik fokus pusat dan ring bidik luar yang mengikuti kursor dengan efek lag inersia yang anggun.
  - Ring kursor akan melebar, berputar 90 derajat, dan memancarkan efek magnetik ketika melintasi elemen interaktif (tombol, link, kartu).
  - Dilengkapi label koordinat real-time `X` dan `Y` mini bergaya militer taktis.

### 3. Hero Cinematic Opening
* **Deskripsi**: Gerbang pembuka berenergi tinggi dengan transisi halus dan tata letak minimalis yang memukau.

### 4. Brand Story & 3D Laser-Scan Manifesto
* **Deskripsi**: Bagian narasi filosofi berdirinya PatuhCioks di Jakarta.
* **Interaktivitas**: 
  - Kartu visual dibekali sistem **3D Mouse Tilt** (berputar dinamis mengikuti arah sudut pandang kursor).
  - Garis laser pemindai inframerah hologram membedah detail poster, memproyeksikan koordinat fungsional dan data spek bahan baku secara interaktif.

### 5. Signature Collection & Interactive Blueprint Modal
* **Deskripsi**: Katalog tiga pilar siluet utama: **RE-STREET** (Phantom), **RE-LUXURY** (Desert Clay), dan **RE-EARTH** (Moss).
* **Interaktivitas**:
  - Filter interaktif dengan perpindahan animasi transisi layout yang responsif.
  - Spotlight bersinar redup di bawah kursor saat melintasi kartu produk.
  - Menekan kartu memicu pembukaan jendela **Blueprint Spesifikasi** masif yang memproyeksikan diagram mekanis melingkar, titik koordinat material fungsional, analisis jejak karbon (KG CO₂), serta rincian tekstur bahan baku.

### 6. Pohon Sirkularitas Material (Interactive Supply-Chain Network)
* **Deskripsi**: Skema alur rantai pasok material melingkar dari limbah mentah urban hingga produk jadi di kaki konsumen.
* **Interaktivitas**:
  - Diagram jaringan interaktif berbasis SVG dinamis dengan garis penghubung yang mengalirkan impuls listrik bercahaya.
  - Memilih lingkaran node memicu rotasi ring target HUD eksternal dan memproyeksikan lembar data telemetri labmetrik mutakhir di kolom informasi sisi kanan.

### 7. Circular Sustainability Profile & Hotspot Detection
* **Deskripsi**: Dasbor pembuktian komitmen ESG (Environmental, Social, and Governance) yang transparan.
* **Interaktivitas**:
  - Dilengkapi counter angka presisi tinggi yang melompat naik secara dinamis begitu pengguna scroll ke area ini.
  - Tiga indikator lingkaran sirkular (*radial progress gauges*) mengukur kadar daur ulang secara visual.
  - Dilengkapi hotspot interaktif pada model sepatu untuk membedah titik detail material kritis secara langsung.

### 8. Testimonial Persona Profiles
* **Deskripsi**: Kurasi testimonial dari figur-figur berpengaruh dalam pergerakan budaya urban Indonesia.
* **Interaktivitas**: Kartu melayang adaptif dengan efek pegas spring sensitif dan avatar monogram inisial minimalis.

---

## 🛠️ Tech Stack & Dependencies

Platform ini dikembangkan dengan teknologi mutakhir untuk memastikan kestabilan performa dan transisi sehalus mentega:
- **Core Library**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Animation Engine**: [Framer Motion (`motion/react`)](https://motion.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Jalankan Project Secara Lokal

### Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (Versi 18 ke atas disarankan) dan pengelola paket `npm` atau `bun`.

### Langkah-Langkah

1. **Instalasi Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Server Pengembangan (Dev Mode)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

3. **Kompilasi Produksi (Production Build)**:
   ```bash
   npm run build
   ```
   Langkah ini akan menghasilkan file statis yang siap dideploy di direktori `/dist`.

---

## 📝 Lisensi & Hak Cipta
Dirancang dan dikembangkan dengan dedikasi penuh di Jakarta, Indonesia. Hak cipta milik tim pengembang PatuhCioks.
