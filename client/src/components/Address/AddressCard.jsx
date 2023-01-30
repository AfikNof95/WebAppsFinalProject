import React from 'react'
import { Box, Button, CardActions, Typography } from '@mui/material'
import { Card, CardContent, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

export function AddressCard({ address1, address2, city, state, zip, country }) {
    return (
        <Card sx={{ display: 'flex', padding: 2 }} elevation={1}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {address1}
                </Typography>
                {address2 && (
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        {address2}
                    </Typography>
                )}
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {city}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {state}
                </Typography>
                <Typography variant="body2">{zip}</Typography>
                <Typography variant="body2">{country}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Chose</Button>
            </CardActions>
        </Card>
    )
}
