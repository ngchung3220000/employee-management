import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Profile from "./RegistForm/Profile";
import Resume from "./RegistForm/Resume";
import Diploma from "./RegistForm/Diploma";
import { useSelector } from "react-redux";

import { useSelector } from "react-redux";
import { DialogContent } from "@material-ui/core";

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
          <Typography component="div">{children}</Typography>
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function RegistForm(props) {
  // console.log("regist 1", formEmployee);
  // const {formEmployee, setFormEmployee} = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [resume, setResume] = useState({});
  const [cv, setCv] = useState({});

  // const formEmployee = useSelector(state => state.employee.formEmployee)

  // useEffect(() => {
  //     setCv(formEmployee.cv)
  // }, [formEmployee?.employeeId])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DialogContent style={{ height: "800px" }}>
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
            <Profile props={props} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Resume props={props} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Diploma />
          </TabPanel>
        </div>
      </div>
    </DialogContent>
  );
}

export default RegistForm;
