import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import api from '../services/api';
import CloseIcon from '@mui/icons-material/Close';
import {
    Avatar,
    Box,
    Container,
    CircularProgress,
    TextField,
    IconButton,
    Modal,
    InputAdornment,
    Typography,
} from "@mui/material";

const ViewUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const copy = "localhost:3000/"+id
    const [loading, setloading] = useState(false)
    const [data, setData] = useState([])
    const [open, setOpen] = useState(true)

    const fetchData = () => {
        setloading(true)
        api.get(`/?inc=&id=${id}`)
            .then((resp) => {
                setloading(false)
                setData(resp.data.results)
            })
            .catch((err) => {
                setloading(false)
                alert(err.message);
            })
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const handleClose = () => {
        setOpen(false)
        navigate("/")
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: "#FFF",
                    borderRadius: 5,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "40%",
                    minHeight: "50%",
                    boxShadow: 24,
                    p: 4,
                }}>
                {loading && <CircularProgress />}
                {data.map((item) => (
                    <>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Avatar
                            alt="userAvatar"
                            src={item.picture?.medium}
                            sx={{
                                position: 'absolute',
                                width: 150,
                                height: 150,
                                transform: 'translate(0, -65%)',
                            }}
                        />
                        <Box mt={8} ml={2} mr={2}>
                            <Typography
                                mt={2}
                                variant="h5"
                                align="center"
                                component="h5">
                                ID: {item.id.name}{item.id.value}
                            </Typography>
                            <Typography
                                mt={2}
                                variant="h5"
                                align="center"
                                component="h5">
                                {item.name?.title} {item.name?.first} {item.name?.last}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6">
                                Gender: {item.gender}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6">
                                Email: {item.email}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6">
                                Birth Date: {format(
                                    utcToZonedTime(new Date(item.dob?.date), ""),
                                    "MM/dd/yyyy"
                                )}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6">
                                Phone: {item.phone}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6">
                                Location: Street: {item.location.street.name}, Number: {item.location.street.number},
                                City: {item.location.city}  State:{item.location.state} Country: {item.location.country}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6">
                                Nationality: {item.nat}
                            </Typography>
                            <TextField
                                id="outlined-start-adornment"
                                fullWidth
                                value={copy}
                                sx={{ m: 1, }}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <CopyToClipboard text={copy}>
                                                    <ContentCopyIcon />
                                                </CopyToClipboard>
                                            </IconButton>
                                        </InputAdornment>,
                                }}
                            />
                        </Box>
                    </>
                ))}
            </Container>
        </Modal>
    );
}
export default ViewUser;
