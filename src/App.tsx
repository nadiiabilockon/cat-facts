import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import CatFactService from "./api/cat-fact-service";
import { FactsList } from "./components/FactsList";
import { FactInterface } from "./interfaces";
import { LoadingCat } from "./components/LoadingCat";

function App() {
  const [facts, setFacts] = useState<FactInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFacts = () => {
    setLoading(true);
    CatFactService.getFacts()
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setFacts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError("Failed to fetch facts");
      });
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  return (
    <Container fluid>
      <Navbar>
        <Navbar.Brand>
          <img
            className="logo"
            src={require("./assets/images/Grey_cat.png")}
            alt="Grey cat"
          />
        </Navbar.Brand>
        <Navbar.Text className="pl-2 font-weight-bold">Cat Facts</Navbar.Text>
      </Navbar>
      <Container>
        <Row className="justify-content-center mt-5">
          <button
            data-testid="fetch-btn"
            disabled={loading}
            className="btn--yellow"
            onClick={fetchFacts}
          >
            Get new facts
          </button>
        </Row>
        <Row className="justify-content-center mt-5">
          {loading ? (
            <LoadingCat />
          ) : error ? (
            <div>{error}</div>
          ) : (
                <FactsList facts={facts} />
              )}
        </Row>
      </Container>
    </Container>
  );
}

export default App;
