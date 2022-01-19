import React from "react";
import { Button } from "shards-react";
import Airtable from "airtable";

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button onClick={this.submitForm} theme="dark">
        <p>&#128640; Submit</p>
      </Button>
    );
  }
}

export default SubmitButton;
