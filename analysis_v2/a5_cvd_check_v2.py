import math, itertools
cols={"wall":(48,106,142),"cella":(68,1,84),"stair":(32,146,140),"shrine":(68,58,131),"axis":(59,187,117)}
lin=lambda c:(c/255)/12.92 if c/255<=0.04045 else (((c/255)+0.055)/1.055)**2.4
srgb=lambda v:255*(12.92*v if v<=0.0031308 else 1.055*v**(1/2.4)-0.055)
clamp=lambda v:max(0,min(1,v))
M={"deuteranopia":[[0.625,0.375,0],[0.700,0.300,0],[0,0.300,0.700]],"protanopia":[[0.567,0.433,0],[0.558,0.442,0],[0,0.242,0.758]]}
def sim(c,m):
    l=[lin(x) for x in c]; o=[clamp(sum(m[i][j]*l[j] for j in range(3))) for i in range(3)]
    return tuple(srgb(v) for v in o)
def lab(c):
    r,g,b=[lin(x) for x in c]
    X=0.4124*r+0.3576*g+0.1805*b;Y=0.2126*r+0.7152*g+0.0722*b;Z=0.0193*r+0.1192*g+0.9505*b
    f=lambda t:t**(1/3) if t>0.008856 else 7.787*t+16/116
    fx,fy,fz=f(X/0.95047),f(Y),f(Z/1.08883)
    return (116*fy-16,500*(fx-fy),200*(fy-fz))
dE=lambda a,b:math.dist(lab(a),lab(b))
def report(name,tr):
    print(name,"L*:",{k:round(lab(tr(v))[0]) for k,v in cols.items()})
    pairs=[(a,b,dE(tr(cols[a]),tr(cols[b]))) for a,b in itertools.combinations(cols,2)]
    m=min(pairs,key=lambda p:p[2]); print("  min pairwise dE76: %.1f (%s vs %s)"%(m[2],m[0],m[1]))
report("normal",lambda c:c)
for n,m in M.items(): report(n,lambda c,m=m:sim(c,m))
g=lambda c:(lambda y:(y,y,y))(srgb(0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2])))
report("grayscale",g)
bg=(245,245,245); Y=lambda c:0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2])
for k,v in cols.items(): print(k,"contrast vs bg %.2f:1"%((max(Y(v),Y(bg))+0.05)/(min(Y(v),Y(bg))+0.05)))
