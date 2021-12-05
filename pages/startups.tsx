import styles from '../styles/Home.module.css'
import Casper from "../assets/casper.png"
import Opensea from "../assets/opensea.png"
import Airbnb from "../assets/airbnb.png"
import Warby from "../assets/warby.png"
import SearchBar from "../components/SearchBar"
import Dropdown from "../components/Dropdown"
import { withOrientationChange } from 'react-device-detect'


//remove this! it's just for show
let arr: StaticImageData[] = []
arr.push(Casper, Opensea, Airbnb, Warby)

export default function Startups({isMobile}: {isMobile: Boolean}) {

  if(isMobile){
    return (
      <div className={styles.containerMobile}>
        <h1>Our Companies</h1>
        <SearchBar/>
        <div className={styles.dropdownMobile}>
        <Dropdown placeholder={"Industry"} isMobile={true}/>
        <Dropdown placeholder={"Funding Stage"} isMobile={true}/>
        <a href="#application"><p className="mt-4 px-20 py-2 cursor-pointer"><b>Add your startup</b> <span className="text-red-800">&#8594;</span></p></a>
        </div>
          <div className={styles.gridMobile}>
            {Array.from({ length: 12 }).map((_, idx) => (
              <div className={styles.cardMobile}>
              <img src={arr[Math.floor(Math.random() * arr.length)].src} className="left-0 right-0 object-contain"/>
            </div>
            ))}
          </div>
      </div>
  )
  }else{
    return (
      <div className={styles.container}>
        <h1>Our Companies</h1>
        <SearchBar/>
        <div className={styles.dropdown}>
        <Dropdown placeholder={"Industry"} isMobile={false}/>
        <Dropdown placeholder={"Funding Stage"} isMobile={false}/>
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
}