import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { getLocationById, listLocationTypes, listProjects, listBuildings, listFloors, createLocation, listLocations } from "../src/actions/locationActions";
import MyTable from './components/MyTable';
import Message from './components/Message';
import Loader from './components/Loader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  minHeight: '30vh',
  bgcolor: '#FFF',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const App = () => {

  const dispatch = useDispatch()

  const locationType = useSelector(state => state.locationType)
  const { loading, error, locationTypes } = locationType


  const projectList = useSelector(state => state.projectList)
  const { loading: loadingProject, error: errorProject, projects } = projectList

  const buildingList = useSelector(state => state.buildingList)
  const { loading: loadingBuilding, error: errorBuilding, buildings } = buildingList

  const floorList = useSelector(state => state.floorList)
  const { loading: loadingFloor, error: errorFloor, floors } = floorList

  const locationCreate = useSelector(state => state.locationCreate)
  const { success, loading: loadingNewLoc, error: errornewLoc, newLocation } = locationCreate

  const locationList = useSelector(state => state.locationList)
  const { loading: loadingLocation, error: errorLocation, locations } = locationList

  const locationById = useSelector(state => state.locationById)
  const { loading: loadingById, error: errorById, locById } = locationById


  const [location, setLocation] = useState('')
  const [project, setProject] = useState('')
  const [building, setBuilding] = useState('')
  const [floor, setFloor] = useState('')
  const [locationName, setLocationName] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [dispensation, setDispensation] = useState(0)
  const [dataLocation, setDataLocation] = useState([])
  // const [editData, setEditData] = useState({})

  // const [locCode, setLocCode] = useState('')
  // const [buildCode, setBuildCode] = useState('')
  // const [locType, setLocType] = useState('')
  // const [floorCode, setFloorCode] = useState('')
  const [open, setOpen] = useState(false)

  const handleLocation = (event) => {

    setLocation(event.target.value)
  }



  const handleProject = (event) => {
    // console.log('INI PROJECT',event.target.value);
    setProject(event.target.value)
  }

  const handleBuilding = (event) => {

    setBuilding(event.target.value)
  }


  const handleFloor = (event) => {
  
    setFloor(event.target.value)
  }

  const handleEdit = (id) => {

    console.log('edit here');
  }



  const submitHandler = (e) => {
    e.preventDefault()

    

    switch (location) {
      case 'PR':
        dispatch(createLocation({
          locName: locationName,
          locType: location,
          locLatitude: latitude,
          locLongitude: longitude,
          locDispensation: dispensation
        }))
        // console.log('masuk ke PR', locType);
        break;
      case 'BD':
        dispatch(createLocation({
          locName: locationName,
          locType: location,
          projectCode: project,
          locLatitude: latitude,
          locLongitude: longitude,
          locDispensation: dispensation
        }))
        // console.log('masuk ke BD', locCode, locationName);
        break;
      case 'FL':
        dispatch(createLocation({
          locName: locationName,
          locType: location,
          projectCode: project,
          buildingCode: building,
          locLatitude: latitude,
          locLongitude: longitude,
          locDispensation: dispensation
        }))
        // console.log('code', buildCode);
        break;
      case 'RO':
        dispatch(createLocation({
          locName: locationName,
          locType: location,
          projectCode: project,
          buildingCode: building,
          floorCode: floor,
          locLatitude: latitude,
          locLongitude: longitude,
          locDispensation: dispensation
        }))
        // console.log('code', floorCode);
        break;

      default:
        break;
    }


  }

  const deleteHandler = (params) => {


    if (window.confirm('Are you sure')) {
      let newData = dataLocation.filter(e => e.locName !== params)
      // console.log('data delete', newData);
      setDataLocation(newData)
    }
  }

  const editHandler = (id) => {

    dispatch(getLocationById(id))
    // let newData = locations.filter(e => e.locID === params)
  }


  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)

  }



  useEffect(() => {

    dispatch(listLocationTypes())
    dispatch(listProjects())
    dispatch(listLocations())


    if (project) {
      // console.log(location, '<<<<<<<<<<');
      dispatch(listBuildings(project.toString()))
    }

    if (building) {
      dispatch(listFloors(building.toString()))

    }

    if (success) {

      setDataLocation(dataLocation => [...dataLocation, newLocation.data]);
      setLocationName('')

    }


  }, [success, project,building])


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
                      {locationTypes && locationTypes.map((loc, i) => (

                        <MenuItem key={i} value={loc.code}>{loc.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {location !== 'PR' && (

                  <Grid item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Choose Project</InputLabel>
                      {/* {<div>{project}</div>} */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={project}
                        label="Project"
                        onChange={(e) => handleProject(e)}
                      >
                        {projects && projects.map((prj, i) => (
                          <MenuItem key={i} value={prj.locCode}>{prj.locName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {location !== 'PR' && location !== 'BD' && (
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
                          <MenuItem key={i} value={bld.locCode}>{bld.locName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}


                {location !== 'PR' && location !== 'FL' && location !== 'BD' && (
                  <Grid item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Choose Floor</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={floor}
                        label="Floors"
                        onChange={(e) => handleFloor(e)}
                      >
                        {floors && floors.map((flor, i) => (
                          <MenuItem key={i} value={flor.locCode}>{flor.locName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}


                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Input Name"
                      variant="outlined"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                    />
                  </FormControl>
                </Grid>


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
                    <Button type='submit' variant="contained">Save Location</Button>
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
          rows={locations}
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
          <form onSubmit={submitHandler}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Location Type</InputLabel>
                  {/* <div>{locById?.locType}</div> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={locById?.locTypeLabel}
                    label="Location"
                    onChange={(e) => handleLocation(e)}
                  >
                    {locationTypes && locationTypes.map((loc, i) => (

                      <MenuItem key={i} value={loc.name}>{loc.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {locById?.locType !== 'PR' && (

                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Project</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={locById?.project?.locName}
                      label="Project"
                      onChange={(e) => handleProject(e)}
                    >
                      {projects && projects.map((prj, i) => (
                        <MenuItem key={i} value={prj.locName}>{prj.locName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {locById?.locType !== 'PR' && locById?.locType !== 'BD' && (
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Building</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={locById?.building?.locName}
                      label="Building"
                      onChange={(e) => handleBuilding(e)}
                    >
                      {buildings && buildings.map((bld, i) => (
                        <MenuItem key={i} value={bld.locName}>{bld.locName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}


              {locById?.locType !== 'PR' && locById?.locType !== 'FL' && locById?.locType !== 'BD' && (
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Floor</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={locById?.floor?.locName}
                      label="Floors"
                      onChange={(e) => handleFloor(e)}
                    >

                      {floors && floors.map((flor, i) => (
                        <MenuItem key={i} value={flor.locName}>{flor.locName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}


              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Input Name"
                    variant="outlined"
                    value={locById?.locName}
                    onChange={(e) => setLocationName(e.target.value)}
                  />
                </FormControl>
              </Grid>


              <Grid item container direction='row' spacing={2}>
                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Latitude"
                      variant="outlined"
                      value={locById?.locLatitude}
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
                      value={locById?.locLatitude}
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
                      value={locById?.locDispensation}
                      onChange={(e) => setDispensation(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container direction='row' justifyContent='flex-end' spacing={2}>
                <Grid item>
                  <Button onClick={handleClose} variant="outlined">Cancel</Button>
                </Grid>
                <Grid item>
                  <Button type='submit' variant="contained">Save</Button>
                </Grid>
              </Grid>

            </Grid>
          </form>
        </Box>
      </Modal>
    </Container>
  )
}

export default App
