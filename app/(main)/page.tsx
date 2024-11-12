"use client";

import OverviewCard from "@components/OverviewCard";
import './transactions/_global.scss';
import CardVisuals from "@components/cards/CardVisuals";
import iconPot from '@public/assets/images/icon-pot.svg';
import Image from "next/image";
import useFetch from "@hooks/useFetch";
import Budgets from "@components/cards/Budgets";
import TransactionsComponent from "@components/cards/TransactionsComponent";
import RecurringOverviewCard from "@components/cards/RecurringOverviewCard";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import OverviewSkeleton from "@components/skeletons/OverviewSkeleton";
import OverviewCardHeaderSection from "@components/reusables/OverviewCardHeaderSection";
import { motion } from 'framer-motion';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    else {
      console.log("session", session?.user.id);
    }
  }, [session])

  const handleSignOut = () => {
    signOut();
  }

  const { data, error, loading } = useFetch();

  const potContainerVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  };

  const potItemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  if (error) {
    return <div>An error occured!</div>
  }

  return (
    <div className="home">
      <section className="page-header">
        <h1>Overview</h1>
        <button className="add-button" onClick={handleSignOut}>Sign Out</button>
      </section>

      <section className="overview-cards-section">
        <div className="overview-cards">
          {loading ? (
            <OverviewSkeleton height="10rem" />
          ) : (
            <>
              <OverviewCard isActive={true} cardHeader="Current Balance" cardPrice={data?.balanceData?.current ?? 0} />
              <OverviewCard cardHeader="Income" cardPrice={data?.balanceData.income ?? 0} />
              <OverviewCard cardHeader="Expenses" cardPrice={2300} />
            </>
          )}
        </div>
      </section>

      <section className="overview-content-section">
        <div className="overview-left">
          <motion.section
            className="overview-card-wrapper"
            variants={potContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.header
              className="overview-card-header-section"
              variants={potItemVariants}
            >
              <OverviewCardHeaderSection name="Pots" loading={loading} href="/pots" />
            </motion.header>

            <motion.div
              className="pots-overview-card-content"
              variants={potItemVariants}
            >
              <motion.div
                className="pots-overview-card-total"
                variants={potItemVariants}
              >
                <motion.div
                  className="pots-overview-card-img"
                  variants={potItemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  {loading ? (
                    <Skeleton width={'64px'} height={'64px'} circle />
                  ) : (
                    <Image src={iconPot} alt="pot" width={50} height={50} />
                  )}
                </motion.div>
                <div className="pots-overview-card-total-info" style={{ width: '100%' }}>
                  {loading ? (
                    <OverviewSkeleton height="1rem" count={2} />
                  ) : (
                    <motion.div variants={potItemVariants}>
                      <p>Total Saved</p>
                      <h1>$850</h1>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="pots-overview-card-visuals"
                variants={potItemVariants}
              >
                {loading ? (
                  <OverviewSkeleton count={2} height={'1rem'} />
                ) : (
                  data?.potsData.slice(0, 4).map((pot, index) => (
                    <motion.div
                      key={index}
                      variants={potItemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <CardVisuals
                        cardHeader={pot.name}
                        cardPrice={pot.total}
                        cardVisualColor={pot.theme}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </motion.div>
          </motion.section>

          <section className="overview-card-wrapper">
            <header className="overview-card-header-section">
              <OverviewCardHeaderSection name="Transactions" loading={loading} href="/transactions" />
            </header>

            <TransactionsComponent transactionFilters={false} pagination={false} postsCount={5}
              sender=""
              middle={[]}
              amount=''
            />
          </section>
        </div>

        <div className="overview-right">
          <Budgets headerSection={true} />
          <RecurringOverviewCard />
        </div>
      </section>
    </div>
  );
}
