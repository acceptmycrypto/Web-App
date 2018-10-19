import React, { Component } from 'react';
import "./Crypto.css";

class Crypto extends Component {
    constructor() {
        super();
        this.state = {
            allComments:[]
        }
    }

    addComment = (event) => {
        event.preventDefault();
        let id, user_id, crypto_id, body, date_commented;
        let children = [];
        user_id = 1; //hardcoding user for now
        crypto_id = 1;//hardcoding crypto for now
        body = event.target.children[0].value;
        return fetch("http://localhost:3001/crypto/submit-comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id, crypto_id, body})
        }).then(res => res.json()).then(allComments => {
            console.log(allComments);
            return this.setState(allComments)
        })
    }

    deleteComment = (event) => {
        let id, parentStatus;
        id = event.target.parentElement.getAttribute("data-id");
        parentStatus = event.target.parentElement.getAttribute("data-parent");
        return fetch("http://localhost:3001/crypto/delete-comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,parentStatus})
        }).then(res => res.json())
        .then(allComments => {
            console.log(allComments);
            return this.setState(allComments)
        })
    }

    componentDidMount() {
        return fetch("http://localhost:3001/crypto/comments")
        .then((res) => res.json())
        .then(allComments => {
            console.log(allComments);
            return this.setState(allComments)
        })
    }

    render() {
        return (
            <div>
                <h1>ABC</h1>
                {this.state.allComments.map(parent => 
                    <div>
                        <h2 data-id={parent.id} data-parent={true}>
                        {(parent.comment_status==="deleted") ? 
                            "comment deleted" : `user#${parent.user_id}said:${parent.body}`
                        }
                        <button onClick={this.deleteComment}>Delete</button>
                            
                            {parent.children.map(child => 
                                <h4 data-id={child.id} data-parent={false}>
                                {(child.comment_status==="deleted") ? 
                                    "comment deleted" : `user#${child.user_id} replied:${child.body}`
                                }
                                <button onClick={this.deleteComment}>Delete</button>
                                </h4>
                            )}
                        </h2>
                    </div>
                )}
                <form onSubmit={this.addComment} id="commentForm">
                    <textarea name="body" rows="4" cols="50" placeholder="Say something!"></textarea>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}



export default Crypto;
