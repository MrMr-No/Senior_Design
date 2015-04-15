from __future__ import division
import Adafruit_BBIO.GPIO as GPIO
import time
import math




if __name__ == "__main__":

	pins=["P8_13", "P8_14", "P8_15", "P8_16"]
	while True:
		GPIO.setup("P8_13", GPIO.OUT)
		GPIO.output("P8_13", GPIO.HIGH)
		GPIO.cleanup()

		GPIO.setup("P8_14", GPIO.OUT)
		GPIO.output("P8_14", GPIO.LOW)
		GPIO.cleanup()
	
