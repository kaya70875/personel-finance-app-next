import Image from 'next/image';
import logo from '@public/assets/images/logo-large.svg';
import './styles/_Sidebar.scss';

// Import icons

import homeIcon from '@public/assets/images/icon-nav-overview.svg';
import transactionsIcon from '@public/assets/images/icon-nav-transactions.svg';
import budgetsIcon from '@public/assets/images/icon-nav-budgets.svg';
import potIcon from '@public/assets/images/icon-nav-pots.svg';
import recurringsIcon from '@public/assets/images/icon-nav-recurring-bills.svg';

const icons = [
    { src: homeIcon, alt: 'Overview', label: 'Overview' },
    { src: transactionsIcon, alt: 'Transactions', label: 'Transactions' },
    { src: budgetsIcon, alt: 'Budgets', label: 'Budgets' },
    { src: potIcon, alt: 'Pots', label: 'Pots' },
    { src: recurringsIcon, alt: 'Recuring Bills', label: 'Recuring Bills' },
];

function Sidebar() {
    return (
        <nav className="sidebar-main">
            <header className="logo">
                <Image 
                    src={logo}
                    alt='FinanceG Logo'
                    width={150}
                    height={150}
                />
            </header>

            <section className="sidebar-menu">
                <ul className="sidebar-items">
                    {icons.map((icon, index) => (
                        <li key={index} className="sidebar-item">
                            <div className="sidebar-item-img">
                                <Image 
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <p>{icon.label}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </nav>
    );
}

export default Sidebar;
