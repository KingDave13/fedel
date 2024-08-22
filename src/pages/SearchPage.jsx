import {
    Navbar,
    Footer,
    SearchResults,
    HeroSearch,
} from '../components';

import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { client } from '../sanity';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('query');
        
        if (searchQuery) {
            setSearchTerm(searchQuery.toLowerCase());
            const fetchSearchResults = async () => {
                const query = `
                    *[_type == "product" && name match "${searchQuery.toLowerCase()}*"] {
                        _id,
                        name,
                        images,
                        slug,
                        category->{
                            slug {
                                current
                            }
                        },
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
                            color,
                        }
                    }
                `;

                const results = await client.fetch(query);
                const products = results.map(product => ({
                    ...product,
                    categorySlug: product.category?.slug?.current || ""
                }));
                setProducts(products);
            };
            fetchSearchResults();
        }
    }, [location.search]);

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Search Results | Shoptiles.ng</title>
                <meta name="description" content="View your search results" />
            </Helmet>

            <Navbar />

            <HeroSearch query={searchTerm} />
            
            <SearchResults products={products.map(product => ({ ...product, categorySlug: product.category?.slug?.current }))} />

            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default SearchPage;