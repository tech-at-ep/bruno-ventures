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

    const setProperty = (property:string, value:string) => {
        updateApp({
            ...app,
            [property]: value
        });
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
                        <input type="text" name="name"  onChange={e => setProperty("name", e.target.value)}></input>
                    </label>
                    <label> founders:
                        <input type="text" name="founders"  onChange={e => setProperty("founders", e.target.value)}></input>
                    </label>
                    <label> emails:
                        <input type="text" name="emails"  onChange={e => setProperty("emails", e.target.value)}></input>
                    </label>
                    <label> website:
                        <input type="text" name="website"  onChange={e => setProperty("website", e.target.value)}></input>
                    </label>
                    <label> social media handles:
                        <input type="text" name="handles"  onChange={e => setProperty("handles", e.target.value)}></input>
                    </label>
                    <label> mission statement:
                        <textarea name="mission"  onChange={e => setProperty("mission", e.target.value)}></textarea>
                    </label>
                    <label> industry:
                        <select name="industry" onChange={e => setProperty("industry", e.target.value)}>
                            {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                        </select>
                    </label>
                    <button onClick={handleSubmit}> submit </button>
                </form>
            </div>
        </div>
        
    )
}
