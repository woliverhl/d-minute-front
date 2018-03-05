import { Injectable } from "@angular/core";
import { CanActivate  } from "@angular/router";

export class AppGuard implements CanActivate {
    constructor(){

    }

    canActivate(){
        return true;
    }
}
