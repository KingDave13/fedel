import {
    Navbar,
    Footer,
    Product,
    HeroProductEach,
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
        "products": *[_type == "product" && references(^._id)] {
          _id,
          name
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
            <HeroProductEach products={category.products} />

            <Product products={category.products} />
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
};

export default CategoryPage;