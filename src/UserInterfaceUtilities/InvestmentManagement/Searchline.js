import React, {useContext, useEffect, useMemo, useState} from 'react';
import './Searchline.css';
import {SymbolCloud} from "../SymbolCloud";
import StockDashboard from "../OrderManagement/StockDashboard";


function Searchline({WatchListItems}) {

    //Contextelements
    const {symbols, setsymbols} = useContext(SymbolCloud);

    //States
    const [stocks, setStocks] = useState(null)
    const request = require('request');
    const [input, setInput] = useState('')
    const {watchlist, setWatchlist} = WatchListItems;
    const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);

    //Handle Modal State
    const [showStock, setShowStock] = useState(false);
    const handleCloseStock = () => setShowStock(false);
    const handleShowStock = () => setShowStock(true);


    const onClickhandler= (e)=>{
        e.preventDefault();
        setsymbols(input)
        handleShowStock()
    }

    const onChangehandler= (input)=>{
        setInput(input)
        if(input.length>0){
            request('https://finnhub.io/api/v1/search?q='+input+'&token='+process.env.REACT_APP_API_KEY, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                setStocks(body.result);
            });
        }else{
            setInput('')
            setStocks('')
            console.log("Keine Eingabe")
        }
    }
    return (
        <div>
            <h1>Willkommen!</h1>
        <div className={'container'}  >
            <form className="border border-1">
                <label className={"form-label"} htmlFor={'addsymbol'}> Suchen Sie jetzt nach Ihrer nächsten Anlage</label>
                <input type="text" list={'mydata'} className={'form-control'} name="addsymbol" placeholder="z.B. Apple/ISIN"
                       value={input} onChange={(e)=> onChangehandler(e.target.value)}/>
                <div>
                    <button  className={'btn btn-secondary'} onClick={event => onClickhandler(event)} style={{marginTop:'2%'}}>Anzeigen</button>
                </div>
            </form>
            <datalist id={'mydata'} >
                {stocks && stocks.map((stock, i)=>
                    <option key={i} value={stock.symbol}>{stock.description}{stock.displaySymbol}</option>
                )}
            </datalist>
            <StockDashboard
                detail={true}
                data = {symbols}
                show={showStock}
                handleClose={handleCloseStock}
                WatchListItems={WatchlistMemo}
            />
        </div>
        </div>
    );
};

export default Searchline;

Searchline.defaultProps={
    value:'/#'
}