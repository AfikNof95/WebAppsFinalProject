import React from "react";
import { useAuth } from "../../context/AuthContext";
import Box from "@mui/material/Box";
import { CardMedia, Card, Typography, Avatar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import EmojiNatureRoundedIcon from '@mui/icons-material/EmojiNatureRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import AnchorRoundedIcon from '@mui/icons-material/AnchorRounded';
import AndroidRoundedIcon from '@mui/icons-material/AndroidRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import LocalPizzaRoundedIcon from '@mui/icons-material/LocalPizzaRounded';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded';
import SportsFootballRoundedIcon from '@mui/icons-material/SportsFootballRounded';
import LocalBarRoundedIcon from '@mui/icons-material/LocalBarRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import icons from "./icons";


const AccountPage = () => {

    const { userIcon, setIcon, getUser, updateUser } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const iniUser = getUser()
    const [email, setEmail] = useState(iniUser.email)
    const [name, setName] = useState(iniUser.displayName)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        getCurUser()
    };
    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const changeIcon = (newIcon) => {
        setIcon(newIcon)
    }

    const getCurUser = () => {
        const curUser = getUser()
        setEmail(curUser.email)
        setName(curUser.displayName)
        console.log(curUser)
    }
    
    const editEmail = () => {
        console.log("edit email")
    } 

    const editName = () => {
        console.log("edit name")
    }

    const editPass = () => {

    }

    return (
        <div>
        <Card sx={{ maxWidth: 1800, maxHeight:2000 }}>
            <h1>Account</h1>
            <CardMedia
                component="img"
                height="400"
                src={require("./theme.jpg")}
                title="Account"
            />
            <div style={{
                marginLeft:"800px",
                marginTop: "5px"
            }}>
                <Avatar sx={{width: 80, height: 80}}> { userIcon? icons[userIcon] : <StarOutlineRoundedIcon/>} </Avatar>
            </div>
            <div >
                <Button 
                    style={{display: 'flex',  alignItems: 'center', justifyContent: 'center', paddingLeft: '790px', paddingRight: '790px'}}
                    size="small"
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Change Avatar
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'
                    }}
                >                    
                    <MenuItem style={{float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(0)}>
                        <Avatar>
                            <AccountCircleIcon/>
                        </Avatar>

                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={ () => changeIcon(1) }  >
                        <Avatar>
                            <EmojiNatureRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(2)}>
                        <Avatar>
                            <Diversity2RoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(3)}>
                        <Avatar>
                            <SportsFootballRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(4)}>
                        <Avatar>
                            <AcUnitRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(5)}>
                        <Avatar>
                            <ChildCareRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(6)}>
                        <Avatar>
                            <FamilyRestroomRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(7)}>
                        <Avatar>
                            <PetsRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(8)}>
                        <Avatar>
                            <AttractionsRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(9)}>
                        <Avatar>
                            <AndroidRoundedIcon />
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(10)}>
                        <Avatar>
                            <AirplanemodeActiveRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(11)}>
                        <Avatar>
                            <BugReportRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(12)}>
                        <Avatar>
                            <AnchorRoundedIcon/>
                        </Avatar>

                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(13)}>
                        <Avatar>
                            <CakeRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(14)}>
                        <Avatar>
                            <AttractionsRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(15)}>
                        <Avatar>
                            <LunchDiningRoundedIcon />
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(16)}>
                        <Avatar>
                            <LocalPizzaRoundedIcon />
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(17)}>
                        <Avatar>
                            <IcecreamRoundedIcon />
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(18)}>
                        <Avatar>
                            <RamenDiningRoundedIcon  />
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(19)}>
                        <Avatar>
                            <StarOutlineRoundedIcon />
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(20)}>
                        <Avatar>
                            < FavoriteRoundedIcon />
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(21)}>
                        <Avatar>
                            <LocalBarRoundedIcon/>
                        </Avatar>
                    </MenuItem>
                    <MenuItem style={{                    float: 'right',
                    textAlign: 'right',
                    width: 'auto'}} onClick={() => changeIcon(22)}>
                        <Avatar>
                            <Diversity1RoundedIcon />
                        </Avatar>
                    </MenuItem>
                </Menu>
                </div>
            <div>
        </div>
    </Card>
       
    </div>
  );
};

export default AccountPage;