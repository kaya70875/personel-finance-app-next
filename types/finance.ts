export interface Balance {
    current : number;
    income : number;
    expenses : number;
}

export interface Budgets {
    category : string;
    maximum : number;
    theme : string;
    percentage : number;
}

export interface Transactions {
    avatar : string;
    name : string;
    category : string;
    date : Date;
    amount : number;
    recurring : boolean;
}

export interface Pots {
    name : string;
    target : number;
    total : number;
    theme : string;
}