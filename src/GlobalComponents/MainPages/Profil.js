import React, {useContext, useEffect, useState} from 'react';
import Footer from "../Footer";
import './Profil.css';
import {UserCloud} from "../UserCloud";
import axios from "axios";
import ProfilTable from "./ProfilTable";
import ProfilInfo from "./ProfilInfo";

function Profil() {

    const {users}= useContext(UserCloud);
    const [purchasesShow, setPurchasesShow] = useState(false);
    const handlePurchasesClose = () => setPurchasesShow(false);
    const [currentOrders, setOrders] = useState([{}]);

    useEffect(()=>{

        //Alle Orders vom OrderService nehmen
        axios.get('http://localhost:8081/orderService/users/'+users.id+'/orders')
            .then(response => response.data)
            .then(data => setOrders(data))
            .then(data => console.log(data))

    },[])

    return (
        <>
            <div className={'pcontainer'} >
                <ProfilInfo users={users}
                            setPurchasesShow={setPurchasesShow}
                />
                <ProfilTable currentOrders={currentOrders}
                             handlePurchasesClose={handlePurchasesClose}
                             purchasesShow={purchasesShow}/>
            </div>
            <Footer />
        </>
    );
}
export default Profil;