import { PortableTextBlock } from "sanity";

export type SiteInfoType = {
  _id: string,

  coverMain: { image: string }[];
  coverSibiu: { image: string}[];
  coverValcea: {image: string }[];

  misionStatement1: PortableTextBlock[],
  misionStatement2: PortableTextBlock[],

  team: {
    image: string,
    name: string,
    role: string
  }[];

};

export type ProjectType = {
  _id: string,
  name: string,
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