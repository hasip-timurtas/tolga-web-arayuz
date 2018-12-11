/*
 -- İlk önce ana sayfadaki has-product-count ul unu okucaz içindeki li ve a ların textlerini alıcaz
 -- textlerdeki sayıları toplıcaz toplam ürün.
 -- textlerdeki linklere giricez. ürün sayfalarındaki ürünleri alıcaz.
 -- her ürüne tek tek girip ürün detaylarını alıcaz.

*/
const mongodb = require('mongodb')
const cheerio = require('cheerio')
const rp = require('request-promise')
const mongoUrl = "mongodb://95.85.32.248:1453/"
const translate = require('translate');
translate.engine = 'google';
translate.key = 'AIzaSyD7I2V6skf88SZ49OjyRF4EyS_ensU-6A8';
const firebase = require('firebase-admin')
const serviceAccount = require("./firebase.json")
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://firem-b3432.firebaseio.com"
})

class Saw {
    async LoadVariables(){
        const connection = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        const cnn = connection.db('tolg')
        this.silinenler = cnn.collection('stok-bitenler')
        this.stokAzalanlar = cnn.collection('stok-azalanlar')
        this.data = cnn.collection('data')
        this.counter = 0
        this.eskiData = await this.data.find().toArray()
        this.db = firebase.database()
    }

    async Basla(){
        this.db.ref('tolga/saw/data-processing').set(true)
        console.log('Veritabanına bağlandı saw dan data yükleme başlıyor.')
        await this.data.deleteMany({})
        const body = await this.GetPage('https://saw.com.tr/magaza/?min_price=0&max_price=9999&per_page=9999') // ALL PRODUCTS
        const jQuery = cheerio.load(body)
        jQuery('.sidebar-inner').remove()
        const $urunler = jQuery(".product-image-link").toArray()
        const urunLinkler = $urunler.map(e=> e.attribs.href)
        for (const link of urunLinkler) {
            await this.UrunGetirVeKaydet(link).catch(e=> console.log(link, e.message))
            if(this.counter == 5){
                //break
            }
        }

        await this.EskiYeniKarsilastir()
        this.db.ref('tolga/saw/data-processing').set(false)
        console.log('BİTTİ')
    }

    async UrunGetirVeKaydet(link){
        const body = await this.GetPage(link) // ALL PRODUCTS
        const jQuery = cheerio.load(body)
        jQuery('.related-products').remove()
        jQuery('.whb-main-header').remove()
        const name = jQuery('.product_title').text()
        const kategori = jQuery('.posted_in a').text()
        const stokKodu = jQuery('.sku_wrapper span').text()
        const $validBedens =  jQuery('.variations_form').data('product_variations')
        if(!$validBedens) return // product variationsu olmayanları geç bunlar Aksesuarlar.
        //const price = jQuery('.woocommerce-Price-amount')[2].innerText.replace(' ₺','')
        if(!$validBedens[0]) return // Bu ürün şu anda stokta yok veya mevcut değil.
        const price = $validBedens[0]["display_price"]
        const validBedens = $validBedens.map(e=> ({beden:e.attributes.attribute_pa_beden, adet:1}))
        const $images = jQuery('.woocommerce-product-gallery__image').toArray()
        const images = $images.map(e=> e.attribs['data-thumb'].replace('-316x474',''))
        const thumbImg = $images[0].attribs['data-thumb']
        const description = jQuery('.woocommerce-Tabs-panel--description').text().trim()
        const data = {name, price, kategori, stokKodu, validBedens, images, description, thumbImg}
        await this.UrunKaydetDb(data)
        this.counter++
    }

    async UrunKaydetDb(data){
        data.description = await translate(data.description, { from: 'tr', to: 'en' })
        await this.data.insertOne(data)
    }

    async EskiYeniKarsilastir(){
        if(!this.eskiData) return
        this.yeniData = await this.data.find().toArray()
        const eklenenUrun = []
        const silinenUrun = []
        const eklenenBeden = []
        const silinenBeden = []
        /*
         ESKİ YENİ DATA KARŞILAŞTIRMASI
         -- ESKİDE ürün olupta yenide olmayanlar bulunacak  # MAĞAZADA ARTIK O ÜRÜN YOK.  #Koşul1
         -- ESKİDE beden olupta yenide olmayanlar bulunacak # beden STOK'tan düştü.       #Koşul2
        */

        for (const eski of this.eskiData) {
            const yeni = this.yeniData.find(e=> e.stokKodu == eski.stokKodu)
            if(!yeni){
                // #Koşul1
                // ürün yeni ürünlerde yok. Yani mağazada yok. bu ürünü ebaydan felan kaldır.
                silinenUrun.push(eski.stokKodu)
            }else{
                // ürün yeni ürünlerde halen var. bedenleri kontrol et.
                // eski validBedens = [s,l,xl]
                // yeni validBedens = [xl]
                const eskiValidBeden = eski.validBedens
                const yeniValidBedens = yeni.validBedens

                for (const eskiBeden of eskiValidBeden) {
                    const result = yeniValidBedens.find(e=> e == eskiBeden)
                    if(!result){
                        // #Koşul2
                        // Eski beden yeni ürün bedeninde yoksa bu bedeni stoktan düş. ebayde felan sil.  
                        silinenBeden.push({stok: eski.stokKodu, beden: eskiBeden})
                    }
                }
            }
        }

        /*
         -- YENİDE ürün olupta eskide olmayanlar bulunacak  # MAĞAZAYA YENİ ÜRÜN EKLENDİ. #Koşul3
         -- YENİDE beden olupta eskide olmayanlar bulunacak # STOK'a yeni beden eklendi.  #Koşul4
        */

        for (const yeni of this.yeniData) {
            const eski = this.eskiData.find(e=> e.stokKodu == yeni.stokKodu)
            if(!eski){
                // #Koşul3
                // yeni ürün gelmiş! Eskilerde yok. Yeni ürün olacak eklenecek. ebaye felan.
                eklenenUrun.push(yeni.stokKodu)
            }else{
                // ürün eski ürünlerde halen var. bedenleri kontrol et.
                // eski validBedens = [s,l,xl]
                // yeni validBedens = [xl]
                const eskiValidBeden = eski.validBedens
                const yeniValidBedens = yeni.validBedens

                for (const yeniBeden of yeniValidBedens) {
                    const result = eskiValidBeden.find(e=> e == yeniBeden)
                    if(!result){
                        // #Koşul4
                        // eski ürüne yeni beden eklemnmiş bu bedeni ebayde felan eski ürüne ekle. 
                        eklenenBeden.push({stok: yeni.stokKodu, beden: yeniBeden})
                    }
                }
            }
        }        

        
        console.log('eski yeni karlilaştır.')
        console.log('eklenenUrun: ', eklenenUrun, 'silinenUrun:', silinenUrun, 'eklenenBeden: ',eklenenBeden, 'silinenBeden: ', silinenBeden )
        
    }
    
    async GetPage(url){
        return await rp(url).catch(e=> console.log(e))
    }

    sleep (saniye) {
		return new Promise(resolve => setTimeout(resolve, saniye * 1000))
    }
}

async function Basla(){
    const saw = new Saw()
    await saw.LoadVariables()
    saw.Basla()
    /*
    while(true){
        saw.Basla()
        await saw.sleep(60 * 60 * 24) // 24 saatte bir datayı yükle.
    }
    
    */
}

Basla()