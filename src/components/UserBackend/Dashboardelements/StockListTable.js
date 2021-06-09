import React, {useContext} from 'react';
import StockOrderManager from "./StockOrderManager";
import {SymbolCloud} from "../../SymbolCloud";

function StockListTable(props) {

    return (
<>
    <div className={'col-4'} style={{marginLeft:'5%'}}>
        <div>
            <img src={props.stockProfile2.logo}  />
        </div>
        <h4> {props.stockProfile2.name} </h4>

        <ul className="list-group">
            <li className="list-group-item">Börse: {props.stockProfile2.exchange}</li>
            <li className="list-group-item">Markt: {props.stockProfile2.country} Markt</li>
            <li className="list-group-item">Marktplatzierung: {props.stockProfile2.marketCapitalization}</li>
            <li className="list-group-item">Austehende Aktien {props.stockProfile2.shareOutstanding} </li>
        </ul>
        <div className={'watchlistref'} >
            <button onClick={event => props.onClickhandler(props.stockProfile2.ticker)} className={'btn btn-outline-secondary'} >Zur Watchlist hinzufügen</button>
        </div>
        <div>
            <button className={'btn btn-secondary'} style={{margin:'10%'}} onClick={props.onBuyhanlder}>Wertpapier ordern</button>

        </div>
    </div>
</>
    );
}

export default StockListTable;