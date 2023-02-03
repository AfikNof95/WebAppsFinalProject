import React from 'react';
import './About.css';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Grid, Link } from '@mui/material';
import { AiFillLinkedin } from 'react-icons/ai';

const useStyles = makeStyles({
  root: {
    // maxWidth: 700,
    minHeight: 140,
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #d3d0d0',
    marginBottom: '10px'
  },
  media: {
    height: 120,
    width: 120,
    objectFit: 'cover',
    marginRight: 20
  },
  content: {
    flex: '1 0 auto'
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
      'Experienced Team Lead. Skilled in Devops, Fullstack, Product Management and Team Leadership.'
  },
  {
    name: 'Maya Bezalel',
    image: 'https://via.placeholder.com/150x150',
    title: '9900',
    linkedin: 'https://www.linkedin.com/in/omer-kaplan-3809841b6/',
    description: 'cool'
  }
];

export default function ProgrammerCards() {
  const classes = useStyles();

  return (
    <div id="about-wrapper">
      {data.map((item) => (
        <Card className={classes.root} key={item.name} elevation={1}>
          <Grid container alignItems="center">
            <Grid item>
              <CardMedia component="img" className={classes.media} image={item.image} />
            </Grid>
            <Grid item>
              <CardContent className={classes.content}>
                <Typography variant="h5" fontWeight="bold">
                  {item.name},
                  <Typography variant="subtitle2" style={{ display: 'inline', marginLeft: '10px' }}>
                    {item.title}
                  </Typography>
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Link href={item.linkedin}>
                  <AiFillLinkedin />
                </Link>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
}
