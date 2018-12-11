import React from 'react';

export default class RecentlyAdded extends React.Component {
    render() {
        var notes = this.props.notes.slice(0,15).map((note,i) => {
            return <a onClick={e=> this.props.showNote(note)} href="#" key={i} className="list-group-item recent-note" refs="notem">
                        {note.stokKodu}
                   </a>
        });

        return (
            <div className="list-group">
                <a href="#" className="list-group-item disabled"><strong>Last 15 Items</strong></a>
                {notes}
            </div>

        )
    }
}
