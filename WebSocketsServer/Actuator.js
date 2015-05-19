/*Actuator.js 
* Class to handle position and movement translation from motor rotation
* to linear movement
*/
var Driver = require("./Step_Driver.js");

motorDriver = new Driver();


var SPM = 160; //Default Steps per millimeter of linear travel

//.00625 mm of percision


function Actuator(StepsPerMillimeter){

	this.SPM = typeof StepsPerMillimeter !== 'undefined' ? this.SPM : SPM;
	this.position = 0; //May add Default if needed 

}


Actuator.prototype.MoveTo = function(x_cord){ //Argument is absolute cordinate based off position
	//x_cord in millimeters
	distance = (x_cord - this.position); //negative sign because of direction of steps

	steps = this.SPM * distance;

	//round steps to nearest integer value
	steps = Math.round(steps);
	//actual postion with adjusted step rounding
	actual_position = steps / this.SPM; 

	//move motor steps
	motorDriver.step(steps);

	this.position = Math.abs(actual_position);
}


//Export Constructor module

module.exports = Actuator;


// Test

// var actuator = new Actuator();
// actuator.MoveTo(10);
// console.log("Actuator Position: ", actuator.position);
// setTimeout(function(){
// 	actuator.MoveTo(5);
// 	console.log("Actuator Position: ",actuator.position);
// },1000);
// // console.log("Actuator Position: ",actuator.position);

