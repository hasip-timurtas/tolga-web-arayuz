const mongodb = require('mongodb')
const express = require("express");
const mongoUrl = "mongodb://95.85.32.248:1453/"

const app = express()
const port = 3005
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let tolgaStok
let amniStok

async function Basla() {
    // this is our MongoDB database
    const connection = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true })
    const cnn = connection.db('tolg')
    const data = cnn.collection('data')
    tolgaStok = cnn.collection('tolga-stok')
    amniStok = cnn.collection('amni-stok')

    app.get('/getSawData', async (req, res) => {
        const allData = await data.find().toArray()
        return res.send(allData)
    })

    app.get('/', (req, res) => {
        res.send('Api')
    })

    ManuelStok('Tolga')
    ManuelStok('Amni')

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

function ManuelStok(stokAdi){
    const getAllStokUrl = '/getStok' + stokAdi
    const addStokUrl = '/addStokFromSaw' + stokAdi
    const getItemSizesUrl = `/getItemSizes${stokAdi}/:stokKodu`
    const addNewItemUrl = '/newItem' + stokAdi

    app.get(getAllStokUrl, async (req, res) => {
        const allData = await tolgaStok.find().toArray()
        return res.send(allData)
    })

    app.get(getItemSizesUrl, async (req, res) => {
        const stokKodu = req.params.stokKodu
        const item = await tolgaStok.findOne({stokKodu})
        if(!item) return res.send("[]")
        return res.send(item.validBedens)
    })

    app.post(addStokUrl, async (req, res) => {
        const data = req.body
        // toganın databaseye ekle, varsa beden güncelle
        const item = await tolgaStok.findOne({stokKodu: data.stokKodu})
        if(!item){
            await tolgaStok.insertOne(data)
        }else{
           
            const eskiValidBeden = item.validBedens
            const yeniValidBedens = data.validBedens
            if(yeniValidBedens.length == 0){
                // aktif beden kalmadı ürüünü sil.
                await tolgaStok.removeOne({stokKodu: data.stokKodu})
                return res.send('ürün silindi')
            }
            await tolgaStok.replaceOne({stokKodu: item.stokKodu }, data)

        }
        res.send('POST request to the homepage')
    })

    app.post(addNewItemUrl, async (req, res) => {
        const data = req.body
        await tolgaStok.insertOne(data)
    })
}

Basla()