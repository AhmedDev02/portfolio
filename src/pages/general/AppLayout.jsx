import { Outlet } from "react-router-dom";
import ContentContainer from "../../ui/ContentContainer";
import Counter from "../contact/Counter";
import Jump from "../../animation-ui/Jump";
import SideBarUpdated from "../../ui/SideBarUpdated";
import { useEffect, useRef, useState } from "react";

const FUNCTION_URL = import.meta.env.VITE_VISIT_FUNCTION_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function AppLayout() {
  const tracked = useRef(false);
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    fetch(FUNCTION_URL, {
      method: "GET",
      keepalive: true,
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.totalVisitors === "number") {
          setVisitors(data.totalVisitors);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="layout-container relative flex flex-col md:flex-row min-h-screen">
      <Jump classStyles="z-37">
        <Counter visitors={visitors} />
      </Jump>

      <SideBarUpdated />

      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </div>
  );
}

export default AppLayout;
