# Hack Week (Advanced) Day 4: Node.js

## Setup

```sh
npm init
npm install --save express
npm install --save nunjucks
npm install --save nconf
```

Or, if you alreay have a `package.json`, just `npm install`.

## Using localtunnel
```sh
[sudo] npm install -g localtunnel
lt --port 3000
```

## Using Facebook Login
Add your facebook credentials, and add an `APP_SECRET` to `config.json`. The app
secret can be any string, but it must be something hard to guess, like a
password.
