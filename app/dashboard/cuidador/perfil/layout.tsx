import "../../../globals.scss"; 
import "../cuidador.scss";

export default function CaretakerPerfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="caretaker-layout">
      {children}
    </div>
  );
}