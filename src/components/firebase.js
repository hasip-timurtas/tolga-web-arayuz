import * as firebase from 'firebase'
import 'firebase/firestore'
import moment from 'moment'

const config = {
    apiKey: "AIzaSyDxDY2_n2XA4mF3RWTFXRuu0XrLCkYYG4s",
    authDomain: "firem-b3432.firebaseapp.com",
    databaseURL: "https://firem-b3432.firebaseio.com",
    projectId: "firem-b3432",
    storageBucket: "firem-b3432.appspot.com",
    messagingSenderId: "866789153670"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}



const db = firebase.database();
const dbf = firebase.firestore();
const auth = firebase.auth();

function GetNotes(callback){
  fetch('http://178.62.203.163:3005/').then(function(response) {
    return response.json()
  }).then(function(myJson) {
    callback(myJson)
  }).catch(e=> console.log(e))
}

function CheckProcessRun(callback){
  db.ref('tolga/saw/data-processing').on('value', snapshot => {
    let data = snapshot.val()
    callback(data)
  })
}

//moment.lang("en-US")

function GetBuySellData(callback){
  db.ref('cry').child('buy-sell').on('value', snapshot => {
    let data = snapshot.val()
    if(!data) return callback([])

    const list = []
    Object.keys(data).filter(e=>{
      const data2 = data[e]
      Object.keys(data2).filter(a=> list.push(data2[a]))
    })

    list.sort((a,b)=> +b.totalUygun - +a.totalUygun)
    callback(list)
  })
}

function GetAltcoinBuySellData(callback){
  db.ref('cry').child('altcoin-buy-sell').on('value', snapshot => {
    let data = snapshot.val()
    if(!data) return callback([])

    const list = []
    Object.keys(data).filter(e=>{
      const data2 = data[e]
      Object.keys(data2).filter(a=> list.push(data2[a]))
    })

    list.sort((a,b)=> +b.totalUygun - +a.totalUygun)
    callback(list)
  })
}

function GetServers(callback){
  db.ref('servers').child(auth.currentUser.uid).on('value', snapshot => {
    const data = snapshot.val()
    if(!data) return callback([])
    const result = Object.keys(data).map(e=> ({ ...data[e], fbId: e}) ).sort((a,b)=> a.sira - b.sira)
    callback(result)
  })
}

function GetCode(callback){
  db.ref('cry/eval-buy-sell').once('value').then(snapshot => callback(snapshot.val()))
}

export {
  db,
  dbf,
  auth,
  GetNotes,
  GetBuySellData,
  GetAltcoinBuySellData,
  GetServers,
  GetCode,
  CheckProcessRun
}