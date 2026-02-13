import {AssetFactory} from "./assetFactory.js";

export class EMFDevice{

constructor(){
this.canvas=document.getElementById("emfCanvas");
this.ctx=this.canvas.getContext("2d");

this.frame=AssetFactory.emfFrame();
this.bar=AssetFactory.emfBar();

this.audioCtx=new AudioContext();
this.level=0;
}

update(dist){

const newLevel=Math.max(0,5-Math.floor(dist));

if(newLevel>this.level)
AssetFactory.beep(this.audioCtx);

this.level=newLevel;
this.draw();
}

draw(){
const ctx=this.ctx;
ctx.clearRect(0,0,220,120);

ctx.drawImage(this.frame,0,0);
for(let i=0;i<this.level;i++)
ctx.drawImage(this.bar,20+i*30,70);
}
}
