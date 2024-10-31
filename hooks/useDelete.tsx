import { useSWRConfig } from "swr";

interface DeleteHandler {
    deleteItem: (id: string, url: string) => Promise<void>;
}

const useDelete = (): DeleteHandler => {
    const { mutate } = useSWRConfig();

    /**
     * Deletes a pot or budget card based on given ID and endpoint.
     *
     * @param {string} id - ID for the relevant card object.
     * @param {string} type - The card type it should be pot or budget card.
     */
    const deleteItem: DeleteHandler['deleteItem'] = async (id, type) => {
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

    return { deleteItem };
};

export default useDelete;
