import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({name: "", speed: "", color: ""})

    const createPost = async (event) => {
        event.preventDefault()

        await supabase
            .from('Crewmates')
            .insert({name: post.name, speed: post.speed, color: post.color})
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
            <form>
                <label for="name">Name:</label> <br />
                <input type="text" id="name" name="name" placeholder="Enter crewmate's name" onChange={handleChange} /><br />
                <br/>

                <label for="speed">Speed (mph):</label><br />
                <input type="text" id="speed" name="speed" placeholder="Enter speed in mph" onChange={handleChange} /><br />
                <br/>

                <div class="radio-wrapper">
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
                </div>
                
                
                <br/>
                <input type="submit" value="Create Crewmate" onClick={createPost}/>
            </form>
        </div>
    )
}

export default CreatePost