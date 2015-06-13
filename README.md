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

Our scanning system consists of a pitot tube mounted on the end of of a 2-axis carriage which is driven by stepper motors. This will measure pressure across a plane downstream of an aerodynamic body of interest. A microcontroller will handle user specifications, motion control, and computations on the collected pressure sensor data. Users will interact with the system through an IPython Notebook environment. The final system is designed to fit with the dimensions of the client’s wind tunnel and be accurate for airspeeds ranging from 1-30 miles per hour. The 2-Axis Pitot Scanning system will greatly assist professors and students with aerodynamic research and education by demonstrating bernoulli's law and finding drag of bodies for reference.

Mechanical System
--------------------------------
