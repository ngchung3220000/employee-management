import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const EmployeeManagement = EgretLoadable({
    loader: () => import("./EmployeeManagement"),
});
const ViewComponent = withTranslation()(EmployeeManagement);
const EmployeeManagementRoutes = [
    {
        path: ConstantList.ROOT_PATH + "list/employeeManagement",
        exact: true,
        component: ViewComponent,
    },
];

export default EmployeeManagementRoutes;
