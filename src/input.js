export class Input{

constructor(){
this.keys={};

addEventListener("keydown",e=>this.keys[e.key.toLowerCase()]=true);
addEventListener("keyup",e=>this.keys[e.key.toLowerCase()]=false);
}

down(k){
return this.keys[k];
}
}
