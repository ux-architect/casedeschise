import { groq } from "next-sanity";
import client from "./sanity.client";
import { SiteInfoType } from "@/types";

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

    team[]{
      name,
      role,
      "image": image.asset->url
    },
    currentYear,
  }
`,{},{next: { revalidate: 3 }, }); // 1-hour ISR cache
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
    { slug }
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
        description,
      }
    `,
    { projectType, year: year ?? null }
  );
}

export async function getTour(slug: string) {
  return client.fetch(
     groq`*[_type in ['tour-sibiu', 'tour-valcea'] && slug.current == $slug][0]{
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
    { slug }
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
    { tourType }
  );
}

export async function getEvent(slug: string) {
  return client.fetch(
     groq`*[_type in ['event-sibiu', 'event-valcea'] && slug.current == $slug][0]{
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
    }`,
    { slug }
  );
}

export async function getEvents(eventType: string) {
  return client.fetch(
    groq`*[_type in [$eventType]]{
      _id,
      slug,
      name,
      profileImage {"image": asset->url},
      address,
      description,
    }`,
    { eventType }
  );
}