// transformation matrix
var A =[];
var B =[];
// input matrix array(vector)
var input = [];
// input matrix array(sqr)
var sqrA=[0,0];
var sqrB=[0,0];
//constant id
const WidthDisplay= document.getElementById("width_display");
const HeightDisplay= document.getElementById("height_display");
const frame = document.getElementById("map");
const contxt= frame.getContext("2d");
//input matrix
const LInp= document.getElementById("LineInput");
const SInp= document.getElementById("SquareInput");
//result matrix
const Lr= document.getElementById("LineResult");
const Sr= document.getElementById("SqrResult");
//transform matrix
const LT= document.getElementById("lineTransform");
const ST= document.getElementById("sqrTransform");

//get location
frame.onmousemove = GetLocation;
        function GetLocation(){
            let Xpos = event.clientX;
            let Ypos = event.clientY;
            let loc = document.getElementById("loc");
            loc.innerHTML= "("+Xpos+", "+Ypos+")";

            GetTlocation(Xpos,Ypos);
        }
        function GetTlocation(Xpos,Ypos){
        
            let Tloc = document.getElementById("Tloc");
            let Tx=0;
            let Ty=0;
            if (Xpos>725){
                Tx=Xpos-725;
            }
            if (Xpos<725){
               Tx=725-Xpos;
            }
              if (Ypos>323){
                Ty=Ypos-323;
            }
            if (Ypos<323){
                Ty=323-Ypos;
            }
            
            Tloc.innerHTML = "("+Tx+", "+Ty+")";
        }

//initialize drawings 
function SingleVector(){
     contxt.clearRect(0,0,300,150);
    LInp.style.display="flex";
    SInp.style.display="none";

    Lr.style.display="flex";
    Sr.style.display="none";

    LT.style.display="flex";
    ST.style.display="none";
}
function Square(){
     contxt.clearRect(0,0,300,150);
    LInp.style.display="none";
    SInp.style.display="flex";

    Lr.style.display="none";
    Sr.style.display="flex";

    LT.style.display="none";
    ST.style.display="flex";
}

//draw canvas
        function linedraw(rx,ry,col){
             var x=(150/36)*rx+150;
            var y=150 -((75/32)*ry+75);
             contxt.beginPath();
            contxt.moveTo(150,75);
            contxt.lineTo(x,y);
            contxt.strokeStyle= col;
            contxt.lineWidth =1;
            contxt.stroke();
        }
        function drawRect(w,h,col){
            var x= (150/36)*w;
            var y= -(75/32)*h;
        //contxt.beginPath();
        contxt.fillStyle=col;
        contxt.fillRect(150, 75, x, y);
        //contxt.stroke();
        }
        function drawpolygon(sq1,sq2,sq3,sq4,col){
            contxt.clearRect(0,0,300,150);
            contxt.beginPath();
            const points = [
                {x:150, y:75},
                {x:(150/36)*sq1+150, y: 150 -((75/32)*sq2+75)},
                {x:(150/36)*(sq1+sq3)+150, y:150 -((75/32)*(sq2+sq4)+75)},
                {x:((150/36)*sq3+150), y: 150 -((75/32)*sq4+75)}
            ]
            contxt.moveTo(points[0].x, points[0].y);
            for(let i=1;i<4;i++){
                contxt.lineTo(points[i].x, points[i].y);
            }
            contxt.closePath();
            contxt.stroke();
            contxt.fillStyle=col;
            contxt.fill();
        }
        function getMatrix(){
            A[0]= document.getElementById("a1").value;
            A[1]= document.getElementById("a2").value;
            B[0]= document.getElementById("b1").value;
            B[1]= document.getElementById("b2").value;
        } 

//map inputs to canvas/array
        function IntBox(){
            contxt.clearRect(0,0,300,150);
            var rx= document.getElementById("v1").value;
            var ry= document.getElementById("v2").value;
            linedraw(rx,ry,"black");

            input[0]=rx;
            input[1]=ry;
         }
        function IntSqr(){
            contxt.clearRect(0,0,300,150);
            var w= document.getElementById("sq1").value;
            var h= document.getElementById("sq2").value;
            drawRect(w,h,"black");

            sqrA[0]=w;
            sqrB[1]=h;
        }

//get t(x)
    //transform vector        
          function transformLine(vector){
            getMatrix();
            let v1=0;
            let v2=0;
            v1 = (vector[0]*A[0])+(vector[1]*A[1]);
            v2 = (vector[0]*B[0])+(vector[1]*B[1]);
            /*
            for(let i=0; i < 2; i++){
               v1 = v1+ vector[i]*Ax[i];
               v2= v2+vector[i]*Bx[i];
            }*/
            document.getElementById("T(v1)").innerHTML= v1;
            document.getElementById("T(v2)").innerHTML= v2;
            linedraw(v1,v2,"red");
         }
    //transform sqr     
          function transformSqr(sqr1,sqr2){
            getMatrix();
            let sq1=0;
            let sq2=0;

            let sq3=0;
            let sq4=0;

            sq1 = (sqr1[0]*A[0])+(sqr1[1]*A[1]);
            sq2 = (sqr1[0]*B[0])+(sqr1[1]*B[1]);

            sq3 = (sqr2[0]*A[0])+(sqr2[1]*A[1]);
            sq4 = (sqr2[0]*B[0])+(sqr2[1]*B[1]);
            /*
            for(let i=0; i < 2; i++){
               v1 = v1+ vector[i]*Ax[i];
               v2= v2+vector[i]*Bx[i];
            }*/
            document.getElementById("T(sq1)").innerHTML= sq1;
            document.getElementById("T(sq2)").innerHTML= sq2;
            document.getElementById("T(sq3)").innerHTML= sq3;
            document.getElementById("T(sq4)").innerHTML= sq4;

            drawpolygon(sq1,sq2,sq3,sq4,"red");
         }
