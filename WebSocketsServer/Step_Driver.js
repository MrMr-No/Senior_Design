//#!/usr/bin/env node
//Based on the the C++ Library: EasyDriver by Derek Malloy
//www.eeng.dcu.ie/~molloyd/
//Copyright Alex Lerikos May 2014
var b = require('bonescript');

var STEP_Pin     = "P9_15";      //Step
var DIR_Pin    = "P9_17";      //Direction
var stepsPerRevolution = 200; //For NEMA 23 motor
var RPM = 30;
b.pinMode(STEP_Pin, b.OUTPUT);
b.pinMode(DIR_Pin, b.OUTPUT);

function Step_Driver(step_pin, direction_pin, 
                     stepsPerRevolution, speedRPM) {
    this.step_pin = typeof step_pin !== 'undefined' ? this.step_pin : STEP_Pin;
    this.direction_pin = typeof direction_pin !== 'undefined' ? this.direction_pin : DIR_Pin;
    this.SPR = typeof stepsPerRevolution !== 'undefined' ? this.SPR : stepsPerRevolution; //SPR = Steps per revolution
    this.RPM = typeof speedRPM !== 'undefined' ? this.RPM : RPM; // set RPM
    this.delay = function(){ //in microseconds
        delayPerSec = (60/this.RPM)/this.SPR;
        return delayPerSec(delayPerSec) * 1000 * 1000; 
        };

}



Step_Driver.prototype.setSpeed = function setSpeed(rpm){
    this.RPM = typeof rpm !== 'undefined' ? this.RPM : rpm;
    delayPerSec = (60/this.RPM)/this.SPR;
    this.delay = delayPerSec(delayPerSec) * 1000 * 1000; //in microseconds
};