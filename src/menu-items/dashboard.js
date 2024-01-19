// assets
import { DashboardOutlined,HomeOutlined} from "@ant-design/icons";

// icons
const icons = {
  DashboardOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "group-dashboard",
  icon: icons.HomeOutlined,
  title: "Inicio",
  href: "/",
  type: "item",
  children: [
    {
      id: "home",
      title: "Dashboard",
      type: "item",
      url: "/home",
      icon: "i_home",
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
