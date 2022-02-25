import StartupInfo from "../components/StartupInfo";
import StartupInfoCopy from "../components/StartupInfoCopy";
import admin from "../util/firebaseAdmin";
import { Query } from "firebase-admin/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { CompanyData } from "../components/StartupInfoCopy";
import { ParsedUrlQuery } from "querystring";

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const db = admin.firestore();
  const col = db.collection("apps");
  const snapshot = await col.where("approved", "==", true).get();
  const identifiers = snapshot.docs.map((doc) => doc.data().identifier);
  const paths = identifiers.map((id) => {
    return {
      params: { startupSlug: id },
    };
  });
  console.log("approved startups:", identifiers);
  return {
    paths: paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  startupSlug: string;
}

export const getStaticProps: GetStaticProps<CompanyData, Params> = async (
  context
) => {
  const { startupSlug } = context.params!;
  const db = admin.firestore();
  const col = db.collection("apps");
  const snapshot = await col.where("identifier", "==", startupSlug).get();
  const companyData = snapshot.docs[0].data();
  return { props: companyData as CompanyData };
};

export default function Startup({
  accentColor,
  approved,
  email,
  facebook,
  founders,
  imageData,
  industry,
  instagram,
  linkedin,
  mission,
  name,
  twitter,
  website,
  identifier,
}: CompanyData) {
  return (
    <div>
      <StartupInfoCopy
        accentColor={accentColor}
        approved={approved}
        email={email}
        facebook={facebook}
        founders={founders}
        imageData={imageData}
        industry={industry}
        instagram={instagram}
        linkedin={linkedin}
        mission={mission}
        name={name}
        twitter={twitter}
        website={website}
        identifier={identifier}
      />
    </div>
  );
}
