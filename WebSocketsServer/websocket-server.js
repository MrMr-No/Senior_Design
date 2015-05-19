var WebSocketServer = require('ws').Server;
// var analogRead = require('./analogRead');
var b = require('bonescript');
// var stepper_motor = require('./Step_Driver.js');
var actuator = require('./Actuator.js');

 var Actuator_A = new actuator();
// var A_linearPosition = 0;



// Instantiate WebSocket server.
var wss = new WebSocketServer({
    port: 8000
});

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
        }
        else if (message.indexOf('ReadAnalog') >= 0 ){

            console.log("in anlog loop");
            var messageType = typeof message
            console.log("Message: ", message);
            console.log("Message Type: ", messageType);
            //var num_samples = parseInt(message); 
            //var x_cordinate = parseInt((message),10);
            //Xcord doesnt work we need to fix this but not now!!!!!!!!!
            var x_cordinate = 10
            console.log("Read X cordinate: ", x_cordinate);

            Actuator_A.MoveTo(x_cordinate);

            b.analogRead('P9_40',function(x){
                    console.log('loopx.value = ' + x.value* 1.8);
                    console.log('loop.err = ' + x.err);
                    ws.send("ReadAnalog BB Voltage : "+String(1.8 * x.value));
                    
                });
            
        }
            // while(analogVal == undefined){
// 
// 
            // }
            // console.log("analogVal: "+analogVal);
            
            // setInterval(ws.send("AnalogValue: " + String(analogRead.AnalogValue())), 500);
        // set the duty cycle.
        else {
            ws.send("Foxtrot Charlie Kilo over 'n out");
           // pwm.setDuty(message);
        }
    });

    // When connection closes.
    ws.on('close', function() {
        console.log('stopping client interval');
    });
});
