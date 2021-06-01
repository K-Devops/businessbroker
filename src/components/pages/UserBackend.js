import React, {useContext} from 'react';
import Footer from "../Footer";
import Watchlist from "../UserBackend/Watchlist";
import Updates from "../UserBackend/Updates";
import {Context} from "../UserContext";


/*Check if session was startet, else -> PLEASE LOGIN!!*/
function UserBackend() {
        const news = useContext(Context);
    return (
        <>

            <Watchlist/>
            <Updates news={news} />
            <Footer />
        </>
    );
}

export default UserBackend;