import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";

class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  render() {
    return (
      <Modal open={open} toggle={this.toggle}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>👋 Hello there!</ModalBody>
      </Modal>
    );
  }
}

export default Heading;
