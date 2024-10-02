import React, { useEffect, useState } from 'react';
import AutocompleteInput from '../../components/Autocomplete';
import { County } from '../../utils/region/romania/ICounty';
import { Counties } from '../../utils/region/romania/counties';
import TabDataGrid from '../../components/DataGrid';

interface IOption {
  code?: string | number;
  label: string;
}

const FindElectricianTab: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>(""); // For selected county
  const [selectedCity, setSelectedCity] = useState<string>(""); // For selected city
  const [selectedCities, setSelectedCities] = useState<IOption[]>([]); // Cities for selected county

  useEffect(() => {
    if (selectedCounty !== "") {
      // Filter cities when a county is selected
      const countyInfo = Counties.find(county => county.nume === selectedCounty);
      if (countyInfo) {
        setSelectedCities(filterCities(countyInfo));
      }
    }
  }, [selectedCounty]); // Trigger on county change

  // Filter function for counties
  const filterCounties = (): IOption[] => {
    return Counties.map(county => ({
      code: county.auto,
      label: county.nume,
    }));
  };

  // Filter function for cities based on selected county
  const filterCities = (countyInfo: County): IOption[] => {
    return countyInfo.localitati.map((city, index) => ({
      code: index + 1,
      label: city.nume,
    }));
  };

  return (
    <div>
      <div>
        <AutocompleteInput
          sx={{ width: 300 }}
          options={filterCounties()}
          variant={'filled'}
          label={'Choose a county'}
          isDisable={selectedCity !== ""}
          onChange={setSelectedCounty}
        />
  
        <AutocompleteInput
          sx={{ width: 300 }}
          options={selectedCities}
          variant={'filled'}
          isDisable={selectedCounty === ""}
          label={'Choose a city'}
          onChange={setSelectedCity}
        />
      </div>
      <TabDataGrid/>
    </div>
  );
};

export default FindElectricianTab;
