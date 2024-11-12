'use client';

import DetailsLink from '@components/links/DetailsLink';
import './styles/_BudgetsInfoCard.scss';
import TransactionsComponent from './TransactionsComponent';
import { Budgets, Pots, Transactions } from '../../types/finance';
import CardVisuals from './CardVisuals';
import InfoCardHeader from './atomic/InfoCardHeader';
import EditDropdown from '@components/dropdowns/EditDropdown';
import ModalClassic from './modal/ModalClassic';
import { convertThemeToString } from '@utils/colors';
import { motion } from 'framer-motion';

interface BudgetsInfoCardProps {
    budget: Budgets;
    filteredTransactions: Transactions[];
    cardType: 'budget' | 'pot';
}

export default function BudgetsInfoCard({ budget, filteredTransactions, cardType }: BudgetsInfoCardProps) {
    const { theme, maximum, spend, _id, category } = budget;
    let progressBarWidth = (spend / maximum) * 100;

    const containerVariants = {
        hidden: { 
            opacity: 0,
            y: 0
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                duration: 0.4
            }
        }
    };

    return (
        <motion.div 
            className="budgets-info-card-wrapper"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.section 
                className="budgets-info-card-top"
                variants={itemVariants}
            >
                <InfoCardHeader category={category} theme={theme}>
                    <EditDropdown category={category} id={_id} type={'Budget'}>
                        <ModalClassic 
                            cardType='budget' 
                            id={_id} 
                            actionType='update' 
                            name={category} 
                            price={maximum} 
                            theme={convertThemeToString(theme)} 
                        />
                    </EditDropdown>
                </InfoCardHeader>

                <motion.div 
                    className="budgets-info-card-progress"
                    variants={itemVariants}
                >
                    <p>Maximum of ${maximum}</p>
                    <div className="progress-bar">
                        <motion.div 
                            className="progress" 
                            style={{ width: `${progressBarWidth.toString()}%`, backgroundColor: theme }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressBarWidth}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </div>
                </motion.div>

                <motion.div 
                    className="budgets-info-card-visuals"
                    variants={itemVariants}
                >
                    <CardVisuals 
                        cardHeader='Spent' 
                        cardPrice={spend || 0} 
                        cardVisualColor={theme} 
                        cardSpend={spend} 
                    />
                    <CardVisuals 
                        cardHeader='Remaining' 
                        cardPrice={maximum - spend || maximum} 
                        cardSpend={spend} 
                        cardVisualColor={'transparent'} 
                    />
                </motion.div>
            </motion.section>

            <motion.section 
                className="budgets-info-card-bottom"
                variants={itemVariants}
            >
                <motion.header 
                    className="budgets-info-card-header"
                    variants={itemVariants}
                >
                    <h3>Latest Spending</h3>
                    <DetailsLink header='See All' href='/transactions' />
                </motion.header>

                <motion.div 
                    className="budgets-info-card-transactions-section"
                    variants={itemVariants}
                >
                    <TransactionsComponent
                        transactionFilters={false}
                        pagination={false}
                        posts={filteredTransactions}
                        amount=''
                        middle={[]}
                        sender=''
                    />
                </motion.div>
            </motion.section>
        </motion.div>
    )
}
