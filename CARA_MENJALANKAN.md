# Cara menjalankan Modul 2 (laptop sendiri)

Prasyarat: Node.js 18+ (cek: `node -v`) dan koneksi internet untuk `npm install` dan CDN three.js.

## Urutan (di folder proyek)
1. `npm install`
2. `npm test`  -> harus "ALL CHECKS PASSED (12 ok, 0 fail)"  (A2, A3, tes pipeline)
3. `node draw_square.mjs --mode fill`  -> out/square_fill.ppm (Lab 2)
4. `node triangle_gap_bug.mjs`  -> bukti seam / aturan top-left (A3)
5. `node draw_plan.mjs --w 600 --h 800 --fill --out out/plan_scratch_fill.ppm`  (A1, A4)
6. `node draw_plan.mjs --w 600 --h 800`  -> out/plan_scratch.ppm (tanpa siluet)
7. `npx serve web`  -> buka alamat yang tampil, klik "Export PPM", simpan sebagai plan_three.ppm di folder proyek
   (centang "Fill silhouette" lebih dulu agar sama dengan langkah 5)
8. `node compare.mjs out/plan_scratch_fill.ppm plan_three.ppm`  -> % identik, PSNR, SSIM (A4)
9. `node bench.mjs --w 600 --h 800`  -> forward vs backward (A4). Tulis prediksi SEBELUM menjalankan.
10. Toggle deuteranopia / protanopia di halaman web, screenshot (A5)
11. `python3 analysis_v2/a5_cvd_check_v2.py`  -> L*, dE, kontras (A5)

Angka di laporan berasal dari sandbox cloud: waktu (ms) dan PSNR di laptop Anda akan berbeda sedikit.
Hitungan pixel (A2, A3) deterministik. Pakai angka dari laptop Anda sendiri.

## File yang diubah dari kode dosen
- myplan.json (BARU, + salinan web/myplan.json): denah Prambanan, 23 polyline.
- plan.mjs: warna CATEGORY_RGB, warna isi siluet, latar dari plan.background.
- draw_plan.mjs: default plan = myplan.json.
- bench.mjs: argumen --plan, default myplan.json.
- web/viewer.mjs: W/H 600x800, latar terang, DoubleSide (siluet tidak ter-cull), +0.5 pada titik garis
  (setengah pixel), PLAN_URL = "myplan.json", label legenda dari plan.legend.
- web/index.html: canvas 600x800, latar terang.
- package.json: skrip plan 600x800.
- tests.mjs: 2 tes tambahan (myplan muat di kanvas, asterisk 24 spoke).

## Jawaban singkat bila ditanya dosen
- Mengapa siluet tidak tampil di viewer bawaan? Kamera ortografik y-down membalik winding segitiga,
  sehingga back-face culling membuangnya. Perbaikan: side: THREE.DoubleSide.
- Mengapa garis meleset? raster.mjs memakai pixel (x,y) berpusat (x+0.5,y+0.5); Three.js memakai koordinat
  kontinu, jadi garis jatuh di sudut pixel. Perbaikan: tambah 0.5.
- Mengapa top-left rule? Pixel tepat di edge bersama harus dimiliki satu segitiga saja
  (tanpa aturan: 6 pixel dobel atau 6 celah; dengan aturan: 36 sekali, 0 dobel, 0 celah).
- Mengapa forward dipilih? Biaya forward mengikuti panjang garis, backward = pixel x segmen
  (480.000 x 88 = 42 juta uji jarak). Berbalik hanya pada zoom ~1000x.
- Batas palet: wall vs shrine hanya dE 7,7 pada deuteranopia; axis hanya kontras 2,25:1 pada latar terang.
