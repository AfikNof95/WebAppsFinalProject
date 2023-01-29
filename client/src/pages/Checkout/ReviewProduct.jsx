import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

export function ReviewProduct({ id, name, imageURL, quantity, price }) {
  return (
    <Card sx={{ display: "flex", padding: 2 }} elevation={1}>
      <CardMedia
        component={"img"}
        height="80px"
        width="80px"
        image={imageURL}
        sx={{ objectFit: "contain", height: "80px", width: "80px" }}
      />
      <CardContent
        sx={{
          flex: "1 0 auto",
          alignItems: "center",
          alignContent: "center",
          width: "380px",
        }}
      >
        <Grid
          item
          container
          spacing={2}
          direction="row"
          alignItems={"center"}
          height={"100%"}
        >
          <Grid item>
            <Typography
              component="div"
              variant="body1"
              fontWeight={"bold"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              width={370}
              noWrap
            >
              <Link
                to={`/product/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {name}
              </Link>
            </Typography>
          </Grid>
          <Grid item container direction="row" justifyContent="flex-end">
            <Typography variant="body1">{formatPrice(price)}</Typography>
            <Typography variant="body1"> &nbsp;X&nbsp;{quantity}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
