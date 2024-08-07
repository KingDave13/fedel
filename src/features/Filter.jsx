import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { TiArrowSortedDown } from "react-icons/ti";


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

  const [visibility, setVisibility] = useState({
    types: true,
    materials: true,
    applications: true,
    colors: true,
    sizes: true,
    stylesAndPatterns: true,
    price: true,
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
        return { ...prevValues, [fieldName]: { min: value[0], max: value[1] } };
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

  const toggleVisibility = (section) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [section]: !prevVisibility[section],
    }));
  };

  return (
    <div className="flex flex-col w-full md:gap-6 ss:gap-5 gap-4">
      <div className="">
        <div className="flex justify-between items-center md:mb-4 ss:mb-3 
        mb-2 cursor-pointer"
        onClick={() => toggleVisibility('types')}
        >
          <h3 className="md:text-[17px] ss:text-[17px] text-[14px] font-bold 
          text-main">
            Type
          </h3>

          <TiArrowSortedDown 
            className='text-main text-[18px]'
          />
        </div>
        
        {visibility.types && (
          <div className="overflow-y-auto md:max-h-40 ss:max-h-32 max-h-24">
            {attributes.types.map(type => (
              <label key={type} className="flex items-center gap-1 mb-0.5">
                <input
                  type="checkbox"
                  checked={filterValues.types.includes(type)}
                  onChange={() => handleFilterChange('types', type)}
                  className="md:mr-2 ss:mr-2 mr-1 cursor-pointer"
                />
                <span className="md:text-[15px] ss:text-[15px] text-[13px] 
                font-medium">
                  {type}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="">
        <div className="flex justify-between items-center md:mb-4 ss:mb-3 
        mb-2 cursor-pointer"
        onClick={() => toggleVisibility('materials')}
        >
          <h3 className="md:text-[17px] ss:text-[17px] text-[14px] font-bold 
          text-main">
            Material
          </h3>

          <TiArrowSortedDown 
            className='text-main text-[18px]'
          />
        </div>

        {visibility.materials && (
          <div className="overflow-y-auto md:max-h-40 ss:max-h-32 max-h-24">
            {attributes.materials.map(material => (
              <label key={material} className="flex items-center gap-1 mb-0.5">
                <input
                  type="checkbox"
                  checked={filterValues.materials.includes(material)}
                  onChange={() => handleFilterChange('materials', material)}
                  className="md:mr-2 ss:mr-2 mr-1 cursor-pointer"
                />
              <span className="md:text-[15px] ss:text-[15px] text-[13px] 
                font-medium">
                  {material}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="">
        <div className="flex justify-between items-center md:mb-4 ss:mb-3 
        mb-2 cursor-pointer"
        onClick={() => toggleVisibility('applications')}
        >
          <h3 className="md:text-[17px] ss:text-[17px] text-[14px] font-bold 
          text-main">
            Application
          </h3>

          <TiArrowSortedDown 
            className='text-main text-[18px]'
          />
        </div>

        {visibility.applications && (
          <div className="overflow-y-auto md:max-h-40 ss:max-h-32 max-h-24">
            {attributes.applications.map(application => (
              <label key={application} className="flex items-center gap-1 
              mb-0.5">
                <input
                  type="checkbox"
                  checked={filterValues.applications.includes(application)}
                  onChange={() => handleFilterChange('applications', application)}
                  className="md:mr-2 ss:mr-2 mr-1 cursor-pointer"
                />
                <span className="md:text-[15px] ss:text-[15px] text-[13px] 
                font-medium">
                  {application}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="">
        <div className="flex justify-between items-center md:mb-4 ss:mb-3 
        mb-2 cursor-pointer"
        onClick={() => toggleVisibility('price')}
        >
          <h3 className="md:text-[17px] ss:text-[17px] text-[14px] font-bold 
          text-main">
            Price
          </h3>

          <TiArrowSortedDown 
            className='text-main text-[18px]'
          />
        </div>

        {visibility.price && (
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
        )}
      </div>

      <div className="">
        <div className="flex justify-between items-center md:mb-4 ss:mb-3 
        mb-2 cursor-pointer"
        onClick={() => toggleVisibility('colors')}
        >
          <h3 className="md:text-[17px] ss:text-[17px] text-[14px] font-bold 
          text-main">
            Colour
          </h3>

          <TiArrowSortedDown 
            className='text-main text-[18px]'
          />
        </div>
        
        {visibility.colors && (
          <div className="overflow-y-auto md:max-h-40 ss:max-h-32 max-h-24">
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
        )}
      </div>

      <div className="">
        <div className="flex justify-between items-center md:mb-4 ss:mb-3 
        mb-2 cursor-pointer"
        onClick={() => toggleVisibility('sizes')}
        >
          <h3 className="md:text-[17px] ss:text-[17px] text-[14px] font-bold 
          text-main">
            Size
          </h3>

          <TiArrowSortedDown 
            className='text-main text-[18px]'
          />
        </div>

        {visibility.sizes && (
          <div className="overflow-y-auto md:max-h-40 ss:max-h-32 max-h-24">
            {attributes.sizes.map(size => (
              <label key={size} className="flex items-center gap-1 mb-0.5">
                <input
                  type="checkbox"
                  checked={filterValues.sizes.includes(size)}
                  onChange={() => handleFilterChange('sizes', size)}
                  className="md:mr-2 ss:mr-2 mr-1 cursor-pointer"
                />
              <span className="md:text-[15px] ss:text-[15px] text-[13px] 
                font-medium">
                  {size}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="">
        <div className="flex justify-between items-center md:mb-4 ss:mb-3 
        mb-2 cursor-pointer"
        onClick={() => toggleVisibility('stylesAndPatterns')}
        >
          <h3 className="md:text-[17px] ss:text-[17px] text-[14px] font-bold 
          text-main">
            Style and Pattern
          </h3>

          <TiArrowSortedDown 
            className='text-main text-[18px]'
          />
        </div>
        
        {visibility.stylesAndPatterns && (
          <div className="overflow-y-auto md:max-h-40 ss:max-h-32 max-h-24">
            {attributes.stylesAndPatterns.map(styleAndPattern => (
              <label key={styleAndPattern} className="flex items-center 
              gap-1 mb-0.5">
                <input
                  type="checkbox"
                  checked={filterValues.stylesAndPatterns.includes(styleAndPattern)}
                  onChange={() => handleFilterChange('stylesAndPatterns', styleAndPattern)}
                  className="md:mr-2 ss:mr-2 mr-1 cursor-pointer"
                />
                <span className="md:text-[15px] ss:text-[15px] text-[13px] 
                font-medium">
                  {styleAndPattern}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;