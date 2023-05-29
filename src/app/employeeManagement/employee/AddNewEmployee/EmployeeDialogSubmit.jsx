import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import PropTypes from "prop-types";
import EmployeeForm from "./InformationForm/EmployeeForm";
import CertificateForm from "./InformationForm/CertificateForm";
import FamilyRelationshipForm from "./InformationForm/FamilyRelationshipForm";
import {
  addEmployeeRequested,
  editEmployeeRequested,
} from "app/employeeManagement/redux/actions/EmployeeAction";
import { FORMAT_DATE_SUBMIT } from "../constains";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeRegistDialog from "./EmployeeRegistDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: "30px 10px" }}>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EmployeeDialogSubmit(props) {
  const { open, close, setReloadData } = props;
  const dispatch = useDispatch();
  const employeeReducer = useSelector((state) => state.employee.employee);
  const [tab, setTab] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [employee, setEmployeeInfo] = useState({});
  const [listCertificate, setListCertificate] = useState([]);
  const [listFamilyRelation, setListFamilyRelation] = useState([]);

  const [openRegistDialog, setOpenRegistDialog] = useState(false);

  useEffect(() => {
    if (employeeReducer.employeeInfo.employeeId) {
      setEmployeeInfo(employeeReducer.employeeInfo);
      setListCertificate(employeeReducer.certificates);
      setListFamilyRelation(employeeReducer.familyRelations);
    }
  }, [employeeReducer?.employeeInfo?.employeeId]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formatDateOfCertificates = listCertificate.map((item) => {
      return {
        ...item,
        issuanceDate: FORMAT_DATE_SUBMIT(item.issuanceDate),
      };
    });

    const formatDateOfFamilyRelation = listFamilyRelation.map((item) => {
      return {
        ...item,
        dateOfBirth: FORMAT_DATE_SUBMIT(item.dateOfBirth),
        familyRelationId: item.employeeId ? item.familyId : "",
      };
    });

    const employeeData = {
      employeeInfo: {
        ...employee,
        gender: +employee.gender,
        dateOfBirth: FORMAT_DATE_SUBMIT(employee.dateOfBirth),
      },
      certificates: formatDateOfCertificates,
      familyRelations: formatDateOfFamilyRelation,
    };

    employeeReducer?.employeeInfo?.employeeId
      ? dispatch(editEmployeeRequested(employeeData))
      : dispatch(addEmployeeRequested(employeeData));

    setHidden(true);
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Dialog maxWidth="lg" fullWidth={true} open={open} onClose={close}>
      <DialogTitle style={{ paddingBottom: "10px" }}>
        <span style={{ color: "#1d6d1e" }}>
          {employeeReducer?.employeeInfo?.employeeId
            ? "Sửa nhân viên"
            : "Thêm nhân viên"}
        </span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={close}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>
      <ValidatorForm onSubmit={handleOnSubmit}>
        <DialogContent style={{ padding: "10px 0px" }}>
          <AppBar position="static" color="default">
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="simple tabs example"
            >
              <Tab label="Thông tin nhân viên" {...a11yProps(0)} />
              <Tab label="Thông tin văn bằng" {...a11yProps(1)} />
              <Tab label="Quan hệ gia đình" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={tab} index={0}>
            <EmployeeForm
              employeeInfo={employee}
              setEmployeeInfo={setEmployeeInfo}
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <CertificateForm
              listCertificate={listCertificate}
              setListCertificate={setListCertificate}
            />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <FamilyRelationshipForm
              listFamilyRelation={listFamilyRelation}
              setListFamilyRelation={setListFamilyRelation}
            />
          </TabPanel>

          {openRegistDialog && <EmployeeRegistDialog />}
        </DialogContent>

        <DialogActions style={{ justifyContent: "center" }}>
          <div className="flex flex-space-between flex-middle m-10">
            <Button
              style={{ display: hidden ? "block" : "none" }}
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={() => setOpenRegistDialog(true)}
            >
              Đăng ký
            </Button>

            <Button
              variant="contained"
              className="mr-12"
              color="default"
              onClick={() => close()}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              variant="contained"
              className="mr-12"
              color="primary"
            >
              {employeeReducer?.employeeInfo?.employeeId
                ? "Sửa nhân viên"
                : "Lưu"}
            </Button>
          </div>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
