#Actuator.py
#Actuator Class
#contains methods to move actuator away from (distal) and toward (proximal) stepper motor  
#outline class until we have beaglebone to test

class Actuator:
	def __init__(self, position = 0):
		self.position = position


	def moveDistal(self, distance): #Move actuator away from origin distance in mm
		# need distance per degrees rotation
		# always update self.position
		# insert interupt for limit switch

		return

	def moveProximal(self, distance): #Move actuator toward origin
		# need distance per degrees rotation
		# always update self.position
		#insert interupt for limit switch
		return


	def zero(self):
		while self.position > 0:
			self.moveProximal(1)


		#Move actuator to zero postion





if __name__ == "__main__":
	actuator = Actuator()
	actuator.moveForward(5)
	