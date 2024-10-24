"use client";

import OverviewCard from "@components/OverviewCard";
import './transactions/_global.scss';
import CardVisuals from "@components/cards/CardVisuals";
import iconPot from '@public/assets/images/icon-pot.svg';
import Image from "next/image";
import useFetch from "@hooks/useFetch";
import DetailsLink from "@components/links/DetailsLink";
import Budgets from "@components/cards/Budgets";
import TransactionsComponent from "@components/cards/TransactionsComponent";

export default function Home() {

  const { data, error, loading } = useFetch();

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>An error occured!</div>
  }

  return (
    <div className="home">
      <section className="page-header-section">
        <h1>Overview</h1>
      </section>

      <section className="overview-cards-section">
        <div className="overview-cards">
          <OverviewCard isActive={true} cardHeader="Current Balance" cardPrice={data?.balanceData?.current ?? 0} />
          <OverviewCard cardHeader="Income" cardPrice={data?.balanceData.income ?? 0} />
          <OverviewCard cardHeader="Expenses" cardPrice={2300} />
        </div>
      </section>

      <section className="overview-content-section">

        <div className="overview-left">
          {/* Pots Overview Card */}

          <section className="overview-card-wrapper">
            <header className="overview-card-header-section">
              <h3>Pots</h3>
              <DetailsLink href="/pots"/>
            </header>

            <div className="pots-overview-card-content">
              <div className="pots-overview-card-total">
                <div className="pots-overview-card-img">
                  <Image src={iconPot} alt="pot" width={50} height={50} />
                </div>
                <div className="pots-overview-card-total-info">
                  <p>Total Saved</p>
                  <h1>$850</h1>
                </div>
              </div>

              <div className="pots-overview-card-visuals">
                {data?.potsData.slice(0, 4).map(pot => (
                  <CardVisuals
                    cardHeader={pot.name}
                    cardPrice={pot.total}
                    cardVisualColor={pot.theme}
                  ></CardVisuals>
                ))}

              </div>
            </div>
          </section>

          <section className="overview-card-wrapper">
            <header className="overview-card-header-section">
              <h3>Transactions</h3>
              <DetailsLink href="/transactions" header="View All"/>
            </header>

            <TransactionsComponent transactionFilters={false} pagination={false} postsCount={5}/>

          </section>
        </div>

        <div className="overview-right">
          <Budgets headerSection={true}
           />
        </div>
      </section>
    </div>
  );
}