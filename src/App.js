import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect   } from 'react-router-dom';
import { db, auth } from './components/firebase'
import Logout from './components/logout'
import Login from './components/login'
import DashboardLayout from './layouts/dashboard-layout'
import EmptyLayout from './layouts/empty-layout'
import LoadingPage from './components/loading'
import SawApp from './components/saw/saw-app'
import TolgaStok from './components/tolga-stok/tolga-app'
import AmniStok from './components/amni-stok/amni-app'

class App extends Component {

  constructor(){
    super()
    this.state = {
      speed: '',
      user:0,
      authed: false, //authUser ? true : false,
      loading: true,
      admin:false
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setState({ authed: true, loading: false })
        if(user.email == 'hasip.timurtas@gmail.com'){
          this.setState({admin:true})
        }else{
          this.setState({admin:false})
        }
      } else {
        this.setState({ authed: false, loading: false })
      }
    })
  }

  render = () => this.state.loading ? <LoadingPage /> : <Routerlerim  authed={this.state.authed}/>
}

export default App;

const Routerlerim = ({authed}) =>
    <Router>
        <Switch>
          <PrivateRoute authed={authed} exact path='/(tolga-stok|)' layout={DashboardLayout} component={TolgaStok} />
          <PrivateRoute authed={authed} exact path='/amni-stok' layout={DashboardLayout} component={AmniStok} />
          <PrivateRoute authed={authed} exact path='/saw-stok' layout={DashboardLayout} component={SawApp} />
          <PrivateRoute authed={authed} exact path='/logout' layout={DashboardLayout} component={Logout} />
          <PublicRoute authed={authed} path='/login' layout={EmptyLayout} component={Login} />
          <Route render={() => <h3>No Match</h3>} />
        </Switch>
    </Router>


const PrivateRoute =  ({component: Component, authed, layout: Layout, ...rest}) => 
  <Route {...rest} render={(props) => authed ? <Layout><Component {...props} /></Layout> : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}/>

const PublicRoute = ({component: Component, authed, layout: Layout, ...rest}) => 
  <Route {...rest} render={(props) => !authed ? <Layout><Component {...props} /></Layout> : <Redirect to='/' />} />

const AdminRoute =  ({component: Component, admin, layout: Layout, ...rest}) => 
  <Route {...rest} render={(props) => admin ? <Layout><Component {...props} /></Layout> : <Redirect to={{pathname: '/', state: {from: props.location}}} />}/>
