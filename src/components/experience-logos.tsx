import Image from "next/image";
const organizations = [
  { name: "Tesla", file: "tesla" },
  { name: "Bank of America", file: "bank-of-america" },
  { name: "George Mason University", file: "george-mason" },
];
export default function ExperienceLogos() {
  return (
    <div className="trust-strip wrap">
      <span>EXPERIENCE ACROSS</span>
      {organizations.map((organization) => (
        <div
          className={`brand-logo logo-${organization.file}`}
          key={organization.file}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logos/${organization.file}.svg`}
            alt={organization.name}
            width={180}
            height={60}
            unoptimized
          />
        </div>
      ))}
      <span className="trust-caption">
        Software engineering and graduate study
      </span>
    </div>
  );
}
