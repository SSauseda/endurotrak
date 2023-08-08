import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../store/comment";
import { useParams } from "react-router-dom";
import CommentItem from "../CommentItem";
import CommentForm from "../CommentForm";
import "./Comments.css";


const Comments = () => {
    const dispatch = useDispatch();
    const { challengeId, resultId } = useParams();



    const currentUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllComments(challengeId, resultId));
    }, [dispatch, challengeId, resultId]);

    const comments = useSelector((state) => Object.values(state.comments));
    console.log("HELLOOOOOOO", comments)


    return (
        <div className="comment-container">
            <h1 className="comment-header">Comments</h1>
            <CommentForm challengeId={challengeId} resultId={resultId}/>
            {comments.length === 0 ? (
                <div className="no-comment">No comments yet</div>
            ) : (
                <ul>
                {comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </ul>
            )}
        </div>
    )
}

export default Comments;
