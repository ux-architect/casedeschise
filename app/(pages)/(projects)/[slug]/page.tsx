import Image from "next/image";
import { getProject } from "@/sanity/sanity.query";
import { ProjectType } from "@/types";

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug) as ProjectType;

  return (
    <main>
      <h1>{project.name}</h1>
      <Image
        src={project.profileImage.image}
        className="object-cover"
        alt={`${project.name} logo`}
        fill
      />
    </main>
  );
}