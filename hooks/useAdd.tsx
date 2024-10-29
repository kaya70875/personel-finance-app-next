const useAdd = <T extends object>() => {
  /**
   * Adds a new card by posting `cardData` to the given `url`.
   *
   * @param {T} cardData - The data object for the card to be added.
   * @param {string} url - API endpoint (relative path) where the card data should be sent.
   * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsPopped - Function to toggle the pop-up state.
   */
  const handleAddCard = async (
      cardData: T,
      url: string,
      setIsPopped: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
      try {
          const response = await fetch(`api/${url}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(cardData),
          });

          if (response.ok) {
              const result = await response.json();
              console.log(result.message);
              setIsPopped(false);
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
