import styles from '../styles/Form.module.css'
// import React, { useState } from 'react';
import firebaseApp from "../util/firebaseApp";
// import Select from 'react-select';
// import cx from 'classnames';
import { getFunctions, httpsCallable } from 'firebase/functions';
import {createRef, useState, Dispatch, SetStateAction, useEffect} from 'react';
//@ts-ignore
import { hexToCSSFilter } from "hex-to-css-filter";


interface CardProps {
    accentColor: string;
    setAccentColor : Dispatch<SetStateAction<string>>;
    resetForm: Dispatch<SetStateAction<boolean>>;
    isSubmitted: boolean;
}

function ValidateApp(app : Application) : string {

    const keysMap: Record<string, string> = {
        name: 'Startup name',
        website: 'Website link',
        year: 'Founding year',
        mission: 'Company Description/ Mission Statement',
        imageData: 'Logo'
    }

    const socials = ["twitter", "facebook", "instagram", "linkedin", "accentColor"]
    let error = ""
    let errFound = false;
    Object.entries(app).forEach(
        ([key, value]) => {
            if (value === "" && !(socials.some(a => a === key))) {
                let field = key.charAt(0).toUpperCase() + key.slice(1);
                if (key in keysMap){
                    field = keysMap[key];
                }
                if (!errFound) {
                    error = field + " must not be empty";
                    errFound = true;
                }
            }
    });
    if (error != "") {
        return error
    }
    
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailFormat.test(app.email.toLowerCase())) {
        return "Must submit a valid email";
    }

    const urlFormat = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    if (!urlFormat.test(app["website"])) {
        return "Must submit a valid website";
    }

    if (app["twitter"] === "" && app["instagram"] === "" 
    && app["facebook"] === "" && app["linkedin"] === "") {
        return "Must submit at least one social media handle";
    }

    if (isNaN(parseInt(app['year']))){
        return "Must submit a valid founding year (e.g. 2020)";
    }

    return error;
}

const empty = {
    name: '',
    founders: '',
    email: '',
    website: '',
    twitter: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    mission: '',
    year: '',
    industry: '',
    accentColor: '',
    imageData: '',
    approved: false,
}

