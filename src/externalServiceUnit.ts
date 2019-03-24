import http = require("http");

const express = require("express");
const bearerToken = require('express-bearer-token');
let externalService = express();

externalService.use(bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token'
}));
externalService.post("/test_ext_svc/login", function (request, response){
    let body={};
    //if(request.username==request.password && request.username=='mganl1')
        body={
        token:'f3qfq4f35h57j679aFpJEzKvqJKP0nSI8poz7_KHJnb',
        id: "n5CXddYL76EPtsY59",
        tokenExpires: "2019-01-06T13:41:13.336Z"
    }
    response.send(body);
    console.log('EXTER_SERV: /test_ext_svc/login - >'+JSON.stringify(body));
});
externalService.post("/users/isSessionValid", function (request, response)
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
                if(result.token=="f3qfq4f35h57j679aFpJEzKvqJKP0nSI8poz7_KHJnb"||
                    result.id=="n5CXddYL76EPtsY59"||
                    result.tokenExpires=="2019-01-06T13:41:13.336Z")
                body={status:'valid'};
                else body={status:'not valid'};
                response.send(body);
                console.log('EXTER_SERV: /users/isSessionValid - >'+JSON.stringify(body));
            }
        } catch (error) {
            console.log('EXTER_SERV: /users/isSessionValid - > ERROR '+error);
        }
    });
});

externalService.post("/users/logout", function (request, response)
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
                if(result.token=="f3qfq4f35h57j679aFpJEzKvqJKP0nSI8poz7_KHJnb"||
                    result.id=="n5CXddYL76EPtsY59"||
                    result.tokenExpires=="2019-01-06T13:41:13.336Z")
                    body={status:'success'};
                else body={status:'fail'};
                response.send(body);
                console.log('EXTER_SERV: /users/logout - >'+JSON.stringify(body));
            }
        } catch (error) {
            console.log('EXTER_SERV: /users/logout - > ERROR '+error);
        }
    });
});

export let instanceExternalService=http.createServer(externalService);
instanceExternalService.listen(3023);
