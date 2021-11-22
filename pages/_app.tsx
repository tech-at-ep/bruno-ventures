import styles from '../styles/Home.module.css'
import Head from "next/head";
import opensea from '../images/opensea_logo.png'
import Dropdown from "../components/Dropdown"

const imagePath = '../images/opensea_logo.png'
// import image from imagePath

function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Test Title</div>
        </div>
    )
}

function Logo() {
    return <img src={imagePath} width="66" height="65"/>
}

export default function Startups() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.logo}>
            <Logo />
            </div>
            <div className={styles.dropdown}>
                <div className={styles.description}>
                <h2>Industry</h2>
                <p>Blockchain</p>
                </div>
                <div className={styles.description}>
                <h2>Year</h2>
                <p>2019</p>
                </div>
                <div className={styles.description}>
                <h2>Contact</h2>
                <p>hello@opensea.io</p>
                </div>
                <div className={styles.description}>
                <h2>Website</h2>
                <p><a href="https://opensea.io/">opensea.io</a></p>
                </div>
            </div>
            <div className={styles.description}>
            Mission Statement: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id venenatis diam. Pellentesque enim enim, fermentum vel nisi quis, facilisis dapibus turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 

Description: Mauris ultricies eu nibh at efficitur. Ut tortor metus, pellentesque eu turpis tincidunt, ultricies semper dui. Sed tincidunt sit amet enim quis facilisis. Sed a volutpat augue. Fusce gravida sapien risus, vitae consectetur magna maximus at. Aliquam a augue tellus. Mauris eleifend, tortor a venenatis laoreet, justo nisi euismod libero, quis pulvinar arcu arcu non sapien. Donec pulvinar elit id eros varius convallis.
            </div>
        </div>
    )
}
