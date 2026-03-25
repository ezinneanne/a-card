import { useState, useMemo, useRef, type ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  User, 
  Building2, 
  Download, 
  Printer,
  Share2,
  UserPlus,
  HardHat,
  Compass,
  PencilRuler,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


import logo from "../src/assets/logo-immg.png";
import profileImg from "../src/assets/work-img.jpg";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardDetails {
  companyName: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  address1: string;
  bio: string;
  profileImage: string;
  professions: { title: string; icon: ReactNode }[];
}

export default function App() {
  const [details, setDetails] = useState<CardDetails>({
    companyName: "STAR CODE PROJECTS LIMITED",
    fullName: "ENGR UCHENNA OBIAJUNWA",
    phone: "07017160170",
    email: "starcode.com@gmail.com",
    address: "Agent Spot (Special Jumbo Plaza), 249 Abuloma Road, Off Jetty Ph Rivers State",
    address1: "213 Abak Road, Okwuson Tools Plaza, Uyo, Akwa Ibom State",
    bio: "We, as a company, bring a wealth of engineering expertise to the table. With years of experience in construction, surveying, and architectural design, we have a proven track record of successfully managing a wide range of projects across siverse industries, regardless of their size or complexity. In addition to our engineering background, we take pride in owning an industrial cleaning company that specializes in comprehensive services such as fumigation and post-construction cleaning for both residential and commercial properties. We are excited to offer our skills and experience to contribute to the success of your projects.",
    profileImage: profileImg,
    professions: [
      { title: "Architects", icon: <PencilRuler className="w-5 h-5" /> },
      { title: "Engineers", icon: <HardHat className="w-5 h-5" /> },
      { title: "Surveyors", icon: <Compass className="w-5 h-5" /> }
    ]
  });

  const [isFront, setIsFront] = useState(true);
  const [isProfileView, setIsProfileView] = useState(false);

  // Check if we should show the profile view based on URL
  useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "profile") {
      setIsProfileView(true);
    }
  }, []);

  const vCardString = useMemo(() => {
    return [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${details.fullName}`,
      `ORG:${details.companyName}`,
      `TEL;TYPE=WORK,VOICE:${details.phone}`,
      `EMAIL:${details.email}`,
      `ADR;TYPE=WORK:;;${details.address};;;;`,
      `ADR;TYPE=WORK:;;${details.address1};;;;`,
      `NOTE:${details.bio}`,
      "END:VCARD"
    ].join("\n");
  }, [details]);

  const handleDownloadVCard = () => {
    const blob = new Blob([vCardString], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${details.fullName.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isProfileView) {
    return <ProfileView details={details} onSave={handleDownloadVCard} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Card Preview */}
        <div className="flex flex-col items-center space-y-12 sticky top-12">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-light tracking-widest uppercase">Digital Card</h1>
            <p className="text-white/40 text-sm uppercase tracking-[0.2em]">Matte Black Edition</p>
          </div>

          <div className="relative group perspective-1000 w-full max-w-md aspect-[1.75/1]">
            <AnimatePresence mode="wait">
              <motion.div
                key={isFront ? "front" : "back"}
                initial={{ rotateY: isFront ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: isFront ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full"
              >
                {isFront ? (
                  <CardFront companyName={details.companyName} />
                ) : (
                  <CardBack details={details} vCardString={vCardString} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute -bottom-16 left-0 right-0 flex justify-center space-x-4">
              <button 
                onClick={() => setIsFront(true)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all border",
                  isFront ? "bg-white text-black border-white" : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                )}
              >
                Front
              </button>
              <button 
                onClick={() => setIsFront(false)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all border",
                  !isFront ? "bg-white text-black border-white" : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                )}
              >
                Back
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <button 
              onClick={handleDownloadVCard}
              className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl transition-all group"
            >
              <Download className="w-4 h-4 text-white/60 group-hover:text-white" />
              <span className="text-sm font-medium">Save vCard</span>
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl transition-all group"
            >
              <Printer className="w-4 h-4 text-white/60 group-hover:text-white" />
              <span className="text-sm font-medium">Print Card</span>
            </button>
          </div>
        </div>

        {/* Right Column: Editor */}
        <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-10 space-y-10 shadow-2xl">
          <div className="space-y-2 border-b border-white/5 pb-6">
            <h2 className="text-xl font-medium tracking-tight">Card Editor</h2>
            <p className="text-white/40 text-sm">Update your client's details below to live-preview the card.</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <InputGroup 
              label="Company Name" 
              icon={<Building2 className="w-4 h-4" />}
              value={details.companyName}
              onChange={(v) => setDetails(prev => ({ ...prev, companyName: v }))}
            />
            <InputGroup 
              label="Full Name" 
              icon={<User className="w-4 h-4" />}
              value={details.fullName}
              onChange={(v) => setDetails(prev => ({ ...prev, fullName: v }))}
            />
            <InputGroup 
              label="Phone Number" 
              icon={<Phone className="w-4 h-4" />}
              value={details.phone}
              onChange={(v) => setDetails(prev => ({ ...prev, phone: v }))}
            />
            <InputGroup 
              label="Email Address" 
              icon={<Mail className="w-4 h-4" />}
              value={details.email}
              onChange={(v) => setDetails(prev => ({ ...prev, email: v }))}
            />
            <InputGroup 
              label="Office Address" 
              icon={<MapPin className="w-4 h-4" />}
              value={details.address}
              onChange={(v) => setDetails(prev => ({ ...prev, address: v }))}
            />
            <InputGroup 
              label="Office Address2" 
              icon={<MapPin className="w-4 h-4" />}
              value={details.address1}
              onChange={(v) => setDetails(prev => ({ ...prev, address1: v }))}
            />
          </div>

          <div className="pt-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex items-start space-x-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <Share2 className="w-5 h-5 text-white/80" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Ready to share?</h3>
                <p className="text-xs text-white/40 leading-relaxed">
                  The QR code on the back of the card is a dynamic vCard. When scanned, it will prompt the user to save these contact details directly to their phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; color: black !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
          .max-w-6xl { max-width: none !important; margin: 0 !important; padding: 0 !important; }
          .lg\\:grid-cols-2 { display: block !important; }
          .sticky { position: static !important; }
          .bg-\\[\\#0a0a0a\\] { background: white !important; }
          .bg-\\[\\#121212\\] { background: black !important; -webkit-print-color-adjust: exact; }
          .text-white { color: white !important; -webkit-print-color-adjust: exact; }
          button, .bg-\\[\\#121212\\].border, .text-white\\/40, .border-white\\/5, .shadow-2xl, .InputGroup, .CardEditor, .DigitalCard-header { display: none !important; }
          
          .CardPreview-container { 
            display: flex !important; 
            flex-direction: column !important; 
            gap: 40px !important;
            align-items: center !important;
            padding: 40px !important;
          }
          
          .print-card {
            width: 85.6mm !important;
            height: 53.98mm !important;
            background: black !important;
            color: white !important;
            border-radius: 4mm !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            margin-bottom: 20px !important;
          }
        }
      `}} />
    </div>
  );
}

