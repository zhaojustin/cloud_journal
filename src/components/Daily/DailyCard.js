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
import Airtable from "airtable";
import DatePicker from "../DatePicker/DatePicker.js";
import LastUpdated from "../Database/Daily/LastUpdated.js";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_ID = "app27OZGEFr5eKnk4";

class DailyCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleSlide = this.handleSlide.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      currentData: {
        cost: "Loading...",
        count: "Loading...",
        lastDrank: "Loading...",
      },
      newEntry: {
        date: new Date(),
        dailyRating: 50,
        spending: 0,
        oneLiner: "",
      },
    };
  }

  handleSlide(e) {
    this.setState({
      newEntry: {
        ...this.state.newEntry,
        dailyRating: parseFloat(e[0]),
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

  submitForm() {
    var base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

    base("Dailys").create(
      [
        {
          fields: {
            date: this.state.newEntry.date.toISOString().split("T")[0],
            dailyRating: this.state.newEntry.dailyRating,
            spending: parseInt(this.state.newEntry.spending),
            oneLiner: this.state.newEntry.oneLiner,
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
  }

  clearFields() {
    this.setState({
      newEntry: {
        date: new Date(),
        dailyRating: 50,
        spending: 0,
        oneLiner: "",
      },
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
                    <LastUpdated />
                  </span>
                </p>
                <p>
                  Value:
                  <span className="data">
                    {" "}
                    {this.state.newEntry.dailyRating}
                  </span>
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
                {/* FINANCIALS */}
                <Form>
                  <label htmlFor="price">
                    <p>How much did you spend today?</p>
                  </label>
                  <InputGroup id="#price" className="mb-2">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <FormInput
                      value={this.state.newEntry.spending}
                      name="spending"
                      type="number"
                      onChange={this.changeHandler}
                      placeholder="xx.xx"
                    />
                  </InputGroup>
                </Form>
                {/* ONE LINER */}
                <Form>
                  <FormGroup>
                    <label htmlFor="reasons">
                      <p>Describe your day in one sentence.</p>
                    </label>
                    <FormInput
                      value={this.state.newEntry.oneLiner}
                      name="oneLiner"
                      invalid={this.state.oneLinerInvalid}
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
