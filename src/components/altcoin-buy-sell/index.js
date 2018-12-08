import React, { Component } from 'react'
//import { getHesaps, getOrderHistory } from './funcs'
import LoadingPage from '../loading'
import {GetAltcoinBuySellData } from '../firebase'

class BuySell extends Component {
    constructor() {
      super();

      this.state = {
        loading: false,
        hesaps:false,
        selectedHesap:false,
        orderHistory:false,
        data: []
      };
    }

    componentDidMount(){
        GetAltcoinBuySellData(hesaps=> {
            this.setState({hesaps, loading:false})
        })
    }

    render(){
        const {loading, hesaps, selectedHesap, orderHistory} = this.state
        let hesaplar 

        if(hesaps){
            hesaplar = hesaps.map((data,index) => <SingleCoin data={data} key={index} />)//<div key={index}>{coin.name} </div>);   //<SingleCoin coin={coin} key={coin._id} />
        }
        
        return loading ? <LoadingPage /> : <ListCoins coinler={hesaplar}/>
    }
}

export default BuySell


const ListCoins = ({coinler}) =>{
    return (
    <div>
        <h2>Hesaplar</h2>
        <table className="table table-responsive-sm table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>First Market</th>
                      <th>Second Market</th>
                      <th>Third Market</th>
                      <th>Fourth Market</th>
                      <th>Fark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coinler}
                  </tbody>
        </table>
    </div>
    )
}

const SingleCoin = ({data})=> {
    const firstClassName = data.firstMarket.totalUygun ? 'table-success' : 'table-danger' //table-success
    const secondClassName = data.secondMarket.totalUygun ? 'table-success' : 'table-danger' //table-success
    const thirdClassName = data.thirdMarket.totalUygun ? 'table-success' : 'table-danger' //table-success
    const fourthClassName = data.fourthMarket.totalUygun ? 'table-success' : 'table-danger' //table-success
    const firstLink = "https://www.cryptopia.co.nz/Exchange?market=" + data.firstName.replace('/','_')
    const secondLink = "https://www.cryptopia.co.nz/Exchange?market=" + data.secondName.replace('/','_')
    const thirdLink = "https://www.cryptopia.co.nz/Exchange?market=" + data.thirdName.replace('/','_')
    const fourthLink = "https://www.cryptopia.co.nz/Exchange?market=" + data.fourthName.replace('/','_')
    return (
        <tr>
            <td><a href={firstLink} target="_blank">{data.firstName}</a><table><tbody><tr><td>{data.firstMarket.price}</td><td>{data.firstMarket.amount}</td><td className={firstClassName}>{data.firstMarket.total}</td></tr></tbody></table></td>
            <td><a href={secondLink} target="_blank">{data.secondName}</a><table><tbody><tr><td>{data.secondMarket.price}</td><td>{data.secondMarket.amount}</td><td className={secondClassName}>{data.secondMarket.total}</td></tr></tbody></table></td>
            <td><a href={thirdLink} target="_blank">{data.thirdName}</a><table><tbody><tr><td>{data.thirdMarket.price}</td><td>{data.thirdMarket.amount}</td><td className={thirdClassName}>{data.thirdMarket.total}</td></tr></tbody></table></td>
            <td><a href={fourthLink} target="_blank">{data.fourthName}</a><table><tbody><tr><td>{data.fourthMarket.price}</td><td>{data.fourthMarket.amount}</td><td className={fourthClassName}>{data.fourthMarket.total}</td></tr></tbody></table></td>
            <td>{data.fark}</td>
        </tr>
    )
}