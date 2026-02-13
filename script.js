// ===== BASIC SETUP =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ===== LIGHTING =====
const light = new THREE.PointLight(0xffffff, 1, 50);
light.position.set(0,10,0);
light.castShadow=true;
scene.add(light);

scene.add(new THREE.AmbientLight(0x404040));

// ===== CONTROLS =====
const controls = new THREE.PointerLockControls(camera, document.body);

document.body.addEventListener("click", ()=>{
  controls.lock();
});

scene.add(controls.getObject());

// ===== FLOOR =====
const floorGeo = new THREE.PlaneGeometry(50,50);
const floorMat = new THREE.MeshStandardMaterial({color:0x222222});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x=-Math.PI/2;
floor.receiveShadow=true;
scene.add(floor);

// ===== WALL FUNCTION =====
function createWall(x,z,w,h,d){
  const mesh=new THREE.Mesh(
    new THREE.BoxGeometry(w,h,d),
    new THREE.MeshStandardMaterial({color:0x555555})
  );
  mesh.position.set(x,h/2,z);
  mesh.castShadow=true;
  scene.add(mesh);
}

// ===== HOUSE LAYOUT =====
// outer walls
createWall(0,-25,50,5,1);
createWall(0,25,50,5,1);
createWall(-25,0,1,5,50);
createWall(25,0,1,5,50);

// interior rooms
createWall(0,0,1,5,30);
createWall(10,-5,20,5,1);

// ===== PLAYER START =====
camera.position.y=1.7;

// ===== MOVEMENT =====
const velocity=new THREE.Vector3();
const keys={};

document.addEventListener("keydown",e=>keys[e.code]=true);
document.addEventListener("keyup",e=>keys[e.code]=false);

// ===== GAME STATS =====
let sanity=100;
let temperature=20;
let emfLevel=0;

// ===== GHOST =====
const ghost=new THREE.Mesh(
  new THREE.SphereGeometry(0.5,16,16),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

ghost.position.set(5,1,-5);
scene.add(ghost);

// ghost room temp zone
ghost.roomTemp=Math.random()*10;

// ghost roaming
setInterval(()=>{
  ghost.position.x+=Math.random()*4-2;
  ghost.position.z+=Math.random()*4-2;
},2000);

// ===== SANITY SYSTEM =====
setInterval(()=>{
  sanity-=0.2;
  if(sanity<0) sanity=0;
},1000);

// ===== EMF DETECTION =====
window.addEventListener("keydown",e=>{
  if(e.key==="e"){
    let dist=camera.position.distanceTo(ghost.position);

    if(dist<4){
      emfLevel=5;
    }else{
      emfLevel=Math.floor(Math.random()*2);
    }
  }
});

// ===== TEMPERATURE =====
setInterval(()=>{
  let dist=camera.position.distanceTo(ghost.position);
  temperature=20 - (10/(dist+1));
},1500);

// ===== UI UPDATE =====
function updateUI(){
  document.getElementById("sanity").textContent=Math.floor(sanity);
  document.getElementById("temp").textContent=temperature.toFixed(1);
  document.getElementById("emf").textContent=emfLevel;
}

// ===== GAME LOOP =====
function animate(){
  requestAnimationFrame(animate);

  // movement
  if(controls.isLocked){
    if(keys["KeyW"]) controls.moveForward(0.1);
    if(keys["KeyS"]) controls.moveForward(-0.1);
    if(keys["KeyA"]) controls.moveRight(-0.1);
    if(keys["KeyD"]) controls.moveRight(0.1);
  }

  updateUI();
  renderer.render(scene,camera);
}

animate();

// ===== RESIZE =====
window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
