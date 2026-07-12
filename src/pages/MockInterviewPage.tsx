import { useState } from "react";
import { CheckCircle2, Mic, MicOff, Play, RotateCcw, SkipForward, Square, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useEndInterview, useStartInterview, useSubmitAnswer } from "@/hooks/useInterview";
import { getErrorMessage } from "@/utils/errorMessage";
import type { MockInterviewSession } from "@/types";

const roles = ["SDE — Backend", "SDE — Frontend", "Data Analyst", "Product Management", "Consulting"];

export function MockInterviewPage() {
  const startInterview = useStartInterview();
  const submitAnswer = useSubmitAnswer();
  const endInterview = useEndInterview();
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [recording, setRecording] = useState(false);
  const [completedSession, setCompletedSession] = useState<MockInterviewSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  const session = startInterview.data?.session;
  const currentQuestion = session?.questions[questionIndex];

  const handleStart = () => {
    setError(null);
    setCompletedSession(null);
    startInterview.mutate(
      { role: selectedRole },
      { onError: (err) => setError(getErrorMessage(err, "Couldn't start the interview. Please try again.")) }
    );
  };

  const handleSubmit = async () => {
    if (!session || !currentQuestion || !answer.trim()) return;
    setError(null);
    try {
      await submitAnswer.mutateAsync({ sessionId: session.id, questionId: currentQuestion.id, answer });
      setAnswer("");
      if (questionIndex < session.questions.length - 1) {
        setQuestionIndex((i) => i + 1);
      }
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't submit that answer. Please try again."));
    }
  };

  const handleEnd = async () => {
    if (!session) return;
    setError(null);
    try {
      const result = await endInterview.mutateAsync(session.id);
      setCompletedSession(result.session);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't end the session. Please try again."));
    }
  };

  const handleRestart = () => {
    startInterview.reset();
    setCompletedSession(null);
    setQuestionIndex(0);
    setAnswer("");
  };

  if (completedSession) {
    return (
      <div>
        <PageHeader title="Mock interview" description="Session complete — here's how it went." />
        <Card className="mx-auto max-w-lg p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient-soft">
            <TrendingUp className="h-6 w-6 text-brand-cyan" />
          </div>
          <p className="text-xs uppercase tracking-wide text-ink-500">Overall score</p>
          <p className="mt-1 font-display text-5xl font-semibold text-gradient">
            {completedSession.overallScore ?? 0}/10
          </p>
          <p className="mx-auto mt-4 max-w-sm text-sm text-ink-400">{completedSession.overallSummary}</p>
          <Button className="mt-7 w-full" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" /> Start another interview
          </Button>
        </Card>
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <PageHeader title="Mock interview" description="Practice with AI-generated, role-specific interview questions." />
        <Card className="mx-auto max-w-lg p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient-soft">
            <Mic className="h-6 w-6 text-brand-cyan" />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink-50">Choose your target role</h3>
          <p className="mt-1.5 text-sm text-ink-400">We'll tailor the questions and scoring to it.</p>

          {error && (
            <p className="mt-4 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selectedRole === role
                    ? "border-transparent bg-brand-gradient text-white"
                    : "border-white/10 text-ink-300 hover:bg-white/[0.05]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <Button className="mt-7 w-full" isLoading={startInterview.isPending} onClick={handleStart}>
            <Play className="h-4 w-4" /> Start mock interview
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Mock interview"
        description={`${session.role} · Question ${questionIndex + 1} of ${session.questions.length}`}
        action={
          <Button variant="danger" size="sm" onClick={handleEnd} isLoading={endInterview.isPending}>
            <Square className="h-3.5 w-3.5" /> End session
          </Button>
        }
      />

      <div className="mx-auto max-w-3xl">
        {error && (
          <p className="mb-4 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
            {error}
          </p>
        )}

        <ProgressBar value={((questionIndex + 1) / session.questions.length) * 100} className="mb-6" />

        <Card className="p-8">
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="brand">{currentQuestion?.category}</Badge>
            <Badge>{currentQuestion?.difficulty}</Badge>
            {currentQuestion?.answer && (
              <Badge variant="success">
                <CheckCircle2 className="h-3 w-3" /> Answered
              </Badge>
            )}
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug text-ink-50">
            {currentQuestion?.question}
          </h3>

          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={() => setRecording((r) => !r)}
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all ${
                recording ? "border-danger bg-danger/10 text-danger animate-pulse-ring" : "border-white/15 text-ink-300 hover:border-brand-cyan"
              }`}
            >
              {recording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-ink-500">
            {recording ? "Recording your answer..." : "Tap to record, or type your answer below"}
          </p>

          <Textarea
            className="mt-6"
            placeholder="Type or transcribe your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div className="mt-5 flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setQuestionIndex((i) => Math.min(i + 1, session.questions.length - 1))}
            >
              <SkipForward className="h-4 w-4" /> Skip
            </Button>
            <Button onClick={handleSubmit} isLoading={submitAnswer.isPending} disabled={!answer.trim()}>
              Submit answer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
