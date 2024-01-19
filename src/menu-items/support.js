// assets
import {
  ChromeOutlined,
  QuestionOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  QuestionCircleOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: "support",
  title: "Soporte",
  type: "group",
  children: [
    // {
    //   id: "policies",
    //   title: "Politicas y Condiciones",
    //   type: "item",
    //   url: "/policies",
    //   icon: icons.ChromeOutlined,
    // },
    {
      id: "questions",
      title: "Preguntas Frecuentes",
      type: "item",
      // url: 'https://**********/',
      url: "/admin/questions",
      icon: icons.QuestionCircleOutlined,
      // external: true,
      // target: true
    },
  ],
};

export default support;
