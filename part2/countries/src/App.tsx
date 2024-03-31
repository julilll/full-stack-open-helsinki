import { ChangeEvent, useEffect, useState } from "react";
import Input from "./components/input/input";
import ListItem, { ListItemProps } from "./components/list/ListItem";
import apiService from "./services/api";
import { Country } from "./shared/list";
import CountryItem from "./components/country/contry";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState<Country[]>([]);

  useEffect(() => {
    apiService.getAll().then((res) => setList(res));
  }, []);
  
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  
  const showHandler = (country: ListItemProps["item"]) => {
    const selectedCountry = country.name.common;
    setSearchValue(selectedCountry)
  };
  
  const filteredList = searchValue
  ? list.filter((el) => el.name.common.toLowerCase().includes(searchValue.toLowerCase()))
  : list;
  
  return (
    <>
      <Input
        label="Find countries"
        value={searchValue}
        onChange={handleSearch}
      />
      {filteredList.length > 10 && searchValue && <p>Too many matches, specify another filter</p>}
      {filteredList.length === 1 && <CountryItem key={filteredList[0].name.official} item={filteredList[0]}/>}
      {filteredList.length > 1 && filteredList.length < 11 && (
        <ul>
          {filteredList?.map((country) => (
            <ListItem
              key={country.name.official}
              item={country}
              showHandler={() => showHandler(country)}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
