import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "@/services/authApi";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {

  const barsRef = useRef(null);
  const hmapRef = useRef(null);
  const navigate = useNavigate();
  const {login} = useAuth();

  useEffect(() => {
    // Mini bar chart
    const bdata = [72, 78, 80, 75, 85, 82, 88, 90, 86, 92, 94, 91, 97, 100];
    if (barsRef.current) {
      bdata.forEach((v, i) => {
        const b = document.createElement("div");
        b.style.cssText = `height:${v * 0.72}%;flex:1;border-radius:3px 3px 0 0;background:${
          i === bdata.length - 1 ? "#D97757" : "#F3C4AE"
        }`;
        barsRef.current.appendChild(b);
      });
    }
    // Mini heatmap
    const hw = [0,1,2,0,1,3,0,2,1,0,3,2,1,0,2,1,3,0,2,1,0,1,2,3,0,2,1,0,2,3,1,0,1,2,0,3,2,1,0,2];
    if (hmapRef.current) {
      for (let i = 0; i < 56; i++) {
        const c = document.createElement("div");
        const w = hw[i % hw.length];
        const bg = w === 1 ? "#F3C4AE" : w === 2 ? "#D97757" : w === 3 ? "#A3462D" : "#EAE4DA";
        c.style.cssText = `aspect-ratio:1;border-radius:1px;background:${bg}`;
        hmapRef.current.appendChild(c);
      }
    }
  }, []);


  const handleSuccess = async (credentialResponse) => {
    try{
      const data = await googleLogin(credentialResponse.credential);

      login(data.token,data.user);

      navigate("/dashboard");
    }catch(error){
      console.error("Login Error: ",error);
    }
  }

  const handleError = () => {
    console.log("Google Login Failed");
  }


  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-[6vw] text-center overflow-hidden"
    >
      {/* Glow orbs */}
      <div className="absolute top-[-120px] right-[-120px] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(217,119,87,0.13) 0%,transparent 68%)" }} />
      <div className="absolute bottom-[-60px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(217,119,87,0.09) 0%,transparent 68%)" }} />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white border border-[#E4DDD5] rounded-full text-[12px] font-medium text-[#7A736A] px-4 py-1.5 mb-8 animate-fadeUp">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1A9970] animate-pulse" />
        Spaced repetition · Built for DSA interviews
      </div>

      {/* Headline */}
      <h1 className="font-serif text-[clamp(3rem,6.5vw,5.6rem)] leading-[1.06] tracking-tight mb-6 animate-fadeUp [animation-delay:100ms]">
        Solve once.<br />
        <em className="text-[#D97757] not-italic font-serif italic">Remember forever.</em>
      </h1>

      {/* Sub */}
      <p className="text-[clamp(.95rem,1.6vw,1.1rem)] text-[#7A736A] max-w-[520px] mx-auto mb-10 font-light leading-[1.75] animate-fadeUp [animation-delay:200ms]">
        Most programmers forget 80% of problems within a week. AlgoRetention schedules intelligent reviews using SM-2 so your hard-earned patterns never fade before the interview.
      </p>

      {/* Google login */}
      <div className="flex items-center justify-center gap-3 flex-wrap animate-fadeUp [animation-delay:300ms]">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          text="signup_with"
          shape="rectangular"
          theme="outline"
          size="large"
        />

{/* <a
  href="#how"
  className="bg-white text-[#1A1714] border border-[#E4DDD5] rounded-xl px-6 py-3.5 text-[14px] hover:border-[#D97757] hover:bg-[#FDF1EB] transition-all"
>
  See how it works →
</a> */}
      </div>

      {/* Social proof */}
      <div className="mt-10 flex items-center gap-3 justify-center animate-fadeUp [animation-delay:450ms]">
        <div className="flex">
          {[
            { initials: "RK", bg: "#F3C4AE", color: "#C4623F" },
            { initials: "AS", bg: "#D1FAE5", color: "#065F46" },
            { initials: "MV", bg: "#DBEAFE", color: "#1E3A8A" },
            { initials: "PJ", bg: "#EDE9FE", color: "#4C1D95" },
          ].map((av, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-[2.5px] border-[#F8F4EF] flex items-center justify-center text-[10px] font-bold"
              style={{ background: av.bg, color: av.color, marginLeft: i === 0 ? 0 : "-9px" }}
            >
              {av.initials}
            </div>
          ))}
        </div>
        <p className="text-[12.5px] text-[#7A736A]">
          Trusted by <strong className="text-[#1A1714]">1,200+ developers</strong> preparing for top-tier placements
        </p>
      </div>

      {/* Dashboard preview window */}
      <div className="mt-14 w-full max-w-[840px] rounded-[20px] overflow-hidden border border-[#E4DDD5] shadow-[0_40px_80px_rgba(0,0,0,0.09),0_0_0_1px_rgba(255,255,255,0.5)_inset] animate-fadeUp [animation-delay:550ms]">
        {/* Window bar */}
        <div className="bg-[#F2EDE5] border-b border-[#EDE7DF] px-4 py-3 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <span className="ml-3 text-[11px] text-[#C5BFB8] bg-[#EAE4DA] rounded-md px-3 py-0.5">
            algoretention.app/dashboard
          </span>
        </div>

        {/* Stat cards */}
        <div className="bg-white p-5 grid grid-cols-4 gap-2.5">
          {[
            { label: "Problems Solved", val: "142", color: "" },
            { label: "Retention Score", val: "94%", color: "text-[#1A9970]" },
            { label: "Current Streak", val: "18🔥", color: "text-[#D97757]" },
            { label: "Due Today", val: "3", color: "" },
          ].map((s) => (
            <div key={s.label} className="bg-[#F8F4EF] rounded-xl p-3">
              <div className="text-[10px] text-[#7A736A] font-medium mb-1">{s.label}</div>
              <div className={`text-[1.35rem] font-bold ${s.color}`}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Chart + heatmap row */}
        <div className="bg-white px-5 pb-5 grid grid-cols-[1fr_200px] gap-2.5">
          <div className="bg-[#F8F4EF] rounded-xl p-3.5 h-[110px]">
            <div className="text-[10px] font-medium text-[#7A736A] mb-2">Retention trend 14 days</div>
            <div ref={barsRef} className="flex items-end gap-1 h-[65px]" />
          </div>
          <div className="bg-[#F8F4EF] rounded-xl p-3.5">
            <div className="text-[10px] font-medium text-[#7A736A] mb-2">Activity</div>
            <div
              ref={hmapRef}
              style={{ display: "grid", gridTemplateColumns: "repeat(20,1fr)", gap: "2px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;