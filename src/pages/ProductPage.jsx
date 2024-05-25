import {
    Navbar,
    Footer,
    // RelatedProducts,
    ProductDetails,
    // ImageGallery,
    HeroProduct,
} from '../components';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../sanity';
import { Helmet } from 'react-helmet';

const ProductPage = () => {
    const { categorySlug, productSlug } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const query = `
            *[_type == "product" && slug.current == $productSlug][0] {
                _id,
                name,
                description,
                images,
                attributes[]->{
                    name,
                    value
                },
                category->{
                    _id,
                    name,
                    "slug": slug.current
                }
            }
        `;
        client.fetch(query, { productSlug })
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [categorySlug, productSlug]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>{product.name} | Fedel Tiles Limited</title>
                <meta name="description" content={product.description} />
            </Helmet>

            <Navbar />
            <HeroProduct category={product.category} product={product} />
            
            <ProductDetails product={product} />
            {/* <div className="container mx-auto px-4 py-8">
                <ImageGallery images={product.images} />
                
                <RelatedProducts categoryId={product.category._id} />
            </div> */}

           <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default ProductPage;
