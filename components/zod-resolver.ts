import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { ZodType } from "zod";

export function zodResolver<T extends FieldValues>(schema: ZodType<T>): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} as Record<string, never> };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.map(String).join(".");
      if (!path || errors[path]) continue;
      errors[path] = { type: issue.code, message: issue.message };
    }

    return { values: {} as Record<string, never>, errors: errors as FieldErrors<T> };
  };
}
