const SparkPost = require('sparkpost');

class ClientEmail {
  constructor() {
    this.client = new SparkPost('<YOUR API KEY>');
  }

  send(message, options) {
    return this.client.transmissions.send({
      content: {
        from: options.from,
        subject: options.subject,
        reply_to: options.to,
        html: message
      },
      recipients: [
        {address: options.recipient}
      ]
    });
  }
}

module.exports = ClientEmail;
