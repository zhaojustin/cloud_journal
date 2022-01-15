import React from "react";
import { Container, Row, Col } from "shards-react";

class Heading extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 class="light">&#127804; Daily's</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 class="light">{new Date().toLocaleDateString()}</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Heading;
