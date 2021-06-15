import React from 'react';
import Moment from "moment";

function StockTable(props) {
    return (
        <>
            <h5>Datum: {Moment().format("DD.MM.yyyy")}</h5><br/>
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Öffnungspreis</th>
                <th scope="col">Tageshoch</th>
                <th scope="col">Tagestief</th>
                <th scope="col">Aktueller Preis</th>
                <th scope="col">Letzter Schlusspreis</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{props.StockData.o} {props.stockProfile2.currency}</td>
                <td>{props.StockData.h}{props.stockProfile2.currency}</td>
                <td>{props.StockData.l}{props.stockProfile2.currency}</td>
                <td>{props.StockData.c}{props.stockProfile2.currency}</td>
                <td>{props.StockData.pc}{props.stockProfile2.currency}</td>
            </tr>
            </tbody>
        </table>
        </>);
}

export default StockTable;