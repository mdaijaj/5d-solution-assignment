import { useState } from "react";
import Table from "./table"

const SearchList = (props) => {
  const [query, setQuery] = useState("");
  const keys = ["first", "last", "email", "phone", "city", "state"];

  //search feature
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    const filteredResults = records.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div style={{ paddingTop: "25px", textAlign: "right", borderRadius: "50px", height: "60px" }}>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchList;