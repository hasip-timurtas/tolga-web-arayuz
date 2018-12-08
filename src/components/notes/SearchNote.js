import React from 'react';
import { auth, db, GetNotes } from '../firebase'
import SingleNote from './SingleNote';

export default class SearchNote extends React.Component {

    constructor() {
        super();
        this.state = {
            searchText: '',
            notes: []
        }
    }

    componentDidMount(){
        GetNotes(notes=> this.setState({notes}))
    }

    UpdateSearch(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    loadData() {
        if (this.state.searchText != '') { // if text is empty return []
            return this.state.notes.filter(x=> x.title.toLowerCase().includes(this.state.searchText.toLowerCase()))
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
                       onChange={this.UpdateSearch.bind(this)}
                       placeholder="Search"
                       ref="searchText"
                       value={this.state.searchText}
                />

                {notes}
            </div>
        )
    }
}
