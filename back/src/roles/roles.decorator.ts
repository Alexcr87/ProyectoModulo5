import { SetMetadata } from "@nestjs/common";

export const AllowedUserIds = (...ids: number[]) => SetMetadata('allowedUserIds', ids);