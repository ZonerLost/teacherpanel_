type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean>
  | ClassValue[];

export function cn(...values: ClassValue[]) {
  const out: string[] = [];

  const push = (v: ClassValue) => {
    if (!v) return;

    if (typeof v === "string" || typeof v === "number") {
      out.push(String(v));
      return;
    }

    if (Array.isArray(v)) {
      v.forEach(push);
      return;
    }

    if (typeof v === "object") {
      Object.entries(v).forEach(([k, ok]) => ok && out.push(k));
    }
  };

  values.forEach(push);
  return out.join(" ");
}
