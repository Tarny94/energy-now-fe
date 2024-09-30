import React, { useEffect, useState } from 'react';
import AutocompleteInput from '../components/Autocomplete';
import { County, City } from '../utils/region/romania/ICounty';
import { Counties } from '../utils/region/romania/counties';

interface IOption {
  code?: string;
  label: string;
}

const FindElectricianPage: React.FC = () => {
  const [selectedCounty, setSelectedCounty] =  useState("");
  const [selectedCity, setSelectedCity] =  useState("");
  const [selectedCities, setSelectedCities] =  useState<IOption[]>([]);
  const [isCountySelected, setIsCountySelected] = useState(false);

  const countries1 = [
    { code: 'US', label: 'United States' },
    { code: 'CA', label: 'Canada' },
    { code: 'GB', label: 'United Kingdom' },
    // Add more countries as needed
  ];

  useEffect(() => {
    console.log("county: ", selectedCounty)
    console.log("city: ", filterCities())
    selectedCounty === "" || selectedCounty == null? setIsCountySelected(true) : setIsCountySelected(false);

  },[selectedCounty])

  const filterCounties = () => {  
    return Counties.map(county => ({
            code: county.auto,
            label: county.nume,
    }));
  }

  const filterCities = () => {
    Counties.forEach(county => {
      if(county.nume === selectedCounty) {
        setSelectedCities(county.localitati.map(city => ({label: city.nume})));
      }
    })
  }

  return (
    <div>
        <div>
            <AutocompleteInput
              sx={{ width: 300 }}
              options={filterCounties()} // Provide the array of options
              variant={'filled'} 
              label={'Choose a country'}
              onChange={setSelectedCounty}
            />
            <AutocompleteInput
              sx={{ width: 300 }}
              options={selectedCities} // Provide the array of options
              variant={'filled'} 
              isDisable={isCountySelected}
              label={'Choose a city'}
              onChange={setSelectedCity}
            />
        </div>
    </div>
  );
};

export default FindElectricianPage;
