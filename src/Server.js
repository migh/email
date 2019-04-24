const express = require('express');
const bodyParser = require('body-parser');

const EmailClient = require('./EmailClient');

const port = 3000;

class Server {
  constructor() {
    const app = this.app = express();
    app.use(bodyParser.json());

    const client = this.client = new EmailClient();
  }

  start() {
    const app = this.app;

    app.get('/', (req, res) => {
      res.status(405).json({ error: 'Use a POST request instead.' });
    });

    app.post('/', (req, res) => {
      // req.body is already a JSON ;)
      const { to, subject, content } = req.body;

      const messageOptions = {
        from: '<VALID SENDER EMAIL>',
        to,
        subject
      };

      this.client.send(content, messageOptions)
        .then(data => {
          // This should be logged.
          console.log(data);
          res.json({ success: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ success: false, error: err });
        });
    })

    app.listen(port, () => console.log(`App listening on port ${port}!`));
  }
}

module.exports = Server;
