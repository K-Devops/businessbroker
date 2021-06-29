import React from 'react';
import Modal from "react-bootstrap/Modal";
import {FaTimes} from "react-icons/fa";
import Moment from "moment";

function ProfilTable(props) {
    return (
       <>
           <Modal show={props.purchasesShow} onHide={props.handlePurchasesClose} animation={false} size={'xl'}>
               <Modal.Header>
                   <Modal.Title>Meine Aktionen</Modal.Title>
                   <FaTimes cursor={'pointer'} onClick={props.handlePurchasesClose}/>
               </Modal.Header>
               <Modal.Body>
                   <table className={"purchaseTable"}>
                       <thead>
                       <th>Nr.</th>
                       <th>Status</th>
                       <th>Symbol/ Wertpapier</th>
                       <th>Anzahl</th>
                       <th>Kaufdatum</th>
                       <th>Kaufpreis pro Stk</th>
                       </thead>
                       <tbody>
                       {props.currentOrders && props.currentOrders.map(((value, index) =>
                               <tr>
                                   <td>{index+1}</td>
                                   <td>{value.type}</td>
                                   <td>{value.stockSymbol}</td>
                                   <td>{value.units}</td>
                                   <td>{Moment(value.date).format("DD.MM.yyyy hh:mm:ss")}</td>
                                   <td>{value.price}</td>
                               </tr>
                       ))}
                       </tbody>
                   </table>
               </Modal.Body>
               <Modal.Footer>
                   <button  className={'btn btn-secondary'}
                            onClick={props.handlePurchasesClose}
                            style={{marginTop:'2%'}}>Schließen</button>
               </Modal.Footer>
           </Modal>

       </>
    );
}

export default ProfilTable;