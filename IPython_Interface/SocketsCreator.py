#WebSockets creator

from ws4py.client.threadedclient import WebSocketClient
import time

class PyClient(WebSocketClient):

    def __init__(self, *args,**kwargs):

        #Set up consturctor for parent class
        WebSocketClient.__init__(self,*args,**kwargs)
        
        #set up attribute variables fro PyClient
        self.last_received_message = ""
        self.waiting_for_response = False

    

    def opened(self):
        
        self.send("MakeConnection")

    def closed(self, code, reason=None):
        print "Closed down", code, reason

    def received_message(self, m):
        self.waiting_for_response = False
        print "Recieved message: ", m
        if m.is_text:
            self.last_received_message = m.data.decode("utf-8")
        print "Last_recieved_Message", self.last_received_message

        
        if m == 'Connection Made':
            print "Connection Successful"

    def response(self, message): #returns string
        print "Sending message: "+ message

        self.waiting_for_response = True
        self.send(message)

        #Five second timout timer
        send_time = time.time()
        timer = send_time

        while self.waiting_for_response or timer <= 2:
            timer = time.time() - send_time


        print "SocketsCreator Message: "+ self.last_received_message
        if self.waiting_for_response:
            return "No response"
        else:
            return self.last_received_message


#Function to Create Beaglebone client  
#Aways Change to correct IP address!!!!          
def CreateClient(host = '192.168.1.20' , port = '8000/'):
    try:
        print "Before WebSockets Connection"
        ws = PyClient('ws://' + host + ':' + port)
        ws.connect()
        # ws.run_forever() #This must say commenteed out otherwise function will not return
        print "Made it here"
        return ws
    except KeyboardInterrupt:
        ws.close()
