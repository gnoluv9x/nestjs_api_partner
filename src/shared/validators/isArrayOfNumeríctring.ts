import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsArrayOfNumericStrings(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "isArrayOfNumericStrings",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          console.log("Debug_here  ====================: ", value);
          if (!Array.isArray(value)) {
            return false;
          }
          return value.every((item) => {
            return typeof item === "string" && /^\d+$/.test(item);
          });
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of numeric strings`;
        },
      },
    });
  };
}
