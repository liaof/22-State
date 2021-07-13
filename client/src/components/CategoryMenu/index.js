import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function CategoryMenu() {

  // without using global state
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];
  const [state, dispatch] = useStoreContext();// as soon as this componenet is rendered, it retrieves the current state of the global state object and it's associated dispatch()
  const { categories } = state;// because this componenet only needs the categoies array out of the global state, destrucutre it
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  // this function allows us to use the data from the query to update the global state object, which would usually not be possible because useStoreContext is synchronous while useQuery is asynchronous
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [categoryData, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    })
  }
  
  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
// what this componenet does
// when we retrieve our category content from the server, we immediately save it to our global state object and use 
// that data to print the list of categories to the page. We also set it up where when we click one of those categories, 
// we save that category's _id value to the global state as well!
