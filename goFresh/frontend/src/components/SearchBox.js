import React, { useState } from "react";

const SearchBox = (props) => {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    console.log(`/search/name/${name}`);
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search d-flex " onSubmit={submitHandler}>
      <input
        className="form-control me-0"
        type="text"
        name="q"
        id="q"
        placeholder="Search for Fresh Grocery"
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-secondary fas fa-search" type="submit" />
    </form>
  );
};

export default SearchBox;
