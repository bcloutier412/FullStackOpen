import Country from "./Country";

const Content = ({ countries, handleClick, filter }) => {
  // FILTER countries to show
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  // DETERMINES the content that will be rendered
  let content;
  if (countriesToShow.length === 1) 
  {
    content = <Country country={countriesToShow[0]} />;
  } 
  else if (countriesToShow.length <= 10) 
  {
    content = countriesToShow.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleClick(country.name.common)}>show</button>
      </div>
    ));
  } 
  else if (!filter) 
  {
    content = <div>Please enter a country</div>;
  } 
  else 
  {
    content = <div>Too many matches, specify another filter</div>;
  }

  return <div>{content}</div>;
};

export default Content;
