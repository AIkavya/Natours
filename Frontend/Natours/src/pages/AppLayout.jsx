import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import styled from "styled-components";
import Footer from "../ui/Footer/Footer";
import NavBar from "../ui/Navbar/NavBar";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Layout = styled.main`
  flex: 1;
  width: 100%;
  position: relative;
  top: 0;
  padding-top: ${({ $isUserRoute }) => ($isUserRoute ? "70px" : "0")};
`;

function AppLayout() {
  const { pathname } = useLocation();
  const isUserRoute = pathname?.startsWith("/user");

  return (
    <PageContainer>
      <ScrollRestoration />
      <NavBar />
      <Layout $isUserRoute={isUserRoute}>
        <Outlet />
      </Layout>
      <Footer />
    </PageContainer>
  );
}

export default AppLayout;
