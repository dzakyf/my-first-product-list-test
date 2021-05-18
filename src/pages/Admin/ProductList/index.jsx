import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Drawer from "../../../components/Drawer";
import Table from "../../../components/Table";
import useUserApi from "../../../hooks/useUserApi";

export default function Login() {
  const api = useUserApi();

  const [tableData, setTableData] = React.useState();

  React.useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await api.get("/api/product");
        setTableData(response.data.data);
        console.log("api response", response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
    // eslint-disable-next-line
  }, []);

  console.log("tableData", tableData);

  return (
    <Container component="main" maxWidth="lg">
      <Drawer />
      <Table data={tableData} />
      <CssBaseline />
    </Container>
  );
}
