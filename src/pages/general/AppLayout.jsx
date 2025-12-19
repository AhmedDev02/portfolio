import { Outlet } from "react-router-dom";
import SideBar from "../../ui/SideBar";
import ContentContainer from "../../ui/ContentContainer";
import Counter from "../contact/Counter";
import PopUp from "../contact/PopUp";
import FadeIn from "../../animation-ui/FadeIn";
import Jump from "../../animation-ui/Jump";
import SpinExpand from "../../animation-ui/SpinExpand";
import Wiggle from "../../animation-ui/Wiggle";
import DropDownComponent from "../../animation-ui/DropDownComponent";

function AppLayout() {
  return (
    <div className="layout-container  flex flex-col md:flex-row min-h-screen">
      <Jump classStyles="z-37">
        <Counter />
      </Jump>
      <SideBar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </div>
  );
}

export default AppLayout;
