import styles from "../styles/Home.module.css";
import CompanyCard from "../components/CompanyCard";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "../util/firebaseApp";
import { CompanyData } from "../components/StartupInfoCopy";

export default function Startups() {
  const [companies, setCompanies] = useState<Array<CompanyData>>([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const db = getFirestore(firebaseApp);
        const appsCol = collection(db, "apps");
        const appQuery = query(appsCol, where("approved", "==", true));
        const appsSnapshot = await getDocs(appQuery);
        const appsList = appsSnapshot.docs.map(
          (doc) => doc.data() as CompanyData
        );
        setCompanies(appsList);
        console.log(appsList);
      };

      getData();
    } catch (e) {}
  }, []);

  return (
    <div className={styles.container}>
      {companies.map((companyData) => (
        <CompanyCard
          accentColor={companyData.accentColor}
          identifier={companyData.identifier}
          imageUrl={companyData.imageData}
        />
      ))}
    </div>
  );
}
