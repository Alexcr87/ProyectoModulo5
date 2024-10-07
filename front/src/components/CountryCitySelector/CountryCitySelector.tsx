import { useState } from 'react';
import { countries } from '@/utils/countries'; // Asumiendo que tienes los países en este archivo
import { citiesByCountry } from '@/utils/citiesByCountry';
import { Country } from '@/utils/types';

interface CountryCitySelectorProps {
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
}

const CountryCitySelector: React.FC<CountryCitySelectorProps> = ({ onCountryChange, onCityChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    onCountryChange(country);

    const filteredCities = citiesByCountry
      .filter(city => city.id_country === Number(country))
      .map(city => city.name);

    setCities(filteredCities);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    onCityChange(city);
  };

  return (
    <div className="mb-4">
      {/* Botón o menú desplegable para seleccionar país */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 font-semibold mb-2"></label>
        <select 
          id="country" 
          onChange={handleCountryChange}
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Selecciona País</option>
          {countries.map((country: Country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Botón o menú desplegable para seleccionar ciudad */}
      {selectedCountry && cities.length > 0 && (
        <div>
          <label htmlFor="city" className="block text-gray-700 font-semibold mb-2"></label>
          <select 
            id="city" 
            onChange={handleCityChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Selecciona Ciudad</option>
            {cities.map((city: string, index: number) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CountryCitySelector;
