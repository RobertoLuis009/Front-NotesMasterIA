'use client';

import { useEffect } from 'react';
import { syncUser } from '@/lib/actions/users';
import { notify } from '@/lib/notifications';

export default function UserSync() {
  useEffect(() => {
    notify.promise(syncUser(), {
      loading: 'Sincronizando conta...',
      success: 'Conta sincronizada com sucesso!',
      error: 'Erro ao sincronizar conta.',
    });
  }, []);

  return null;
}
