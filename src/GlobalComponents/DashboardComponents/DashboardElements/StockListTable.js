import React, {useContext, useState} from 'react';
import StockOrderManager from "./StockOrderManager";
import {SymbolCloud} from "../../SymbolCloud";

function StockListTable(props) {

    const [showSell, setShowSell] = useState(false);
    const handleCloseSell = () => setShowSell(false);
    const handleShowSell = () => setShowSell(true);
    const {symbols} = useContext(SymbolCloud);

    //User sell some stocks
    const onSellHandler = (e) =>{
        handleShowSell();
    }
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
                    <button onClick={event => props.onClickhandler(props.stockProfile2.ticker)}
                            className={'btn btn-outline-secondary'}
                            style={{visibility: props.detail ? 'visible':'hidden' }} >Zur Watchlist hinzufügen</button>
                </div>
                <div style={{display: props.detail ? 'block':'flex'}}>
                    <button className={'btn btn-secondary'} style={{margin:'10%', width:'35%'}} onClick={props.onBuyhandler}>Kaufen</button>
                    <button className={'btn btn-secondary'} style={{margin:'10%', width:'35%', visibility: props.detail ? 'hidden':'visible' }}  onClick={onSellHandler} >Verkaufen</button>
                </div>
                <StockOrderManager
                    show={showSell}
                    handleClose={handleCloseSell}
                    stockSymbol = {symbols}
                    stockPrice={props.stockPrice}
                    title = 'Verkaufen'
                    type={'CLOSE'} // wird verkauft
                />
            </div>
        </>
    );
}

export default StockListTable;