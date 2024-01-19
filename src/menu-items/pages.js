// assets
import {
  AppstoreAddOutlined,
  UserOutlined,
  QrcodeOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  KeyOutlined,
  ScanOutlined,
  StockOutlined,
  AppstoreOutlined
} from "@ant-design/icons";

// icons
const icons = {
  StockOutlined,
  FontSizeOutlined,
  UserOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  KeyOutlined,
  ScanOutlined,
  QrcodeOutlined,
  AppstoreOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: "pages",
  title: "Aplicación",
  type: "group",
  children: [
    {
      id: "fund-cost",
      title: "Costo Fondo",
      type: "collapse",
      url: "/",
      icon: "i_products",
      // collapse: true,
      children: [
        {
          title: "Cotizar",
          icon: icons.StockOutlined,
          href: "/fundcost",
        },
        {
          title: "Mis Cotizaciones",
          icon: icons.StockOutlined,
          href: "/fundcost/quotes",
        },
        {
          title: "Aprobaciones",
          icon: icons.StockOutlined,
          href: "/fundcost/approvals",
        },
      ],
    },
    // {
    //   id: "test-id",
    //   title: "test",
    //   type: "item",
    //   url: "/test/test",
    //   icon: icons.UserOutlined,
    // },

  ],
};

export default pages;
