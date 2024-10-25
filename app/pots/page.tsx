'use client';

import AddButton from '@components/buttons/AddButton';
import './_global.scss';
import PotCard from '@components/cards/PotCard';
import useFetch from '@hooks/useFetch';

export default function page() {

    const {data , error , loading} = useFetch();

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    const potsData = data?.potsData ?? [];

    return (
        <div className="home">
            <header className="page-header">
                <h1>Pots</h1>
                <AddButton buttonText='Pot' />
            </header>
            <div className="pots-wrapper">
                {potsData.map((pot , index) => (
                    <PotCard
                        key={index}
                        category={pot.name}
                        cardTheme={pot.theme}
                        total={pot.total}
                        target={pot.target}
                    />
                ))}
            </div>
        </div>
    )
}
