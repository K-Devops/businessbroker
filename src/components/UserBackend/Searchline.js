import React, {useContext, useEffect, useMemo, useState} from 'react';
import './Searchline.css';
import {SymbolTransfer} from "../SymbolTransfer";
import StockDashboard from "./StockDashboard";


function Searchline({Winteract}) {

    const {symbols, setsymbols} = useContext(SymbolTransfer);
    const [stocks, setStocks] = useState(null)
    const request = require('request');
    const [input, setInput] = useState(' ')
    const {watchlist, setWatchlist} = Winteract;
    const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Similar to componentDidMount and componentDidUpdate:
    const onClickhandler= (e)=>{
        e.preventDefault();
        setsymbols(input)
        handleShow()

    }

    const onChangehandler= (input)=>{
        setInput(input)
        if(input.length>0){
            request('https://finnhub.io/api/v1/search?q='+input+'&token='+process.env.REACT_APP_WEATHER_API_KEY, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                console.log(body)
                setStocks(body.result);

            });
        }else{

            setInput('')
            setStocks('')
            console.log("Keine Eingabe")
        }
    }
    return (
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
            <option key={i} value={stock.symbol}>{stock.description} {stock.displaySymbol}</option>
            )}
            </datalist>
            <StockDashboard
                data = {symbols}
                show={show}
                handleClose={handleClose}
                Winteract={WatchlistMemo}
            />
        </div>
    );
};

export default Searchline;

Searchline.defaultProps={
    value:'/#'
}