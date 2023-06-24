import React, { Component,useState } from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import { db } from '../../db';

const Category = () => {
    const [category, setCategory] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [status, setStatus] = useState("");
  
    async function addCategory(){
        try {
        const id = await db.category.add({
            category,
            categoryDescription
          });

          setStatus(`${category} successfully added. Got id ${id}`);
        } catch (error) {
            setStatus(`Failed to add ${category}: ${error}`);
          }

    }

        const categories = useLiveQuery(
            () => db.category.toArray()
          );
   



    return (
      <div>
        <div className='listCategory'>

        <ul>
    {categories?.map(category => <li key={category.id}>
        {category.id}, {category.category}, {category.categoryDescription}
    </li>)}
  </ul>;


        </div>
        <p>
      {status}
    </p>
    Category:
    <input
      type="text"
      value={category}
      onChange={ev => setCategory(ev.target.value)}
    />
    Category Desccription:
    <input
      type="number"
      value={categoryDescription}
      onChange={ev => setCategoryDescription(Number(ev.target.value))}
    />
    
    <button onClick={addCategory}>
      Add
    </button>
      </div>
    );
  }
  
  export default Category;