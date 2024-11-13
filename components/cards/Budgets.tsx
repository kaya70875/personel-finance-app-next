import React from 'react'
import './styles/_Budgets.scss';
import PieChart from '@components/graphs/PieChart';
import CardVisuals from './CardVisuals';
import useFetch from '@hooks/useFetch';
import OverviewCardHeaderSection from '@components/reusables/OverviewCardHeaderSection';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';

interface BudgetsProps {
    headerSection: boolean;
    isFullPage?: boolean;
}

export default function Budgets({ headerSection, isFullPage = false }: BudgetsProps) {
    const { data, error, loading } = useFetch();

    const containerVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    if (error) return <div>{error}</div>

    const budgetsData = data?.budgetsData ?? [];

    return (
        <motion.div
            className={`budgets-wrapper ${isFullPage ? 'budgets-wrapper--main' : ''}`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {headerSection && (
                <motion.header
                    className="budgets-inline-header"
                    variants={itemVariants}
                >
                    <OverviewCardHeaderSection name='Budgets' loading={loading} href="/budgets" />
                </motion.header>
            )}

            {budgetsData.length > 0 ? (
                <motion.div
                    className='chart-main'
                    variants={itemVariants}
                >
                    {loading ? (
                        <Skeleton width={'128px'} height={'128px'} circle />
                    ) : (
                        <PieChart />
                    )}
                    <motion.div
                        className='budget-visuals'
                        variants={itemVariants}
                    >
                        {isFullPage && (
                            <motion.div
                                className='spending-summary'
                                variants={itemVariants}
                            >
                                <h3>Spending Summary</h3>
                            </motion.div>
                        )}
                        {loading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                                <Skeleton width={'100%'} height={'20px'} />
                                <Skeleton width={'100%'} height={'20px'} />
                                <Skeleton width={'100%'} height={'20px'} />
                                <Skeleton width={'100%'} height={'20px'} />
                            </div>
                        ) : (
                            budgetsData.map((budget, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                >
                                    <CardVisuals
                                        cardHeader={budget.category}
                                        cardPrice={budget.maximum}
                                        cardVisualColor={budget.theme}
                                        cardSpend={budget.spend}
                                        isFullPage={isFullPage}
                                    />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    className='no-budgets'
                    variants={itemVariants}
                >
                    <div className="budgets-cards-empty">
                        <h3>No budgets set yet</h3>
                        <p>Set a budget to track your spending and stay on track with your financial goals.</p>
                    </div>

                </motion.div>
            )}


        </motion.div>
    )
}
