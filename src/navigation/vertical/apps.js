// ** Icons Import
import {
  Mail,
  CheckSquare,
  MessageCircle,
  Calendar,
  FileText,
  Circle,
  List,
  User,
  Droplet,
  Users,
  Bell,
  Home,
  HelpCircle,
  Feather,
  Settings,
  CheckCircle,
  Briefcase,
  UserX,
  Filter,
  Video,
  Youtube,
  Award,
  Folder,
} from "react-feather";
import secureLocalStorage from "react-secure-storage";
// let user = JSON.parse(localStorage.getItem("userData"));
let user = JSON.parse(secureLocalStorage.getItem("userData"));

// let View = [];
const test = {
  id: "test",
  title: "test",
  icon: <Home size={20} />,
  navLink: "/test",
};
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  icon: <Home size={20} />,
  navLink: "/dashboard",
};

const attendance = {
  id: "attendanceApp",
  title: "Attendance",
  icon: <CheckCircle />,
  children: [
    {
      id: "Attendance_Report",
      title: "Attendance Report",
      icon: <CheckCircle size={20} />,
      navLink: "/attendancereport",
    },
    {
      id: "Daily_Attendance",
      title: "Daily Attendance",
      icon: <CheckCircle size={20} />,
      navLink: "/dailyattendance",
    },
  ],
};
const leave = {
  id: "leave",
  title: "Leave",
  icon: <UserX size={20} />,
  navLink: "/leave",
};
const lead = {
  id: "lead",
  title: "Lead",
  icon: <Filter size={20} />,
  navLink: "/lead",
};
const task = {
  id: "task",
  title: "Task",
  icon: <Calendar size={20} />,
  navLink: "/task",
};
const reminder = {
  id: "reminder",
  title: "Reminder",
  icon: <Bell size={20} />,
  navLink: "/reminder",
};
const meeting = {
  id: "meeting",
  title: "Meeting",
  icon: <Briefcase size={20} />,
  navLink: "/meeting",
};
const customer = {
  id: "customer",
  title: "Customer",
  icon: <Users size={20} />,
  navLink: "/customer-list",
};
const staff = {
  id: "staff",
  title: "Staff",
  icon: <User size={20} />,
  navLink: "/staff",
};
const Chat = {
  id: "Chat",
  title: "Chat",
  icon: <MessageCircle size={20} />,
  navLink: "/chat",
};
const Notes = {
  id: "Notes",
  title: "Notes",
  icon: <CheckSquare size={20} />,
  navLink: "/notes",
};
const general_settings = {
  id: "General-Settings",
  title: "General Settings",
  icon: <Settings size={20} />,
  children: [
    {
      id: "websetting",
      title: "Websetting",
      icon: <Circle size={20} />,
      navLink: "/websetting",
    },
    {
      id: "Status",
      title: "Status",
      icon: <Circle size={12} />,
      navLink: "/status",
      children: [
        {
          id: "Custom-lead-status",
          title: "Lead Status",
          icon: <Circle size={12} />,
          navLink: "/leadstatus",
        },
        {
          id: "Custom-lead-source",
          title: "Lead Source",
          icon: <Circle size={12} />,
          navLink: "/leadsource",
        },
        {
          id: "Custom-lead-label",
          title: "Lead Label",
          icon: <Circle size={12} />,
          navLink: "/leadlabel",
        },
        {
          id: "Custom-task-status",
          title: "Task Status",
          icon: <Circle size={12} />,
          navLink: "/taskstatus",
        },
        // {
        //   id: "Custom-task-Label",
        //   title: "Task label",
        //   icon: <Circle size={12} />,
        //   navLink: "/tasklabel",
        // },
      ],
    },
    {
      id: "template",
      title: "Templates",
      icon: <Circle size={12} />,
      navLink: "/template",
      children: [
        {
          id: "emailtemplate",
          title: "Email Template",
          icon: <Circle size={20} />,
          navLink: "/emailtemplate",
        },
        {
          id: "smstemplate",
          title: "SMS Template",
          icon: <Circle size={20} />,
          navLink: "/smstemplate",
        },
        {
          id: "whatsapptemplate",
          title: "Whatsapp Template",
          icon: <Circle size={20} />,
          navLink: "/whatsapptemplate",
        },
      ],
    },
    {
      id: "automation_rules",
      title: "Automation Rules",
      icon: <Circle size={12} />,
      navLink: "/automation-rules",
      children: [
        {
          id: "email-automation-rules",
          title: "Email Automation",
          icon: <Circle size={20} />,
          navLink: "/email-automation-rules",
        },
        {
          id: "sms-automation-rules",
          title: "SMS Automation",
          icon: <Circle size={20} />,
          navLink: "/sms-automation-rules",
        },
        {
          id: "whatsapp-automation-rules",
          title: "Whatsapp Automation",
          icon: <Circle size={20} />,
          navLink: "/whatsapp-automation-rules",
        },
      ],
    },
  ],
};
let View = [];
let adminRoutes = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/dashboard",
  },
  // {
  //   id: "course",
  //   title: "Course",
  //   icon: <Folder size={20} />,
  //   navLink: "/course",
  // },
  {
    id: "videos",
    title: "Videos",
    icon: <Video size={20} />,
    navLink: "/video",
  },
  {
    id: "questions",
    title: "Questions",
    icon: <List size={20} />,
    navLink: "/questions",
  },
  {
    id: "users",
    title: "Users",
    icon: <Users size={20} />,
    navLink: "/users",
  },
];

