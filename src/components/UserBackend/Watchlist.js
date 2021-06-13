import React, {useEffect, useState} from 'react';
import StockOverview from "./StockOverview";

function Watchlist(props) {


const request = require('request');
const [array, setArray]=useState({
    objects:[]
})
    var ar=[];

useEffect(()=>{
 props.watchlist.map((listitem, i) => {
     request('https://finnhub.io/api/v1/quote?symbol=' + listitem + '&token=' + process.env.REACT_APP_API_KEY, {json: true}, (err, res, body) => {
         if (err) {
             return console.log(err);
         }
         body[0] = listitem
         ar.push(body)
         setArray({objects:ar})
     })})

},[props.watchlist])

    return (
                <div className="col-4" style={{height:'650px', overflowY:'scroll', padding:'2%'}}>
                    <label htmlFor={"watchlist"}><b>Watchlist</b></label>

                    <div className="list-group watch">
                        {array.objects.map(((value, index) =>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"> <small>
                             <b>{value[0]}</b> | Aktueller Preis {value.c} $ | Tageshoch {value.h} $ | Tagestief: {value.l} $
                                        <button className={"btn btn-sm btn-light"} onClick={event => props.onClickhandler(value[0])}> entfernen</button>
                                    </small>
                                </li>
                            </ul>


                            ))}
                    </div>
                </div>
        
    );
}

export default Watchlist;

StockOverview.defaultProps= {
    a:'null'

}