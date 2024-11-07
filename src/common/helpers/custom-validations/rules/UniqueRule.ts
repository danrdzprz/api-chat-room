import { getModelToken, InjectModel } from "@nestjs/mongoose";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";

@ValidatorConstraint({ name: "IsUniqueDB", async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const filter = {};

    filter[args.property] = value;
    const count = await this.model.countDocuments();
    return !count;
  }

  defaultMessage(args: ValidationArguments) {
    return "El valor del campo ya está en uso.";
  }
}
