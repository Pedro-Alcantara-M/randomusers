import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useStateValue } from '../context/state';
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../services/api';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  IconButton,
  InputLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';

const Home = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useStateValue();
  const [loading, setloading] = useState(false)
  const [page] = useState(0);
  const [data, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { gender, nat } = state

  const optionsNat =
    [
      "AU", "BR", "CA", "CH", "DE", "DK",
      "ES", "FI", "FR", "GB", "IR", "IE",
      "NO", "NL", "NZ", "TR", "US",
    ]

  const fetchData = () => {
    setloading(true)
    api.get(`/?results=50&gender=${gender}&nat=${nat}&noinfo`)
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
  }, [gender, dispatch, nat])

  const handleGenderChange = (event) => {
    dispatch({ type: 'Gender', payload: event.target.value })
  }

  const handleNatChange = (event) => {
    dispatch({ type: 'Nat', payload: event.target.value })
  }

  const handlePagination = () => {
    if (rowsPerPage < 50) {
      setRowsPerPage(rowsPerPage + 10)
    } else {
      setRowsPerPage(10)
    }
  }

  return (
    <Grid container alignContent={'center'} justifyContent={"center"}>
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <Typography variant="h6" component="h6" mt={2}>
          "Sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et
          quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur
          aut odit aut fugit"
        </Typography>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7} mt={3} >
        <FormControl component="fieldset" >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            sx={{ display: 'flex', flexDirection: 'row' }}
            aria-label="gender"
            value={gender}
            name="radio-buttons-group"
            onChange={(event) => handleGenderChange(event)}
          >
            <FormControlLabel value="" control={<Radio />} label="None" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <InputLabel sx={{ mt: 3 }} id="select-label">Nationality</InputLabel>
        <Select
          sx={{ mb: 2 }}
          labelId="select-label"
          fullWidth
          id="demo-simple-select"
          value={nat}
          onChange={(event) => handleNatChange(event)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {optionsNat.map((option) => (
            <MenuItem value={option.toLowerCase()}>{option}</MenuItem>
          ))}
        </Select>

      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <Grid container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {loading && <CircularProgress />}
        </Grid>

        {!loading && (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Birth</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    ?
                    (rowsPerPage > 0
                      ? data?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : data).map((item) => (
                        <TableRow key={`${item.id.name}${item.id.value}`}>
                          <TableCell>
                            {item.name.first} {item.name.last}
                          </TableCell>
                          <TableCell>{item.gender}</TableCell>
                          <TableCell> {format(
                            utcToZonedTime(new Date(item.dob.date), ""),
                            "MM/dd/yyyy 'at' HH:mm"
                          ) ?? new Date()}
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => navigate(`/${item.id.value}`)}><VisibilityIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    :
                    <Typography variant="h6" component="h6" mt={2}>
                      No users found
                    </Typography>
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <LoadingButton
                onClick={handlePagination}
                loading={loading}
                startIcon={<RefreshIcon />}
                loadingIndicator="Loading..."
                variant="outlined"
              >
                {rowsPerPage > 49 ? "refresh" : "loading more"}
              </LoadingButton>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Home;

