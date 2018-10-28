import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Community.css";
import CryptoForum from "./CryptoForum"


class Community extends Component {
    constructor() {
        super();
        this.state = {
            allCryptos:[]
        }
    }

    // selectCrypto = (event) => {
    //     let cryptoId = event.target.getAttribute("data-id");
    //     console.log(cryptoId);
    //     return fetch(`http://localhost:3001/crypto/comments/${cryptoId}`)
    //     .then((res) => res.json())
    //     .then(allComments => {
    //         console.log(allComments);
    //         this.setState(allComments)
    //     })
    // }

    componentDidMount() {
        return fetch("http://localhost:3001/community")
        .then((res) => res.json())
        .then(allCryptos => {
            console.log(allCryptos);
            this.setState(allCryptos)
        })
    }

    render() {
        return (
            <div>
                <h1>all cryptos</h1>
                {this.state.allCryptos.map(crypto =>
                <div>
                <Link to={"/forum/"+crypto.id} >
                    <i className="cryptoDiv" id={"cryptoDiv"+crypto.id} key={"cryptoDiv"+crypto.id} data-id={crypto.id} /> {crypto.crypto_metadata_name}
                </Link>
                
                    {/* <div className="cryptoDiv" id={"cryptoDiv"+crypto.id} key={"cryptoDiv"+crypto.id} data-id={crypto.id} onClick={this.selectCrypto}>
                    {crypto.crypto_metadata_name}
                    </div> */}
                </div>
                )}
            </div>
        );
    }
}

export default Community;
