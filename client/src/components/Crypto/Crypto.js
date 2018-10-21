import React, { Component } from 'react';
import "./Crypto.css";

class Crypto extends Component {
    constructor() {
        super();
        this.state = {
            allComments:[]
        }
    }

    //this function sends new comment information to backend, resets the comment form, then sets returned json into state
    addComment = (event) => {
        event.preventDefault();
        let id, user_id, crypto_id, body, comment_parent_id;//prep all the data to send into fetch body
        id = event.target.getAttribute("id");//this id distinguishes commentForm on the bottom with replyForms when you click reply.  this id has nothing to do with ids in the db tables
        if (id==="commentForm"){
            comment_parent_id = 0;
        } else {
            comment_parent_id = event.target.getAttribute("data-id");
        }
        user_id = 1; //hardcoding user for now
        crypto_id = 1;//hardcoding crypto for now
        body = event.target.children[0].value;//save the comment text into body
        event.target.children[0].value = "";//comment text has to be cleared before form becomes display=none
        return fetch("http://localhost:3001/crypto/submit-comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id, crypto_id, body, comment_parent_id})
        }).then(res => res.json()).then(allComments => {
            console.log(allComments);
            if (id!=="commentForm"){//if current form is a reply form
                let replyForm = document.getElementById(id);
                replyForm.style.display = "none";//hides reply form
                replyForm.children[0].removeAttribute("autofocus");//remove attribute to return this form to original condition
            }
            return this.setState(allComments)
        })
    }

    //this function sends id of comment to delete, then sets returned json into state
    deleteComment = (event) => {
        let id, parentStatus;//prep all the data to send into fetch body
        id = event.target.parentElement.parentElement.getAttribute("data-id");//this id IS same as the id from the crypto_comments table
        // parentStatus = event.target.parentElement.getAttribute("data-parent");
        return fetch("http://localhost:3001/crypto/delete-comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        }).then(res => res.json())
        .then(allComments => {
            console.log(allComments);
            return this.setState(allComments)
        })
    }

    //this function displays the replyForm when reply button is clicked, then cursor automatically appears in form
    displayReplyForm = (event) => {
        let id;
        id = event.target.parentElement.parentElement.getAttribute("data-id");
        let replyForm = document.getElementById("replyForm"+id);
        replyForm.style.display = "block";
        replyForm.children[0].setAttribute("autofocus","autofocus");
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
                    <div className="parentComment" id={"parent"+parent.id} data-id={parent.id} data-parent={true}>
                        {(parent.comment_status==="deleted") && <div className="commentDeleted">{parent.date_commented}
                            <div>comment deleted</div>
                        </div>}
                        {(parent.comment_status==="locked") && <div>{parent.date_commented} - {parent.username}
                            <button onClick={this.deleteComment}>Delete</button>
                            <div>{parent.body}</div>
                        </div>}
                        {(parent.comment_status==="normal") && <div>{parent.date_commented} - {parent.username}
                            
                            <button onClick={this.deleteComment}>Delete</button>
                            <button onClick={this.displayReplyForm}>Reply</button>
                            <div>{parent.body}</div>
                        </div>}
                        {parent.children.map(child => 
                            <div className="childComment" id={"child"+child.id} data-id={child.id} data-parent={false}>
                                {(child.comment_status==="deleted") && <div className="commentDeleted">{child.date_commented}
                                    <div>reply deleted</div>
                                </div>}
                                {(child.comment_status==="normal") && <div>{child.date_commented} - {child.username}
                                    <button onClick={this.deleteComment}>Delete</button>
                                    <div>{child.body}</div>
                                </div>}
                            </div>
                        )}
                        <form className="replyForm" onSubmit={this.addComment} id={"replyForm"+parent.id} data-id={parent.id}>
                            <textarea name="body" rows="4" cols="50" placeholder="Say something back!"></textarea>
                            <div className="buttonDiv"><button>Submit</button></div>
                        </form>
                    </div>
                )}
                <form onSubmit={this.addComment} id="commentForm">
                    <textarea name="body" rows="4" cols="50" placeholder="Say something!"></textarea>
                    <div className="buttonDiv"><button>Submit</button></div>
                </form>
            </div>
        );
    }
}



export default Crypto;
