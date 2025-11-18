import "../../globals.scss"; 
import "./login.scss";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="login-layout">
      {children}
    </div>
  );
}
