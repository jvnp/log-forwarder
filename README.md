# log-forwarder
Log Forwarding Using Two Servers(Express) and One Client(React).
1. Client logs `GET` request to `Forwarder`  per second
2. Forwarder collects request as `logs<timestamps>` in array and forwards to `Server` after interval of 10 seconds
3. Server stores logs to `Database` adding id to each log and make it accessible upon request by `Client`

## Prerequsite

* docker
* Node.js

## Start

You can run individual servers
```sh
/client$ npm run dev
/forwarder$ npm start
/server$ npm start
```

OR 

use docker
```sh
docker-compose -f docker-compose.yml up
```

## Ports
* Client: 3000
* Forwarder: 8010
* Server: 8000

## Authors
* **Jeevan Prakash Pant** [WEBSITE](https://jeevanpant.com)

## Contributor(s)
* Not Available

## License
MIT
