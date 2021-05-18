import React from "react";
import { Grid, Button, Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import useUserApi from "../../../hooks/useUserApi";
import NumberFormat from "react-number-format";
import env from "../../../constants/url";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "auto",
    paddingLeft: "10vw",
    paddingRight: "10vw",
    backgroundColor: "#ECE9E9",
  },
  cardWrapper: {
    height: "auto",
  },
  card: {
    maxWidth: 345,
    boxShadow: "-12px 8px 8px -6px #BDBDBD",
  },
  pagination: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  media: {
    height: 100,
    paddingTop: "56.25%",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const api = useUserApi();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await api.get("/api/product");
        setData(response.data.data);
        console.log("api response", response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
    // eslint-disable-next-line
  }, []);

  console.log("data", data);

  const discount = data?.price - data?.discount;
  console.log("disountedPrice", discount);
  return (
    <React.Fragment>
      <Grid container justify="center" className={classes.container}>
        <Grid container>
          <Typography
            style={{
              color: "#E85009",
              fontWeight: 600,
              fontSize: 28,
              paddingLeft: "10vw",
              paddingTop: "4vh",
            }}
          >
            Today best deal
          </Typography>
          <Divider />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          spacing={2}
          style={{ paddingLeft: "10vw" }}
        >
          {data?.map((item) => (
            <Grid item key={item.id}>
              <Card className={classes.card} variant="outlined">
                <CardMedia
                  className={classes.media}
                  image={`${env.BACKEND_BASE_URL}/${item.image.slice(27)}`} //slicing first 27 character, assuming image stored in the same domain. soalnya server satunya mati
                  title={item.name}
                />
                <CardContent>
                  <Typography>{item.name}</Typography>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    style={{
                      textDecoration:
                        item.price > item.discount ? "line-through" : "none",
                    }}
                  >
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp "}
                    />
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    style={{ color: "#EA662D" }}
                  >
                    {item.price > item.discount ? (
                      <NumberFormat
                        value={item.discount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp "}
                      />
                    ) : (
                      ""
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ wordWrap: "break-word" }}
                    color="textSecondary"
                    component="p"
                  >
                    {item.detail.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Typography>
                </CardContent>
                <Grid container justify="flex-end">
                  <CardActions>
                    <Button
                      variant="contained"
                      style={{ color: "#FFFFFF", backgroundColor: "#E85009" }}
                      onClick={() => {
                        alert("Berhasil ditambahkan ke keranjang");
                      }}
                      startIcon={<AddShoppingCartIcon />}
                    >
                      Keranjang
                    </Button>
                    <Button
                      variant="contained"
                      style={{ color: "#FFFFFF", backgroundColor: "#E85009" }}
                      onClick={() => {
                        alert("Barang berhasil dibeli");
                      }}
                    >
                      Beli
                    </Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" className={classes.pagination}>
          <Divider />
          <Pagination count={4} defaultPage={6} siblingCount={0} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
