//#!/usr/bin/env node
//Based on the the C++ Library: EasyDriver by Derek Malloy
//www.eeng.dcu.ie/~molloyd/
//Copyright Alex Lerikos May 2014
var b = require('bonescript');

var STEP_Pin     = "P8_15";      //Step
var DIR_Pin    = "P8_17";      //Direction
var stepsPerRevolution = 200; //For NEMA 23 motor
var RPM = 30;
var delayFactor = 1;
b.pinMode(STEP_Pin, b.OUTPUT);
b.pinMode(DIR_Pin, b.OUTPUT);

function Step_Driver(step_pin, direction_pin, 
                     stepsPerRevolution, speedRPM) {
    this.step_pin = typeof step_pin !== 'undefined' ? this.step_pin : STEP_Pin;
    this.direction_pin = typeof direction_pin !== 'undefined' ? this.direction_pin : DIR_Pin;
    this.SPR = typeof stepsPerRevolution !== 'undefined' ? this.SPR : stepsPerRevolution; //SPR = Steps per revolution
    this.RPM = typeof speedRPM !== 'undefined' ? this.RPM : RPM; // set RPM
    this.delay = function(){ //in microseconds should be identical to set speed prototype
        delayPerSec = (60/this.RPM)/this.SPR;
        return delayPerSec(delayPerSec) * 1000 * 1000; 
        };
    this.clockwise = true;
    console.log("finished making StepperDriver");
    console.log("Step_pin: "+ this.step_pin);
    console.log("Direction Pin: "+ this.direction_pin)
};

Step_Driver.prototype.setSpeed = function setSpeed(rpm){
    this.RPM = typeof rpm !== 'undefined' ? this.RPM : rpm;
    delayPerSec = (60/this.RPM)/this.SPR;
    this.delay = delayPerSec(delayPerSec) * 1000 * 1000; //in microseconds
};

Step_Driver.prototype.step = function(numberofsteps) {
    console.log("Step_pin:... "+ this.step_pin);
    console.log("Direction Pin:... "+ this.direction_pin);
    b.pinMode(this.step_pin,b.OUTPUT);
    b.pinMode(this.direction_pin, b.OUTPUT);
    b.getPinMode(String(this.step_pin), printPinMux);
    function printPinMux(x){
            console.log('mux = ' + x.mux);
    console.log('pullup = ' + x.pullup);
    console.log('slew = ' + x.slew);
    if(x.options) 
        console.log('options = ' + 
            x.options.join(','));
    console.log('pin = ' + x.pin);
    console.log('name = ' + x.name);
    console.log('err = ' + x.err);
    };

    console.log("Stepping "+ numberofsteps+ ' steps');
    delay =  this.delay / delayFactor;
    if (numberofsteps >= 0){
        if (this.clockwise) {
            b.digitalWrite(this.direction_pin, b.LOW);
        }
        else {
            b.digitalWrite(this.direction_pin, b.HIGH);
        };
        //TemporarySolution for timeoout problem
        b.digitalWrite(this.step_pin, b.LOW);
        b.digitalWrite(this.step_pin, b.HIGH);
        for(var i = 1; i < numberofsteps; i++){
            setTimeout(function(){
            b.pinMode(this.step_pin,b.OUTPUT);
            b.digitalWrite(this.step_pin, b.LOW);
            b.digitalWrite(this.step_pin, b.HIGH);
            },delay/1000); 
        };
    }
    else {//reverse direction number of steps is negative
        if (this.clockwise) {
            b.digitalWrite(this.direction_pin, b.HIGH);
        }
        else {
            b.digitalWrite(this.direction_pin, b.LOW);
        };
        //TemporarySolution for timeoout problem
        b.digitalWrite(this.step_pin, b.LOW);
        b.digitalWrite(this.step_pin, b.HIGH);
        for(var i = numberofsteps; i >= -1; i++){
            setTimeout(function(){
            b.pinMode(this.step_pin,b.OUTPUT);
            b.digitalWrite(this.step_pin, b.LOW);
            b.digitalWrite(this.step_pin, b.HIGH);
            },delay/1000); 
        };

    };
    console.log("Finished stepping "+ numberofsteps +" steps");
};

var stepper = new Step_Driver();
console.log("stepper.step_pin " +stepper.step_pin);
setTimeout(stepper.step(5), 2000);