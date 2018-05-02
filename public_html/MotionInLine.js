
function motionInLineExample(scene){
        var object = new PhysicsObject(20, 0, 3, 1);//10m/s, 5kg
        var ground = new Ground(0.5);//coefficient of friction
        var motionInLine = new MotionInLine(object, ground);
        motionInLine.findTimeDisplacement(0.01);
        var continuousLines = [];
        var continuousLine = motionInLine.points;
        continuousLines.push(continuousLine);

        var drawContinuousLines = new DrawContinuousLines(scene, continuousLines);
        drawContinuousLines.draw();
}

function MotionInLine(physicsObject, ground){
    this.physicsObject = physicsObject;
    this.ground = ground;
    
    this.active = true;
    this.gravity = 9.81; 
    this.time = 0;
    
    this.points =[];
    
    this.initialize = function(){
        this.time = 0;
        this.active = true;
    };
    
    this.tick = function(timeDelta){
        this.time += timeDelta;
        var deceleration = this.findDeceleration();
        
        var decelerationVelocity = deceleration * this.time;
        if(this.physicsObject.velocity.magnitude <= decelerationVelocity){//the object has stopped.
            this.active = false;
        }else{
            var decelerationDisplacement = 1/2 * deceleration * this.time * this.time;
            physicsObject.x = this.physicsObject.velocity.magnitude * this.time - decelerationDisplacement;
        }
    };
    
    this.findFinishTime = function(){
        var deceleration = this.findDeceleration();
        var finishTime = this.physicsObject.velocity.magnitude / deceleration;
        console.log(finishTime);
        return finishTime;
    };
    
    this.findDeceleration = function(){
        var normalForce = physicsObject.mass * this.gravity;
        var frictionForce = this.ground.cof * normalForce;
        var deceleration = frictionForce/this.physicsObject.mass;
        return deceleration;
    };
    
    this.findTimeDisplacement = function(interval){
        var points = [];
        var deceleration = this.findDeceleration();
        console.log(deceleration);
        var finishTime = this.findFinishTime();
        for(var i = 0; i < finishTime; i+= interval){
            var decelerationDisplacement = 1/2 * deceleration * i * i;
            var totalDisplacement = this.physicsObject.velocity.magnitude * i - decelerationDisplacement;
            var point = new Point(i, totalDisplacement);
            points.push(point);    
        }
        this.points = points;
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