let userRoutes = [
  {
    id: "videoBasedTraining",
    title: "Video Based Training",
    icon: <Youtube size={20} />,
    navLink: "/quiz",
  },
  {
    id: "certificate",
    title: "Certificate",
    icon: <Award size={20} />,
    navLink: "/certificate",
  },
];

// let g_View = [dashboard, Notes];
// // user?.active_package_id == 5 ? g_View.push(leave) : null;
// user?.p_lead == 1 ? g_View.push(lead) : null;
// user?.p_task == 1 ? g_View.push(task) : null;
// user?.p_reminder == 1 ? g_View.push(reminder) : null;
// user?.type == 1 && user?.meeting == 1 ? g_View.push(meeting) : null;
// user?.type == 2 && user?.p_meeting == 1 ? g_View.push(meeting) : null;
// user?.p_lead == 1 ? g_View.push(customer) : null;
// user?.type == 1 ? g_View.push(staff) : null;
// user?.chat == 1 ? g_View.push(Chat) : null;

// user?.attendance == 1 ? g_View.push(leave) : null;
// user?.attendance == 1 && user.type == 1 ? g_View.push(attendance) : null;

// // without invoice
// // user?.type == 1 ? g_View.push(general_settings) : null;

// user?.type == 1 && user?.invoice == 1 ? g_View.push(invoice) : null;
// user?.type == 2 && user?.p_invoice == 1 ? g_View.push(invoice) : null;
// // accounting start
// // user?.type == 1 && g_View.push(accounting);
// // accounting end

// // to add invoice
// user?.type == 1 ? g_View.push(general_settings) : null;

// let s_a_View = [
//   {
//     id: "dashboard",
//     title: "Dashboard",
//     icon: <Home size={20} />,
//     navLink: "Tls_admin/dashboard",
//   },
//   {
//     id: "packages",
//     title: "Packages",
//     icon: <Mail size={20} />,
//     navLink: "Tls_admin/packages",
//   },
//   {
//     id: "storelist",
//     title: "Store List",
//     icon: <Mail size={20} />,
//     navLink: "Tls_admin/storelist",
//   },
//   {
//     id: "pipeline",
//     title: "Pipeline",
//     icon: <Mail size={20} />,
//     navLink: "Tls_admin/pipeline",
//   },
//   {
//     id: "pipelineLeads",
//     title: "Pipeline Leads",
//     icon: <Mail size={20} />,
//     navLink: "Tls_admin/pipelineLeads",
//   },
//   {
//     id: "General-Settings",
//     title: "General Settings",
//     icon: <FileText size={20} />,
//     children: [
//       {
//         id: "superadmin-websetting",
//         title: "Web Setting",
//         icon: <Circle size={12} />,
//         navLink: "Tls_admin/websetting",
//       },
//       {
//         id: "Custom-lead-status",
//         title: "Lead Status",
//         icon: <Circle size={12} />,
//         navLink: "Tls_admin/leadstatus",
//       },
//       {
//         id: "Custom-lead-source",
//         title: "Lead Source",
//         icon: <Circle size={12} />,
//         navLink: "Tls_admin/leadsource",
//       },
//       {
//         id: "color",
//         title: "Color",
//         icon: <Droplet size={20} />,
//         navLink: "Tls_admin/labelcolor",
//       },
//       {
//         id: "Custom-task-status",
//         title: "Task Status",
//         icon: <Circle size={12} />,
//         navLink: "Tls_admin/taskstatus",
//       },
//       {
//         id: "Payment-Method",
//         title: "Payment Method",
//         icon: <Circle size={12} />,
//         navLink: "/Tls_admin/paymentMethod",
//       },
//     ],
//   },
//   {
//     id: "invoiceApp",
//     title: "Invoice",
//     icon: <FileText />,
//     children: [
//       {
//         id: "invoiceList",
//         title: "List",
//         icon: <Circle />,
//         navLink: "/Tls_admin/invoice/list",
//       },
//       {
//         id: "invoiceAdd",
//         title: "Add",
//         icon: <Circle />,
//         navLink: "/Tls_admin/invoice/add",
//       },
//     ],
//   },
// ];

user?.type == 0 ? (View = adminRoutes) : (View = userRoutes);

export default View;
