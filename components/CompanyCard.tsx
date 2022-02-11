import opensea from "../images/opensea_logo.png";

export interface CompanyCardProps {
  accentColor: string;
  imageUrl: string;
  identifier: string;
}

export default function CompanyCard({
  accentColor,
  imageUrl,
  identifier,
}: CompanyCardProps) {
  return (
    <div
      style={{
        backgroundColor: accentColor,
        filter: "drop-shadow(0 5px 0.5rem gray)",
      }}
      className="h-64 w-64 rounded-3xl"
    >
      <img className={"rounded-3xl"} src={imageUrl} />
    </div>
  );
}
