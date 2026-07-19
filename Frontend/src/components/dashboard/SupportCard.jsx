import { Coffee, X, Copy, Check } from "lucide-react";
import { useState } from "react";
import upiQR from "@/assets/qr.jpg"; // adjust path to wherever you save it

const UPI_ID = "ranjitksingh.079@oksbi";
const NAME = "Ranjit Kumar Singh";

const SupportCard = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(NAME)}&cu=INR&tn=${encodeURIComponent("Support AlgoRetention")}`;

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div className="bg-white border border-[#E4DDD5] rounded-[20px] p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <Coffee size={14} color="#D97757" />
          <span className="text-[12.5px] font-semibold text-[#1A1714]">
            Support <span className="text-[#D97757]">AlgoRetention</span>
          </span>
        </div>
        <p className="text-[11.5px] text-[#A89E95] leading-relaxed mb-3">
          Free, no ads, built by a student. A small tip keeps it running.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="w-full text-[12px] font-semibold text-[#D97757] border border-[#F3C4AE] hover:bg-[#FDF1EB] rounded-[10px] py-2 transition-colors"
        >
          Support via UPI
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-[20px] p-6 w-full max-w-[320px] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#A89E95] hover:text-[#1A1714]"
            >
              <X size={18} />
            </button>

            <div className="w-10 h-10 rounded-full bg-[#FDF1EB] flex items-center justify-center mx-auto mb-3">
              <Coffee size={18} color="#D97757" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1A1714] mb-1">
              Support <span className="text-[#D97757]">AlgoRetention</span>
            </h3>
            <p className="text-[12.5px] text-[#7A736A] mb-4">
              Scan with any UPI app, or tap below on mobile
            </p>

            <img
              src={upiQR}
              alt="UPI QR code"
              className="mx-auto mb-4 rounded-[12px] border border-[#E4DDD5] w-[200px] h-[200px] object-contain"
            />

            <a
              href={upiLink}
              className="block w-full bg-[#D97757] hover:bg-[#C4623F] text-white text-[13px] font-semibold py-2.5 rounded-[10px] transition-colors mb-2"
            >
              Pay via UPI app
            </a>

            <button
              onClick={copyUpi}
              className="w-full flex items-center justify-center gap-1.5 text-[11.5px] text-[#A89E95] hover:text-[#D97757] py-1.5 transition-colors"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : UPI_ID}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportCard;