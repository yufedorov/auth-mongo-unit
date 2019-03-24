import http = require("http");
import * as Messages from "./messages";

const express = require("express");
const bearerToken = require('express-bearer-token');
let internalService = express();

internalService.use(bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token'
}));
internalService.post("/users/login", function (request, response){
    let body={};
    //if(request.username==request.password && request.username=='mganl1')
        body={
        token:'8WGM1ntz2o14Qyn9aFpJEzKvqJKP0nSI8poz7_gYEkP',
        id: "n5CXddYL76EPtsY59",
        tokenExpires: "2019-01-06T13:41:13.336Z"
    }
    response.send(body);
    console.log('INTER_SERV: /users/login - >'+JSON.stringify(body));
});

internalService.post("/users/isSessionValid", function (request, response)
{
    let chunks = [];

    request.on("data", (chunk) => {
        chunks.push(chunk);
    });

    request.on("error", (error) => {

    });
    request.on("end", () => {
        var requestBody = Buffer.concat(chunks);
        let result
        try {
            if (requestBody.toString().startsWith('Internal Server Error')) response.send('error');
            else {
                result = JSON.parse(requestBody.toString())
                let body={};
                if(result.token=="8WGM1ntz2o14Qyn9aFpJEzKvqJKP0nSI8poz7_gYEkP"||
                    result.id=="n5CXddYL76EPtsY59"||
                    result.tokenExpires=="2019-01-06T13:41:13.336Z")
                body={status:'valid'};
                else body={status:'not valid'};
                console.log('INTER_SERV: /users/isSessionValid - >'+JSON.stringify(body));
                response.send(body);
            }
        } catch (error) {
            console.log('INTER_SERV: /users/isSessionValid - > ERROR '+error);
        }
    });


});

internalService.post("/users/logout", function (request, response)
{
    let chunks = [];

    request.on("data", (chunk) => {
        chunks.push(chunk);
    });

    request.on("error", (error) => {

    });
    request.on("end", () => {
        var requestBody = Buffer.concat(chunks);
        let result
        try {
            if (requestBody.toString().startsWith('Internal Server Error')) response.send('error');
            else {
                result = JSON.parse(requestBody.toString())
                let body={};
                if(result.token=="8WGM1ntz2o14Qyn9aFpJEzKvqJKP0nSI8poz7_gYEkP"||
                    result.id=="n5CXddYL76EPtsY59"||
                    result.tokenExpires=="2019-01-06T13:41:13.336Z")
                    body={status:'success'};
                else body={status:'fail'};
                console.log('INTER_SERV: /users/logout - >'+JSON.stringify(body));
                response.send(body);
            }
        } catch (error) {
            console.log('INTER_SERV: /users/logout - > ERROR '+error);
        }
    });


});

export let instanceInternalService=http.createServer(internalService);
instanceInternalService.listen(3020);
