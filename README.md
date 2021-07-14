# VNF-LCM-Emulator_minimal

This minimal implementation of the VNF LCM Emulator consists of a web application which is based on a client-server model. Both the client and server sides are implemented in this repository.
React.js is used to generate the client-side application with Swagger UI as its frontend while the backend logic is written in Node.js

Pre-requisites:
1. Install Node.js (https://nodejs.org/en/download/).
2. Install and start MongoDB (https://docs.mongodb.com/manual/installation/).
3. Make sure that the MongoDB service has started successfully. 

Server side:
1. Go to the backend folder using terminal or windows powershell.
2. Run "npm install". This will install the required packages and dependencies.
3. Run "node index.js". This will start the backend Node.js server.

Client side:
1. Go to the frontend folder using terminal or windows powershell.
2. Run "npm install". This will install the required packages and dependencies.
3. Run "npm start". This will start the frontend application in the browser.

Current methods supported:
1. POST /vnf_instances
2. GET /vnf_instances

commit check