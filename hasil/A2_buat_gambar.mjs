// A2: garis (2,1)->(9,5) dengan lineDDA dan lineBresenham, dan segitiga T1 sendirian (aturan top-left).
// Jalankan dari folder proyek:  node hasil/A2_buat_gambar.mjs
import { Framebuffer, lineDDA, lineBresenham, triangle } from "../raster.mjs";
const W = 12, H = 12;
for (const [name, fn] of [["dda", lineDDA], ["bresenham", lineBresenham]]) {
  const fb = new Framebuffer(W, H);
  const px = fn(2, 1, 9, 5, fb, [255, 255, 255]);
  console.log(name, px.length, JSON.stringify(px));
  fb.writePPM(`hasil/A2_line_${name}.ppm`);
}
const fb = new Framebuffer(W, H);
triangle(fb, [2, 2], [8, 2], [8, 8], [230, 120, 40], { topLeft: true });
fb.writePPM("hasil/A2_triangle_T1.ppm");
