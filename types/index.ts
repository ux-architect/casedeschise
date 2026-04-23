import { PortableTextBlock } from "sanity";

export type SiteInfoType = {
  _id: string,

  siteEntryCover: SibiuAndValceaImageType,
  cityPageCover: SibiuAndValceaImageType,
  eventDate: string,

  misionStatement1: PortableTextBlock[],
  misionStatement2: PortableTextBlock[],

  contactFormImage: {image: string },
  currentYearImage: {image: string },

  pdfSibiu: { url: string; originalFilename: string },
  pdfValcea: { url: string; originalFilename: string },

  mediaKitSibiu: { url: string; originalFilename: string },
  mediaKitValcea: { url: string; originalFilename: string },

  team: {
    image: string,
    name: string,
    role: string,
    city:string,
  }[];

  partners: {
    name: string,
    logo: string,
    type: string,
    link:string,
    logoWidth: string,
    logoHeight: string,
  }[];

  socialMedia: {
    name: string,
    city:string,
    link:string,
  }[];

  contactFields?:{city?:string, address?:string, contactEmail?:string, contactPhone?:string, contactEmailForms?:string}[];
  externalFormLinks_sibiu?:{visitFormExternalUrl?:string,   volunteerFormExternalUrl?: string, hostFormExternalUrl?:string, kidsWorkshopFormExternalUrl?:string}
  externalFormLinks_valcea?:{visitFormExternalUrl?:string,   volunteerFormExternalUrl?: string, hostFormExternalUrl?:string, kidsWorkshopFormExternalUrl?:string}

  sliderInterval?: number,
  signupForms_areActive?: boolean,

  sectionNames: {
    year: string,
    s1_sibiu:string,s2_sibiu:string,s3_sibiu:string,s4_sibiu:string,
    s1_valcea:string,s2_valcea:string,s3_valcea:string,s4_valcea:string,
  }[];

    currentYear: string,
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

  tags?: ('bikeParking' | 'noPhotos' | 'yesPhotos' | 'accesible' | 'forChildren')[];

  requiresSignup?: boolean;

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

  tags?: ('bikeParking' | 'noPhotos' | 'yesPhotos' | 'accesible' | 'forChildren' | 'soldOut')[];
  description: PortableTextBlock[],
  otherInfo: PortableTextBlock[],

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

  tags?: ('bikeParking' | 'noPhotos' | 'yesPhotos' | 'accesible' | 'forChildren'| 'soldOut')[];
  description: PortableTextBlock[],
  otherInfo: PortableTextBlock[],

  slug: { current: string }
};

export type SignupFormOptionalItems = {
  texts?: { text?: PortableTextBlock[] }[],
  checkboxes?: { checkboxLabel?: string, checkboxCode?: string, infoText?: PortableTextBlock[] }[],
}

export type SignupFormType = {
  _id: string,
  title: string,
  terms_conditions?: PortableTextBlock[],
  terms_checkbox_label?: string,

  s1_title?: string,
  s1_subtitle?: PortableTextBlock[],
  s1_projects?: SignupFormProjectType[],
  s1_optionalItems?: SignupFormOptionalItems,

  s2_title?: string,
  s2_subtitle?: PortableTextBlock[],
  s2_projects?: SignupFormProjectType[],
  s2_optionalItems?: SignupFormOptionalItems,

  s3_title?: string,
  s3_subtitle?: PortableTextBlock[],
  s3_projects?: SignupFormProjectType[],
  s3_optionalItems?: SignupFormOptionalItems,

  email_template?: string,
}

export type SignupFormProjectType = {
  image?: string, name?: string, subtitle?: string, code?: string, info?: string, address?: string, soldOut?: boolean,
}

export type CityKey = 'sibiu' | 'valcea';


