import { PortableTextBlock } from "sanity";

export type SiteInfoType = {
  _id: string,

  siteEntryCover: SibiuAndValceaImageType,
  cityPageCover: SibiuAndValceaImageType,
  eventDate: string,

  misionStatement1: PortableTextBlock[],
  misionStatement2: PortableTextBlock[],

  contactFormImage: {image: string };

  team: {
    image: string,
    name: string,
    role: string
  }[];

  currentYear: string

};

export type SibiuAndValceaImageType = {
  sibiu: { url: string }; 
  valcea: { url: string };
};

export type ProjectType = {
  _id: string,
  name: string,
  metadata?:{year?:string, section?:string, index?:string}
  profileImage: {image: string},
  images: {image: string }[];

  address: string,
  visitTime: string[],
  transport: string,
  gps: string,

  description: PortableTextBlock[],
  otherInfo: PortableTextBlock[],

  slug: { current: string }
};

export type TourType = {
  _id: string,
  name: string,
  metadata?:{year?:string, index?:string}
  profileImage: {image: string},
  images: {image: string }[];

  address: string,
  visitTime: string[],
  transport: string,
  gps: string,

  description: PortableTextBlock[],

  slug: { current: string }
};

export type EventType = {
  _id: string,
  name: string,
  metadata?:{year?:string, index?:string}
  profileImage1: {image: string},
  profileImage2: {image: string},
  images: {image: string }[];

  address: string,
  visitTime: string[],
  transport: string,
  gps: string,

  description: PortableTextBlock[],

  slug: { current: string }
};

