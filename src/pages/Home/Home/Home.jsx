import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import HowItWorks from "../HowItWorks/HowItWorks";
import LatestIssue from "../LatestIssue/LatestIssue";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Banner/>
            <LatestIssue/>
            <FeaturesSection/>
            <HowItWorks/>
            <WhyChooseUs/>
            <CallToAction/>
        </div>
    );
};

export default Home;