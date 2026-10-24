# Hasil yang sudah dijalankan, dinamai menurut nomor tugas
Semua .ppm adalah keluaran langsung kode dosen (raster.mjs, draw_square.mjs, triangle_gap_bug.mjs,
draw_plan.mjs, compare.mjs); .png hanya pratinjau yang diperbesar. Tidak ada pewarnaan ulang.

| Tugas | Berkas | Perintah |
| --- | --- | --- |
| A1 | A1_plan_scratch_outline.ppm/.png, A1_overlay_tracing.png | node draw_plan.mjs --w 600 --h 800 |
| A2 | A2_garis_dan_segitiga_T1.png (garis DDA/Bresenham + T1; dibuat oleh A2_buat_gambar.mjs), A2_line_dda.ppm, A2_line_bresenham.ppm, A2_triangle_T1.ppm, A2_square_outline.ppm, A2_square_fill_topleft.ppm, A2_outline_dan_fill.png, A2_compare_square_vs_ref.txt | node draw_square.mjs --mode outline / fill ; node compare.mjs out/square_fill.ppm ref/square_fill_ref.ppm |
| A3 | A3_square_fill_no_top_left.ppm, A3_square_fill_strict_greater.ppm, A3_square_fill_top_left.ppm, A3_tiga_mode_square_fill.png, A3_gap_coverage_buggy.ppm, A3_gap_fixed.ppm, A3_triangle_gap_bug_output.txt | node draw_square.mjs --mode fill [--no-top-left | --strict-greater] ; node triangle_gap_bug.mjs |
| A4 | A4_plan_scratch_fill.ppm, A4_plan_three.ppm, A4_diff_x6.ppm, A4_viewer_normal.png, A4_compare_scratch_vs_three.txt, A4_bench.txt | draw_plan --fill ; Export PPM dari web ; node compare.mjs ; node bench.mjs --w 600 --h 800 |
| A5 | A5_viewer_normal.png, A5_viewer_deuteranopia.png, A5_viewer_protanopia.png, A5_cvd_check.txt | toggle di web ; python3 analysis_v2/a5_cvd_check_v2.py |
| A6 | A6_npm_test.txt | npm test |

Gambar gabungan untuk laporan: A4_scratch_vs_three_berdampingan.png, A4_zoom_roro_4x.png, A5_normal_vs_deuteranopia.png.
Setiap gambar di laporan (Gambar A1-a ... A5-b) mencantumkan nama berkas di folder ini.
