import React, { Component } from 'react'
import { auth } from './firebase'
import {MhtModal} from './mht-modal'

class Login extends Component {
    constructor() {
      super();

      this.state = {
        modalIsOpen: false,
        modalContent:''
      };
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            //this.setState({user})
            if(!user) {
            //this.userHasAuthenticated(false);
            console.log('user yok')
            }
        });
    }

    loginHandle(event){
      event.preventDefault();
      // $('#dangerModal').modal('toggle');

      var email = event.target.email.value.trim();
      var pass = event.target.pass.value.trim();
      if(!email || !pass){
        this.setState({
          modalIsOpen: true,
          modalContent: 'Lütfen bütün alanları eksiksiz doldurunuz. '
        });
        return
      }

      
      auth.signInWithEmailAndPassword(email, pass).then(e=> {
          console.log('Giriş başarılı panele yönlendir');
          console.log(this)
          this.props.history.push('/')
      }).catch(error=> {
        this.setState({
          modalIsOpen: true,
          modalContent: error.message
        });
      })

        
    }

    openModal(event) {
        //event.preventDefault();
        this.setState({modalIsOpen: true});
    }

    render() {
    const {modalIsOpen, modalContent} = this.state
    return (<div className="app flex-row align-items-center">
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <form onSubmit={this.loginHandle.bind(this)}>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-user" />
                        </span>
                      </div>
                      <input name="email" type="text" className="form-control" placeholder="E-mail" />
                    </div>
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock" />
                        </span>
                      </div>
                      <input name="pass" type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">Login</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                <div className="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Sign up is not available for now <br />Sen gelme ulan ayı</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MhtModal 
        closeModal={event => this.setState({modalIsOpen: false})}
        modalIsOpen={modalIsOpen}
        modalTitle='Opps! Something is wrong..'
        modalContent={modalContent}
       />
      </div>
    );
  }
}

export default Login;
