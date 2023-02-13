import React from 'react';
import './About.css';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography, Toolbar, Stack, Avatar } from '@mui/material';
import { Grid, Link } from '@mui/material';
import { AiFillLinkedin } from 'react-icons/ai';
import { Box, Container } from '@mui/system';
import { ShoppingCart } from '@mui/icons-material';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    minHeight: 140,
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #d3d0d0',
    margin: '20px auto'
  },
  media: {
    height: 120,
    width: 120,
    objectFit: 'cover',
    marginRight: 20
  },
  content: {
    maxWidth: 550,
    flex: '1 0 auto'
  },
  iconWrapper: { display: 'flex', justifyContent: 'flex-end' },
  icon: {
    display: 'block',
    width: 25,
    height: 25
  }
});

const data = [
  {
    name: 'Afik Nof',
    image:
      'https://media.licdn.com/dms/image/C4E03AQFAt21-J4t3Xg/profile-displayphoto-shrink_800_800/0/1648396763487?e=1680739200&v=beta&t=8POCs8A8zKko5TjlSjdh_u2UdL_xpAH-LBGR68Hpx5I',
    title: 'Senior software engineer',
    linkedin: 'https://www.linkedin.com/in/afik-nof/',
    description:
      'Experienced senior software engineer with over 8 years of experience. Many years of experience with Nodejs, express, Vuejs, React, JQuery, PHP, C# PostgresSQL MongoDB and more.'
  },
  {
    name: 'Omer Kaplan',
    image:
      'https://media.licdn.com/dms/image/C5603AQFjdkie5MWYQA/profile-displayphoto-shrink_800_800/0/1639823823723?e=1680739200&v=beta&t=CzykB5EqBQd4vx5CdUd7TkdkDBx99l57OO0_sHX59lc',
    title: 'Fullstack development team lead',
    linkedin: 'https://www.linkedin.com/in/omer-kaplan-3809841b6/',
    description:
      'Experienced Team Lead. Skilled in Devops, Fullstack, Product Management and Team Leadership. Experience with Nodejs, React, C#, PostgresSQL, Ci/Cd, Ansible, Jenkins, Management soft skills and more.'
  },
  {
    name: 'Maya Bezalel',
    image: 'http://localhost:2308/images/maya.jpeg',
    title: 'Software development of satellite R&D center',
    linkedin: null,
    description:
      'Full stack developer. Experience with nodeJS, mongoDB and coffeescript, for the satellite R&D center in the IDF.'
  }
];

export default function ProgrammerCards() {
  const classes = useStyles();

  return (
    <Container maxWidth={'xl'} sx={{ height: '100%', padding: 5 }}>
      <Toolbar sx={{ width: '100%' }}></Toolbar>

      <Grid container height={'80%'} sx={{ backgroundColor: 'white' }} boxShadow={2}>
        <Grid item xs={12}>
          <Box padding={2} color={'white'} bgcolor={'var(--main-app-blue)'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#385074'
                }}>
                <ShoppingCart fontSize="medium"></ShoppingCart>
              </Avatar>
              <Typography variant="h4" fontWeight={'bold'} marginLeft={2}>
                Store.io
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} padding={1}>
          <Typography variant="h2" fontFamily={'cursive'} fontWeight={'bold'} textAlign={'center'}>
            Meet Our Team
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {data.map((item) => (
              <Grid item xs={12} md={12} lg={12} xl={4} key={item.name}>
                <Grid container padding={3}>
                  <Grid item xs={2} sm={2} md={2} lg={2} xl={12}>
                    <img
                      src={item.image}
                      alt=""
                      width={'100%'}
                      height={'100%'}
                      style={{ maxHeight: 450, objectFit: 'contain' }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={6} xl={12}>
                    <Box padding={1}>
                      <Box display="flex" justifyContent={'space-between'}>
                        <Typography variant="body1" fontWeight={'bold'}>
                          {item.name}
                        </Typography>
                        {item.linkedin && (
                          <Link href={item.linkedin} className={classes.iconWrapper}>
                            <AiFillLinkedin className={classes.icon} />
                          </Link>
                        )}
                      </Box>
                      <Typography variant="caption" fontWeight={'bold'}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Box padding={1}>
                      <Typography variant="body2" color={'GrayText'} fontWeight={'bold'}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>

  );
}
