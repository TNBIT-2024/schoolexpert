import { X, Shield, Mail, Phone, Calendar, Lock } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh] z-10">
        
        {/* Banner with Lock Icon */}
        <div className="h-20 bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 flex-shrink-0 flex items-center px-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Privacy Policy</h2>
              <p className="text-[10px] text-amber-100 font-bold uppercase tracking-wider mt-0.5">Poornaphala Media and Infotech Services LLP</p>
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/10 hover:bg-white/25 text-white p-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 sm:px-8 sm:py-8 flex-1 overflow-y-auto space-y-6 text-slate-700 dark:text-zinc-300 text-sm leading-relaxed text-justify font-medium">
          
          {/* Last updated */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-800 dark:text-amber-400 self-start text-xs font-bold w-fit">
            <Calendar className="w-4 h-4" />
            <span>Last updated: 18/04/2026</span>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <p>
              This privacy policy sets out how <strong>Poornaphala Media and Infotech Services LLP</strong> uses and protects any information that you provide when you use this website.
            </p>
            <p>
              Poornaphala Media and Infotech Services LLP is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
            </p>
            <p>
              Poornaphala Media and Infotech Services LLP may change this policy from time to time by updating this page. You should check this page periodically to ensure that you are happy with any changes. This policy is revised and effective from <strong>18/06/2026</strong>.
            </p>
          </div>

          <hr className="border-slate-200/50 dark:border-zinc-800" />

          {/* What We Collect */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              What We Collect
            </h3>
            <p>We may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-zinc-400 font-medium text-left">
              <li>Name and job title</li>
              <li>Contact information including email address and phone number</li>
              <li>Demographic information such as city, pincode, preferences, and interests</li>
              <li>Other information relevant to service enquiries, customer surveys, and offers</li>
            </ul>
          </div>

          <hr className="border-slate-200/50 dark:border-zinc-800" />

          {/* What We Do with the Information */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              What We Do With the Information We Gather
            </h3>
            <p>We require this information to understand your needs and provide the best possible service, particularly for the following reasons:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-zinc-400 font-medium text-left">
              <li>Internal record keeping</li>
              <li>Improving our products and services</li>
              <li>Periodically sending promotional emails about new products, special offers, or other information that may be of interest to you using the email address you have provided</li>
              <li>Contacting you for feedback and market research purposes by email, phone, or mail</li>
              <li>Customizing the website according to your interests</li>
            </ul>
          </div>

          <hr className="border-slate-200/50 dark:border-zinc-800" />

          {/* Security */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              Security
            </h3>
            <p>
              We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have implemented suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
            </p>
          </div>

          <hr className="border-slate-200/50 dark:border-zinc-800" />

          {/* How We Use Cookies */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              How We Use Cookies
            </h3>
            <p>
              A cookie is a small file placed on your computer's hard drive with your consent. Cookies help analyze web traffic and allow web applications to respond to you individually by tailoring operations to your preferences.
            </p>
            <p>
              We use traffic log cookies to identify which pages are being used. This information helps us analyze webpage traffic and improve our website to better meet customer needs. The information is used only for statistical analysis and is then removed from the system.
            </p>
            <p>
              Cookies help us provide a better website experience and do not give us access to your computer or any information other than the data you choose to share. You may choose to accept or decline cookies through your browser settings, although declining cookies may affect some website functionality.
            </p>
          </div>

          <hr className="border-slate-200/50 dark:border-zinc-800" />

          {/* Links to Other Websites */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              Links to Other Websites
            </h3>
            <p>
              Our website may contain links to other websites of interest. Once you leave our website, please note that we do not have control over those websites. Therefore, we are not responsible for the protection and privacy of any information you provide while visiting such sites. Those websites are not governed by this privacy policy, and you should review their respective privacy statements.
            </p>
          </div>

          <hr className="border-slate-200/50 dark:border-zinc-800" />

          {/* Controlling Your Personal Information */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              Controlling Your Personal Information
            </h3>
            <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-zinc-400 font-medium text-left">
              <li>
                Whenever you are asked to fill out a form on the website, look for an option indicating that you do not want the information to be used for promotional purposes. If such an option is unavailable, you may choose not to submit the form. However, by submitting the enquiry form, you consent to receiving promotional emails and materials from time to time.
              </li>
              <li>
                If you have previously agreed to us using your personal information for promotional purposes, you may withdraw your consent at any time by writing to or emailing us at <a href="mailto:info@schoolexpert.in" className="text-amber-600 hover:text-amber-700 underline font-bold">info@schoolexpert.in</a>.
              </li>
              <li>
                Poornaphala Media and Infotech Services LLP will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so. We may send you promotional information about third parties that we believe may be of interest to you.
              </li>
            </ul>
          </div>

          <hr className="border-slate-200/50 dark:border-zinc-800" />

          {/* Contacting Us */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              Contacting Us
            </h3>
            <p>If you have any questions regarding this Privacy Policy, please contact us using the following information:</p>
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/60 dark:border-zinc-800 space-y-3">
              <div className="font-extrabold text-slate-800 dark:text-zinc-200">
                Poornaphala Media and Infotech Services LLP
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                <Phone className="w-4 h-4 text-amber-650 flex-shrink-0" />
                <span>+91 9515112405</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-amber-650 flex-shrink-0" />
                <a href="mailto:info@schoolexpert.in" className="hover:text-amber-600 underline transition-colors">
                  info@schoolexpert.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 sm:px-8 bg-slate-50 dark:bg-zinc-800/30 border-t border-slate-100 dark:border-zinc-800 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-5 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
