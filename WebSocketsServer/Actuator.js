/*Actuator.js 
* Class to handle position and movement translation from motor rotation
* to linear movement
* Node module to give convience method wrappers to Step_Driver.js
*/
var Driver = require("./Step_Driver.js");
var b = require('bonescript');

// motorDriver = new Driver();


var SPM = 25; //Default Steps per millimeter of linear travel
var default_step_pin = 'P8_11';
var default_direction_pin = 'P8_10'; 

var default_Zero_pin = 'P8_26'

//.01 mm of percision


function Actuator(StepsPerMillimeter, driver_step_pin, driver_direction_pin, motor_Zero_pin){

	console.log('driver step pin: ', driver_step_pin);
	console.log('driver_direction_pin', driver_direction_pin);

	this.SPM =  StepsPerMillimeter || SPM;
	this.position = 0; //May add Default if needed 
	
	this.step_pin = driver_step_pin || default_step_pin;
	this.direction_pin = driver_direction_pin || default_direction_pin;
	this.Zero_pin = motor_Zero_pin || default_Zero_pin;
	this._motorDriver = new Driver(this.step_pin, this.direction_pin);
	console.log("Motor driver step_pin ", this._motorDriver.step_pin);
	console.log("Motor driver direction_pin ", this._motorDriver.direction_pin);
	
}

Actuator.prototype.MoveTo = function(cord){ //Argument is absolute cordinate based off position
	//x_cord in millimeters
	console.log("Coridnate to travel: ", cord);
	console.log("Current position: ", this.position);

	distance = (cord - this.position); //negative sign because of direction of steps
	console.log("number of actuator steps: ", this.SPM * distance);

	steps = this.SPM * distance;

	//round steps to nearest integer value
	steps = Math.round(steps);
	//actual postion with adjusted step rounding
	actual_distance = steps / this.SPM;

	//move motor steps
	this._motorDriver.step(steps);

	this.position = this.position + actual_distance;
}

Actuator.prototype.MoveDistance = function(distance){

	//distance in millimeters
	console.log("distance to travel: ", distance);
	console.log("Current position: ", this.position);


	steps = this.SPM * distance;

	//round steps to nearest integer value
	steps = Math.round(steps);
	//actual postion with adjusted step rounding
	actual_distance = steps / this.SPM;

	//move motor
	this._motorDriver.step(steps);
	//update position
	this.position = this.position + actual_distance;

}


// Moves actuator to zero position set by limit switch
// Actuator backs off a bit when it hits zero

Actuator.prototype.MoveToZero = function(){// Moves actuator to zero position set by limit switch
	console.log("Trying Zero Function, this.zeropin: ", this.Zero_pin);

	b.pinMode(this.Zero_pin, b.INPUT);
	console.log("Alocated pin");
	var bool_Zero_pin = false;
	var initial_pin_status;
	var current_pin_status;

	initial_pin_status = b.digitalRead(this.Zero_pin);
	console.log("intial pin status: ", initial_pin_status);
	current_pin_status = initial_pin_status;
	

	console.log('b.digitalread Preloop: ', b.digitalRead(this.Zero_pin));

	if(b.digitalRead(this.Zero_pin) != initial_pin_status){

	while(!bool_Zero_pin){

		this._motorDriver.step(-5);
		console.log('b.digitalread Postloop: ', b.digitalRead(this.Zero_pin));

		// current_pin_status = b.digitalRead(this.Zero_pin);
		console.log("current_pin_status: ", current_pin_status);

		if(b.digitalRead(this.Zero_pin) != initial_pin_status){
			console.log("Sthis should bpreak");
			bool_Zero_pin = true;
			break;
		}
	}
	}

	this.position = 0;

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

