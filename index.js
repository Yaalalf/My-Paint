const canvas = document.querySelector("canvas");
const range = document.querySelector("input");
const buttonCuadrado = document.querySelector("button.Cuadrado");
const buttonBorrar = document.querySelector("button.Borrar");
const buttonLinea = document.querySelector("button.Linea");
const buttonGuardar = document.querySelector("a.Guardar");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const ctx = canvas.getContext("2d");

const config = {
    width : range.value, 
    method : "fillRect",
}

ctx.fillStyle = "white";
ctx.strokeStyle = "white";


buttonBorrar.addEventListener("click",(event)=>{
    config.method = "clearRect";
    
})
buttonCuadrado.addEventListener("click",(event)=>{
    config.method = "fillRect";
    ctx.fillStyle = "white";
ctx.strokeStyle = "white";

})
buttonLinea.addEventListener("click",(event)=>{
    config.method = "PathLine";
    ctx.fillStyle = "white";
ctx.strokeStyle = "white";

})

buttonGuardar.addEventListener("click",function (event)
{
    var dt = canvas.toDataURL('image/jpeg');
    console.log(dt);
    this.href = dt;
})

range.addEventListener("change",(event)=>{
    config.width = event.target.value;
});

let isDown = false;
let isLeave = false;

canvas.addEventListener("mousedown",(event)=>{
 
    if(config.method === "PathLine"){
        ctx.beginPath();
        ctx.moveTo(event.pageX, event.pageY);
    }
    else{
        isDown = true;
    }
   
});
canvas.addEventListener("mouseup",(event)=>{
   
    if(config.method === "PathLine"){
    ctx.lineTo(event.pageX, event.pageY);
    ctx.stroke();
    }else{
        isDown = false;
    }
   
 });
 canvas.addEventListener("mouseleave",(event)=>{
    isLeave = false;
 })
 canvas.addEventListener("mouseenter",(event)=>{
    isLeave = true;
 })
canvas,addEventListener("mousemove",(event)=>{
    
    
    if(isDown && isLeave && config.method !== "PathLine"){
        ctx.fillStyle = 'red';
        ctx[config.method](event.pageX-config.width/2, event.pageY - config.width/2, config.width, config.width);
    }
});


canvas.addEventListener("touchstart",(event)=>{
    if(config.method === "PathLine"){
    ctx.beginPath();
    ctx.moveTo(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
    }else{
        isDown = true;
        isLeave = true;
    }
});
canvas.addEventListener("touchend",(event)=>{
    if(config.method === "PathLine"){
    ctx.lineTo(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
    ctx.stroke();
    }else{
        isDown = false;
        isLeave = true;
    }
 });

 canvas,addEventListener("touchmove",(event)=>{
    
    if(isDown && isLeave && config.method !== "PathLine"){
        console.log("Lo hago")
        ctx.fillStyle = 'red';
        ctx[config.method](event.changedTouches[0].pageX-config.width/2,event.changedTouches[0].pageY-config.width/2, config.width, config.width);
    }
});

window.addEventListener("resize",()=>{
    console.log(document.body.clientWidth,document.body.clientHeight)
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
});


console.log("Ya lo hice")