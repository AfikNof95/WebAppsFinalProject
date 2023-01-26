import React from "react";
import { useAuth } from "../../context/AuthContext";
import { CardMedia, Card, Typography, Avatar, Modal, Box, Input } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useRef } from "react";
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
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import icons from "./icons";

const AccountPage = () => {

    const { userIcon, setIcon, getUser, updateUser, signOut, isUserSignedIn } = useAuth();
    const newName = useRef();
    const newEmail = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [insertName, setEditName] = useState(false);
    const [insertEmail, setEditEmail] = useState(false);
    const [openPrivacy, setOpenPrivacy] = useState(false);
    const handlePrivacyOpen = () => setOpenPrivacy(true);
    const handlePrivacyClose = () => setOpenPrivacy(false);
    const [openUsage, setOpenUsage] = useState(false);
    const handleUsageOpen = () => setOpenUsage(true);
    const handleUsageClose = () => setOpenUsage(false);
    let user = getUser()
    
    if(!user) {
        user = {
            email: "Signed out",
            displayName: "Signed out"
        }
    }

    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.displayName)
    const [pass, setPass] = useState("* * * * * * ")
    const open = Boolean(anchorEl);
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const changeIcon = (newIcon) => {
        setIcon(newIcon)
    }
    
    const editEmail = () => {
        setEditEmail(false)
        console.log(newEmail.current.value)
        setEmail(newEmail.current.value)
        // updateUser(newEmail)
    } 

    const editName = () => {
        setEditName(false)
        console.log(newName.current.value)
        setName(newName.current.value)
        // updateUser(newName.current.value)
    }

    const editPass = () => {

    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const logOut = () => {
        setEmail("Signed out")
        setName("Signed out")
        setPass("Signed out")
        signOut()
    }

    return (
        <div>
        <Card sx={{ maxWidth: 1800, maxHeight:2000 }}>
            <h1>Account</h1>
            <CardMedia
                component="img"
                height="350"
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
    <Card sx={{marginLeft:"20px", marginTop:"20px"}} >
        <Typography marginBottom={2} variant="h5" component="h2">Name &emsp; {name}  &ensp;
            <EditRoundedIcon onClick={() => setEditName(true)}/>
            {
                insertName? 
                <div>
                    <Input sx={{marginLeft:"20px"}} placeholder="enter new name" inputRef={newName} />
                    <SendRoundedIcon onClick={editName}/>
                </div>
                :
                <Button> </Button>
            }
            
            {
                isUserSignedIn() ? 
                <Button onClick={logOut} sx= {{marginLeft:"1200px"}}> Sign Out </Button>
                :
                <Button sx= {{marginLeft:"1225px", color:"blue"}}
                    component={RouterLink}
                    to={"/login"}
                    color="inherit"
                >
                    Log In
                </Button>
            }
        </Typography>
        <Typography marginBottom={2} variant="h5" component="h2">Email &emsp;  {email} &ensp;
            <EditRoundedIcon onClick={() => setEditEmail(true)}/>
            {
                insertEmail? 
                <div>
                    <Input sx={{marginLeft:"20px"}} placeholder="enter new email" inputRef={newEmail} />
                    <SendRoundedIcon onClick={editEmail}/>
                </div>
                :
                <Button> </Button>
            }
            
            <Button onClick={handleUsageOpen} sx= {{marginLeft:"1105px"}}> Usage Policy </Button>
        </Typography>  
        <Typography  variant="h5" component="h2">Password &emsp; &ensp; {pass} &ensp;
            <EditRoundedIcon onClick={editPass}/>
            <Button onClick={handlePrivacyOpen} sx= {{marginLeft:"1175px"}}> Privacy Policy  </Button>

        </Typography> 
    </Card>    
    </div>
  );
};

export default AccountPage;