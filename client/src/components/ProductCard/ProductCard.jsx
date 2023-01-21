import * as React from "react";
import "./ProductCard.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, List, ListItem, Tooltip } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

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

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = React.useState(false);
  const { addToCart, openCart } = useShoppingCart();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={6} sm={3} md={2} lg={2} xl={2}>
      <Card variant="outlined" sx={{ padding: "1em", borderRadius: 0 }}>
        <Link to={`/product/${product._id}`}>
          <CardMedia
            component="img"
            height="150px"
            image={product.images[0]}
            alt={product.Title}
            sx={{
              cursor: "pointer",
              objectFit: "contain",
            }}
          />
        </Link>
        <CardContent sx={{ textOverflow: "ellipsis" }}>
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={"bold"}
            textAlign="start"
            textOverflow={"ellipsis"}
            noWrap
            sx={{ wordBreak: "break-word" }}
          >
            <Link
              to={`product/${product._id}`}
              className="product-link product-name"
            >
              {product.name}
            </Link>
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
              onClick={() => {
                addToCart(product);
                openCart();
              }}
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
          <CardContent sx={{ padding: 0 }}>
            <Typography
              component={Link}
              to={`product/${product._id}`}
              variant="caption"
              color="text.secondary"
              textAlign={"start"}
              className="product-description product-link"
            >
              {product.name}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default ProductCard;
