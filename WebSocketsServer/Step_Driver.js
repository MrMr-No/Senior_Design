//Step_Driver.js
//A Node.js module for driving the easy driver stepper motor 
//Based on the the C++ Library: EasyDriver.h/cpp by Derek Malloy: www.eeng.dcu.ie/~molloyd/
//Copyright Alex Lerikos May 2014
//Warning 
var b = require('bonescript');

var STEP_Pin     = 'P8_11';      //Step
var DIR_Pin    = 'P8_10';      //Direction
var SPR = 200; //For NEMA 23 motor
var RPM = 150; // Do not use above 75!!!!!!!! (Recommended!!!!!!!) 
var delayFactor = 1;


// b.digitalWrite(STEP_Pin,b.LOW);
// sleep(500);

// b.digitalWrite(DIR_Pin, b.LOW);
// sleep(10000);
// console.log("Settinghigh");
// b.digitalWrite(DIR_Pin, b.HIGH);
// sleep(10000);


function sleep(clock) { //in milliseconds
  // var start = Date.now();
  for (var i = 0; i < 1e7; i++) {
    if ((Date.now()) >= clock){
      break;
    }
  }
}

function Step_Driver(step_pin, direction_pin, 
                     stepsPerRevolution, speedRPM) {
    // this.step_pin = typeof step_pin !== 'undefined' ? this.step_pin : STEP_Pin;
    // this.direction_pin = typeof direction_pin !== 'undefined' ? this.direction_pin : DIR_Pin;
    // this.SPR = typeof stepsPerRevolution !== 'undefined' ? this.SPR : SPR; //SPR = Steps per revolution
    
    // this.RPM = typeof speedRPM !== 'undefined' ? this.RPM : RPM; // set RPM

    this.step_pin = step_pin || STEP_Pin;
    this.direction_pin = direction_pin || DIR_Pin;
    this.SPR = stepsPerRevolution || SPR; //SPR = Steps per revolution
    this.RPM = speedRPM || RPM; // set RPM

    b.pinMode(this.step_pin, b.OUTPUT);
    b.pinMode(this.direction_pin, b.OUTPUT);

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
    var clock = Date.now();
  
    // console.log("Step_pin:... "+ this.step_pin);
    // console.log("Direction Pin:... "+ this.direction_pin);
    console.log("Number of Steps: "+ numberofsteps)
    
    // try{
    //      b.getPinMode(String(this.step_pin), printPinMux);
    // }
    // catch(err){
    //     console.log("error occurerd here");
    // }
    // function printPinMux(x){
    //         console.log('mux = ' + x.mux);
    // console.log('pullup = ' + x.pullup);
    // console.log('slew = ' + x.slew);
    // if(x.options) 
    //     console.log('options = ' + 
    //         x.options.join(','));
    // console.log('pin = ' + x.pin);
    // console.log('name = ' + x.name);
    // console.log('err = ' + x.err);
    // };

    // console.log("Stepping "+ numberofsteps+ ' steps');
    // delay =  this.delay / delayFactor;
    if (numberofsteps >= 0){
        if (this.clockwise) {
            b.digitalWrite(this.direction_pin, b.LOW);
        }
        else {
            b.digitalWrite(this.direction_pin, b.HIGH);
        };

        for(var i = 0; i < numberofsteps; i++){

            b.digitalWrite(this.step_pin, b.LOW);
            // sleep(10); //Get rid of this in both cases after 
            b.digitalWrite(this.step_pin, b.HIGH);
            time = Date.now()
            console.log("Stepping: "+ i+ " Time: "+ time);

            sleep(clock)
            clock = Date.now() + delay; 



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
        
        // console.log("thisSPR:"+ this.SPR);
        // console.log("thisRPM"+ this.RPM);
        // console.log("Delay: "+ delay);

        // console.log("Reverse Direction stepping222: ")
        for(var i = numberofsteps; i <= -1; i++){

            b.digitalWrite(this.step_pin, b.LOW);
            // sleep(10); // Get rid of this 
            b.digitalWrite(this.step_pin, b.HIGH);
            console.log("Stepping: "+ i);
            sleep(clock)//3 is because magic
            clock = Date.now() + delay; 

        };

    };
    console.log("Finished stepping "+ numberofsteps +" steps");

};

Step_Driver.prototype.rotate = function(degrees){
    degreesPerStep = 360/this.SPR;
    numberofsteps = degrees/degreesPerStep;
    console.log("Rotate: "+numberofsteps+" for "+ delayFactor + " delayFactor");
    this.step(numberofsteps);
}

//Export Constructor module

module.exports = Step_Driver;

// Testing
// var stepper = new Step_Driver();
// console.log("stepper.step_pin " +stepper.step_pin);
// setTimeout(stepper.rotate(-1080), 100);
// setTimeout(stepper.rotate(1080),10000);







