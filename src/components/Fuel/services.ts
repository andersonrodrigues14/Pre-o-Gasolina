import { Api } from "../../services/api"
import { IFuel } from "./types";

export const getFuel = async () => {
    const request = await Api.get('fuel');

    return request.data;
};

export const updateFuel = async (fuel: IFuel) => {
    const request = await Api.put(`fuel/${fuel.id}`, fuel);

    return request.data;
}