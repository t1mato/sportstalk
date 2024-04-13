import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, name: "", speed: "", color: ""});

    const updatePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('Crewmates')
            .update({name: post.name, speed: post.speed, color: post.color})
            .eq('id', id)

            window.location = "/"
    }

    const deletePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('Crewmates')
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
            <form>
                <label for="name">Name</label> <br />
                <input type="text" id="name" name="name" placeholder="Enter crewmate's name" value={post.name} onChange={handleChange} /><br />
                <br/>

                <label for="speed">Speed</label><br />
                <input type="text" id="speed" name="speed" placeholder="Enter speed in mph" value={post.speed} onChange={handleChange} /><br />
                <br/>

                <fieldset>
                <legend>
                <label for="color">Color</label><br />
                </legend>
                
                <div>
                <input
                    type="radio"
                    name="color"
                    value="Red"
                    id="red"
                    onChange={handleChange}
                    checked={post.color === 'Red'}
                />
                <label for="red">Red</label>
                </div>

                <div>
                <input
                    type="radio"
                    name="color"
                    value="Blue"
                    id="blue"
                    onChange={handleChange}
                    checked={post.color === 'Blue'}
                />
                <label for="blue">Blue</label>
                </div>

                <div>
                <input
                    type="radio"
                    name="color"
                    value="Green"
                    id="green"
                    onChange={handleChange}
                    checked={post.color === 'Green'}
                />
                <label for="green">Green</label>
                </div>

                <div>
                <input
                    type="radio"
                    name="color"
                    value="Purple"
                    id="purple"
                    onChange={handleChange}
                    checked={post.color === 'Purple'}
                />
                <label for="purple">Purple</label>
                </div>

                <div>
                <input
                    type="radio"
                    name="color"
                    value="Orange"
                    id="orange"
                    onChange={handleChange}
                    checked={post.color === 'Orange'}
                />
                <label for="orange">Orange</label>
                </div>

                <div>
                <input
                    type="radio"
                    name="color"
                    value="Yellow"
                    id="yellow"
                    onChange={handleChange}
                    checked={post.color === 'Yellow'}
                />
                <label for="yellow">Yellow</label>
                </div>

                <div>
                <input
                    type="radio"
                    name="color"
                    value="Pink"
                    id="pink"
                    onChange={handleChange}
                    checked={post.color === 'Pink'}
                />
                <label for="pink">Pink</label>
                </div>

                <div>
                <input
                    type="radio"
                    name="color"
                    value="Rainbow"
                    id="rainbow"
                    onChange={handleChange}
                    checked={post.color === 'Rainbow'}
                />
                <label for="rainbow">Rainbow</label>
                </div>
                </fieldset>

                <br/>
                <input type="submit" value="Update Crewmate" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete Crewmate</button>
            </form>
        </div>
    )
}

export default EditPost