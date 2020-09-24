export interface IEmployeeElement {
    FullName:               string;
    Gender:                 string;
    BirthDate:              string;
    IDNumber:               number;
    Email:                  string;
    Number:                 number;
    NetworkLogin:           string;
    FirstName:              string;
    SecondName:             string;
    FirstSurname:           string;
    SecondSurname:          string;
    Status?:                boolean;
    DateHired:              Date;
    DateDismiss?:           Date;
    EmployeeCategoryID?:    number;
    PositionID:             number;
    SupervisorID?:          number;
    AreaID:                 number;
    CostCenterID:           number;
    OrgUnitID:              number;
    DateCreation:           Date;
    DateUpdated:            Date;
}
