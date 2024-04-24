const canvas=document.getElementById('canvas');
let ctx = canvas.getContext("2d");

//Obtiene las dimenciones de la pantalla actual 
const window_height=window.innerHeight;
const window_width=window.innerWidth;

canvas.height=window_height;
canvas.width=window_width;
canvas.style.background='#777';

class Circle{
    constructor(x, y, radius, color, text, speed){
        this.posX= x;
        this.posY= y;
        this.radius= radius;
        this.color= color;
        this.text=text;

        this.speed=speed;
        this.dx=1*this.speed;
        this.dy=1*this.speed;
    }

    draw(context){
        context.beginPath();
        context.strokeStyle=this.color;
        context.textAlign = "center";
        context.textBaseLine="middle";
        context.font='18px Arial';
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 6; //para el grosor del circulo 
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
        context.stroke();
        context.closePath();
    }

    update(context){
        //context.clearRect(0,0,window_width, window_height);
        this.draw(context);
        // Si el circulo supera el margen derecho entonces se mueve a la izquierda
        if (this.posX + this.radius > window_width) {
            this.dx = -this.dx;
        }
        if (this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        // Si el circulo supera el margen izquiero entonces se mueve a la derecho
        if (this.posY + this.radius > window_height) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }
    
    
}

    // Aquí comienza el bucle para crear los 10 círculos
let arrayCircle=[];

for(let i=0; i<10; i++){
    let randomX = Math.random() * window_width;//pocision en x
    let randomY = Math.random() * window_height;//posicion en y
    let randomRadius = Math.floor(Math.random() * 100 + 15);//Tamaño
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); //Color aleatorio

    let miCirculo=new Circle(randomX, randomY, randomRadius, randomColor, (i+1), 2);
    //Agrega el objeto al array 
    arrayCircle.push(miCirculo);
    arrayCircle[i].draw(ctx);
}

// Aquí termina el bucle para crear los 10 círculos

// Esta función actualiza los círculos en cada cuadro de animación
let updateCircle = function(){
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    for(let i=0; i<10; i++){
        arrayCircle[i].update(ctx);
    }
};

updateCircle();
