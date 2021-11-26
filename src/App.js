import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { listLocations, listProjects, listBuildings, listFloors, createLocation } from "../src/actions/locationActions";
import MyTable from './components/MyTable';
import Message from './components/Message';
import Loader from './components/Loader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 250,
  bgcolor: '#FFF',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const App = () => {

  const dispatch = useDispatch()

  const locationList = useSelector(state => state.locationList)
  const { loading, error, locations } = locationList

  const projectList = useSelector(state => state.projectList)
  const { loading: loadingProject, error: errorProject, projects } = projectList

  const buildingList = useSelector(state => state.buildingList)
  const { loading: loadingBuilding, error: errorBuilding, buildings } = buildingList

  const floorList = useSelector(state => state.floorList)
  const { loading: loadingFloor, error: errorFloor, floors } = floorList

  const locationCreate = useSelector(state => state.locationCreate)
  const { success, loading: loadingNewLoc, error: errornewLoc, newLocation } = locationCreate

  const [location, setLocation] = useState('')
  const [project, setProject] = useState('')
  const [building, setBuilding] = useState('')
  const [floor, setFloor] = useState('')
  const [locationName, setLocationName] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [dispensation, setDispensation] = useState(0)
  const [dataLocation, setDataLocation] = useState([])
  const [editData, setEditData] = useState({})

  const [locCode, setLocCode] = useState('')
  const [buildCode, setBuildCode] = useState('')
  const [locType, setLocType] = useState('')
  const [open, setOpen] = useState(false)

  const handleLocation = (event) => {
    // console.log('ini value', event.target.value);
    let tempTipe = locations.filter(e => e.name === event.target.value)
    // console.log('ini testing', tempTipe[0].code);
    setLocType(tempTipe[0].code)
    setLocation(event.target.value)
  }



  const handleProject = (event) => {
    let tempCode = projects.filter(e => e.locName === event.target.value)
    setLocCode(tempCode[0].locCode)
    setProject(event.target.value)
  }

  const handleBuilding = (event) => {

    let tempCode = buildings.filter(e => e.locName === event.target.value)

    setBuildCode(tempCode[0].locCode)
    setBuilding(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createLocation(locationName, locType, latitude, longitude, dispensation))
    console.log('submit here');
  }

  const deleteHandler = (params) => {

    // console.log('ini params', params);

    if (window.confirm('Are you sure')) {
      let newData = dataLocation.filter(e => e.locName !== params)
      // console.log('data delete', newData);
      setDataLocation(newData)
    }
  }

  const editHandler = (params) => {
    let newData = dataLocation.filter(e => e.locName === params)
    console.log('edit', newData);
    setEditData()
  }


  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)

  }



  useEffect(() => {

    dispatch(listLocations())
    dispatch(listProjects())
    if (locCode) {
      dispatch(listBuildings(locCode.toString()))
    }

    if (buildCode) {
      dispatch(listFloors(buildCode.toString()))

    }

    if (success) {

      setDataLocation(dataLocation => [...dataLocation, newLocation.data]);

    }


  }, [dispatch, locCode, buildCode, newLocation, success])

  // locCode && console.log('ini code', locCode);

  return (
    <Container>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 1,
          pt: 4,
          width: '100%',
          minHeight: '4vh',
        }}
      >
        {success && <Message variant='success' >{newLocation?.message}</Message>}
        {errornewLoc && <Message variant='error' >{errornewLoc}</Message>}
        {loadingNewLoc && <Loader />}
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 1,
          pt: 4,
          width: '100%',
          minHeight: '40vh',
        }}
      >
        <Paper elevation={3} >
          <Box sx={{ minWidth: 120, p: 4 }}>
            <form onSubmit={submitHandler} >
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Location Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={location}
                      label="Location"
                      onChange={(e) => handleLocation(e)}
                    >
                      {locations && locations.map((loc, i) => (

                        <MenuItem key={i} value={loc.name}>{loc.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {location === 'Project' ? (
                  <Grid item>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Location Name"
                        variant="outlined"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                ) : (
                  <>
                    {location === 'Room' && (
                      <>

                        <Grid item>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose Project</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={project}
                              label="Project"
                              onChange={(e) => handleProject(e)}
                            >
                              {projects && projects.map((prj, i) => (
                                <MenuItem key={i} value={prj.locName}>{prj.locName}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose Building</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={building}
                              label="Building"
                              onChange={(e) => handleBuilding(e)}
                            >
                              {buildings && buildings.map((bld, i) => (
                                <MenuItem key={i} value={bld.locName}>{bld.locName}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose Floor</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={floor}
                              label="Floors"
                              onChange={(e) => setFloor(e.target.value)}
                            >
                              {floors && floors.map((flor, i) => (
                                <MenuItem key={i} value={flor.locName}>{flor.locName}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </>

                    )}
                  </>
                )}

                <Grid item container direction='row' spacing={2}>
                  <Grid item>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Latitude"
                        variant="outlined"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Longitude"
                        variant="outlined"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Dispensation"
                        variant="outlined"
                        value={dispensation}
                        onChange={(e) => setDispensation(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container direction='row' justifyContent='flex-end' spacing={2}>
                  <Grid item>
                    <Button variant="outlined">Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button type='submit' variant="contained">Save</Button>
                  </Grid>
                </Grid>

              </Grid>

            </form>

          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 1,
          pt: 4,
          width: '100%',
          minHeight: '40vh',
        }}
      >
        <MyTable
          rows={dataLocation}
          actionEdit={editHandler}
          actionModal={handleOpen}
          actionDelete={deleteHandler}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Location Code"
                  variant="outlined"
                  value={locCode}
                  onChange={(e) => setLocCode(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Location Name"
                  variant="outlined"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Location Type"
                  variant="outlined"
                  value={locType}
                  onChange={(e) => setLocType(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item container direction='row' justifyContent='flex-end' spacing={2}>
              <Grid item>
                <Button variant="outlined">Cancel</Button>
              </Grid>
              <Grid item>
                <Button type='submit' variant="contained">Save</Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  )
}

export default App
