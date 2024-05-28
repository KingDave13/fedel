import { useState, useEffect } from "react";

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

    products.forEach(product => {
      product.attributes.forEach(attribute => {
        uniqueAttributes.types.add(attribute.type);
        uniqueAttributes.materials.add(attribute.material);
        uniqueAttributes.applications.add(attribute.application);
        uniqueAttributes.colors.add(attribute.color);
        uniqueAttributes.sizes.add(attribute.dimensions);
        uniqueAttributes.stylesAndPatterns.add(attribute.styleAndPattern);
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
      if (fieldName === 'price') {
        return { ...prevValues, [fieldName]: value };
      }
      const newValue = prevValues[fieldName].includes(value)
        ? prevValues[fieldName].filter(item => item !== value)
        : [...prevValues[fieldName], value];
      return { ...prevValues, [fieldName]: newValue };
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      const filteredProducts = products.filter((product) => {
        return Object.keys(filterValues).every((fieldName) => {
          if (fieldName === "price") {
            const price = product.attributes.find(attr => attr.price);
            return price && price.price >= filterValues.price.min && price.price <= filterValues.price.max;
          }
          if (filterValues[fieldName].length === 0) return true;
          const attributeValue = product.attributes.find(attr => filterValues[fieldName].includes(attr[fieldName]));
          return attributeValue !== undefined;
        });
      });
      updateFilteredProducts(filteredProducts);
    };

    applyFilters();
  }, [filterValues, products, updateFilteredProducts]);

  return (
    <div className="flex flex-col w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Type</h3>
        {attributes.types.map(type => (
          <label key={type} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filterValues.types.includes(type)}
              onChange={() => handleFilterChange('types', type)}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Material</h3>
        {attributes.materials.map(material => (
          <label key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filterValues.materials.includes(material)}
              onChange={() => handleFilterChange('materials', material)}
              className="mr-2"
            />
            {material}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Application</h3>
        {attributes.applications.map(application => (
          <label key={application} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filterValues.applications.includes(application)}
              onChange={() => handleFilterChange('applications', application)}
              className="mr-2"
            />
            {application}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price</h3>
        <div className="flex flex-col">
          <input
            type="range"
            min="0"
            max="275000"
            value={filterValues.price.min}
            onChange={(e) => handleFilterChange('price', { ...filterValues.price, min: parseInt(e.target.value) })}
            className="mb-2"
          />
          <input
            type="range"
            min="0"
            max="275000"
            value={filterValues.price.max}
            onChange={(e) => handleFilterChange('price', { ...filterValues.price, max: parseInt(e.target.value) })}
            className="mb-2"
          />
          <div>
            Price Range: {filterValues.price.min} - {filterValues.price.max}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Color</h3>
        {attributes.colors.map(color => (
          <label key={color} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filterValues.colors.includes(color)}
              onChange={() => handleFilterChange('colors', color)}
              className="mr-2"
            />
            {color}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Size</h3>
        {attributes.sizes.map(size => (
          <label key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filterValues.sizes.includes(size)}
              onChange={() => handleFilterChange('sizes', size)}
              className="mr-2"
            />
            {size}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Style and Pattern</h3>
        {attributes.stylesAndPatterns.map(styleAndPattern => (
          <label key={styleAndPattern} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filterValues.stylesAndPatterns.includes(styleAndPattern)}
              onChange={() => handleFilterChange('stylesAndPatterns', styleAndPattern)}
              className="mr-2"
            />
            {styleAndPattern}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;