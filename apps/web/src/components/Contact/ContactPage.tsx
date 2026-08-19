import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function ContactPage() {
  return (
    <div>
      <ContactHero />

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  );
}