import React from 'react';
import './Updates.css';
import CardItem from "../CardItem";




function Updates(props) {
    return (
<div>
        <div className='cards'>
            <div>
                <h1>Aktuelle Nachrichten</h1>
            </div>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {props.news.slice(0,4).map(news => (<CardItem key={news.id}
                                                        src={news.image}
                                                        text={news.headline}
                                                                      source={news.source}
                                                                      path={news.url}


                        ></CardItem>))}
                    </ul>

                    <ul className='cards__items'>
                        {props.news.slice(5,9).map(news => (<CardItem key={news.id}
                                                                      src={news.image}
                                                                      text={news.headline}
                                                                      source={news.source}
                                                                      path={news.url}

                        ></CardItem>))}
                    </ul>
                </div>
            </div>
        </div>
</div>

    );
}

export default Updates;