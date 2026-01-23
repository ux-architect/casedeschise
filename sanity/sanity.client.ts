import createClient, { type ClientConfig } from "@sanity/client";
import {createImageUrlBuilder}  from '@sanity/image-url'
import type { SanityImageSource } from "@sanity/image-url";

const config: ClientConfig = {
  // projectId: "x30qpt6x",
  projectId: "4sefwx29", //ux.studio.sibiu
  dataset: "production",
  apiVersion: "2025-07-14",
  useCdn: false,
};

const client = createClient(config);

export default client;


const builder = createImageUrlBuilder (client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}