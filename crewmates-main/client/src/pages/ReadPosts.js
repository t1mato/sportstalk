import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'
import './ReadPosts.css'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
    
        const fetchPost = async () => {
            const {data} = await supabase
                .from('Crewmates')
                .select()
                .order('created_at', {ascending: true})

                setPosts(data)
        }

        fetchPost()

    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.name} author={post.speed} description={post.color}/>
                ) : <h2>{"You haven't made a crewmate yet!"}</h2>
            }
        </div>  
    )
}

export default ReadPosts;