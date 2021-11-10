import selfpoweredLogo from "../../images/selfpowered.png";
import cdu_logo from "../../images/cdu-logo.png";

const About = () => {
  return (
    <div
      className={
        "flex flex-col justify-center items-center self-center pb-16 mt-8"
      }
    >
      <img
        alt={"selfpowered logo"}
        src={selfpoweredLogo}
        className={"w-96 px-8 mx-auto mb-16"}
      />

      <p
        className={
          "text-gray-700 md:text-lg font-medium text-center max-w-md lg:max-w-xl mx-auto"
        }
      >
        SelfPowered is a time management application focused on freelancers,
        contractors and the self-employed. It allows you to manage your clients,
        jobs and tasks in any network environment. It was create by three
        university students at Charles Darwin University.
        <br />
        <br />
        Designed & Developed by <br />{" "}
        <span className="font-bold">
          Robert Moore, Bishal Chaulagain & Shahariar Shanto
        </span>
      </p>
      <img
        alt={"Charles Darwin University Logo"}
        src={cdu_logo}
        className={"w-96 px-8 mx-auto mt-16"}
      />
    </div>
  );
};

export default About;
