import "../../globals.scss"; 
import "./maestro.scss";

export default function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="master-layout">
      {children}
    </div>
  );
}