import { getProjects, getProjectTest } from "@/sanity/sanity.query";
import type { TestType } from "@/types";
import ProjectList from "../components/project-list";

export default async function Home() {
  const project: TestType[] = await getProjectTest();
  const projectsSibiu = await getProjects("projects-sibiu");
  const projectsValcea = await getProjects("projects-valcea");
  const allProjects = [...projectsSibiu, ...projectsValcea];

  return (
    <main className="">
      <section className="">
        {project &&
          project.map((data) => (
            <div key={data._id} className="">
              
              <h1 className="">{data.headline}</h1>
              <p className="">{data.shortBio}</p>
              <ul className="flex items-center gap-x-6 my-10">
                {Object.entries(data.socialLinks)
                  .sort()
                  .map(([key, value], id) => (
                    <li key={id}>
                      <a
                        href={value}
                        rel="noreferer noopener"
                        className="flex items-center gap-x-3 mb-5 hover:text-purple-400 duration-300"
                      >
                        {key[0].toUpperCase() + key.toLowerCase().slice(1)}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

      </section>

      <ProjectList projects={allProjects}/>
    </main>
  );
}