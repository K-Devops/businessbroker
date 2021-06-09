import React, {useState} from 'react';

function NewsBlock(props) {

    return (
<>
    <div style={{marginTop:'5%'}}>
        <div>
            <h5>Aktuelle News zu {props.stockProfile2.name} </h5>
        </div>
        <div className={'card-group'}>
            {props.CompanyNews.slice(0,4).map((CompanyNews, i )=>
                <div className={'card'} key={i} >
                    <img src={CompanyNews.image} className={'card-img-top'} style={{width:'93%'}} />
                    <div className={'card-body'}>
                        <h6 className={'card-title'}><b>{CompanyNews.headline}</b></h6>
                        <p className={'card-text'}><small>{CompanyNews.summary}</small></p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Source: {CompanyNews.source}</small>
                    </div>
                </div>
            )}
        </div>
    </div>

</>    );
}

export default NewsBlock;