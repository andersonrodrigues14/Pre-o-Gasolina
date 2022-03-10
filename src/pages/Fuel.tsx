import React, { useState } from "react";
import { FuelComponent } from "../components/Fuel";

export const FuelPage = () => {
    const [editMode, seEditMode] = useState(false);

    function toggleEditMode() {
        seEditMode(prev => !prev);
    }

    return(
        <FuelComponent editMode={editMode} toogleEditMode={toggleEditMode}/>
    )
}