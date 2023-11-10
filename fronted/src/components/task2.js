import React, { useEffect, useState } from "react";
import '../App.css';

const TableData = (props) => {
  console.log("aijajkhan", props)
  const [query, setQuery] = useState("");
  const keys = ["first", "last", "email", "phone", "city", "state"];


  return (
    <>
    <h1>Show Table data list</h1>
    <input
      className="search" style={{margin: "35px 0px 35px"}}
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value.toLowerCase())}
    />
  </>
  );
  };

export default TableData;