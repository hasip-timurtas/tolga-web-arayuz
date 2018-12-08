import { auth, db } from '../firebase'

export async function getHesaps(start,limit){
    if(auth.currentUser){
        const userMarkets = await db.ref('hesaplar').child(auth.currentUser.uid).once('value').then(snapshot => snapshot.val())
        return userMarkets
    }
    return null
}

export async function getOrderHistory(hesap){
    const ordersUrl = `${hesap.site}-bot/${hesap.name}/order-history`
    return await db.ref(ordersUrl).once('value').then(snapshot => snapshot.val())
}