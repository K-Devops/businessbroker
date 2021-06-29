import React, {useContext, useEffect, useState} from 'react';
import './StockOrderManager.css';
import Moment from "moment";


function StockOverview(props) {

    return (
        <div style= {{display: props.detail ? 'none':'block' }}>
            <div className="container" ref={props.containerRef}>
                <div className={'row'}>
                    <p>Meine gekauften Wertpapiere {props.symbol}</p>
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
                                <th scope="col">Laufender Gewinn/Verlust</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(props.datap).map(item=>
                                <tr>
                                    <td>{parseInt(item[0])+1}</td>
                                    <td>{item[1].status}</td>
                                    <td>{item[1].openPrice} {props.currency}</td>
                                    <td>{props.stockPrice} {props.currency}</td>
                                    <td>{Moment(item[1].dateOpened).format("DD.MM.yyyy hh:mm:ss")}  </td>
                                    {props.stockPrice-item[1].openPrice < 0 ?
                                        <td><a style={{color: 'red'}}>{(props.stockPrice-item[1].openPrice).toFixed(2)} {props.currency}</a></td>
                                        : <td><a style={{color: 'green'}}>{(props.stockPrice-item[1].openPrice).toFixed(2)} {props.currency}</a></td>}
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={'row'}>
                    <p>Meine verkauften Wertpapiere {props.symbol}</p>
                </div>
                <div className={'row'}>
                    <div className={'col-11'}>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Nr.</th>
                                <th scope="col">Status</th>
                                <th scope="col">Kaufpreis </th>
                                <th scope="col">Verkaufspreis </th>
                                <th scope="col">Kaufdatum </th>
                                <th scope="col">Verkaufsdatum</th>
                                <th scope="col">Realisierter Gewinn/Verlust</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.datas ?
                                Object.entries(props.datas).map(item =>
                                    <tr>
                                        <td>{parseInt(item[0]) + 1}</td>
                                        <td>{item[1].status}</td>
                                        <td>{item[1].openPrice} {props.currency}</td>
                                        <td>{item[1].closePrice} {props.currency}</td>
                                        <td>{Moment(item[1].dateOpened).format("DD.MM.yyyy hh:mm:ss")} </td>
                                        <td>{Moment(item[1].dateClosed).format("DD.MM.yyyy hh:mm:ss")} </td>
                                        {props.stockPrice - item[1].openPrice < 0 ?
                                            <td><a
                                                style={{color: 'red'}}>{(props.stockPrice - item[1].openPrice).toFixed(2)} {props.currency}</a>
                                            </td>
                                            : <td><a
                                                style={{color: 'green'}}>{(props.stockPrice - item[1].openPrice).toFixed(2)} {props.currency}</a>
                                            </td>}
                                    </tr>
                                )
                                : null
                            }
                            </tbody>
                        </table>
                        {!props.datas ? <i>Keine verkauften Wertpapiere vorhanden</i> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StockOverview;

StockOverview.defaultProps= {
    datap:'',
    datas:''

}