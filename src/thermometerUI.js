import {AssetFactory} from "./assetFactory.js";

export class ThermometerUI{

constructor(){
this.canvas=document.getElementById("thermoCanvas");
this.ctx=this.canvas.getContext("2d");
this.frame=AssetFactory.thermometer();
}

update(temp){

const ctx=this.ctx;
ctx.clearRect(0,0,220,120);

ctx.drawImage(this.frame,0,0);

ctx.fillStyle="cyan";
ctx.font="26px Arial";
ctx.fillText(temp.toFixed(1)+"°C",70,80);

if(temp<5){
ctx.fillStyle="red";
ctx.fillText("FREEZING",60,110);
}
}
}
