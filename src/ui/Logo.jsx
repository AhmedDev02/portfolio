import DropDownComponent from "../animation-ui/DropDownComponent";
import HeartBeat from "../animation-ui/HeartBeat";


function Logo({ dark, isMobile }) {
  return (
    <>
      {isMobile ? (
        <DropDownComponent>
          <div className="flex flex-col items-center justify-center logo-container">
            <img
              src={
                dark
                  ? "/darkmodelogo.png"
                  : "/lightmodelogo.png"
              }
              alt="logo"
              className="w-3/12 h-auto md:p-3 pb-0 md:w-1/2"
            />
          </div>
        </DropDownComponent>
      ) : (
        <DropDownComponent>
          <HeartBeat>
            <div className="flex flex-col items-center justify-center logo-container">
              <img
                src={
                  dark
                    ? "../../public/darkmodelogo.png"
                    : "../../public/lightmodelogo.png"
                }
                alt="logo"
                className="w-3/12 h-auto md:p-3 pb-0 md:w-1/2"
              />
            </div>
          </HeartBeat>
        </DropDownComponent>
      )}
    </>
  );
}

export default Logo;
