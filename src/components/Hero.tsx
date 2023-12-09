import background from "./../assets/globalagriculture.jpg";
import "./../App.css";

const Hero = () => {
  const scrollHandler = () => {
    const nextSection = document.getElementById("select");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage: `linear-gradient( rgba(8, 8, 37, 0.75), rgba(0, 15, 80, 0.675)),url(${background})`,
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>Agrivision</h2>
      <span style={{ color: "white" }}>
        We help you detect the disease in your plant
      </span>

      <button type="button" onClick={scrollHandler}>
        Try Now
      </button>
    </div>
  );
};

export default Hero;
