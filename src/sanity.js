import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url";

export const client = new SanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    useCdn: true,
    apiVersion:'2023-05-10',
    dataset: 'production',
});

const builder = new ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
