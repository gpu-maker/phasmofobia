import {FogShader} from "./fogShader.js";

export class Renderer{

constructor(canvas){
this.canvas=canvas;
this.ctx=canvas.getContext("2d");

this.resize();
window.addEventListener("resize",()=>this.resize());

this.fog=new FogShader();
this.time=0;
}

resize(){
this.canvas.width=innerWidth;
this.canvas.height=innerHeight;
}

render(map,player){

const ctx=this.ctx;

ctx.fillStyle="black";
ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

const rays=200;

for(let i=0;i<rays;i++){

const angle=player.dir+(i/rays-.5);
let dist=0;

while(dist<20){
const x=player.x+Math.cos(angle)*dist;
const y=player.y+Math.sin(angle)*dist;

if(map.grid[Math.floor(y)]?.[Math.floor(x)]===1)
break;

dist+=.1;
}

const h=400/dist;

ctx.fillStyle=`rgba(255,255,255,${1-dist/20})`;
ctx.fillRect(i*(this.canvas.width/rays),
this.canvas.height/2-h/2,
this.canvas.width/rays+1,h);
}

this.time+=.01;
this.fog.apply(ctx,this.canvas.width,this.canvas.height,this.time);
}
}
