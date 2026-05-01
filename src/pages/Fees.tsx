import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { feeRecords } from "@/data/schoolData";
import { Wallet, Info, CheckCircle2 } from "lucide-react";
import heroFees from "@/assets/feestructure.png";

const paymentModes = [
  "Cash payment at school office (Mon–Sat, 9 AM – 2 PM)",
  "Online transfer via NEFT/RTGS to school bank account",
  "Demand Draft in favour of 'Vidyalaya School'",
  "UPI payment at the school counter",
];

const Fees = () => (
  <>
    <PageHero
      title="Fee Structure"
      sanskrit="॥ शुल्क विवरण ॥"
      subtitle="Transparent, class-wise fee details for the academic year 2025–26."
      image={heroFees}
    />

    <section className="container-narrow py-16">
      <SectionHeader
        eyebrow="॥ शुल्काः ॥"
        title="Class-wise Fee Details"
        subtitle="All fees are for the academic year 2025–26. Contact the office for scholarship information."
      />

      {/* Fee table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        className="bg-card rounded-2xl border border-gold/20 overflow-x-auto shadow-soft"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-saffron text-white">
              <th className="text-left px-5 py-4 font-semibold">Class / Grade</th>
              <th className="text-left px-5 py-4 font-semibold">Tuition Fee</th>
              <th className="text-left px-5 py-4 font-semibold">Admission Fee</th>
              <th className="text-left px-5 py-4 font-semibold">Exam Fee</th>
              <th className="text-left px-5 py-4 font-semibold">Other Charges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {feeRecords.map((fee, i) => (
              <motion.tr
                key={fee.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.06 }}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-5 py-4 font-display font-semibold text-secondary">{fee.className}</td>
                <td className="px-5 py-4 text-foreground/80">{fee.tuition}</td>
                <td className="px-5 py-4 text-foreground/80">{fee.admission}</td>
                <td className="px-5 py-4 text-foreground/80">{fee.exam}</td>
                <td className="px-5 py-4 text-foreground/80">{fee.other}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Note */}
      <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        Admission fee is a one-time charge. Tuition fee is payable monthly or quarterly. All fees are subject to revision for the next academic year.
      </div>
    </section>

    {/* Payment modes */}
    <section className="container-narrow pb-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl border border-gold/20 p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-saffron text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-secondary">Payment Modes</h3>
          </div>
          <ul className="space-y-3">
            {paymentModes.map((mode, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {mode}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-festive text-primary-foreground rounded-2xl p-6 shadow-warm flex flex-col justify-between">
          <div>
            <p className="font-sanskrit text-xl text-gold mb-3">॥ विद्यार्थी सर्वोपरि ॥</p>
            <h3 className="font-display text-2xl mb-2">Need Financial Assistance?</h3>
            <p className="opacity-90 text-sm leading-relaxed">
              Vidyalaya offers merit-based and need-based scholarships. No deserving child should be denied education due to financial constraints.
            </p>
          </div>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-sm font-medium transition-all"
          >
            Contact Us for Scholarships
          </a>
        </div>
      </div>
    </section>
  </>
);

export default Fees;

