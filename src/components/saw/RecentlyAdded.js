import React from 'react';
import SingleNote from './SingleNote';
import { db, auth, GetNotes } from '../firebase'

export default class RecentlyAdded extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: [],
        }
    }

    componentDidMount(){
        GetNotes(notes=> this.setState({notes: notes.splice(0,15)}))
    }

    render() {
        var notes = this.state.notes && this.state.notes.map(note => {
            return <SingleNote notem={note} key={note._id}
                               SelectedNotem={this.props.selectedNote}
                               showNote={note=> this.props.showNote(note)}
            />;
        });

        return (
            <div className="list-group">
                <a href="#" className="list-group-item disabled">
                    <strong>Last 15 Notes</strong>
                </a>
                {notes}
            </div>

        )
    }
}
