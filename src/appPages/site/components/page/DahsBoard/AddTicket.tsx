"use client";

import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogClose, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const AddTicketDialog = ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => {
  const operators = ["Айбек", "Светлана", "Нурислам", "Адилет"];
  const statuses = ["Open", "In Progress", "Closed"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-blue-500" />
          Добавить билет
        </Button>
      </DialogTrigger>

      {/* Светлый размытный фон */}
      <DialogOverlay className="fixed inset-0 bg-white/30 backdrop-blur-md z-40 transition-all duration-300" />

      <DialogContent
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-xl shadow-xl z-50 w-full max-w-md p-6 
        animate-in fade-in-90 zoom-in-90 duration-300"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Добавить новый билет</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Заполните форму, чтобы создать задачу и назначить оператора.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4">
          {/* Название тикета */}
          <div className="grid gap-1">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Название билета
            </label>
            <Input id="title" placeholder="Например: Проблема с логином" required />
          </div>

          {/* Клиент */}
          <div className="grid gap-1">
            <label htmlFor="customer" className="text-sm font-medium text-gray-700">
              Имя клиента
            </label>
            <Input id="customer" placeholder="Введите имя клиента" required />
          </div>
          <div className="grid gap-1">
            <label htmlFor="customer" className="text-sm font-medium text-gray-700">
              Описание
            </label>
            <Input id="customer" placeholder="Введите имя клиента" required />
          </div>

          {/* Статус */}
          <div className="grid gap-1">
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Статус
            </label>
            <select
              id="status"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Назначить оператора */}

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTicketDialog;
