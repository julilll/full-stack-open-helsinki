import { MouseEventHandler } from "react";
import { Country } from "../../shared/list";

export interface ListItemProps {
  item: Country;
  showHandler: MouseEventHandler<HTMLButtonElement>;
}

const ListItem = ({ item, showHandler }: ListItemProps) => {
  return (
    <li className="note">
      {item.name.common} 
      <button onClick={showHandler}>show</button>
    </li>
  )
}

export default ListItem