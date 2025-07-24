
import Image from "next/image";
import styles from './page.module.scss';
import { getProject } from "@/sanity/sanity.query";
import { ProjectType } from "@/types";
import SwiperComponent from "@/app/components/swiper-component";

export default async function ProjectPage({ params}: {params: Promise<{ slug: string }>;}) {
  const { slug } = await params;
  const project = await getProject(slug) as ProjectType;

  return (
    <main className={`${styles['page-container']} aaa`}>

      <SwiperComponent
        images={[project.profileImage.image, project.profileImage.image, project.profileImage.image]}
        projectName={project.name}
      />


      {/* <h1>{project.name}</h1>
      <Image src={project.profileImage.image} className="object-cover" alt={`${project.name} logo`} fill /> */}
    </main>
  );
}