import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeaturedJobs from "../components/home/FeaturedJobs";
import Categories from "../components/home/Categories";
import TopCompanies from "../components/home/TopCompanies";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import TrustedBy from "../components/home/TrustedBy";
import HowItWorks from "../components/home/HowItWorks";
import FAQPreview from "../components/home/FAQPreview";

export default function Home() {
  return (
    <div className="bg-paper-100 text-ink-900 dark:bg-slate-900 dark:text-slate-100">
      <Hero />
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-14">
        <TrustedBy />
        <HowItWorks />
        <Stats />
        <FeaturedJobs />
        <Categories />
        <TopCompanies />
        <Testimonials />
        <FAQPreview />
        <Newsletter />
      </main>
    </div>
  );
}
