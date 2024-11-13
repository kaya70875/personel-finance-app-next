import React, { useState, useEffect } from 'react';
import Dropdown from '@components/dropdowns/Dropdown';
import { colors } from '@utils/colors';
import { getUniqueCategories } from '@utils/helpers';
import useFetch from '@hooks/useFetch';
import { cardMappings } from '@utils/cardMappings';
import useCardActions from '@hooks/useCardActions';
import { useSession } from 'next-auth/react';

interface ModalClassicProps {
  name?: string;
  theme?: string;
  price?: number;
  actionType: 'update' | 'add';
  cardType: 'pot' | 'budget';
  id?: string;
  setIsPopped?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalClassic({ name, price, theme, actionType, setIsPopped, id, cardType }: ModalClassicProps) {
  const { data } = useFetch();

  const {data : session} = useSession();
  const userId = session?.user.id;

  const { handleAddCard, handleUpdateCard } = useCardActions();
  const transactionsData = data?.transactionsData ?? [];
  const uniqueCategories = getUniqueCategories(transactionsData);

  // Map the fields according to the card type
  const cardFields = cardMappings[cardType];

  const [cardData, setCardData] = useState({
    [cardFields.name]: actionType === 'add' ? '' : name,
    [cardFields.price]: actionType === 'add' ? 0 : price,
    [cardFields.theme]: actionType === 'add' ? '' : theme,
  });

  const [activeDropdownItem, setActiveDropdownItem] = useState({
    budgetCategory: actionType === 'add' ? 'Choose A Budget' : name,
    budgetTheme: actionType === 'add' ? 'Choose A Color' : theme,
  });

  useEffect(() => {
    if (price) {
      setCardData(prev => ({
        ...prev,
        [cardFields.price]: price,
      }));
    }
  }, [price]);

  const handleClick = () => {
    if (actionType === 'update') {
      handleUpdateCard(cardData, id!, cardType , userId!);
      setIsPopped?.(false);
    } else if (actionType === 'add') {
      handleAddCard(cardData, cardType , userId!);
      setIsPopped?.(false);
    }
  };

  return (
    <>
      <div className="inputs-wrapper">
        <div className="modal-input">
          <label>{cardType === 'budget' ? 'Budget Category' : 'Pot Name'}</label>
          {cardType === 'pot' ? (
            <input type="text" placeholder="e.g Vacation Fund" className="modal-input-item" onChange={(e) => setCardData({
              ...cardData,
              [cardFields.name]: e.target.value,
            })} />
          ) : (
            <Dropdown buttonName={activeDropdownItem.budgetCategory}>
              {uniqueCategories.map(category => (
                <li key={category} className="dropdown-item" onClick={() => {
                  setCardData({
                    ...cardData,
                    [cardFields.name]: category,
                  });
                  setActiveDropdownItem({
                    ...activeDropdownItem,
                    budgetCategory: category,
                  });
                }}>
                  <p className='p--black'>{category}</p>
                </li>
              ))}
            </Dropdown>
          )}

          <label htmlFor="spend">{cardType === 'budget' ? 'Maximum Spend' : 'Target'}</label>
          <input
            type="numeric"
            value={cardData[cardFields.price]}
            placeholder="$ e.g.2000"
            className="modal-input-item"
            onChange={(e) => {
              setCardData({
                ...cardData,
                [cardFields.price]: parseInt(e.currentTarget.value, 10) || 0,
              });
            }}
          />

          <label>Theme</label>
          <Dropdown buttonName={activeDropdownItem.budgetTheme}>
            {Object.entries(colors).map(([colorName, colorValue]) => (
              <li key={colorName} className="color-option" onClick={() => {
                setCardData({
                  ...cardData,
                  [cardFields.theme]: colorValue,
                });
                setActiveDropdownItem({
                  ...activeDropdownItem,
                  budgetTheme: colorName,
                });
              }}>
                <div className="ellipse" style={{ backgroundColor: colorValue }}></div>
                <p className='p--black'>{colorName}</p>
              </li>
            ))}
          </Dropdown>
        </div>
      </div>
      <button className="add-button" onClick={handleClick}>{actionType === 'add' ? 'Add Budget' : 'Save Changes'}</button>
    </>
  );
}
