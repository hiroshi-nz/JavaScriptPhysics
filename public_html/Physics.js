/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Vector(magnitude, direction){
    this.magnitude = magnitude;
    this.direction = keepWithin360(direction);
    this.zComponent = magnitude * Math.cos(angleToRadian(direction));
    this.yComponent = magnitude * Math.sin(angleToRadian(direction));
    
    this.calculateComponents = function(){
        this.zComponent = this.magnitude * Math.cos(angleToRadian(this.direction));
        this.yComponent = this.magnitude * Math.sin(angleToRadian(this.direction));
    };
    
    this.update = function(magnitude, direction){
        this.magnitude = magnitude;
        this.direction = keepWithin360(direction);
        this.calculateComponents();
    };  
    this.updateMagnitude = function(magnitude){
        this.magnitude = magnitude;
        this.calculateComponents();
        
    };
    this.updateDirection = function(direction){
        this.direction = keepWithin360(direction);
        this.calculateComponents();
    };
}

function Vector2(magnitude, direction){
    this.magnitude = magnitude;
    this.direction = keepWithin360(direction);
    this.xComponent = magnitude * Math.cos(angleToRadian(direction));
    this.zComponent = magnitude * Math.sin(angleToRadian(direction));
    
    this.calculateComponents = function(){
        this.xComponent = this.magnitude * Math.cos(angleToRadian(this.direction));
        this.zComponent = this.magnitude * Math.sin(angleToRadian(this.direction));
    };
    
    this.update = function(magnitude, direction){
        this.magnitude = magnitude;
        this.direction = keepWithin360(direction);
        this.calculateComponents();
    };  
    this.updateMagnitude = function(magnitude){
        this.magnitude = magnitude;
        this.calculateComponents();
        
    };
    this.updateDirection = function(direction){
        this.direction = keepWithin360(direction);
        this.calculateComponents();
    };
}

function QuadraticFormula(a, b, c){
    this.x1;//this one is larger
    this.x2;//this one is smaller
    
    this.calculate = function(a, b, c){
      var squareRoot = Math.sqrt(b * b - 4 * a * c);
      var numerator = - b - squareRoot;
      var numerator2 = -b + squareRoot;
      var denominator = 2 * a;
      
      var firstSolution = numerator /denominator;
      var secondSolution = numerator2 /denominator;
      
      if(firstSolution > secondSolution){
          this.x1 = firstSolution;
          this.x2 = secondSolution;
      }else{
          this.x2 = firstSolution;
          this.x1 = secondSolution;
      }
      //console.log(this.x1 + ":" + this.x2);
    };
    this.calculate(a, b, c);
}

function impulseExperiment(){
    var im = new ImpulseAndMomentum();
    
    var object1 = new PhysicsObject(5, 0, 2);//5m/s 0deg 2kg
    var object2 = new PhysicsObject(3, 180, 3);//3m/s 180 deg 3kg
    
    im.physicsObject.push(object1);
    im.physicsObject.push(object2);
    im.tick(); 
    //console.log("velocity:" + object1.velocity.magnitude + " mass:" + object1.mass + " velocity:" + object2.velocity.magnitude + " mass:" + object2.mass);
    
}

function ImpulseAndMomentum(){
    this.physicsObject = [];
    
    this.tick = function(){
        var m1 = this.physicsObject[0].mass;
        var m2 = this.physicsObject[1].mass;

        var v1 = this.physicsObject[0].velocity.magnitude;
        var v2 = this.physicsObject[1].velocity.magnitude;

        var v4 = (m1 * v1 + m2 * v2 + m1 * (v1 - v2)) / (m1 + m2);
        var v3 = -(v1 - v2) + v4;

        console.log("velocity:" + v3 + " velocity:" + v4);
    };
}

function VectorXY(magnitude, direction){
    this.magnitude = magnitude;
    this.direction = keepWithin360(direction);
    this.xComponent = magnitude * Math.cos(angleToRadian(direction));
    this.yComponent = magnitude * Math.sin(angleToRadian(direction));
    
    this.calculateComponents = function(){
        this.xComponent = this.magnitude * Math.cos(angleToRadian(this.direction));
        this.yComponent = this.magnitude * Math.sin(angleToRadian(this.direction));
    };
    
    this.update = function(magnitude, direction){
        this.magnitude = magnitude;
        this.direction = keepWithin360(direction);
        this.calculateComponents();
    };  
    this.updateMagnitude = function(magnitude){
        this.magnitude = magnitude;
        this.calculateComponents();
        
    };
    this.updateDirection = function(direction){
        this.direction = keepWithin360(direction);
        this.calculateComponents();
    };
}


function PhysicsObject(magnitude, direction, mass, id){
    this.velocity;
    this.mass = mass;
    this.id = id;
    
    this.x;
    this.y;
    this.z;
    
    this.initialize = function(magnitude, direction){
        this.velocity = new Vector(magnitude, direction);
    };
    this.initialize(magnitude, direction);
}

function Ground(coefficientOfFriction){
    this.cof = coefficientOfFriction;//coefficient of friction
}



function findZ(direction, magnitude){
    return magnitude * Math.cos(angleToRadian(direction));
}                       
function findY(direction, magnitude){
    return magnitude * Math.sin(angleToRadian(direction));
}                       
function angleToRadian(angle){
    return angle * Math.PI/ 180;
}   
function radianToAngle(radian){
    return radian *  180 / Math.PI % 360;
} 


function roundWithFactor(value, factor){

    return Math.round(value * factor)/factor;
}
function keepWithin360(angle){
    if(angle >= 360){//changing bikeDir within 360 deg
        angle = angle % 360;
    }
    if(angle <= -360){
        angle = angle % 360;
    }
    return angle;
}