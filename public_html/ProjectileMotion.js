
function Projectile(){
    this.initialX;
    this.initialY;
    this.initialZ;
    this.x;
    this.y;
    this.z;
    this.velocity;
    this.mass;
    this.alive = false;
    
    this.projectileVector;
    
    this.distanceVector;
    
    this.currentAngle = 0;//set by calculateDeltaValues
    this.vectorYComponent = 0;
    this.vectorZComponent = 0;
    this.time = 0;

    this.trajectoryPoints = [];
    
    //find collision with ground
    this.collisionTime;
    this.collisionDistance;
    
    this.rebound = true;
    this.reboundDistance = 0;
    
    this.shoot = function(magnitude, direction, x, y, z){
        this.velocity = new Vector(magnitude, direction);
        this.initialX = x;
        this.initialY = y;
        this.initialZ = z;
        this.alive = true;
        this.time = 0;
    };
    
    this.tick = function(timeDelta){
        this.time += timeDelta;
        var groundHeight = 0;
        var freeFallDistance = 9.8 * this.time * this.time / 2;
        this.distanceVector = new Vector(this.velocity.magnitude * this.time, this.velocity.direction);     
        //console.log(this.distanceVector);
        var currentHeight = this.initialY + this.distanceVector.yComponent - freeFallDistance;
        if(currentHeight <= groundHeight){//impact with the ground
            this.hitGround(groundHeight);
        }else{
            this.moveForward(currentHeight);
        }
        this.x = this.initialX;//x is not implemented yet
    };
    
    this.moveForward = function(currentHeight){
        this.z = this.initialZ + this.distanceVector.zComponent;
        this.y = currentHeight;
    };
    
    this.findCollisionWithGround = function(){
        //quadfunction for finding time
        var a = - 9.8 / 2;
        var b = this.velocity.yComponent;
        var c = this.initialY;  
        var quad = new QuadraticFormula(a, b, c);
        this.collisionTime = quad.x1;
        this.collisionDistance = this.velocity.zComponent * this.collisionTime;
        //console.log("collisionTime:" + this.collisionTime + " collisionDistanceZ:" + this.collisionDistance);
    };
    
    this.hitGround = function(groundHeight){
        this.alive = false;
        this.y = groundHeight;
        this.z = this.initialZ + this.distanceVector.zComponent;
        //console.log("accumulated collision time:" + this.time);
        
        if(this.rebound){
            //find collision angle.
            //finding the collision angle from velocities inverse tangent.
            this.findCollisionWithGround();
            var freeFallVelocity = 9.8 * this.collisionTime;//gravitational velocity
            var totalVelocityYComponent = this.velocity.yComponent - freeFallVelocity;
            var currentAngle = radianToAngle(Math.atan(totalVelocityYComponent / this.velocity.zComponent));//tangent angle
            //console.log("proper collision time:" + this.collisionTime + "angle:" + currentAngle);
            var coefficientOfRestitution = 0.5;
            var newVelocity = Math.sqrt(totalVelocityYComponent * totalVelocityYComponent + this.velocity.zComponent * this.velocity.zComponent) * coefficientOfRestitution;
            this.reboundDistance += this.collisionDistance;
            if(newVelocity < 1){
                //console.log("rebound has stopped");
                this.reboundDistance = 0;//initialize rebound distance for next throw
            }else{  
                this.shoot(newVelocity, - currentAngle, 0, 0, this.reboundDistance);
                //console.log("rebound!");
            }
        }
    };
    
    this.calculateDeltaValues = function(timeDelta){
        var freeFallDistanceDelta = 9.8 * this.time * timeDelta;
        var distanceDelta = new Vector(this.velocity.magnitude * timeDelta, this.velocity.direction);
        //console.log(distanceDelta);
        var totalDeltaYComponent = distanceDelta.yComponent - freeFallDistanceDelta;
        var currentAngle = radianToAngle(Math.atan(totalDeltaYComponent / distanceDelta.zComponent));//tangent angle
        this.currentAngle = currentAngle;
        //console.log("y velocity:" + totalDeltaYComponent + " angle:" + currentAngle + " time:" + this.time);
    }; 
    
    this.recordFlightPath = function(){
        this.trajectoryX.push(this.x);
        this.trajectoryY.push(this.y);
        this.trajectoryZ.push(this.z);
    };
    
    this.findTrajectory = function(interval){
        var pointArray = [];
        this.findCollisionWithGround();
        for(var i = 0; i < this.collisionTime; i+= interval){
            var freeFallDistance = 9.8 * i * i / 2;
            var distanceVector = new Vector(this.velocity.magnitude * i, this.velocity.direction);     
            var currentHeight = this.initialY + distanceVector.yComponent - freeFallDistance;
            var point = new Point(distanceVector.zComponent, currentHeight);
            pointArray.push(point);    
        }
        this.trajectoryPoints = pointArray;
    };
    

}
