

import { getProjects, getGeneralInfo } from "@/sanity/sanity.query";
import ProjectList from "../../components/project-list";
import CoverSection from "../../components/global/cover-section";
import TeamSection from "@/app/components/global/team-section";


export default async function Sibiu() {

  const projects = await getProjects("projects-sibiu");

  return (
    <>
      <CoverSection page={"sibiu"}/>
      <TeamSection page={"sibiu"}/>
      <ProjectList projects={projects}/>

    </>
  );
}