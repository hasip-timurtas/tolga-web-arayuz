import React from 'react';
import { auth, db, GetNotes } from '../firebase'

export default class ShowNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.selectedNotem.title,
            content: this.props.selectedNotem.content
        };
    }

    deleteNote() {
        db.ref('Notes').child(auth.currentUser.uid).child(this.props.selectedNotem.fbId).set(null)
        //Meteor.call("deleteNote", this.props.selectedNotem._id);
        this.props.clearNote()
    }

    updateNote() {
        const updatedData ={
            title: this.props.selectedNote1.title,
            content: this.props.selectedNote1.content,
            _id: this.props.selectedNotem._id,
            date: Date()
        }
        db.ref('Notes').child(auth.currentUser.uid).child(this.props.selectedNotem.fbId).set(updatedData)
        //Meteor.call("updateNote", this.props.selectedNote1);
    }

    addNote(){
        const newData ={
            title: this.props.selectedNote1.title,
            content: this.props.selectedNote1.content,
            _id: '_' + Math.random().toString(36).substr(2, 9),
            date: Date()
        }
        
        db.ref('Notes').child(auth.currentUser.uid).push(newData)
    }

    render() {
        return (
            <div className="show-note">
                <div>
                    <input className="form-control"
                        type="text"
                        value={this.props.selectedNote1.title}
                        ref="editInput"
                        className="form-control"
                        onChange={this.props.titleChange.bind(this)}
                    />
                 </div>
                 <div style={{marginTop:'10px'}}>
                    <textarea className="form-control note-content"
                              placeholder="content" rows="15"
                              value={this.props.selectedNote1.content}
                              readonly={true}
                              onChange={this.props.contentChange.bind(this)}>
                    </textarea>
                </div>

                <div className="alert alert-info" role="alert">
                    Entry Date : <strong>{/* note.entry_Date */}</strong>

                    <button type="button"
                            className="btn btn-default delete-note"
                            onClick={this.deleteNote.bind(this)}
                    >Delete
                    </button>
                    <button type="button"
                            className="btn btn-default update-note"
                            onClick={this.updateNote.bind(this)}
                    >Update
                    </button>
                    <button type="button" className="btn btn-default share-note" onClick={this.addNote.bind(this)} >Add</button>
                </div>
            </div>
        )

    }
}
