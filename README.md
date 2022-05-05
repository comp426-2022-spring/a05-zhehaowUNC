[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7569079&assignment_repo_type=AssignmentRepo)
# a05 Human Interface

In this assignment, you will build an HTML human interface for your API. You will also document your API endpoints and consider package structure.

## DO NOT CLONE THIS REPOSITORY DIRECTLY

Use the GitHub classroom link instead: https://classroom.github.com/a/PUVGxeMe

If you clone this repo directly, it will not be added to the organization as an individual repo associated with your account and you will not be able to push to it.

## Instructions

Full instructions for this assignment are available at: https://comp426.johndmart.in/a/05/

<!-- DELETE EVERYTHING ABOVE THIS LINE -->

# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)

Check connection to the API.

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)

Flip one coin and obtain the flip result (heads/tails).

_Duplicate of /app/flip/coin/ (GET)_

#### Request cURL

```
curl http://localhost:5000/app/flip/
```

#### Response body

```
{"flip":"heads"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-VYm8Bk1/RW8RGhDXdTwBYk6lbGE"
Date: Fri, 15 Apr 2022 21:21:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)

Flip the number of coins specified in the request parameters and obtain:
- The raw results listing the flips.
- The result summary with the number of flips resulting in heads and the number of flips resulting in tails.

#### Request cURL

```
curl http://localhost:5000/app/flips/5/
```

#### Response body

```
{"raw":["tails","heads","tails","heads","tails"],"summary":{"heads":2,"tails":3}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 81
ETag: W/"51-IWzVVZssN58fXvSJkEM6w8IgpU8"
Date: Fri, 15 Apr 2022 21:23:51 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coin/ (GET)

Flip one coin and obtain the flip result (heads/tails).

_Duplicate of /app/flip/ (GET)_

#### Request cURL

```
curl http://localhost:5000/app/flip/coin/
```

#### Response body

```
{"flip":"heads"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-VYm8Bk1/RW8RGhDXdTwBYk6lbGE"
Date: Fri, 15 Apr 2022 21:33:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/:guess/ (GET)

Perform a flip match with the call (heads/tails) specified in the request parameters and obtain:
- The call (heads/tails).
- The actual flip (heads/tails).
- The result (win/lose).

#### Request cURL

```
curl http://localhost:5000/app/flip/call/tails/
```

#### Response body

```
{"call":"tails","flip":"heads","result":"lose"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 47
ETag: W/"2f-JOa34pahI0LRWI9nHfi+YGLHNg8"
Date: Fri, 15 Apr 2022 21:44:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)

Perform a flip match with the call (heads/tails) specified in the request body and obtain:
- The call (heads/tails).
- The actual flip (heads/tails).
- The result (win/lose).

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

Flip the number of coins specified in the request body and obtain:
- The raw results listing the flips.
- The result summary with the number of flips resulting in heads and the number of flips resulting in tails.

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","heads","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":21,"tails":9}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 07 Apr 2022 15:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

Obtain all access log records. 

Only available when --debug or -d is set to true at runtime of the server.

#### Request cURL

```
curl http://localhost:5000/app/log/access/
```

#### Response body

```
[{"id":1,"remoteaddr":"::1","remoteuser":null,"time":1650059656093,"method":"GET","url":"/app/","protocol":"http","httpversion":"1.1","secure":"false","status":200,"referer":null,"useragent":"curl/7.64.1"},{"id":2,"remoteaddr":"::1","remoteuser":null,"time":1650059668015,"method":"GET","url":"/app/flip/","protocol":"http","httpversion":"1.1","secure":"false","status":200,"referer":null,"useragent":"curl/7.64.1"},{"id":3,"remoteaddr":"::1","remoteuser":null,"time":1650059680298,"method":"GET","url":"/app/flip/call/tails/","protocol":"http","httpversion":"1.1","secure":"false","status":200,"referer":null,"useragent":"curl/7.64.1"},{"id":4,"remoteaddr":"::1","remoteuser":null,"time":1650059689594,"method":"POST","url":"/app/flips/coins","protocol":"http","httpversion":"1.1","secure":"false","status":200,"referer":"http://localhost:5000/","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36"},{"id":5,"remoteaddr":"::1","remoteuser":null,"time":1650059699183,"method":"GET","url":"/app/log/access/","protocol":"http","httpversion":"1.1","secure":"false","status":200,"referer":null,"useragent":"curl/7.64.1"},{"id":6,"remoteaddr":"::1","remoteuser":null,"time":1650059704204,"method":"GET","url":"/app/log/access/","protocol":"http","httpversion":"1.1","secure":"false","status":200,"referer":null,"useragent":"curl/7.64.1"}]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 1416
ETag: W/"588-T7u7qCp6J+bSc7jHGGJodXHIOWg"
Date: Fri, 15 Apr 2022 21:55:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/error/ (GET)

Run an error test. 

Only available when --debug or -d is set to true at runtime of the server.

#### Request cURL

```
curl http://localhost:5000/app/error/
```

#### Response body

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Error: Error test successful.<br> &nbsp; &nbsp;at /Users/christine/comp426-22s-workspace/a05-christineiym/index.js:176:15<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at next (/Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/route.js:137:13)<br> &nbsp; &nbsp;at Route.dispatch (/Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/route.js:112:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at /Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/index.js:281:22<br> &nbsp; &nbsp;at Function.process_params (/Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/index.js:341:12)<br> &nbsp; &nbsp;at next (/Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/index.js:275:10)<br> &nbsp; &nbsp;at /Users/christine/comp426-22s-workspace/a05-christineiym/index.js:86:5<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/christine/comp426-22s-workspace/a05-christineiym/node_modules/express/lib/router/layer.js:95:5)</pre>
</body>
</html>
```

#### Response headers

```
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1485
Date: Fri, 15 Apr 2022 22:01:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/error/ (GET)

Obtain all access log records where an error occurred.

Only available when --debug or -d is set to true at runtime of the server.

_Not yet implemented_

#### Request cURL

```
curl http://localhost:5000/app/error/
```

#### Response body

```
[{"id":1,"remoteaddr":"::1","remoteuser":null,"time":1650060502793,"method":"GET","url":"/app/nonexistentendpoint2/","protocol":"http","httpversion":"1.1","secure":"false","status":404,"referer":null,"useragent":"curl/7.64.1"},{"id":2,"remoteaddr":"::1","remoteuser":null,"time":1650060525930,"method":"GET","url":"/app/nonexistentendpoint1/","protocol":"http","httpversion":"1.1","secure":"false","status":404,"referer":null,"useragent":"curl/7.64.1"}]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 453
ETag: W/"1b1-BTXhHkE9j1jTlWA7KbITpdWqg7A"
Date: Fri, 15 Apr 2022 22:08:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/login/ (POST)

Login the specified user to the website using the username and password provided in the request body.

Obtain the user's username and the login status (success/failure).

_Not yet implemented_

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"username":"testuser","password":"testpassword"}' http://localhost:5000/app/user/login/
```

#### Response body

```
{"username":"testuser","login status":"success"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 48
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpFElRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/new/ (POST)

Create the specified user in the website using the username and password provided in the request body.

Obtain the user's username and the status of user creation (success/failure).

_Not yet implemented_

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"username":"testuser","password":"testpassword"}' http://localhost:5000/app/user/new/
```

#### Response body

```
{"username":"testuser","user creation status":"success"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 56
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpFElRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/update/ (PATCH)

Change the password for the specified user using the username and new password provided in the request body.

Obtain the user's username and the status of user update (success/failure).

_Not yet implemented_

#### Request cURL

```
curl -X PATCH -H 'Content-Type: application/json' -d '{"username":"testuser","password":"newtestpassword"}' http://localhost:5000/app/user/update/
```

#### Response body

```
{"username":"testuser","user update status":"success"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpFElRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/delete/ (DELETE)

Delete the specified user from the website (given the username and password provided in the request body).

Obtain the user's username and the status of user deletion (success/failure).

_Not yet implemented_

#### Request cURL

```
curl -X DELETE -H 'Content-Type: application/json' -d '{"username":"testuser","password":"testpassword"}' http://localhost:5000/app/user/delete/
```

#### Response body

```
{"username":"testuser","user deletion status":"success"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 56
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpFElRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
