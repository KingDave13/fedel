import { useState, useEffect } from "react";
import { client } from "../sanity";

const FilterCard = ({ attribute, filterValues, handleFilterChange }) => {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h3 className="text-main font-bold text-lg">
        Types
      </h3>

      <div className="max-h-80 overflow-y-auto flex gap-2">
          <input
            type="checkbox"
          />
          <label htmlFor="" className="text-main">
            {attribute.types}
          </label>
      </div>
      
    </div>
  );
};


const Filter = ({ products, updateFilteredProducts }) => {
  const [attributes, setAttributes] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const query = `*[_type == "attribute"] {
          _id,
          type,
          material,
          application,
          styleAndPattern,
          color,
          dimensions,
          manufacturer,
          price
        }`;
        const data = await client.fetch(query);
        setAttributes(data);
      } catch (error) {
        console.error("Error fetching attributes:", error);
        // Handle error - Show error message or retry fetching
      }
    };

    fetchAttributes();
  }, []);

  const handleFilterChange = (attribute, value) => {
    setFilterValues((prevValues) => ({ ...prevValues, [attribute]: value }));
  };

  useEffect(() => {
    const applyFilters = () => {
      const filteredProducts = products.filter((product) => {
        return Object.keys(filterValues).every((attribute) => {
          if (filterValues[attribute] === "") return true;
          const attributeValue = product.attributes.find((attr) => attr._ref === attribute);
          if (!attributeValue) return false;
          if (Array.isArray(attributeValue.color)) {
            return attributeValue.color.includes(filterValues[attribute]);
          } else {
            return attributeValue[attribute] === filterValues[attribute];
          }
        });
      });
      updateFilteredProducts(filteredProducts);
    };

    applyFilters();
  }, [products, filterValues, updateFilteredProducts]);

  return (
    <section>
      <div className="flex flex-col w-full">
        {attributes.map((attribute) => (
          <FilterCard 
            key={attribute._id} 
            attribute={attribute} 
            filterValues={filterValues} 
            handleFilterChange={handleFilterChange} 
          />
        ))}
      </div>
    </section>
  );
};

export default Filter;