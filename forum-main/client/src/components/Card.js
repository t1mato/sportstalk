import React, { useState, useEffect } from 'react'
import '../components/Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client' 
import { useParams } from 'react-router-dom';


const Card = (props) =>  {

  const { id } = useParams()
  const [post, setPost] = useState({ id: null, title: "", content: "", link: ""})
  const [timeAgo, setTimeAgo] = useState("")
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
        try {
          const { data } = await supabase
            .from('SportsTalk')
            .select()
            .eq('id', props.id)
            .single();

            const createdAt = new Date(data.created_at);
            const currentTime = new Date();
            const hoursDifference = Math.abs(currentTime - createdAt) / 36e5;

            setTimeAgo(calculateTimeAgo(hoursDifference));
            setCount(data.upvotes)

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    fetchData();
}, [props.id]);

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


  return (
      <div className="Card" id="feed">
        <p>Posted {timeAgo}</p>

        <Link 
          to={'info/' + props.id} 
          style={{ textDecoration: 'none', color: 'black' }}>
          <h5>{props.title}</h5>
        </Link>

        <p className="content">{count} upvotes</p>
      </div>
  );
};

export default Card;