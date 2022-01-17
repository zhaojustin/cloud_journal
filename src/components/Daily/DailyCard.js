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
import useGoogleSheets from "use-google-sheets";
import axios from "axios";

const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const REACT_APP_GOOGLE_SHEETS_ID = process.env.REACT_APP_GOOGLE_SHEETS_DOC_ID;

const LastUpdated = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: REACT_APP_GOOGLE_API_KEY,
    sheetId: REACT_APP_GOOGLE_SHEETS_ID,
  });

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error!</span>;
  }

  const lastUpdated = data[0].data[data[0].data.length - 1].date.split("T")[0];
  return <span>{JSON.stringify(lastUpdated).replace(/['"]+/g, "")}</span>;
};

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
        spending: "",
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

  submitForm = () => {
    axios
      .post(process.env.REACT_APP_SHEETS_BEST_URL, this.state.newEntry)
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
                      type="text"
                      onChange={this.changeHandler}
                      placeholder="xx.xx"
                    />
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
