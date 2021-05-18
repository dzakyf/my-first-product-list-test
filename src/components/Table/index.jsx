import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import NumberFormat from "react-number-format";
import env from "../../constants/url";

const columns = [
  { id: "image", label: "Gambar", minWidth: 50 },
  { id: "name", label: "Nama Produk", minWidth: 170 },
  {
    id: "price",
    label: "Harga",
    minWidth: 170,
    align: "left",
  },
  {
    id: "discount",
    label: "Diskon",
    minWidth: 170,
    align: "left",
  },
  {
    id: "stock",
    label: "Stok Tersedia",
    minWidth: 170,
    align: "left",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  img: {
    width: 50,
  },
});

export default function ProductTable(data) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("data", data);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow hover>
                  <TableCell>
                    <img
                      src={`${env.BACKEND_BASE_URL}/${item.image.slice(27)}`}
                      className={classes.img}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp "}
                    />
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={item.discount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp "}
                    />
                  </TableCell>
                  <TableCell>{item.stock}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
