export class AssetFactory{

static makeTexture(drawFn,w=256,h=256){
const c=document.createElement("canvas");
c.width=w;
c.height=h;
const ctx=c.getContext("2d");
drawFn(ctx,w,h);

const img=new Image();
img.src=c.toDataURL();
return img;
}

static fog(){
return this.makeTexture((ctx,w,h)=>{
const img=ctx.createImageData(w,h);
for(let i=0;i<img.data.length;i+=4){
const v=Math.random()*255;
img.data[i]=img.data[i+1]=img.data[i+2]=v;
img.data[i+3]=255;
}
ctx.putImageData(img,0,0);
});
}

static emfFrame(){
return this.makeTexture(ctx=>{
ctx.fillStyle="#111";
ctx.fillRect(0,0,220,120);
ctx.strokeStyle="#0f0";
ctx.strokeRect(5,5,210,110);
},220,120);
}

static emfBar(){
return this.makeTexture(ctx=>{
ctx.fillStyle="lime";
ctx.fillRect(0,0,20,30);
},20,30);
}

static thermometer(){
return this.makeTexture(ctx=>{
ctx.fillStyle="#111";
ctx.fillRect(0,0,220,120);
ctx.fillStyle="cyan";
ctx.font="30px Arial";
ctx.fillText("TEMP",70,50);
},220,120);
}

// ---------- AUDIO ----------

static beep(ctx,freq=800,dur=.1){
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.frequency.value=freq;
gain.gain.value=.2;
osc.connect(gain);
gain.connect(ctx.destination);
osc.start();
osc.stop(ctx.currentTime+dur);
}

static ghostVoice(ctx){
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type="sawtooth";
osc.frequency.value=80;
gain.gain.value=.05;
osc.connect(gain);
gain.connect(ctx.destination);
osc.start();
osc.stop(ctx.currentTime+1);
}

static ambient(ctx){
const buffer=ctx.createBuffer(1,44100,44100);
const data=buffer.getChannelData(0);
for(let i=0;i<data.length;i++)
data[i]=(Math.random()*2-1)*.02;

const src=ctx.createBufferSource();
src.buffer=buffer;
src.loop=true;
src.connect(ctx.destination);
src.start();
}
}
