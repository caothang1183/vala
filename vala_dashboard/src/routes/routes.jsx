import ListProject from "../pages/kagency/projects/ListProject";
import AddProject from "../pages/kagency/projects/AddProject";
import ListTopic from "../pages/kagency/topics/ListTopic";
import ListCategories from "../pages/kagency/categories";
import ListBlog from "../pages/kagency/blogs/ListBlog";
import AddBlog from "../pages/kagency/blogs/AddBlog";
import EditBlog from "../pages/kagency/blogs/EditBlog";
import EditProject from "../pages/kagency/projects/EditProject";
import AddTopic from "../pages/kagency/topics/AddTopic";
import EditTopic from "../pages/kagency/topics/EditTopic";
import AddBranding from "./../pages/kagency/brandings/AddBranding";
import EditBranding from "./../pages/kagency/brandings/EditBranding";
import ListBranding from "./../pages/kagency/brandings/ListBranding";
import ListUser from "../pages/kagency/user/listUser";
import AddUser from "../pages/kagency/user/AddUser";
import UserProfile from "../pages/kagency/user/UserProfile";

const DashboardRoute = [
  { path: "/add-project", exact: true, component: AddProject },
  { path: "/list-project", exact: true, component: ListProject },
  { path: "/edit-project/:id", exact: true, component: EditProject },
  { path: "/add-topic", exact: true, component: AddTopic },
  { path: "/list-topic", exact: true, component: ListTopic },
  { path: "/edit-topic/:id", exact: true, component: EditTopic },
  { path: "/add-branding", exact: true, component: AddBranding },
  { path: "/list-branding", exact: true, component: ListBranding },
  { path: "/edit-branding/:id", exact: true, component: EditBranding },
  { path: "/list-categories", exact: true, component: ListCategories },
  { path: "/list-blogs", exact: true, component: ListBlog },
  { path: "/add-blog", exact: true, component: AddBlog },
  { path: "/edit-blog/:id", exact: true, component: EditBlog },
  { path: "/list-user", exact: true, component: ListUser },
  { path: "/add-user", exact: true, component: AddUser },
  { path: "/user-profile", exact: true, component: UserProfile },
];

export default DashboardRoute;
