import React, { Component } from 'react'
import { db, auth } from '../components/firebase'
import Nav from './nav.js'
import "./style.css"
import "./xterm-style.css"
//const DashboardLayout = props =>{
class DashboardLayout extends Component {
  render(){
    console.log(this.props)
    return(
    <div className="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
      <header className="app-header navbar">
        <button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#">
          <img className="navbar-brand-full" src="/panel/img/brand/logo.svg" width={89} height={25} alt="CoreUI Logo" />
          <img className="navbar-brand-minimized" src="/panel/img/brand/sygnet.svg" width={30} height={30} alt="CoreUI Logo" />
        </a>
        <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
          <span className="navbar-toggler-icon" />
        </button>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item px-3">
            <a className="nav-link" href="#">Dashboard</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#">Users</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#">Settings</a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#">
              <i className="icon-bell" />
              <span className="badge badge-pill badge-danger">5</span>
            </a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#">
              <i className="icon-list" />
            </a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#">
              <i className="icon-location-pin" />
            </a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-header text-center">
                <strong>Account</strong>
              </div>
              <a className="dropdown-item" href="#">
                <i className="fa fa-bell-o" /> Updates
                <span className="badge badge-info">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-envelope-o" /> Messages
                <span className="badge badge-success">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-tasks" /> Tasks
                <span className="badge badge-danger">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-comments" /> Comments
                <span className="badge badge-warning">42</span>
              </a>
              <div className="dropdown-header text-center">
                <strong>Settings</strong>
              </div>
              <a className="dropdown-item" href="#">
                <i className="fa fa-user" /> Profile</a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-wrench" /> Settings</a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-usd" /> Payments
                <span className="badge badge-secondary">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-file" /> Projects
                <span className="badge badge-primary">42</span>
              </a>
              <div className="divider" />
              <a className="dropdown-item" href="#">
                <i className="fa fa-shield" /> Lock Account</a>
              <a className="dropdown-item" href="#" onClick={event=>auth.signOut()} >
                <i className="fa fa-lock" /> Logout</a>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler aside-menu-toggler d-md-down-none" type="button" data-toggle="aside-menu-lg-show">
          <span className="navbar-toggler-icon" />
        </button>
        <button className="navbar-toggler aside-menu-toggler d-lg-none" type="button" data-toggle="aside-menu-show">
          <span className="navbar-toggler-icon" />
        </button>
      </header>
      <div className="app-body">
          <div className="sidebar">
            <Nav />
            <button className="sidebar-minimizer brand-minimizer" type="button"> Yana Kaydır</button>
          </div>
          <main className="main">
            {/* Breadcrumb*/}
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">
                <a href="#">Admin</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
              {/* Breadcrumb Menu*/}
              <li className="breadcrumb-menu d-md-down-none">
                <div className="btn-group" role="group" aria-label="Button group">
                  <a className="btn" href="#">
                    <i className="icon-speech" />
                  </a>
                  <a className="btn" href="./">
                    <i className="icon-graph" /> &nbsp;Dashboard</a>
                  <a className="btn" href="#">
                    <i className="icon-settings" /> &nbsp;Settings</a>
                </div>
              </li>
            </ol>
            <div className="container-fluid" > 
            
            
                  {this.props.children}
            
            
            </div>
          </main>
          <aside className="aside-menu">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#timeline" role="tab">
                  <i className="icon-list" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#messages" role="tab">
                  <i className="icon-speech" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#settings" role="tab">
                  <i className="icon-settings" />
                </a>
              </li>
            </ul>
            {/* Tab panes*/}
            <div className="tab-content">
              <div className="tab-pane active" id="timeline" role="tabpanel">
                <div className="list-group list-group-accent">
                  <div className="list-group-item list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</div>
                  <div className="list-group-item list-group-item-accent-warning list-group-item-divider">
                    <div className="avatar float-right">
                      <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div>Meeting with
                      <strong>Lucas</strong>
                    </div>
                    <small className="text-muted mr-3">
                      <i className="icon-calendar" />&nbsp; 1 - 3pm</small>
                    <small className="text-muted">
                      <i className="icon-location-pin" />&nbsp; Palo Alto, CA</small>
                  </div>
                  <div className="list-group-item list-group-item-accent-info">
                    <div className="avatar float-right">
                      <img className="img-avatar" src="/panel/img/avatars/4.jpg" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div>Skype with
                      <strong>Megan</strong>
                    </div>
                    <small className="text-muted mr-3">
                      <i className="icon-calendar" />&nbsp; 4 - 5pm</small>
                    <small className="text-muted">
                      <i className="icon-social-skype" />&nbsp; On-line</small>
                  </div>
                  <div className="list-group-item list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Tomorrow</div>
                  <div className="list-group-item list-group-item-accent-danger list-group-item-divider">
                    <div>New UI Project -
                      <strong>deadline</strong>
                    </div>
                    <small className="text-muted mr-3">
                      <i className="icon-calendar" />&nbsp; 10 - 11pm</small>
                    <small className="text-muted">
                      <i className="icon-home" />&nbsp; creativeLabs HQ</small>
                    <div className="avatars-stack mt-2">
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/2.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/3.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/4.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/5.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/6.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item list-group-item-accent-success list-group-item-divider">
                    <div>
                      <strong>#10 Startups.Garden</strong> Meetup</div>
                    <small className="text-muted mr-3">
                      <i className="icon-calendar" />&nbsp; 1 - 3pm</small>
                    <small className="text-muted">
                      <i className="icon-location-pin" />&nbsp; Palo Alto, CA</small>
                  </div>
                  <div className="list-group-item list-group-item-accent-primary list-group-item-divider">
                    <div>
                      <strong>Team meeting</strong>
                    </div>
                    <small className="text-muted mr-3">
                      <i className="icon-calendar" />&nbsp; 4 - 6pm</small>
                    <small className="text-muted">
                      <i className="icon-home" />&nbsp; creativeLabs HQ</small>
                    <div className="avatars-stack mt-2">
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/2.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/3.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/4.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/5.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/6.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                      <div className="avatar avatar-xs">
                        <img className="img-avatar" src="/panel/img/avatars/8.jpg" alt="admin@bootstrapmaster.com" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane p-3" id="messages" role="tabpanel">
                <div className="message">
                  <div className="py-3 pb-5 mr-3 float-left">
                    <div className="avatar">
                      <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                      <span className="avatar-status badge-success" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">Lukasz Holeczek</small>
                    <small className="text-muted float-right mt-1">1:52 PM</small>
                  </div>
                  <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                  <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
                </div>
                <hr />
                <div className="message">
                  <div className="py-3 pb-5 mr-3 float-left">
                    <div className="avatar">
                      <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                      <span className="avatar-status badge-success" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">Lukasz Holeczek</small>
                    <small className="text-muted float-right mt-1">1:52 PM</small>
                  </div>
                  <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                  <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
                </div>
                <hr />
                <div className="message">
                  <div className="py-3 pb-5 mr-3 float-left">
                    <div className="avatar">
                      <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                      <span className="avatar-status badge-success" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">Lukasz Holeczek</small>
                    <small className="text-muted float-right mt-1">1:52 PM</small>
                  </div>
                  <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                  <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
                </div>
                <hr />
                <div className="message">
                  <div className="py-3 pb-5 mr-3 float-left">
                    <div className="avatar">
                      <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                      <span className="avatar-status badge-success" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">Lukasz Holeczek</small>
                    <small className="text-muted float-right mt-1">1:52 PM</small>
                  </div>
                  <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                  <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
                </div>
                <hr />
                <div className="message">
                  <div className="py-3 pb-5 mr-3 float-left">
                    <div className="avatar">
                      <img className="img-avatar" src="/panel/img/avatars/7.jpg" alt="admin@bootstrapmaster.com" />
                      <span className="avatar-status badge-success" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">Lukasz Holeczek</small>
                    <small className="text-muted float-right mt-1">1:52 PM</small>
                  </div>
                  <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                  <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
                </div>
              </div>
              <div className="tab-pane p-3" id="settings" role="tabpanel">
                <h6>Settings</h6>
                <div className="aside-options">
                  <div className="clearfix mt-4">
                    <small>
                      <b>Option 1</b>
                    </small>
                    <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                      <input className="switch-input" type="checkbox" defaultChecked />
                      <span className="switch-slider" data-checked="On" data-unchecked="Off" />
                    </label>
                  </div>
                  <div>
                    <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
                  </div>
                </div>
                <div className="aside-options">
                  <div className="clearfix mt-3">
                    <small>
                      <b>Option 2</b>
                    </small>
                    <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                      <input className="switch-input" type="checkbox" />
                      <span className="switch-slider" data-checked="On" data-unchecked="Off" />
                    </label>
                  </div>
                  <div>
                    <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
                  </div>
                </div>
                <div className="aside-options">
                  <div className="clearfix mt-3">
                    <small>
                      <b>Option 3</b>
                    </small>
                    <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                      <input className="switch-input" type="checkbox" />
                      <span className="switch-slider" data-checked="On" data-unchecked="Off" />
                    </label>
                  </div>
                </div>
                <div className="aside-options">
                  <div className="clearfix mt-3">
                    <small>
                      <b>Option 4</b>
                    </small>
                    <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                      <input className="switch-input" type="checkbox" defaultChecked />
                      <span className="switch-slider" data-checked="On" data-unchecked="Off" />
                    </label>
                  </div>
                </div>
                <hr />
                <h6>System Utilization</h6>
                <div className="text-uppercase mb-1 mt-4">
                  <small>
                    <b>CPU Usage</b>
                  </small>
                </div>
                <div className="progress progress-xs">
                  <div className="progress-bar bg-info" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <small className="text-muted">348 Processes. 1/4 Cores.</small>
                <div className="text-uppercase mb-1 mt-2">
                  <small>
                    <b>Memory Usage</b>
                  </small>
                </div>
                <div className="progress progress-xs">
                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '70%'}} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <small className="text-muted">11444GB/16384MB</small>
                <div className="text-uppercase mb-1 mt-2">
                  <small>
                    <b>SSD 1 Usage</b>
                  </small>
                </div>
                <div className="progress progress-xs">
                  <div className="progress-bar bg-danger" role="progressbar" style={{width: '95%'}} aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <small className="text-muted">243GB/256GB</small>
                <div className="text-uppercase mb-1 mt-2">
                  <small>
                    <b>SSD 2 Usage</b>
                  </small>
                </div>
                <div className="progress progress-xs">
                  <div className="progress-bar bg-success" role="progressbar" style={{width: '10%'}} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <small className="text-muted">25GB/256GB</small>
              </div>
            </div>
          </aside>
        </div>
        <footer className="app-footer">
          <div>
            <a href="https://coreui.io">CoreUI</a>
            <span>© 2018 creativeLabs.</span>
          </div>
          <div className="ml-auto">
            <span>Powered by</span>
            <a href="https://coreui.io">CoreUI</a>
          </div>
        </footer>
    </div>)
  }
}

export default DashboardLayout