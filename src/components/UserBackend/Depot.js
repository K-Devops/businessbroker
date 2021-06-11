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
    const [stockProfile2, setStockProfile2] = useState('')
    const {users, setUsers}= useContext(UserCloud);
    const {symbols, setsymbols} = useContext(SymbolCloud);


   // Hiermit holst du dir von Jan beim Laden des Backends die Daten des Users
    useEffect(()=>{

        //Get complete user by userId
        axios.get('http://localhost:8080/investmentService/users/'+users.id)
            .then(response => response.data)
            .then(data => console.log(data)
            )

        //Get single user investment by stock symbol
        axios.get('http://localhost:8080/investmentService/users/'+users.id+'/investments/'+ symbols)
            .then(response => response.data)
            .then(data => console.log(data)
            )

    })


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
                    <table className="depotTable">
                        <thead>
                        <th scope="col">Depotwert</th>
                        <th scope="col">Kaufwert</th>
                        <th scope="col">Depotentwicklung</th>
                        <th scope="col">Summe Dividenden / Erträge</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{}X {}EUR</td>
                            <td>{}X {}EUR</td>
                            <td><span className={'green'}>+{}X {}EUR<br/><span className={'small'}>(inkl. Dividenden und Erträge)</span></span></td>
                            <td>{}X {}EUR</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h3>Depotbestand</h3><br/>
                <table className="table table-hover"
                >
                    <thead>
                    <tr>
                        <th scope="col">Stk./Nom.<br/><span className={'small'}>(gesperrt)</span></th>
                        <th scope="col" class="sortable-column"  data-sortable="true" >Name<br/><span className={'small'}>ISIN/WKN/Lagerstelle</span></th>
                        <th scope="col" >Aktuelle Summe<br/><span className={'small'}> Gesamterfolg (abs. / rel.)</span></th>
                        <th scope="col" >Aktueller Kurs<br/><span className={'small'}> Diff.Tag (abs. / rel.)</span></th>
                        <th scope="col" >Zeit<br/><span className={'small'}>Kursquelle</span></th>
                        <th scope="col" >Aktion</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>X</td>
                        <td>X</td>
                        <td>X</td>
                        <td>X</td>
                        <td>X</td>
                        <td>
                            <div>
                                <button type="button" className={'btn btn-basic'} style={{backgroundColor:'darkgrey'}} title="Einsehen" onClick={onStockHandler}><i className="fas fa-search"></i></button>
                                <StockOverview
                                    show={showStock}
                                    handleClose={handleCloseStock}
                                />
                                <button type="button" className="btn btn-secondary"  style={{backgroundColor:'orange'}} title="Verkaufen" onClick={onSellHandler}><i className="fa fa-coins"></i></button>
                                <StockOrderManager show={showSell}
                                                   handleClose={handleCloseSell}
                                                   stockName ={stockProfile2.name}
                                                   stockSymbol = {symbols}
                                />

                            </div>
                        </td>

                    </tr>
                    </tbody>
                </table>

            </div>     </div>
            </div>

        </>
    );
}

export default Depot;