import { ISimpleItemLists } from "../isimple-item-lists";
import { IPropertyOptionElement } from "./iproperty-option-element";

export interface IExtraPropertyElement {
    ID:                 number;
    Name:               string;
    Type:               ISimpleItemLists;
    AreaID:             number;
    IsActive:           boolean;
    PropertyOptions:    IPropertyOptionElement[];
    SortOrder?:         number;
    IsHistoricalData:   boolean;
}
