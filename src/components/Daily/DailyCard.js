import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Form, FormGroup, FormInput, Slider, Button } from "shards-react";

class DailyCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleSlide = this.handleSlide.bind(this);
    this.state = {
      dailyRating: 50,
      lastUpdated: null,
    };
  }

  handleSlide(e) {
    this.setState({
      dailyRating: parseFloat(e[0]),
    });
  }

  render() {
    return (
      <Card style={{ maxWidth: "450px" }}>
        <CardHeader>
          <h1>&#128171; Rating</h1>
        </CardHeader>
        <CardBody style={{ paddingTop: "0", paddingBottom: "0" }}>
          <Container className="internalBlock">
            <Row className="internalBlockSection">
              <Col>
                <h4>How was your day?</h4>
                <p>
                  Last Updated:{" "}
                  <span className="data">
                    {this.state.lastUpdated || "mm-dd-yyyy"}
                  </span>
                </p>
                <p>
                  Value:
                  <span className="data"> {this.state.dailyRating}</span>
                </p>
                <Slider
                  onSlide={this.handleSlide}
                  connect={[true, false]}
                  start={[this.state.dailyRating]}
                  range={{ min: 0, max: 100 }}
                  pips={{ mode: "steps", stepped: true, density: 20 }}
                />
              </Col>
            </Row>
            <Row className="internalBlockSection">
              <Col>
                <h4>How much did you spend today?</h4>
                <Form>
                  <FormGroup>
                    <label htmlFor="financials">
                      <p>Provide best estimate.</p>
                    </label>
                    <FormInput id="#financials" placeholder="Amount" />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row className="internalBlockSection">
              <Col>
                <h4>One liner:</h4>
                <Form>
                  <FormGroup>
                    <label htmlFor="reasons">
                      <p>Describe your day in one sentence.</p>
                    </label>
                    <FormInput id="#reason" placeholder="Reason" />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </CardBody>
        <CardFooter>
          <Container>
            <Row>
              <Col>
                <Button theme="dark">
                  <p>&#128640; Submit</p>
                </Button>
              </Col>
            </Row>
          </Container>
        </CardFooter>
      </Card>
    );
  }
}

export default DailyCard;
