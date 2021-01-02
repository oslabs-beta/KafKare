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


## Features

- Cross-platform Kafka monitoring, real-time data display desktop application
- Metrics monitored are based on feedback from real life Kafka deployment crashes and best practices
- Fullstack integration, leveraging user authentication to ensure only authorized members can review the dashboard

## Overview

Kafkare is a cross-platform Kafka monitoring dashboard application used to oversee the health of the Kafka cluster. 
Several key metrics are displayed including consumer lag time, number of topics, as well as system metrics like cpu usage, and available memory. 
Users can register for an account and login to access the dashboard. Passwords are encrypted with Bcrypt and stored in an external database. 

## Documentation and Demo


## Demo Setup

<div align="center"><strong>QUICK START</strong></div>
<br>

#Running the demo kafka cluster
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

#Running the dashboard
In the root directory (Kafkare), run in the terminal
<br>
```sh
npm install
npm build
npm start
```
<br>
A desktop application with the Kafka monitoring dashboards will load and you can start monitoring the running kafka cluster. 

## Connecting to an existing instance of Kafka


## License

The JavaScript Templates script is released under the
[MIT license](https://opensource.org/licenses/MIT).

## Authors

[Jenniel Figuereo](https://github.com/jfiguereo89)  
[Jiaxin Li](https://github.com/lijiaxingogo)  
[Joel Beger](https://github.com/jtbeger)  
[Wai Fai Lau](https://github.com/wlau8088/)