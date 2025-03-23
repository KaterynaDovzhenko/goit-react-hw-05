import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      toast.error("Please fill the field");
      return;
    }
    onSubmit(query);
    setQuery("");
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
