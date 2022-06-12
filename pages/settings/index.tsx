import React from "react";
import Header from "../../components/Header/index";
import SettingsForm from "../../components/SettingsForm/index";
import Footer from "../../components/Footer/index";

const Settings = () => {
  //  document.body.style = 'background: black;';
  return (
    <div>
      <Header />
      <SettingsForm />
      <Footer />
    </div>
  );
};
export default Settings;
