export interface navList {
    name: string,
    icon: string,
    route: string
}
export interface itemList {
    itemId?: any,
    itemName: string,
    itemPrice: number,
    itemDescription: string,
    itemType: string,
    deletedItem: number,
    neededTest: number,
    creationDate: any,
    dateUpdate: any
}
export interface packList {
    packageName: any,
    dateUpdate: any,
    creationDate: any,
    packageDescription: string,
    deletedPackage: number,
    packagePrice: number,
    packageType: string
}
export interface total {
    id: any,
    price: number,
    subtotal: number,
    quantity: number,
    discount: number
}
export interface transaction {
    transactionId: number,
    transactionRef: number,
    patientId: number,
    userId: number,
    transactionType: string,
    biller: string,
    totalPrice: number,
    paidIn: number,
    paidOut: number,
    grandTotal: number,
    status: number,
    salesType: string,
    loe: string,
    an: string,
    ac: string,
    notes: string,
    transactionDate: any,
    currency: string
}
export interface patient {
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
    patientType: any,
    email: any,
    age: number,
    sid: any,
    dateUpdate: any,
    creationDate: any,
    contactNo: any,
    companyID: number
}
export interface company {
    companyID: number,
    nameCompany: string,
    companyAddress: string
}
export interface itemGroup {
    name: string,
    items: itemList[]
}
export interface transExt {
    transactionId: number,
    itemID: number,
    packageName: any,
    itemQTY: number,
    itemDisc: number
}
export interface transRef {
    transactionID: number,
    patientID: number,
    xray: number,
    blood: number,
    urine: number,
    stool: number,
    physicalExam: number,
    specimen: number,
    ultrasound: number,
    ecg: number,
    others: number,
    _2dEcho: number
}
export interface packExt {
    packageName: string,
    itemID: number
}
export interface user {
    userID?: number,
    userName: string,
    userEmail: string,
    userPass: string,
    userStatus: string,
    tokenCode: string,
    _class: string,
    conPass?: string
}
export interface priv {
    privID?: number,
    userID?: number,
    cashierCash?: number,
    imaging?: number,
    laboratory?: number,
    admin?: number,
    medical?: number,
    doctor?: number,
    qualityControl?: number,
    cashierAccount?: number
}
export interface trans_items {
    ext: transExt,
    item: itemList
}
export interface transData {
    id: {
        trans: transaction,
        patient: patient,
        items: itemList[]
    }
}

export interface heldTable{
    id      : number,
    patInfo : patient,
    patient : string,
    items   : itemList[],
    date    : any,
    type    : string,
    biller  : string,
    action  : any,
    color   : string
}

export interface billing{
    soaCode     : string,
    fromDate    : any,
    toDate      : any,
    soaDate     : any,
    transIds    : any,
    address     : string,
    companyID   : number,
    billID?     : number,
    attention   : string,
    prepared    : string,
    verified    : string,
    validated   : string
}

export interface accPayment{
    apID?           : number,
    companyID       : number,
    transactionID   : number,
    billID          : number,
    checkNo         : number,
    checkDate       : any,
    paymentDate     : any,
    debit           : number,
    paymentCur      : string,
    bank            : string,
    paymentType     : string
}

export interface personnel{
    personnelID?    : number,
    position        : string,
    firstName       : string,
    middleName      : string,
    lastName        : string,
    positionEXT     : string,
    licenseNO       : string,
    department      : string
}

export interface microscopy{
    microID? : any,
    transactionID: number,
    patientID: number,
    pathID: number,
    medID: number,
    qualityID: number,
    creationDate: any,
    dateUpdate: any,

    uriColor: any,
    uriTrans: any,
    uriOt: any,

    uriPh: any,
    uriSp: any,
    uriPro: any,
    uriGlu: any,
    le: any,
    nit: any,
    uro: any,
    bld: any,
    ket: any,
    bil: any,

    rbc: any,
    wbc: any,
    ecells: any,
    mthreads: any,
    bac: any,
    amorph: any,
    coAx: any,

    fecColor: any,
    fecCon: any,
    fecMicro: any,
    fecOt: any,

    pregTest: any,

    occultBLD: any,

    afbva1: any,
    afbva2: any,
    afbr1: any,
    afbr2: any,
    afbd: any
}

export interface medtech{
    personnelID? : number,
    position: any,
    lastName: any,
    firstName: any,
    middleName: any,
    department: any,
    licenseNO: any,
    positionEXT: any
}

export interface hematology{
    hemaID?: number,
    patientID: number,
    creationDate: any,
    dateUpdate: any,
    transactionID: number,
    pathID: number,
    medID: number,
    qualityID: number,
    monocytes: any,
    bas: any,
    hemoglobin: any,
    cbcrbc: any,
    lymphocytes: any,
    whiteBlood: any,
    eos: any,
    hematocrit: any,
    ptime: any,
    ptcontrol: any,
    actPercent: any,
    cbcot: any,
    inr: any,
    plt: any,
    hemoNR: any,
    neutrophils: any,
    hemaNR:  any,
    actPercentNV: any,
    aptcontrolNV: any,
    ptcontrolNV: any,
    ms: any,
    apttime: any,
    ptimeNV: any,
    esr: any,
    aptcontrol: any,
    pr131: any,
    inrnv: any,
    esrmethod: any,
    apttimeNV: any,
    bloodType: any,
    rh: any,
    clottingTime: any,
    bleedingTime: any,
}

export interface chemistry{
    chemID? : number,
    patientID: number,
    transactionID: number,
    pathID: number,
    medID: number,
    qualityID: number,
    creationDate: any,
    dateUpdate: any,
    totalCPK: number,
    agratio: number,
    buncon: number,
    bun: number,
    fbs: number,
    fbscon: number,
    trig: number,
    crea: number,
    creacon: number,
    hdlcon: number,
    ldl: number,
    trigcon: number,
    alt: number,
    chol: number,
    ldlcon: number,
    bua: number,
    cholcon: number,
    ch: number,
    na: number,
    buacon: number,
    cl: number,
    ast: number,
    hb: number,
    vldl: number,
    k: number,
    alp: number,
    psa: number,
    hdl: number,
    lipase: number,
    biltotal: number,
    ogtt1: number,
    ogtt1con: number,
    calcium: number,
    albumin: number,
    ldh: number,
    amylase: number,
    ogtt2: number,
    rbs: number,
    globulin: number,
    ggtp: number,
    ogctcon: number,
    cpkmm: number,
    ionCalcium: number,
    bildirect: number,
    protein: number,
    ogct: number,
    bilindirect: number,
    rbscon: number,
    magnesium: number,
    ogtt2con: number,
    cpkmb: number,
    inPhos: number
}

