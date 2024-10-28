export interface Balance {
    current : number;
    income : number;
    expenses : number;
}

export interface Budgets {
    _id : string;
    category : string;
    maximum : number;
    theme : string;
    percentage : number;
    spend : number;
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
    _id : string;
    name : string;
    target : number;
    total : number;
    theme : string;
}