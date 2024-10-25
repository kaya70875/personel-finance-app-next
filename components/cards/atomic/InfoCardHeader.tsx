import EditDropdown from '@components/dropdowns/EditDropdown';
import './_InfoCardHeader.scss';

interface InfoCardHeaderProps {
    category: string;
    cardTheme: string;
}

export default function InfoCardHeader({ category, cardTheme }: InfoCardHeaderProps) {
    return (
        <header className="info-card-header">
            <div className="info-card-header-details">
                <button className="ellipse" style={{ backgroundColor: cardTheme }}></button>
                <h3>{category}</h3>
            </div>
            <div className="info-card-edit">
                <EditDropdown header={category} />
            </div>
        </header>
    )
}
