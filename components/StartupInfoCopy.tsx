import { useRouter } from "next/router";
import { useAuth } from "../util/firebaseAuthHelpers";
import { LinkedIn, Twitter, Facebook, Instagram } from "@mui/icons-material";
import opensea from "../images/opensea_logo.png";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import firebaseApp from "../util/firebaseApp";
import SplashScreen from "../util/splashscreen";
import Image from "next/image";

interface SocialMediaProps {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

function SocialMedia({
  facebook,
  twitter,
  linkedin,
  instagram,
}: SocialMediaProps) {
  return (
    <div className="flex justify-center items-center">
      {facebook && (
        <a href={facebook} target="_blank" rel="noreferrer">
          <Facebook className="" />
        </a>
      )}
      {instagram && (
        <a
          href={`https://www.instagram.com/${instagram.replaceAll("@", "")}`}
          target="_blank"
          rel="noreferrer"
        >
          <Instagram className="" />
        </a>
      )}
      {twitter && (
        <a
          href={`https://twitter.com/${twitter.replaceAll("@", "")}`}
          target="_blank"
          rel="noreferrer"
        >
          <Twitter className="" />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noreferrer">
          <LinkedIn className="" />
        </a>
      )}
    </div>
  );
}

export interface CompanyData {
  accentColor: string;
  approved: boolean;
  email: string;
  facebook?: string;
  founders: string;
  imageData: string;
  industry: string;
  instagram?: string;
  linkedin?: string;
  mission: string;
  name: string;
  twitter?: string;
  website: string;
  identifier: string;
}

export default function StartupInfoCopy() {
  const router = useRouter();
  const { startupSlug } = router.query;

  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);

  const [companyData, setCompanyData] = useState<CompanyData>(
    {} as CompanyData
  );

  useEffect(() => {
    if (startupSlug != null) {
      try {
        const getData = async () => {
          const db = getFirestore(firebaseApp);
          const appsCol = collection(db, "apps");
          const appQuery = query(
            appsCol,
            where("approved", "==", true),
            where("identifier", "==", startupSlug)
          );
          const appsSnapshot = await getDocs(appQuery);
          const appsList = appsSnapshot.docs.map((doc) => doc.data());
          if (appsList.length > 0) {
            setCompanyData(appsList[0] as CompanyData);
          }
        };
        getData();
      } catch (e) {
        window.alert(e);
      }
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [startupSlug]);

  // we could definitely have a better solution here but the next.js events for images finishing load are kinda awful
  // they fire like 5 times so its hard to programatically have the splash fade
  // maybe Nathan could weigh in here?

  const StopLoading = () => {
    setFading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  setTimeout(StopLoading, 2000);

  return (
    <div className="font-inter">
      {loading && <SplashScreen fading={fading} />}
      {/* just decided to mix tailwind and inline styles b/c arb color not wokring on tailwind*/}
      <div
        className={"h-32"}
        style={{ backgroundColor: companyData.accentColor }}
      />

      <div
        className="-mt-12 h-36 w-36 mx-auto rounded-lg border-4 p-1 border-white bg-white overflow-hidden"
        style={{ filter: "drop-shadow(0 5px 0.5rem gray)" }}
      >
        <img
          className="my-auto rounded-lg object-contain w-full h-full"
          // className="h-36 w-36 mx-auto rounded-full border-8 border-white"
          src={
            // opensea.src
            companyData.imageData != null ? companyData.imageData : opensea.src
          }
        />
      </div>

      <div className="max-w-3xl px-4 mx-auto -mt-2">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900">
          At a glance: <span className="font-light">{companyData.name}</span>
        </h1>
        <div className="flex justify-center divide-x  divide-x-gray-200 items-center mb-8">
          <div className="px-6 whitespace-nowrap">
            <div className="font-bold">Industry</div>
            {companyData.industry}
          </div>

          <div className="px-6 whitespace-nowrap">
            <div className="font-bold">Year</div>
            2019
          </div>

          <div className="px-6 whitespace-nowrap">
            <div className="font-bold">Contact</div>
            {companyData.email}
          </div>
          <div className="px-6 whitespace-nowrap">
            <div className="font-bold">Founders</div>
            {companyData.founders}
          </div>
          {(companyData.twitter ||
            companyData.instagram ||
            companyData.linkedin ||
            companyData.facebook) && (
            <div className="px-6 whitespace-nowrap">
              <div className="font-bold">Socials</div>
              <SocialMedia
                facebook={companyData.twitter}
                instagram={companyData.instagram}
                twitter={companyData.twitter}
                linkedin={companyData.linkedin}
              />
            </div>
          )}
          <div className="px-6 whitespace-nowrap">
            <div className="font-bold">Website</div>
            <a
              href={companyData.website}
              className="hover:text-blue-600 text-blue-500 focus:underline"
            >
              {companyData.website}
            </a>
          </div>
        </div>

        <div className="border-t pt-6 text-xl">
          <span className="font-bold">Description:</span> {companyData.mission}
        </div>

        {/* <div className="mt-4">
          <span className="font-bold">Description:</span> OpenSea is a
          peer-to-peer marketplace for crypto collectibles and non-fungible
          tokens. It includes collectibles, gaming items, and other virtual
          goods backed by a blockchain. On OpenSea, anyone can buy or sell these
          items through a smart contract.
        </div> */}
      </div>
    </div>
  );
}
