import React, { Component } from 'react'
import LoadingPage from '../loading'
import socketIOClient from "socket.io-client"
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import "xterm/dist/xterm.css"
import "./xterm2.css"
import {db, auth, GetServers, GetCode } from '../firebase'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//import "bootstrap/dist/css/bootstrap.css"
Terminal.applyAddon(fit);
let term
const socketIoUrl = 'http://95.85.32.248:4000' // CPANEL DE ÇALIŞIYOR.
/*
import "./xterm.js"
import "./addons/fit/fit.js"
*/

class Terminals extends Component {
    constructor() {
      super();

      this.state = {
        loading: false,
        hesaps:false,
        selectedHesap:false,
        orderHistory:false,
        data: [],
        servers: [],
        selectedServer: false,
        value: 0,
        code: "",
        codeOncekiHali:""
      };
    }

    componentDidMount(){
        GetServers(servers=> {this.setState({servers ,loading:false})})
        GetCode(code =>this.setState({code, codeOncekiHali: code}))
    }

    sshLogin(selectedServer){
        const socket = socketIOClient(socketIoUrl)
        document.getElementById("terminal-container").innerHTML = "";
        var terminalContainer = document.getElementById("terminal-container");
        term = new Terminal()
        //var term = new Terminal();
        term.open(terminalContainer);
        term.fit();

        socket.on('connect', function () {
            term.write('\r\n*** Connected to backend***\r\n');

            // Browser -> Backend
            term.on('data', function (data) {
                //console.log(data);
//                        alert("Not allowd to write. Please don't remove this alert without permission of Ankit or Samir sir. It will be a problem for server'");
                socket.emit('data', data);
            });

            // Backend -> Browser
            socket.on('data', function (data) {
                term.write(data);
            });

            socket.on('disconnect', function () {
                term.write('\r\n*** Disconnected from backend***\r\n');
            });

            socket.emit('login', selectedServer)
        });
    }

    handleChange = (event, value) => {
        const hostName = event.target.textContent
        const selectedServer = this.state.servers.find(e=> e.name == hostName)
        this.setState({value, selectedServer})
        if(!selectedServer){
            document.getElementById("terminal-container").innerHTML = "";
            return
        }
        this.sshLogin(selectedServer)
    };

      
    render(){
        const {servers, value, selectedServer} = this.state
        const getTabs = servers.map(e=> <Tab label={e.name} key={e.fbId}/>)
        return (
            <div className="main-terminal"> 
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange.bind(this)}>
                        <Tab label="Server Ekle"/>
                        {getTabs}
                    </Tabs>
                </AppBar>
                {!selectedServer && this.newNoteRender()}
                <div className="terminal-container" id="terminal-container"></div>
                {selectedServer && this.runScriptRender()}
            </div>
            
        )
    }

    addServer(event) {
        event.preventDefault();
        var name = this.refs.name.value.trim()
        var host = this.refs.host.value.trim()
        var username = this.refs.username.value.trim()
        var password = this.refs.password.value.trim()
        //Meteor.call("newNote", title, content); NEW NOTE
        const newServer = {
            name,
            host,
            username,
            password,
            port:22
        }
        db.ref('servers').child(auth.currentUser.uid).push(newServer)
        this.refs.name.value = "";
        this.refs.host.value = "";
        this.refs.username.value = "";
        this.refs.password.value = "";
    }
    

    newNoteRender() {
        return (
            <form className="new-note" onSubmit={this.addServer.bind(this)}>
                <br />
                <div className="row">
                    <div className="col-md-4 form-group">
                        <input type="text" className="form-control" name="name" placeholder="name" ref="name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 form-group">
                        <input type="text" className="form-control" name="host" placeholder="host" ref="host"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 form-group">
                        <input type="text" className="form-control" name="username" placeholder="username" ref="username"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 form-group">
                        <input type="text" className="form-control" name="password" placeholder="password" ref="password"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1 form-group">
                            <button type="submit" className="btn btn-success add-post">Server ekle</button>
                    </div>
                </div>
            </form>
        )
    }

    runScript(event) {
        const {code, codeOncekiHali} = this.state
        let code2 = code
        if(code == codeOncekiHali){
            code2 = code+ " "
        }
        this.setState({codeOncekiHali: code2, code: code2})
        db.ref('cry/eval-buy-sell').set(code2)
        event.preventDefault();
    }
    
    runScriptRender(){

        return (
                <form className="new-note" onSubmit={this.runScript.bind(this)}>
                    <br />
                    <div className="row">
                        <div className="col-md-4 form-group">
                            <textarea className="form-control" value={this.state.code} onChange={e=> this.setState({code: e.target.value})} name="content" placeholder="Code" rows="5" ref="content"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1 form-group">
                                <button type="submit" className="btn btn-success add-post">Çalıştır</button>
                        </div>
                    </div>
                </form>
        )
    }
}

function TabContainer(props) {
    console.log(props.value)
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

export default Terminals

const SingleButton = ({data, changeServerHandler}) =>{
    return (
        <div className="col-md-1 form-group">
            <button type="button" className="btn btn-success add-post" onClick={e=> changeServerHandler(data.name)}>Server-{data.name}</button>
        </div>
    )
}

const SingleCoin = ({data, changeMarketHandler})=> {
    const firstClassName = data.firstMarket.totalUygun ? 'table-success' : 'table-danger' //table-success
    const secondClassName = data.secondMarket.totalUygun ? 'table-success' : 'table-danger' //table-success
    const firstLink = "https://www.cryptopia.co.nz/Exchange?market=" + data.firstName.replace('/','_')
    const secondLink = "https://www.cryptopia.co.nz/Exchange?market=" + data.secondName.replace('/','_')
    return (
        <tr>
            <td><a href={firstLink} target="_blank">{data.firstName}</a><table><tbody><tr><td>{data.firstMarket.price}</td><td>{data.firstMarket.amount}</td><td className={firstClassName}>{data.firstMarket.total}</td></tr></tbody></table></td>
            <td><a href={secondLink} target="_blank">{data.secondName}</a><table><tbody><tr><td>{data.secondMarket.price}</td><td>{data.secondMarket.amount}</td><td className={secondClassName}>{data.secondMarket.total}</td></tr></tbody></table></td>
            <td>{data.fark}</td>
        </tr>
    )
}

