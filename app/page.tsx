import OverviewCard from "@components/OverviewCard";
import './transactions/_global.scss';
import Link from "next/link";
import CardVisuals from "@components/cards/CardVisuals";
import iconPot from '@public/assets/images/icon-pot.svg';
import Image from "next/image";
import rightArrow from '@public/assets/images/icon-caret-right.svg';

export default function Home() {
  return (
    <div className="home">
      <section className="page-header-section">
        <h1>Overview</h1>
      </section>

      <section className="overview-cards-section">
        <div className="overview-cards">
          <OverviewCard isActive={true} cardHeader="Current Balance" cardPrice={1000} />
          <OverviewCard cardHeader="Income" cardPrice={232} />
          <OverviewCard cardHeader="Expenses" cardPrice={2300} />
        </div>
      </section>

      <section className="overview-content-section">

        <div className="overview-left">
          {/* Pots Overview Card */}

          <section className="pots-overview-card-wrapper">
            <header className="pots-overview-card-header">
              <h2>Pots</h2>
              <Link href="/pots">See Details <span style={{ marginLeft: '.75em' }}>
                <Image src={rightArrow}
                  width={10}
                  height={10}
                  alt="right-arrow"
                /></span></Link>
            </header>

            <div className="pots-overview-card-content">
              <div className="pots-overview-card-total">
                <div className="post-overview-card-img">
                  <Image src={iconPot} alt="pot" width={50} height={50} />
                </div>
                <div className="post-overview-card-total-info">
                  <p>Total Saved</p>
                  <h1>{2500}</h1>
                </div>
              </div>

              <div className="post-overview-card-visuals">
                <CardVisuals cardHeader="Savings" cardPrice={1000} cardVisualColor="green" />
                <CardVisuals cardHeader="Expenses" cardPrice={1500} cardVisualColor="red" />
                <CardVisuals cardHeader="Income" cardPrice={2500} cardVisualColor="blue" />
                <CardVisuals cardHeader="Total" cardPrice={2500} cardVisualColor="purple" />
              </div>
            </div>
          </section>
        </div>

        <div className="overview-right">

        </div>
      </section>
    </div>
  );
}