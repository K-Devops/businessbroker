import React, {useContext, useEffect, useState} from 'react';
import '../StockOrderManager.css';


function StockOverview(props) {

        return (
            <div style= {{visibility: props.detail ? 'collapse':'visible' }}>
                    <div className="container" ref={props.containerRef}>
                        <div className={'row'}>
                            <p>Meine Wertpapiere {props.symbol}</p>
                        </div>
                        <div className={'row'}>
                            <div className={'col-11'}>
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Nr.</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Kaufpreis </th>
                                        <th scope="col">Aktueller Kurs</th>
                                        <th scope="col">Kaufdatum</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(props.datap).map(item=>
                                        <tr>
                                            <td>{item[0]}</td>
                                            <td>{item[1].status}</td>
                                            <td>{item[1].openPrice} {props.currency}</td>
                                            <td>{props.stockPrice} {props.currency}</td>
                                            <td>{item[1].dateOpened} </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
export default StockOverview;

StockOverview.defaultProps= {
    datap:''

}