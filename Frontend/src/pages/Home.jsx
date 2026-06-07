// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";

// import { googleLogin } from "../services/authApi";
// import { useAuth } from "../context/AuthContext";

// const Home = () => {
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleSuccess = async (credentialResponse) => {
//         try {
//             const data = await googleLogin(
//                 credentialResponse.credential
//             );

//             login(
//                 data.token,
//                 data.user
//             );

//             navigate("/dashboard");
//         } catch (error) {
//             console.error("Login Error:", error);
//         }
//     };

//     const handleError = () => {
//         console.log("Google Login Failed");
//     };

//     return (
//         <div
//             style={{
//                 minHeight: "100vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >
//             <GoogleLogin
//                 onSuccess={handleSuccess}
//                 onError={handleError}
//             />
//         </div>
//     );
// };

// export default Home;


import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Comparison from "@/components/landing/Comparison";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Home = () => {
  return (
    <div className="bg-[#F8F4EF] min-h-screen overflow-x-hidden">
      <Navbar />

      <Hero />

      <TrustStrip />

      <HowItWorks />

      <Features />

      <Comparison />

      <Pricing />

      <FAQ />

      {/* <CTA /> */}

      <Footer />
    </div>
  );
};

export default Home;