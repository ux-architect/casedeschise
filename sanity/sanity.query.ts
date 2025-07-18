import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProjectTest() {
  return client.fetch(
    groq`*[_type == "project-name"]{
      _id,
      slug,
      fullName,
      headline,
      profileImage {alt, "image": asset->url},
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks,
      skills
    }`
  );
}

export async function getGeneralInfo() {
  return client.fetch(
    groq`*[_type == "general-info"][0]{
    _id,
    coverSibiu[]{
      "image": asset->url
    },
    coverValcea[]{
      "image": asset->url
    },
    team[]{
      name,
      role,
      "image": image.asset->url
    }
  }
`);
}

export async function getProject(slug: string) {
  return client.fetch(
    groq`*[_type in ['projects-sibiu', 'projects-valcea'] && slug.current == $slug][0]{
      _id,
      slug,
      name,
      profileImage {alt, "image": asset->url},
      address,
      description,
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
      profileImage {alt, "image": asset->url},
      address,
      description,
    }`,
    { projectType }
  );
}