function Card({setAccentColor, resetForm, isSubmitted, accentColor} : CardProps) {
    const functions = getFunctions(firebaseApp)
    const addStartUp = httpsCallable(functions, 'addStartUp');
    const titleColor = perceievedLuminance(hexToRgb(accentColor)) > 220 ? 
    '#000000' : 
    '#ffffff';
    const [app, updateApp] = useState<Application>(empty);

    const setProperty = (property: string, value: string) => {
        updateApp({
            ...app,
            [property]: value
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const error = ValidateApp(app)
        if (error === ""){
            console.log("validated")
            addStartUp({app});
            reset();
        } else {
            alert(error);
        }
    };

    const reset = () => {
        updateApp(empty);
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        Array.from(document.querySelectorAll("textarea")).forEach(
            textarea => (textarea.value = "")
        );
        Array.from(document.querySelectorAll("select")).forEach(
            select => (select.value = "")
        );

        const btn = document.querySelector("#btn") as HTMLInputElement;
        const btnText = document.querySelector("#btnText") as HTMLInputElement;

        btnText.innerHTML = "Thanks";
        btn.classList.add("active");
        resetForm(true);

        setTimeout(function() {
            console.log('reseted')
            resetForm(false);
            btnText.innerHTML = "Submit";
            btn.classList.remove("active");
        }, 6000);
      };

    
    return (
        <div className={styles.form_card}>
            <div className={styles.form_card_header}>List Your Startup</div>            
            <div className={styles.form_body}>
                <TextForm setProperty={setProperty}/>
                <LogoForm setAccentColor={setAccentColor} setProperty={setProperty} isSubmitted={isSubmitted}/>
                <div className={styles.padding}>
                    <button id="btn" className={styles.button} onClick={handleSubmit} style={{background: accentColor, color: titleColor}}>
                    <p id="btnText">Submit</p>
                        <div className="check-box">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                <path id="path" fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

type Application = {
    name: string;
    founders: string;
    email: string;
    website: string;
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    mission: string;
    year: string;
    industry: string;
    accentColor: string;
    imageData: string;
    approved: boolean;
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

interface TextFormProps {
    setProperty : (arg0 : string, arg1 : string) => void;
    // addItem : () => void;
    
}

function TextForm({setProperty} : TextFormProps) {
    return (
        <div className={`${styles.text_form_container}`}>
            <form>
                <label> startup name:</label>
                <input className={styles.input} placeholder="Startup Name" type="text" name="name" onChange={e => setProperty("name", e.target.value)}></input>
                <label> founders:</label>
                    <input className={styles.input} placeholder="Founders" type="text" name="founders" onChange={e => setProperty("founders", e.target.value)}></input>
                <label> emails:</label>
                    <input className={styles.input} placeholder="Email" type="email" name="emails" onChange={e => setProperty("email", e.target.value)}></input>
                <label> website:</label>
                    <input className={styles.input} placeholder="Website Link" type="text" name="website" onChange={e => setProperty("website", e.target.value)}></input>
                <label> social media handles:</label>
                <div className={styles.socials}>
                    <input className={styles.handle} placeholder="Twitter" type="text" name="handles" onChange={e => {
                        if (e.target.value.length == 0) {
                            e.target.value == '';
                        } else if (e.target.value[0] !== '@') {
                            e.target.value = '@' + e.target.value;
                        }
                        setProperty("twitter", e.target.value);                    
                    }} />
                    <input className={styles.handle} placeholder="Facebook" type="text" name="handles" onChange={e => setProperty("facebook", e.target.value)}></input>
                    <input className={styles.handle} placeholder="Instagram" type="text" name="handles" onChange={e => {
                        if (e.target.value.length == 0) {
                            e.target.value == '';
                        } else if (e.target.value[0] !== '@') {
                            e.target.value = '@' + e.target.value;
                        }
                        setProperty("instagram", e.target.value);                    
                    }} />
                    <input className={styles.handle} placeholder="Linkedin" type="text" name="handles" onChange={e => setProperty("linkedin", e.target.value)}></input>
                </div>
                
                <label> mission statement:</label>
                    <textarea className={styles.textarea} placeholder="Company Description / Mission Statement" name="mission" onChange={e => setProperty("mission", e.target.value)}></textarea>
                <div className={styles.socials}>
                    <label> founding year:</label>
                    <input className={styles.handle} placeholder="Founding Year" type="text" name="year" onChange={e => setProperty("year", e.target.value)}></input>
                    <label> industry:</label>
                        <select required className={styles.select} placeholder="Select" name="industry" onChange={e => setProperty("industry", e.target.value)}>
                            <option value="">Select Your Industry</option>
                            {options.map(({value, label}, index) => <option value={value}>{label}</option>)}
                        </select> 
                </div>             
            </form>
        </div>
    )}

type VectorProps = {
    accentColor : string
}

function FirstVector({ accentColor } : VectorProps) {
    return (
        <svg className={`${styles.top_left_vector}  ${styles.noselect} ${styles.nodrag}`} width="581" height="760" viewBox="0 0 581 760" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M194.796 -60.6554L501.485 287.537L-34.3108 759.468L-341 411.276L194.796 -60.6554Z" fill={accentColor}/>
        <path d="M501.485 287.537C405.334 372.227 258.734 362.936 174.044 266.785C89.3542 170.635 98.645 24.0345 194.796 -60.6554C290.946 -145.345 437.546 -136.055 522.236 -39.904C606.926 56.2466 597.635 202.847 501.485 287.537Z" fill={accentColor}/>
        </svg>
    )
}

function SecondVector({ accentColor } : VectorProps) {
    return (
        <svg className={`${styles.bottom_right_vector}  ${styles.noselect} ${styles.nodrag}`} width="636" height="754" viewBox="0 0 636 754" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M368.962 794.473L96.9548 418.563L675.402 -4.19617e-05L947.409 375.91L368.962 794.473Z" fill={accentColor}/>
        <path d="M96.9548 418.563C200.759 343.45 345.801 366.71 420.913 470.514C496.026 574.319 472.767 719.36 368.962 794.473C265.158 869.585 120.116 846.326 45.0037 742.521C-30.1091 638.717 -6.84975 493.676 96.9548 418.563Z" fill={accentColor}/>
        </svg>
    )
}

interface RGB {
    r : number,
    g : number,
    b : number
}

function hexToRgb(hex : string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
}

function perceievedLuminance(color : RGB): number {
    return 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;
}

interface LogoFormProps {
    setAccentColor : Dispatch<SetStateAction<string>>;
    setProperty : (arg0 : string, arg1 : string) => void;
    isSubmitted : boolean;
}

function LogoForm({ setAccentColor, setProperty, isSubmitted} : LogoFormProps) {
    const fileInputRef = createRef<HTMLInputElement>();
    const colorInputRef = createRef<HTMLInputElement>();

    const [image, setImage] = useState<string>("");
    const [accentColor, setLocalAccentColor] = useState<string>("#FF5A5F")
    const [uploadedFile, setUploadedFile] = useState<File>();

    useEffect(() => {
        if (isSubmitted){
            setLocalAccentColor("#FF5A5F");
            setImage("");
        }
    })

    const onLogoUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }
        setUploadedFile(event.target.files[0]);
        let reader = new FileReader();
        reader.onload = (ev : ProgressEvent<FileReader>) => {
            if (ev.target?.result != null) {
                setImage(ev.target.result.toString());
                setProperty('imageData', ev.target.result.toString());
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    const logoOnClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const colorOnClick = () => {
        if (colorInputRef.current) {
            colorInputRef.current.click();
        }
    }

    return (
        <div className={styles.logo_form}>
            <div 
                className={styles.logo_selector}
                onClick={logoOnClick} >
                <div className="image_upload_text"
                style={image == '' ? {marginBottom: '0.5rem'} : {display: 'none'}}> Upload your Logo</div>
                {image == '' ? 
                <div>
                    <img style={ image == '' ? {opacity: '70%'} : {display: 'none'}} src="/upload_24px.png"/>
                </div>
                :
                <div>
                    <img style={{maxHeight: '9.5rem', maxWidth: '9.5rem'}} src={image}/>
                </div>
                }
                <input 
                    type='file' 
                    style={{
                        opacity: 0.0,
                        position: 'absolute',
                        top: 0,
                        left: -500000, // hide file input off screen to use my styled div
                    }} 
                    ref={fileInputRef}
                    onChange={onLogoUploaded}
                />
            </div>
            <div 
                className={styles.color_selector}
                onClick={colorOnClick}
            >
                <div>Select an Accent Color</div>
                <div 
                    className={styles.color_box} 
                    style={{
                        backgroundColor: accentColor
                    }}
                />
                <input 
                    type='color'
                    style={{
                        opacity: 0,
                        cursor: 'pointer'
                    }}
                    onChange={(event) => {
                        if (event.target?.value) {
                            setLocalAccentColor(event.target.value);
                            setAccentColor(event.target.value);
                            setProperty('accentColor', event.target.value)
                        }
                    }}
                    ref={colorInputRef}
                />
            </div>
        </div>

    )
}

export default function Form() {
    const [accentColor, setAccentColor] = useState<string>("#FF5A5F");
    const titleColor = perceievedLuminance(hexToRgb(accentColor)) > 220 ? 
        '#000000' : 
        '#ffffff';

    const [isSubmitted, resetForm] = useState(false);
    useEffect(() => {
        if (isSubmitted){
            setAccentColor("#FF5A5F");
        }
    })

    return (
        <div className={styles.form_container} style={{position: 'relative'}}>
            <FirstVector accentColor={accentColor}/>
            <SecondVector accentColor={accentColor}/>
            <div className={styles.form_title} style={{color: titleColor}}>
                <div style={{marginBottom:'0px', paddingTop: '2rem'}}>Welcome to</div>
                <div style={{marginTop:'-0.7rem'}}>Bruno Ventures.</div>
            </div>
            <div className={`${styles.container}`}>
                <Card setAccentColor={setAccentColor} 
                    accentColor={accentColor} 
                    resetForm={resetForm} isSubmitted={isSubmitted}/>            
            </div>
       </div>
        
    )
}

