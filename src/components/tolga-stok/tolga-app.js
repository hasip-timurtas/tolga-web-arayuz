import React from 'react';
import RecentlyAdded from './RecentlyAdded';
import SearchNote from './SearchNote';
import ShowNote from './ShowNote';
import { auth, db, dbf, CheckProcessRun, GetDataTolgaStok, addTotaStok, addNewItem } from '../firebase'
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
        /*
        const sizes = fullSizes.filter(e=> {
            if(note.validBedens.includes(e.name)){
                e.active = true
            }
            return true
        })
        */

        const sizes = fullSizes.filter(e=> {
            const validSize = note.validBedens.find(a=> a.name == e.name)
            if(validSize){
                e.active = true
                e.adet = validSize.adet
            }else{
                e.adet = 0
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

    editSize(event, size){
        const adet = Number(event.target.value)
        const copy = this.state.sizes.slice()
        copy.find(e=> {
            if(e.name == size.name){
                if(adet > 0){
                    e.adet=adet
                    e.active = true
                }else{
                    e.active=false
                    e.adet=0
                }
                return true
            }
        })
        this.setState({sizes: copy})
    }

    addMyStock(item){
        item.validBedens = this.state.sizes.filter(e=> e.active).map(e=> ({name: e.name, adet: e.adet}))
        addTotaStok(item, e=> GetDataTolgaStok(notes=> this.setState({notes})))// sayfa ilk yüklendiğinde ve her process güncellendiğinde datayıda güncelle)
        
        if(item.validBedens.length == 0) this.setState({ selectedNote: [] }) // bedenden sıfır kaldıysa arka tarafta zaten refresh yapıyor sende selected noteyi refreshle
        this.showAlert('success', item.name +' başarıyla güncellendi')
    }

    showAlert(alertType, alertMessage){
        this.setState({alertIsOpen: true, alertType, alertMessage})
        setTimeout(() => this.setState({alertIsOpen:false}) , 3000);
    }

    showModal(modalTitle, modalContent){
        this.setState({modalIsOpen: true, modalTitle, modalContent})
        setTimeout(() => this.setState({modalIsOpen:false}) , 3000);
    }

    checkForNote() {
        // if there is a selected note then showNote will appear.
        if (this.state.selectedNote._id) {
            return <ShowNote selectedNotem={this.state.selectedNote}
                             selectedNote1={this.state.selectedNote1}
                             titleChange={this.titleChange.bind(this)}
                             contentChange={this.contentChange.bind(this)}
                             clearNote={this.clearNote.bind(this)}
                             editSize={(e,s)=> this.editSize(e,s)}
                             addMyStock={e=> this.addMyStock(e)}
                             sizes={this.state.sizes}
                             />;
        }
    }

    clearNote(){
        this.setState({ selectedNote: [] });
    }

    render(){
        const {modalIsOpen, modalTitle, modalContent} = this.state
        return <div> 
            {this.state.runProcess ? <LoadingPage /> : (this.state.newNote ? this.newNoteRender() : this.showNoteRender())}
            <MhtModal 
                closeModal={event => this.setState({modalIsOpen: false})}
                modalIsOpen={modalIsOpen}
                modalTitle={modalTitle}
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
        const {selectedNote, searchText, notes,  alertIsOpen, alertMessage, alertType} = this.state
        return (
            <div className="row">
                <div className="col-md-8">
                    <h2>Tolga Stok</h2> <br/>
                    <SearchNote showNote={this.showNote.bind(this)} selectedNotem={selectedNote} UpdateSearch={e=>this.setState({searchText: e})} 
                    searchText={searchText}
                    notes={notes} />
                    <hr/>
                    <Alert alertIsOpen={alertIsOpen} type={alertType} message={alertMessage}  />
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
        var name = this.refs.name.value.trim();
        var stokKodu = this.refs.stokKodu.value.trim();
        var price = this.refs.price.value.trim();
        var category = this.refs.category.value.trim();
        var sizes = this.refs.sizes.value.trim();
        var description = this.refs.description.value.trim();
        var files = Array.from(this.refs.file.files)

        const newNote = { name, stokKodu, price, category, sizes, description, files}
        addNewItem(newNote)
        this.setState({newNote:false})
    }
    

    newNoteRender() {
        return (
            <form className="new-note" onSubmit={this.addNote.bind(this)}>
                <div className="row">
                    <div className="col-md-6 form-group">
                            <input type="text" className="form-control" name="name" placeholder="name" ref="name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                            <input type="text" className="form-control" name="stokKodu" placeholder="stock code" ref="stokKodu"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                            <input type="text" className="form-control" name="price" placeholder="price" ref="price"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                            <input type="text" className="form-control" name="category" placeholder="category" ref="category"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <input type="text" className="form-control" name="sizes" placeholder="Sizes   -> virgülle ayırınız. örn: s,m,xl" ref="sizes"/> <small>eğer bir bedenden birden fazla varsa örneğin 2 tane small varsa s,s</small>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-md-12 form-group">
                        <input id="file" className="form-control" type="file" name="file" ref="file" accept="image/*" multiple />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 form-group">
                        <textarea className="form-control" name="description" placeholder="description" rows="5" ref="description"></textarea>
                    </div>
                </div>   
                <div className="row">
                    <div className="col-md-1 form-group">
                            <button type="submit" className="btn btn-success add-post">Add Item</button>
                    </div>
                    <div className="col-md-1 form-group">
                            <button type="submit" className="btn btn-danger add-post" onClick={e=> this.setState({newNote:false})} >Cancel</button>
                    </div>
                </div> 
            </form>
        )

    }
}
