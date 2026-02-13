import {AssetFactory} from "./assetFactory.js";

export class FogShader{

constructor(){
this.noise=AssetFactory.fog();
}

apply(ctx,w,h,t){

ctx.globalAlpha=.06;

for(let i=0;i<20;i++){
ctx.drawImage(this.noise,
Math.sin(t+i)*200,
Math.cos(t+i)*200,
w,h);
}

ctx.globalAlpha=1;
}
}
