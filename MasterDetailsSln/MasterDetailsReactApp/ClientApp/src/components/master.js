import { useState, useEffect } from 'react';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';


function Master() {
    const baseUrl = 'http://localhost:5117';
    //const baseUrl = 'https://master-details-react.aminurdev.com';
    const [openDialog, setOpenDialog] = useState(false);
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [enrollmentDate, setEnrollmentDate] = useState(null);
    const [enrollmentDateError, setEnrollmentDateError] = useState(false);
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const [enrollments, setEnrollments] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        
        loadEnrollmentData();


    }, [])

    const loadEnrollmentData = () => {
        axios.get(baseUrl + '/Enrollment/GetAll')
            .then(function (response) {
                setEnrollments([...response.data]);
            }).catch(function (error) {
            }).then(function () {
            });
    }

    const handleClickOpenDialog = (paramId) => {

        setId(paramId);
        if (paramId == 0) {
            console.log('id = 0 ');
            axios.get(baseUrl + '/Enrollment/GetAllCourse')
                .then(function (response) {
                    console.log(response.data);
                    setCourses([...response.data])
                    setOpenDialog(true);
                }).catch(function (error) { }).then(function () { });

            setOpenDialog(true);
        } else {
            console.log('id != 0 ');
            console.log(paramId);
            axios.get(baseUrl + '/Enrollment/GetEnrollById', {
                headers: {
                    "id": paramId
                }
            }).then(function (response) {
                console.log(response.data);
                setCourses([...response.data.courses])
                setName(response.data.studentName);
                setEnrollmentDate(response.data.enrollmentDate);
                setTerm(response.data.terms);
                setOpenDialog(true);
            }).catch(function (error) {
                console.log(error);
            }).then(function () {

            });
        }

    };

    const handleCloseDialog = () => {

        setId(0);
        setName('');
        setNameError(false);
        setEnrollmentDate(null);
        setEnrollmentDateError(false);
        setTerm('');
        setTermError(false);
        setCourses([]);

        setOpenDialog(false);
    };

    const handleNameChange = event => {
        if (event.target.value.trim() != '') {
            setNameError(false);
        } else {
            setNameError(true);
        }
        setName(event.target.value);

    }
    const changeEnrollmentDate = newValue => {

        setEnrollmentDate(newValue)
    }

    const handleTermChange = event => {
        setTermError(false);
        setTerm(event.target.value);

    }

    const handleSaveData = () => {

        let isValid = true;
        if (name == '') {
            setNameError(true);
            isValid = false;
        };
        if (enrollmentDate == null) {
            setEnrollmentDateError(true);
            isValid = false;
        };
        if (term == '') {
            setTermError(true);
            isValid = false;
        };

        if (!isValid) {
            return;
        }

        let data = {
            id: id,
            studentName: name,
            enrollmentDate: enrollmentDate,
            terms: term,
            courses: courses
        }
        axios.post(baseUrl + '/Enrollment/AddOrUpdate', data)
            .then(function (response) {
                setOpenDialog(false);
                setId(0);
                setName('');
                setNameError(false);
                setEnrollmentDate(null);
                setEnrollmentDateError(false);
                setTerm('');
                setTermError(false);
                setCourses([]);
                loadEnrollmentData();
            })
            .catch(function (error) {
            });
    }

    const terms = [
        {
            value: '1-1',
            label: '1-1',
        },
        {
            value: '1-2',
            label: '1-2',
        },
        {
            value: '1-3',
            label: '1-3',
        },
        {
            value: '2-1',
            label: '2-1',
        },
        {
            value: '2-2',
            label: '2-2',
        },
        {
            value: '2-3',
            label: '2-3',
        }
    ];


    const handleCheckChange = (event, id) => {
        var foundIndex = courses.findIndex(x => x.id == id);
        courses[foundIndex].isChecked = event.target.checked;
        setCourses([...courses]);
    }

    const editRow = (id) => {
        handleClickOpenDialog(id);
    };
    const columns = [
        { field: 'id', name: 'Id', width: 150 },
        { field: 'studentName', headerName: 'Name', width: 150 },
        { field: 'enrollmentDate', headerName: 'Enrollment Date', width: 150 },
        { field: 'terms', headerName: 'Tarms', width: 150 },
        { field: 'courses', headerName: 'Courses', width: 300 },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => editRow(params.id)}
                />
            ],
        },
    ];


    return (
        <Grid container >
            <Grid container justifyContent="flex-end">
                <Button variant="contained" onClick={() => handleClickOpenDialog(0)}>New</Button>
            </Grid>

            <Grid style={{ height: 500, width: '100%', marginTop: '10px' }}>
                <DataGrid rows={enrollments} columns={columns} />
            </Grid>

            <Dialog fullWidth={true} maxWidth='md' open={openDialog}>
                <DialogContent>
                    <Box noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box spacing={2} style={{ padding: '10px' }}>
                                    <TextField id="outlined-basic" label="Name" error={nameError} value={name} fullWidth variant="outlined" size="small" onChange={handleNameChange} />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box spacing={2} style={{ padding: '10px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker fullWidth
                                            label="Enrollment Date"
                                            closeOnSelect={true}
                                            inputFormat="DD/MMM/YYYY"
                                            error={enrollmentDateError}
                                            value={dayjs(enrollmentDate)}
                                            onChange={newValue => changeEnrollmentDate(newValue)}
                                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                        />

                                    </LocalizationProvider>

                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box spacing={2} style={{ padding: '10px' }}>
                                    <TextField
                                        id="outlined-select-currency"
                                        fullWidth
                                        select
                                        label="Select Term"
                                        value={term}
                                        onChange={handleTermChange}
                                        helperText="Select Term"
                                        size="small"
                                        error={termError}
                                    >
                                        {terms.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            {
                                courses.map(option => {
                                    return <Grid item xs={3} key={option.id}>
                                        <FormControlLabel key={option.course}
                                            control={
                                                <Checkbox name={option.course}
                                                    checked={option.isChecked}
                                                    onChange={(event) => handleCheckChange(event, option.id)} />
                                            }
                                            label={option.course} />
                                    </Grid>
                                })
                            }
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveData} variant="contained" color='success'>Save</Button>
                    <Button onClick={handleCloseDialog} variant="contained" color='info'>Close</Button>
                </DialogActions>
            </Dialog>






        </Grid>


    );
}

export default Master;