import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserCloud} from "../UserCloud";
import {SymbolCloud} from "../SymbolCloud";
import StockOverview from "./StockOverview";
import StockOrderManager from "./Dashboardelements/StockOrderManager";

function Depot(props) {

    const [showStock, setShowStock] = useState(false);
    const [showSell, setShowSell] = useState(false);
    const handleCloseStock = () => setShowStock(false);
    const handleShowStock = () => setShowStock(true);
    const handleCloseSell = () => setShowSell(false);
    const handleShowSell = () => setShowSell(true);

    // Ich denke diese Variable wirst du nich brauchen
    const {users, setUsers}= useContext(UserCloud);
    const {symbols, setsymbols} = useContext(SymbolCloud);
    const [depot, setdepot] = useState([]);
    const [stockinvestments, setStockinvestments]= useState([])


   // Hiermit holst du dir von Jan beim Laden des Backends die Daten des Users
    useEffect(()=>{

        //Get complete user by userId
        axios.get('http://localhost:8080/investmentService/users/'+users.id)
            .then(response => response.data)
            .then(data => octopus(data))
    },[symbols])

    const octopus = (data) =>{
        setdepot(data)
        setStockinvestments(data.stockInvestments)
    }

    //User sell some stocks
    const onSellHandler = (e) =>{
        handleShowSell();
    }

    //User see some stocks
    const onStockHandler = (e) =>{
        handleShowStock();
    }

    return (
        <>
            <div className="col-8">
                <label htmlFor={"depot"}><b>Depot ID: {users.id}</b></label>
                <div className="depot">
            <div className={'container'} style={{marginTop:'3em'}}>
                <div className={'depotBestand'} style={{paddingTop:'0.2em'}}>
                    <table className="table table-hover">
                        <thead>
                        <th>Depotbalance</th>
                        <th>Realisierter Profit</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{Number(depot.depotBalance).toFixed(2)} {}EUR</td>
                            <td><span className={'green'}>{depot.realizedProfitLossOfUserEntity} {}EUR<br/><span className={'small'}>(inkl. Dividenden und Erträge)</span></span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h3>Depotbestand</h3><br/>
                <table className="table table-hover">
                    <thead>
                    <tr>
                      <th>Symbol</th>
                        <th>Durchschnittwert</th>
                        <th>Gewinn/Verlust</th>
                        <th>Investitionswert</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(stockinvestments).map((item, i)=>
                        <tr key={i} id={i}>
                        <td>{item[0]}</td>
                        <td>{item[1]['averagePriceOfInvestment']}</td>
                        <td>{item[1]['realizedProfitLossOfInvestment']}</td>
                        <td>{Number(item[1]['valueOfInvestment']).toFixed(2)}</td>
                        <td>
                            <div>
                                <button type="button" value={item} className={'btn btn-primary btn-sm'} style={{backgroundColor:'darkgrey', width:'100%'}} onClick={onStockHandler}> Details <i className="fas fa-search"></i></button>
                                <StockOverview
                                    data={item}// Hier muss nur eins übergeben werden
                                    symbol={item[0]} // Hier muss das mit dem INdex noch angepasst werden
                                    show={showStock}
                                    handleClose={handleCloseStock}
                                />
                            </div>
                        </td>
                    </tr>)}
                    </tbody>
                </table>

            </div>
                </div>
            </div>

        </>
    );
}

export default Depot;