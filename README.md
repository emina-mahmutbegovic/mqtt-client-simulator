# mqtt-client-simulator

### About
This is a simple MQTT client simulator for connecting/disconnecting from HiveMQ broker. 

### References
* [HiveMQ Client Event History](https://www.hivemq.com/docs/hivemq/4.7/user-guide/event-history.html)
* [MQTT](https://mqtt.org/)

### Prerequisites
 - node, npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Running the application
 - Use [npm install] to install dependencies
 - Use [npm run dev] to run the application

### Application URL
http://localhost:5000/graphql

### Queries & mutations

### Healthcheck 
Can be used to check if the application has successfully started. 

Query
```
query{
  healthcheck
}
```

Response
```
{
  "data": {
    "healthcheck": "App sucessfully running!"
  }
}
```
### Connect
Can be used for creating new client connection, if clientId is set to null. Can be used to cause # SESSION TAKEN OVER event by attemting to create new connection with existing clientId. Returns clientId.

Query
```
mutation($input: MqttClientInput!) {
  connect(input: $input) {
    clientId
  }
}
```
Input
```
{
  "input": {
    "clientId": "string" # Optional parameter. 
  }
}

### Disconnect
Can be used for ending an existing connection. Takes existing cliendId as an input parameter. Returns connected (boolean). Returns false if the client was successfully disconnected.

Query
```
mutation {
  endConnection(clientId: string) {
    connected
  }
}
```
