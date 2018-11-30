# Metallica Project

Pre-requistes :

Node, RabbitMQ, MongoDB should be installed
RabbitMQ, MongoDB should be up and running.
Your browser should allow third party cookies for User login
User should have Google account to use the application

Installation guidelines :
From CMD Prompt , step into the project folder -> Metallica

Command for application installation : npm install

Commands for Micro services installation :

trade-service -> cd src/standalone-services/TradeService && npm install
marketdata-service -> cd src/standalone-services/MarketdataService && npm install
refdata-service": "cd src/standalone-services/RefDataService && npm install"
notification-service cd src/standalone-services/NotificationService && npm install
user-service cd src/standalone-services/UserService && npm install

Running the application :

From CMD Prompt , step into the project folder -> Metallica -> npm run start

Running the Micro services :

From CMD Prompt , step into the project folder -> Metallica -> npm run start-micro-services

Application client on :
localhost:3000

Application server on :
localhost :8000

Service gateway on :
localhost : 8080

Trade service hosted on :
localhost:3001

Refdata service hosted on :
localhost:3004

Marketdata service hosted on :
localhost:3003

Notification service hosted on :
localhost:3002

FYI :
Prices served from Market data are randomly generated prices as of now.
