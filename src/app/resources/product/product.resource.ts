import {HalResource, HalProperty} from "hal-rest-client";
import {ProductStatus} from "./product-status.enum";
import {CashRegisterInfo} from "./cash-register-info";

export class Product extends HalResource {
    @HalProperty()
    public enabled: boolean;

    @HalProperty()
    public barcode: boolean;

    @HalProperty()
    public ean: string;

    @HalProperty()
    public name: string;

    @HalProperty()
    public pihAmount: number;

    @HalProperty()
    public pihUnit: string;

    @HalProperty()
    public sellUnit: string;

    @HalProperty()
    public vat: number;

    @HalProperty()
    public grouper: Product;

    @HalProperty(Product)
    public groupee: Product[];

    @HalProperty()
    public father: Product;

    @HalProperty(Product)
    public children: Product[];

    @HalProperty()
    public status: ProductStatus;

    @HalProperty()
    public cashRegisterInfo: CashRegisterInfo;
}
