import { Grid, Avatar, Box, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';

const Header = () => {

    return (
        <Grid container 
        sx={{ 
            height: 70, 
            backgroundColor: '#ccc', 
            justifyContent: 'space-between' 
            }}>
                
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Avatar
                    variant="square"
                    sx={{
                        m: 1,
                        ":hover": {
                            cursor: "pointer",
                        },
                        height: "40px",
                        width: "40px",
                    }}
                ><ImageIcon /></Avatar>
                <Typography variant="h6" component="h6">
                    COMPANY
                </Typography>
            </Box>

            <Avatar
                sx={{
                    alignSelf: 'center',
                    m: 1,
                    ":hover": {
                        cursor: "pointer",
                    },
                    height: "40px",
                    width: "40px",
                }}
            />
        </Grid>
    )
}

export default Header