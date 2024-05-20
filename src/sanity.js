import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

export const client = SanityClient({
    useCdn: true,
    dataset: 'production',
    projectId: process.env.FEDEL_TILES_SANITY_PROJECT_ID,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);