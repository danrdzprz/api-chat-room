import { SetMetadata } from '@nestjs/common';
// Convienience Function
export const AllowUnauthorizedRequest = () => SetMetadata('allowUnauthorizedRequest', true);