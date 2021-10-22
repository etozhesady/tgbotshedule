
## tgBotShedule
###### Kstu student search bot

Bot for getting student grades from KSTU.

## Installation

Use the node package manager [npm](https://nodejs.org/ru/download/package-manager/) to install this bot.

```bash
npm install
```

## Usage

```javascript
node bot.js
```

## Production deploy
```sh
$ git clone https://github.com/etozhesady/tgbotshedule && cd tgbotshedule
$ docker build -t tgbotshedule:latest .
$ docker run --name tgbotshedule -e BOT_TOKEN=my-bot-token -d tgbotshedule:latest
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
