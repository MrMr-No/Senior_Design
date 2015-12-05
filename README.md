Senior_Design: 2-Axis Pitot Tube Scanner 
================================
Introduction: What is a 2-Axis Pitot Tube Scanner?
------------------------------
The 2-Axis Pitot Scanning system uses a pitot tube to scan the velocity profile in the wake of aerodynamic bodies and calculate the momentum deficit for drag analysis. A 2-axis carrage is driven by stepper motors into position and measures pressure downstream using a pressure differential analog sensor. To better visulize this system, check out the CAD models below (thanks Biran Orr!).

#####Orthogonal Front
![alt text](https://github.com/alexlerikos/Senior_Design/blob/master/README_images/Orthogonal_Front.png)

#####Orthogonal Rear: Inidcates relative motion of pitot tube and stepper motor actuators
![alt text](https://github.com/alexlerikos/Senior_Design/blob/master/README_images/Orthogonal_Rear.png)

#####Front
![alt text](https://github.com/alexlerikos/Senior_Design/blob/master/README_images/Front.png)

As shown above, our scanning system consists of a pitot tube mounted on the end of of a 2-axis carriage which is driven by stepper motors. 

Our system is controlled through a Beaglebone Black on-board computer. The on-board computer uses Node.js to broadcast a local WebSockets server, control the positioning of the multi-axis actuators and process the analog voltage signals from pressure sensor attached to the pitot tube. An IPython notebook is used to supply positioning data to the Beaglebone, process analog voltage data and view the results. The IPython notebook makes a client Websockets connection to the Beaglebone on-board computer server. This allows for real-time transmission of data between the IPython notebook and the server running on the Beaglebone. 
	

Contents of this Repository
--------------------------------------

This reposititory contains the Python and Node.js modules used to facilitate our project (Solidworks files may be added in time). 

###WebSocketsServer
This folder contains all the Javascript and Node.js modules that run on the Beaglebone Black on-board computer. Pin I/O to the Beaglebone black was handled through the [Bonescript](http://beagleboard.org/Support/BoneScript) library provided by Beagelboard.org.

#####websockets-server.js:
This file contains the [ws](https://einaros.github.io/ws/) Websockets implimetation that sets up a Websockets server to recieve and send data from the Beaglebone Black. 

To run the websockets server, use the command: `node websockets-server.js` while in the *WebsocketServer* directory

It is currently set to handle the following messages:

* `"connection"` : This will return verification to the client if the connection to the Beagelbone was successful and set up the websockets connection between the IPython Client and the Websockets server
* `"message"` : Any message other than `connection` will be handled in this callback section
* `"ReadAnalog:(x,y)"`: This message triggers the callback that moves the stepper motors such that the Pitot static tube is in the (X,Y) position in the  tunnel's cross-section. It then reads the current analog voltage input from the designated Beaglebone analog I/O pin and returns the analog voltage value to the IPython client
* `"Move_X"` and `"Move_Y"`: These messages trigger callbacks that move ths Pitot Static tube to the respective X or Y position in the in the  tunnel's cross-section. They **do not** return messages to the IPython Client.
* `"ReturnAnalog"`: This message triggers a callback that returns the current analog voltage input from the designated Beaglebone analog I/O pin. It **does not** send return messages to the IPython Client.
* If an invalid message is sent to the websockets server, the default response message is `"Message Received but No Action Taken"`. This confirms that the message was recieved but it was invalid.

#####Actuator.js:
This file is the linear actuator module. Each actuator is defined in the `websockets-server.js` file is an object of this class module. This module has 4 public protocols:

* `Actuator(StepsPerMillimeter, driver_step_pin, driver_direction_pin, motor_Zero_pin)`: This is the class constructor, it takes takes 4 arguments:
	* *StepsPerMillimeter*: the number of motor steps it takes to travel 1 millmeter horizontally or vertically along the linear actualtor.
	* *driver_step_pin*: The macro for the Beaglebone pin that sends digital output signals to the motor driver to step the motors.
	* *driver_direction_pin*: The macro for the Beaglebone pin that sends digital output signals to the motor drivers to indicate the motor direction.
	* *motor_Zero_pin*: This is the macro for the Beaglebone pin that is used as a ground refrence for the motor driver
* `MoveTo(cord)`: This protocol moves the actuator to position *cord* reletive to a predefined zero
* `MoveDistance(distance)`: This protocol moves the actuator to the postion that is a distance away from the current position
* `MoveToZero()`: This protocol moves the actuators to the zero position. The actuators move the Pitot Tube carrage toward the motors, then stop rotoating after limit switches are triggered. The final position is used as the zero refrence point.

#####Step_Driver.js (and maybe the most significant file in the repository!):
This file contains a built from scratch motor driver class for bipolar stepper motors using Node.JS. At the time of this projects creation, I could not find a single package that contained bipolar stepper motor drivers for Beaglebone using Node.JS. So this class had to be buit using research and sweat.  

It containts a set 4 public methods and 1 private method that rotate the drive the stepper motors:
* `Step_Driver(step_pin, direction_pin, stepsPerRevolution, speedRPM)`: This is the class constructor it takes the following optional arguments:
	* *step_pin*: The macro for the Beaglebone pin that sends digital output signals to the motor driver to step the motors.
	* *direction_pin*:  The macro for the Beaglebone pin that sends digital output signals to the motor drivers to indicate the motor direction.
	* *stepsPerRevolution*: This is the number of steps it takes for the stepper motor to make 1 revoltion
	* *speedRPM*: This is the RPM that the stepper motor will rotate at
* `setSpeed(rpm)`: This fuction can be used to change the speed of the stepper motor after it is instantiated.
* `rotate(degrees)`: This function rotates the motor as many degrees as are defined in the argument. 
* `step(numberOfSteps)`: **This is the most important function.** It moves the the stepper motor the number of steps specified. It works by sending a HIGH digtal signal to the stepper motor driver. The driver makes 1 step per every rising voltage edge (0-> 5V) from its digital input. The Beaglebone then runs a sleep function where it stalls the process for a given delay time before,pulling the driver pin LOW to HIGH again, causing an additional motor step.

Because Javascript is asynchrounus, the sleep function cannot work by just being called as the process thread will continue past it. Instead, it captures the process thread in a loop that checks if the delay time has passed at each iteration. The timing engine is based off `Date` module set up by the operating system at startup. Once the delay time has passed, the process thread is released from the loop and continues to the next motor step.

###IPython_Interface
This foler contains the IPython client scripts and modules that operate and process the analog voltage data returned from the Beaglebone. IPython chosen as our client due to customer specifications

##Flowchart/State Diagram of Software Execution
The follwing is a flowchart/state diagram of the software execution and shows how the IPython Client requests interact with the Node.JS websockets server running on the Beaglebone.

![alt text](https://github.com/alexlerikos/Senior_Design/blob/master/README_images/Software%20Flowchart.png)

