import { PortableTextBlock } from "sanity";

export type SiteInfoType = {
  _id: string,

  siteEntryCover: SibiuAndValceaImageType,
  cityPageCover: SibiuAndValceaImageType,
  eventDate: string,

  misionStatement1: PortableTextBlock[],
  misionStatement2: PortableTextBlock[],

  contactFormImage: {image: string },

  pdfSibiu: { url: string; originalFilename: string },

  pdfValcea: { url: string; originalFilename: string },

  team: {
    image: string,
    name: string,
    role: string
  }[];

  partners: {
    name: string,
    logo: string,
    type: string,
    link:string,
  }[];

  socialMedia: {
    name: string,
    city:string,
    link:string,
  }[];

  contactFields?:{address?:string, contactEmail?:string, contactPhone?:string, contactEmailForms?:string}

  currentYear: string

};

export type FaqType = {
      _id: string,
      question: string,
      answer: string,
      city: string
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

  tags?: ('bikeParking' | 'noPhotos' | 'accesible' | 'forChildren')[];

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

  tags?: ('bikeParking' | 'noPhotos' | 'accesible' | 'forChildren')[];
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

  tags?: ('bikeParking' | 'noPhotos' | 'accesible' | 'forChildren')[];
  description: PortableTextBlock[],

  slug: { current: string }
};

