export default function ImpressumPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          Legal Notice (Impressum)
        </h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Information pursuant to § 5 TMG
            </h2>
            <p>
              Nils Heck
              <br />
              [Street Address]
              <br />
              [Postal Code, City]
              <br />
              Germany
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
            <p>
              Email: nils.heck@code.berlin
              <br />
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/nilsheck"
                className="text-accent hover:text-accent-light transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/nilsheck
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Responsible for content pursuant to § 55 Abs. 2 RStV
            </h2>
            <p>
              Nils Heck
              <br />
              [Same address as above]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Disclaimer
            </h2>
            <h3 className="text-base font-medium text-zinc-300 mb-2">
              Liability for Content
            </h3>
            <p>
              The contents of this website have been created with the utmost
              care. However, no guarantee can be given for the accuracy,
              completeness, and timeliness of the content. As a service provider,
              I am responsible for my own content on these pages in accordance
              with § 7 (1) TMG under general law.
            </p>

            <h3 className="text-base font-medium text-zinc-300 mb-2 mt-4">
              Liability for Links
            </h3>
            <p>
              This website contains links to external third-party websites over
              whose content I have no influence. Therefore, I cannot accept any
              liability for this external content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Copyright
            </h2>
            <p>
              The content and works on these pages created by the site operator
              are subject to German copyright law. Duplication, processing,
              distribution, and any form of commercialization beyond the scope
              of copyright law require the written consent of the respective
              author or creator.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
