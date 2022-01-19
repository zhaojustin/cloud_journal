import React from "react";
import Airtable from "airtable";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_ID = "app27OZGEFr5eKnk4";

class LastUpdatedCount extends React.Component {
  constructor() {
    super();

    this.state = {
      count: "x",
    };
  }

  async componentDidMount() {
    var count_temp = 0;
    var done = false;
    var base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

    base("Boba Tracker")
      .select({
        pageSize: 100,
        view: "Grid view",
      })
      .eachPage(
        function page(records, next) {
          try {
            records.forEach(function (record) {
              count_temp += 1;
            });

            next();
          } catch {
            return;
          }
        },
        function (err) {
          done = true;

          if (err) {
            console.error(err);
            return;
          }
        }
      );

    (async () => {
      console.log("Getting total boba count...");
      while (!done)
        // define the condition as you like
        await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Total boba count is " + count_temp);
      this.setState({
        count: count_temp,
      });
    })();
  }

  render() {
    return <span>{this.state.count} cups</span>;
  }
}

export default LastUpdatedCount;
