export default function DatenschutzPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          Privacy Policy (Datenschutz)
        </h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              1. Privacy at a Glance
            </h2>
            <h3 className="text-base font-medium text-zinc-300 mb-2">
              General Information
            </h3>
            <p>
              The following information provides a simple overview of what
              happens to your personal data when you visit this website.
              Personal data is any data that can be used to personally
              identify you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              2. Data Controller
            </h2>
            <p>
              The party responsible for data processing on this website is:
            </p>
            <p>
              Nils Heck
              <br />
              [Address]
              <br />
              Email: nils.heck@code.berlin
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              3. Data Collection on This Website
            </h2>
            <h3 className="text-base font-medium text-zinc-300 mb-2">
              Server Log Files
            </h3>
            <p>
              The hosting provider automatically collects and stores
              information in server log files that your browser transmits
              automatically. These are:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referrer URL</li>
              <li>Hostname of the accessing device</li>
              <li>Time of the server request</li>
              <li>IP address</li>
            </ul>
            <p className="mt-2">
              This data is not merged with other data sources.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              4. Hosting
            </h2>
            <p>
              This website is hosted by Vercel Inc. For details on how your
              data is handled, please refer to Vercel&apos;s privacy policy:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="text-accent hover:text-accent-light transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              5. Analytics
            </h2>
            <p>
              This website does not use cookies or cookie-based tracking. A
              privacy-friendly analytics tool (e.g., Plausible Analytics or
              Umami) may be used, which does not store personal data and does
              not require a cookie banner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              6. Your Rights
            </h2>
            <p>
              You have the right to receive information about the origin,
              recipients, and purpose of your stored personal data free of
              charge at any time. You also have the right to request the
              correction or deletion of this data. If you have given consent
              to data processing, you can revoke this consent at any time for
              the future.
            </p>
            <p className="mt-2">
              For this and any other questions regarding data protection, you
              can contact me at any time: nils.heck@code.berlin
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              7. External Links
            </h2>
            <p>
              This website contains links to external websites (LinkedIn,
              GitHub, etc.). When you click on these links, you will be
              redirected to the servers of the respective providers. Their
              privacy policies apply there.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
