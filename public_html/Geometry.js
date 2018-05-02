/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Rectangle(x, y, z, height, width){                         
    this.x = x;
    this.y = y;
    this.z = z;
    this.height = height;
    this.width = width;
    this.maxX = x + width / 2;
    this.minX = x - width / 2;
    this.maxY = y + height / 2;
    this.minY = y - height / 2;

    this.collision = function(x, y, z){
      if(z === this.z){
          if(z === this.z || x <= this.maxX || x >= this.minX|| y <= this.maxY || y >= this.minY){
              return true;
          }else{
              return false;
          }
      }  
    };
}          
function Sphere(x, y, z, radius){
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.collision = function(x, y, z){
        //not sure but using 3d pythagorean? then check the distance between center and a point is less or equal to radius.
        var deltaX = this.x - x;
        var deltaY = this.y - y;
        var deltaZ = this.z - z;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
        if(distance <= this.radius){
            return true;
        }else{
            return false;
        }
    };
}

function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    
    this.circlesFindLine = function(circle1, circle2){
        var x1 = circle1.x;
        var y1 = circle1.y;
        var r1 = circle1.radius;
        var x2 = circle2.x;
        var y2 = circle2.y;
        var r2 = circle2.radius;

        var slope = (-x1 + x2)/(y1 - y2);
        var yIntercept = (-x1 * x1 + x2 * x2 - y1 * y1 + y2 * y2 + r1 * r1 - r2 * r2) / (-2 * y1 + 2 * y2);
        var commonLine = new Line();
        //console.log("findLineOfTwoCircles: y=" + slope + "x+" + yIntercept);
        commonLine.fromSlopeAndYIntercept(slope, yIntercept);
        return commonLine;
    };
}
function Point(x, y){
    this.x = x;
    this.y = y;
    
    this.pointsFindY = function(distance, x){//2 points relation
        var deltaX = this.x - x;
        var deltaY = Math.sqrt(distance * distance - deltaX * deltaX);
        var y = this.y - deltaY;
        return y;
    };
    this.pointsFindX = function(distance, y){//2 points relation
        var deltaY = this.y - y;
        var deltaX = Math.sqrt(distance * distance - deltaY * deltaY);
        var x = this.x - deltaX;
        return x;
    };
    this.pointsFindDistance = function(x1, y1, x2, y2){
        var deltaX = x2 - x1;
        var deltaY = y2 - y1;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return distance;
    }; 
}
function Line(){//tangent90 is undefined, so I have to do something about it. Detect, prevent.
    this.slope;
    this.yIntercept;
    this.fromTwoPoints = function(x1, y1, x2, y2){
        this.slope = (y2 - y1) / (x2 - x1);
        this.yIntercept = - this.slope * x2 + y2;
        //console.log("y=" + this.slope + "x+" + this.yIntercept);
    };
    this.fromSlopeAndYIntercept = function(slope, yIntercept){
      this.slope = slope;
      this.yIntercept = yIntercept;
    };
    this.fromSlopeAndPoint = function(slope, x, y){
        this.slope = slope;
        this.yIntercept = y - slope * x; 
    };
    this.findX = function(y){
        var x = (y - this.yIntercept) / this.slope;
        return x;
    };
    this.findY = function(x){
        var y = this.slope * x + this.yIntercept;
        return y;
    };
    this.findAngle = function(){
        var angle = radianToAngle(Math.atan(this.slope));
        return angle;
    };
    
    this.linesFindPoint = function(line1, line2){
        var a1 = line1.slope;
        var b1 = line1.yIntercept;
        var a2 = line2.slope;
        var b2 = line2.yIntercept;

        var x = (-b1 + b2) / (a1 -a2);
        var y = a1 * x + b1;
        var point = new Point(x, y);
        return point;
    };
}
