import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Github, Globe, Linkedin, Mail, MapPin, Phone, Save } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useStudentProfile, useUpdateProfile } from "@/hooks/useStudent";
import type { StudentProfile } from "@/types";

export function ProfilePage() {
  const { data, isLoading } = useStudentProfile();
  const profile = data?.user;
  const updateProfile = useUpdateProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Partial<StudentProfile>>();

  useEffect(() => {
    if (profile) reset(profile);
  }, [profile, reset]);

  const onSubmit = (values: Partial<StudentProfile>) => {
    updateProfile.mutate(values);
  };

  return (
    <div>
      <PageHeader title="Profile" description="Keep this up to date — it powers your AI roadmap and resume matching." />

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="flex flex-col items-center p-8 text-center lg:col-span-1">
            <Avatar name={profile?.name ?? "Student"} src={profile?.avatarUrl} size="lg" />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-50">{profile?.name}</h3>
            <p className="text-sm text-ink-400">{profile?.email}</p>
            {profile?.targetRole && <Badge variant="brand" className="mt-3">{profile.targetRole}</Badge>}
            <div className="mt-5 flex w-full flex-col gap-2 text-left text-sm text-ink-400">
              {profile?.college && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-ink-500" /> {profile.college}
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-ink-500" /> {profile.phone}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-ink-500" /> {profile?.email}
              </div>
            </div>
            <div className="mt-5 flex w-full flex-wrap gap-1.5">
              {profile?.skills?.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Edit profile</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Full name" {...register("name")} />
              <Input label="Target role" {...register("targetRole")} />
              <Input label="College" {...register("college")} />
              <Input label="Branch" {...register("branch")} />
              <Input label="Graduation year" type="number" {...register("graduationYear", { valueAsNumber: true })} />
              <Input label="Phone" {...register("phone")} />
              <Input label="Location" {...register("location")} icon={<MapPin className="h-4 w-4" />} />
              <Input label="LinkedIn" {...register("linkedinUrl")} icon={<Linkedin className="h-4 w-4" />} />
              <Input label="GitHub" {...register("githubUrl")} icon={<Github className="h-4 w-4" />} />
              <Input label="Portfolio" {...register("portfolioUrl")} icon={<Globe className="h-4 w-4" />} />
              <div className="sm:col-span-2">
                <Textarea label="Bio" placeholder="Tell recruiters what makes you, you." {...register("bio")} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" isLoading={isSubmitting}>
                  <Save className="h-4 w-4" /> Save changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
