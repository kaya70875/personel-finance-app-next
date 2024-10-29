import EditDropdown from '@components/dropdowns/EditDropdown';
import './_InfoCardHeader.scss';

interface InfoCardHeaderProps {
    category: string;
    cardTheme: string;
    id : string;
    type : string;
}

export default function InfoCardHeader({ category, cardTheme , id , type}: InfoCardHeaderProps) {
    return (
        <header className="info-card-header">
            <div className="info-card-header-details">
                <button className="ellipse" style={{ backgroundColor: cardTheme }}></button>
                <h3>{category}</h3>
            </div>
            <div className="info-card-edit">
                <EditDropdown type={type} id={id} header={category} />
            </div>
        </header>
    )
}
