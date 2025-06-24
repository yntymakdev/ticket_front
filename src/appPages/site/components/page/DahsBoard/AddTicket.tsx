"use client";

import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogClose, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { CreateTicketDto, TicketStatus } from "@/types/ticket.types";
import { Dispatch, SetStateAction, useState } from "react";
import { useTicketcreateMutation } from "@/redux/api/ticket";

interface AddTicketDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userRole: string;
}

const AddTicketDialog: React.FC<AddTicketDialogProps> = ({ open, setOpen, userRole }) => {
  // Если роль SUPERVISOR — не показываем ничего (проверяем разные варианты)

  const statuses = [
    { label: "Open", value: TicketStatus.OPEN },
    { label: "In Progress", value: TicketStatus.IN_PROGRESS },
    { label: "Closed", value: TicketStatus.CLOSED },
  ];

  const [ticketData, setTicketData] = useState<CreateTicketDto>({
    title: "",
    description: "",
    customerName: "",
    status: TicketStatus.OPEN,
  });

  const [createTicket, { isLoading }] = useTicketcreateMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setTicketData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Данные для отправки:", ticketData);
    console.log("Текущие cookies:", document.cookie);

    try {
      const result = await createTicket(ticketData).unwrap();
      console.log("Тикет создан успешно:", result);
      setOpen(false);
      setTicketData({
        title: "",
        description: "",
        customerName: "",
        status: TicketStatus.OPEN,
      });
    } catch (err: any) {
      console.error("Ошибка при создании тикета:", err);
      if (err.data) console.error("Ответ с ошибкой:", err.data);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-500" />
            Добавить билет
          </Button>
        </DialogTrigger>

        <DialogOverlay className="fixed inset-0 bg-white/30 backdrop-blur-md z-40" />

        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 w-full max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Добавить новый билет</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Заполните форму, чтобы создать задачу.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Название билета
              </label>
              <Input
                id="title"
                placeholder="Например: Проблема с логином"
                required
                value={ticketData.title}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                Имя клиента
              </label>
              <Input
                id="customerName"
                placeholder="Введите имя клиента"
                required
                value={ticketData.customerName}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Описание
              </label>
              <Input
                id="description"
                placeholder="Введите описание"
                required
                value={ticketData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="status" className="text-sm font-medium text-gray-700">
                Статус
              </label>
              <select
                id="status"
                value={ticketData.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Отмена
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохраняем..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTicketDialog;
