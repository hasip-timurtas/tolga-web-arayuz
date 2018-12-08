import React from 'react';
import RecentlyAdded from './RecentlyAdded';
import SearchNote from './SearchNote';
import ShowNote from './ShowNote';
import { auth, db, dbf, CheckProcessRun, GetDataTolgaStok, addTotaStok } from '../firebase'
import { Link  } from 'react-router-dom';
//Notes = new Meteor.Collection("notes");
import LoadingPage from '../loading'
//Meteor.subscribe("getNotes");
import {MhtModal, Alert} from '../mht-modal'

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
            modalIsOpen: false,
            modalContent:'Hasip',
            alertType: 'success',
            alertMessage: 'Hasip',
            alertIsOpen: false,
            bedens: {s: false, m:false, l:false, xl:false, xxl:false}
        }
    }

    componentDidMount(){
        CheckProcessRun(runProcess => {
            this.setState({runProcess})
            GetDataTolgaStok(notes=> this.setState({notes}))// sayfa ilk yüklendiğinde ve her process güncellendiğinde datayıda güncelle
        })

       // this.showAlert('success', 'bu bir tankerdir!')
    }

    showNote(note) {
        const fullSizes = [{name: 's', active:false},{name: 'm', active:false},{name: 'l', active:false},{name: 'xl', active:false},{name: 'xxl', active:false}]
        const sizes = fullSizes.filter(e=> {
            if(note.validBedens.includes(e.name)){
                e.active = true
            }
            return true
        })
        this.setState({sizes})
        
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
        GetDataTolgaStok(notes=> this.setState({notes}))// sayfa ilk yüklendiğinde ve her process güncellendiğinde datayıda güncelle
        if(item.validBedens.length == 0) this.setState({ selectedNote: [] }) // bedenden sıfır kaldıysa arka tarafta zaten refresh yapıyor sende selected noteyi refreshle
    }

    showAlert(alertType, alertMessage){
        this.setState({alertIsOpen: true, alertType, alertMessage})
        setTimeout(() => this.setState({alertIsOpen:false}) , 2000);
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
        const {modalIsOpen, modalContent, alertIsOpen, alertMessage, alertType} = this.state
        return <div> 
            <Alert alertIsOpen={alertIsOpen} type={alertType} message={alertMessage}  />
            {this.state.runProcess ? <LoadingPage /> : (this.state.newNote ? this.newNoteRender() : this.showNoteRender())}
            <MhtModal 
                closeModal={event => this.setState({modalIsOpen: false})}
                modalIsOpen={modalIsOpen}
                modalTitle='Opps! Something is wrong..'
                modalContent={modalContent}
            />
        </div>
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
        const {selectedNote, searchText, notes} = this.state
        return (
            <div className="row">
                <div className="col-md-8">
                    <h2>Tolga Stok</h2> <br/>
                    <SearchNote showNote={this.showNote.bind(this)} selectedNotem={selectedNote} UpdateSearch={e=>this.setState({searchText: e})} 
                    searchText={searchText}
                    notes={notes} />
                    <hr/>
                    {this.checkForNote()}
                    <button type="button"
                        className="btn btn-success delete-note"
                        onClick={e => this.setState({newNote:true})}>New Item</button>
                </div>
                <div className="col-md-4">
                    <RecentlyAdded notes={notes}  selectedNotem={selectedNote}
                                   showNote={this.showNote.bind(this) }
                    />
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
