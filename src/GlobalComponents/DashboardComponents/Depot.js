import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserCloud} from "../UserCloud";
import {SymbolCloud} from "../SymbolCloud";
import StockDashboard from "./DashboardElements/StockDashboard";


function Depot(props) {

    const [showStock, setShowStock] = useState(false);
    const handleCloseStock = () => setShowStock(false);
    const handleShowStock = () => setShowStock(true);

    const {users}= useContext(UserCloud);
    const {symbols, setsymbols} = useContext(SymbolCloud);
    const [depot, setdepot] = useState([]);
    const [stockinvestments, setStockinvestments]= useState([])
    const [detailinvestment, setdetailinvestment] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8080/investmentService/users/'+users.id)
            .then(response => response.data)
            .then(data => octopus(data))
    },[symbols])

    const octopus = (data) =>{
        setdepot(data)
        setStockinvestments(data.stockInvestments)
    }

    const onStockHandler = (data) =>{
        handleShowStock();
        setdetailinvestment(data[1]['sharesInPossession'])
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
                        <br/>
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
                                Winteract={''}
                                datap={detailinvestment}
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