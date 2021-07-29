import CountryList from "constants/country-and-continent-codes-list.json";

export default function groupCountry(countries) {
  let group = {};

  for (let country of Object.keys(countries)) {
    let found = CountryList.find(
      (j) => j.Country_Name.split(",")[0] === country.split(",")[0]
    );
    let c_name = found ? found.Continent_Name : "Unknown";
    group[c_name] = group[c_name]
      ? {
          ...group[c_name],
          [country.split(",")[0]]: countries[country.split(",")[0]],
        }
      : {
          [country.split(",")[0]]: countries[country.split(",")[0]],
        };
  }

  // for (let country of Object.keys(countries)) {
  //     let found = CountryList.find(j => j.Country_Name.split(',')[0] === country.split(',')[0]);
  //     group[found.Continent_Name] =(group[found.Continent_Name])? ([...group[found.Continent_Name], country.split(',')[0]] ) : [country.split(',')[0]];
  //     // for(let gp of group){
  //     //     console.log("jjlu", gp)
  //     //     // group[gp] =(group[gp])? ([...group[gp],countries[country]]) : [countries[country]];
  //     //     // group[gp] = [...group[gp], countries[country]]
  //     //     // group[gp]= countries[country];
  //     // }
  // }

  return group;
}
