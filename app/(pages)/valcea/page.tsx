import { getProjects} from "@/sanity/sanity.query";
import ProjectList from "../../components/project-list";

export default async function Valcea() {

  const projects = await getProjects("projects-valcea");

  return (
    <><ProjectList houses={projects} /><ProjectList houses={projects} /></>
  );
}