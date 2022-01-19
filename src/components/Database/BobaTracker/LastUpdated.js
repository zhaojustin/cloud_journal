import React from "react";
import Airtable from "airtable";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_ID = "app27OZGEFr5eKnk4";

class LastUpdated extends React.Component {
  constructor() {
    super();

    this.state = {
      date: "Loading...",
    };
  }

  async componentDidMount() {
    var lastUpdatedDate = undefined;
    var base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

    base("Boba Tracker")
      .select({
        view: "Grid view",
        sort: [{ field: "date", direction: "desc" }],
      })
      .eachPage(
        function page(records, next) {
          try {
            lastUpdatedDate = records[0].fields.date;
            this.setState({
              date: lastUpdatedDate,
            });
            next();
          } catch {
            return;
          }
        },
        function (err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

    (async () => {
      console.log("Getting lastUpdated date...");
      while (lastUpdatedDate == undefined)
        // define the condition as you like
        await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("lastUpdated is " + lastUpdatedDate);
      this.setState({
        date: lastUpdatedDate,
      });
    })();
  }

  render() {
    return <span>{this.state.date}</span>;
  }
}

export default LastUpdated;
