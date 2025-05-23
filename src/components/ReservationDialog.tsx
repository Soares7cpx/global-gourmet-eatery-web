
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import ReservationForm from '@/components/ReservationForm';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Utensils } from 'lucide-react';

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReservationDialog = ({ open, onOpenChange }: ReservationDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center justify-center mb-2">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-gradient">Reserve sua Mesa</DialogTitle>
            <DialogDescription className="text-center">
              Preencha o formulário abaixo para reservar sua mesa no Mundo Gastronômico.
            </DialogDescription>
          </DialogHeader>
          <ReservationForm onClose={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DrawerTitle className="text-center text-2xl font-bold text-gradient">Reserve sua Mesa</DrawerTitle>
          <DrawerDescription className="text-center">
            Preencha o formulário abaixo para reservar sua mesa no Mundo Gastronômico.
          </DrawerDescription>
        </DrawerHeader>
        <ReservationForm onClose={() => onOpenChange(false)} />
      </DrawerContent>
    </Drawer>
  );
};

export default ReservationDialog;
