import { useSWRConfig } from 'swr';

interface DeleteHandler {
  deleteCard: (id: string, type: string) => Promise<void>;
}

interface UpdateHandler<T> {
  handleUpdateCard: (cardData: Partial<T>, id: string, cardType: string , userId : string) => Promise<void>;
}

const useCardActions = <T extends object>() => {
  const { mutate } = useSWRConfig();

  /**
   * Adds a new card by posting `cardData` to the given `url`.
   *
   * @param {T} cardData - The data object for the card to be added.
   * @param {string} cardType - Budget or Pot card.
   */
  const handleAddCard = async (cardData: T, cardType: string , userId : string) => {
    try {
      const response = await fetch(`/api/${cardType}Methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...cardData, userId}),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        await mutate('/api/getData');
      } else {
        console.error('Error adding card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /**
   * Deletes a pot or budget card based on the given ID and endpoint.
   *
   * @param {string} id - ID for the relevant card object.
   * @param {string} type - The card type, should be pot or budget card.
   */
  const handleDeleteCard: DeleteHandler['deleteCard'] = async (id, type) => {
    try {
      const response = await fetch(`/api/${type}Methods`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        console.log(`${type} deleted successfully`);
        await mutate('/api/getData');
      } else {
        console.error(`Failed to delete ${type}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /**
   * Updates an existing card by sending `cardData` to the API.
   *
   * @param {T} cardData - The data object for the card to be updated.
   * @param {string} _id - ID of the card to update.
   * @param {string} cardType - Budget or Pot card.
   */
  const handleUpdateCard: UpdateHandler<T>['handleUpdateCard'] = async (cardData, _id, cardType , userId) => {
    try {
      const response = await fetch(`/api/${cardType}Methods`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...cardData , _id , userId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        await mutate('/api/getData');
      } else {
        console.error('Error updating card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { handleAddCard, handleDeleteCard, handleUpdateCard };
};

export default useCardActions;
