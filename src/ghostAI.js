export class GhostManager{

constructor(map){
this.ghosts=[{x:5,y:5}];
}

update(dt,player){

for(const g of this.ghosts){

if(player.sanity<40){
g.x+=Math.sign(player.x-g.x)*dt*2;
g.y+=Math.sign(player.y-g.y)*dt*2;
}else{
g.x+=Math.random()-.5;
g.y+=Math.random()-.5;
}
}
}
}
