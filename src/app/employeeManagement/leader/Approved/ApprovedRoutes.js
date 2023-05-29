import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Approved = EgretLoadable({
  loader: () => import("./Approved"),
});
const ViewComponent = withTranslation()(Approved);
const ApprovedRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leader/approved",
    exact: true,
    component: ViewComponent,
  },
];

export default ApprovedRoutes;
