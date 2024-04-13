import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import InfoPost from './pages/InfoPost'
import { Link } from 'react-router-dom'
import crewmates from './components/crewmates.png'


const App = () => {
  
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

  const posts = [
      {'id':'1', 
      'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
      'author':'Harvey Milian', 
      'description': descr},
      {'id':'2', 
      'title': 'Love Lock in Paris 🔒',
      'author':'Beauford Delaney', 
      'description':descr},
      {'id':'3', 
      'title': 'Wear Pink on Fridays 🎀',
      'author':'Onika Tonya', 
      'description':descr},
      {'id':'4', 
      'title': 'Adopt a Dog 🐶',
      'author':'Denise Michelle', 
      'description':descr},
  ]
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/info/:id",
      element: <InfoPost data={posts} />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>Welcome to the Crewmate Creator!</h1>
        <h6>Here is where you can create your very own set of crewmates before sending them off into space!</h6>
        <img src={crewmates} alt="crewmates"/> <br></br>
        <Link to="/"><button className="headerBtn"> Crewmate Gallery </button></Link>
        <Link to="/new"><button className="headerBtn"> Create a Crewmate! </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
