import GoogleMapComponent from "@/app/components/google-maps/google-map";
import ProvideJS_GoogleMaps from "@/app/components/google-maps/google-map-provider";
import styles from './page.module.scss';
import { getGeneralInfo, getProjects } from "@/sanity/sanity.query";
import { ProjectType, SiteInfoType } from "@/types";

export default async function Map(
  { params, searchParams}: 
  {
    params: Promise<{"sibiu-valcea": string}>, 
    searchParams?: Promise<{ select?: string, centerLat?: string, centerLng?: string, z?: string }>
  }) {
    const queryString = await searchParams;
    const selectedMarkerSlug = queryString?.select;
    const mapCenter =  queryString?.centerLat && queryString?.centerLng ? {lat: parseFloat(queryString.centerLat),lng: parseFloat(queryString.centerLng),} : undefined;

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
          mainTitle = parts[0] || parts[1];
          subtitle = parts[1] || ""; // fallback to empty string if no second part
        }

        return {
          id: project._id,
          position: { lat, lng },
          title: mainTitle,
          subtitle,             
          image: project.profileImage?.image || null, 
          slug: project.slug.current,
          selected: project.slug.current === selectedMarkerSlug,
        };
      })
      .filter((marker: any) => marker !== null); // filter out null results



  return (
    <div className={`${styles['namespace-container']}`} >
        <ProvideJS_GoogleMaps>
          {/*optionaly pass in center only if mapCenter is constrocted from the query string*/}
          <GoogleMapComponent markers={markers} {...(mapCenter ? { center: mapCenter } : {})} />
        </ProvideJS_GoogleMaps>
    </div>
  );
}

