import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../pages/InfoPost.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import thumbsup from './like.png'
import deletepost from './delete.png'
import editpost from './more.png'
import send from './send.png'

const InfoPost = (props) => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, title: "", content: "", link: "", upvotes: 0 });
    const [timeAgo, setTimeAgo] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
      const fetchData = async () => {
          try {
              const { data } = await supabase
                  .from('SportsTalk')
                  .select()
                  .eq('id', id)
                  .single();

              setPost(data);

              const createdAt = new Date(data.created_at);
              const currentTime = new Date();
              const hoursDifference = Math.abs(currentTime - createdAt) / 36e5;

              setTimeAgo(calculateTimeAgo(hoursDifference));

              // Fetch comments associated with the post
              const { data: commentsData, error } = await supabase
                  .from('SportsTalk')
                  .select('comments')
                  .eq('id', id);

              if (error) {
                  throw error;
              }

              setComments(commentsData[0].comments || []);
          } catch (error) {
              console.error('Error fetching data:', error.message);
          }
      };

      fetchData();
  }, [id]);

    const calculateTimeAgo = (hours) => {
      if (hours < 1) {
          return "Just now";
      } else if (hours < 24) {
          const hoursCount = Math.round(hours);
          return hoursCount === 1 ? hoursCount + " hour ago" : hoursCount + " hours ago";
      } else if (hours < 24 * 7) {
          const daysCount = Math.round(hours / 24);
          return daysCount === 1 ? daysCount + " day ago" : daysCount + " days ago";
      } else if (hours < 24 * 30) {
          const weeksCount = Math.round(hours / (24 * 7));
          return weeksCount === 1 ? weeksCount + " week ago" : weeksCount + " weeks ago";
      } else {
          const monthsCount = Math.round(hours / (24 * 30));
          return monthsCount === 1 ? monthsCount + " month ago" : monthsCount + " months ago";
      }
    }

    const updateCount = async (event) => {
        event.preventDefault();

        const { data: postInDB } = await supabase
            .from('SportsTalk')
            .select('upvotes')
            .eq('id', id)
            .single();

        await supabase
            .from('SportsTalk')
            .update({ upvotes: postInDB.upvotes + 1 })
            .eq('id', id);

        setPost((prevState) => ({
            ...prevState,
            upvotes: postInDB.upvotes + 1
        }));
    };

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('SportsTalk')
            .delete()
            .eq('id', id);

        window.location = "http://localhost:3000/";
    };

    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      try {
          // Update comments in the database
          const updatedComments = [...comments, newComment];
          await supabase
              .from('SportsTalk')
              .update({ comments: updatedComments })
              .eq('id', id);

          // Update local state with the new comment
          setComments(updatedComments);
          setNewComment(""); // Clear the input field
      } catch (error) {
          console.error('Error adding comment:', error.message);
      }
  };

    return (
        <div className="Card">
            <div className="post-info">
              <p>Posted {timeAgo}</p>
              <h5>{post.title}</h5>
              <p>{post.content} </p>
              <img src={post.link} alt="post image" className="post-image" /> <br />
            </div>
            <div className="button-container">
                <div className="upvote-container">
                    <button
                        className="upvote-button"
                        onClick={updateCount}>
                        <img src={thumbsup} alt="thumbs up" className="thumbs-up" />
                    </button>
                    <span>{post.upvotes} upvotes</span>
                </div>

                <div className="edit-del">
                    <Link to={'./edit/' + post.id}>
                        <img src={editpost} className="edit-button" />
                    </Link>
                    <Link>
                    <img src={deletepost} onClick={deletePost} className="delete-button" />
                    </Link>
                </div>
            </div>
            <div className="comments-section">
                <div className="comments-list">
                    <h5>Comments</h5>
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>- {comment}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleCommentSubmit} className="comment-submit">
                    <input
                        type="text"
                        className="comment-box"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Leave a comment..."
                    />
                    <button type="submit"><img src={send} alt="send comment" className="send-button" /></button>
                </form>
            </div>
        </div>
    );
};

export default InfoPost;