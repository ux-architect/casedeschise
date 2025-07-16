
import { getProjects } from "@/sanity/sanity.query";
import ProjectList from "../../components/project-list";

export default async function Sibiu() {

  const projects = await getProjects("projects-sibiu");
  return (
      <ProjectList houses={projects}/>
  );
}