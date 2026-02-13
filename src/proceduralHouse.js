export class ProceduralHouse{

static generate(size=20){

const grid=Array.from({length:size},
()=>Array(size).fill(1));

for(let i=0;i<8;i++){

const x=2+Math.random()*(size-6)|0;
const y=2+Math.random()*(size-6)|0;

for(let iy=y;iy<y+4;iy++)
for(let ix=x;ix<x+4;ix++)
grid[iy][ix]=0;
}

return{
spawn:{x:2,y:2},
grid
};
}
}
