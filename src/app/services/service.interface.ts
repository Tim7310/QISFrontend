export interface navList{
    name    : string,
    icon    : string,
    route   : string
}
export interface itemList{
    itemId          : any,
    itemName        : string,
    itemPrice       : number,
    itemDescription : string,
    itemType        : string,
    deletedItem     : number,
    neededTest      : number,
    creationDate    : any,
    dateUpdate      : any,
}
export interface packList{
    packageName         : any,
    dateUpdate          : any,
    creationDate        : any,
    packageDescription  : string,
    deletedPackage      : number,
    packagePrice        : number,
    packageType         : string
}
export interface total{
    id          : number,
    price       : number,
    subtotal    : number
}
export interface transaction{
    transactionID   : number,
    transactionRef  : number,
    patientId       : number,
    userId          : number,
    transactionType : string,
    biller          : string,
    totalPrice      : number,
    paidIn          : number,
    paidOut         : number,
    grandTotal      : number,
    status          : number,
    salesType       : string,
    loe             : string,
    an              : string,
    ac              : string,
    notes           : string,
    transactionDate : any
}
export interface patient{
    patientID       : any,
    patientRef      : number, 
    fullName        : any,
    firstName       : any,
    middleName      : any,
    lastName        : any,
    address         : any,
    position        : any,
    companyName     : any,
    birthdate       : any,
    gender          : any,
    notes           : any,
    patientType     : any,    
    email           : any,
    age             : number,
    sid             : any,
    dateUpdate      : any,
    creationDate    : any,
    contactNo       : any,
    companyID       : number
}
export interface company{
    companyID       : number,
    nameCompany     : string,
    companyAddress  : string
}
export interface itemGroup{
    name: string,
    items: itemList[]
}
