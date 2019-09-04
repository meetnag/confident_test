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
    ProductID: Product;
    SubAssemblyIDs: SubAssembly[];
    Installation: Installation;
    CustomerType: CustomerType;
    SpareIDs: Spare[];
    Status: Status;
    SerialNumbers: SerialNumber[];
    Customer: Customer;
    userName: any;
    roleName: any;
    minInstallationDate :any;
    StatusLog: StatusLog[];
    constructor() {
        this.SerialNumbers = [];
        this.Priority = new Priority();
        this.ProductID = new Product();
        this.SubAssemblyIDs = [];
        this.Customer = new Customer();
        this.CustomerType = new CustomerType();
        this.BranchID = new Branch();
        this.Installation = new Installation();
        this.StatusLog = [];
    }
}
export class StatusLog {
    _id: any;
    Date: any;
    ChangedStatus: any;
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
    contactNumber: any;
    constructor() {
        this.name = '';
        this.city = '';
        this.contactNumber = '';
    }
}
export class SerialNumber {
    ID: any;
    name: any;
    srno: any;
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