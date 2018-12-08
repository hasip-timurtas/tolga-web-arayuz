import React from 'react';
import { auth, db, GetNotes } from '../firebase'
import "./style.css"
export default class ShowNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.selectedNotem.title,
            content: this.props.selectedNotem.content
        };
    }
    
    render() {
        const {selectedNotem} = this.props
        const sizes = selectedNotem.validBedens.map(e=> <span className="size" data-toggle="tooltip" title={e}>{e}</span>)
        const images = selectedNotem.images.map((e, i)=> <div className="tab-pane" id={"pic-"+i}><img src={e} /></div>)
        const thumbs = selectedNotem.images.map((e, i)=> <li><a data-target={"pic-"+i} data-toggle="tab"><img src={e} /></a></li>)
        return (
            <div className="show-note">
                <div className="card">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                
                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1"><img src={selectedNotem.thumbImg} /></div>
                                    {images}
                                </div>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    {thumbs}
                                </ul>
                                
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">{selectedNotem.name}</h3>
                                <p className="product-description">{selectedNotem.description}</p>
                                <h4 className="price">current price: <span>{selectedNotem.price} TL</span></h4>
                                <h5 className="sizes">sizes:
                                    {sizes}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
