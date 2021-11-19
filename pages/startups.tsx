import styles from '../styles/Home.module.css'
import Casper from "../assets/casper.png"
import Opensea from "../assets/opensea.png"
import Airbnb from "../assets/airbnb.png"
import Warby from "../assets/warby.png"
import SearchBar from "../components/SearchBar"
import Dropdown from "../components/Dropdown"

//remove this! it's just for show
let arr: StaticImageData[] = []
arr.push(Casper, Opensea, Airbnb, Warby)

export default function Startups() {
    return (
        <div className={styles.container}>
          <h1>Our Companies</h1>
          <SearchBar/>

          <div className={styles.dropdown}>
          <Dropdown placeholder={"Industry"}/>
          <Dropdown placeholder={"Funding Stage"}/>
          <a href="#application"><p className="px-56 py-2 cursor-pointer"><b>Add your startup</b> <span className="text-red-800">&#8594;</span></p></a>
          </div>
          

          
            <div className={styles.grid}>
              {Array.from({ length: 12 }).map((_, idx) => (
                <div className={styles.card}>
                <img src={arr[Math.floor(Math.random() * arr.length)].src} className="left-0 right-0 object-contain"/>
              </div>
              ))}
            </div>
        </div>
    )
}
