

### Problem Statement

Make a small backend application which can generate and emit an encrypted data stream over a socket, listens to incoming data stream on a socket, decrypts and decodes it, save to a time series db and then emit the saved data to a small frontend app. Backend services can be in any language (Node JS is preferred, but use Go or any other that you are comfortable with).


## Emitter service
This service should generate a periodic data stream of encrypted messages where the number of encrypted strings can be anywhere between 49-499 so randomise this to good effect.

Each message should contain an object with 3 keys: `name, origin, destination` and a `secret_key` which is a hash of these 3 fields. randomize the values for `name, origin, destination` from a constant list provided in `data.json` file

```
### Example
exmaple

originalMessage = {
  name: 'Jack Reacher',
  origin: 'Bengaluru',
  destination: 'Mumbai'
}

add a secret_key by creating a sha-256 hash of the above object

sumCheckMessage = {
  name: 'Jack Reacher',
  origin: 'Bengaluru',
  destination: 'Mumbai',
  secret_key: "sha-256 ash of originalMessage",
}

encrypt this payload using encryption algorithm `aes-256-ctr` with a pass key

encryptedMessage = "encrypted message string"

```
originalMessage = {
  name: 'Jack Reacher',
  origin: 'Bengaluru',
  destination: 'Mumbai'
}

adds a secret_key by creating a sha-256 hash of the above object

sumCheckMessage = {
  name: 'Jack Reacher',
  origin: 'Bengaluru',
  destination: 'Mumbai',
  secret_key: "sha-256 ash of originalMessage",
}




```

the data stream is long string of `|` separated encrypted messages and will look like this

"e84742dedd1ddc924e5bfe9a5d912a1918e217f98e5578d04fd5c12426022240|4bbf088f4fc646d7a65b1f84172a59f665a09beb226368ff53d46a5edfd75dc6|3743c3ff07694a3e5540dfc14d57dcfdd6868439f9b5b83162be9162d8032999|26ccd3d082227c49907af7d3e4f19aec764f73d20b73ca4337df818b68cf6975|8d5c45f45be31d657dd58ae4e2c8222f61a779ad11fe36da7b00511ac2b5c01a|e97451a0c72d4202915f6c43b48bc4c0a500851e4c71b66b51b3a588e6522316|99624125591ebecb2c4e34695bf8d1e8a36b73087fd0c8e6c4fad087fa244d5c|b70ed78f5befa9c64ecd9ddcb64f18868ba86debf6b833ce440bcb772be3171c|a9bec91a127fb7b76a462fadeac5090b8dc753841f1fd54ac758f4cdb9af5fc0|2c345c51005cd0b0df92b089dba17e82e321725f539b1cdfceebd6eab69c336a"

The emitter service connects with listener service over sockets and periodically send out a new message stream every 10s

## Listener Service

### Details

A [node.js](https://nodejs.org/en/), [express](https://expressjs.com/) and [socket.io](https://socket.io/) application with following functionality

- Routing
- Socket connection
- Connect to MongoDB with mongoose

Structure of Timeseries Model

```javascript
  {
    name: {
      type: String,
      require: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    timeSeriesData: [
      {
        _id: 0,
        timestamp: {
          type: Date,
        },
        origin: {
          type: String,
        },
        destination: {
          type: String,
        },
      },
    ],
    success: {
      type: Number,
      default: 0,
    },
    failed: {
      type: Number,
      default: 0,
    },
  }
```


## Running the application

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install the packages for the project.

Go to the directory where you would like to clone the [repo](https://github.com/KunjManiar/encrypted-timeseries.git).

<p>Install node and npm<p>
<p>Install and run redis server on machine<p>
<p>npm i<p>
<p>npm start<p>
## Run the app with docker
docker build -t encrypted-timeseries-application .
docker run -p 3000:3000 encrypted-timeseries-application

```sh
$ git clone https://github.com/dibyaranajnsahoo1/encrypted-timeseries.git


$ npm install or yarn add

```

Note: You can install [concurrently](https://www.npmjs.com/package/concurrently) as dev dependency and run them together by adding following in `package.json` script.

### For Example (Listener on Dev)

```
    "emitter": "node src/app.js --prefix emitter-service",
    "listener": "node src/app.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run emitter\" \"npm run listener\" \"npm run client\"",

```
