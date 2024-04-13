import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './InfoPost.css'
import { supabase } from '../client'

const InfoPost = ({ data }) => {
    const {id} = useParams()
    const [post, setPost] = useState({id: null, name: "", speed: "", color: ""});
  
    useEffect(() => {
      const fetchData = async () => {
          const { data } = await supabase
            .from('Crewmates')
            .select()
            .eq('id', id)
            .single(); // Assuming you expect only one row to match the ID
  
  
          setPost(data);
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="crewmate-container">
        <h1>Crewmate: {post.name}</h1>
        <h3>Stats</h3>
        <p>Speed: {post.speed} mph</p>
        <p>Color: {post.color}</p>
      </div>
    );
  };
  
  export default InfoPost;