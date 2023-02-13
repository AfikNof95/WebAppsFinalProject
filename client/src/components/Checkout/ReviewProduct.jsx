import { Card, CardContent, CardMedia, Grid, Typography, Box, ImageListItem } from '@mui/material';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';

export function ReviewProduct({ id, name, imageURL, quantity, price }) {
  return (
    <Box
      position="relative"
      display={'flex'}
      flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={2}
      component={Card}>
      <Box width={150} height={150}>
        <img
          style={{ objectFit: 'contain', width: '100%', height: '100%', minWidth: '100%' }}
          src={imageURL}
          alt=""></img>
      </Box>
      <Box maxWidth={300}>
        <Typography
          component="div"
          variant="body1"
          fontWeight={'bold'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          noWrap>
          {name}
        </Typography>
      </Box>
      <Box></Box>
      <Box display={'flex'} flexDirection={'row'}>
        <Typography variant="body2" textAlign={'center'} fontWeight={'bold'}>
          {formatPrice(price)}
        </Typography>
        <Typography fontSize={'0.7em'} color="InfoText" alignSelf={'end'}>
          x{quantity}
        </Typography>
      </Box>
    </Box>

    // <Card sx={{ display: "flex", padding: 2,flexDirection:{xs:'column',sm:'column',md:'row'},alignItems:{xs:'center',sm:'center'} }} elevation={1}>
    //   <CardMedia
    //     component={"img"}
    //     height="80px"
    //     width="80px"
    //     image={imageURL}
    //     sx={{ objectFit: "contain", height: "80px", width: "80px" }}
    //   />
    //   <CardContent
    //     sx={{
    //       flex: "1 0 auto",
    //       alignItems: "center",
    //       alignContent: "center",
    //     }}
    //   >
    //     <Grid
    //       container
    //       spacing={2}
    //       direction="row"
    //       alignItems={"center"}
    //       height={"100%"}
    //     >
    //       <Grid item>
    //         <Typography
    //           component="div"
    //           variant="body1"
    //           fontWeight={"bold"}
    //           overflow={"hidden"}
    //           textOverflow={"ellipsis"}
    //           width={370}
    //           noWrap
    //         >
    //           <Link
    //             to={`/product/${id}`}
    //             style={{ textDecoration: "none", color: "black" }}
    //           >
    //             {name}
    //           </Link>
    //         </Typography>
    //       </Grid>
    //       <Grid item  direction="row" justifyContent="flex-end">
    //         <Typography variant="body1">{formatPrice(price)}</Typography>
    //         <Typography variant="body1"> &nbsp;X&nbsp;{quantity}</Typography>
    //       </Grid>
    //     </Grid>
    //   </CardContent>
    // </Card>
  );
}
