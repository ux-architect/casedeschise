import { groq } from "next-sanity";
import client from "./sanity.client";
import { FaqType, SiteInfoType } from "@/types";

const revalidateInterval = 10; // ms

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
    currentYearImage{"image": asset->url},
    contactFormImage{"image": asset->url},
    

    "pdfSibiu": pdfSibiu.asset->{url, originalFilename},
    "pdfValcea": pdfValcea.asset->{url, originalFilename},

    team[]{name, role, "image": image.asset->url },
    partners[]{name, "logo": logo.asset->url, type, link },
    socialMedia[]{name, link, city },

    contactFields{address, contactEmail, contactPhone, contactEmailForms},
    externalFormLinks_sibiu{visitFormExternalUrl, hostFormExternalUrl, volunteerFormExternalUrl, kidsWorkshopFormExternalUrl},
    externalFormLinksValcea{visitFormExternalUrl, hostFormExternalUrl, volunteerFormExternalUrl, kidsWorkshopFormExternalUrl},

    sectionNames[]{year, s1_sibiu, s2_sibiu, s3_sibiu, s4_sibiu, s1_valcea, s2_valcea, s3_valcea, s4_valcea},

    currentYear,
    sliderInterval,
    revalidateInterval,
  }`,{},
  {next: { revalidate: revalidateInterval }, }); // 1-hour ISR cache
}

export async function getFaqList(): Promise<FaqType[]> {
  const result = await client.fetch(
    groq`*[_type == "faq"][0]{
      _id,
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
      tags,
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
        images[]{"image": asset->url},
        address,
        visitTime,
        transport,
        gps,
        tags,
        description,
        otherInfo,
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
      tags,
      description,
    }`,
    { slug },
    {next: { revalidate: revalidateInterval }, }
  );
}

export async function getTours(tourType: string, year?: string) {
  return client.fetch(
    groq`*[_type == $tourType && (!defined($year) || metadata.year == $year)]{
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
      tags,
      description,
    }`,
    { tourType, year: year ?? null },
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
      tags,
      description,
    }`,
    { slug },
    {next: { revalidate: revalidateInterval }, }
  );
}

export async function getEvents(eventType: string, year?: string) {
  return client.fetch(
    groq`*[_type == $eventType && (!defined($year) || metadata.year == $year)]{
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
      tags,
      description,
    }`,
    { eventType, year: year ?? null },
    {next: { revalidate: revalidateInterval }, }
  );
}