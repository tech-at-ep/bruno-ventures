import styles from '../styles/Form.module.css'

function Card() {
    return (
        <div className={styles.form_card}>
            <div className={styles.form_card_header}>List Your Startup</div>
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

