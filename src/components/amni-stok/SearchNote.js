import React from 'react';
import { auth, db, GetNotes } from '../firebase'
import SingleNote from './SingleNote';

export default class SearchNote extends React.Component {

    loadData() {
        if (this.props.searchText != '') { // if text is empty return []
            return this.props.notes.filter(x=> x.stokKodu.toLowerCase().includes(this.props.searchText.toLowerCase()))
        } else {
            return [];
        }
    }

    render() {

        var notes = this.loadData().map(note => {
            return <SingleNote showNote={this.props.showNote} notem={note} key={note._id}/>;
        });

        return (
            <div>

                <input type="text"
                       className="form-control searchNote"
                       onChange={e=> this.props.UpdateSearch(e.target.value)}
                       placeholder="Search"
                       ref="searchText"
                       value={this.props.searchText}
                />

                {notes}
            </div>
        )
    }
}
