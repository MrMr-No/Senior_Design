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
Correctly measuring drag is crucial for the study of airflow over an aerodynamically intensive body. The 2-Axis Pitot Scanning system will use a pitot tube to scan the velocity profile in the wake of aerodynamic bodies and calculate the momentum deficit for drag analysis.

Our scanning system consists of a pitot tube mounted on the end of of a 2-axis carriage which is driven by stepper motors. This will measure pressure across a plane downstream of an aerodynamic body of interest. A microcontroller will handle user specifications, motion control, and computations on the collected pressure sensor data. Users will interact with the system through an IPython Notebook environment. The final system is designed to fit with the dimensions of the client’s wind tunnel and be accurate for airspeeds ranging from 1-30 miles per hour. The 2-Axis Pitot Scanning system will greatly assist professors and students with aerodynamic research and education by demonstrating bernoulli's law and finding drag of bodies for reference.

Mechanical System
--------------------------------
