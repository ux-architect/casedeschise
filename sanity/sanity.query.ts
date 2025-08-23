import { groq } from "next-sanity";
import client from "./sanity.client";
import { FaqType, SiteInfoType } from "@/types";

const revalidateInterval = 120; // ms

export async function getGeneralInfo(): Promise<SiteInfoType> {
  return client.fetch(
    groq`*[_type == "general-info"][0]{
    _id,

    siteEntryCover {
        sibiu{ image, "url": asset->url},
        valcea{ image, "url": asset->url }
      },

    cityPageCover {
      sibiu{ image, "url": asset->url},
      valcea{ image, "url": asset->url }
    },

    eventDate,

    misionStatement1,
    misionStatement2,
    contactFormImage{"image": asset->url},

    "pdfSibiu": pdfSibiu.asset->{url, originalFilename},
    "pdfValcea": pdfValcea.asset->{url, originalFilename},

    team[]{name, role, "image": image.asset->url },
    partners[]{name, "logo": logo.asset->url, type, link },
    socialMedia[]{name, link, city },

    currentYear,
  }`,{},
  {next: { revalidate: revalidateInterval }, }); // 1-hour ISR cache
}

export async function getFaqList(): Promise<FaqType[]> {
  const result = await client.fetch(
    groq`*[_type == "faq"][0]{
      faqList[]{_id, question, answer, city}
    }`,
    {},
    { next: { revalidate: revalidateInterval } }
  );

  return result?.faqList || [];
}

export async function getProject(slug: string) {
  return client.fetch(
    groq`*[_type in ['projects-sibiu', 'projects-valcea'] && slug.current == $slug][0]{
      _id,
      slug,
      name,

      metadata{"year":year, "section":section, "index":index},

      profileImage {"image": asset->url},
      images[]{"image": asset->url},
      address,
      visitTime,
      transport,
      gps,
      description,
      otherInfo,
    }`,
    { slug },{next: { revalidate: revalidateInterval }, }
  );
}

export async function getProjects(projectType: string, year?: string) {
  return client.fetch(
    groq`
      *[_type == $projectType && (!defined($year) || metadata.year == $year)]{
        _id,
        slug,
        name,

        metadata{"year":year, "section":section, "index":index},

        profileImage {"image": asset->url},
        address,
        gps,
        description,
      }
    `,
    { projectType, year: year ?? null },
    {next: { revalidate: revalidateInterval }, }
  );
}

export async function getTour(slug: string) {
  return client.fetch(
     groq`*[_type in ['tours-sibiu', 'tours-valcea'] && slug.current == $slug][0]{
      _id,
      slug,
      name,
      metadata{"year":year, "index":index},
      profileImage {"image": asset->url},
      images[]{"image": asset->url},
      address,
      visitTime,
      transport,
      gps,
      description,
    }`,
    { slug },
    {next: { revalidate: revalidateInterval }, }
  );
}

export async function getTours(tourType: string) {
  return client.fetch(
    groq`*[_type in [$tourType]]{
      _id,
      slug,
      name,
      metadata{"year":year, "index":index},
      profileImage {"image": asset->url},
      address,
      description,
    }`,
    { tourType },
    {next: { revalidate: revalidateInterval }, }
  );
}

export async function getEvent(slug: string) {
  return client.fetch(
     groq`*[_type in ['events-sibiu', 'events-valcea'] && slug.current == $slug][0]{
      _id,
      slug,
      name,
      metadata{"year":year, "index":index},
      profileImage1 {"image": asset->url},
      profileImage2 {"image": asset->url},
      images[]{"image": asset->url},
      address,
      visitTime,
      transport,
      gps,
      description,
    }`,
    { slug },
    {next: { revalidate: revalidateInterval }, }
  );
}

export async function getEvents(eventType: string) {
  return client.fetch(
    groq`*[_type in [$eventType]]{
      _id,
      slug,
      name,
      metadata{"year":year, "index":index},
      profileImage1 {"image": asset->url},
      profileImage2 {"image": asset->url},
      address,
      description,
    }`,
    { eventType },
    {next: { revalidate: revalidateInterval }, }
  );
}