import Image from "next/image";
import type { ProjectType } from "@/types";
import { PortableText } from "next-sanity";

type ProjectListProps = {
  houses: ProjectType[];
};

export default function ProjectList({ houses }: ProjectListProps) {
  return (
    <section className="mt-32">
      <div className="mb-16">
        <h2 className="font-semibold text-4xl mb-4">Work Experience</h2>
      </div>

      <div className="flex flex-col gap-y-12">
        {houses.map((data) => (
          <div
            key={data._id}
            className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[4.5rem] before:left-7 before:w-[1px] before:h-[calc(100%-50px)] before:bg-zinc-800"
          >
            <a
              href={'data.url'}
              rel="noreferrer noopener"
              className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative"
            >
              <Image
                src={data.profileImage.image}
                className="object-cover"
                alt={`${data.name} logo`}
                fill
              />
            </a>
            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold">{data.name}</h3>
              <p>{data.address}</p>
              <small className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                {data.name}
              </small>
              <PortableText value={data.description} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}