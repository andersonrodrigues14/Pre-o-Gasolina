import React, {useEffect, useState} from "react"
import { getFuel, updateFuel } from "./services";
import {Container, Panel, SettingsIcon, Title, Box, Row, FuelText, FuelPrice, InfoText, SaveButton, SaveIcon, FuelInput} from "./styles";
import { IFuel, FuelComponentProps, IFuelState } from "./types";
import { FiEdit2 } from 'react-icons/fi';

export const FuelComponent = ({editMode, toogleEditMode} : FuelComponentProps) => {
    const [fuels, setFuels] = useState<IFuelState[]>();
    const TIME_TO_UPDATE_MS = 1000;

    async function fetchAndUpdateData() {
        const data = await getFuel();

        setFuels(data);

    }

    async function onSave () {
        const changed = fuels?.filter(f => f.updated);

        if(!changed || changed.length === 0) {
            toogleEditMode();
            return;
        }

        for (const changedFuel of changed) {
            const {updated, ...rest } = changedFuel
            await updateFuel(rest);
        }

        fetchAndUpdateData();
        toogleEditMode();
    }

    useEffect(()=> {
        fetchAndUpdateData();
    }, []);

    useEffect (()=>{
        if(editMode) return;

       const intervalId =  setInterval(() => {
            fetchAndUpdateData();
        }, TIME_TO_UPDATE_MS);

        return () => {
            clearInterval(intervalId)
        }

    },[editMode]);

    function onUpdatePrice(fuelId: number, price: string){
        const updatedFuels = fuels?.map(fuel => {
            if(fuel.id === fuelId){
                fuel.price = Number(price);
                fuel.updated = true;
            }

            return fuel;
        })

        setFuels(updatedFuels);
    }

    return(
        <Container>
            <Title>Posto ReactJS</Title>
            <SettingsIcon onClick={toogleEditMode} />


            <Panel>
                {editMode && 
                    <Row>
                        <InfoText>
                            <FiEdit2/>
                            Altere o preço do item e salve
                        </InfoText>
                    </Row>
                }
                {fuels?.map(fuel => (
                    <Row key={fuel.id}>
                        <Box><FuelText>{fuel.name}</FuelText></Box>
                        <Box>
                            {editMode ? 
                                <FuelInput 
                                    type="number"
                                    value={fuel.price}
                                    onChange={(ev) => onUpdatePrice(fuel.id, ev.target.value)}
                                /> :
                                <FuelPrice>{fuel.price}</FuelPrice>
                            }
                        </Box>
                    </Row>
                ))}
                {editMode &&
                    <Row>
                        <SaveButton onClick={onSave}>
                            <SaveIcon />
                            <span>Save</span>
                        </SaveButton>
                    </Row> 
                }
            </Panel>
        </Container>
    );
}