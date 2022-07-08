import React from "react";
import Footer from "../Footer";
import Header from "../Header";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}
const Index: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Index;
