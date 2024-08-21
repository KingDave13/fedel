import {
    Navbar,
    Footer,
    SearchResults,
} from '../components';

import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { client } from '../sanity';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
    const location = useLocation();
    const [categorySlug, setCategorySlug] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('query');
        
        if (searchQuery) {
            const fetchSearchResults = async () => {
                if (!searchQuery) {
                    // Handle cases where searchQuery is not provided
                    console.log("Search query is missing");
                    return;
                }
                
                const query = `
                    *[_type == "category" && slug.current == $slug][0] {
                        name,
                        description,
                        "products": *[_type == "product" && references(^._id) && name match $searchQuery] {
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
                                color,
                            },
                        }
                    }
                `;
            
                const results = await client.fetch(query, { 
                    slug: categorySlug, 
                    searchQuery: `${searchQuery}*` 
                });
            
                if (results) {
                    setProducts(results.products || []);
                    setCategorySlug(categorySlug);
                }
            };
            fetchSearchResults();
        }
    }, [location.search, categorySlug]);
   
    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Search Results | Shoptiles.ng</title>
                <meta name="description" content="View your search results" />
            </Helmet>

            <Navbar />
            
            <SearchResults products={products}  categorySlug={categorySlug}/>

           <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default SearchPage;