import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import request from "../../../server/https_request";
import isAuth from "../../../states";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState(location.pathname);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const { logout } = isAuth();
  useEffect(() => {
    setKey(location.pathname);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userAuth = async () => {
    const { data } = await request.get("/auth/me");
    setUsername(data.username);
  };
  userAuth();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <div className="fls">
            <h1>{username}</h1>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[key]}
          onClick={({ key }) => {
            setKey(key);
          }}
          items={[
            {
              key: "main",
              icon: (
                <i
                  className="fa-solid fa-house-chimney"
                  style={{ color: "#ffffff" }}
                ></i>
              ),
              label: <Link to="/main">Main</Link>,
            },
            {
              key: "dashboard",
              icon: (
                <i
                  className="fa-solid fa-list-check"
                  style={{ color: "#ffffff" }}
                ></i>
              ),
              label: <Link to="/dashboard">Skills</Link>,
            },
            {
              key: "education",
              icon: (
                <i
                  className="fa-solid fa-user-graduate"
                  style={{ color: "#fcfcfc" }}
                ></i>
              ),
              label: <Link to="admin/education">Education</Link>,
            },
            {
              key: "experiences",
              icon: (
                <i
                  className="fa-solid fa-briefcase"
                  style={{ color: "#ffffff" }}
                ></i>
              ),
              label: <Link to="admin/experiences">Experiences</Link>,
            },
            {
              key: "work",
              icon: (
                <i
                  className="fa-solid fa-diagram-project"
                  style={{ color: "#ffffff" }}
                ></i>
              ),
              label: <Link to="admin/work">Work</Link>,
            },
            {
              key: "logout",
              icon: (
                <i
                  className="fa-solid fa-arrow-right-from-bracket"
                  style={{ color: "#ffffff" }}
                ></i>
              ),
              label: (
                <Link to="" onClick={() => logout(navigate)}>
                  Logout
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
