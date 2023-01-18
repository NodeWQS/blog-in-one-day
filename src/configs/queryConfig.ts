import { Request } from "express";

export interface ReqBody<T> extends Request {
    body: T
};

export interface ReqWithParams<T> extends Request {
    P: T
};

export interface ReqWithParamsAndBody<T,K> extends Request {
    P: T,
    body: K
};

export interface ReqWithQuery<T> extends Request {
    ReqQuery: T
};