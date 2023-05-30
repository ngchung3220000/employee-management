import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import RegisterProfile from "./FormUpdateEvolution/RegisterProfile";
import SalaryIncrease from "./FormUpdateEvolution/SalaryIncrease";
import Promote from "./FormUpdateEvolution/Promote";
import ProposalToAdvise from "./FormUpdateEvolution/ProposalToAdvise";

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

export default function EmployeeManagementDialog(props) {
  const { dialogUpdate, setDialogUpdate } = props;

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={dialogUpdate}
      onClose={() => setDialogUpdate(false)}
    >
      <DialogTitle>
        Employee Management
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={() => setDialogUpdate(false)}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Đăng ký hồ sơ" {...a11yProps(0)} />
            <Tab label="Tăng lương" {...a11yProps(1)} />
            <Tab label="Thăng chức" {...a11yProps(2)} />
            <Tab label="Đề xuất tham mưu" {...a11yProps(3)} />
          </Tabs>
          <div style={{ width: "100%" }}>
            <TabPanel value={value} index={0}>
              <RegisterProfile />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <SalaryIncrease />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Promote />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <ProposalToAdvise />
            </TabPanel>
          </div>
        </div>
      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  );
}
