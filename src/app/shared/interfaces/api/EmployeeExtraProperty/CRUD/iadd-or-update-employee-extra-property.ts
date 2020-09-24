import { Time } from "@angular/common";

export interface IAddOrUpdateEmployeeExtraProperty {
    ID?:                    number;
    EmployeeID:             number;
    UpdatedByEmployeeID:    number;
    ExtraPropertyID?:       number;
    PropertyOptionID?:      number;
    TextValue?:             string;
    DateValue?:             Date;
    TimeValue?:             Time;
    NumericValue?:          number;
}
