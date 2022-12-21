import React from "react";
import PropTypes from "prop-types";
import "./Categories.scss";
import useUrl from "../../Services/Hooks/useUrl";

function Categories(props) {
  const url = useUrl();
  return <>{url.getCategory(1)}</>;
}

Categories.propTypes = {};

export default Categories;
