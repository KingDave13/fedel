import React, { useState, useEffect } from "react";
import { client } from "../sanity";

const Filter = ({ products, updateFilteredProducts }) => {
  const [attributes, setAttributes] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    const query = `*[_type == "attribute"] {
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
    client.fetch(query).then((data) => {
      setAttributes(data);
    });
  }, []);

  const handleFilterChange = (attribute, value) => {
    setFilterValues((prevValues) => ({ ...prevValues, [attribute]: value }));
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      return Object.keys(filterValues).every((attribute) => {
        if (filterValues[attribute] === "") return true;
        if (product.attributes.find((attr) => attr._ref === attribute) === undefined) return false;
        if (Array.isArray(product.attributes.find((attr) => attr._ref === attribute).color)) {
          return product.attributes.find((attr) => attr._ref === attribute).color.includes(filterValues[attribute]);
        } else {
          return product.attributes.find((attr) => attr._ref === attribute)[attribute] === filterValues[attribute];
        }
      });
    });
    updateFilteredProducts(filteredProducts);
  }, [products, filterValues, updateFilteredProducts]);

  return (
    <section>
      <div className="flex flex-col w-full">
        {attributes.map((attribute) => (
          <div key={attribute.name} className="mb-6">
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
                        handleFilterChange(attribute.name, e.target.checked ? value : "")
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
                value={filterValues[attribute.name] || ""}
                onChange={(e) => handleFilterChange(attribute.name, e.target.value)}
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