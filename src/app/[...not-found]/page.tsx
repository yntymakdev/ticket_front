import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NO_INDEX_PAGE } from "@/constant/seo.constants";

export const metadata: Metadata = {
  title: "Страница не существует",
  ...NO_INDEX_PAGE,
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />

      <h1 className="text-4xl font-bold mb-2">404 — Страница не найдена</h1>

      <p className="text-muted-foreground mb-6 max-w-md">
        Извините, страница, которую вы ищете, не существует или была перемещена.
      </p>

      <Link href="/">
        <Button variant="default">Вернуться на главную</Button>
      </Link>
    </div>
  );
}
