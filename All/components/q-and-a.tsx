"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/All/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/All/components/ui/form";
import { Input } from "@/All/components/ui/input";
import { Textarea } from "@/All/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  userName: z.string().optional(),
  question: z
    .string()
    .min(10, {
      message: "La pregunta debe tener al menos 10 caracteres.",
    })
    .max(500, {
      message: "La pregunta no puede tener más de 500 caracteres.",
    }),
});

interface Question {
  id: number;
  question: string;
  userName: string;
  createdAt: string;
}

export function QAndA() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      question: "",
    },
  });

  async function fetchQuestions() {
    try {
      const response = await fetch("/api/questions");
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("¡Pregunta enviada! Gracias por participar.");
        form.reset();
        fetchQuestions();
      } else {
        const errorData = await response.json();
        toast.error(
          `Error al enviar la pregunta: ${
            errorData.error?.question?._errors[0] || "Inténtalo de nuevo."
          }`
        );
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/[0.03] backdrop-blur-3xl rounded-[28px] md:rounded-[32px] border border-white/10 p-6 md:p-10 shadow-2xl"
      >
        <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase mb-6 md:mb-8">Envía tu pregunta</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 block">Tu nombre (Opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ej: Juan Pérez" 
                          {...field} 
                          className="bg-white/5 border-white/10 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl h-12 text-white placeholder:text-white/20 transition-all font-bold italic"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px] font-bold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 block">Tu pregunta</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escribe aquí tu pregunta para Manuel Pecino..."
                          className="bg-white/5 border-white/10 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-2xl p-5 text-white placeholder:text-white/20 transition-all resize-none shadow-inner"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[10px] font-medium text-white/20 italic mt-2">
                        Tu pregunta será revisada antes de ser publicada.
                      </FormDescription>
                      <FormMessage className="text-red-500 text-[10px] font-bold" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black italic uppercase tracking-widest py-4 md:py-6 rounded-xl md:rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  {isSubmitting ? "ENVIANDO..." : "ENVIAR PREGUNTA"}
                </Button>
              </form>
            </Form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/[0.03] backdrop-blur-3xl rounded-[28px] md:rounded-[32px] border border-white/10 p-6 md:p-10 shadow-2xl flex flex-col h-full"
      >
        <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase mb-6 md:mb-8">Debate Comunitario</h3>
        <div className="flex-grow">
          {questions.length > 0 ? (
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              <AnimatePresence>
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/5 p-6 rounded-[24px] group hover:border-red-600/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-3 bg-red-600 rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">
                        {q.userName || "Fan PecinoGP"}
                      </span>
                    </div>
                    <p className="text-gray-300 font-medium leading-relaxed italic line-clamp-4">
                      "{q.question}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <HelpCircle className="mx-auto h-20 w-20 text-white/10 mb-6" />
              <p className="text-white/40 font-bold italic tracking-wider max-w-[240px] mx-auto text-sm leading-relaxed">
                ¡ABRE EL DEBATE! TU PREGUNTA PODRÍA SALIR EN EL PRÓXIMO VÍDEO.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
