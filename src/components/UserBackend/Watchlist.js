import React from 'react';
import './Watchlist.css';

function Watchlist() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <label htmlFor={"depot"}><b>Depot ID:</b></label>
                <div className="depot">
                </div>
                </div>
                <div className="col-4">
                    <label htmlFor={"watchlist"}><b>Watchlist</b></label>
                    <div className="watchlist">


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watchlist;