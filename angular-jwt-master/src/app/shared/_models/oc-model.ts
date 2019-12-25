export class OcModel {
    _id: any;
    OCNumber: any;
    OCDate: any;
    OCNotes: any;
    Createdby: any;
    Updatedby: any;
    CreatedDate: any;
    UpdatedDate: any;
    BranchID: Branch;
    Priority: Priority;
    ProductID: Product[];
    SubAssemblyIDs: SubAssembly[];
    Installation: Installation;
    CustomerType: CustomerType;
    SpareIDs: Spare[];
    Status: Status;
    SerialNumbers: SerialNumber[];
    Customer: Customer;
    userName: any;
    roleName: any;
    minInstallationDate: any;
    StatusLog: StatusLog[];
    typeOfSale: any;
    CustAddrByBranch: any;
    NotesByBranch: any;
    CustPhoneByBranch: any;
    TransportByBranch: any;
    BrinvNum: any;
    BrinvDocAttached: any;
    BrInstaDocAttached: any;
    InvDateByBranch: any;
    warranty: any;
    LRNumber: any;
    LRDate: any;
    constructor() {
        this.SerialNumbers = [];
        this.Priority = new Priority();
        this.ProductID = [];
        this.SubAssemblyIDs = [];
        this.Customer = new Customer();
        this.CustomerType = new CustomerType();
        this.BranchID = new Branch();
        this.Installation = new Installation();
        this.StatusLog = [];
        this.SpareIDs = [];
        this.typeOfSale = 'Direct Sale';
    }
}
export class StatusLog {
    _id: any;
    Date: any;
    ChangedStatus: any;
    PreviousStatus: any;
}
export class Installation {
    installationDate: any;
    installationComplete: any;
    invoiceDate: any;
    installationTechnician: any;
    technicianContact: any;
    transport: any;
    invoiceNumber: any;
    constructor() {
        this.installationComplete = false;
    }
}
export class Customer {
    _id: any;
    name: any;
    city: any;
    state: any;
    zip: any;
    country: any;
    address: any;
    contactNumber: any;
    landlineNumber: any;
    CustEmailID: any;
    constructor() {
        this.name = '';
        this.city = '';
        this.contactNumber = '';
        this.landlineNumber = '';
        this.state = '';
        this.zip = '';
        this.address = '';
        this.country = 'India';
        this.CustEmailID = '';
    }
}
export class SerialNumber {
    ID: any;
    name: any;
    srno: any;
    constructor() {
        this.srno = '';
    }
}
export class Priority {
    _id: any;
    name: any;
    constructor() {
        this._id = '';
        this.name = '';
    }
}
export class Product {
    _id: any;
    code: any;
    name: any;
    constructor() {
        this._id = '';
        this.name = '';
        this.code = '';
    }
}
export class SubAssembly {
    _id: any;
    code: any;
    name: any;
    constructor() {
        this._id = '';
        this.name = '';
        this.code = '';
    }
}
export class CustomerType {
    _id: any;
    name: any;
    constructor() {
        this._id = '';
        this.name = '';
    }
}
export class Spare {
    _id: any;
    code: any;
    name: any;
    constructor() {
        this._id = '';
        this.name = '';
        this.code = '';
    }
}
export class Branch {
    _id: any;
    name: any;
    address: any;
    contactName: any;
    contactNumber: any;
    country: any;
    constructor() {
        this._id = '';
        this.name = '';
    }
}
export class Status {
    _id: any;
    name: any;
}