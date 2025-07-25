import { getProjects} from "@/sanity/sanity.query";
import ProjectList from "../../components/project-list";
import CoverSection from "@/app/components/global/cover-section";
import TeamSection from "@/app/components/global/team-section";

export default async function Valcea() {

  const projects = await getProjects("projects-valcea");

  return (
    <>
      <CoverSection page={"valcea"}/>
      <TeamSection page={"valcea"}/>
      <ProjectList projects={projects} />
    </>
  );
}