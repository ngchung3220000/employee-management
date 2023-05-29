import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core'

import Profile from './RegistForm/Profile';
import Resume from './RegistForm/Resume';
import Diploma from './RegistForm/Diploma';

import { useSelector } from 'react-redux'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function EmployeeRegistDialog() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const [resume, setResume] = useState({})
    const [cv, setCv] = useState({})

    const employeeInfo = useSelector(state => state.employee.employee.employeeInfo);
    // console.log(employeeInfo);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog open={true} onClose={() => { }}
            aria-labelledby="form-dialog-title"
            maxWidth='xl    '
            fullWidth
        >
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
            <DialogContent
                style={{ height: '800px' }}

            >

                <div className={classes.root}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Hồ sơ" {...a11yProps(0)} />
                        <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} />
                        <Tab label="Văn bằng" {...a11yProps(2)} />
                    </Tabs>
                    <div style={{ width: "100%" }}>
                        <TabPanel value={value} index={0}>
                            <Profile
                                cvData={cv}
                                setCvData={setCv}
                                employeeInfo={employeeInfo}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Resume
                                resumeData={resume}
                                setResumeData={setResume}
                                employeeInfo={employeeInfo}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Diploma />
                        </TabPanel>
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => { }} color="secondary" variant='contained'>
                    Lưu
                </Button>
                <Button onClick={() => { }} color="primary" variant='contained'>
                    Gửi lãnh đạo
                </Button>
                <Button onClick={() => { }} color="error" variant='contained'>
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
}
