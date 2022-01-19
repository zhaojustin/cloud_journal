import { Container, Row, Col } from "shards-react";

import Heading from "./components/Heading/Heading.js";
import DailyCard from "./components/Daily/DailyCard.js";
import BobaTrackerCard from "./components/BobaTracker/BobaTrackerCard.js";
import CoffeeTrackerCard from "./components/CoffeeTracker/CoffeeTrackerCard.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";

function App() {
  return (
    <div>
      <Container fluid className="justify-content-center align-items-center">
        {/* HEADING */}
        <Row className="d-flex flex-column justify-content-center align-items-center block">
          <Col className="justify-content-center">
            <Heading />
          </Col>
        </Row>
        <Row className="cardContainer">
          {/* DAILY */}
          <Col className="cardWrapper">
            <DailyCard />
          </Col>
          {/* BOBA */}
          <Col className="cardWrapper">
            <BobaTrackerCard />
          </Col>
          {/* COFFEE */}
          <Col className="cardWrapper">
            <CoffeeTrackerCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
