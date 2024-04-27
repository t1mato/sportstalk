import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { supabase } from '../client';
import '../pages/ReadPosts.css';
import SortButtons from '../components/SortButtons';
import '../components/SearchBar.css'

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await supabase
                    .from('SportsTalk')
                    .select()
                    .order('created_at', { ascending: true });

                setPosts(data);
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchPosts();
    }, []);

    const handleSearch = (title) => {
        setSearchTerm(title); // Update search term
        if (title.trim() === '') {
            setSearchResults(posts); // If search term is empty, display all posts
        } else {
            const filtered = posts.filter((post) =>
                post.title.toLowerCase().includes(title.toLowerCase())
            );
            setSearchResults(filtered);
        }
    };

    const sortByNewest = () => {
        const sortedPosts = [...searchResults].sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        setSearchResults(sortedPosts);
    };

    const sortByMostPopular = () => {
        const sortedPosts = [...searchResults].sort((a, b) => b.upvotes - a.upvotes);
        setSearchResults(sortedPosts);
    };

    return (
        <>
        <SearchBar onSearch={handleSearch} /> <br />
        <div className="sort-buttons">
                <SortButtons sortByNewest={sortByNewest} sortByMostPopular={sortByMostPopular} />
        </div>
        <div className="ReadPosts">
            {searchResults.map((post) => (
                <Card key={post.id} id={post.id} title={post.title} />
            ))}
        </div>
        </>
    );
};

export default ReadPosts;