export interface IJWTDecoded {
    FullName:             string;
    UserID:               number;
    EmployeeNumber:       number;
    EmployeeNumberSup:    number;
    NetworkLogin:         string;
    ClientIP:             string;
    Roles:                Array<string>;
    TokenV:               number;
  
    nbf:                  number;
    exp:                  number;
    iat:                  number;
    iss:                  string; // "APIActDir",
    aud:                  string; // "App Name"
}