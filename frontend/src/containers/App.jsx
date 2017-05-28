import React, { Component } from 'react';

import io from 'socket.io-client';

const renderHost = (host) => (
  <div key={host} className="flex-item">{host}</div>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { online: [] };

    this.checkOnline = this.checkOnline.bind(this);
  }

  componentDidMount() {
    var that = this;
    this.socket = io('http://0.0.0.0:9000');

    this.socket.on('online', (hosts) => {
      that.setState({ online: hosts });
    });

    this.socket.emit('whoisonline');
  }

  checkOnline() {
    this.socket.emit('whoisonline');
  }

  render() {
    const { online } = this.state;

    const Hosts = online.sort().map(renderHost);

    return (
      <div>
        <button onClick={this.checkOnline}>Check who are online</button>
        <div className="flex-container">
        <div className="flex-list">
          { Hosts }
        </div>
        </div>
      </div>
    );
  }
};

export default App;
