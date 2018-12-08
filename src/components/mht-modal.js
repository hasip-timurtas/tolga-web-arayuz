import React,{Component} from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#dangerModal')
class MhtModal extends Component{
    render(){
        return (
        <Modal
            isOpen={this.props.modalIsOpen}
            //onAfterOpen={this.props.afterOpenModal.bind(this)}
            onRequestClose={this.props.closeModal.bind(this)}
            //style={customStyles}
            className="modal"
            contentLabel="Example Modal"
          >
          <div className="modal-dialog modal-danger" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{this.props.modalTitle}</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <h4 id="modalContent">{this.props.modalContent}</h4>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.props.closeModal.bind(this)} data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </Modal>
        )
    }
}

export default MhtModal;