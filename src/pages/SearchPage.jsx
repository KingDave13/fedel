import {
    Navbar,
    Footer,
    SearchResults,
} from '../components';

import { Helmet } from 'react-helmet';

const SearchPage = () => {
   
    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Search Results | Shoptiles.ng</title>
                <meta name="description" content="View your search results" />
            </Helmet>

            <Navbar />
            
            <SearchResults />

           <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default SearchPage;