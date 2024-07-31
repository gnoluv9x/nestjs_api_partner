import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsCommaSeparatedNumberString(
  onlyNumber: boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "isCommaSeparatedNumberString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== "string") return false;

          let regex = /^([^,\s]+,)*[^,\s]+$/;

          if (onlyNumber) {
            regex = /^\d+(,\d+)*$/;
          }

          return regex.test(value.trim());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a comma-separated number string`;
        },
      },
    });
  };
}
