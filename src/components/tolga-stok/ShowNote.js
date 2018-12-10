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

    render() {
        const {selectedNotem, sizes, editSize, addMyStock} = this.props
        const sizeTmp = sizes.map(size=> <div>
            <div className={"size " + (size.active ? "active-size": "deactive-size")} data-toggle="tooltip" title="s">{size.name}</div>
            <input className="size-adet" type="number" value={size.adet} onChange={(event)=> editSize(event, size)} /> 
        </div> )

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
                                
                                <h6 className="price">stock code:  {selectedNotem.stokKodu}</h6>
                                <h6 className="price">current price: <span>{selectedNotem.price} TL</span></h6>
                                <h4 className="sizes">sizes:<br/>{sizeTmp}</h4>
                                <h6 className="price">description: </h6> <p className="product-description">{selectedNotem.description}</p>
                                <div class="action">
                                    <button class="add-to-cart btn btn-default" onClick={e=> addMyStock(selectedNotem)} type="button">Update My Stock</button>
                                </div>
                                <br />
                                <small><strong>Sizes:</strong> Yeşil olanlar stokta olanlar. Kırmızılar ise olmalanlar. Tıklayıp renk değiştirebilir. sonrada aşağıdaki butona basıp kaydedersiniz.</small>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
