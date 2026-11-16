import { NO_CLIENT, NO_SEGMENT } from "@/data/projects";

// Textos que a Ponto X ainda vai informar. Aparecem como marca "a preencher", não como conteúdo.
const PENDING = new Set<string>([NO_CLIENT, NO_SEGMENT, "[CONFIRMAR]"]);

export const isPending = (value: string) => PENDING.has(value);

/** Mostra o valor normal ou, se ainda faltar, a marca tracejada (cor em `pendingClassName`). */
export function Field({ value, pendingClassName = "" }: { value: string; pendingClassName?: string }) {
  return isPending(value) ? <span className={`tag-pendente ${pendingClassName}`}>{value}</span> : <>{value}</>;
}
