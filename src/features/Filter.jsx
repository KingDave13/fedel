import { useState, useEffect } from "react";
import { client } from "../sanity";

const Filter = ({ products, updateFilteredProducts }) => {
  const [attributes, setAttributes] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const query = `*[_type == "attribute"] {
          _id,
          name,
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
          <div key={attribute._id} className="mb-6">
            <h3 className="text-main font-bold text-lg">{attribute.name}</h3>
            {attribute.type === "array" ? (
              <div className="flex flex-wrap">
                {attribute.color.map((value) => (
                  <div key={value} className="mr-4">
                    <input
                      type="checkbox"
                      id={value}
                      name={attribute.name}
                      value={value}
                      onChange={(e) =>
                        handleFilterChange(attribute._id, e.target.checked ? value : "")
                      }
                    />
                    <label htmlFor={value} className="text-main text-sm">
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <input
                type="text"
                id={attribute.name}
                name={attribute.name}
                value={filterValues[attribute._id] || ""}
                onChange={(e) => handleFilterChange(attribute._id, e.target.value)}
                className="w-full text-main text-sm"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filter;