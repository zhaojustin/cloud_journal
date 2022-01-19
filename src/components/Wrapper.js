import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";

import Heading from "./Heading/Heading.js";
import DailyCard from "./Daily/DailyCard.js";
import BobaTrackerCard from "./BobaTracker/BobaTrackerCard.js";
import CoffeeTrackerCard from "./CoffeeTracker/CoffeeTrackerCard.js";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
    console.log("toggled " + this.state.open);
  }

  render() {
    const { open } = this.state;
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
              <DailyCard toggle={this.toggle} />
            </Col>
            {/* BOBA */}
            <Col className="cardWrapper">
              <BobaTrackerCard toggle={this.toggle} />
            </Col>
            {/* COFFEE */}
            <Col className="cardWrapper">
              <CoffeeTrackerCard toggle={this.toggle} />
            </Col>
          </Row>
        </Container>

        <Modal size="sm" open={open} toggle={this.toggle}>
          <ModalHeader>Notice</ModalHeader>
          <ModalBody>✔️ Submitted !</ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Wrapper;
