import * as _ from "lodash";
import {PaginationQueryParamsBuilder, QueryParams} from "../common/pagination-query-params";

export enum SortOrder {
    asc = 1,
    desc = -1
}

export class ProductQueryParamsBuilder extends PaginationQueryParamsBuilder {
    private _query: string;

    get query(): string {
        return this._query;
    }

    setQuery(value: string): ProductQueryParamsBuilder {
        this._query = value;
        return this;
    }

    build(): ProductQueryParams {
        return new ProductQueryParams(this);
    }

    static prodBuilder(): ProductQueryParamsBuilder {
        return new ProductQueryParamsBuilder();
    }
}

export class ProductQueryParams extends QueryParams {
    private _query: string;

    constructor(queryParamBuilder: ProductQueryParamsBuilder) {
        super(queryParamBuilder);

        this._query = queryParamBuilder.query;
    }

    get query(): string {
        return this._query;
    }

    toString(): string {
        let superParams = super.toString();
        let params = "";

        if (!_.isEmpty(this.query)) {
            params = `name=${this.query}&ean=${this.query}`;

            if (!_.isEmpty(superParams))
                superParams += "&" + params;
            else
                superParams += "?" + params;
        }

        return superParams;
    }
}
