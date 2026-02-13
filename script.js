import {GameLoop} from "./src/gameLoop.js";
import {Renderer} from "./src/renderer.js";
import {Input} from "./src/input.js";
import {Player} from "./src/player.js";
import {GhostManager} from "./src/ghostAI.js";
import {UI} from "./src/ui.js";
import {EMFDevice} from "./src/emfUI.js";
import {ThermometerUI} from "./src/thermometerUI.js";
import {TemperatureSystem} from "./src/temperatureSystem.js";
import {ProceduralHouse} from "./src/proceduralHouse.js";

const canvas=document.getElementById("game");

const renderer=new Renderer(canvas);
const input=new Input();
const ui=new UI();

const map=ProceduralHouse.generate();
const player=new Player(map.spawn);
const ghosts=new GhostManager(map);

const temperature=new TemperatureSystem(map);
const emf=new EMFDevice();
const thermometer=new ThermometerUI();

const game=new GameLoop(dt=>{

player.update(dt,input,map);
ghosts.update(dt,player,map);
temperature.update(dt,ghosts);

const ghost=ghosts.ghosts[0];
const dist=Math.hypot(player.x-ghost.x,player.y-ghost.y);

emf.update(dist);
thermometer.update(temperature.getTemp(player.x,player.y));

renderer.render(map,player);
ui.update(player);

});

game.start();
