import { FindOperator, JoinOptions } from "typeorm";
export class FilterDto<OBJ extends object = AnyObject>{
    select?: (keyof OBJ)[];
    readonly fields?: Fields<OBJ>;
    order?: Order<OBJ>;
    readonly limit?: number;
    readonly skip?: number;
    take?: number;
    readonly offset?: number;
    relations?: string[];
    readonly cache?: boolean | number | { id: any; milliseconds: number; };
    readonly join?: JoinOptions;
    where?: FindConditions<OBJ>[] | FindConditions<OBJ> | ObjectLiteral | string | any;
}

export declare type Fields<MT = AnyObject> = {
    [P in keyof MT]?: boolean;
};


export declare type Order<MT = AnyObject> = {
    [P in keyof MT]: Direction;
};

export declare type Direction = 'ASC' | 'DESC' | 1 | -1;

export declare type FindConditions<T> = {
    [P in keyof T]?: T[P] extends never ? FindConditions<T[P]> | FindOperator<FindConditions<T[P]>> : FindConditions<T[P]> | FindOperator<FindConditions<T[P]>>;
};

export interface ObjectLiteral {
    [key: string]: any;
}

export interface AnyObject {
    [property: string]: any;
}