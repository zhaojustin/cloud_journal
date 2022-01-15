import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "shards-react";
import { Container, Row, Col } from "shards-react";
import {
  Form,
  FormGroup,
  FormInput,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button,
} from "shards-react";

class CoffeeTrackerCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleSlide = this.handleSlide.bind(this);
    this.state = {
      lastDrank: null,
      count: null,
      cost: null,
      newEntry_store: null,
      newEntry_drink: null,
      newEntry_toppings: null,
      newEntry_store: null,
    };
  }

  handleSlide(e) {
    this.setState({
      dailyRating: parseFloat(e[0]),
    });
  }

  render() {
    function submitData(e) {
      e.preventDefault();
      console.log(this.state);
    }

    return (
      <Card style={{ maxWidth: "450px" }}>
        <CardHeader>
          <h1>&#9749; Coffee</h1>
        </CardHeader>
        <CardBody style={{ paddingTop: "0", paddingBottom: "0" }}>
          <Container className="internalBlock">
            <Row className="internalBlockSection">
              <Col>
                <h4>Current data:</h4>
                <p>
                  Cost:{" "}
                  <span className="data">{this.state.cost || "$xx.xx"}</span>
                </p>
                <p>
                  Count:{" "}
                  <span className="data">{this.state.count || "x cups"}</span>{" "}
                </p>
                <p>
                  Last Drank:{" "}
                  <span className="data">
                    {this.state.lastDrank || "mm-dd-yyyy"}
                  </span>
                </p>
              </Col>
            </Row>
            <Row className="internalBlockSection">
              <Col>
                <h4>New entry:</h4>
                <Form>
                  <FormGroup>
                    {/* Store Name */}
                    <label htmlFor="store">
                      <p>Store</p>
                    </label>
                    <FormInput
                      value={this.state.storeName}
                      id="#store"
                      placeholder="e.g. Omomo"
                    />

                    {/* Drink Name */}
                    <label htmlFor="drink">
                      <p>Drink</p>
                    </label>
                    <FormInput
                      value={this.state.storeName}
                      id="#drink"
                      placeholder="e.g. Jasmine Milk Tea"
                    />

                    {/* Extras */}
                    <label htmlFor="toppings">
                      <p>Extras</p>
                    </label>
                    <FormInput id="#toppings" placeholder="e.g. Oat Milk" />

                    {/* Price */}
                    <label htmlFor="price">
                      <p>Price</p>
                    </label>
                    <InputGroup id="#price" className="mb-2">
                      <InputGroupAddon type="prepend">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <FormInput placeholder="xx.xx" />
                    </InputGroup>
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
                <Button onClick={submitData} theme="dark">
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

export default CoffeeTrackerCard;
