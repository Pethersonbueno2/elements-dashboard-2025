import React, { useState } from 'react';
import { Settings, Link, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useClickUp } from '@/hooks/useClickUp';

export function ClickUpConfig() {
  const {
    accessToken,
    listId,
    isConfigured,
    isLoading,
    saveAccessToken,
    saveListId,
    clearConfig,
    fetchTasks,
  } = useClickUp();

  const [open, setOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState(accessToken || '');
  const [listIdInput, setListIdInput] = useState(listId || '');

  const handleSave = () => {
    if (tokenInput && listIdInput) {
      saveAccessToken(tokenInput);
      saveListId(listIdInput);
      setOpen(false);
    }
  };

  const handleSync = async () => {
    await fetchTasks();
  };

  return (
    <div className="flex items-center gap-2">
      {isConfigured && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSync}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Sincronizar
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={isConfigured ? 'outline' : 'default'}
            size="sm"
            className="gap-2"
          >
            {isConfigured ? (
              <>
                <Link className="h-4 w-4" />
                ClickUp Conectado
              </>
            ) : (
              <>
                <Settings className="h-4 w-4" />
                Conectar ClickUp
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configurar ClickUp</DialogTitle>
            <DialogDescription>
              Conecte sua conta ClickUp para sincronizar os indicadores da dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accessToken">Token de Acesso (API Key)</Label>
              <Input
                id="accessToken"
                type="password"
                placeholder="pk_xxxxxxxx..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Encontre em: ClickUp → Settings → Apps → Generate API Token
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="listId">ID da Lista</Label>
              <Input
                id="listId"
                placeholder="901234567890"
                value={listIdInput}
                onChange={(e) => setListIdInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Copie o ID da URL da lista: clickup.com/123456/v/li/901234567890
              </p>
            </div>

            <div className="flex justify-between pt-4">
              {isConfigured && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    clearConfig();
                    setTokenInput('');
                    setListIdInput('');
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Desconectar
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={!tokenInput || !listIdInput}
                className="ml-auto"
              >
                Salvar Configuração
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
