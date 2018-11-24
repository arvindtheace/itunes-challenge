import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css';
import Song from './Song';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=5/json')
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.feed })
      })
  }
  render() {
    if (!this.state.data.entry) return (<div></div>);
    console.log(this.state.data.entry);
    let songsList = this.state.data.entry.map((song,index) => {
      return (
        <div key={index} className="col-sm-3">
          <Song data={song} />
        </div>
      )
    })
    return (
      <div className="container">
        <div className="row">
            {songsList}
        </div>
      </div>
    );
  }
}

export default App;
