import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../pages/EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", link: ""});

    const updatePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('SportsTalk')
            .update({title: post.title, content: post.content, link: post.link})
            .eq('id', id)

            window.location = "/"
    }

    const deletePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('SportsTalk')
            .delete()
            .eq('id', id)

        window.location = "http://localhost:3000/"
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form className="edit-form">
                <input 
                    type="text" 
                    className="box"
                    id="title" 
                    name="title" 
                    placeholder="Title" 
                    value={post.title} 
                    onChange={handleChange} />
                <br/>

                <textarea 
                    rows="5" 
                    cols="50" 
                    className="box"
                    id="content" 
                    name="content" 
                    value={post.content}
                    placeholder="Content (Optional)" 
                    onChange={handleChange}>
                </textarea>
                <br />

                <input
                    type="text"
                    className="box"
                    id="link"
                    name="link"
                    placeholder="Image URL (Optional)"
                    value={post.link}
                    onChange={handleChange}
                />

                <br/>
                <input type="submit" value="Update Post" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete Post</button>
            </form>
        </div>
    )
}

export default EditPost