import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Pending = EgretLoadable({
  loader: () => import("./Pending"),
});
const ViewComponent = withTranslation()(Pending);
const PendingRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leader/pending",
    exact: true,
    component: ViewComponent,
  },
];

export default PendingRoutes;
