import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards({news}) {
    return (
        <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <h3>Ihre Vorteile</h3>
                    <ul className='cards__items'>
                        <CardItem
                            src='images/img-2.jpg'
                            text='Separiert nach Branchenbereichen'
                        />
                        <CardItem
                            src='images/img-1.png'
                            text='Handle auf dem gloablen Weltmarkt'

                        />
                        <CardItem
                            src='images/img-3.jpg'
                            text='Jetzt richtig Vorsorgen'
                        />
                    </ul>
                    <h3>Aktuelle Themen</h3>
                    <ul className='cards__items'>
                        {news.slice(5,9).map(news => (<CardItem key={news.id}
                                                                      src={news.image}
                                                                      text={news.headline}
                        ></CardItem>))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;