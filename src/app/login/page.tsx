import { LoginSection } from '@/components/LoginSection';
import { LoginHeader } from '@/components/LoginHeader';
import { LoginBackground } from '@/components/LoginBackground';

export default function LoginPage() {

  return (
    <div className="relative min-h-[calc(100vh-64px)]">
      <LoginBackground />
      <div className="container mx-auto py-16 px-4 relative z-10">
        <LoginHeader />
        <LoginSection />
      </div>
    </div>
  );
}