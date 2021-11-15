import styles from '../styles/Form.module.css'
import React, { useState } from 'react';
import firebaseClient from "../util/firebaseClient";
import Select from 'react-select';

type app = {
    name: string;
    website: string;
    handles: string;
    founders: string;
    email: string;
    mission: string;
    industry: string;
}

const options = [
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" },
    { value: "Finance", label: "Finance" },
    { value: "Environment", label: "Environment" },
    { value: "Software", label: "Software" },
    { value: "Social Entrepreneurship", label: "Social Entrepreneurship"}
];

export default function Form() {
    const firestore = firebaseClient.firestore();
    const [app, updateApp] = useState({});
    const addItem = () => {
        firestore.collection('apps').add({app});
    };
    const handleChange = (event: any) => {
        updateApp(event.target.value);
        console.log(app);
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        addItem();
    };

    return (
        <div>
            <div className={`${styles.container}`}>
                <form onSubmit={handleSubmit}>
                    <label> startup name:
                        <input type="text" name="name"  onChange={handleChange}></input>
                    </label>
                    <label> founders:
                        <input type="text" name="founders"  onChange={handleChange}></input>
                    </label>
                    <label> emails:
                        <input type="text" name="emails"  onChange={handleChange}></input>
                    </label>
                    <label> website:
                        <input type="text" name="website"  onChange={handleChange}></input>
                    </label>
                    <label> social media handles:
                        <input type="text" name="handles"  onChange={handleChange}></input>
                    </label>
                    <label> mission statement:
                        <textarea name="mission"  onChange={handleChange}></textarea>
                    </label>
                    <label> industry:
                        <Select name="industry" onChange={handleChange} options={options}/>
                    </label>
                    <button onClick={handleSubmit}> submit </button>
                </form>
            </div>
        </div>
        
    )
}
