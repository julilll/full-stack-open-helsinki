import React from "react";
import { Person } from "../../App";

const List = ({ list, removeHandler }: { list: Person[], removeHandler: (id: string) => void }) => {
  return list.map((person) => (
    <p key={person.id}>{person.name} {person.number} <span><button onClick={() => removeHandler(person.id)}>delete</button></span></p>
  ));
}

export default List;
