import {
  Navbar,
  Footer,
  Product,
  HeroProductEach,
  HeroText,
} from '../components';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../sanity';

import { Helmet } from 'react-helmet';

const CategoryPage = () => {

    const { slug } = useParams();
    const [category, setCategory] = useState(null);

  useEffect(() => {

    const query = `
      *[_type == "category" && slug.current == $slug][0] {
        name,
        description,
        herotext,
        "products": *[_type == "product" && references(^._id)] {
          _id,
          name,
          images,
          slug,
          attributes[]->{
            price,
            isDiscounted,
            OriginalPrice,
            dimensions,
            manufacturer,
            type,
            application,
            material,
            styleAndPattern,
          },
        }
      }
    `;
    client.fetch(query, { slug })
      .then((data) => setCategory(data))
      .catch((error) => console.error('Error fetching category:', error));
  }, [slug]);

  if (!category) {
    return <div>Loading...</div>;
  }

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>{category.name} | Fedel Tiles Limited</title>
                <meta name="description" content="The best tile and building materials dealer." />
            </Helmet>

            <Navbar />
            <HeroProductEach category={category} />
            <HeroText text={category.herotext} />
            
            <Product products={category.products} categorySlug={slug} />
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
};

export default CategoryPage;