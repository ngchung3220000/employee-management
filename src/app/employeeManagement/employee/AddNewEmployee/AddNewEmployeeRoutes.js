import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const AddNewEmployee = EgretLoadable({
  loader: () => import("./AddNewEmployee"),
});
const ViewComponent = withTranslation()(AddNewEmployee);
const AddNewEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "list/addNewEmployee",
    exact: true,
    component: ViewComponent,
  },
];

export default AddNewEmployeeRoutes;
