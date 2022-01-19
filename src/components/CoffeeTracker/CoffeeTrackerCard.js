import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
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

import DatePicker from "../DatePicker/DatePicker.js";
import Airtable from "airtable";

import LastUpdated from "../Database/CoffeeTracker/LastUpdated.js";
import LastUpdatedCost from "../Database/CoffeeTracker/LastUpdatedCost.js";
import LastUpdatedCount from "../Database/CoffeeTracker/LastUpdatedCount.js";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_ID = "app27OZGEFr5eKnk4";

class CoffeeTrackerCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      newEntry: {
        date: new Date(),
        drink: "",
        extras: "",
        price: 0,
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
    var base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

    base("Coffee Tracker").create(
      [
        {
          fields: {
            date: this.state.newEntry.date.toISOString().split("T")[0],
            drink: this.state.newEntry.drink,
            extras: this.state.newEntry.extras,
            price: parseInt(this.state.newEntry.price),
            store: this.state.newEntry.store,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      }
    );

    this.props.toggle();

    this.clearFields();
  };

  clearFields() {
    this.setState({
      newEntry: {
        date: new Date(),
        drink: "",
        extras: "",
        price: 0,
        store: "",
      },
    });
  }

  handleDateChange(newDate) {
    this.setState({
      newEntry: {
        ...this.state.newEntry,
        date: new Date(newDate),
      },
    });
  }

  render() {
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
                  <span className="data">
                    <LastUpdatedCost />
                  </span>
                </p>
                <p>
                  Count:{" "}
                  <span className="data">
                    <LastUpdatedCount />
                  </span>{" "}
                </p>
                <p>
                  Last Drank:{" "}
                  <span className="data">
                    <LastUpdated />
                  </span>
                </p>
              </Col>
            </Row>
            <Row className="internalBlockSection">
              <Col>
                <h4>New entry:</h4>
                <Form>
                  <FormGroup>
                    {/* DATE PICKER */}
                    <label htmlFor="reasons">
                      <p>What day are you entering for?</p>
                    </label>
                    <div>
                      <DatePicker
                        selected={this.state.newEntry.date}
                        onChange={this.handleDateChange}
                        dropdownMode="select"
                      />
                    </div>

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
                      placeholder="e.g. Blue Bottle"
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
                      placeholder="e.g. Cold Brew"
                    />

                    {/* Extras */}
                    <label htmlFor="toppings">
                      <p>Extras</p>
                    </label>
                    <FormInput
                      value={this.state.newEntry.extras}
                      name="extras"
                      type="text"
                      onChange={this.changeHandler}
                      id="#toppings"
                      placeholder="e.g. Oat Milk"
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

export default CoffeeTrackerCard;
