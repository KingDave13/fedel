import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { TiArrowSortedDown } from "react-icons/ti";


const Filter = ({ products, updateFilteredProducts }) => {
  const [attributes, setAttributes] = useState({
    types: [],
    materials: [],
    applications: [],
    sizes: [],
    stylesAndPatterns: [],
    colors: [],
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

  const presetColors = {
    White: "ffffff",
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Purple: "#800080",
    Pink: "#FFC0CB",
    Teal: "#008080",
    Black: "#000000",
  };
  
  useEffect(() => {
    const uniqueAttributes = {
      types: new Set(),
      materials: new Set(),
      applications: new Set(),
      sizes: new Set(),
      stylesAndPatterns: new Set(),
      colors: new Set(),
    };

    products.forEach((product) => {
      product.attributes.forEach((attribute) => {
        if (attribute.type) uniqueAttributes.types.add(attribute.type);
        if (attribute.material) uniqueAttributes.materials.add(attribute.material);
        if (attribute.application) uniqueAttributes.applications.add(attribute.application);
        if (attribute.dimensions) uniqueAttributes.sizes.add(attribute.dimensions);
        if (attribute.styleAndPattern) uniqueAttributes.stylesAndPatterns.add(attribute.styleAndPattern);
        if (attribute.color) attribute.color.forEach((color) => uniqueAttributes.colors.add(color.toLowerCase()));
      });
    });

    setAttributes({
      types: [...uniqueAttributes.types],
      materials: [...uniqueAttributes.materials],
      applications: [...uniqueAttributes.applications],
      sizes: [...uniqueAttributes.sizes],
      stylesAndPatterns: [...uniqueAttributes.stylesAndPatterns],
      colors: [...uniqueAttributes.colors],
    });
  }, [products]);

  const handleFilterChange = (fieldName, value) => {
    setFilterValues((prevValues) => {
      if (fieldName === "price") {
        return { ...prevValues, price: { ...prevValues.price, ...value } };
      }
      
      const newValue = prevValues[fieldName].includes(value)
        ? prevValues[fieldName].filter((item) => item !== value)
        : [...prevValues[fieldName], value];
      return { ...prevValues, [fieldName]: newValue };
    });
  };

  const handleInputChange = (field, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      price: {
        ...prevValues.price,
        [field]: value
      }
    }));
  };

  const cleanPrice = (priceStr) => {
    if (!priceStr) return NaN;
    return parseFloat(priceStr.replace(/,/g, ''));
  };

  useEffect(() => {
    const applyFilters = () => {
      const filteredProducts = products.filter((product) => {
  
        if (filterValues.types.length > 0 && !product.attributes.some((attr) => filterValues.types.includes(attr.type))) {
          return false;
        }
  
        if (filterValues.materials.length > 0 && !product.attributes.some((attr) => filterValues.materials.includes(attr.material))) {
          return false;
        }
  
        if (filterValues.applications.length > 0 && !product.attributes.some((attr) => filterValues.applications.includes(attr.application))) {
          return false;
        }

        if (filterValues.stylesAndPatterns.length > 0 && !product.attributes.some((attr) => filterValues.stylesAndPatterns.includes(attr.styleAndPattern))) {
          return false;
        }

        if (filterValues.sizes.length > 0 && !product.attributes.some((attr) => filterValues.sizes.includes(attr.dimensions))) {
          return false;
        }
        
        if (filterValues.colors.length > 0) {
          const productColors = product.attributes.find(attr => attr.color)?.color || [];
          if (!filterValues.colors.every(color => productColors.map(c => c.toLowerCase()).includes(color.toLowerCase()))) {
            return false;
          }
        }     
        
        const productPriceStr = product.attributes.find(attr => attr.price)?.price;
        const productPrice = cleanPrice(productPriceStr);

        if (isNaN(productPrice)) {
          return false;
        }

        const isWithinRange = productPrice >= filterValues.price.min && productPrice <= filterValues.price.max;
        return isWithinRange;
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
              value={[filterValues.price.min, filterValues.price.max]}
              onChange={(value) =>
                handleFilterChange("price", { min: value[0], max: value[1] })
              }
            />
            </div>
            <div className="flex gap-3 justify-between mt-5 w-full">
              <div className="w-full">
                <label className="block text-[13px] font-semibold mb-1">
                  From (<span className="line-through">N</span>)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-1 border border-main3 rounded-lg 
                  bg-transparent text-main3"
                  value={filterValues.price.min}
                  onChange={(e) =>
                    handleInputChange("min", parseInt(e.target.value))
                  }
                  min={0}
                  max={275000}
                />
              </div>

              <div className="w-full">
                <label className="block text-[13px] font-semibold mb-1">
                  To (<span className="line-through">N</span>)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-1 border border-main3 rounded-lg 
                  bg-transparent text-main3"
                  value={filterValues.price.max}
                  onChange={(e) =>
                    handleInputChange("max", parseInt(e.target.value))
                  }
                  min={0}
                  max={275000}
                />
              </div>
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
          <div className="flex flex-wrap gap-2 md:max-h-40 ss:max-h-32 
          max-h-24 overflow-y-auto">
            {Object.keys(presetColors).map((colorName) => (
              <div
                key={colorName}
                onClick={() => handleFilterChange("colors", colorName.toLowerCase())}
                className={`w-10 h-6 cursor-pointer rounded-md border-[0.5px]
                ${filterValues.colors.includes(colorName.toLowerCase()) ? 
                  "border-main" : ""}`}
                style={{ backgroundColor: presetColors[colorName] }}
              />
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