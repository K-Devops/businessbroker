import React, {useContext, useState} from 'react';
import './StockOrderManager.css';
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {Button} from "../../Button";
import Moment from "moment";
import {UserCloud} from "../../UserCloud";
import axios from "axios";

function StockOrderManager(props) {

    const [amount, setAmount] = useState('');
    const {users, setUsers}= useContext(UserCloud);


    const placeOrder= () =>{

        console.log('Anzahl',amount)
        console.log('UserID',users.id)
        console.log('Symbol',props.stockSymbol)


        const Order = [amount,users.id,props.stockSymbol];

        //Create Empty Investment
        axios.post('http://localhost:8080/investmentService/users/'+users.id)
            .then(response => response.data)
            .then(data => console.log(data)
            )
        {props.handleClose() }
    }


    return (
        <Modal className={'modal fade'} dialogClassName={"modal-dialog modal-dialog-centered" } size={'medium'} tabIndex={"-1"} show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title> My Ordermanager {   props.stockName} {props.stockSymbol}</Modal.Title>
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
                    Kauforder aufgeben
                </Button>
                <Button buttonStyle="btn btn-outline-secondary"
                        buttonSize="btn-sm"
                        link={'/Dashboard'}
                        onClick={props.handleClose }>
                    Kauf abbrechen
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StockOrderManager;