import styles from '../styles/Form.module.css'
import {createRef, useState} from 'react';

function Card() {
    return (
        <div className={styles.form_card}>
            <div className={styles.form_card_header}>List Your Startup</div>            
            <div className={styles.form_body}>
                <InfoForm />
                <LogoForm />
            </div>
        </div>
    )
}

function InfoForm() {
    return (
        <div className={styles.info_form}>Placeholder for info form</div>
    )
}


function LogoForm() {
    const fileInputRef = createRef<HTMLInputElement>();
    const colorInputRef = createRef<HTMLInputElement>();

    const [image, setImage] = useState<string>("");
    const [accentColor, setAccentColor] = useState<string>("#FF5A5F")
    const [uploadedFile, setUploadedFile] = useState<File>();

    const onLogoUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }
        setUploadedFile(event.target.files[0]);
        let reader = new FileReader();
        reader.onload = (ev : ProgressEvent<FileReader>) => {
            if (ev.target?.result != null) {
                setImage(ev.target.result.toString());
            }
        }
        reader.readAsDataURL(event.target.files[0]);
        console.log(event.target.files[0]);
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
                onClick={logoOnClick}
            >
                {image == '' && <div style={{marginBottom: '0.5rem'}}>Upload your Logo</div>}
                {image == '' ? 
                <div>
                    <img style={{opacity: '70%'}} src="/upload_24px.png"/>
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
                            setAccentColor(event.target.value);
                        }
                    }}
                    ref={colorInputRef}
                />
            </div>
        </div>

    )
}

export default function Form() {
    return (
        <div>
            <img className={`${styles.top_left_vector}  ${styles.noselect} ${styles.nodrag}`} src="/form_vector_1.svg" />
            <img className={`${styles.bottom_right_vector} ${styles.noselect} ${styles.nodrag}`} src="/form_vector_2.svg" />
            <div className={styles.form_title}>
                <div>Welcome to</div>
                <div>Bruno Ventures.</div>
            </div>
            <div className={`${styles.container}`}>
                {/* <h1>TODO: For form page</h1> */}
                <Card />            
            </div>
       </div>
        
    )
}

