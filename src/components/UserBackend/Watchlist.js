import React, {useEffect, useState} from 'react';

function Watchlist(props) {


const request = require('request');
const [array, setArray] = useState([])
    const a = []


useEffect(()=>{

 props.watchlist.map((listitem, i) => {
     request('https://finnhub.io/api/v1/quote?symbol=' + listitem + '&token=' + process.env.REACT_APP_API_KEY, {json: true}, (err, res, body) => {
         if (err) {
             return console.log(err);
         }
         body[0] = listitem
         a.push(body)
     })})
},[props.watchlist])

    console.log(array)

    return (
                <div className="col-4" style={{height:'650px', overflowY:'scroll', padding:'2%'}}>
                    <label htmlFor={"watchlist"}><b>Watchlist</b></label>
                    <div className="list-group watch">
                        {props.watchlist.map((value,i)=>
                            <a key={i} id={i}
                               className="list-group-item list-group-item-action flex-column align-items-start ">
                                <div className="d-flex w-100 justify-content-between">
                                    <p className="mb-1"><b>{value} </b></p>
                                    <small>{i} </small>
                                </div><small>  <ul>
                                <p>Werte  </p>
                            </ul>
                            </small>
                                <small>
                                    <button className={"btn btn-sm btn-light"} onClick={event => props.onClickhandler(value[0])}> entfernen</button>
                                </small>

                            </a>
                        )}
                    </div>
                </div>
        
    );
}

export default Watchlist;