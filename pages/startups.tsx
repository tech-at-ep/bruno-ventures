// import styles from '../styles/Home.module.css'
import Casper from "../assets/casper.png"
import Opensea from "../assets/opensea.png"
import Airbnb from "../assets/airbnb.png"
import Warby from "../assets/warby.png"
import SearchBar from "../components/SearchBar"
import Dropdown from "../components/Dropdown"
import {useEffect, useState} from "react";
import {collection, getDocs, getFirestore, query, where} from "@firebase/firestore";
import {useRouter} from "next/router";

//remove this! it's just for show
let arr: StaticImageData[] = []
arr.push(Casper, Opensea, Airbnb, Warby)

export default function Startups() {
    const router = useRouter();
    const [startups, setStartups] = useState<any[]>([]);

    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, "apps"), where("approved", "==", true))
        getDocs(q)
            .then(docRefs => {
                const docs = docRefs.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setStartups(docs);
            })
    })
    return (
        <div className="holder">
            <h1>Our Companies</h1>
            {/*<SearchBar/>*/}
            {/*<div className="dropdown">*/}
            {/*    <Dropdown placeholder={"Industry"}/>*/}
            {/*    <Dropdown placeholder={"Funding Stage"}/>*/}
            {/*    <a href="#application"><p className="px-56 py-2 cursor-pointer"><b>Add your startup</b> <span*/}
            {/*        className="text-red-800">&#8594;</span></p></a>*/}
            {/*</div>*/}
            <div className="grid">
                {startups.map((startup: any) => <button className="card block"
                                                        onClick={() => router.push("/" + startup.id)}>
                    <img src={startup.imageData}
                         className="left-0 right-0 object-contain"/>
                </button>)}
            </div>
        </div>
    )
}
