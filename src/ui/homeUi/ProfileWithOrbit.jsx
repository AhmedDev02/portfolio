// ProfileWithOrbit.jsx
import Profile3DImage from "./Profile3DImage";
import OrbitAnimation from "./OrbitAnimation";
import OrbitLogo from "./OrbitLogo";

import tsLogo from "../../assets/typescript.png";
import myPhoto from "../../../public/Ahmed_Tharwat_No_Bg.png";

export default function ProfileWithOrbit() {
  return (
    <div className="relative flex justify-center items-center mt-20">
      {/* Your profile image */}
      <Profile3DImage src={myPhoto} />

      {/* Orbiting icons */}
      <OrbitAnimation radius={200} duration={10}>
        {/* <OrbitLogo src={reactLogo} size={45}></OrbitLogo> */}
        <OrbitLogo src={tsLogo} size={45}></OrbitLogo>
      </OrbitAnimation>
    </div>
  );
}
