import React, { Component } from 'react';

import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {online: []};

    this.checkOnline = this.checkOnline.bind(this);
  }

  componentDidMount() {
    var that = this;
    this.socket = io('http://0.0.0.0:9000');

    this.socket.on('online', (hosts) => {
      console.log(hosts);
      that.setState({ online: hosts });
    });

    this.socket.emit('whoisonline');
  }

  checkOnline() {
    this.socket.emit('whoisonline');
  }

  render() {
    const { online } = this.state;

    return (
      <div>
        <button onClick={this.checkOnline}>Check who are online</button>

        <h3>Currently online:</h3>
        { online.map((host) => <li key={host}>{host}</li>) }
      </div>
    );
  }
};

export default App;
