import { useCallback, useRef, useState } from "react";
import { CheckCircle2, FileText, UploadCloud, XCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";
import { useLatestResumeAnalysis, useUploadResume } from "@/hooks/useResume";
import { getErrorMessage } from "@/utils/errorMessage";

export function ResumeUploadPage() {
  const { data, isLoading } = useLatestResumeAnalysis();
  const analysis = data?.resume;
  const uploadResume = useUploadResume();
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setProgress(0);
      setUploadError(null);
      uploadResume.mutate(
        { file, onProgress: setProgress },
        {
          onError: (err) => setUploadError(getErrorMessage(err, "Upload failed. Please try again.")),
        }
      );
    },
    [uploadResume]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <PageHeader title="Resume" description="Upload your resume for an instant ATS score and AI suggestions." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upload resume</CardTitle>
          </CardHeader>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
              dragging ? "border-brand-blue bg-brand-blue/5" : "border-white/10 hover:border-white/20"
            )}
          >
            <UploadCloud className="h-8 w-8 text-brand-cyan" />
            <p className="text-sm font-medium text-ink-200">Drag & drop your resume</p>
            <p className="text-xs text-ink-500">PDF or DOCX, up to 5MB</p>
            <Button size="sm" variant="secondary" type="button">
              Browse files
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {uploadResume.isPending && (
            <div className="mt-4">
              <ProgressBar value={progress} showLabel />
            </div>
          )}
          {uploadError && <p className="mt-3 text-xs text-danger">{uploadError}</p>}
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Latest analysis</CardTitle>
            {analysis && (
              <span className="text-xs text-ink-500">
                <FileText className="mr-1 inline h-3 w-3" /> {analysis.fileName}
              </span>
            )}
          </CardHeader>

          {isLoading || uploadResume.isPending ? (
            <CardSkeleton />
          ) : analysis ? (
            <div>
              <div className="mb-6 flex items-center gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-500">ATS score</p>
                  <p className="font-display text-4xl font-semibold text-gradient">{analysis.atsScore}%</p>
                </div>
                <ProgressBar value={analysis.atsScore} className="flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">Strengths</p>
                  <ul className="space-y-1.5">
                    {analysis.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-ink-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">Suggestions</p>
                  <ul className="space-y-1.5">
                    {analysis.suggestions.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-ink-300">
                        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">Keywords matched</p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.matchedKeywords.map((k) => (
                    <Badge key={k} variant="success">{k}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">Missing skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingSkills.map((k) => (
                    <Badge key={k} variant="danger">{k}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="py-14 text-center text-sm text-ink-500">Upload a resume to see your ATS analysis here.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
