import GoogleMapComponent from "@/app/components/google-maps/google-map";
import ProvideJS_GoogleMaps from "@/app/components/google-maps/google-map-provider";
import styles from './page.module.scss';
import { getGeneralInfo, getProjects } from "@/sanity/sanity.query";
import { ProjectType, SiteInfoType } from "@/types";

export default async function Map({ params}: {params: Promise<{"sibiu-valcea": string}>;}) {
 const { ["sibiu-valcea"]: city } = await params;
 const generalInfo: SiteInfoType = await getGeneralInfo();
 const year = generalInfo?.currentYear;
 const projects = await getProjects("projects-" + city, year);

const markers = projects
  .map((project: ProjectType) => {
    if (!project.gps) return null; // skip if gps is null/undefined

    const coords = project.gps.split(",");
    if (coords.length !== 2) return null; // skip if not lat,lng format

    const lat = parseFloat(coords[0].trim());
    const lng = parseFloat(coords[1].trim());

    if (isNaN(lat) || isNaN(lng)) return null; // skip if parsing failed

    // Parse mainTitle and subtitle safely
    let mainTitle = project.name || "";
    let subtitle = "";

    if (mainTitle.includes("///")) {
      const parts = mainTitle.split("///").map((p) => p.trim());
      mainTitle = parts[0];
      subtitle = parts[1] || ""; // fallback to empty string if no second part
    }

    return {
      id: project._id,
      position: { lat, lng },
      title: mainTitle,
      subtitle,             
      image: project.profileImage?.image || null, 
      slug: project.slug.current,
    };
  })
  .filter((marker: any) => marker !== null); // filter out null results



  return (
    <div className={`${styles['pages-archive-2004-map']}`} >
      <ProvideJS_GoogleMaps>
        <GoogleMapComponent markers={markers} />
      </ProvideJS_GoogleMaps>
    </div>
  );
}

