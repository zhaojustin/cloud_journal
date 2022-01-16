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
  Slider,
  Button,
} from "shards-react";
import DatePicker from "../DatePicker/DatePicker.js";
import axios from "axios";

class DailyCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleSlide = this.handleSlide.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.state = {
      lastUpdated: null,
      newEntry: {
        date: new Date(),
        dailyRating: 50,
        oneLiner: "",
      },
    };
  }

  handleSlide(e) {
    this.setState({
      dailyRating: parseFloat(e[0]),
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
    axios
      .post(
        "https://sheet.best/api/sheets/1a7e50d3-9e5b-43bb-a499-a1b11c209d64",
        [
          this.state.newEntry.date.toString(),
          this.state.newEntry.dailyRating,
          this.state.newEntry.oneLiner,
        ]
      )
      .then((response) => {
        console.log(response);
      });
  };

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
                  start={[this.state.newEntry.dailyRating]}
                  range={{ min: 0, max: 100 }}
                  pips={{ mode: "steps", stepped: true, density: 20 }}
                />
              </Col>
            </Row>
            <Row className="internalBlockSection">
              <Col>
                {/* DATE PICKER */}
                <Form>
                  <FormGroup>
                    <label htmlFor="reasons">
                      <p>What day are you entering for?</p>
                    </label>
                    <div>
                      <DatePicker
                        size="sm"
                        selected={this.state.newEntry.date}
                        onChange={this.handleDateChange}
                        dropdownMode="select"
                      />
                    </div>
                  </FormGroup>
                </Form>
                {/* FINANCIALS */}
                <Form>
                  <label htmlFor="price">
                    <p>How much did you spend today?</p>
                  </label>
                  <InputGroup id="#price" className="mb-2">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <FormInput placeholder="xx.xx" />
                  </InputGroup>
                </Form>
                {/* FINANCIALS */}
                <Form>
                  <FormGroup>
                    <label htmlFor="reasons">
                      <p>Describe your day in one sentence.</p>
                    </label>
                    <FormInput
                      value={this.state.newEntry.oneLiner}
                      name="oneLiner"
                      type="text"
                      onChange={this.changeHandler}
                      id="#reason"
                      placeholder="Reason"
                    />
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

export default DailyCard;
