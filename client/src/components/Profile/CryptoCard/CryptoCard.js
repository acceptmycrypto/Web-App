import React from "react";
import "./CryptoCard.css";

const CryptoCard = props => {

    return (
        <div id="cryptoPortfolio" className="p-1 m-3">
            <h5 id="cryptoHeader" className="blueText">CRYPTO PORTFOLIO</h5>

            <label className="switch"><input type="checkbox" id="togBtn" onChange={props.handleToggleChange} /><div className="slider round"><span className="own">OWNED</span><span className="interest">INTERESTED</span></div></label>
            <div className="cryptoWallet">
                {(props.crypto_view === "interested")
                    ? props.user_crypto.map((y) =>
                        <div>
                            {
                                (y.crypto_address === null)
                                    ? <div className="mx-1 my-2 cryptos">
                                        {/* <p>{y.crypto_symbol}</p> */}
                                        <a className="blueText cryptoText" href={y.crypto_link} target="_blank">{y.crypto_metadata_name}</a>
                                        <br></br>
                                        <img className="cryptoImage" data-name={y.crypto_metadata_name} src={y.crypto_logo} data-id={y.id} onClick={props.handleAddressFormChange}></img>
                                    </div>
                                    : null
                            }

                        </div>

                    )
                    : props.user_crypto.map((y) =>
                        <div>
                            {
                                (y.crypto_address !== null)
                                    ? <div className="mx-1 my-2 cryptos">
                                        <a className="blueText cryptoText" href={y.crypto_link} target="_blank">{y.crypto_metadata_name}</a>
                                        <br></br>
                                        <img className="cryptoImage" data-name={y.crypto_metadata_name} data-address={y.crypto_address} data-id={y.id} src={y.crypto_logo} onClick={props.handleQRChange}></img>
                                    </div>
                                    : null
                            }
                        </div>
                    )
                }
                {props.children}
            </div>


        </div>
    );
}


export default CryptoCard;