import OverviewCard from "@components/OverviewCard";
import './transactions/_global.scss';

export default function Home() {
  return (
    <div className="home">
      <section className="page-header-section">
        <h1>Overview</h1>
      </section>

      <section className="overview-content-section">
        <div className="overview-cards">
          <OverviewCard isActive={true} cardHeader="Current Balance" cardPrice={1000} />
          <OverviewCard cardHeader="Income" cardPrice={232} />
          <OverviewCard cardHeader="Expenses" cardPrice={2300} />
        </div>
      </section>
    </div>
  );
}
