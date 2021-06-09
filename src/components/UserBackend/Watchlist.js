import React from 'react';

function Watchlist(props) {
    return (
        

                <div className="col-4" style={{height:'650px', overflowY:'scroll', padding:'2%'}}>
                    <label htmlFor={"watchlist"}><b>Watchlist</b></label>
                    <div className="list-group watch">
                        {props.watchlist.map((value,i)=>
                            <a key={i} id={i}
                               className="list-group-item list-group-item-action flex-column align-items-start ">
                                <div className="d-flex w-100 justify-content-between">
                                    <p className="mb-1"><b>{value} </b></p>
                                    <small>{i}</small>
                                </div><small>  <ul>
                                <p>Werte</p>
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