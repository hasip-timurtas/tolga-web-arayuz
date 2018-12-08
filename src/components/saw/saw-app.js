import React from 'react';
import SearchNote from './SearchNote';
import ShowNote from './ShowNote';
import { auth, db, dbf, CheckProcessRun, GetDataSaw, addTotaStok, GetTolgaItemSizes } from '../firebase'
import { Link  } from 'react-router-dom';
//Notes = new Meteor.Collection("notes");
import LoadingPage from '../loading'
//Meteor.subscribe("getNotes");

export default class SawApp extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedNote: [],
            selectedNote1: {_id: '', title: '', content: ''},
            newNote: false,
            runProcess: false,
            notes: [],
            searchText: '',
            sizes:[]
        }
    }

    componentDidMount(){
        CheckProcessRun(runProcess => {
            this.setState({runProcess})
            GetDataSaw(notes=> this.setState({notes}))// sayfa ilk yüklendiğinde ve her process güncellendiğinde datayıda güncelle
        })
        //GetNotes(notes=> this.setState({notes: notes.slice(0,15)}))
    }

    showNote(note) {
        GetTolgaItemSizes(note.stokKodu, validSizes=>{
            const fullSizes = [{name: 's', active:false},{name: 'm', active:false},{name: 'l', active:false},{name: 'xl', active:false},{name: 'xxl', active:false}]
            const sizes = fullSizes.filter(e=> {
                if(validSizes.includes(e.name)){
                    e.active = true
                }
                return true
            })
            this.setState({sizes})
        })
        this.setState({selectedNote: note});
        this.setState({
            selectedNote1: {
                _id: note._id,
                title: note.title,
                content: note.content
            }
        });
    }

    toogleSize(size){
        const copy = this.state.sizes.slice()
        copy.find(e=> {
            if(e.name == size.name){
                e.active = !e.active
                return true
            }
        })
        this.setState({sizes: copy})
    }

    addMyStock(item){
        item.validBedens = this.state.sizes.filter(e=> e.active).map(e=> e.name)
        addTotaStok(item)
    }

    checkForNote() {
        // if there is a selected note then showNote will appear.
        if (this.state.selectedNote._id) {
            return <ShowNote selectedNotem={this.state.selectedNote}
                             selectedNote1={this.state.selectedNote1}
                             titleChange={this.titleChange.bind(this)}
                             contentChange={this.contentChange.bind(this)}
                             clearNote={this.clearNote.bind(this)}
                             toogleSize={e=> this.toogleSize(e)}
                             addMyStock={e=> this.addMyStock(e)}
                             sizes={this.state.sizes}
                             />;
        }
    }

    clearNote(){
        this.setState({ selectedNote: [] });
    }

    render(){
        return this.state.runProcess ? <LoadingPage /> : (this.state.newNote ? this.newNoteRender() : this.showNoteRender())
    }


    titleChange(event) {
        this.setState({
            selectedNote1: {
                _id: this.state.selectedNote1_id,
                title: event.target.value,
                content: this.state.selectedNote1.content
            }
        });
    }

    contentChange(event) {
        this.setState({
            selectedNote1: {
                _id: this.state.selectedNote1_id,
                title: this.state.selectedNote1.title,
                content: event.target.value
            }
        });
    }

    showNoteRender() {
        return (
            <div className="row">
                <div className="col-md-10">
                    <h2>Saw Türkiye Stok</h2>
                    <SearchNote showNote={this.showNote.bind(this)} selectedNotem={this.state.selectedNote} UpdateSearch={e=>this.setState({searchText: e})} 
                    searchText={this.state.searchText}
                    notes={this.state.notes} />
                    <hr/>
                    {this.checkForNote()}
                </div>
            </div>

        )
    }

    addNote(event) {
        event.preventDefault();
        var title = this.refs.title.value.trim();
        var content = this.refs.content.value.trim();

        //Meteor.call("newNote", title, content); NEW NOTE
        const newNote = {
            _id: '_' + Math.random().toString(36).substr(2, 9),
            title,
            content,
            date: Date()
        }
        db.ref('Notes').child(auth.currentUser.uid).push(newNote)
        this.refs.title.value = "";
        this.refs.content.value = "";
        this.setState({newNote:false})
    }
    

    newNoteRender() {
        return (
            <form className="new-note" onSubmit={this.addNote.bind(this)}>
                <div className="row">
                    <div className="col-md-6 form-group">
                            <input type="text" className="form-control" name="title" placeholder="title" ref="title"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 form-group">
                            <textarea className="form-control" name="content" placeholder="Content" rows="5"
                                      ref="content"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1 form-group">
                            <button type="submit" className="btn btn-success add-post">Not ekle</button>
                    </div>
                    <div className="col-md-1 form-group">
                            <button type="submit" className="btn btn-danger add-post" onClick={e=> this.setState({newNote:false})} >Vazgeç</button>
                    </div>
                </div>
            </form>
        )

    }
}
