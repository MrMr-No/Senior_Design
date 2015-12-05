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

###IPython_Interface
This foler contains the IPython client scripts and modules that operate and process the analog voltage data returned from the Beaglebone. IPython chosen as our client due to customer specifications

##Flowchart/State Diagram of Software Execution
The follwing is a flowchart/state diagram of the software execution and shows how the IPython Client requests interact with the Node.JS websockets server running on the Beaglebone.

![alt text](https://github.com/alexlerikos/Senior_Design/blob/master/README_images/Software%20Flowchart.png)

