//#!/usr/bin/env node
//Step_Driver.js
//A Node.js module for driving the easy driver stepper motor 
//Based on the the C++ Library: EasyDriver.h/cpp by Derek Malloy: www.eeng.dcu.ie/~molloyd/
//Copyright Alex Lerikos May 2014
var b = require('bonescript');

var STEP_Pin     = 'P8_11';      //Step
var DIR_Pin    = 'P9_17';      //Direction
var SPR = 200; //For NEMA 23 motor
var RPM = 30;
var delayFactor = 1;
b.pinMode(STEP_Pin, b.OUTPUT);
b.pinMode(DIR_Pin, b.OUTPUT);

// b.digitalWrite(STEP_Pin, b.LOW);
// sleep(10000);
// console.log("Settinghigh");
// b.digitalWrite(STEP_Pin, b.HIGH);
// sleep(10000);


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function Step_Driver(step_pin, direction_pin, 
                     stepsPerRevolution, speedRPM) {
    this.step_pin = typeof step_pin !== 'undefined' ? this.step_pin : STEP_Pin;
    this.direction_pin = typeof direction_pin !== 'undefined' ? this.direction_pin : DIR_Pin;
    this.SPR = typeof stepsPerRevolution !== 'undefined' ? this.SPR : SPR; //SPR = Steps per revolution
    //this.SPR = 200;
    this.RPM = typeof speedRPM !== 'undefined' ? this.RPM : RPM; // set RPM
    this.delay = function(){ //in microseconds should be identical to set speed prototype
        delayPerSec = (60/this.RPM)/this.SPR;
        return (delayPerSec * 1000 * 1000); 
        };
    this.clockwise = true;
    console.log("finished making StepperDriver");
    console.log("Step_pin: "+ this.step_pin);
    console.log("Direction Pin: "+ this.direction_pin)
};

Step_Driver.prototype.setSpeed = function(rpm){
    this.RPM = typeof rpm !== 'undefined' ? this.RPM : rpm;
    delayPerSec = (60/this.RPM)/this.SPR;
    this.delay = delayPerSec * 1000; //in microseconds
};

Step_Driver.prototype.step = function(numberofsteps) {
    var delay  = (60/this.RPM)*1000/this.SPR;
    b.pinMode(STEP_Pin, b.OUTPUT);
    console.log("Step_pin:... "+ this.step_pin);
    console.log("Direction Pin:... "+ this.direction_pin);
    console.log("Number of Steps: "+ numberofsteps)
    //b.pinMode(this.step_pin,b.OUTPUT);
    //b.pinMode(this.direction_pin, b.OUTPUT);
    try{
        b.getPinMode(String(this.step_pin), printPinMux);
    }
    catch(err){
        console.log("error occurerd here");
    }
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
    // delay =  this.delay / delayFactor;
    if (numberofsteps >= 0){
        if (this.clockwise) {
            b.digitalWrite(this.direction_pin, b.LOW);
        }
        else {
            b.digitalWrite(this.direction_pin, b.HIGH);
        };
        //TemporarySolution for timeoout problem
        // b.digitalWrite(this.step_pin, b.LOW);
        // b.digitalWrite(this.step_pin, b.HIGH);
        for(var i = 1; i < numberofsteps; i++){
           //  setTimeout(function(){
           //  console.log("Stepping");
           // // b.pinMode(this.step_pin,b.OUTPUT);
           //  b.digitalWrite(this.step_pin, b.LOW);
           //  b.digitalWrite(this.step_pin, b.HIGH);
           //  },delay); 
            b.digitalWrite(this.step_pin, b.LOW);
            b.digitalWrite(this.step_pin, b.HIGH);
            console.log("Stepping");
            sleep(delay)

        };
    }
    else {//reverse direction number of steps is negative
        if (this.clockwise) {
            b.digitalWrite(this.direction_pin, b.HIGH);
        }
        else {
            b.digitalWrite(this.direction_pin, b.LOW);
        };
        console.log("Reverse Direction stepping: ")
        
        console.log("thisSPR:"+ this.SPR);
        console.log("thisRPM"+ this.RPM);
        console.log("Delay: "+ delay);
        //TemporarySolution for timeoout problem
        // b.digitalWrite(this.step_pin, b.LOW);
        // b.digitalWrite(this.step_pin, b.HIGH);
        console.log("Reverse Direction stepping222: ")
        for(var i = numberofsteps+1; i <= -1; i++){
           //  setTimeout(function(){
           //  console.log("Stepping");
           // // b.pinMode(this.step_pin,b.OUTPUT);
           //  b.digitalWrite(this.step_pin, b.LOW);
           //  b.digitalWrite(this.step_pin, b.HIGH);
           //  },delay); 
            b.digitalWrite(this.step_pin, b.LOW);
            b.digitalWrite(this.step_pin, b.HIGH);
            console.log("Stepping");
            sleep(delay)

        };

    };
    console.log("Finished stepping "+ numberofsteps +" steps");
};

Step_Driver.prototype.rotate = function(degrees){
    degreesPerStep = 360/stepsPerRevolution;
    numberofsteps = degrees/degreesPerStep;
    console.log("Rotate: "+numberofsteps+" for "+ delayFactor + " delayFactor");
    this.step(numberofsteps);
}
// 
var stepper = new Step_Driver();
console.log("stepper.step_pin " +stepper.step_pin);
setTimeout(stepper.step(-200), 1500);






