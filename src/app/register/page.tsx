import { PageHeader } from '@/components/PageHeader';
import { LoginBackground } from '@/components/LoginBackground';
import { RegisterSection } from '@/components/RegisterSection';

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative">
      <LoginBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <PageHeader 
          title="Join SmartHost"
          description="Create your account and start your hosting journey with us today."
        />
        <RegisterSection />
      </div>
    </div>
  );
}