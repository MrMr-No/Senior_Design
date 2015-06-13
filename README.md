<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Senior_Design: Sprint 2015](#senior_design-sprint-2015)
  - [IPython notebook and Beaglebone WebSockets Server Implimentation](#ipython-notebook-and-beaglebone-websockets-server-implimentation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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



###IPython_Interface
	
	
