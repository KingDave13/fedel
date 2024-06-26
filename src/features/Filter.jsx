import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = ({ products, updateFilteredProducts }) => {
  const [attributes, setAttributes] = useState({
    types: [],
    materials: [],
    applications: [],
    colors: [],
    sizes: [],
    stylesAndPatterns: [],
  });

  const [filterValues, setFilterValues] = useState({
    types: [],
    materials: [],
    applications: [],
    colors: [],
    sizes: [],
    stylesAndPatterns: [],
    price: { min: 0, max: 275000 },
  });

  useEffect(() => {
    const uniqueAttributes = {
      types: new Set(),
      materials: new Set(),
      applications: new Set(),
      colors: new Set(),
      sizes: new Set(),
      stylesAndPatterns: new Set(),
    };

    products.forEach((product) => {
      product.attributes.forEach((attribute) => {
        if (attribute.type) uniqueAttributes.types.add(attribute.type);
        if (attribute.material) uniqueAttributes.materials.add(attribute.material);
        if (attribute.application) uniqueAttributes.applications.add(attribute.application);
        if (attribute.color) uniqueAttributes.colors.add(attribute.color);
        if (attribute.dimensions) uniqueAttributes.sizes.add(attribute.dimensions);
        if (attribute.styleAndPattern) uniqueAttributes.stylesAndPatterns.add(attribute.styleAndPattern);
      });
    });

    setAttributes({
      types: [...uniqueAttributes.types],
      materials: [...uniqueAttributes.materials],
      applications: [...uniqueAttributes.applications],
      colors: [...uniqueAttributes.colors],
      sizes: [...uniqueAttributes.sizes],
      stylesAndPatterns: [...uniqueAttributes.stylesAndPatterns],
    });
  }, [products]);

  const handleFilterChange = (fieldName, value) => {
    setFilterValues((prevValues) => {
      if (fieldName === "price") {
        return { ...prevValues, [fieldName]: value };
      }
      const newValue = prevValues[fieldName].includes(value)
        ? prevValues[fieldName].filter((item) => item !== value)
        : [...prevValues[fieldName], value];
      return { ...prevValues, [fieldName]: newValue };
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      const filteredProducts = products.filter((product) => {
        return Object.keys(filterValues).every((fieldName) => {
          if (fieldName === "price") {
            const priceAttribute = product.attributes.find((attr) => attr.price);
            const price = priceAttribute ? priceAttribute.price : 0;
            return price >= filterValues.price.min && price <= filterValues.price.max;
          }
          if (filterValues[fieldName].length === 0) return true;
          return product.attributes.some((attr) => filterValues[fieldName].includes(attr[fieldName]));
        });
      });
      updateFilteredProducts(filteredProducts);
    };

    applyFilters();
  }, [filterValues, products, updateFilteredProducts]);

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="">
        <h3 className="text-[17px] font-bold mb-4 text-main">
          Type
        </h3>
        <div className="overflow-y-auto max-h-52">
          {attributes.types.map(type => (
            <label key={type} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filterValues.types.includes(type)}
                onChange={() => handleFilterChange('types', type)}
                className="mr-2 cursor-pointer"
              />
              <span className="">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="text-[17px] font-bold mb-4 text-main">
          Material
        </h3>
        <div className="overflow-y-auto max-h-52">
          {attributes.materials.map(material => (
            <label key={material} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filterValues.materials.includes(material)}
                onChange={() => handleFilterChange('materials', material)}
                className="mr-2 cursor-pointer"
              />
              {material}
            </label>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="text-[17px] font-bold mb-4 text-main">
          Application
        </h3>
        <div className="overflow-y-auto max-h-52">
          {attributes.applications.map(application => (
            <label key={application} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filterValues.applications.includes(application)}
                onChange={() => handleFilterChange('applications', application)}
                className="mr-2 cursor-pointer"
              />
              {application}
            </label>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="text-[17px] font-bold mb-4 text-main">
          Price
        </h3>
        <div className="flex flex-col bg-main2 p-4 rounded-lg">
          <div className="">
            <Slider
              range
              min={0}
              max={275000}
              defaultValue={[filterValues.price.min, filterValues.price.max]}
              onChange={(values) => handleFilterChange("price", { min: values[0], max: values[1] })}
            />
          </div>
          <div className="flex justify-between text-[14px] mt-2">
            <span>{`N${filterValues.price.min}`}</span>
            <span>{`N${filterValues.price.max}`}</span>
          </div>
        </div>
      </div>

      <div className="">
        <h3 className="text-[17px] font-bold mb-4 text-main">
          Color
        </h3>
        <div className="overflow-y-auto max-h-52">
          {attributes.colors.map(color => (
            <label key={color} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filterValues.colors.includes(color)}
                onChange={() => handleFilterChange('colors', color)}
                className="mr-2 cursor-pointer"
              />
              {color}
            </label>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="text-[17px] font-bold mb-4 text-main">
          Size
        </h3>
        <div className="overflow-y-auto max-h-52">
          {attributes.sizes.map(size => (
            <label key={size} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filterValues.sizes.includes(size)}
                onChange={() => handleFilterChange('sizes', size)}
                className="mr-2 cursor-pointer"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="text-[17px] font-bold mb-4 text-main">
          Style and Pattern
        </h3>
        <div className="overflow-y-auto max-h-52">
          {attributes.stylesAndPatterns.map(styleAndPattern => (
            <label key={styleAndPattern} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filterValues.stylesAndPatterns.includes(styleAndPattern)}
                onChange={() => handleFilterChange('stylesAndPatterns', styleAndPattern)}
                className="mr-2 cursor-pointer"
              />
              {styleAndPattern}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;