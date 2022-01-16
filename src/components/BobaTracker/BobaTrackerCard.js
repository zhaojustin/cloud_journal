import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Form,
  FormGroup,
  FormInput,
  Button,
} from "shards-react";

class BobaTrackerCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastDrank: null,
      count: null,
      cost: null,
      newEntry: {
        drink: "",
        extras: "",
        price: "",
        store: "",
      },
    };
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      newEntry: {
        ...this.state.newEntry,
        [name]: value,
      },
    });
  };

  submitForm = () => {
    console.log(this.state.newEntry);
  };

  render() {
    return (
      <Card style={{ maxWidth: "450px" }}>
        <CardHeader>
          <h1>&#129483; Boba</h1>
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
                      value={this.state.newEntry.store}
                      name="store"
                      type="text"
                      onChange={this.changeHandler}
                      id="#store"
                      placeholder="e.g. Omomo"
                    />

                    {/* Drink Name */}
                    <label htmlFor="drink">
                      <p>Drink</p>
                    </label>
                    <FormInput
                      value={this.state.newEntry.drink}
                      name="drink"
                      type="text"
                      onChange={this.changeHandler}
                      id="#drink"
                      placeholder="e.g. Jasmine Milk Tea"
                    />

                    {/* Toppings */}
                    <label htmlFor="toppings">
                      <p>Toppings</p>
                    </label>
                    <FormInput
                      value={this.state.newEntry.extras}
                      name="extras"
                      type="text"
                      onChange={this.changeHandler}
                      id="#toppings"
                      placeholder="e.g. Boba"
                    />

                    {/* Price */}
                    <label htmlFor="price">
                      <p>Price</p>
                    </label>
                    <InputGroup id="#price" className="mb-2">
                      <InputGroupAddon type="prepend">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <FormInput
                        number="true"
                        value={this.state.newEntry.price}
                        name="price"
                        type="number"
                        onChange={this.changeHandler}
                        placeholder="xx.xx"
                      />
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
                <Button onClick={this.submitForm} theme="dark">
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

export default BobaTrackerCard;
