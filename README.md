![Kafkare](./src/assets/KafKareLarge.png)

<div align="center">A system monitoring tool for Kafka.</div>

<div align="center">

<h1 align="center">
	<a>Kafkare</a>
</h1>

</div>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/oslabs-beta/KafKare">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/oslabs-beta/KafKare?color=yellow">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/KafKare?color=orange">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/KafKare?style=social">  
</p>


## Table of Contents
  1. [Features](#Features)
  2. [Overview](#Overview)
  3. [Documentation and Demo](#Documentation-and-Demo)
      1. [Two ways to generate sample kafka data](#Documentation-and-Demo)
          1. [Manual data entry](#Running-the-demo-kafka-cluster-and-manually-enter-data)
          2. [Streaming API](#Running-the-demo-kafka-cluster-and-using-the-API-for-constant-data-generation)
      2. [Running the Dashboard Application](#Running-the-dashboard)
  4. [Setup](#Connecting-to-an-existing-instance-of-Kafka)
      1. [Connecting to an existing instance of Kafka](#Connecting-to-an-existing-instance-of-Kafka)
      2. [Updating User Database](#Connecting-the-user-database)
  5. [FAQ](#FAQ)
  6. [License](#License)
  7. [Authors](#Authors)

## Features

- Cross-platform Kafka monitoring, real-time data display desktop application
- Metrics monitored are based on feedback from real life Kafka deployment crashes and best practices
- Fullstack integration, leveraging user authentication to ensure only authorized members can review the dashboard

## Overview

Kafkare is a cross-platform Kafka monitoring dashboard application used to oversee the health of the Kafka cluster. 
Several key metrics are displayed including consumer lag time, number of topics, as well as system metrics like cpu usage, and available memory. 
Users can register for an account and login to access the dashboard. Passwords are encrypted with Bcrypt and stored in an external database. 

## Documentation and Demo


### Demo Setup

<div align="center"><strong>QUICK START</strong></div>
<br>

There are two ways to generate your Kafka data: 
1. Manually - For a controlled amount of data produced
2. Using an API - For a constant stream of data produced


#### Running the demo kafka cluster and manually enter data
<br>
From root directory (Kafkare) go into the kafka-playground folder:

In the terminal:

Install all dependencies
<br>
```sh
npm install
```
<br>
Set up the docker containers, we have a prebuilt kafka cluster for the demo
<br>

```sh
export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
docker-compose up
```

<br>

Run the data generator application to create topics and consumers:
<br>
```sh
npm run build-testbed
npm run testbed
```
You can go to your browser and enter in the address bar:
<br>
```sh
localhost:8181
```
<br>
to see the data generator

In the data generator, put in a new topic for the broker and submit it.
Then put in the number of messages you want to produce and submit. This will create that many messages to the kafka cluster.


#### Running the demo kafka cluster and using the API for constant data generation
<br>
From root directory (Kafkare) go into the kafka-playground folder/streaming_data:

In the terminal:

Install all dependencies
<br>

```sh
npm install
```

Go back to the kafka-playground folder and install the dependencies there as well:
In the terminal:

Install all dependencies
<br>
```sh
npm install
```

<br>
Set up the docker containers, we have a prebuilt kafka cluster for the demo
<br>

```sh
export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
docker-compose up
```

<br>
Run the data streaming application to create topics and consumers:

<br>
You can start your consumer by going to a new terminal, then open the Kafkare/kafka-playground directory. Now run: 

```sh
npm run consumer
```

Open a new terminal window. From the root directory (Kafkare) go into the kafka-playground directory.
Now create the topic in Kafka by running:

```sh
npm run topic
```

Finally, to create the generate the stream, run in the terminal:

```sh
npm run producer
```

#### __*Running the dashboard*__

Open a new terminal. 
In the root directory (Kafkare), run in the terminal
<br>

```sh
npm install
npm run build
npm start
```

You will see a login page where you can either login with an existing account or create a new account to login with. 

  To create a new account, click the register button in the login page. After registering an account, you will be prompted to login in with the account. 

After successfully logging in, a desktop application with the Kafka monitoring dashboards will load and you can start monitoring the running kafka cluster. 

## Connecting to an existing instance of Kafka
In the kafka-playground/ directory, edit the docker-compose.yml file. Add the following environment variables with relavant information to Kafka-exporter:
Environment Variable | Description
---------------------|------------
KAFKA_SERVER | Addresses (host:port) of Kafka server.
SASL_USERNAME | SASL user name.
SASL_PASSWORD | SASL user password.

```yml
  kafka_exporter:
    image: danielqsj/kafka-exporter
    ports:
      - '9308:9308'
    environment: 
      KAFKA_SERVER: <host:port>
      SASL_USERNAME: <SASL username>
      SASL_PASSWORD: <SASL password>
```

## Connecting the user database
In the server/db/ directory, edit the db.js file. Within the file, change the value of the PG_URI variable to the postgres database you are using. 

```javascript
const PG_URI =
  'postgres://<user>:<password>@<host>.db.elephantsql.com:5432/<db>';
```

## FAQ
#### Docker Compose Error
**Q1.** I'm getting this error when I use docker-compose up

```sh
During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "docker-compose", line 3, in <module>
  File "compose\cli\main.py", line 67, in main
  File "compose\cli\main.py", line 123, in perform_command
  File "compose\cli\command.py", line 69, in project_from_options
  File "compose\cli\command.py", line 132, in get_project
  File "compose\cli\docker_client.py", line 43, in get_client
  File "compose\cli\docker_client.py", line 170, in docker_client
  File "site-packages\docker\api\client.py", line 188, in __init__
  File "site-packages\docker\api\client.py", line 213, in _retrieve_server_version
docker.errors.DockerException: Error while fetching server API version: (2, 'CreateFile', 'The system cannot find the file specified.')
```

**A1.** Make sure Docker Desktop is up and running. 
<br>
</br>

**Q2:** Why doesn't Kafka doesn't start when I use docker-compose.

**A2:** Make sure your hostIP is defined. 
On iOS or Linux use:
```sh
export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
```

For Windows Users use:
```sh
export HOST_IP=$(ipconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $14 }' | cut -f2 -d: | head -n1)
```

## License

The JavaScript Templates script is released under the
[MIT license](https://opensource.org/licenses/MIT).

## Authors

[Jenniel Figuereo](https://github.com/jfiguereo89)  
[Jiaxin Li](https://github.com/lijiaxingogo)  
[Joel Beger](https://github.com/jtbeger)  
[Wai Fai Lau](https://github.com/wlau8088/)