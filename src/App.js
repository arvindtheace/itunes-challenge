import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css';
import Song from './Song';
import { debounce } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      filteredList: []
    }
    this.debouncedChange = debounce((e) => {
      this.filterList(e);
    }, 500)
  }
  componentDidMount() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.feed, filteredList: json.feed.entry })
      })
  }
  onChange = (e) => {
    e.persist();
    this.debouncedChange(e);
  };
  filterList = (e) => {
    let list = this.state.data.entry;
    let searchString = e.target.value.toLowerCase();
    let filteredList;
    if(searchString) {
      filteredList = list.filter((songInfoObj) => {
        console.log(songInfoObj);
        let title = songInfoObj["im:name"].label.toLowerCase();
        return title.includes(searchString);
      })
    }
    else {
      filteredList = list;
    }
    this.setState({filteredList});
  }
  render() {
    if (!this.state.filteredList) return (<div></div>);
    let songsList = this.state.filteredList.map((song, index) => {
      return (
        <div key={index} className="col-sm-3">
          <Song data={song} />
        </div>
      )
    })
    return (
      <div className="container">
        <input className="searchbar" type="text" name="search" placeholder="Search..." onChange={this.onChange} />
        <div className="row">
          {songsList.length > 0 ? songsList : <div className="emptyMsg">No songs found!</div>}
        </div>
      </div>
    );
  }
}

export default App;
