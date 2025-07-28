import { groq } from "next-sanity";
import client from "./sanity.client";
import { SiteInfoType } from "@/types";

export async function getGeneralInfo(): Promise<SiteInfoType> {
  return client.fetch(
    groq`*[_type == "general-info"][0]{
    _id,
    coverMain[]{"image": asset->url},
    coverSibiu[]{"image": asset->url},
    coverValcea[]{"image": asset->url},
    misionStatement1,
    misionStatement2,
    contactFormImage{"image": asset->url},

    team[]{
      name,
      role,
      "image": image.asset->url
    }
  }
`,{},{next: { revalidate: 3 }, }); // 1-hour ISR cache
}

export async function getProject(slug: string) {
  return client.fetch(
    groq`*[_type in ['projects-sibiu', 'projects-valcea'] && slug.current == $slug][0]{
      _id,
      slug,
      name,
      profileImage {"image": asset->url},
      images[]{"image": asset->url},
      address,
      visitTime,
      transport,
      gps,
      description,
      otherInfo,
    }`,
    { slug }
  );
}

export async function getProjects(projectType: string) {
  return client.fetch(
    groq`*[_type in [$projectType]]{
      _id,
      slug,
      name,
      profileImage {"image": asset->url},
      address,
      description,
    }`,
    { projectType }
  );
}