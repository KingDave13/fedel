import {createClient} from '@sanity/client'

console.log(process.env.REACT_APP_SANITY_PROJECT_ID);

export const client = createClient({
    projectId: '8sj9jirn',
    dataset: 'production',
    useCdn: true,
    apiVersion:'2023-05-03',
});
