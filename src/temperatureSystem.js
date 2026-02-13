export class TemperatureSystem{

constructor(map){
this.size=map.grid.length;
this.temps=Array.from({length:this.size},
()=>Array(this.size).fill(20));
}

update(dt,ghostManager){

for(let y=0;y<this.size;y++)
for(let x=0;x<this.size;x++)
this.temps[y][x]+= (20-this.temps[y][x])*dt*.2;

for(const g of ghostManager.ghosts){

const gx=g.x|0;
const gy=g.y|0;

for(let y=-2;y<=2;y++)
for(let x=-2;x<=2;x++){

const tx=gx+x;
const ty=gy+y;

if(this.temps[ty]?.[tx]!=null)
this.temps[ty][tx]-=dt*10;
}
}
}

getTemp(x,y){
return this.temps[Math.floor(y)]?.[Math.floor(x)] ?? 20;
}
}
