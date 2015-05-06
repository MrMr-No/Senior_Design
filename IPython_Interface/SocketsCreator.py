#WebSockets creator

from ws4py.client.threadedclient import WebSocketClient

class PyClient(WebSocketClient):

    def opened(self):
    	self.send("MakeConnection")
        # def data_provider():
        #     for i in range(1, 200, 25):
        #         yield "#" * i

        # self.send(data_provider())

        # for i in range(0, 200, 25):
        #     print i
        #     self.send("*" * i)

    def closed(self, code, reason=None):
        print "Closed down", code, reason

    def received_message(self, m):
        print "Recieved message: ", m
        if m == 'Connection Made':
            print "Connection Successful"
        # else if m == "Analog Values: "



#Function to Create Beaglebone client            
def CreateClient(host = '192.168.1.24' , port = '8000'):
    try:
    	print "Before WebSockets Connection"
    	ws = PyClient('ws://' + host + ':' + port)
    	ws.connect()
    	# ws.run_forever()
    	print "Made it here"
    	return ws
    except KeyboardInterrupt:
    	ws.close()

# if __name__ == '__main__':
#     try:
#         ws = PyClient('ws://localhost:9000/', protocols=['http-only', 'chat'])
#         ws.connect()
#         ws.run_forever()
#     except KeyboardInterrupt:
#         ws.close()