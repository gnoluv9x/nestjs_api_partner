import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export function IsValidDate(
  dateFormat: string = "DD-MM-YYYY",
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "isValidDate",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== "string") return false;

          const isValid = dayjs(value, dateFormat, true).isValid();
          return isValid;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} sai định dạng ngày`;
        },
      },
    });
  };
}
