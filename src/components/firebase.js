import * as firebase from 'firebase'
import 'firebase/firestore'

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

// server url
//let url = 'http://178.62.203.163:3005/'
const url = 'http://localhost:3005/' // TEST

const db = firebase.database();
const dbf = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

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

function CheckProcessRun(callback){
  db.ref('tolga/saw/data-processing').on('value', snapshot => {
    let data = snapshot.val()
    callback(data)
  })
}


function GetDataSaw(callback){
  fetch(url).then(function(response) {
    return response.json()
  }).then(function(myJson) {
    callback(myJson)
  }).catch(e=> console.log(e))
}

function GetDataTolgaStok(callback){
  fetch(url+'getStokTolga').then(function(response) {
    return response.json()
  }).then(function(myJson) {
    callback(myJson)
  }).catch(e=> console.log(e))
}

function addTotaStok(item, callback){
  fetch(url+'addStokFromSawTolga', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then(e=> callback(e))
}

function GetTolgaItemSizes(stokKodu, callback){
  fetch(url+'getItemSizesTolga/'+ stokKodu).then(function(response) {
    return response.json()
  }).then(function(myJson) {
    callback(myJson)
  }).catch(e=> console.log(e))
}

async function addNewItemTolga(data, callback){
  // burda kaldık data buraya geliyor. burdan servera gönderilecek.
  const uploadedPics = []
  let index = 0
  for (const img of data.files) {
    await storage.ref('/pics').child(data.stokKodu).child(index+".jpg").put(img).then(e=> uploadedPics.push(e.downloadURL))
    index++
  }
  data.images = uploadedPics
  data.thumbImg = uploadedPics[0]
  data.newItem = true
  fetch(url+'newItemTolga', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(e=> callback(e))
}

/// AMNİ STORE

function GetDataAmniStok(callback){
  fetch(url+'getStokAmni').then(function(response) {
    return response.json()
  }).then(function(myJson) {
    callback(myJson)
  }).catch(e=> console.log(e))
}

function addAmniStok(item, callback){
  fetch(url+'addStokFromSawAmni', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then(e=> callback(e))
}

function GetAmniItemSizes(stokKodu, callback){
  fetch(url+'getItemSizesAmni/'+ stokKodu).then(function(response) {
    return response.json()
  }).then(function(myJson) {
    callback(myJson)
  }).catch(e=> console.log(e))
}

async function addNewItemAmni(data, callback){
  // burda kaldık data buraya geliyor. burdan servera gönderilecek.
  const uploadedPics = []
  let index = 0
  for (const img of data.files) {
    await storage.ref('/pics').child(data.stokKodu).child(index+".jpg").put(img).then(e=> uploadedPics.push(e.downloadURL))
    index++
  }
  data.images = uploadedPics
  data.thumbImg = uploadedPics[0]
  data.newItem = true
  fetch(url+'newItemAmni', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(e=> callback(e))
}

export {
  db,
  dbf,
  auth,
  GetDataSaw,
  GetBuySellData,
  GetAltcoinBuySellData,
  GetServers,
  GetCode,
  CheckProcessRun,
  // Tolga Stok
  GetDataTolgaStok,
  addTotaStok,
  GetTolgaItemSizes,
  addNewItemTolga,
  // Amni Stok
  GetDataAmniStok,
  addAmniStok,
  addNewItemAmni
}