import API from "./api"

interface CategoryInterface {

    id: number;
    name: string;
    created_at: string;
    updated_at: string;

}

 export const fetchCategories = async () : Promise<CategoryInterface[]> => {
  try {
    const res = await API.get('/categories');
    const data = await res.data;
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
    
  }

}