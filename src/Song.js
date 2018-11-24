import React, { Component } from 'react';
import './Song.css';
import $ from 'jquery';

class Song extends Component {
    componentDidMount() {
        $('.hover').hover(function () {
            $(this).addClass('flip');
        }, function () {
            $(this).removeClass('flip');
        });
        $('.hover').on('click', (function () {
            if($(this).hasClass('flip')){
                $(this).removeClass('flip'); 
            }
        }));
    }
    render() {
        let imageMeta = this.props.data["im:image"][2];
        let height = imageMeta.attributes.height;
        let label = imageMeta.label;
        let name = this.props.data["im:name"].label;
        let artist = this.props.data["im:artist"].label;
        let price = this.props.data["im:price"].label;
        return (
            <div className="hover panel">
                <div className="front">
                    <div className="pad">
                        <img src={label} height={height} alt={name} />
                        <p className="truncate">{name}</p>
                    </div>
                </div>
                <div className="back">
                    <div className="pad">
                        <p> Title: {name} </p>
                        <p> Artist: {artist} </p>
                        <p> Price: {price} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Song;