import * as Express from "@types/express";

export function getDefaultLanguageFromCookie(
  cookie?: string,
  full?: boolean
): string | null;

export function setDefaultLanguageFromCookie(
  languageCode: string,
  full?: boolean
): void;

export function languageManagerMiddleware({
  defaultLanguageShortCode,
  defaultLanguageFullCode
}: {
  defaultLanguageShortCode: string;
  defaultLanguageFullCode: string;
}): (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => any;
