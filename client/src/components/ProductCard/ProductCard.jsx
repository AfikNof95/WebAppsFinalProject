import * as React from "react";
import "./ProductCard.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tmpFood } from "../../data";
import { Grid, Tooltip } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

const storeProducts = tmpFood;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { addToCart } = useShoppingCart();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={1}>
      {storeProducts.map((product, index) => (
        <Grid item xs={"auto"} key={product._id}>
          <Card raised sx={{ width: 270, padding: "1em" }}>
            <Link to={`/product/${product._id}`}>
              <CardMedia
                component="img"
                height="250px"
                image={product.images[0]}
                alt={product.Title}
                sx={{
                  cursor: "pointer",
                  objectFit: "contain",
                }}
              />
            </Link>
            <CardContent>
              <Typography
                variant="body1"
                color="text.primary"
                fontWeight={"bold"}
                textAlign="start"
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={"bold"}
                textAlign="start"
              >
                {formatPrice(product.price)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Tooltip title="Add to cart">
                <IconButton
                  aria-label="add to cart"
                  onClick={() => addToCart(product)}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"start"}
                >
                  {product.description}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCard;
