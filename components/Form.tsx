"use client";

import { useRef, useState, type FormHTMLAttributes, type ReactNode } from "react";
import { notify } from "@/lib/notifications";

type FormState = { submitting: boolean };

type FormProps<T> = {
  onSubmit: (data: T) => void | Promise<void>;
  children: ReactNode | ((state: FormState) => ReactNode);
  /**
   * Converte o FormData em `T`. Use quando precisar de números, datas ou
   * booleanos — sem `parse`, todo campo chega como `string | File` (limitação
   * do FormData) e os dados são apenas um cast para `T`.
   */
  parse?: (formData: FormData) => T;
  /** Se fornecido, usa notify.promise; senão, toast de erro no catch. */
  messages?: { loading: string; success: string; error: string };
  /** Callback de erro customizado, chamado sempre que onSubmit falha. */
  onError?: (error: unknown) => void;
  /** Limpa os campos após sucesso. Default: true. */
  resetOnSuccess?: boolean;
} & Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "children">;

export default function Form<T = Record<string, FormDataEntryValue>>({
  onSubmit,
  children,
  parse,
  messages,
  onError,
  resetOnSuccess = true,
  ...rest
}: FormProps<T>) {
  const [submitting, setSubmitting] = useState(false);
  // Guard síncrono: bloqueia um segundo submit antes do estado atualizar.
  const submittingRef = useRef(false);

  const handleSubmit: NonNullable<FormHTMLAttributes<HTMLFormElement>["onSubmit"]> = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = parse ? parse(formData) : (Object.fromEntries(formData) as T);

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const result = Promise.resolve(onSubmit(data));
      // notify.promise só dirige o toast; o await abaixo controla o fluxo
      // (reset roda apenas no sucesso).
      if (messages) notify.promise(result, messages);
      await result;
      if (resetOnSuccess) formEl.reset();
    } catch (err) {
      onError?.(err);
      if (!messages) {
        notify.error(err instanceof Error ? err.message : "Algo deu errado");
      }
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} {...rest}>
      {typeof children === "function" ? children({ submitting }) : children}
    </form>
  );
}
