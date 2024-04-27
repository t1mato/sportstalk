import '../src/App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import InfoPost from './pages/InfoPost'
import { Link } from 'react-router-dom'
import sports from './components/sports-logo.png'
import SearchBar from '../src/components/SearchBar'
import sp from '../src/pages/sportstalk.png'


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
      path:"/info/:id/edit/:id",
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

      <nav className="navbar">
        <div className="logo">
          <img src={sp} alt="SportsTalk Logo"/>
        </div>
        <div className="route-button">
          <button className="home-button">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><strong>Home</strong></Link>
          </button>
          <button className="new-post-button">
            <Link to="/new" style={{ textDecoration: 'none', color: 'white' }}><strong>Create New Post</strong></Link>
          </button>
        </div>
      </nav>
    
      <div className="header">
      </div>
      <div className="body">
        {element}
      </div>
    </div>

  );
}

export default App;
