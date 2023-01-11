import ButtonOpenAddCat from "@components/admin_components/admin_category/ButtonOpenAddCat";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Categories from "./Categories";

function AdminCategory() {
  const [selectCategory, setSelectCategory] = useState([]);
  const [catId, setCatId] = useState();
  const [catName, setCatName] = useState();

  const getCategories = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/categories`)
      .then((res) => {
        setSelectCategory(res.data);
        console.warn(res.data);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleOptions = (elem) => {
    console.warn(elem);
    setCatId(elem.value);
    setCatName(elem.label);
  };

  return (
    <div className="select-category">
      {selectCategory && (
        <Select
          options={selectCategory.map((elem) => ({
            label: elem.name,
            value: elem.id,
          }))}
          defaultValue={{ value: { catId }, label: "Search your category" }}
          onChange={(elem) => handleOptions(elem)}
        />
      )}
      {catId !== "Search category" && (
        <Categories
          catId={catId}
          setCatId={(value) => setCatId(value)}
          catName={catName}
          getCategories={getCategories}
          setCatName={(value) => setCatName(value)}
        />
      )}
      <ButtonOpenAddCat getCategories={() => getCategories()} />
    </div>
  );
}
export default AdminCategory;
