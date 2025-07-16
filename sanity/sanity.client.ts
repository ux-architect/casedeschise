import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "x30qpt6x",
  dataset: "production",
  apiVersion: "2025-07-14",
  useCdn: false,
};

const client = createClient(config);

export default client;