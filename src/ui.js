export class UI{

constructor(){
this.sanity=document.getElementById("sanity");
this.battery=document.getElementById("battery");
}

update(player){
this.sanity.textContent="Sanity "+player.sanity.toFixed(0);
this.battery.textContent="Battery "+player.battery.toFixed(0);
}
}
