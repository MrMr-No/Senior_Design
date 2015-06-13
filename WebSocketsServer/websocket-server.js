var WebSocketServer = require('ws').Server;
// var analogRead = require('./analogRead');
var b = require('bonescript');
var async = require("async");

// var stepper_motor = require('./Step_Driver.js');
var actuator = require('./Actuator.js');

var Actuator_X = new actuator();
var Actuator_Y = new actuator(25, 'P8_15', 'P8_13', 'P8_18');

console.log('Actuator_X: ', Actuator_X.step_pin);
console.log("Actuator_Y: ", Actuator_Y.step_pin);
// var A_linearPosition = 0;


// Instantiate WebSocket server.
var wss = new WebSocketServer({
    port: 8000
});

//Sleep function for AnalogRead delay

function sleep(clock) { //in milliseconds
  // var start = Date.now();
  for (var i = 0; i < 1e7; i++) {
    if ((Date.now()) >= clock){
      break;
    }
  }
}


// Instantiate bbbPWM object to control PWM device.  Pass in device path
// and the period to the constructor.
//var pwm = new bbbPWM('/sys/devices/ocp.2/pwm_test_P8_13.10/', 5000000);

// Handle connections
wss.on('connection', function(ws) {

    // Send message to client that connection has been made.
    ws.send('Connection Successful');

    // Handle incoming messages.
    ws.on('message', function(message) {

        console.log("Message Received: "+ message);

        // set run to 0.
        if (message == 'servoOff') {
            //pwm.turnOff();
            ws.send('PWM OFF');
            console.log("Turning Servo off!");
        }
        // set run to 1.
        else if (message == 'MakeConnection') {
            //pwm.turnOn();
            ws.send('Connection Made');
            console.log("Connection worked");
            // console.log("Stepping 200 Steps");
            // Stepper_A.step(200);
            console.log("trying anlog");
            // analogRead.AnalogValue();
            // b.analogRead('P9_40',printAIN1(ws))
            b.analogRead('P9_40', function(x) {
                console.log('x.value = ' + x.value* 1.8);
                console.log('x.err = ' + x.err);
                ws.send("Analog Voltage: "+String(1.8 * x.value));

                console.log('Hi');
            });
            
            Actuator_X.MoveToZero();
            Actuator_Y.MoveToZero();


        }
        else if (message.indexOf('ReadAnalog') >= 0 ){

            console.log("in anlog loop");
            var messageType = typeof message;
            console.log("Message: ", message);
            console.log("Message Type: ", messageType);
            
            var x_coordinate= parseFloat(message.split('(')[1].split(',')[0]);
            var y_coordinate= parseFloat(message.split('(')[1].split(',')[1].split(')')[0]);

            // var sampleFloat = parseInt("10");
            //Xcord doesnt work we need to fix this but not now!!!!!!!!!
              // var x_coordinate = -10;
            // console.log("SampleFloat:", sampleFloat);
            console.log("Read X coordinate: ", x_coordinate);
            console.log("Read Y coordinate: ", y_coordinate);

            async.parallel([
                Actuator_X.MoveTo(x_coordinate),
                Actuator_Y.MoveTo(y_coordinate)

                ],function(){
                    console.log("Finished Running Both Motors");
                });

            // Actuator_X.MoveTo(x_coordinate);
            // Actuator_Y.MoveTo(y_coordinate);

            sleep(100);

            b.analogRead('P9_40',function(x){
                    console.log('loopx.value = ' + x.value* 1.8);
                    console.log('loop.err = ' + x.err);
                    // ws.send("ReadAnalog BB Voltage : "+String(1.8 * x.value));
                    ws.send(String(1.8 * x.value));
                    
                });
            console.log("Actuator position: ",Actuator_Y.position);
            console.log("Actuator_X step pin: ", Actuator_X.step_pin);
            console.log("Actuator_Y step pin:", Actuator_Y.step_pin);

            
        }

        else if (message.indexOf('Move_X') >= 0 ){
            console.log("in X loop");

            var messageType = typeof message;
            console.log("Message: ", message);
            console.log("Message Type: ", messageType);

            x_distance = parseFloat(message.split('(')[1].split(')')[0]);

            console.log("X distance: ", x_distance);

            Actuator_X.MoveDistance(x_distance);

            console.log("finished moving X distance, ", x_distance);


        }

        else if (message.indexOf('Move_Y') >= 0 ){
            console.log("in Y loop");

            var messageType = typeof message;
            console.log("Message: ", message);
            console.log("Message Type: ", messageType);

            y_distance = parseFloat(message.split('(')[1].split(')')[0]);

            console.log("Y distance: ", y_distance);

            Actuator_Y.MoveDistance(y_distance);
            console.log("finished moving Y distance, ", y_distance);

        }

        else if (message.indexOf('ReturnAnalog') >= 0 ){

            console.log("Reading and sending Analog")

            b.analogRead('P9_40',function(x){
                    console.log('loopx.value = ' + x.value* 1.8);
                    console.log('loop.err = ' + x.err);
                    // ws.send("ReadAnalog BB Voltage : "+String(1.8 * x.value));
                    ws.send(String(1.8 * x.value));
            });
        }



        else {
            ws.send("Message Received but No Action Taken");
           // pwm.setDuty(message);
        }
    });

    // When connection closes.
    ws.on('close', function() {
        console.log('stopping client interval');
    });
});
