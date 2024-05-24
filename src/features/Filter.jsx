import { useState, useEffect } from "react";
import { client } from "../sanity";


const Filter = ({ products, updateFilteredProducts }) => {
  const [attributes, setAttributes] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    const query = `
      *[_type == "product"] {
        attributes
      }
    `;

    client.fetch(query)
        .then((data) => setAttributes(data))
}, []);

  const handleFilterChange = (fieldName, value) => {
    setFilterValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
  };

  useEffect(() => {
    const applyFilters = () => {
      const filteredProducts = products.filter((product) => {
        return Object.keys(filterValues).every((fieldName) => {
          if (filterValues[fieldName] === false) return true;
          const attributeValue = product.attributes.find(
            (attr) => attr._ref === fieldName
          );
          if (!attributeValue) return false;
          if (Array.isArray(attributeValue.color)) {
            return attributeValue.color.includes(filterValues[fieldName]);
          } else {
            return attributeValue[fieldName] === filterValues[fieldName];
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
        <div>
        <h3>{attribute.name}</h3>
        <p>{attribute.title}</p>
      </div>
    
      ))}
    </div>
  </section>


  );
};

export default Filter;
