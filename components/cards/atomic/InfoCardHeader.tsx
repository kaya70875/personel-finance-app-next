import './_InfoCardHeader.scss';

interface InfoCardHeaderProps {
    children : React.ReactNode;
    theme : string;
    category : string;
}

export default function InfoCardHeader({ children , theme , category}: InfoCardHeaderProps) {

    return (
        <header className="info-card-header">
            <div className="info-card-header-details">
                <button className="ellipse" style={{ backgroundColor: theme }}></button>
                <h3>{category}</h3>
            </div>
            <div className="info-card-edit">
                {children}
            </div>
        </header>
    )
}
