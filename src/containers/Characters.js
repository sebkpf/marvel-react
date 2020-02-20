import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from "../components/Pagination";

import Search from "../components/Search";
import Card from "../components/Card";

const axios = require("axios");

function Characters() {
  const [data, setData] = useState();
  const [category, setCategory] = useState("characters");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://backend-marvel-test.herokuapp.com/characters?page=${page}`
      );
      setData(response.data.data.results);
      const total = response.data.data.total;
      let copyNumPage = [];
      if (total % 100 === 0) {
        for (let i = 1; i < total / 100; i++) {
          copyNumPage.push(i);
        }
        setNumPage(copyNumPage);
      } else {
        for (let i = 1; i < total / 100 + 1; i++) {
          copyNumPage.push(i);
        }
        setNumPage(copyNumPage);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <>
      {isLoading ? (
        <div className="loading wrapper d-flex align-center just-center">
          <p>Page Loading</p>
        </div>
      ) : (
        <>
          <Search />
          <Pagination
            setIsLoading={setIsLoading}
            setPage={setPage}
            numPage={numPage}
          />
          <ul className="characters wrapper d-flex flex-row space-between">
            {data.map(element => {
              return (
                <Link to={"/characters/" + element.id}>
                  <Card
                    image={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                    title={element.name}
                    description={element.description}
                    category={category}
                    index={element.id}
                  />
                </Link>
              );
            })}
          </ul>
          <Pagination
            setIsLoading={setIsLoading}
            setPage={setPage}
            numPage={numPage}
          />
        </>
      )}
    </>
  );
}

export default Characters;
