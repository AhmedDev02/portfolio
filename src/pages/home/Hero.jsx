import FadeIn from "../../animation-ui/FadeIn";
import Card from "../../ui/homeUi/Card";
import ImageSlider from "../../ui/homeUi/ImageSlider";

export default function Hero() {
  return (
    <div className="flex h-96 justify-center items-center md:h-screen relative ">
      <FadeIn>
        <ImageSlider />
        <Card />
      </FadeIn>
    </div>
  );
}
