import React, { Component } from "react";
class ListGroup extends Component {
  

  render() {
    const {items, onActiveItem, activedItem, textProperty, valueProperty} = this.props;  
    return (
      <>
        <ul className="list-group">
          {items.map((item) => (
            <li
            key = {item[valueProperty]}
              // key={item._id}
              onClick={() =>onActiveItem(item)}
              className={
                activedItem == item
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {item[textProperty]}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ListGroup.defaultProps ={
  textProperty:"name",
  valueProperty:"_id"
}
export default ListGroup;
