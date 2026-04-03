import { groq } from "next-sanity";
import client from "./sanity.client";
import { FaqType, SignupFormType, SiteInfoType } from "@/types";
import { unstable_cache } from "next/cache";

// 3s in dev, 1h otherwise
const revalidateInterval = process.env.NODE_ENV === "development" ? 3 : 3 * 3600;

export const getGeneralInfo = unstable_cache(
  async (): Promise<SiteInfoType> => {
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

      "mediaKitSibiu": mediaKitSibiu.asset->{url, originalFilename},
      "mediaKitValcea": mediaKitValcea.asset->{url, originalFilename},

      team[]{name, role, city, "image": image.asset->url },
      partners[]{name, "logo": logo.asset->url, type, link, "logoWidth": logo.asset->metadata.dimensions.width, "logoHeight": logo.asset->metadata.dimensions.height,},
      socialMedia[]{name, link, city },

      contactFields[]{city, address, contactEmail, contactPhone, contactEmailForms},
      externalFormLinks_sibiu{visitFormExternalUrl, hostFormExternalUrl, volunteerFormExternalUrl, kidsWorkshopFormExternalUrl},
      externalFormLinks_valcea{visitFormExternalUrl, hostFormExternalUrl, volunteerFormExternalUrl, kidsWorkshopFormExternalUrl},

      sectionNames[]{year, s1_sibiu, s2_sibiu, s3_sibiu, s4_sibiu, s1_valcea, s2_valcea, s3_valcea, s4_valcea},
      signupForms_areActive,
      currentYear,
      sliderInterval,
    }`,
      {},
    );
  },
  ["generalInfo"],
  { revalidate: revalidateInterval, tags: ["general-info"] }
);

export const getFaqList  = unstable_cache(
  async (): Promise<FaqType[]> => {
    const result = await client.fetch( groq`*[_type == "faq"][0]{
      _id,
      faqList[]{_id, question, answer, city}
    }`)

    return result?.faqList || [];
  },
  ["faqList"],
  { revalidate: revalidateInterval, tags: ["faq"]  }
)


export const getProject = unstable_cache(
  async (slug: string) => {
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
      { slug }
    );
  },
  ["project"],
  { revalidate: revalidateInterval, tags: ["projects-sibiu", "projects-valcea"] }
);

export const getProjects = unstable_cache(
  async (projectType: string, year?: string) => {
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
    );
  },
  ["projects"],
  { revalidate: revalidateInterval, tags: ["projects-sibiu", "projects-valcea"] }
);

export const getArchiveProjects = unstable_cache(
  async (projectType: string) => {
    return client.fetch(
      groq`
        *[_type == $projectType]{
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
      { projectType },
    );
  },
  ["projects"],
  { revalidate: revalidateInterval, tags: ["projects-sibiu", "projects-valcea"] }
);

export const getTour = unstable_cache(
  async (slug: string) => {
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
        otherInfo,
      }`,
      { slug },
    );
  },
  ["tour"],
  { revalidate: revalidateInterval, tags: ["tours-sibiu", "tours-valcea"] }
);

export const getTours = unstable_cache(
  async (tourType: string, year?: string) => {
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
        otherInfo,
      }`,
      { tourType, year: year ?? null },
    );
  },
  ["tours"],
  { revalidate: revalidateInterval, tags: ["tours-sibiu", "tours-valcea"] }
);

export const getEvent = unstable_cache(
  async (slug: string) => {
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
        otherInfo,
      }`,
      { slug },
    );
  },
  ["event"],
  { revalidate: revalidateInterval, tags: ["events-sibiu", "events-valcea"] }
);

export const getEvents = unstable_cache(
  async (eventType: string, year?: string) => {
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
        otherInfo,
      }`,
      { eventType, year: year ?? null },
    );
  },
  ["events"],
  { revalidate: revalidateInterval, tags: ["events-sibiu", "events-valcea"] }
);

export const getSignupForm = unstable_cache(
  async (eventType: string): Promise<SignupFormType> => {
    return client.fetch(
      groq`*[_type == $eventType][0]{
        _id,
        title,
        terms_conditions,
        terms_checkbox_label,
        s1_title,
        s1_subtitle,
        s1_projects[]{ "image": image.asset->url, name, code, info,},
        s1_optionalItems{ texts[]{ text }, checkboxes[]{ checkboxLabel, infoText } },
        s2_title,
        s2_subtitle,
        s2_projects[]{ "image": image.asset->url, name, code, info,},
        s2_optionalItems{ texts[]{ text }, checkboxes[]{ checkboxLabel, infoText } },
        s3_title,
        s3_subtitle,
        s3_projects[]{ "image": image.asset->url, name, code, info,},
        s3_optionalItems{ texts[]{ text }, checkboxes[]{ checkboxLabel, infoText } },
      }`,
      { eventType },
    );
  },
  ["signupForm"],
  { revalidate: revalidateInterval, tags: ["signup-form-sibiu", "signup-form-valcea"] }
);