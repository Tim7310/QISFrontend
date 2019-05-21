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