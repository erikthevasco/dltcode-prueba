import "../../../globals.scss"; 
import "../maestro.scss";

export default function MasterPerfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="master-layout">
      {children}
    </div>
  );
}