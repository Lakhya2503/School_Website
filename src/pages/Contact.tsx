import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import heroContact from "@/assets/conatctus.png";

const Contact = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will reply soon. 🙏");
    (e.target as HTMLFormElement).reset();
  };

  const items = [
    { icon: MapPin, label: "Main Campus", value: "108, Saraswati Marg, Bengaluru — 560001" },
    { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
    { icon: Mail, label: "Email", value: "hello@vidyalaya.in" },
    { icon: Clock, label: "Office Hours", value: "Mon – Sat · 8 AM – 5 PM" },
  ];

  return (
    <>
      <PageHero
        title="Visit Our Vidyalaya"
        sanskrit="॥ अतिथि देवो भव ॥"
        subtitle="Parents, students, and guests are always welcome. Come meet us on campus or reach out for admissions and support."
        image={heroContact}
        size="default"
      />

      <section className="container-narrow py-20 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader eyebrow="॥ संपर्कः ॥" title="Reach Us" center={false} />
          {items.map((i, idx) => (
            <motion.div
              key={i.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: idx * 0.08 }}
              className="flex gap-4 rounded-2xl bg-card p-5 border border-gold/30 shadow-soft hover:shadow-warm transition-all"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-saffron text-primary-foreground shadow-gold">
                <i.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">{i.label}</div>
                <div className="text-foreground/90 mt-1">{i.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl bg-card p-8 md:p-10 border border-gold/30 shadow-temple">
            <h3 className="font-display text-2xl text-secondary mb-1">Send Us a Message</h3>
            <p className="text-sm text-muted-foreground mb-6">We'll respond within one working day.</p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} required className="mt-1.5" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container-narrow pb-20">
        <div className="grid gap-5 md:grid-cols-2 md:items-stretch">
          <div className="rounded-2xl section-surface ornate-frame p-5 md:p-6 h-full">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Campus Address</p>
            <h3 className="font-display text-2xl text-secondary mt-1">Vidyalaya Main Campus</h3>
            <p className="mt-3 text-foreground/85 leading-relaxed">
              108, Saraswati Marg, Bengaluru - 560001
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Near Temple Square
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              Reach us by metro or city bus. Parent parking is available at the entrance gate.
            </p>
          </div>

          <div className="rounded-2xl section-surface ornate-frame p-3 md:p-4 flex items-center justify-center">
            <div className="w-full max-w-[360px] aspect-square rounded-xl overflow-hidden border border-gold/30 shadow-soft">
              <iframe
                title="Vidyalaya location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.93%2C77.65%2C13.03&layer=mapnik"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

