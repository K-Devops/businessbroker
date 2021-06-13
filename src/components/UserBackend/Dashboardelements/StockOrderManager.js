import React, {useContext, useEffect, useState} from 'react';
import './StockOrderManager.css';
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {Button} from "../../Button";
import Moment from "moment";
import {UserCloud} from "../../UserCloud";
import axios from "axios";
import CardItem from "../../CardItem";

function StockOrderManager(props) {

    const [amount, setAmount] = useState('');
    const {users, setUsers}= useContext(UserCloud);
    const [orderStatus, setOrderStatus] = useState(true)
    const [sellSymbol, setSellSymbol] = useState('')

    useEffect(()=>{
        if(props.title == 'Verkaufen'){
            setOrderStatus(!orderStatus)
        }
    },[props.title])


    const placeOrder= () =>{

        console.log('Anzahl',amount)
        console.log('UserID',users.id)
        console.log('Symbol',props.stockSymbol)
        console.log('Price', props.stockPrice)

        let order;
        if(orderStatus == true){
            order = {
                "date": new Date(),
                "orderId": "stringagk",
                "price": props.stockPrice,
                "stockSymbol": props.stockSymbol,
                "type": props.type,
                "units": amount,
                "userId": users.id
            }
        }else{
            order = {
                "date": new Date(),
                "orderId": "stringavk",
                "price": props.stockPrice,
                "stockSymbol": sellSymbol,
                "type": props.type,
                "units": amount,
                "userId": users.id
            }
        }


        //Order Absenden WICHTIG PORT ANPASSEN
        axios.post('http://localhost:8081/orderService/orders/',order)
            .then(response => response.data)
            .then(data => console.log(data)
            )


        /*
        //Create Empty Investment -- ehrlich gesagt verstehe ich den Unterschied hier nicht
        axios.post('http://localhost:8080/investmentService/users/'+users.id)
            .then(response => response.data)
            .then(data => console.log(data)
            )
            */
        {props.handleClose() }
    }


    return (
        <Modal className={'modal fade'} dialogClassName={"modal-dialog modal-dialog-centered" } size={'medium'} tabIndex={"-1"} show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title> {props.title}</Modal.Title>
                <FaTimes cursor={'pointer'} onClick={props.handleClose}/>
            </Modal.Header>
            <Modal.Body>
                <div className="base-container" ref={props.containerRef}>
                    <div className="content">
                        <div className="image">
                            <div>
                                <p><b>Aktionsdatum: {Moment().format( "DD.MM.yyyy ")}</b></p><br/>
                            </div>
                            <form>
                                <label htmlFor={'Amount'}>Anzahl
                                <input value={amount} name={'Amount'} className={"form-control"} onChange={event => setAmount(event.target.value)} style={{width:'40%', float:'right'}} type={'number'}/>
                                </label>
                                <div className={'receipt'}  style= {{visibility: orderStatus ? 'hidden':'visible' }} >
                                    <label  htmlFor={'symbol'}>Symbol
                                        <input value={sellSymbol} name={'symbol'} className={'form-control'} style={{width:'40%', float:'right'}} type={'text'} placeholder={props.stockSymbol} size={18} onChange={event => {setSellSymbol(event.target.value)}}/>
                                    </label>
                                </div>
                                <div className={'receipt'}  >
                                    <label> Gesamtsumme : {amount* props.stockPrice} {props.currency}</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" />
                                    <label className="form-check-label" htmlFor="exampleCheck1"><small>Hiermit akzeptiere ich die AGB des Online Brokers*</small>   </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button buttonStyle="btn btn-outline-secondary"
                        buttonSize="btn-sm"
                        link={'/Dashboard'}
                        onClick={placeOrder}>
                    Order ausführen
                </Button>
                <Button buttonStyle="btn btn-outline-secondary"
                        buttonSize="btn-sm"
                        link={'/Dashboard'}
                        onClick={props.handleClose }>
                    {props.title} abbrechen
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StockOrderManager;

StockOrderManager.defaultProps= {
    type : "OPEN",
    stockPrice:0

}

