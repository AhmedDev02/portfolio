import { Outlet } from "react-router-dom";
import ContentContainer from "../../ui/ContentContainer";
import Counter from "../contact/Counter";
import Jump from "../../animation-ui/Jump";
import SideBarUpdated from "../../ui/SideBarUpdated";

function AppLayout() {
  return (
    <div className="layout-container relative flex flex-col md:flex-row min-h-screen">
      <Jump classStyles="z-37">
        <Counter />
      </Jump>
      <SideBarUpdated />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </div>
  );
}

export default AppLayout;
