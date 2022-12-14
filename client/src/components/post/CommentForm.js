import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({ postId, addComment }) => {
    const [ text, setText ] = useState('');
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave A Comment</h3>
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                addComment(postId, {text});
                setText('');
            }} className="form my-1">
            <textarea
                className="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
                onChange={e => setText(e.target.value)}
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
