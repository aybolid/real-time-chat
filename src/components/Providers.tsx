import { Provider } from 'react-redux';
import { store } from '../app/store.ts';
import { AuthProvider } from '../lib/supabase/auth.tsx';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Provider store={store}>{children}</Provider>
    </AuthProvider>
  );
}
