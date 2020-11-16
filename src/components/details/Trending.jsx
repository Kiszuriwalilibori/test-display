import * as React from "react";

const Trending = React.memo(props => {
  const { ary } = props;
  return (
    <ul className ="search-list">
      <span className ="search-text search-text--smaller">Trending: </span>
      {ary.map((item, index, arr) => (
        <li className ="search-text search-text--smaller search-list-item" key={index}>
          {index === arr.length - 1 ? item : item + ","}
        </li>
      ))}
    </ul>
  );
});

export default Trending;
