import React from "react";
import Airtable from "airtable";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_ID = "app27OZGEFr5eKnk4";

class LastUpdatedCost extends React.Component {
  constructor() {
    super();

    this.state = {
      cost: "xx.xx",
    };
  }

  async componentDidMount() {
    var cost_temp = 0;
    var done = false;
    var base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

    base("Coffee Tracker")
      .select({
        pageSize: 100,
        view: "Grid view",
      })
      .eachPage(
        function page(records, next) {
          try {
            records.forEach(function (record) {
              cost_temp += record.get("price");
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
      console.log("Getting total boba cost...");
      while (!done)
        // define the condition as you like
        await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Total boba cost is " + cost_temp);
      this.setState({
        cost: cost_temp,
      });
    })();
  }

  render() {
    return (
      <span>
        {"$"}
        {this.state.cost}
      </span>
    );
  }
}

export default LastUpdatedCost;
