import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <Box
            width={'100vw'}
            height={'100vh'}
            sx={{ backgroundColor: '#24344c' }}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignContent={'center'}
                flexWrap={'wrap'}
            >
                <Typography
                    flexBasis={'100%'}
                    variant="h1"
                    fontSize={'12em'}
                    fontWeight={'bold'}
                    color={'white'}
                    textAlign={'center'}
                >
                    404
                </Typography>
                <Typography
                    marginBottom={3}
                    textAlign={'center'}
                    flexBasis={'100%'}
                    variant="h1"
                    fontSize={'3em'}
                    fontWeight={'bold'}
                    color={'white'}
                >
                    Oops... We Couldn't Find What You Were Looking For
                </Typography>
                <Button component={Link} to="/" variant="contained">
                    Go Back To Homepage
                </Button>
            </Box>
        </Box>
    )
}

export default NotFoundPage
