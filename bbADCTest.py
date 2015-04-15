import Adafruit_BBIO.ADC as ADC
import time
import math


if __name__ == "__main__":
 	
 	# Warning!!!!!!
 	# Do not plug directly into pin 40!!!!!
 	# You need to use a volate divider to makes sure the
 	# Voltage has to be LESS THAN 1.8V!!!!!!!!!!!
 	ADC.setup()
 	while True:
		
		value = ADC.read_raw("P9_40") #USing pin40
		#value = ADC.read("P9_40")
		# voltage = value * 1.8 #* 1.8 #1.8V
		#print voltage
		print value
		time.sleep(.1)
		

