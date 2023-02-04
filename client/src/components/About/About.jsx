import React from 'react';
import './About.css';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Grid, Link } from '@mui/material';
import { AiFillLinkedin } from 'react-icons/ai';

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
    image: 'http://localhost:3000/client/src/images/maya.jpeg', // 'WebAppsFinalProject/client/src/images/maya.jpeg'
    title: 'Software development of satellite r&d center',
    linkedin: 'https://www.linkedin.com/in/omer-kaplan-3809841b6/',
    description:
      'Full stack developer. Experience with nodeJS, mongoDB and coffeescript, for the satellite r&d center in the IDF.'
  }
];

export default function ProgrammerCards() {
  const classes = useStyles();

  return (
    <div id="about-wrapper">
      {data.map((item) => (
        <Card className={classes.root} key={item.name} elevation={1}>
          <Grid container alignItems="center">
            <div id="photo-name-title-wrapper">
              <CardMedia
                component="img"
                className={classes.media}
                image={item.name == 'Maya Bezalel' ? require('../../images/maya.jpeg') : item.image}
              />
              <CardContent className={classes.content}>
                <Typography variant="h5" fontWeight="bold">
                  {item.name},
                  <Typography variant="subtitle2" style={{ display: 'inline', marginLeft: '10px' }}>
                    {item.title}
                  </Typography>
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Link href={item.linkedin} className={classes.iconWrapper}>
                  <AiFillLinkedin className={classes.icon} />
                </Link>
              </CardContent>
            </div>
          </Grid>
        </Card>
      ))}
    </div>
  );
}
