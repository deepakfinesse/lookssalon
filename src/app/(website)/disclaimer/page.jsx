import Link from "next/link";
import React from "react";

function SectionHeading({ children }) {
  return (
    <div className="border-b border-primary/30 pb-3 mb-5">
      <h2 className="text-2xl font-semibold text-black">{children}</h2>
    </div>
  );
}

function Para({ children }) {
  return <p className="text-md text-grey leading-relaxed">{children}</p>;
}

const page = () => {
  return (
    <>
      <header className="bg-white text-grey pt-12 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">Disclaimer</h1>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-14 space-y-12">
        <section className="space-y-4">
         
          <Para>
            If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at <Link href="mailto:customercare@lookssalon.in">  <span className="font-medium text-black">customercare@lookssalon.in.</span> </Link>
          </Para>
        </section>

        <section className="space-y-4">
          <SectionHeading>Disclaimers for Looks Salon</SectionHeading>
          <Para>
            All the information on this website — <Link href="https://www.lookssalon.in" target="_blank" rel="noopener noreferrer"> <span className="font-medium text-black">www.lookssalon.in</span> </Link> — is published
            in good faith and for general information purpose only. Looks Salon does not make any
            warranties about the completeness, reliability and accuracy of this information. Any
            action you take upon the information you find on this website (Looks Salon) is strictly
            at your own risk. Looks Salon will not be liable for any losses and/or damages in
            connection with the use of our website.
          </Para>
        </section>

        <section className="space-y-4">
          
          <Para>
            From our website, you can visit other websites by following hyperlinks to such external
            sites. While we strive to provide only quality links to useful and ethical websites, we
            have no control over the content and nature of these sites. These links to other websites
            do not imply a recommendation for all the content found on these sites. Site owners and
            content may change without notice and may occur before we have the opportunity to remove
            a link which may have gone &apos;bad&apos;.
          </Para>
        </section>

        <section className="space-y-4">
          {/* <SectionHeading>Privacy Policies of Other Sites</SectionHeading> */}
          <Para>
            Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
          </Para>
        </section>

        <section className="space-y-4">
          <SectionHeading>Consent</SectionHeading>
          <Para>
            By using our website, you hereby consent to our disclaimer and agree to its terms.
          </Para>
        </section>

        {/* <section className="space-y-4">
          <SectionHeading>Contact Us</SectionHeading>
          <Para>
            If you require any more information or have any questions about our site&apos;s disclaimer,
            please feel free to contact us by email at:
          </Para>
          <div className="bg-[#1A1209] text-[#FAF6F0] rounded-xl p-6">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:customercare@lookssalon.in" className="text-sm text-primary hover:underline">
                customercare@lookssalon.in
              </a>
            </div>
          </div>
        </section> */}

      </main>
    </>
  );
};

export default page;
