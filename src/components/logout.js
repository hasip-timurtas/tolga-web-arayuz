import React, { Component } from 'react';
import { auth } from './firebase'

class Logout extends Component {
  render() {
    auth.signOut()
    return(1)    
  }
}

export default Logout;
