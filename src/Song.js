import React, { Component } from 'react';

class Song extends Component {
    render() {
       let imageMeta = this.props.data["im:image"][2];
       let height = imageMeta.attributes.height;
       let label = imageMeta.label;
       let name = this.props.data["im:name"].label;
        return (
            <div>
                <img src={label} height={height} alt={name}/>
            </div>
        )
    }
}

export default Song;