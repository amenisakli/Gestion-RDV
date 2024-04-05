import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isObject } from 'lodash';
import { FindOperator } from 'typeorm/find-options/FindOperator';
@Injectable()
export class ParseObjectPipe implements PipeTransform<string, Object> {
  newVal: string
  transform(value: string): Object {
    let parseVal = JSON.parse(value);
    if (parseVal.where?.length) {
      for (let j = 0; j < parseVal.where?.length; j++) {
        for (let i in parseVal.where[j]) {
          if (Object.keys(parseVal.where[j][i]).includes("type") && Object.keys(parseVal.where[j][i]).includes("value")) {
            if ((typeof parseVal.where[j][i].value) == "string") {
              this.newVal = parseVal.where[j][i].value.replace(/\*/g, "%")
              parseVal.where[j][i].value = this.newVal
            }
            parseVal.where[j][i] = findOperator(parseVal.where[j][i])
          }
        }
      }
    } else {
      for (let i in parseVal.where) {
        if (Object.keys(parseVal.where[i]).includes("type") && Object.keys(parseVal.where[i]).includes("value")) {
          if ((typeof parseVal.where[i].value) == "string") {
            this.newVal = parseVal.where[i].value.replace(/\*/g, "%")
            parseVal.where[i].value = this.newVal
          }
          parseVal.where[i] = findOperator(parseVal.where[i])
        }
      }
    }
    if (!isObject(parseVal)) {
      throw new BadRequestException('Validation failed');
    }
    return parseVal;
  }
}

export function findOperator(findoperator: Object) {
  let findOperator: FindOperator<any>
  if ((typeof findoperator["value"] !== "string") && (typeof findoperator["value"] !== "number") && (findoperator["value"] !== null)) {
    findOperator = new FindOperator<any>(findoperator["type"], findoperator["value"], true, true)
  }
  else {
    if (findoperator["type"] == "isNull") {
      findOperator = new FindOperator<any>(findoperator["type"], undefined, false)
    } else {
      findOperator = new FindOperator<any>(findoperator["type"], findoperator["value"])
    }
  }
  return findOperator
}