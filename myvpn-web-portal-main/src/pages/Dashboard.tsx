
import Dashboard from "@/components/Dashboard";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | MY_VPN</title>
      </Helmet>
      <Dashboard />
    </>
  );
};

export default Index;
