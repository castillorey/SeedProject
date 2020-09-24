import { IAddOrUpdatePropertyOption } from "./iadd-or-update-property-option";

export interface IAddOrUpdateExtraProperty {
    ID?:                number;
    Name:               string;
    TypeID:             number;
    AreaID:             number;
    IsActive:           boolean;
    SortOrder:          number;
    IsHistoricalData:   boolean;
    PropertyOptions:    IAddOrUpdatePropertyOption[];
}
