
var express = require("express");
var app = express();

var cors = require('cors')
var bodyParser = require('body-parser')

const descriptor = require('./descriptors/sol006.json')
const schema = require('./schemas/CreateVnfRequest.json')

var validate = require('jsonschema').validate;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vnfs', {useNewUrlParser: true, useUnifiedTopology: true});

const VNFInstance = new mongoose.Schema({
    id: String,
    vnfInstanceName: String,
    vnfInstanceDescription: String,
    vnfdId: String,
    vnfProvider: String,
    vnfProductName: String,
    vnfdVersion: String,
    vnfSoftwareVersion: String
  });

const Instance = mongoose.model('Instance', VNFInstance);
var instanceId = 0;

app.listen(3000, () => {

 console.log("Server running on port 3000");

});

app.use(cors())
app.use(bodyParser.json())

app.post('/vnflcm/v1/vnf_instances',(req, res, next)=>{
    console.log("Received a POST request")
    //Schema Validation
    if(validate(req.body, schema, { additionalProperties: false }).valid){
        console.log("Request body validated!")
        instanceId += 1;
        const instance = new Instance({
            id: instanceId,
            vnfInstanceName: req.body.vnfInstanceName,
            vnfInstanceDescription: req.body.vnfInstanceDescription,
            vnfdId: descriptor['nfv']['vnfd'][0]['id'],
            vnfProvider: descriptor['nfv']['vnfd'][0]['provider'],
            vnfProductName: descriptor['nfv']['vnfd'][0]['product-name'],
            vnfdVersion: descriptor['nfv']['vnfd'][0]['version'],
            vnfSoftwareVersion: descriptor['nfv']['vnfd'][0]['software-version']
        })  

        instance.save().then(()=>{
            res.status(201).json(instance)
        }).catch((e) => {
            res.json(e)
        })

    } else{
        console.log("Request Validation Failed!")
        res.status(400).json({
            message:'BAD REQUEST', 
            data: req.body,
            error: 'Invalid request body'
        })
    } 
})

app.get('/vnflcm/v1/vnf_instances',(req, res, next)=>{
    console.log("Received a GET request")

    Instance.find({}, function (err,instances){
        if(err){
            res.send('Error!');
            next();
        }
        res.json(instances);
    });
    
})