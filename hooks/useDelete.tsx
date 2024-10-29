import { useSWRConfig } from "swr"

interface DeleteHandler {
    deleteItem : (id : string , url : string) => Promise<void>;
}

const useDelete = () => {
    const {mutate} = useSWRConfig();

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
    }
    return { deleteItem };
}

export default useDelete;