import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserCloud} from "../UserCloud";
import {SymbolCloud} from "../SymbolCloud";
import StockDashboard from "../OrderManagement/StockDashboard";


function Depot(props) {

    //Handle Modal State
    const [showStock, setShowStock] = useState(false);
    const handleCloseStock = () => setShowStock(false);
    const handleShowStock = () => setShowStock(true);

    //Contextelements
    const {users}= useContext(UserCloud);
    const {symbols, setsymbols} = useContext(SymbolCloud);

    //States
    const [depot, setdepot] = useState([]);
    const [stockinvestments, setStockinvestments]= useState([])
    const [detailinvestment, setdetailinvestment] = useState([])
    const [detailsoldinvestment, setdetailsoldinvestment] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8080/investmentService/users/'+users.id)
            .then(response => response.data)
            .then(data => octopus(data))
    },[showStock])

    const octopus = (data) =>{
        setdepot(data)
        setStockinvestments(data.stockInvestments)
    }

    const onStockHandler = (data) =>{
        handleShowStock();
        setdetailinvestment(data[1]['sharesInPossession'])
        setdetailsoldinvestment(data[1]['sharesSold'])
        setsymbols(data[0])
    }

    return (
        <>
            <div className="col-8">
                <label htmlFor={"depot"} style={{marginLeft:"25px"}}><b>Depot ID: {users.id}</b></label>
                <div className="depot">
                    <div className={'container'} style={{marginTop:'3em'}}>
                        <div className={'depotBestand'} style={{paddingTop:'0.2em'}}>
                            <table className="table table-hover">
                                <thead>
                                <th>Realisierter Profit</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span className={'green'}>{Number(depot.realizedProfitLossOfUserEntity).toFixed(2)} EUR<br/><span className={'small'}>(inkl. Dividenden und Erträge)</span></span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        <h3>Depotbestand</h3><br/>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Durchschn. Einkaufspreis</th>
                                <th>Gewinn/Verlust</th>
                                <th>Investitionswert</th>
                            </tr>
                            </thead>
                            <tbody>{Object.entries(stockinvestments).map((item, i)=>
                                <tr key={i} id={i}>
                                    <td>{item[0]}</td>
                                    <td>{item[1]['averagePriceOfInvestment'].toFixed(2)} EUR</td>
                                    <td>{item[1]['realizedProfitLossOfInvestment'].toFixed(2)} EUR</td>
                                    <td>{Number(item[1]['valueOfInvestment']).toFixed(2)} EUR</td>
                                    <td>
                                        <div>
                                            <button type="button" value={item} className={'btn btn-primary btn-sm'} style={{backgroundColor:'darkgrey', width:'100%'}} onClick={() => onStockHandler(item)}> Details <i className="fas fa-search"></i></button>
                                        </div>
                                    </td>
                                </tr>)}
                            <StockDashboard
                                detail={false}
                                symbol={symbols}
                                show={showStock}
                                handleClose={handleCloseStock}
                                WatchListItems={''}
                                datap={detailinvestment}
                                datas={detailsoldinvestment}
                            />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Depot;
