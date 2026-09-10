import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

function TermsAndConditions() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`${darkMode ? "bg-black/90 text-white" : "bg-white text-gray-800"}`}>
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <div className="w-30 h-0.5 mx-auto bg-orange-500 mt-2"></div>
        </div>

        {/* Introduction */}
        <div className="space-y-4">
          <p>
            Welcome to <span className="font-semibold">www.buybooksindia.com</span>, a
            venture of SWETS Information Services Pvt. Ltd.
          </p>
          <p>
            We’re honored you chose to visit our website and we commit to display
            excellent standards of services.
          </p>
          <p>
            We render our services to your acceptance of the terms and conditions
            mentioned below.
          </p>
          <p>
            We request you to read them carefully. If you visit and/or use our
            website offerings, we assume you have accepted the conditions
            hereunder.
          </p>
        </div>

        {/* Site Content */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Site Content</h2>
          <p>
            The contents of this site are electronically generated. All
            communication would be conducted in electronic form either by e-mails
            or by posting notices and messages on the website. By agreeing, you
            accept all communications related services offered by
            <span className="font-semibold"> www.buybooksindia.com</span>.
          </p>
          <p>
            You may visit and make personal use of our site and services. However,
            downloading or modifying any portion of the website including images
            is strictly prohibited without express written consent of{" "}
            <span className="font-semibold">www.buybooksindia.com</span>.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">User Responsibilities</h2>
          <p>
            You agree to provide a correct email address and create an account
            with password to partake in services. Each user is responsible for
            maintaining their account security and is liable for all activities
            under their account.
          </p>
        </section>

        {/* Disputes */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Disputes</h2>
          <p>
            Any dispute or claim relating to your visit or purchases through{" "}
            <span className="font-semibold">www.buybooksindia.com</span> will be
            subject to the jurisdiction of the Courts of New Delhi only.
          </p>
          <p>
            Arbitration shall be conducted under prevailing laws. The award shall
            be binding and may be entered as a judgment in any competent court.
          </p>
        </section>

        {/* Applicable Law */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Applicable Law</h2>
          <p>
            By visiting <span className="font-semibold">www.buybooksindia.com</span>,
            you agree that the laws of India govern these Terms and Conditions of
            Use and any disputes that may arise.
          </p>
        </section>

        {/* Site Policies */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Site Policies</h2>
          <p>
            We reserve the right to make changes to our site policies and these
            Terms and Conditions at any time. Invalid conditions shall be deemed
            severable and not affect the validity of remaining conditions.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            Disclaimer of Warranties and Limitations of Liability
          </h2>
          <p>
            This site is provided by{" "}
            <span className="font-semibold">www.buybooksindia.com</span> on an{" "}
            <span className="italic">"AS IS"</span> and{" "}
            <span className="italic">"AS AVAILABLE"</span> basis. We make no
            representations or warranties of any kind, express or implied, as to
            the operation of this site or the information, content, or products.
          </p>
          <p>
            To the full extent permissible by law, we disclaim all warranties,
            express or implied, including but not limited to implied warranties of
            merchantability and fitness for a particular purpose.
          </p>
          <p>
            We are not liable for damages of any kind arising from the use of this
            site including direct, indirect, incidental, punitive, and
            consequential damages.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsAndConditions;
