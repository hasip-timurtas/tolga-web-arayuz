import React from 'react';

export default class SingleNote extends React.Component {
    render() {
        return (
            <a onClick={e=> this.props.showNote(this.props.notem)} href="#" className="list-group-item recent-note" refs="notem">
               <img width="50" src={this.props.notem.thumbImg} />       {this.props.notem.stokKodu}
            </a>
        )
    }
}
