import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProject() {
  return client.fetch(
    groq`*[_type == "project-name"]{
      _id,
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

export async function getProjects(projectType: string) {
  return client.fetch(
    groq`*[_type in [$projectType]]{
      _id,
      name,
      profileImage {alt, "image": asset->url},
      address,
      description,
    }`,
    { projectType }
  );
}