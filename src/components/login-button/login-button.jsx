import React from "react";
import { Button } from "antd";
import TableApi from "../../api/table-api";
import { connect } from "react-redux";
import { getData } from "../../actions/table-actions";

const { getToken } = new TableApi();

const LoginButton = ({ getData }) => {
  const authUser = async () => {
    await getToken();
    getData();
  };
  return (
    <Button onClick={authUser} type="primary">
      Login
    </Button>
  );
};
const mapDispatchToProps = {
  getData
};

export default connect(null, mapDispatchToProps)(LoginButton);
