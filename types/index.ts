import { PortableTextBlock } from "sanity";

export type TestType = {
  _id: string,
  fullName: string,
  headline: string,
  profileImage: {
    alt: string,
    image: string
  },
  shortBio: string,
  email: string,
  fullBio: PortableTextBlock[],
  location: string,
  resumeURL: string,
  socialLinks: string[],
  skills: string[],
};

export type ProjectType = {
  _id: string,
  name: string,
  profileImage: {
    alt: string,
    image: string
  },
  address: string,
  description: PortableTextBlock[],
};