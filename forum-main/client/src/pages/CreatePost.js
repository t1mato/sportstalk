import React, { useState } from 'react';
import '../pages/CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", content: "", link: ""})

    const createPost = async (event) => {
        event.preventDefault()

        await supabase
            .from('SportsTalk')
            .insert({title: post.title, content: post.content, link: post.link})
            .select()

        window.location = "/"
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
            <form className="create-form">
                <input type="text" className="box" id="title" name="title" placeholder="Title" onChange={handleChange} /><br />

                <textarea rows="5" cols="50" className="box" id="content" name="content" placeholder="Content (Optional)" onChange={handleChange}>
                </textarea><br />

                <input type="text" className="box" id="link" name="link" placeholder="Image URL (Optional)" onChange={handleChange} /><br />
                
                <input 
                    type="submit" 
                    value="Create Post" 
                    onClick={createPost}
                    style={{backgroundColor: '#FEAA5E', color: 'white'}}
                />
            </form>
        </div>
    )
}

export default CreatePost