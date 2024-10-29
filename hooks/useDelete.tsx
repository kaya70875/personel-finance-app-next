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
     * @param {string} url - API endpoint (relative path) where the card data should be sent.
     */
    const deleteItem: DeleteHandler['deleteItem'] = async (id, url) => {
        try {
            const response = await fetch(`/api/delete${url}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                console.log(`${url} deleted successfully`);
                await mutate('/api/getData');
            } else {
                console.error(`Failed to delete ${url}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return { deleteItem };
};

export default useDelete;
