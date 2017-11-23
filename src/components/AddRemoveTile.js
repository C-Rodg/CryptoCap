import React from "react";
import { SettingsTile } from "./Styled";

// TODO: ADD IN A CHECKBOX or icon of some kind
const AddRemoveTile = ({ name, isSelected, id, toggleTile }) => {
	return (
		<SettingsTile
			className={isSelected ? "selected" : ""}
			onClick={() => toggleTile(id)}
		>
			<div>{name}</div>
		</SettingsTile>
	);
};

export default AddRemoveTile;
