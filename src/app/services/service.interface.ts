export interface navList{
    name: string,
    icon: string,
    route: string
}
export interface itemList{
    itemId: number,
    itemName: string,
    itemPrice: number,
    itemDescription: string,
    itemType: string,
    deletedItem: number,
    neededTest: number,
    creationDate: Date,
    dateUpdate: Date,
}
export interface total{
    id: number,
    price: number,
    subtotal:number
}
export interface transaction{
    transactionID: number,
    transactionRef: number,
    patientId: number,
    userId: number,
    transactionType: string,
    biller: string
}
export interface patient{
    patientID: any,
    patientRef: number, 
    fullName: any,
    firstName: any,
    middleName: any,
    lastName: any,
    address: any,
    position: any,
    companyName: any,
    birthdate: any,
    gender: any,
    notes: any,
    patientType:  any,    
    email: any,
    age: number,
    sid: any,
    dateUpdate: any,
    creationDate: any,
    contactNo: any,
    companyID: number
}
export interface company{
    companyID: number,
    nameCompany: string,
    companyAddress: string
}