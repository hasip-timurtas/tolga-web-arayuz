const mongodb = require('mongodb')
const express = require("express");
const mongoUrl = "mongodb://178.62.203.163:1453/"

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

async function Basla() {
    // this is our MongoDB database
    const connection = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true })
    const cnn = connection.db('tolg')
    const data = cnn.collection('data')
    const tolgaStok = cnn.collection('tolga-stok')

    app.get('/', async (req, res) => {
        const allData = await data.find().toArray()
        return res.send(allData)
    })

    app.get('/tolgaStok', async (req, res) => {
        const allData = await tolgaStok.find().toArray()
        return res.send(allData)
    })

    app.get('/getItemSizes/:stokKodu', async (req, res) => {
        const stokKodu = req.params.stokKodu
        const item = await tolgaStok.findOne({stokKodu})
        if(!item) return res.send("[]")
        return res.send(item.validBedens)
    })

    app.post('/addToTolgaStok', async (req, res) => {
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
            // Yenisi eskide yoksa ekle
            for (const yeniBeden of yeniValidBedens) {
                const result = eskiValidBeden.find(e=> e == yeniBeden)
                if(!result){
                    // yeni beden eskisinde yok ekle.
                    item.validBedens.push(yeniBeden)
                }
            }

            // eskisi yenide yoksa kaldır.
            for (const eskiBeden of eskiValidBeden) {
                const result = yeniValidBedens.find(e=> e == eskiBeden)
                if(!result){
                    // #Koşul2
                    // Eski beden yeni ürün bedeninde yoksa bu bedeni stoktan düş. ebayde felan sil.  
                    item.validBedens = item.validBedens.filter(e=> e !=eskiBeden)
                }
            }

            await tolgaStok.replaceOne({stokKodu: item.stokKodu }, item)

        }
        res.send('POST request to the homepage')
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

Basla()