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
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    DialogContentText
  } from "@mui/material";


const AccountPage = () => {

    const { userIcon, setIcon, getUser, updateUser, signOut, isUserSignedIn } = useAuth();
    const newName = useRef();
    const newEmail = useRef();
    const newPass = useRef();
    const currentPass = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [insertName, setEditName] = useState(false);
    const [insertEmail, setEditEmail] = useState(false);
    const [insertPass, setEditPass] = useState(false);
    const [insertCurrentPass, setCurrentPass] = useState(false);
    const [currentPassValue, setCurrentPassValue] = useState("");
    const [changeType, setChangeType] = useState(0);
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

    const matchFunction = () => {
        setCurrentPassValue(currentPass.current.value)
        setCurrentPass(false)
        
        if(changeType == 1)
            setEditName(true)
        else if(changeType == 2) 
            setEditEmail(true)
        else 
            setEditPass(true)

        setChangeType(0)
    }
    
    const editEmail = () => {
        setEditEmail(false)
        const newRecEmail = newEmail.current.value
        setEmail(newRecEmail)
        updateUser({ email: newRecEmail }, currentPassValue)
    } 

    const editName = () => {
        setEditName(false)
        const newRecName = newName.current.value
        setName(newRecName)
        updateUser({ displayName: newRecName }, currentPassValue)
    }

    const editPass = () => {
        console.log(user)
        setEditPass(false)
        setPass("* * * * * * ")
        const newRecPass = newPass.current.value
        updateUser({ password: newRecPass}, currentPassValue)
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
            <EditRoundedIcon onClick={() => { //setEditName(true)
                setChangeType(1)
                setCurrentPass(true)
            }}/>
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
                <Button onClick={logOut} style={{float:"right", marginRight: "66px"}}> Sign Out </Button>
                :
                <Button sx= {{float:"right", marginRight: "60px", color:"blue"}}
                    component={RouterLink}
                    to={"/login"}
                    color="inherit"
                >
                    Log In
                </Button>
            }
        </Typography>
        <Typography marginBottom={2} variant="h5" component="h2">Email &emsp;  {email} &ensp;
            <EditRoundedIcon onClick={() => { //setEditEmail(true)
                setChangeType(2)
                setCurrentPass(true)
            }}/>
            {
                insertEmail? 
                <div>
                    <Input type="email" sx={{marginLeft:"20px"}} placeholder="enter new email" inputRef={newEmail} />
                    <SendRoundedIcon onClick={editEmail}/>
                </div>
                :
                <Button> </Button>
            }
            
            <Button onClick={handleUsageOpen} style={{float:"right", marginRight: "55px"}}> Usage Policy </Button>
            <Modal
                open={openUsage}
                onClose={handleUsageClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx ={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                 Acceptable Usage Policy
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This Acceptable Usage Policy covers the security and use of all (Acme Corporation’s)
                information and IT equipment. It also includes the use of email, internet, voice and mobile IT
                equipment. This policy applies to all (Acme Corporation’s) employees, contractors and
                agents (hereafter referred to as ‘individuals’).
                This policy applies to all information, in whatever form, relating to (Acme Corporation’s)
                business activities worldwide, and to all information handled by (Acme Corporation) relating
                to other organisations with whom it deals. It also covers all IT and information
                communications facilities operated by (Acme Corporation) or on its behalf.
                
                Individuals must not:
                • Allow anyone else to use their user ID/token and password on any (Acme Corporation)
                IT system.
                • Leave their user accounts logged in at an unattended and unlocked computer.
                • Use someone else’s user ID and password to access (Acme Corporation’s) IT systems.
                </Typography>
                </Box>
            </Modal>
        </Typography>  
        <Typography  variant="h5" component="h2">Password &emsp; &ensp; {pass} &ensp;
            <EditRoundedIcon onClick={() => {
                setChangeType(3)
                setCurrentPass(true)
            }}/>
            {
                insertPass? 
                <div>
                    <Input sx={{marginLeft:"20px"}} placeholder="enter new password" inputRef={newPass} />
                    <SendRoundedIcon onClick={editPass}/>
                </div>
                :
                <Button> </Button>
            }
            <Button onClick={handlePrivacyOpen} style={{float:"right", marginRight: "50px"}}> Privacy Policy  </Button>
            <Modal
                open={openPrivacy}
                onClose={handlePrivacyClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx ={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Acceptable Privacy Policy
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they relate to the collection, use and disclosure of Personal Information.
                </Typography>
                </Box>
            </Modal>
        </Typography> 

        {
            insertCurrentPass ? 
            <Dialog open={insertCurrentPass} onClose={() => setCurrentPass(false)}>
            <DialogTitle>Enter Your Current Password</DialogTitle>
                <DialogContent>
                <DialogContentText>
                        For user changes
                        Please enter your current password
                      </DialogContentText>
                    <Box component={"form"}>
                    <TextField
                        autoFocus
                        autoComplete="false"
                        required
                        margin="dense"
                        id="password"
                        label="current password"
                        type="password"
                        fullWidth
                        variant="standard"
                        inputRef={currentPass}
                        />
                        </Box>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCurrentPass(false)}>Cancel</Button>
                    <Button onClick={matchFunction}>Change</Button>
                </DialogActions>
            </Dialog>
            :
            <Button> </Button>
        }
        </Card>    
    </div>
  );
};

export default AccountPage;