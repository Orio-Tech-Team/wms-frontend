import React from "react";
//
import * as Fa from "react-icons/fa";
import DualListBox from "react-dual-listbox";
import { Label } from "reactstrap";
//
const Index = ({ selectedValues, listSelector, text, options, comClass }) => {
  //

  return (
    <>
      <div className={comClass}>
        <Label for="form-2-first-name">{text}</Label>
        <DualListBox
          options={options}
          selected={selectedValues.selected}
          onChange={listSelector}
          canFilter
          filterCallback={(option, filterInput) => {
            if (filterInput === "") {
              return true;
            }
            return new RegExp(filterInput, "i").test(option.label);
          }}
          filterPlaceholder="Filter..."
          icons={{
            moveLeft: <Fa.FaChevronLeft />,
            moveAllLeft: [
              <Fa.FaChevronLeft key={0} />,
              <Fa.FaChevronLeft key={1} />,
            ],
            moveRight: <Fa.FaChevronRight />,
            moveAllRight: [
              <Fa.FaChevronRight key={0} />,
              <Fa.FaChevronRight key={1} />,
            ],
            moveDown: <Fa.FaChevronDown />,
            moveUp: <Fa.FaChevronUp />,
          }}
        />
      </div>
    </>
  );
};

export default Index;
