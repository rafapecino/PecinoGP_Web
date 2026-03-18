"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Counter } from "./ui/counter";
import { CheckCircle } from "lucide-react";

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

const optionColors = [
  "bg-red-600/40",
  "bg-white/10",
  "bg-white/10",
  "bg-white/10",
  "bg-white/10",
  "bg-white/10",
];

const optionTextColors = [
  "text-red-500",
  "text-white",
  "text-white",
  "text-white",
  "text-white",
  "text-white",
];

export function QuickPoll() {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [voted, setVoted] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPoll() {
    try {
      const response = await fetch("/api/polls");
      if (response.ok) {
        const data = await response.json();
        
        // --- CORRECCIÓN CLAVE: Extraer la primera encuesta si es un array ---
        const activePoll = Array.isArray(data) ? data[0] : data;
        
        setPoll(activePoll);

        if (activePoll) {
           const storedVote = localStorage.getItem(`poll_${activePoll.id}_voted`);
           if (storedVote) {
             setVoted(parseInt(storedVote, 10));
           }
        }
      }
    } catch (error) {
      console.error("Error fetching poll:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPoll();
  }, []);

  const handleVote = async (optionId: number) => {
    if (!poll || voted) return;

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: poll.id, optionId }),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        // Recargar para obtener votos actualizados de la DB
        fetchPoll();

        setVoted(optionId);
        localStorage.setItem(`poll_${poll.id}_voted`, optionId.toString());
        toast.success("¡Gracias por tu voto!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "No se pudo registrar el voto.");
        if (response.status === 403) {
          setVoted(optionId);
          localStorage.setItem(`poll_${poll.id}_voted`, optionId.toString());
        }
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado.");
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="h-8 bg-muted/50 rounded w-3/4 animate-pulse mx-auto"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-12 bg-muted/50 rounded-lg w-full animate-pulse"></div>
          <div className="h-12 bg-muted/50 rounded-lg w-full animate-pulse"></div>
          <div className="h-12 bg-muted/50 rounded-lg w-full animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (!poll) {
    return null;
  }

  // Protección contra options undefined
  const options = poll.options || [];
  const totalVotes = options.reduce((acc, option) => acc + (option.votes || 0), 0);

  return (
    <div className="w-full mx-auto bg-white/[0.03] backdrop-blur-3xl rounded-[32px] border border-white/10 p-8 shadow-2xl overflow-hidden group">
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-8 leading-tight">
          {poll.question}
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {options.map((option, index) => {
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
              const isVotedOption = voted === option.id;

              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {voted ? (
                    <div className="relative w-full h-14 border border-border/30 rounded-lg flex items-center justify-between px-4 overflow-hidden transition-all duration-300">
                      <motion.div
                        className={`absolute top-0 left-0 h-full ${optionColors[index % optionColors.length]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span className={`font-black uppercase tracking-widest text-[11px] italic transition-colors ${isVotedOption ? 'text-white' : 'text-white/80'}`}>
                            {option.text}
                          </span>
                          {isVotedOption && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                        <div className={`flex items-center gap-1 font-black italic tracking-tighter text-xl ${isVotedOption ? 'text-white' : 'text-white/40'}`}>
                          <span>{percentage.toFixed(1)}</span>
                          <span className="text-[10px] ml-0.5">%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-14 justify-center text-sm font-black italic uppercase tracking-widest border-white/10 bg-white/5 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all rounded-2xl"
                        onClick={() => handleVote(option.id)}
                      >
                        {option.text}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {voted && totalVotes > 0 && (
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 text-center mt-10 italic">
            Participación: <span className="text-red-500 font-black">{totalVotes}</span> MOTORES RUGIENDO
          </p>
        )}
      </div>
    </div>
  );
}
