const SparkPost = require('sparkpost');

class ClientEmail {
  constructor() {
    this.client = new SparkPost('<YOUR API KEY>');
  }

  send(message, options) {
    return new Promise((resolve, reject) => {
      this.client.transmissions.send({
        options: { sandbox: true },
        content: {
          from: options.from,
          subject: options.subject,
          html: message
        },
        recipients: [
          {address: options.to}
        ]
      })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = ClientEmail;
