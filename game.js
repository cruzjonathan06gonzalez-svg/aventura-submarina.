(()=>{
"use strict";
const canvas=document.querySelector("#game"),ctx=canvas.getContext("2d");
const $=id=>document.getElementById(id);
const screen=$("screen"),scoreEl=$("score"),heartsEl=$("hearts");
let state="title",tick=0,camera=0,score=0,hearts=3,keys={};
const worldWidth=2200;
const platforms=[
{x:0,y:385,w:530},{x:600,y:335,w:190},{x:860,y:290,w:180},
{x:1110,y:350,w:210},{x:1390,y:300,w:190},{x:1650,y:350,w:170},{x:1900,y:385,w:300}
];
let player,pearls,enemies;
function reset(){
 score=0;hearts=3;camera=0;
 player={x:55,y:325,vx:0,vy:0,w:34,h:48,onGround:false,inv:0};
 pearls=[{x:220,y:345},{x:280,y:345},{x:665,y:295},{x:730,y:295},{x:920,y:250},{x:980,y:250},{x:1160,y:310},{x:1240,y:310},{x:1450,y:260},{x:1515,y:260},{x:1710,y:310},{x:1990,y:345},{x:2070,y:345}].map(p=>({...p,taken:false}));
 enemies=[{x:440,y:355,min:390,max:500,v:1.3},{x:1020,y:260,min:880,max:1040,v:1.5},{x:1570,y:270,min:1410,max:1600,v:1.4},{x:1840,y:355,min:1830,max:1900,v:1.2}];
 scoreEl.textContent=score;heartsEl.textContent=hearts;
}
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
function draw(){
 const g=ctx.createLinearGradient(0,0,0,450);g.addColorStop(0,"#087ca8");g.addColorStop(1,"#033858");ctx.fillStyle=g;ctx.fillRect(0,0,800,450);
 // distant light rays and bubbles
 for(let i=0;i<8;i++){ctx.fillStyle="#a5f4ff12";ctx.beginPath();ctx.moveTo(i*120-(camera*.12%120),0);ctx.lineTo(i*120+35-(camera*.12%120),0);ctx.lineTo(i*120+145-(camera*.12%120),320);ctx.lineTo(i*120+100-(camera*.12%120),320);ctx.fill()}
 for(let i=0;i<28;i++){let x=(i*113-tick*.45)%820;if(x<0)x+=820;let y=(i*61+Math.sin(tick*.025+i)*18)%440;ctx.strokeStyle="#c5f8ff66";ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,3+i%4,0,Math.PI*2);ctx.stroke()}
 ctx.save();ctx.translate(-camera,0);
 // seaweed and coral
 for(let x=20;x<worldWidth;x+=145){rect(x,365,8,60,"#188b78");rect(x-10,380,8,35,"#27ad8c");rect(x+10,390,8,28,"#27ad8c");rect(x+20,390,18,12,"#e67c9c")}
 // platforms
 platforms.forEach(p=>{rect(p.x,p.y,p.w,65,"#865b43");rect(p.x,p.y,p.w,9,"#48c58a");for(let x=p.x+12;x<p.x+p.w-8;x+=30)rect(x,p.y+20,7,5,"#bd8960")});
 // pearls
 pearls.forEach(p=>{if(!p.taken){ctx.fillStyle="#fff1aa";ctx.beginPath();ctx.arc(p.x,p.y+Math.sin(tick*.09+p.x)*3,9,0,Math.PI*2);ctx.fill();rect(p.x-4,p.y-5,3,3,"#fff") }});
 // little fish enemies
 enemies.forEach(e=>{rect(e.x-15,e.y-8,28,17,"#f28a49");rect(e.x-24,e.y-13,10,25,"#ffc16d");rect(e.x+5,e.y-5,4,4,"#fff");rect(e.x+7,e.y-4,2,2,"#142d49")});
 // finish chest
 rect(2110,340,48,42,"#b56c2c");rect(2106,336,56,12,"#e9bd55");rect(2127,350,10,12,"#fff0a3");
 // original diver character
 const p=player;if(p.inv%10<6){rect(p.x+7,p.y,22,8,"#e64c54");rect(p.x+12,p.y-5,14,7,"#e64c54");rect(p.x+10,p.y+8,18,15,"#e9b98e");rect(p.x+8,p.y+11,22,10,"#74e4f0");rect(p.x+27,p.y+15,5,5,"#172d4d");rect(p.x+5,p.y+24,28,18,"#f0c83e");rect(p.x+2,p.y+27,7,12,"#e64c54");rect(p.x+30,p.y+27,7,12,"#e64c54");rect(p.x+5,p.y+41,12,7,"#253c6b");rect(p.x+21,p.y+41,12,7,"#253c6b")}
 ctx.restore();
 // HUD hint
 ctx.fillStyle="#e8fbff";ctx.font="bold 14px system-ui";ctx.fillText("ARRECIFE AZUL",16,25);
}
function show(title,message,button){$("screenTitle").textContent=title;$("screenText").textContent=message;$("play").textContent=button;screen.classList.remove("hidden")}
function start(){reset();state="play";screen.classList.add("hidden");loop()}
function hurt(){if(player.inv>0)return;hearts--;heartsEl.textContent=hearts;if(hearts<=0){state="over";show("¡A seguir intentando!","Juntaste "+score+" perlas. Probá otra vez y llegá al cofre.","REINTENTAR")}else{player.x=Math.max(camera+20,player.x-80);player.y=270;player.vy=-3;player.inv=100}}
function update(){
 tick++;let p=player;p.vx=(keys.right?3.2:0)-(keys.left?3.2:0);p.x=Math.max(0,Math.min(worldWidth-p.w,p.x+p.vx));
 p.vy=Math.min(10,p.vy+.48);let oldY=p.y;p.y+=p.vy;p.onGround=false;
 platforms.forEach(a=>{if(p.x+p.w>a.x&&p.x<a.x+a.w&&oldY+p.h<=a.y+4&&p.y+p.h>=a.y&&p.vy>=0){p.y=a.y-p.h;p.vy=0;p.onGround=true}});
 if(keys.jump&&p.onGround){p.vy=-11;p.onGround=false}
 pearls.forEach(o=>{if(!o.taken&&Math.abs(p.x+17-o.x)<25&&Math.abs(p.y+24-o.y)<27){o.taken=true;score++;scoreEl.textContent=score}});
 enemies.forEach(e=>{e.x+=e.v;if(e.x<e.min||e.x>e.max)e.v*=-1;if(p.inv===0&&p.x+p.w>e.x-17&&p.x<e.x+17&&p.y+p.h>e.y-10&&p.y<e.y+10)hurt()});
 if(p.y>480)hurt();p.inv=Math.max(0,p.inv-1);camera=Math.max(0,Math.min(worldWidth-800,p.x-270));
 if(p.x>2100){state="won";show("¡TESORO ENCONTRADO!","¡Ganaste el Mundo 1! Juntaste "+score+" perlas. ¡Muy bien!","JUGAR DE NUEVO")}
}
function loop(){if(state!=="play")return;update();draw();if(state==="play")requestAnimationFrame(loop);else draw()}
function bind(id,key){const b=$(id);const down=e=>{e.preventDefault();keys[key]=true};const up=e=>{e.preventDefault();keys[key]=false};b.addEventListener("pointerdown",down);["pointerup","pointercancel","pointerleave"].forEach(ev=>b.addEventListener(ev,up))}
bind("left","left");bind("right","right");bind("jump","jump");
window.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp"," "].includes(e.key))e.preventDefault();if(e.key==="ArrowLeft")keys.left=true;if(e.key==="ArrowRight")keys.right=true;if(e.key==="ArrowUp"||e.key===" ")keys.jump=true});
window.addEventListener("keyup",e=>{if(e.key==="ArrowLeft")keys.left=false;if(e.key==="ArrowRight")keys.right=false;if(e.key==="ArrowUp"||e.key===" ")keys.jump=false});
$("play").addEventListener("click",start);draw();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
})();