//#!/usr/bin/env node
var b = require('bonescript');

var STEP_Pin     = "P9_15";      //Step
var DIR_Pin    = "P9_17";      //Direction

var motor_driver 

b.pinMode(STEP_Pin, b.OUTPUT);
b.pinMode(DIR_Pin, b.OUTPUT);



stopMotors = false;
// Runs motor in the set direction
function move() {

   b.digitalWrite(STEP_Pin, b.HIGH, function() {
        setTimeout(function(){}, 1000);
        b.digitalWrite(STEP_Pin, b.LOW, function(){
            setTimeout(function (){},1000);
            if(!stopMotors){
                move();
            }
        });
   });

}
function stopMotor() {
    stopMotors = true;
}
// Changing direction of motor
function left() {
    stopMotors = false;

    b.digitalWrite(DIR_Pin, b.HIGH, function(){
        move();
    }); 

}
// Changing direction of motor
function right() {
  stopMotors = false;

    b.digitalWrite(DIR_Pin, b.LOW, function(){
        move();
    });

}

// For testing Porposes
right();
