import * as _ from "lodash";

export enum SortOrder {
    asc = 1,
    desc = -1
}

export class PaginationQueryParamsBuilder {
    private _page: number;
    private _size: number;
    private _sortField: string;
    private _sortOrder: string;

    get page(): number {
        return this._page;
    }

    setPage(value: number): PaginationQueryParamsBuilder {
        this._page = value;
        return this;
    }

    get size(): number {
        return this._size;
    }

    setSize(value: number): PaginationQueryParamsBuilder {
        this._size = value;
        return this;
    }

    get sortField(): string {
        return this._sortField;
    }

    setSortField(value: string): PaginationQueryParamsBuilder {
        this._sortField = value;
        return this;
    }

    get sortOrder(): string {
        return this._sortOrder;
    }

    setSortOrder(value: string): PaginationQueryParamsBuilder {
        this._sortOrder = value;
        return this;
    }

    build(): QueryParams {
        return new QueryParams(this);
    }

    static pageBuilder(): PaginationQueryParamsBuilder {
        return new PaginationQueryParamsBuilder();
    }
}

export class QueryParams {
    private _page: number;
    private _size: number;
    private _sort: string;

    constructor(queryParamBuilder: PaginationQueryParamsBuilder) {
        this._page = queryParamBuilder.page;
        this._size = queryParamBuilder.size;
        this._sort = queryParamBuilder.sortField + ',' + SortOrder[queryParamBuilder.sortOrder];
    }

    get page(): number {
        return this._page;
    }

    get size(): number {
        return this._size;
    }

    get sort(): string {
        return this._sort;
    }

    toString(): string {

        let result = "";
        let params: string[] = [];

        if (!_.isUndefined(this.page))
            params.push(`page=${this.page}`);

        if (!_.isUndefined(this.size))
            params.push(`size=${this.size}`);

        if (!_.isUndefined(this.sort))
            params.push(`sort=${this.sort}`);

        if (!_.isEmpty(params))
            result = "?" + params.join('&');

        return result;
    }
}
