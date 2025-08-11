import GoogleMapComponent from "@/app/components/google-maps/google-map";
import ProvideJS_GoogleMaps from "@/app/components/google-maps/google-map-provider";
import styles from './page.module.scss';
import { getProjects } from "@/sanity/sanity.query";
import { ProjectType } from "@/types";

const projects = await getProjects("projects-valcea", '2024');

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
      subtitle,             // add subtitle property
      // icon: "/icons/marker-red.png",
      image: project.profileImage?.image || "", // safe access and fallback
    };
  })
  .filter((marker: any) => marker !== null); // filter out null results


export default function Map() {
  return (
    <div className={`${styles['namespace-container']}`} >
      <ProvideJS_GoogleMaps>
        <GoogleMapComponent markers={markers} />
      </ProvideJS_GoogleMaps>
    </div>
  );
}