function InputGroup({ label, icon, value, onChange }: { label: string, icon: ReactNode, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white/60 transition-colors px-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors">
          {icon}
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
        />
      </div>
    </div>
  );
}

function CardFront({ companyName }: { companyName: string }) {
  return (
    <div className="print-card w-full h-full bg-[#121212] rounded-[2rem] border border-white/10 flex flex-col items-center justify-center p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05),5px_5px_15px_rgba(0,0,0,0.3)] relative overflow-hidden before:absolute before:inset-0 before:rounded-[2rem] before:border-r-4 before:border-b-4 before:border-white/5 before:pointer-events-none">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
      </div>
      
      <div className="relative flex flex-col items-center space-y-6 w-full">
        {/* Logo Image */}
        <div className="relative w-48 h-28 flex items-center justify-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-full h-full object-contain filter brightness-200"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="text-center space-y-3">
          <div className="h-[1px] w-12 bg-white/20 mx-auto" />
          <h2 className="text-sm font-bold tracking-[0.4em] uppercase leading-relaxed max-w-[320px] text-white/90">
            {companyName}
          </h2>
        </div>
      </div>
    </div>
  );
}

function CardBack({ details, vCardString }: { details: CardDetails, vCardString: string }) {
  const profileUrl = `${window.location.origin}${window.location.pathname}?view=profile`;
  
  return (
    <div className="print-card w-full h-full bg-[#121212] rounded-[2rem] border border-white/10 flex items-center p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05),5px_5px_15px_rgba(0,0,0,0.3)] relative overflow-hidden before:absolute before:inset-0 before:rounded-[2rem] before:border-r-4 before:border-b-4 before:border-white/5 before:pointer-events-none">
      <div className="grid grid-cols-[1fr_2.2fr] gap-4 items-center w-full">
        
        {/* QR Code Section */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-white p-2.5 rounded-xl shadow-lg">
            <QRCodeSVG 
              value={profileUrl} 
              size={100}
              level="H"
              includeMargin={false}
            />
          </div>
          <span className="text-[7px] uppercase tracking-[0.3em] text-white/30">Scan for Bio</span>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold tracking-widest uppercase truncate">{details.fullName}</h3>
            <p className="text-[9px] text-white/40 uppercase tracking-[0.15em]">{details.companyName}</p>
          </div>

          <div className="space-y-2">
            <DetailItem icon={<Phone className="w-3 h-3" />} text={details.phone} />
            <DetailItem icon={<Mail className="w-3 h-3" />} text={details.email} />
            <DetailItem icon={<MapPin className="w-3 h-3" />} text={details.address} />
            <DetailItem icon={<MapPin className="w-3 h-3" />} text={details.address1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileView({ details, onSave }: { details: CardDetails, onSave: () => void }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8 mt-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl">
              <img 
                src={details.profileImage} 
                alt={details.fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white text-black p-1.5 rounded-full shadow-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">{details.fullName}</h1>
            <div className="flex flex-col items-center space-y-1">
              <p className="text-white/50 uppercase tracking-widest text-xs font-medium">{details.companyName}</p>
              <div className="w-12 h-[1px] bg-white/20 mt-2" />
            </div>
          </div>
        </div>

        {/* Professions Section */}
        <div className="grid grid-cols-3 gap-3">
          {details.professions.map((prof, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center space-y-2 text-center">
              <div className="text-white/40">{prof.icon}</div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/60">{prof.title}</span>
            </div>
          ))}
        </div>

        {/* Bio Section */}
        <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-white/30 font-bold">Professional Bio</h2>
          <p className="text-sm leading-relaxed text-white/80 italic font-serif">
            "{details.bio}"
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={onSave}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-white/90 transition-all active:scale-[0.98] shadow-xl"
        >
          <UserPlus className="w-5 h-5" />
          <span>Save Contact to Phone</span>
        </button>

        {/* Contact Details */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xs uppercase tracking-widest text-white/30 font-bold px-2">Contact Information</h2>
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
            <DetailItem icon={<Phone className="w-4 h-4" />} text={details.phone} />
            <DetailItem icon={<Mail className="w-4 h-4" />} text={details.email} />
            <DetailItem icon={<MapPin className="w-4 h-4" />} text={details.address} />
            <DetailItem icon={<MapPin className="w-4 h-4" />} text={details.address1} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 pb-12">
          <div className="w-16 h-8 mx-auto mb-4 opacity-30">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-full h-full object-contain filter brightness-200"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Powered by Star Code Projects</p>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, text }: { icon: ReactNode, text: string }) {
  return (
    <div className="flex items-start space-x-2 group">
      <div className="text-white/30 group-hover:text-white transition-colors mt-0.5 flex-shrink-0">
        {icon}
      </div>
      <span className="text-[9px] font-medium text-white/70 group-hover:text-white transition-colors leading-tight">
        {text}
      </span>
    </div>
  );
}
