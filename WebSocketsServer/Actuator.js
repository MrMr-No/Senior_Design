/*Actuator.js 
* Class to handle position and movement translation from motor rotation
* to linear movement
*/
var Driver = require("./Step_Driver.js");

// motorDriver = new Driver();


var SPM = 128; //Default Steps per millimeter of linear travel
var default_step_pin = 'P8_11';
var default_direction_pin = 'P8_10'; 

//.00625 mm of percision


function Actuator(StepsPerMillimeter, driver_step_pin, driver_direction_pin){

	console.log('driver step pin: ', driver_step_pin);
	console.log('driver_direction_pin', driver_direction_pin);

	this.SPM =  StepsPerMillimeter || SPM;
	this.position = 0; //May add Default if needed 
	// this.step_pin = typeof driver_step_pin !== 'undefined' ? this.step_pin : default_step_pin;
	// this.direction_pin = typeof driver_direction_pin !== 'undefined' ? this.direction_pin : default_direction_pin;
	
	this.step_pin = driver_step_pin || default_step_pin;
	this.direction_pin = driver_direction_pin || default_direction_pin;
	this._motorDriver = new Driver(this.step_pin, this.direction_pin);
	console.log("Motor driver step_pin ", this._motorDriver.step_pin);
	console.log("Motor driver direction_pin ", this._motorDriver.direction_pin);
	
}
// console.log("Actuator Step pin: ", Actuator.step_pin);
// console.log("Actuator Direction Pin: ", Actuator.direction_pin);

// motorDriver = new Driver(Actuator.step_pin, Actuator.direction_pin);
// console.log("motordriver Step pin: ", motorDriver.step_pin);
// console.log("motrdriver Direction Pin: ", motorDriver.direction_pin);

Actuator.prototype.MoveTo = function(cord){ //Argument is absolute cordinate based off position
	//x_cord in millimeters
	distance = (cord - this.position); //negative sign because of direction of steps

	steps = this.SPM * distance;

	//round steps to nearest integer value
	steps = Math.round(steps);
	//actual postion with adjusted step rounding
	actual_distance = steps / this.SPM;

	//move motor steps
	this._motorDriver.step(steps);

	this.position = this.position + actual_distance;
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

