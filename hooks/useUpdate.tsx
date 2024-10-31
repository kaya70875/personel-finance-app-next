const useUpdate = <T extends object>() => {
    /**
     * Updates current card.
     *
     * @param {T} cardData - The data object for the card to be added.
     * @param {string} _id - The ID of the card to be updated.
     * @param {string} cardType - Budget or Pot card.
     */
    const handleUpdateCard = async (
        cardData: Partial<T>,
        _id : string,
        cardType : 'pot' | 'budget',
    ) => {
        try {
            const response = await fetch(`api/${cardType}Methods`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...cardData, _id}),
            });

            console.log('data' , cardData);
  
            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                window.location.reload();
            } else {
                console.error('Error updating card');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  
    return { handleUpdateCard };
  };
  
  export default useUpdate;
  