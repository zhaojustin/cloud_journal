import React from "react";
import { Container, Row, Col } from "shards-react";

class Heading extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="light">&#127804; Daily's</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="light">{new Date().toLocaleDateString()}</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Heading;
