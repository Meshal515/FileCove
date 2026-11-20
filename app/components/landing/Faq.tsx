import { Plus } from "lucide-react";
import { ICON, SectionHeader } from "~/components/ui";
import { useT } from "~/lib/i18n";

export function Faq() {
  const t = useT();
  const f = t.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 border-t border-line">
      <div className="container-page grid gap-10 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-title" label={f.label} title={f.title} />
        </div>
        <div data-reveal className="border-t border-line lg:col-span-8">
          {f.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[17px] leading-7 font-medium">
                {item.q}
                <Plus {...ICON} className="faq-icon size-5 shrink-0 text-muted transition-transform duration-200" />
              </summary>
              <p className="max-w-[640px] pb-6 text-body text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
