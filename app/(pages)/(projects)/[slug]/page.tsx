
import styles from './page.module.scss';
import { getProject } from "@/sanity/sanity.query";
import { ProjectType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-component";
import { PortableText } from "next-sanity";
import GoogleMapComponent from "@/app/components/google-maps/google-map";


export default async function ProjectPage({ params}: {params: Promise<{ slug: string }>;}) {
  const { slug } = await params;
  const project = await getProject(slug) as ProjectType;
  
  return (
    <main className={`${styles['page-container']} `}>

      <section className="swiper-section">
        <SwiperComponent images={project?.images} projectName={project?.name}/>
      </section>
      
      <section className="info border-bottom">
          <div className="col col-1">{project?.name}</div>
          <div className="col col-2">
            {project?.visitTime?.map((time, idx) => (
              <div key={idx}>{time}</div>
            ))}
          </div>
      </section>

      <section className="info border-bottom">
          <div className="col col-1">{project?.address}</div>
          <div className="col col-2">{project?.transport}</div>
      </section>

      <section className="info border-bottom">
          <div className="col col-1"><PortableText value={project?.description} /></div>
          <div className="col col-2"><GoogleMapComponent /></div>
      </section>

      <section className="info border-bottom">
          <div className="col col-1"><PortableText value={project?.otherInfo} /></div>
          <div className="col col-2"></div>
      </section>

    </main>
  );
}