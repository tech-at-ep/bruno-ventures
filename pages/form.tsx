import styles from '../styles/Form.module.css'
import React, { useState } from 'react';
import firebaseClient from "../util/firebaseClient";
import Select from 'react-select';
// import cx from 'classnames';

function Card() {
    return (
        <div className={styles.form_card}>
            <div className={styles.form_card_header}>List Your Startup</div>
        </div>
    )
}

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
    // { value: "", label: "Select your Industry" },
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

    const setProperty = (property: string, value: string) => {
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
        <div className={`${styles.text_form_container}`}>
            <form onSubmit={handleSubmit}>
                {/*<label> startup name:*/}
                    <input className={styles.input}  placeholder="Startup Name" type="text" name="name" onChange={e => setProperty("name", e.target.value)}></input>
                {/*</label>*/}
                {/*<label> founders:*/}
                    <input className={styles.input} placeholder="Founders" type="text" name="founders" onChange={e => setProperty("founders", e.target.value)}></input>
                {/*</label>*/}
                {/*<label> emails:*/}
                    <input className={styles.input} placeholder="Emails" type="text" name="emails" onChange={e => setProperty("emails", e.target.value)}></input>
                {/*</label>*/}
                {/*<label> website:*/}
                    <input className={styles.input} placeholder="Website Link" type="text" name="website" onChange={e => setProperty("website", e.target.value)}></input>
                {/*</label>*/}
                {/*<label> social media handles:*/}
                    <input className={styles.input} placeholder="Social Media Handles" type="text" name="handles" onChange={e => setProperty("handles", e.target.value)}></input>
                {/*</label>*/}
                {/*<label> mission statement:*/}
                    <textarea className={styles.textarea} placeholder="Company Description" name="mission" onChange={e => setProperty("mission", e.target.value)}></textarea>
                {/*</label>*/}
                {/*<label> industry:*/}
                    <select required className={styles.select} placeholder="Select" name="industry" onChange={e => setProperty("industry", e.target.value)}>
                        <option value="">Select Your Industry</option>
                        {options.map(({value, label}, index) => <option value={value}>{label}</option>)}
                    </select>
                {/*</label>*/}
                <button onClick={handleSubmit}> submit</button>
            </form>
        </div>
    )
}

// <div>
//     <img className={`${styles.bottom_right_vector} ${styles.noselect} ${styles.nodrag}`} src="/form_vector_2.svg" />
//     <div className={styles.form_title}>
//         <div>Welcome to</div>
//         <div>Bruno Ventures.</div>
//     </div>
//     <div className={`${styles.container}`}>
//         {/* <h1>TODO: For form page</h1> */}
//         <Card />
//     </div>
// </div>
