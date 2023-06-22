import { useNavigate } from 'react-router-dom';
import Button from '../components/elements/Button';

export default function Error() {
  const navigate = useNavigate();

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="glass flex flex-col items-center justify-center gap-4 rounded-md bg-white p-4 shadow-md">
        <h2 className="text-2xl font-semibold text-red-400">
          Page not found (404)
        </h2>
        <p>The page you are looking for does not exist.</p>
        <Button onClick={() => navigate(-1)} className="btn-lg btn-primary mt-4">
          Go Back
        </Button>
      </div>
    </section>
  );
}
