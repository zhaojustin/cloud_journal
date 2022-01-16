import * as React from "react";
import useGoogleSheets from "use-google-sheets";

const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const REACT_APP_GOOGLE_SHEETS_ID = process.env.REACT_APP_GOOGLE_SHEETS_DOC_ID;

const SheetsAPI = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: REACT_APP_GOOGLE_API_KEY,
    sheetId: REACT_APP_GOOGLE_SHEETS_ID,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default SheetsAPI;
