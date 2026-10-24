import { Framebuffer, lineBresenham } from "/tmp/claude-0/-home-claude/f8cadb7e-2057-5edb-8c8e-badc6e6fdba7/scratchpad/final2/raster.mjs";
import { loadPlan, makeWorldToScreen } from "/tmp/claude-0/-home-claude/f8cadb7e-2057-5edb-8c8e-badc6e6fdba7/scratchpad/final2/plan.mjs";
const a=Framebuffer.readPPM("out/plan_scratch_fill.ppm"), b=Framebuffer.readPPM("plan_three.ppm");
const plan=loadPlan("myplan.json"), w2s=makeWorldToScreen(plan,800);
const segs=[];for(const pl of plan.polylines){const p=pl.points.map(w2s);for(let i=0;i+1<p.length;i++)segs.push([p[i],p[i+1],pl.id]);if(pl.closed)segs.push([p[p.length-1],p[0],pl.id]);}
const line=new Uint8Array(600*800);let diagPix=0,axisPix=0;const isDiag=new Uint8Array(600*800);
for(const [A,B] of segs){const diag=A[0]!==B[0]&&A[1]!==B[1];for(const [x,y] of lineBresenham(...A,...B)){line[y*600+x]=1;if(diag)isDiag[y*600+x]=1;}}
let L=0,D=0;for(let i=0;i<line.length;i++){L+=line[i];D+=isDiag[i];}
let diff=0,onDiag=0,onAxisLine=0,near=0,far=0;
const near1=(x,y,arr)=>{for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy;if(xx>=0&&yy>=0&&xx<600&&yy<800&&arr[yy*600+xx])return true}return false};
for(let y=0;y<800;y++)for(let x=0;x<600;x++){const i=(y*600+x)*3;const m=Math.max(Math.abs(a.data[i]-b.data[i]),Math.abs(a.data[i+1]-b.data[i+1]),Math.abs(a.data[i+2]-b.data[i+2]));if(!m)continue;diff++;
 if(near1(x,y,isDiag))onDiag++;else if(near1(x,y,line))onAxisLine++;else far++;}
console.log({totalPixels:480000,differing:diff,bresenhamLinePixels:L,diagonalSegmentPixels:D,diffNearDiagonalSeg:onDiag,diffNearAxisAlignedSegOnly:onAxisLine,diffFarFromAnyLine:far});
// fill interior check: count pixels inside silhouette (platform) not on a line that differ
let inner=0;for(let y=1102;y<=1240;y++){}
const pf=plan.silhouette.points.map(w2s);const xs=pf.map(p=>p[0]),ys=pf.map(p=>p[1]);
let fillDiff=0,fillTotal=0;for(let y=Math.min(...ys)+2;y<=Math.max(...ys)-2;y++)for(let x=Math.min(...xs)+2;x<=Math.max(...xs)-2;x++){if(near1(x,y,line))continue;fillTotal++;const i=(y*600+x)*3;if(a.data[i]!==b.data[i]||a.data[i+1]!==b.data[i+1]||a.data[i+2]!==b.data[i+2])fillDiff++;}
console.log("silhouette interior (excluding pixels next to lines): compared",fillTotal,"differing",fillDiff);
console.log("silhouette screen bbox",Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys));
