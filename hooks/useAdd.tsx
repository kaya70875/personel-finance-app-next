const useAdd = <T extends object>() => {
  /**
   * Adds a new card by posting `cardData` to the given `url`.
   *
   * @param {T} cardData - The data object for the card to be added.
   * @param {string} cardType - Budget or Pot card. 
   */
  const handleAddCard = async (
      cardData: T,
      cardType : string,
  ) => {
      try {
          const response = await fetch(`api/${cardType}Methods`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(cardData),
          });

          if (response.ok) {
              const result = await response.json();
              console.log(result.message);
              window.location.reload();
          } else {
              console.error('Error adding card');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };

  return { handleAddCard };
};

export default useAdd;
